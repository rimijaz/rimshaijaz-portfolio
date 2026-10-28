'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { socialLinks } from '../data/socials'

export default function Contact() {
  const hasEmail = Boolean(socialLinks.email)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { y: 16 }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-xl text-center"
    >
      <p className="font-mono text-sm text-accent">06. What&apos;s Next?</p>
      <h2 className="mt-3 text-3xl font-bold text-text sm:text-4xl">Get In Touch</h2>

      <p className="mt-5 leading-relaxed text-muted">
        I&apos;m open to thoughtful collaborations and opportunities where I can help build fast,
        accessible, well-crafted web products. If that sounds like a fit, reach out.
      </p>

      <a
        href={hasEmail ? `mailto:${socialLinks.email}` : undefined}
        aria-disabled={!hasEmail}
        className={`mt-8 inline-flex items-center gap-2 rounded-md border px-8 py-4 font-mono text-sm transition-all ${
          hasEmail
            ? 'border-accent text-accent hover:-translate-y-0.5 hover:bg-accent-soft'
            : 'cursor-not-allowed border-border text-muted'
        }`}
      >
        Send Me an Email {hasEmail && <ArrowUpRight size={16} aria-hidden />}
      </a>

      {!hasEmail && <p className="mt-3 font-mono text-xs text-muted">Email coming soon.</p>}
    </motion.div>
  )
}
