'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import HeroVisual from './HeroVisual'
import TechnologyPills from './TechnologyPills'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const heroDescription = 'I build responsive SaaS products and business applications with React.js, Next.js, and TypeScript—bringing together reusable UI, API integration, technical SEO, performance, and AI-assisted workflows.'

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
      className="hero-shell relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-6xl items-center justify-center overflow-visible py-3 sm:py-5 lg:py-6"
    >
      <div className="relative z-10 flex w-full min-w-0 flex-col items-center gap-5 lg:gap-6">
        <div className="w-full max-w-3xl text-center">
          <motion.div variants={item} className="hero-profile mx-auto mb-3 overflow-hidden rounded-full" aria-label="Profile image of Rimsha Ijaz">
            <img src="/profile_image.png" alt="Rimsha Ijaz" className="h-full w-full object-cover object-center" loading="eager" decoding="async" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <motion.p variants={item} className="hero-kicker font-mono text-[0.65rem] tracking-[0.14em] text-accent sm:text-xs">
              {siteConfig.title} / Frontend Development
            </motion.p>
            <motion.span variants={item} className="hero-experience-badge">2.5+ Years of Experience</motion.span>
          </div>

          <motion.h1 variants={item} className="hero-title mt-2 text-[clamp(2.1rem,7vw,5.2rem)] font-bold leading-none tracking-[-0.065em]">
            {siteConfig.fullName}
          </motion.h1>

          <motion.h2 variants={item} className="mx-auto mt-2 max-w-2xl text-base font-semibold leading-tight text-text sm:text-xl lg:text-2xl">
            {siteConfig.headline}
          </motion.h2>

          <motion.p variants={item} className="mx-auto mt-2 max-w-2xl text-[0.82rem] leading-relaxed text-muted sm:text-sm lg:text-base">
            {heroDescription}
          </motion.p>

          <motion.div variants={item} className="mt-3 flex flex-wrap justify-center gap-2">
            <a href="#projects" className="magnetic-button inline-flex items-center gap-2 rounded-md border border-accent/80 bg-accent-soft px-6 py-3 font-mono text-sm text-accent transition-all hover:bg-accent/20">
              Explore My Work <ArrowRight size={16} aria-hidden />
            </a>
            <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer noopener" className="magnetic-button inline-flex items-center gap-2 rounded-md border border-accent/45 bg-surface/70 px-6 py-3 font-mono text-sm text-text transition-all hover:border-accent hover:bg-accent-soft hover:text-accent">
              View Resume <Download size={15} aria-hidden />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-3">
            <TechnologyPills />
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </motion.div>
  )
}
