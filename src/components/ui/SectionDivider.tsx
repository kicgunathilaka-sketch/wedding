'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function SectionDivider({ className = '' }: { className?: string }) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 py-7 ${className}`} aria-hidden="true">
      <motion.div
        className="h-px w-24 bg-gradient-to-r from-transparent to-rose-gold/50"
        initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 1 }}
      />
      <motion.span
        className="text-rose-gold text-sm leading-none"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35, type: 'spring' }}
      >
        ✦
      </motion.span>
      <motion.div
        className="h-px w-24 bg-gradient-to-l from-transparent to-rose-gold/50"
        initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  )
}
