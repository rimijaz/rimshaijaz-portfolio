import { socialLinks } from '../data/socials'

export default function EmailSidebar() {
  if (!socialLinks.email) return null

  return (
    <div className="fixed bottom-0 right-4 z-30 hidden flex-col items-center lg:flex 2xl:right-6">
      <a
        href={`mailto:${socialLinks.email}`}
        aria-label={`Email Rimsha at ${socialLinks.email}`}
        className="social-email rounded-md px-1.5 py-1 font-mono text-xs tracking-wide text-muted transition-all hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent hover:shadow-[0_8px_18px_rgba(var(--color-accent-rgb),0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ writingMode: 'vertical-rl' }}
      >
        {socialLinks.email}
      </a>
      <span className="mt-5 h-24 w-px bg-border" aria-hidden />
    </div>
  )
}
