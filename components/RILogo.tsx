export default function RILogo({ size = 'default' }: { size?: 'default' | 'small' | 'splash' }) {
  return (
    <span className={`ri-logo ri-logo--${size}`} aria-hidden="true">
      <span className="ri-logo-r">R</span>
      <span className="ri-logo-i">I</span>
    </span>
  )
}
