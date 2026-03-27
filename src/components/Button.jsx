import { memo } from 'react'

// Base tailwind classes shared across every button variant.
const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

// Theme-specific variants that keep the CTA palette consistent.
const variants = {
  primary:
    'bg-[#FF5A7A] text-white shadow-[0_12px_28px_rgba(255,90,122,0.35)] hover:bg-[#FF6D8A] focus-visible:outline-[#FF5A7A]',
  secondary:
    'bg-[#00D1FF] text-black shadow-[0_12px_28px_rgba(0,209,255,0.25)] hover:bg-[#33DAFF] focus-visible:outline-[#00D1FF]',
  gradient:
    'bg-gradient-to-r from-[#FF5A7A] via-[#FF7A96] to-[#8B5CF6] text-white shadow-[0_12px_30px_rgba(255,90,122,0.35)] hover:brightness-110 focus-visible:outline-[#FF5A7A]',
  ghost:
    'border border-transparent text-[#B9BAC6] hover:text-white hover:bg-white/5 focus-visible:outline-[#00D1FF]',
}

function ButtonComponent({ children, variant = 'primary', className = '', ...props }) {
  const variantStyles = variants[variant] ?? variants.primary

  return (
    // Compose base + variant styles while allowing additional overrides.
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Memoization avoids re-rendering buttons unless props actually change.
export const Button = memo(ButtonComponent)
