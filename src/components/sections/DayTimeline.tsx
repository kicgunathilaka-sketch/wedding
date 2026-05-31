'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'

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

const lightOrbs = [
  { color: '#9b72aa', size: 300, x: 80, y: 15, duration: 22 },
  { color: '#c8a2c8', size: 200, x: 5,  y: 70, duration: 18 },
]

export function DayTimeline() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section id="schedule" ref={ref} className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #e8dbff 0%, #f0e8ff 60%, #ddd0f8 100%)' }} aria-labelledby="schedule-heading">
      <BackgroundOrbs orbs={lightOrbs} opacity={0.08} />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity:0, y:14 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase">September 12</motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Day Schedule" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </div>

        <ol aria-label="Day schedule" className="relative">
          {/* Animated vertical track */}
          <motion.div
            className="absolute left-7 top-0 w-px bg-gradient-to-b from-rose-gold/60 via-purple to-transparent"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          {schedule.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -35 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-6 mb-8 last:mb-0 group"
            >
              {/* Icon node */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-white/80 border border-purple/20 flex items-center justify-center text-xl shadow-md backdrop-blur-sm"
                whileHover={{ scale: 1.12, rotate: 5, boxShadow: '0 8px 30px rgba(155,114,170,0.35)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span role="img" aria-hidden="true">{item.icon}</span>
              </motion.div>

              <motion.div
                className="flex-1 pt-1 bg-white/50 rounded-2xl px-5 py-4 border border-purple/10 backdrop-blur-sm"
                whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.75)' }}
                transition={{ duration: 0.2 }}
              >
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
