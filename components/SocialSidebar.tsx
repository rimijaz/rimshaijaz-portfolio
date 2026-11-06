import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { socialLinks } from '../data/socials'

const socialItems = [
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { key: 'email', href: socialLinks.email ? `mailto:${socialLinks.email}` : '', label: 'Email', Icon: Mail },
].filter((s) => s.href)

export default function SocialSidebar() {
  if (socialItems.length === 0) return null

  return (
    <div className="fixed bottom-0 left-4 z-30 hidden flex-col items-center lg:flex 2xl:left-6">
      <ul className="flex flex-col items-center gap-5">
        {socialItems.map(({ key, href, label, Icon }) => (
          <li key={key}>
            <a
              href={href}
              target={key === 'email' ? undefined : '_blank'}
              rel={key === 'email' ? undefined : 'noreferrer noopener'}
              aria-label={label}
              className="social-link inline-flex rounded-md p-1.5 text-muted transition-all hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent hover:shadow-[0_8px_18px_rgba(var(--color-accent-rgb),0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon size={20} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <span className="mt-5 h-24 w-px bg-border" aria-hidden />
    </div>
  )
}
