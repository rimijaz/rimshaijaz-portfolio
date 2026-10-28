import SectionHeading from './SectionHeading'
import { education } from '../data/education'

export default function Education() {
  return (
    <div>
      <SectionHeading number="05" title="Education" />
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((item) => (
          <article key={item.degree} className="rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.range}</p>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-text">{item.degree}</h3>
            <p className="mt-2 text-sm text-muted">{item.school}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
