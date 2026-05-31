'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export function TiltCard({ children, className = '', intensity = 7, glare = true }: Props) {
  const ref  = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotX = useSpring(useTransform(rawY, [-1, 1], [ intensity, -intensity]), { stiffness: 180, damping: 28 })
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-intensity,  intensity]), { stiffness: 180, damping: 28 })

  /* Glare follows cursor */
  const glareX = useTransform(rawX, [-1, 1], ['0%', '100%'])
  const glareY = useTransform(rawY, [-1, 1], ['0%', '100%'])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    rawX.set(((e.clientX - left) / width  - 0.5) * 2)
    rawY.set(((e.clientY - top)  / height - 0.5) * 2)
  }
  function onLeave() { rawX.set(0); rawY.set(0) }

  return (
    <div style={{ perspective: '1000px' }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
