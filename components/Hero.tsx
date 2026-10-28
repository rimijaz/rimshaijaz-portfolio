'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const heroDescription = 'Building modern web experiences with a focus on frontend engineering, product quality, and thoughtful AI-powered solutions.'

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  }
  const item = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex min-h-[calc(100svh-8rem)] max-w-4xl flex-col justify-center py-4 sm:py-6"
    >
      <motion.p variants={item} className="font-mono text-sm tracking-wide text-accent sm:text-base">
        Hi, my name is
      </motion.p>

      <motion.h1 variants={item} className="mt-2 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
        {siteConfig.fullName}
      </motion.h1>

      <motion.h2 variants={item} className="mt-3 text-xl font-semibold leading-tight text-accent sm:text-2xl lg:text-3xl">
        {siteConfig.title}
      </motion.h2>

      <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {heroDescription}
      </motion.p>

      <motion.div variants={item} className="mt-6 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-md border border-accent px-6 py-3 font-mono text-sm text-accent transition-all hover:-translate-y-0.5 hover:bg-accent-soft">
            Explore My Work <ArrowRight size={16} aria-hidden />
          </a>
          <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            View Resume <Download size={15} aria-hidden />
          </a>
        </div>
        <div className="grid max-w-sm grid-cols-3 gap-4 border-l border-border pl-5 font-mono text-xs text-muted sm:min-w-[300px]">
          <div><span className="block text-xl font-semibold text-text">9</span>products shipped</div>
          <div><span className="block text-xl font-semibold text-text">2.5+</span>years building</div>
          <div><span className="block text-xl font-semibold text-text">AI</span>assisted workflows</div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-10 grid gap-4 border-t border-border pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          Selected work / product engineering
        </div>
        <a href="#about" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent">
          Scroll to explore <ArrowDown size={13} aria-hidden />
        </a>
      </motion.div>
    </motion.div>
  )
}
