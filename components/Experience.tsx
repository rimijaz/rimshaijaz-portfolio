'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { experience } from '../data/experience'

export default function Experience() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading number="03" title="Where I've Worked" />
      <p className="mb-8 max-w-3xl leading-relaxed text-muted">
        At AppliconSoft, I progressed from a React JS internship to Senior Software Engineer, contributing
        to frontend delivery across production applications and company websites.
      </p>

      <div className="career-path relative">
        {experience.map((job, idx) => (
          <motion.article
            key={`${job.company}-${job.role}-${job.range}`}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { x: 5 }}
            className="career-entry group relative grid gap-4 pb-14 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14"
          >
            <div className="career-meta relative pl-8 sm:pl-0">
              <span className="career-marker" aria-hidden />
              <p className="font-mono text-4xl font-semibold tracking-[-0.08em] text-accent/80 sm:text-5xl">
                {job.range.match(/\d{4}/)?.[0]}
              </p>
              <p className="mt-2 max-w-[10rem] font-mono text-xs leading-relaxed text-muted">
                {job.range}
              </p>
              <p className="mt-1 text-xs text-muted">
                {job.location} · {job.type}
              </p>
            </div>

            <div className="career-content min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs tracking-[0.18em] text-accent">0{idx + 1}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-text sm:text-3xl">
                  {job.role}
                </h3>
              </div>
              <p className="mt-1 text-lg font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
                {job.company}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {job.responsibilities.map((item) => (
                  <li key={item} className="career-responsibility flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="career-rule mt-8 h-px w-full origin-left bg-border/60 transition-transform duration-500 group-hover:scale-x-[0.94]" aria-hidden />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
