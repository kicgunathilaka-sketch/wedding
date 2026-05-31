'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Heart } from 'lucide-react'
import { FloralCorner, FloatingPetal } from '@/components/ui/FloralDecor'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

const EASE = [0.16, 1, 0.3, 1] as const

const PETALS = [
  { left:  5, delay: 0,   size: 18, color: '#DCC6F0', duration: 13 },
  { left: 18, delay: 3,   size: 14, color: '#C8A2C8', duration: 15 },
  { left: 38, delay: 1.5, size: 20, color: '#B76E79', duration: 12 },
  { left: 58, delay: 4,   size: 16, color: '#9b72aa', duration: 14 },
  { left: 72, delay: 2,   size: 14, color: '#DCC6F0', duration: 13 },
  { left: 85, delay: 5,   size: 22, color: '#C8A2C8', duration: 11 },
]

export function ThankYou() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px 0px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])

  return (
    <footer ref={ref} className="relative overflow-hidden min-h-screen flex items-center"
      aria-labelledby="thankyou-heading"
    >
      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ scale: photoScale }} className="w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gallery/p5.jpg" alt=""
            className="w-full h-full object-cover object-top" aria-hidden="true" />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,1,21,0.7) 0%, rgba(8,1,21,0.75) 50%, rgba(8,1,21,0.9) 100%)' }} />
        {/* Purple grade */}
        <div className="absolute inset-0" style={{ background: 'rgba(30,13,62,0.55)' }} />
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PETALS.map((p, i) => <FloatingPetal key={i} {...p} />)}
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[500, 700, 950].map((r, i) => (
          <motion.div key={r} className="absolute border border-lavender/10 rounded-full"
            style={{ width: r, height: r }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }} />
        ))}
      </div>

      <FloralCorner className="absolute top-6 left-6 opacity-20 z-10"   />
      <FloralCorner className="absolute top-6 right-6 opacity-20 z-10" flip />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-32 text-center">

        {/* Heart */}
        <motion.div initial={{ opacity:0, scale:0.4 }} animate={isInView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.8, ease: EASE }} className="flex justify-center mb-8">
          <motion.div
            animate={{ scale:[1, 1.12, 1] }}
            transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
            className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center"
            style={{ background: 'rgba(183,110,121,0.2)', boxShadow: '0 0 40px rgba(183,110,121,0.4)' }}>
            <Heart className="text-rose-gold fill-rose-gold/40" size={30} aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* Pre-title */}
        <div className="overflow-hidden mb-5">
          <motion.p initial={{ y: '110%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="font-display text-rose-gold italic tracking-[0.45em] text-sm uppercase">
            With Love
          </motion.p>
        </div>

        {/* Heading */}
        <div className="overflow-visible">
          <AnimatedLetters text="Thank You" className="font-heading text-6xl md:text-7xl lg:text-8xl text-white" />
        </div>

        {/* Quote */}
        <motion.blockquote initial={{ opacity:0, y:20 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.9, delay:0.55, ease: EASE }}
          className="font-display text-white/70 text-xl md:text-2xl italic leading-relaxed max-w-xl mx-auto mt-8 mb-4">
          &ldquo;Your presence is the greatest gift you could give us. Thank you for
          being part of this beautiful chapter of our story.&rdquo;
        </motion.blockquote>

        {/* Couple names */}
        <motion.p initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ duration:0.8, delay:0.85 }}
          className="font-heading text-4xl md:text-5xl text-white mt-10">
          Isuru &amp; Sandali
        </motion.p>

        {/* Rule */}
        <motion.div className="flex items-center justify-center gap-3 mt-7"
          initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ duration:0.8, delay:1.05 }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-gold/40" />
          <span className="text-rose-gold/60 text-xs">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-gold/40" />
        </motion.div>

        <motion.p initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ duration:0.8, delay:1.15 }}
          className="font-display text-white/30 italic text-sm mt-4 tracking-widest">
          September 12, 2026
        </motion.p>

        <motion.p initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ duration:0.8, delay:1.25 }}
          className="font-sans text-white/15 text-xs mt-16 tracking-wide">
          © 2026 Isuru &amp; Sandali · All rights reserved
        </motion.p>
      </div>
    </footer>
  )
}
