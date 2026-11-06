'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Folder, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '../data/projects'
import ProjectImage from './ProjectImage'

export default function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1, rotateY: -1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="project-secondary tilt-card flex h-full flex-col overflow-hidden rounded-2xl bg-transparent"
    >
      <div className="project-secondary-media group aspect-[16/9] overflow-hidden rounded-xl bg-surface/70 shadow-card">
        <ProjectImage slot={project.imageSlots[0]} className="transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-center justify-between">
          <Folder className="text-accent" size={24} aria-hidden />
          <div className="flex items-center gap-3 text-muted">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} on GitHub`}
              className="transition-colors hover:text-accent"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} live demo`}
              className="transition-colors hover:text-accent"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
          {project.url && !project.demo && (
            <a href={project.url} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} website`} className="transition-colors hover:text-accent">
              <ArrowUpRight size={18} />
            </a>
          )}
          </div>
        </div>

      <h3 className="mt-4 text-base font-semibold text-text">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {project.url && <a href={project.url} target="_blank" rel="noreferrer noopener" className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-accent transition-colors hover:text-text">Visit project <ArrowUpRight size={14} aria-hidden /></a>}
      </div>
    </motion.div>
  )
}
