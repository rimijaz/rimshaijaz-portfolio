import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { socialLinks } from '../data/socials'
import { siteConfig } from '../data/siteConfig'

const socialItems = [
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { key: 'email', href: socialLinks.email ? `mailto:${socialLinks.email}` : '', label: 'Email', Icon: Mail },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-border pb-10 pt-8 font-mono text-xs text-muted">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="order-2 sm:order-1">
          {socialItems.length > 0 && (
            <ul className="flex items-center gap-5">
              {socialItems.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel={key === 'email' ? undefined : 'noreferrer noopener'}
                    aria-label={label}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="order-1 sm:order-2">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>

        <div className="order-3">
          {siteConfig.resumeUrl ? (
            <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-accent">
              Resume
            </a>
          ) : (
            <span aria-disabled="true" title="Resume coming soon" className="cursor-not-allowed text-muted/60">
              Resume
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}
