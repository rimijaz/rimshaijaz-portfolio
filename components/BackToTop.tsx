'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
      title="Back to top"
      className="back-to-top group inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent-soft hover:shadow-[0_10px_24px_rgba(var(--color-accent-rgb),0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ArrowUp size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
