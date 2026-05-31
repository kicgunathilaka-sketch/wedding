'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const defaultVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

interface Props {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

export function AnimatedSection({ children, className, variants = defaultVariants, delay = 0, once = true }: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={delay}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
