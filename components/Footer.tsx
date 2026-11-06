import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { socialLinks } from '../data/socials'
import { siteConfig } from '../data/siteConfig'
import BackToTop from './BackToTop'
import RILogo from './RILogo'
import BrandLockup from './BrandLockup'

const socialItems = [
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { key: 'email', href: socialLinks.email ? `mailto:${socialLinks.email}` : '', label: 'Email', Icon: Mail },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-border pb-5 pt-5 font-mono text-xs text-muted sm:mt-16 sm:pt-6">
      <BackToTop />
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-5">
        <div className="footer-brand flex items-center gap-3">
          <a href="#" aria-label={`${siteConfig.name} — back to top`} className="ri-logo-shell flex h-9 w-9 items-center justify-center text-accent transition-all hover:scale-105 hover:text-text">
            <RILogo size="small" />
          </a>
          <BrandLockup variant="footer" />
        </div>
        <div className="order-2 sm:order-1">
          {socialItems.length > 0 && (
            <ul className="flex items-center gap-3">
              {socialItems.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel={key === 'email' ? undefined : 'noreferrer noopener'}
                    aria-label={label}
                    className="social-link inline-flex rounded-md p-1.5 text-muted transition-all hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent hover:shadow-[0_8px_18px_rgba(var(--color-accent-rgb),0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer noopener" className="social-text-link rounded-md px-2 py-1 transition-all hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
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
