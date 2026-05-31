'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cx = useMotionValue(-200)
  const cy = useMotionValue(-200)

  /* Ring lags behind with spring */
  const rx = useSpring(cx, { stiffness: 90, damping: 22, restDelta: 0.5 })
  const ry = useSpring(cy, { stiffness: 90, damping: 22, restDelta: 0.5 })

  const [isPointer, setIsPointer] = useState(false)
  const [mounted, setMounted]     = useState(false)

  useEffect(() => {
    /* Only on fine-pointer devices (desktop) */
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const move = (e: MouseEvent) => {
      cx.set(e.clientX)
      cy.set(e.clientY)
    }
    const check = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsPointer(!!el.closest('a, button, [role="button"], .group, input, select'))
    }

    window.addEventListener('mousemove', move,  { passive: true })
    window.addEventListener('mousemove', check, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', check)
    }
  }, [cx, cy])

  if (!mounted) return null

  return (
    <>
      {/* Precise dot — follows exactly */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full bg-rose-gold"
        style={{ x: cx, y: cy, translateX: '-50%', translateY: '-50%', width: 7, height: 7 }}
      />

      {/* Spring-lagged ring */}
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full border border-rose-gold/60"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isPointer ? 46 : 28, height: isPointer ? 46 : 28, opacity: isPointer ? 0.9 : 0.55 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
