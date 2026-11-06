'use client'

import type { PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Braces, Code2, GitBranch, Sparkles } from 'lucide-react'

export default function HeroVisual() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [8, -8]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-10, 10]), { stiffness: 180, damping: 22 })

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width)
    pointerY.set((event.clientY - bounds.top) / bounds.height)
  }

  function resetPointer() {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <div
      aria-hidden
      className="hero-visual pointer-events-auto relative mx-auto hidden h-[10rem] w-full max-w-[14rem] sm:block lg:h-[13rem] lg:max-w-[16rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateY }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-grid" />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="hero-ring hero-ring--outer"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="hero-ring hero-ring--inner"
        />
        <div className="hero-code-card hero-code-card--main">
          <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.8)]" />
            product engineering
          </div>
          <div className="mt-4 space-y-2 font-mono text-xs text-muted sm:text-sm">
            <p><span className="text-accent">const</span> experience =</p>
            <p className="pl-5 text-text">build<span className="text-accent">(</span>clarity<span className="text-accent">)</span></p>
            <p className="pl-10 text-accent">.ship<span className="text-text">(quality)</span></p>
            <p className="pl-5 text-text">.iterate<span className="text-accent">()</span></p>
          </div>
        </div>
        <div className="hero-code-card hero-code-card--float">
          <Sparkles size={15} className="text-accent" />
          <span className="font-mono text-xs text-text">AI-assisted workflow</span>
        </div>
        <div className="hero-icon-card hero-icon-card--one"><Code2 size={18} /></div>
        <div className="hero-icon-card hero-icon-card--two"><GitBranch size={18} /></div>
        <div className="hero-icon-card hero-icon-card--three"><Braces size={18} /></div>
      </motion.div>
    </div>
  )
}
