'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  /** How many degrees of X-rotation at entry (default 5) */
  rotateAmount?: number
}

/**
 * Wraps children with a scroll-driven perspective entry:
 * the element "zooms forward" from depth as it enters the viewport,
 * giving every section a cinematic 3D emergence feel.
 */
export function ScrollDepth({ children, className = '', rotateAmount = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.28'],
  })

  const rawY    = useTransform(scrollYProgress, [0, 1], [65, 0])
  const scale   = useTransform(scrollYProgress, [0, 1], [0.93, 1.0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [rotateAmount, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.38], [0, 1])
  const blurV   = useTransform(scrollYProgress, [0, 0.65], [12, 0])
  const filter  = useTransform(blurV, (v) => `blur(${v.toFixed(1)}px)`)

  const y = useSpring(rawY, { stiffness: 62, damping: 18 })

  return (
    <div ref={ref} className={`${className} overflow-visible`}>
      <motion.div
        style={{
          y,
          scale,
          rotateX,
          opacity,
          filter,
          transformPerspective: 1100,
          transformOrigin: 'center bottom',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
