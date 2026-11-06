'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import ThemeToggle from './ThemeToggle'
import RILogo from './RILogo'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActive(isHome ? 'about' : '')
  }, [isHome])

  useEffect(() => {
    if (!isHome) return

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 min-h-16 transition-colors ${
        scrolled || open ? 'border-b border-border bg-bg/95 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-6 py-3 sm:px-10 sm:py-4">
        <a
          href="#"
          aria-label={`${siteConfig.name} — back to top`}
          className="ri-logo-shell flex h-10 w-auto items-center gap-3 px-1 text-accent transition-all hover:scale-105 hover:text-text"
        >
          <RILogo />
          <span className="nav-brand-copy hidden lg:flex lg:flex-col">
            <span className="font-sans text-xs font-semibold leading-none text-text">{siteConfig.fullName}</span>
            <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">{siteConfig.title}</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'projects' ? '/#projects' : (isHome ? `#${item.id}` : `/#${item.id}`)}
              aria-current={active === item.id ? 'true' : undefined}
              className={`group relative inline-flex items-center gap-2 pb-2 font-mono text-sm transition-colors ${
                active === item.id ? 'text-accent' : 'text-muted hover:text-text'
              }`}
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-transform duration-200 group-hover:scale-125" />
              <span>{item.label}</span>
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 ${
                  active === item.id ? 'scale-x-100' : ''
                }`}
              />
            </a>
          ))}
          {siteConfig.resumeUrl ? (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent-soft"
            >
              Resume
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Resume coming soon"
              className="cursor-not-allowed rounded-md border border-border px-4 py-2 font-mono text-sm text-muted"
            >
              Resume
            </span>
          )}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="rounded-md border border-border p-2 text-text"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border bg-bg px-6 py-7 shadow-card md:hidden sm:px-10"
          >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                <a
                  href={item.id === 'projects' ? '/#projects' : (isHome ? `#${item.id}` : `/#${item.id}`)}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 font-mono text-lg transition-all duration-200 ${active === item.id ? 'border-accent bg-accent-soft text-accent shadow-[0_0_18px_rgba(var(--color-accent-rgb),0.1)]' : 'border-transparent text-text hover:border-border hover:bg-accent-soft/50'}`}
                >
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {siteConfig.resumeUrl ? (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-10 inline-block rounded-md border border-accent px-5 py-2.5 font-mono text-sm text-accent"
            >
              Resume
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="mt-10 inline-block cursor-not-allowed rounded-md border border-border px-5 py-2.5 font-mono text-sm text-muted"
            >
              Resume coming soon
            </span>
          )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
