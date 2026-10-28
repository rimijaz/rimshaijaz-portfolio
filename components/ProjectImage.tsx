'use client'

import { useEffect, useState } from 'react'
import type { ProjectImageSlot } from '../data/projects'

export default function ProjectImage({ slot, className = '' }: { slot: ProjectImageSlot; className?: string }) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let active = true
    const image = new Image()
    image.onload = () => active && setAvailable(true)
    image.onerror = () => active && setAvailable(false)
    image.src = slot.path
    return () => {
      active = false
    }
  }, [slot.path])

  if (!available) {
    return (
      <div className={`flex h-full min-h-40 items-center justify-center bg-bg px-5 text-center font-mono text-xs text-muted ${className}`}>
        <div>
          <p className="text-accent">Screenshot placeholder</p>
          <p className="mt-2">Add {slot.path}</p>
        </div>
      </div>
    )
  }

  return <img src={slot.path} alt={slot.alt} loading="lazy" decoding="async" sizes="(min-width: 1024px) 58vw, 100vw" className={`block h-full w-full bg-surface object-contain ${className}`} />
}
