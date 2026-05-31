'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
}

/**
 * Lightweight scroll-driven entry: fades + slides up as the element
 * enters the viewport. No blur, no rotateX — pure translate + opacity.
 */
export function ScrollDepth({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.35'],
  })

  const y       = useTransform(scrollYProgress, [0, 1], [48, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  )
}
