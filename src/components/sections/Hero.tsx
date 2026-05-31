'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { FloatingPetal, FloralCorner } from '@/components/ui/FloralDecor'

const PETALS = [
  { left:  3, delay: 0,    size: 20, color: '#dcc6f0', duration: 12 },
  { left:  9, delay: 3.5,  size: 14, color: '#c8a2c8', duration: 15 },
  { left: 16, delay: 6,    size: 26, color: '#b76e79', duration: 11 },
  { left: 23, delay: 1.2,  size: 17, color: '#dcc6f0', duration: 14 },
  { left: 31, delay: 4.5,  size: 12, color: '#9b72aa', duration: 16 },
  { left: 37, delay: 2,    size: 24, color: '#dcc6f0', duration: 13 },
  { left: 43, delay: 7,    size: 16, color: '#c8a2c8', duration: 12 },
  { left: 49, delay: 0.5,  size: 19, color: '#b76e79', duration: 14 },
  { left: 54, delay: 5.2,  size: 13, color: '#dcc6f0', duration: 17 },
  { left: 59, delay: 2.5,  size: 25, color: '#9b72aa', duration: 11 },
  { left: 64, delay: 8,    size: 15, color: '#c8a2c8', duration: 15 },
  { left: 69, delay: 1.5,  size: 22, color: '#dcc6f0', duration: 13 },
  { left: 74, delay: 3.5,  size: 17, color: '#b76e79', duration: 16 },
  { left: 80, delay: 0.8,  size: 12, color: '#c8a2c8', duration: 14 },
  { left: 86, delay: 9,    size: 23, color: '#9b72aa', duration: 11 },
  { left: 92, delay: 2.2,  size: 16, color: '#dcc6f0', duration: 13 },
  { left: 97, delay: 4.2,  size: 19, color: '#b76e79', duration: 12 },
]

const SPARKLES = [
  { x: '8%',  y: '15%', s: 3, d: 0.4  }, { x: '22%', y: '72%', s: 4, d: 1.8 },
  { x: '38%', y: '28%', s: 2, d: 0.9  }, { x: '18%', y: '45%', s: 5, d: 2.2 },
  { x: '12%', y: '88%', s: 3, d: 0.3  }, { x: '28%', y: '58%', s: 2, d: 1.5 },
  { x: '45%', y: '18%', s: 4, d: 0.7  }, { x: '32%', y: '92%', s: 3, d: 2.5 },
  { x: '5%',  y: '55%', s: 2, d: 1.1  }, { x: '42%', y: '78%', s: 4, d: 0.5 },
]

const ORB_DEFS = [
  { color: '#7c3aed', size: 480, x: 8,   y: 20,  parallax: -35 },
  { color: '#9b72aa', size: 320, x: 38,  y: 70,  parallax: -18 },
  { color: '#5b21b6', size: 260, x: 18,  y: 80,  parallax: -12 },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fadeOut   = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const photoY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const rawMX = useMotionValue(0)
  const rawMY = useMotionValue(0)
  const mxS   = useSpring(rawMX, { stiffness: 40, damping: 22 })
  const myS   = useSpring(rawMY, { stiffness: 40, damping: 22 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawMX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      rawMY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawMX, rawMY])

  const orbXforms = ORB_DEFS.map(o => ({
    x: useTransform(mxS, [-1, 1], [o.parallax, -o.parallax]),
    y: useTransform(myS, [-1, 1], [o.parallax * 0.65, -o.parallax * 0.65]),
  }))

  return (
    <section id="hero" ref={sectionRef}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden cursor-none"
      style={{ background: 'linear-gradient(135deg, #080115 0%, #1e0d3e 35%, #2a1258 60%, #130828 100%)' }}
      aria-label="Hero"
    >
      {/* ── Ambient orbs (mouse parallax) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {ORB_DEFS.map((orb, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: orb.size, height: orb.size,
              left: `${orb.x}%`, top: `${orb.y}%`,
              background: orb.color, opacity: 0.2,
              filter: `blur(${orb.size * 0.28}px)`,
              transform: 'translate(-50%,-50%)',
              x: orbXforms[i].x, y: orbXforms[i].y,
            }} />
        ))}
      </div>

      {/* ── Petals ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PETALS.map((p, i) => <FloatingPetal key={i} {...p} />)}
      </div>

      {/* ── Sparkles ── */}
      <div className="absolute left-0 top-0 w-[58%] h-full pointer-events-none">
        {SPARKLES.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ width: s.s, height: s.s, left: s.x, top: s.y }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 0.4] }}
            transition={{ duration: 2.8 + i * 0.1, delay: s.d, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true" />
        ))}
      </div>

      {/* ── Pulsing glow ── */}
      <div className="absolute left-0 top-0 w-[58%] h-full flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div className="rounded-full"
          style={{ width: 500, height: 180, background: 'radial-gradient(ellipse, rgba(183,110,121,0.25) 0%, transparent 70%)' }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.2, 0.85] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      {/* ── Animated rings (left half) ── */}
      <div className="absolute left-0 top-0 w-[58%] h-full flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[500, 700].map((r, i) => (
          <motion.div key={r} className="absolute border border-lavender/8 rounded-full"
            style={{ width: r, height: r }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }} />
        ))}
      </div>

      {/* ── Corners ── */}
      <FloralCorner className="absolute top-6 left-6 opacity-20 z-20" />
      <FloralCorner className="absolute top-6 right-6 opacity-10 z-20" flip />

      {/* ── SPLIT LAYOUT ── */}
      <div className="relative z-10 w-full h-full flex items-center">

        {/* LEFT: Text (full width mobile, 58% desktop) */}
        <motion.div style={{ y: contentY, opacity: fadeOut }}
          className="w-full lg:w-[58%] px-8 md:px-16 flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* "You're Invited" */}
          <div className="overflow-hidden mb-8">
            <motion.p initial={{ y: '110%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-rose-gold italic uppercase tracking-[0.45em] text-sm">
              You&apos;re Invited
            </motion.p>
          </div>

          {/* Rule */}
          <motion.div className="flex items-center gap-3 mb-10 justify-center lg:justify-start"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <motion.div className="h-px bg-gradient-to-r from-transparent to-rose-gold/70"
              initial={{ width: 0 }} animate={{ width: 52 }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            <motion.span className="text-rose-gold text-xs"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, type: 'spring' }}>✦</motion.span>
            <motion.div className="h-px bg-gradient-to-l from-transparent to-rose-gold/70"
              initial={{ width: 0 }} animate={{ width: 52 }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} />
          </motion.div>

          {/* NAME 1 */}
          <div className="leading-none mb-2" style={{ perspective: '800px' }}>
            <AnimatedLetters text="Isuru" immediate delay={0.8} stagger={0.065}
              className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-shimmer tracking-tight justify-center lg:justify-start" />
          </div>

          {/* & */}
          <motion.div className="my-2"
            initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.55, type: 'spring', stiffness: 70 }}>
            <motion.span className="font-display text-3xl md:text-4xl text-rose-gold italic inline-block"
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
              &amp;
            </motion.span>
          </motion.div>

          {/* NAME 2 */}
          <div className="leading-none mb-8" style={{ perspective: '800px' }}>
            <AnimatedLetters text="Sandali" immediate delay={1.75} stagger={0.055}
              className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-shimmer tracking-tight justify-center lg:justify-start" />
          </div>

          {/* Date */}
          <div className="overflow-hidden">
            <motion.p initial={{ y: '110%' }} animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-lg md:text-xl text-lavender italic tracking-widest">
              Saturday · September 12, 2026
            </motion.p>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.1 }}
            className="font-sans text-xs text-lavender/50 tracking-[0.25em] uppercase mt-2">
            Napa Valley, California
          </motion.p>

          {/* Bottom rule */}
          <motion.div className="mt-8 h-px w-full max-w-[320px]"
            style={{ background: 'linear-gradient(90deg, #b76e79, transparent)' }}
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 3.3, ease: [0.16, 1, 0.3, 1] }} />
        </motion.div>

        {/* RIGHT: Hero photo (desktop only) */}
        <div className="hidden lg:block absolute right-0 top-0 w-[46%] h-full overflow-hidden">
          {/* Photo with scroll parallax */}
          <motion.div style={{ y: photoY }} className="w-full h-[115%] -mt-[7.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/p13.jpg" alt="Isuru & Sandali"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Gradient blend: left edge fades into dark bg */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0f0520 0%, rgba(15,5,32,0.55) 25%, rgba(30,13,62,0.15) 55%, transparent 100%)' }}
            aria-hidden="true" />
          {/* Subtle purple tint */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(30,13,62,0.25)' }}
            aria-hidden="true" />
          {/* Top vignette */}
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #080115, transparent)' }}
            aria-hidden="true" />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #080115, transparent)' }}
            aria-hidden="true" />

          {/* Animated caption badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-24 right-8 text-right"
          >
            <p className="font-sans text-[10px] text-white/40 tracking-[0.2em] uppercase">Photography</p>
            <p className="font-display text-white/60 italic text-sm">Harsha Bandara</p>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.7 }}
        className="absolute bottom-8 left-[29%] lg:left-[29%] -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true">
        <motion.div className="w-px h-10 bg-gradient-to-b from-transparent to-rose-gold/60"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="text-rose-gold" size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
