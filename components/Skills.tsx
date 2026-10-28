'use client'
import type { ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMaterialdesign,
  SiRedux,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiGit,
  SiGithub,
  SiFramer,
} from 'react-icons/si'
import { Globe } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { skills } from '../data/skills'

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Material UI': SiMaterialdesign,
  Redux: SiRedux,
  'Redux Toolkit': SiRedux,
  'RTK Query': SiRedux,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': Globe,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  'Framer Motion': SiFramer,
}

export default function Skills() {
  const reduceMotion = useReducedMotion()
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div>
      <SectionHeading number="02" title="Skills & Technologies" />

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category, i) => (
          <motion.div
            key={category}
            initial={reduceMotion ? false : { y: 16 }}
            whileInView={reduceMotion ? undefined : { y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <h3 className="font-mono text-xs uppercase tracking-wide text-accent">{category}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => {
                  const Icon = iconMap[skill.name]
                  return (
                    <li
                      key={skill.name}
                      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-text"
                    >
                      {Icon && <Icon size={14} className="text-muted" aria-hidden />}
                      {skill.name}
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
