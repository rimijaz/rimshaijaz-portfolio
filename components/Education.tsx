'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { education } from '../data/education'

export default function Education() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading number="05" title="Education" />
      <div className="education-timeline">
        {education.map((item, index) => (
          <motion.article
            key={item.degree}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { x: 5 }}
            className="education-entry group"
          >
            <div className="education-meta">
              <span className="education-number">0{index + 1}</span>
              <span className="education-range">{item.range}</span>
            </div>
            <div className="education-marker" aria-hidden><GraduationCap size={19} /></div>
            <div className="education-content">
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
