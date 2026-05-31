'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'

/* Glass orb — SSR disabled */
const GlassOrbScene = dynamic(
  () => import('@/components/3d/GlassOrbScene').then((m) => ({ default: m.GlassOrbScene })),
  { ssr: false },
)

const WEDDING = new Date('2026-09-12T16:00:00')
const EASE = [0.16, 1, 0.3, 1] as const

function getTimeLeft() {
  const diff = WEDDING.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

export function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: time.days,    label: 'Days'    },
    { value: time.hours,   label: 'Hours'   },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ]

  return (
    <section
      id="countdown"
      className="relative py-0 overflow-hidden min-h-[600px] flex items-center"
      aria-labelledby="countdown-heading"
    >
      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/p11.jpg" alt=""
          className="w-full h-full object-cover object-center" aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(8,1,21,0.93) 0%, rgba(30,13,62,0.89) 50%, rgba(8,1,21,0.93) 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(90,33,182,0.12)' }} />
      </div>

      {/* ── 3D glass orb — opacity wrapper keeps it decorative, not dominating ── */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, opacity: 0.55 }}
        aria-hidden="true"
      >
        <GlassOrbScene />
      </div>

      {/* ── Animated concentric rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[600, 800, 1050].map((r, i) => (
          <motion.div
            key={r}
            className="absolute border border-lavender/8 rounded-full"
            style={{ width: r, height: r }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.38, 0.15] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-rose-gold italic tracking-[0.35em] text-sm uppercase">
            Counting Down To
          </span>
          <h2 id="countdown-heading" className="font-heading text-4xl md:text-5xl text-white mt-2 mb-14">
            Our Special Day
          </h2>
        </motion.div>

        {/* Glassmorphism countdown card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl px-8 py-12 md:px-14"
          style={{ boxShadow: '0 0 80px rgba(183,110,121,0.22), 0 0 140px rgba(124,58,237,0.14)' }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-rose-gold/55 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-3 md:gap-8">
            {units.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative w-full aspect-square max-w-[90px] mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-white/8 border border-white/10" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse, ${
                        i === 3 ? 'rgba(183,110,121,0.32)' : 'rgba(124,58,237,0.22)'
                      } 0%, transparent 70%)`,
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      key={value}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                      className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tabular-nums"
                    >
                      {String(value).padStart(2, '0')}
                    </motion.span>
                  </div>
                </div>
                <span className="font-sans text-[10px] md:text-xs text-lavender/60 tracking-[0.2em] uppercase">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 pt-7 border-t border-white/10"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="font-display text-rose-gold italic text-lg md:text-xl">
              September 12, 2026 · 4:00 PM
            </p>
            <p className="font-sans text-xs text-lavender/50 tracking-widest uppercase mt-1">
              Napa Valley, California
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
