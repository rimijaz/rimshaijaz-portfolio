'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import SectionHeading from './SectionHeading'
import ProjectImage from './ProjectImage'
import { projects, type Project } from '../data/projects'

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-editorial-links ${compact ? 'project-editorial-links--compact' : ''}`}>
      {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={15} aria-hidden /></a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live preview <ArrowUpRight size={15} aria-hidden /></a>}
      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub size={15} aria-hidden /> GitHub</a>}
      {!project.url && !project.demo && !project.github && <span className="font-mono text-xs text-muted">Private project</span>}
    </div>
  )
}

function StackLine({ project }: { project: Project }) {
  return <div className="project-editorial-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
}

export default function Projects() {
  const [showMore, setShowMore] = useState(false)
  const reduceMotion = useReducedMotion()
  const lead = projects[0]
  const featureTrail = projects.slice(1, 3)
  const archive = projects.slice(3)
  // ProAdvisorDrivers is intentionally kept in its existing PD presentation.
  const pdProject = archive.find((project) => project.slug === 'proadvisordrivers')
  const verticalProjects = archive.filter((project) => project.slug !== 'proadvisordrivers')

  return (
    <div>
      <SectionHeading number="04" title="Some Things I've Built" />
      <p className="mb-8 max-w-3xl leading-relaxed text-muted">
        Selected work across SaaS and business products, including responsive frontend workflows, API integrations,
        payment flows, and technical SEO.
      </p>

      <div className="project-editorial">
        <Reveal className="project-lead">
          <div className="project-lead-copy">
            <p className="project-editorial-kicker">MERN product foundation</p>
            <h3 className="project-lead-title">{lead.name}</h3>
            <p className="project-lead-description">{lead.description}</p>
            <StackLine project={lead} />
            <ProjectLinks project={lead} />
          </div>
          <div className="project-lead-media group">
            <ProjectImage slot={lead.imageSlots[0]} className="project-editorial-image transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
            <span className="project-image-caption">01 / Selected work</span>
          </div>
        </Reveal>

        <div className="project-feature-trail">
          {featureTrail.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08} className={`project-trail-item ${index % 2 ? 'project-trail-item--reverse' : ''}`}>
              <div className="project-trail-media group">
                <ProjectImage slot={project.imageSlots[0]} className="project-editorial-image transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                <span className="project-image-caption">0{index + 2} / Product view</span>
              </div>
              <div className="project-trail-copy">
                <p className="project-editorial-kicker">{index === 0 ? 'Business operations' : 'Career development'}</p>
                <h3 className="project-trail-title">{project.name}</h3>
                <p className="project-trail-description">{project.description}</p>
                <StackLine project={project} />
                <ProjectLinks project={project} compact />
              </div>
            </Reveal>
          ))}
        </div>

        <motion.button
          type="button"
          aria-expanded={showMore}
          onClick={() => setShowMore((expanded) => !expanded)}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="project-show-more cursor-pointer"
        >
          <span>{showMore ? 'Show Less' : 'Show More Projects'}</span>
          <ArrowUpRight size={17} aria-hidden className={showMore ? 'rotate-[-90deg]' : ''} />
        </motion.button>

        <AnimatePresence initial={false}>
          {showMore && archive.length > 0 && (
            <motion.section
              key="more-work"
              initial={{ opacity: 0, height: 0, y: -12 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="project-index project-index-expandable"
            >
              <div className="project-index-heading"><h3 className="project-editorial-kicker">More work</h3><p className="font-mono text-xs text-muted">A wider view of shipped products</p></div>
              <div className="project-card-grid">
                {verticalProjects.map((project, index) => (
                  <Reveal key={project.name} delay={index * 0.05} className="project-more-card project-vertical-card group">
                    <div className="project-more-media project-vertical-media">
                      <ProjectImage slot={project.imageSlots[0]} className="project-editorial-image transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
                    </div>
                    <div className="project-more-copy project-vertical-copy">
                      <div className="project-more-title-row">
                        <span className="project-more-kicker">0{archive.indexOf(project) + 4} / Product view</span>
                        <h3>{project.name}</h3>
                      </div>
                      <p>{project.description}</p>
                      <StackLine project={project} />
                      <ProjectLinks project={project} compact />
                    </div>
                  </Reveal>
                ))}
              </div>
              {pdProject && (
                <div className="project-more-grid">
                  <Reveal key={pdProject.name} delay={archive.indexOf(pdProject) * 0.05} className="project-more-card group project-more-card--text">
                    <div className="project-more-text-mark" aria-hidden>PD</div>
                    <div className="project-more-copy">
                      <div className="project-more-title-row"><span className="project-more-kicker">Private project / Text presentation</span><h3>{pdProject.name}</h3></div>
                      <p>{pdProject.description}</p>
                      <StackLine project={pdProject} />
                      <ProjectLinks project={pdProject} compact />
                    </div>
                  </Reveal>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
