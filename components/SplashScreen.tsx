'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'

const SESSION_KEY = 'portfolio-splash-shown'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const links = [
  [32, 66, 88, 38], [88, 38, 148, 62], [148, 62, 196, 42], [32, 66, 52, 132],
  [52, 132, 112, 168], [112, 168, 196, 142], [196, 42, 196, 142], [88, 38, 112, 168],
]

const nodes = [[32, 66], [88, 38], [148, 62], [196, 42], [52, 132], [112, 168], [196, 142]]

export default function SplashScreen() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false)
      return
    }
    sessionStorage.setItem(SESSION_KEY, '1')
  }, [])

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 700 : 2450)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [visible, reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash-shell"
          role="status"
          aria-label={`Loading ${siteConfig.fullName}'s portfolio`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="splash-ambient splash-ambient--one" aria-hidden="true" />
          <div className="splash-ambient splash-ambient--two" aria-hidden="true" />
          <div className="splash-scanline" aria-hidden="true" />

          <div className="splash-content">
            <motion.div
              className="splash-core-wrap"
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <div className="splash-core-halo" />
              <svg className="splash-network" viewBox="0 0 228 206" fill="none">
                <g className="splash-network__links">
                  {links.map(([x1, y1, x2, y2], index) => (
                    <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} style={{ animationDelay: `${index * 0.08}s` }} />
                  ))}
                </g>
                <g className="splash-network__nodes">
                  {nodes.map(([cx, cy], index) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 1 ? 4 : 3} style={{ animationDelay: `${index * 0.12}s` }} />
                  ))}
                </g>
                <circle className="splash-network__center" cx="112" cy="103" r="13" />
                <circle className="splash-network__center-glow" cx="112" cy="103" r="6" />
              </svg>
              <div className="splash-core-ring splash-core-ring--one" />
              <div className="splash-core-ring splash-core-ring--two" />
            </motion.div>

            <motion.div
              className="splash-identity"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.55, delay: reduceMotion ? 0 : 0.65 }}
            >
              <div className="splash-monogram" aria-hidden="true">RI</div>
              <p className="splash-name">{siteConfig.fullName}</p>
              <p className="splash-title">{siteConfig.title}</p>
            </motion.div>

            <motion.div
              className="splash-status"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: reduceMotion ? 0 : 1.2 }}
              aria-hidden="true"
            >
              <span className="splash-status__dot" />
              <span>Portfolio interface</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
