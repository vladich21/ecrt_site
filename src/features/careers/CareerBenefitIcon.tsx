import type { SVGProps } from 'react'

export type CareerBenefitIconId =
  | 'dms'
  | 'edu'
  | 'office'
  | 'process'
  | 'cafe'
  | 'travel'
  | 'lab'
  | 'it'
  | 'schedule'
  | 'social'
  | 'sport'

type Props = SVGProps<SVGSVGElement> & { name: CareerBenefitIconId }

const common = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CareerBenefitIcon({ name, ...props }: Props) {
  switch (name) {
    case 'dms':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    case 'edu':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    case 'schedule':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'social':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <rect x="4" y="7" width="16" height="12" rx="2" ry="2" />
          <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
          <path d="M12 11v6M9 14h6" />
        </svg>
      )
    case 'sport':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3C9 12 15 12 12 21" />
          <path d="M12 3C15 12 9 12 12 21" />
        </svg>
      )
    case 'office':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    case 'process':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M4 19h4v-4h4v-4h4v-4h4V3" />
        </svg>
      )
    case 'cafe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M19 14c1.5-2 2-4 2-6a8 8 0 0 0-16 0c0 2 .5 4 2 6" />
          <path d="M5 14h14l-1 7H6z" />
        </svg>
      )
    case 'travel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l3-3 3 3M9 15l3 3 3-3M3 12h18M12 3v18" />
        </svg>
      )
    case 'lab':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M21 11l-9 9-9-9 9-9 9 9z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      )
    case 'it':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common} {...props}>
          <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    default:
      return null
  }
}
