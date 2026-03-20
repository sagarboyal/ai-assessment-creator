import type { IconProps } from '../../types/icon'

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  )
}

export function GroupIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7.5 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M16.5 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M3.5 18.5a5 5 0 0 1 8 0" />
      <path d="M13.5 18.5a4.2 4.2 0 0 1 6.8-1.2" />
    </svg>
  )
}

export function AssignmentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="6" y="4" width="12" height="16" rx="2.5" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  )
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H18v16h-9.5A2.5 2.5 0 0 0 6 21.5v-16Z" />
      <path d="M6 5.5A2.5 2.5 0 0 0 3.5 8V18A2.5 2.5 0 0 0 6 20.5" />
      <path d="M10 7h5" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  )
}

export function GearIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="m12 3 1.2 2.5 2.8.4-.9 2.7 1.9 2-1.9 2 .9 2.7-2.8.4L12 21l-1.2-2.5-2.8-.4.9-2.7-1.9-2 1.9-2-.9-2.7 2.8-.4L12 3Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.5 14.1 8l5.4 2.1-5.4 2.1L12 17.5l-2.1-5.3L4.5 10.1 9.9 8 12 2.5Z" />
    </svg>
  )
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 4.5A4.5 4.5 0 0 0 7.5 9v2.3c0 .8-.2 1.6-.7 2.2L5.8 15a1 1 0 0 0 .8 1.6h10.8a1 1 0 0 0 .8-1.6l-1-1.5c-.5-.6-.7-1.4-.7-2.2V9A4.5 4.5 0 0 0 12 4.5Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function ScribbleIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-full w-full">
      <path d="M7 44c7-2 12-6 16-12 4-6 6-13 14-18" strokeLinecap="round" />
      <path d="M20 12c2 4 5 7 10 9" strokeLinecap="round" />
      <path d="M6 57c11-2 21-9 27-20" strokeLinecap="round" />
    </svg>
  )
}

export function SparkleOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-full w-full">
      <path d="m12 3 2 6 6 3-6 3-2 6-2-6-6-3 6-3 2-6Z" />
    </svg>
  )
}
