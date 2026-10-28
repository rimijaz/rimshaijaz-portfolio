'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { siteConfig } from '../data/siteConfig'

const nowUsing = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git']

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading number="01" title="About Me" />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <motion.div
          initial={reduceMotion ? false : { y: 16 }}
          whileInView={reduceMotion ? undefined : { y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="space-y-5 leading-relaxed text-muted"
        >
          <p>
            I&apos;m a Senior Software Engineer with 2.5+ years of experience shipping production web
            applications across SaaS, ERP, productivity, and AI domains. My focus is frontend
            engineering: turning complex product requirements into clear, responsive interfaces.
          </p>
          <p>
            I work primarily with React, Next.js, TypeScript, and Node.js, with a strong interest in
            AI-assisted products and workflows. I care about reusable architecture, technical SEO,
            accessibility, and performance because the details are what make a product feel reliable.
          </p>
          <p>
            I use tools such as Claude, Cursor, GitHub Copilot, OpenAI Codex, and ChatGPT to move
            faster while keeping review, testing, and validation firmly in the loop.
          </p>

          <p className="pt-2 text-sm text-muted">A few technologies I work with regularly:</p>
          <ul className="grid max-w-sm grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm text-muted">
            {nowUsing.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>
                  ▹
                </span>
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          aria-hidden
          className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-lg border border-accent/40 bg-surface"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-bold text-accent/70">
            {'{'}
            {siteConfig.name.charAt(0)}
            {'}'}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
