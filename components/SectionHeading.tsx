'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function SectionHeading({ number, title }: { number: string; title: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 flex items-center gap-4"
    >
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="whitespace-nowrap font-mono text-lg text-accent"
        aria-hidden
      >
        {number}.
      </motion.span>
      <h2 className="text-2xl font-bold text-text sm:whitespace-nowrap sm:text-3xl">{title}</h2>
      <motion.span
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden h-px flex-1 origin-left bg-border sm:block"
        aria-hidden
      />
    </motion.div>
  )
}
