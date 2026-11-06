'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import TechnologyPills from './TechnologyPills'

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading number="01" title="About Me" />

      <div className="about-layout grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(15rem,0.65fr)] md:items-start md:gap-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="about-copy space-y-5 leading-relaxed text-muted"
        >
          <p>
            I&apos;m a <strong className="about-highlight">Senior Software Engineer</strong> with 2.5+ years of professional experience at AppliconSoft,
            building and maintaining production web applications across SaaS, ERP, productivity, and AI product
            domains. My focus is <strong className="about-highlight">Frontend Development</strong> for real client and company products.
          </p>
          <p>
            I use <strong className="about-highlight">React.js</strong>, <strong className="about-highlight">Next.js</strong>, TypeScript, and modern UI tools
            to turn product requirements into responsive interfaces and reusable components. My work
            also includes connecting frontend features to REST APIs and backend services.
          </p>
          <p>
            I contribute to technical SEO and performance through work such as metadata, structured
            data, canonical URLs, and responsive, efficient page experiences. AI tools including
            Claude, Cursor, GitHub Copilot, OpenAI Codex, and ChatGPT support my workflow alongside
            code review, testing, and validation.
          </p>

        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="about-rail"
        >
          <div className="about-rail-mark" aria-hidden="true">01</div>
          <div className="about-rail-copy">
            <p className="about-rail-kicker">Technologies I work with regularly</p>
            <TechnologyPills />
          </div>
        </motion.aside>
      </div>
    </div>
  )
}
