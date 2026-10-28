'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '../data/projects'
import ProjectImage from './ProjectImage'

export default function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion()
  const imageFirst = index % 2 === 0

  return (
    <motion.div
      initial={reduceMotion ? false : { y: 24 }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="grid items-center gap-6 md:grid-cols-12"
    >
      <div
        className={`group relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface md:col-span-7 ${
          imageFirst ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <ProjectImage slot={project.imageSlots[0]} className="relative z-[1]" />
        <div className="pointer-events-none absolute -right-10 -top-10 z-[2] h-40 w-40 rounded-full bg-accent/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 z-[2] h-36 w-36 rounded-full bg-accent/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute inset-0 bg-bg/0 transition-colors duration-300 group-hover:bg-bg/10" />
      </div>

      <div className={`md:col-span-5 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
        <p className="font-mono text-sm text-accent">Selected Work</p>
        <h3 className="mt-2 text-xl font-semibold text-text sm:text-2xl">{project.name}</h3>
        <div className="mt-3 rounded-lg border border-border bg-surface p-5 leading-relaxed text-muted">
          {project.description}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent"
            >
              Live Site <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent"
            >
              <FaGithub size={16} aria-hidden /> Code
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent">
              Visit project <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          {!project.demo && !project.github && !project.url && <span className="font-mono text-xs text-muted">Private project</span>}
        </div>
      </div>
    </motion.div>
  )
}
