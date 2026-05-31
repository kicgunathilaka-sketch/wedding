'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  text: string
  className?: string
  delay?: number
  /** true = animate on mount; false = animate when scrolled into view */
  immediate?: boolean
  stagger?: number
}

export function AnimatedLetters({ text, className = '', delay = 0, immediate = false, stagger = 0.045 }: Props) {
  const ref      = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const active   = immediate || isInView

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap justify-center overflow-visible ${className}`}
      aria-label={text}
      style={{ perspective: '600px' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 70, rotateX: -90 }}
          animate={active ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.75,
            delay: delay + i * stagger,
            type: 'spring',
            stiffness: 85,
            damping: 13,
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center' }}
          aria-hidden="true"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}
