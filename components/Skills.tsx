'use client'

import type { ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiTailwindcss, SiCssmodules, SiFramer, SiRedux, SiNodedotjs, SiExpress,
  SiPhp, SiCodeigniter, SiMongodb, SiGit, SiGithub, SiVercel, SiFigma,
  SiGithubcopilot, SiCursor, SiClaude,
} from 'react-icons/si'
import { Gauge, Globe, Search, Sparkles, Workflow } from 'lucide-react'
import SectionHeading from './SectionHeading'

type IconComponent = ComponentType<{ size?: number; className?: string }>
type Skill = { name: string; icon?: IconComponent; featured?: boolean }

const iconMap: Record<string, IconComponent> = {
  'React.js': SiReact, 'Next.js': SiNextdotjs, JavaScript: SiJavascript, TypeScript: SiTypescript,
  HTML5: SiHtml5, CSS3: SiCss, 'Tailwind CSS': SiTailwindcss, 'CSS Modules': SiCssmodules,
  'Framer Motion': SiFramer, 'Redux Toolkit': SiRedux, 'RTK Query': SiRedux,
  'Context API': Workflow, 'Node.js': SiNodedotjs, 'Express.js': SiExpress, PHP: SiPhp,
  CodeIgniter: SiCodeigniter, 'REST APIs': Globe, MongoDB: SiMongodb, Git: SiGit,
  GitHub: SiGithub, Vercel: SiVercel, Figma: SiFigma, 'GitHub Copilot': SiGithubcopilot,
  Cursor: SiCursor, Claude: SiClaude, 'OpenAI Codex': Sparkles,
  'Google PageSpeed Insights': Gauge, 'Google Lighthouse': Gauge,
  Performance: Gauge, 'Core Web Vitals': Gauge, 'Technical SEO': Search,
  'On-Page SEO': Search, 'Schema Markup': Search,
}

const coreSkills: Skill[] = [
  { name: 'React.js', featured: true }, { name: 'Next.js', featured: true },
  { name: 'TypeScript', featured: true }, { name: 'JavaScript', featured: true },
  { name: 'Tailwind CSS', featured: true },
]

const skillGroups: { label: string; number: string; skills: Skill[] }[] = [
  { label: 'Frontend Development', number: '01', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'].map((name) => ({ name })) },
  { label: 'Styling & UI', number: '02', skills: ['Tailwind CSS', 'Material UI', 'CSS Modules', 'Framer Motion', 'Responsive Design'].map((name) => ({ name })) },
  { label: 'State Management', number: '03', skills: ['Redux Toolkit', 'RTK Query', 'Context API', 'React Router'].map((name) => ({ name })) },
  { label: 'Backend & APIs', number: '04', skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT / OAuth', 'PHP', 'CodeIgniter'].map((name) => ({ name })) },
  { label: 'Database', number: '05', skills: ['MongoDB'].map((name) => ({ name })) },
  { label: 'Integrations', number: '06', skills: ['Stripe', 'DHL / Trello', 'AI / LLM APIs'].map((name) => ({ name })) },
  { label: 'Performance & Optimization', number: '07', skills: ['Google PageSpeed Insights', 'Google Lighthouse', 'Core Web Vitals', 'Performance', 'Accessibility'].map((name) => ({ name })) },
  { label: 'Technical SEO', number: '08', skills: ['Technical SEO', 'On-Page SEO', 'Schema Markup'].map((name) => ({ name })) },
  { label: 'AI-Assisted Development', number: '09', skills: ['ChatGPT', 'Claude', 'GitHub Copilot', 'Cursor', 'OpenAI Codex'].map((name) => ({ name })) },
  { label: 'Development Tools', number: '10', skills: ['Git', 'GitHub', 'Vite', 'Postman', 'Vercel', 'Figma'].map((name) => ({ name })) },
]

function SkillIcon({ name, size = 18 }: { name: string; size?: number }) {
  const Icon = iconMap[name]
  return Icon ? <Icon size={size} aria-hidden /> : <Sparkles size={size} aria-hidden />
}

export default function Skills() {
  const reduceMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div>
      <SectionHeading number="02" title="Skills & Technologies" />

      <div className="skills-atlas">
        <motion.div {...reveal()} className="skills-atlas-intro">
          <div>
            <p className="skills-atlas-eyebrow">Tools I use in practice</p>
            <h3 className="skills-atlas-title">The stack<br /><span>behind the work.</span></h3>
          </div>
          <p className="skills-atlas-summary">The technologies and tools I use to build, optimize, and deliver modern web applications.</p>
        </motion.div>

        <motion.div {...reveal(0.08)} className="skills-core-band">
          <div className="skills-core-band-heading"><span>Core technologies</span><span>React · Next · TypeScript</span></div>
          <div className="skills-core-band-list">
            {coreSkills.map((skill, index) => (
              <motion.div key={skill.name} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: 0.2 }} className="skills-core-atlas-item group">
                <span className="skills-core-atlas-number">0{index + 1}</span>
                <span className="skills-core-atlas-icon"><SkillIcon name={skill.name} size={index === 0 ? 42 : 34} /></span>
                <span className="skills-core-atlas-name">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="skills-category-grid">
          {skillGroups.map((group, index) => (
            <motion.section key={group.label} {...reveal(0.12 + index * 0.04)} className={`skills-category skills-category--${index + 1}`}>
              <div className="skills-category-heading"><span>{group.number}</span><h4>{group.label}</h4></div>
              <div className="skills-category-list">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="skills-atlas-item group">
                    <SkillIcon name={skill.name} size={17} />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div {...reveal(0.25)} className="skills-atlas-footer">
          <Workflow size={18} className="text-accent" aria-hidden />
          <span>Frontend engineering / Product delivery / AI-assisted workflows</span>
        </motion.div>
      </div>
    </div>
  )
}
