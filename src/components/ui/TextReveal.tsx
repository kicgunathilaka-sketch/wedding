'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  wrapperClassName?: string
  immediate?: boolean
}

/**
 * Masks children behind an overflow:hidden clip and slides them
 * up into view — the "underground push" reveal seen on premium sites.
 */
export function TextReveal({ children, delay = 0, duration = 0.9, className = '', wrapperClassName = '', immediate = false }: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const active   = immediate || isInView

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <motion.div
        className={className}
        initial={{ y: '108%', opacity: 0 }}
        animate={active ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Reveal a block with a clip-path wipe from bottom */
export function WipeReveal({ children, delay = 0, duration = 1.0, className = '', wrapperClassName = '' }: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={`${wrapperClassName} ${className}`}
      initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.04 }}
      animate={isInView ? { clipPath: 'inset(0% 0 0 0)', scale: 1 } : {}}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
