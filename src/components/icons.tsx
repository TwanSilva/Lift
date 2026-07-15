type IconProps = {
  className?: string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function IconDumbbell({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6.5 6.5 2 11l3 3M17.5 6.5 22 11l-3 3M4 9.5 14.5 20M9.5 4 20 14.5" />
    </svg>
  )
}

export function IconFlame({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1.5-.5-2-1-3 2 1 3 3.5 3 6a8 8 0 1 1-16 0c0-4 2.5-6 3.5-8 .3 2 1 3 1.5 3.5C10 6 11 4 12 2Z" />
    </svg>
  )
}

export function IconUser({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  )
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c0-3.6 3-5.5 6.5-5.5s6.5 1.9 6.5 5.5" />
      <path d="M15.5 5a3.5 3.5 0 0 1 0 6.9M21.5 19c0-3-2.2-4.7-5-5.3" />
    </svg>
  )
}

export function IconApple({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 8.5c-1.2-1.4-3.4-1.8-5-.7-1.9 1.3-2.4 4.4-1 7.3 1.2 2.5 3.2 4.9 4.9 4.9.9 0 1.2-.4 2.1-.4.9 0 1.1.4 2.1.4 1.6 0 3.5-2.1 4.6-4.2.4-.8.7-1.5.9-2.1-2.3-.9-2.7-4.1-.5-5.6-1.1-1.5-2.7-1.9-3.5-1.9-1.2 0-2.2.7-2.8.7-.5 0-1.5-.7-2.8-.7Z" />
      <path d="M12 8c0-1.5.8-2.8 2.2-3.5" />
    </svg>
  )
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4.5 4.5h3.7l1.6 4.4-2.1 1.9a12.3 12.3 0 0 0 5.5 5.5l1.9-2.1 4.4 1.6v3.7c0 1-.9 1.8-1.9 1.6-4-.6-7.8-2.6-10.6-5.4C4.2 13 2.2 9.2 1.6 5.2c-.2-1 .6-1.9 1.6-1.9Z" />
    </svg>
  )
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconStar({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2.5 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7Z" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="m4 12 5.5 5.5L20 7" />
    </svg>
  )
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  )
}

export function IconX({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
