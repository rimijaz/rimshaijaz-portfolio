'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActive(isHome ? 'about' : '')
  }, [isHome])

  useEffect(() => {
    if (!isHome) return

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-border bg-bg/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#"
          aria-label={`${siteConfig.name} — back to top`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 font-mono text-lg font-bold text-accent transition-all hover:scale-105 hover:bg-accent-soft"
        >
          {siteConfig.name.charAt(0)}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'projects' ? '/#projects' : (isHome ? `#${item.id}` : `/#${item.id}`)}
              aria-current={active === item.id ? 'true' : undefined}
              className={`group relative inline-flex items-center gap-2 pb-2 font-mono text-sm transition-colors ${
                active === item.id ? 'text-accent' : 'text-muted hover:text-text'
              }`}
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-transform duration-200 group-hover:scale-125" />
              <span>{item.label}</span>
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 ${
                  active === item.id ? 'scale-x-100' : ''
                }`}
              />
            </a>
          ))}
          {siteConfig.resumeUrl ? (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent-soft"
            >
              Resume
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Resume coming soon"
              className="cursor-not-allowed rounded-md border border-border px-4 py-2 font-mono text-sm text-muted"
            >
              Resume
            </span>
          )}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-md border border-border p-2 text-text"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="fixed inset-0 top-[65px] z-40 overflow-y-auto bg-bg px-6 py-10 md:hidden">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.id === 'projects' ? '/#projects' : (isHome ? `#${item.id}` : `/#${item.id}`)}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 font-mono text-lg ${active === item.id ? 'text-accent' : 'text-text'}`}
                >
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {siteConfig.resumeUrl ? (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-10 inline-block rounded-md border border-accent px-5 py-2.5 font-mono text-sm text-accent"
            >
              Resume
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="mt-10 inline-block cursor-not-allowed rounded-md border border-border px-5 py-2.5 font-mono text-sm text-muted"
            >
              Resume coming soon
            </span>
          )}
        </nav>
      )}
    </header>
  )
}
