'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { experience } from '../data/experience'

export default function Experience() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading number="03" title="Where I've Worked" />

      <div className="space-y-12">
        {experience.map((job, idx) => (
          <motion.div
            key={job.company}
            initial={reduceMotion ? false : { y: 16 }}
            whileInView={reduceMotion ? undefined : { y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="grid gap-3 border-b border-border pb-12 last:border-b-0 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <div>
              <p className="font-mono text-sm text-accent">{job.range}</p>
              <p className="mt-1 text-sm text-muted">
                {job.location} · {job.type}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text">
                {job.role} <span className="text-accent">@ {job.company}</span>
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-4 space-y-2">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-1.5 text-accent" aria-hidden>
                      ▹
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
