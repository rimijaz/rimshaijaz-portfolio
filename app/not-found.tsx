import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-15rem)] flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent">
          <div className="absolute inset-3 rounded-full border border-accent/25" aria-hidden />
          <Compass size={30} aria-hidden />
        </div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">Route not found</p>
        <h1 className="mt-4 text-7xl font-bold tracking-tight text-text sm:text-8xl">404</h1>
        <h2 className="mt-5 text-2xl font-semibold text-text sm:text-3xl">Oops! This page doesn&apos;t exist.</h2>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">
          The page you&apos;re looking for may have been moved or is no longer available. Let&apos;s get you back to the portfolio.
        </p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <ArrowLeft size={16} aria-hidden /> Back to Home
        </Link>
      </div>
      <Footer />
    </>
  )
}
