export default function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="whitespace-nowrap font-mono text-lg text-accent" aria-hidden>
        {number}.
      </span>
      <h2 className="text-2xl font-bold text-text sm:whitespace-nowrap sm:text-3xl">{title}</h2>
      <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
    </div>
  )
}
