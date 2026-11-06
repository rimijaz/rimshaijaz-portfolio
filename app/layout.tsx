import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import SocialSidebar from '../components/SocialSidebar'
import EmailSidebar from '../components/EmailSidebar'
import SplashScreen from '../components/SplashScreen'
import PortfolioAssistant from '../components/PortfolioAssistant'
import { siteConfig } from '../data/siteConfig'
import ScrollProgress from '../components/ScrollProgress'
import { socialLinks } from '../data/socials'

const absoluteUrl = (path: string) => siteConfig.url ? new URL(path, siteConfig.url).toString() : path

export const metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description: siteConfig.description,
  keywords: ['Senior Software Engineer', 'React.js', 'Next.js', 'Frontend Development', 'Web Development', 'Technical SEO'],
  alternates: siteConfig.url ? { canonical: siteConfig.url } : undefined,
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url || undefined,
    siteName: `${siteConfig.name} Portfolio`,
    images: [{ url: absoluteUrl('/og-image.svg'), width: 1200, height: 630, alt: `${siteConfig.fullName} — ${siteConfig.title}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [absoluteUrl('/og-image.svg')],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var key='portfolio-theme';var saved=localStorage.getItem(key);var system=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:system;}catch(e){document.documentElement.dataset.theme='dark';}})()` }} />
      </head>
      <body className="bg-bg text-text">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.fullName,
          jobTitle: siteConfig.title,
          url: siteConfig.url || undefined,
          image: absoluteUrl('/profile_image.png'),
          sameAs: [socialLinks.github, socialLinks.linkedin].filter(Boolean),
        }) }} />
        <SplashScreen />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:font-semibold"
        >
          Skip to content
        </a>

        <Navbar />
        <ScrollProgress />
        <SocialSidebar />
        <EmailSidebar />
        <main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-28 sm:px-10">
          {children}
        </main>
        <PortfolioAssistant />
      </body>
    </html>
  )
}
