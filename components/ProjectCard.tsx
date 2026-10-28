'use client'
import { motion } from 'framer-motion'
import { Folder, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '../data/projects'
import ProjectImage from './ProjectImage'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/60 hover:shadow-glow"
    >
      <div className="aspect-[16/9] border-b border-border">
        <ProjectImage slot={project.imageSlots[0]} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <Folder className="text-accent" size={30} aria-hidden />
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
