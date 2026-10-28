'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bot, ExternalLink, Maximize2, MessageCircle, Minimize2, Minus, RefreshCw, Send, Sparkles, X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { assistantQuickReplies, assistantWelcome, getAssistantResponse, type AssistantResponse } from '../data/assistant'

type ChatMessage = { id: number; role: 'assistant' | 'visitor'; text?: string; response?: AssistantResponse }
const welcomeMessage: ChatMessage = { id: 1, role: 'assistant', response: assistantWelcome }
const iconButtonClass = 'rounded-md p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

function AssistantContent({ response, onFollowUp, progressive = false, introOverride }: { response: AssistantResponse; onFollowUp: (question: string) => void; progressive?: boolean; introOverride?: string }) {
  return <>
    <p className="leading-relaxed">{introOverride ?? response.intro}</p>
    {!progressive && response.bullets && <ul className="mt-3 space-y-1.5 text-sm text-muted">{response.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="text-accent" aria-hidden>▹</span><span>{bullet}</span></li>)}</ul>}
    {!progressive && response.tags && <div className="mt-3 flex flex-wrap gap-1.5">{response.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2 py-1 font-mono text-[10px] text-text">{tag}</span>)}</div>}
    {!progressive && response.links && <div className="mt-3 flex flex-wrap gap-2">{response.links.map((link) => <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer noopener' : undefined} className="inline-flex items-center gap-1.5 rounded-md border border-accent/50 px-2.5 py-1.5 text-xs text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{link.label} {link.external && <ExternalLink size={11} aria-hidden />}</a>)}</div>}
    {!progressive && response.followUps && <div className="mt-3 flex flex-wrap gap-2">{response.followUps.map((question) => <button key={question} type="button" onClick={() => onFollowUp(question)} className="text-left text-xs text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{question}</button>)}</div>}
  </>
}

export default function PortfolioAssistant() {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [typingResponse, setTypingResponse] = useState<AssistantResponse | null>(null)
  const [typingChars, setTypingChars] = useState(0)
  const [lastProjectSlug, setLastProjectSlug] = useState<string | undefined>()
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const typingTimerRef = useRef<number | null>(null)
  const revealTimerRef = useRef<number | null>(null)
  const generationRef = useRef(0)
  const messageIdRef = useRef(10)

  const nextMessageId = () => { messageIdRef.current += 1; return messageIdRef.current }
  const cancelTyping = () => {
    if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current)
    if (revealTimerRef.current !== null) window.clearTimeout(revealTimerRef.current)
    typingTimerRef.current = null
    revealTimerRef.current = null
    generationRef.current += 1
  }

  useEffect(() => { if (open) inputRef.current?.focus() }, [open])
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight }, [messages, open, expanded, typingResponse, typingChars])
  useEffect(() => {
    if (!open || !expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open, expanded])

  useEffect(() => {
    if (!typingResponse) return
    const generation = generationRef.current
    if (typingChars >= typingResponse.intro.length) {
      revealTimerRef.current = window.setTimeout(() => {
        if (generation !== generationRef.current) return
        setMessages((current) => [...current, { id: nextMessageId(), role: 'assistant', response: typingResponse }])
        setTypingResponse(null)
        revealTimerRef.current = null
      }, reduceMotion ? 0 : 90)
      return () => { if (revealTimerRef.current !== null) window.clearTimeout(revealTimerRef.current) }
    }
    const chunkSize = reduceMotion ? typingResponse.intro.length : Math.max(2, Math.ceil(typingResponse.intro.length / 34))
    typingTimerRef.current = window.setTimeout(() => { if (generation === generationRef.current) setTypingChars((current) => Math.min(typingResponse.intro.length, current + chunkSize)) }, reduceMotion ? 0 : 22)
    return () => { if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current) }
  }, [typingResponse, typingChars, reduceMotion])

  const ask = (question: string) => {
    const text = question.trim()
    if (!text) return
    cancelTyping()
    const response = getAssistantResponse(text, { lastProjectSlug, turn: messages.length })
    setMessages((current) => [...current, { id: nextMessageId(), role: 'visitor', text }])
    setLastProjectSlug(response.contextProjectSlug ?? lastProjectSlug)
    setTypingResponse(response)
    setTypingChars(0)
    setInput('')
  }
  const refreshChat = () => {
    cancelTyping()
    setMessages([{ ...welcomeMessage, id: nextMessageId() }])
    setTypingResponse(null)
    setTypingChars(0)
    setLastProjectSlug(undefined)
    setInput('')
    inputRef.current?.focus()
  }
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input) }
  const closeChat = () => { setExpanded(false); setOpen(false) }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (target instanceof Element && target.closest('[data-theme-toggle="true"]')) return
      if (!panelRef.current?.contains(target) && !launcherRef.current?.contains(target)) closeChat()
    }
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeChat() }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return <>
    {open && expanded && <button type="button" aria-label="Close expanded assistant backdrop" onClick={closeChat} className="fixed inset-0 z-40 cursor-default bg-bg/75 backdrop-blur-sm" />}
    <div className={expanded ? 'fixed inset-0 z-50 flex items-stretch justify-center p-0 sm:items-center sm:p-6' : 'fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6'}>
      {open && <section ref={panelRef} className={`assistant-panel-enter flex flex-col overflow-hidden border border-border bg-bg shadow-card ${expanded ? 'h-[100dvh] w-full rounded-none sm:h-[min(74dvh,680px)] sm:w-[min(750px,calc(100vw-3rem))] sm:rounded-2xl' : 'mb-3 h-[min(640px,calc(100dvh-7rem))] w-[min(410px,calc(100vw-2rem))] rounded-xl'}`} role="dialog" aria-modal={expanded} aria-label="Rimsha's Portfolio Assistant">
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-3 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-3"><div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent-soft text-accent"><Bot size={18} aria-hidden /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" /></div><div className="min-w-0"><h2 className="truncate text-sm font-semibold text-text">Rimsha&apos;s Portfolio Assistant</h2><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Local portfolio guide</p></div></div>
          <div className="flex shrink-0 items-center gap-0.5">
            <button type="button" onClick={refreshChat} aria-label="Start a new chat" title="Start a new chat" className={iconButtonClass}><RefreshCw size={16} aria-hidden /></button>
            <button type="button" onClick={() => setExpanded((value) => !value)} aria-label={expanded ? 'Restore compact chat' : 'Expand chat'} title={expanded ? 'Restore compact chat' : 'Expand chat'} className={iconButtonClass}>{expanded ? <Minimize2 size={16} aria-hidden /> : <Maximize2 size={16} aria-hidden />}</button>
            <button type="button" onClick={closeChat} aria-label="Minimize chat" title="Minimize chat" className={iconButtonClass}><Minus size={16} aria-hidden /></button>
            <button type="button" onClick={closeChat} aria-label="Close chat" title="Close chat" className={iconButtonClass}><X size={17} aria-hidden /></button>
          </div>
        </header>
        <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5" aria-live="polite">
          {messages.map((message) => <div key={message.id} className={`flex ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[92%] rounded-xl px-3.5 py-3 text-sm ${message.role === 'visitor' ? 'bg-accent text-bg' : 'border border-border bg-surface text-text'}`}>{message.role === 'visitor' ? <p>{message.text}</p> : message.response && <AssistantContent response={message.response} onFollowUp={ask} />}</div></div>)}
          {typingResponse && <div className="flex justify-start"><div className="max-w-[92%] rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-text">{typingChars === 0 && <span className="typing-dots" aria-label="Assistant is replying"><span /><span /><span /></span>}<AssistantContent response={typingResponse} progressive={typingChars < typingResponse.intro.length} introOverride={typingResponse.intro.slice(0, typingChars)} onFollowUp={ask} /></div></div>}
        </div>
        <div className="shrink-0 border-t border-border bg-surface/70 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4">
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"><Sparkles size={12} className="text-accent" aria-hidden /> Choose a topic</div>
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">{assistantQuickReplies.slice(0, 4).map((question) => <button key={question} type="button" onClick={() => ask(question)} className="shrink-0 rounded-full border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{question}</button>)}</div>
          <form onSubmit={submit} className="flex items-center gap-2"><label htmlFor="portfolio-assistant-input" className="sr-only">Ask the portfolio assistant</label><input ref={inputRef} id="portfolio-assistant-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Rimsha..." className="min-w-0 flex-1 rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30" /><button type="submit" aria-label="Send message" title="Send message" className="rounded-md bg-accent p-2.5 text-bg transition-colors hover:bg-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><Send size={16} aria-hidden /></button></form>
        </div>
      </section>}
      {!open && <button ref={launcherRef} type="button" onClick={() => setOpen(true)} aria-label="Open portfolio assistant" title="Open portfolio assistant" className="group flex items-center gap-2 rounded-full border border-accent/60 bg-surface px-3 py-3 text-accent shadow-card transition-all hover:-translate-y-1 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><MessageCircle size={20} aria-hidden /><span className="hidden font-mono text-xs sm:inline">Ask about Rimsha</span></button>}
    </div>
  </>
}
