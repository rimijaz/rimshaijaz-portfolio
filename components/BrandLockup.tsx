import { siteConfig } from '../data/siteConfig'

export default function BrandLockup({ variant = 'default', includeName = true }: { variant?: 'default' | 'splash' | 'footer'; includeName?: boolean }) {
  return (
    <div className={`brand-lockup brand-lockup--${variant}`}>
      {includeName && <p className="brand-lockup-name">{siteConfig.fullName}</p>}
      <p className="brand-lockup-title">{siteConfig.title}</p>
      <p className="brand-lockup-specialization">{siteConfig.specialization}</p>
      {variant === 'splash' && <p className="brand-lockup-tagline">{siteConfig.tagline}</p>}
    </div>
  )
}
