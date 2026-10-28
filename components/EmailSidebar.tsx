import { socialLinks } from '../data/socials'

export default function EmailSidebar() {
  if (!socialLinks.email) return null

  return (
    <div className="fixed bottom-0 right-4 z-30 hidden flex-col items-center lg:flex 2xl:right-6">
      <a
        href={`mailto:${socialLinks.email}`}
        className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-accent"
        style={{ writingMode: 'vertical-rl' }}
      >
        {socialLinks.email}
      </a>
      <span className="mt-5 h-24 w-px bg-border" aria-hidden />
    </div>
  )
}
