'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent shadow-[0_0_14px_rgba(var(--color-accent-rgb),0.8)]" style={{ scaleX }} aria-hidden />
}
