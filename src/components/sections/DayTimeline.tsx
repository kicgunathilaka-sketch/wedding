'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { ScrollDepth }    from '@/components/ui/ScrollDepth'

const schedule = [
  { time: '3:00 PM',  event: 'Guests Arrive',           desc: 'Welcome drinks & canapés in the rose garden.',              icon: '🌹' },
  { time: '4:00 PM',  event: 'Ceremony',                desc: 'Exchange of vows in the Grand Rosewood Chapel.',            icon: '💐' },
  { time: '5:30 PM',  event: 'Champagne Reception',     desc: 'Celebration drinks & congratulations with the newlyweds.',  icon: '🥂' },
  { time: '6:00 PM',  event: 'Portrait Session',        desc: 'Photography in the golden hour gardens.',                   icon: '📸' },
  { time: '6:30 PM',  event: 'Grand Entrance & Dinner', desc: 'Formal dinner in The Crystal Ballroom.',                   icon: '🍽️' },
  { time: '8:00 PM',  event: 'First Dance & Speeches',  desc: 'First dance followed by heartfelt toasts from loved ones.', icon: '💃' },
  { time: '9:00 PM',  event: 'Dancing & Celebration',   desc: 'The dance floor opens — all night long.',                  icon: '🎶' },
  { time: '12:00 AM', event: 'Send-Off',                desc: 'A sparkling farewell as the couple departs.',               icon: '✨' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function DayTimeline() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="schedule" ref={ref}
      className="relative py-28 overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #e8dbff 0%, #f0e8ff 60%, #ddd0f8 100%)' }}
      aria-labelledby="schedule-heading"
    >
      {/* Depth background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, right: '-5%', top: '0%', background: '#9b72aa', opacity: 0.14, filter: 'blur(100px)' }} />
        <div className="absolute rounded-full" style={{ width: 350, height: 350, left: '-4%', bottom: '5%', background: '#c8a2c8', opacity: 0.12, filter: 'blur(80px)' }} />
        <div className="absolute rounded-full" style={{ width: 150, height: 150, left: '55%', top: '40%', background: '#b76e79', opacity: 0.10, filter: 'blur(30px)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <ScrollDepth className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase"
          >
            September 12
          </motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Day Schedule" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </ScrollDepth>

        <ol aria-label="Day schedule" className="relative">
          {/* Animated vertical track */}
          <motion.div
            className="absolute left-7 top-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(183,110,121,0.7), rgba(155,114,170,0.5), transparent)' }}
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 2.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          {schedule.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
              className="relative flex items-start gap-5 mb-6 last:mb-0 group"
            >
              {/* 3D icon node */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(240,232,255,0.85))',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(155,114,170,0.15), 0 2px 4px rgba(155,114,170,0.12), 0 8px 20px rgba(155,114,170,0.12), 0 24px 40px rgba(155,114,170,0.07)',
                }}
                whileHover={{ scale: 1.15, rotate: 6, y: -3, boxShadow: 'inset 0 1px 0 rgba(255,255,255,1), 0 4px 10px rgba(183,110,121,0.25), 0 16px 36px rgba(183,110,121,0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span role="img" aria-hidden="true">{item.icon}</span>
              </motion.div>

              {/* Content card */}
              <motion.div
                className="flex-1 pt-1 rounded-2xl px-5 py-4 card-deep-light transition-all duration-400"
                style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)' }}
                whileHover={{ x: 6, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Inner top edge */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-white/90" aria-hidden="true" />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span className="font-display text-rose-gold italic text-base">{item.time}</span>
                  <span className="font-heading text-charcoal text-lg">{item.event}</span>
                </div>
                <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{item.desc}</p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
