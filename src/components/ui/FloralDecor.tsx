'use client'

import { motion } from 'framer-motion'

/* ── Reusable SVG ornaments ── */

export function FloralCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      width="140" height="140" viewBox="0 0 140 140" fill="none"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M0 0 L70 0"  stroke="#C8A2C8" strokeWidth="0.8" opacity="0.5" />
      <path d="M0 0 L0 70"  stroke="#C8A2C8" strokeWidth="0.8" opacity="0.5" />
      <path d="M12 12 L55 12" stroke="#DCC6F0" strokeWidth="0.6" opacity="0.6" />
      <path d="M12 12 L12 55" stroke="#DCC6F0" strokeWidth="0.6" opacity="0.6" />
      <circle cx="0"  cy="0"  r="3" fill="#B76E79" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="#C8A2C8" opacity="0.4" />
      <path d="M25 0 C25 12, 0 12, 0 25" stroke="#DCC6F0" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="25" cy="0"  r="4" fill="#DCC6F0" opacity="0.4" />
      <circle cx="0"  cy="25" r="4" fill="#DCC6F0" opacity="0.4" />
      <ellipse cx="14" cy="4"  rx="5" ry="2.5" fill="#C8A2C8" opacity="0.25" transform="rotate(-30, 14, 4)"  />
      <ellipse cx="4"  cy="14" rx="5" ry="2.5" fill="#C8A2C8" opacity="0.25" transform="rotate(60, 4, 14)"   />
      {/* Extra bud */}
      <circle cx="38" cy="0"  r="3" fill="#B76E79" opacity="0.3" />
      <circle cx="0"  cy="38" r="3" fill="#B76E79" opacity="0.3" />
    </svg>
  )
}

export function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none" className={className} aria-hidden="true">
      <path d="M0 15 L75 15"    stroke="#DCC6F0" strokeWidth="0.8" />
      <path d="M125 15 L200 15" stroke="#DCC6F0" strokeWidth="0.8" />
      <circle cx="100" cy="15" r="6" fill="#DCC6F0" opacity="0.7" />
      <circle cx="100" cy="15" r="3" fill="#B76E79" opacity="0.6" />
      <circle cx="82"  cy="15" r="3" fill="#C8A2C8" opacity="0.5" />
      <circle cx="118" cy="15" r="3" fill="#C8A2C8" opacity="0.5" />
      <circle cx="70"  cy="15" r="2" fill="#DCC6F0" opacity="0.4" />
      <circle cx="130" cy="15" r="2" fill="#DCC6F0" opacity="0.4" />
    </svg>
  )
}

/* ── Floating petals with realistic wind drift ── */

interface FloatingPetalProps {
  delay?:    number
  left?:     number
  size?:     number
  color?:    string
  duration?: number
}

/* Wind drift keyframes — deterministic, not random */
const DRIFT_X: Record<number, number[]> = {
  0: [0, 14, -8,  18, -5,  22],
  1: [0, -12, 20, -6, 16, -18],
  2: [0,  8, -20, 12, -10, 16],
  3: [0, -6,  10, -18, 8,  -14],
  4: [0,  20, -10, 6, -16,  12],
}

export function FloatingPetal({
  delay    = 0,
  left     = 0,
  size     = 28,
  color    = '#DCC6F0',
  duration = 10,
}: FloatingPetalProps) {
  const driftKey = Math.round(left / 20) % 5
  const driftX   = DRIFT_X[driftKey]

  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: '-10vh', opacity: 0, rotate: 0, x: 0 }}
      animate={{
        y:       '115vh',
        opacity: [0, 0.65, 0.65, 0.65, 0],
        rotate:  [0, 45, 100, 160, 220],
        x:       driftX,
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {/* Realistic petal shape */}
      <svg width={size} height={size * 1.35} viewBox="0 0 30 40" fill="none">
        <path
          d="M15 38 C8 32, 3 22, 5 12 C7 4, 15 0, 15 0 C15 0, 23 4, 25 12 C27 22, 22 32, 15 38 Z"
          fill={color}
          opacity="0.62"
        />
        {/* Central vein */}
        <path
          d="M15 38 C15 26, 14 14, 15 0"
          stroke={color}
          strokeWidth="0.6"
          opacity="0.35"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

/* ── Ambient background orbs ── */

export function AmbientOrb({
  className = '',
  size      = 300,
  color     = '#DCC6F0',
  opacity   = 0.15,
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
