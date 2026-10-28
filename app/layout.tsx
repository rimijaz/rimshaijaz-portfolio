import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import SocialSidebar from '../components/SocialSidebar'
import EmailSidebar from '../components/EmailSidebar'
import SplashScreen from '../components/SplashScreen'
import PortfolioAssistant from '../components/PortfolioAssistant'
import { siteConfig } from '../data/siteConfig'

export const metadata = {
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var key='portfolio-theme';var saved=localStorage.getItem(key);var system=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:system;}catch(e){document.documentElement.dataset.theme='dark';}})()` }} />
      </head>
      <body className="bg-bg text-text">
        <SplashScreen />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:font-semibold"
        >
          Skip to content
        </a>

        <Navbar />
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
