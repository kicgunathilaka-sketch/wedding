'use client'

import { motion } from 'framer-motion'

/* ── Reusable SVG shapes ── */

export function FloralCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      width="140" height="140" viewBox="0 0 140 140" fill="none"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M0 0 L70 0" stroke="#C8A2C8" strokeWidth="0.8" opacity="0.5" />
      <path d="M0 0 L0 70" stroke="#C8A2C8" strokeWidth="0.8" opacity="0.5" />
      <path d="M12 12 L55 12" stroke="#DCC6F0" strokeWidth="0.6" opacity="0.6" />
      <path d="M12 12 L12 55" stroke="#DCC6F0" strokeWidth="0.6" opacity="0.6" />
      <circle cx="0"  cy="0"  r="3" fill="#B76E79" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="#C8A2C8" opacity="0.4" />
      {/* Curved vine */}
      <path d="M25 0 C25 12, 0 12, 0 25" stroke="#DCC6F0" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* Small flower */}
      <circle cx="25" cy="0"  r="4" fill="#DCC6F0" opacity="0.4" />
      <circle cx="0"  cy="25" r="4" fill="#DCC6F0" opacity="0.4" />
      {/* Leaves */}
      <ellipse cx="14" cy="4"  rx="5" ry="2.5" fill="#C8A2C8" opacity="0.25" transform="rotate(-30, 14, 4)"  />
      <ellipse cx="4"  cy="14" rx="5" ry="2.5" fill="#C8A2C8" opacity="0.25" transform="rotate(60, 4, 14)"   />
    </svg>
  )
}

export function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none" className={className} aria-hidden="true">
      <path d="M0 15 L75 15"   stroke="#DCC6F0" strokeWidth="0.8" />
      <path d="M125 15 L200 15" stroke="#DCC6F0" strokeWidth="0.8" />
      {/* Centre rose bud */}
      <circle cx="100" cy="15" r="6" fill="#DCC6F0" opacity="0.7" />
      <circle cx="100" cy="15" r="3" fill="#B76E79" opacity="0.6" />
      {/* Small side buds */}
      <circle cx="82"  cy="15" r="3" fill="#C8A2C8" opacity="0.5" />
      <circle cx="118" cy="15" r="3" fill="#C8A2C8" opacity="0.5" />
      <circle cx="70"  cy="15" r="2" fill="#DCC6F0" opacity="0.4" />
      <circle cx="130" cy="15" r="2" fill="#DCC6F0" opacity="0.4" />
    </svg>
  )
}

/* ── Floating petals (Hero section) ── */

interface FloatingPetalProps {
  delay?: number
  left?: number
  size?: number
  color?: string
  duration?: number
}

export function FloatingPetal({
  delay    = 0,
  left     = 0,
  size     = 28,
  color    = '#DCC6F0',
  duration = 10,
}: FloatingPetalProps) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
      animate={{
        y:       '115vh',
        opacity: [0, 0.7, 0.7, 0],
        rotate:  [0, 60, 120, 200],
        x:       [0, 18, -12, 22],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <ellipse cx="15" cy="15" rx="7" ry="13" fill={color} opacity="0.6" transform="rotate(-20, 15, 15)" />
      </svg>
    </motion.div>
  )
}

/* ── Floating ambient orbs ── */

export function AmbientOrb({
  className = '',
  size = 300,
  color = '#DCC6F0',
  opacity = 0.15,
}: {
  className?: string
  size?: number
  color?: string
  opacity?: number
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
        filter: `blur(${size * 0.25}px)`,
      }}
      aria-hidden="true"
    />
  )
}
