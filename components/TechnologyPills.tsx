import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs } from 'react-icons/si'
import type { IconType } from 'react-icons'

const technologies: { name: string; Icon: IconType }[] = [
  { name: 'React.js', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
]

export default function TechnologyPills() {
  return (
    <ul className="technology-pill-list" aria-label="Technologies I work with regularly">
      {technologies.map(({ name, Icon }) => (
        <li key={name} className="technology-pill" tabIndex={0}>
          <Icon className="technology-pill-icon" size={15} aria-hidden />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  )
}
