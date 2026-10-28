import SectionHeading from './SectionHeading'
import FeaturedProject from './FeaturedProject'
import ProjectCard from './ProjectCard'
import { featuredProjects, otherProjects } from '../data/projects'

export default function Projects() {
  return (
    <div>
      <SectionHeading number="04" title="Some Things I've Built" />

      <div className="space-y-20">
        {featuredProjects.map((project, i) => (
          <FeaturedProject key={project.name} project={project} index={i} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-24">
          <h3 className="text-center text-xl font-semibold text-text">Other Noteworthy Projects</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
