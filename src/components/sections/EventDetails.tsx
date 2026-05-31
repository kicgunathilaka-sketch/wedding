'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { TiltCard }        from '@/components/ui/TiltCard'
import { ScrollDepth }     from '@/components/ui/ScrollDepth'

const EASE = [0.16, 1, 0.3, 1] as const

const events = [
  {
    type: 'ceremony', title: 'Wedding Ceremony', emoji: 'ðŸ’',
    items: [
      { Icon: Calendar, label: 'Date',       value: 'Saturday, September 12, 2026' },
      { Icon: Clock,    label: 'Time',       value: '4:00 PM â€“ 5:30 PM' },
      { Icon: MapPin,   label: 'Venue',      value: 'The Grand Rosewood Chapel' },
      { Icon: MapPin,   label: 'Address',    value: '1234 Vineyard Lane, Napa Valley, CA' },
      { Icon: Shirt,    label: 'Dress Code', value: 'Black Tie' },
    ],
    accent: '#b76e79',
  },
  {
    type: 'reception', title: 'Wedding Reception', emoji: 'ðŸ¥‚',
    items: [
      { Icon: Calendar, label: 'Date',       value: 'Saturday, September 12, 2026' },
      { Icon: Clock,    label: 'Time',       value: '6:30 PM â€“ Midnight' },
      { Icon: MapPin,   label: 'Venue',      value: 'The Crystal Ballroom' },
      { Icon: MapPin,   label: 'Address',    value: '1234 Vineyard Lane, Napa Valley, CA' },
      { Icon: Shirt,    label: 'Dress Code', value: 'Black Tie' },
    ],
    accent: '#9b72aa',
  },
]

export function EventDetails() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="details" ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #e8dbff 0%, #f0e8ff 50%, #ddd0f8 100%)' }}
      aria-labelledby="details-heading"
    >
      {/* Multi-plane depth background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width: 550, height: 550, right: '-8%', top: '-5%', background: '#c8a2c8', opacity: 0.16, filter: 'blur(110px)' }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, left: '-6%', bottom: '8%', background: '#9b72aa', opacity: 0.13, filter: 'blur(90px)' }} />
        <div className="absolute rounded-full" style={{ width: 200, height: 200, left: '40%', top: '50%', background: '#b76e79', opacity: 0.09, filter: 'blur(50px)' }} />
        {/* Near plane accents */}
        <div className="absolute rounded-full" style={{ width: 120, height: 120, right: '12%', bottom: '20%', background: '#dcc6f0', opacity: 0.20, filter: 'blur(18px)' }} />
        <div className="absolute rounded-full" style={{ width: 80, height: 80, left: '18%', top: '15%', background: '#dcc6f0', opacity: 0.16, filter: 'blur(12px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollDepth className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase"
          >
            Event
          </motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Details" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </ScrollDepth>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((ev, i) => (
            <ScrollDepth key={ev.type}>
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.95, delay: 0.1 + i * 0.18, ease: EASE }}
                className="h-full"
              >
                <TiltCard intensity={8} className="w-full h-full">
                  <motion.article
                    className="relative rounded-3xl p-8 overflow-hidden h-full card-deep-light transition-all duration-500"
                    style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)' }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    aria-label={ev.title}
                  >
                    {/* Colored top bar */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${ev.accent}80, transparent)` }}
                      initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1.1, delay: 0.4 + i * 0.18, ease: EASE }}
                      aria-hidden="true"
                    />

                    {/* Inner top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl bg-white/80" aria-hidden="true" />

                    {/* Floating emoji icon */}
                    <div className="flex items-center gap-4 mb-7">
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,232,255,0.8))`,
                          boxShadow: `0 4px 12px rgba(155,114,170,0.2), 0 1px 0 rgba(255,255,255,0.9) inset`,
                        }}
                        whileHover={{ scale: 1.2, rotate: 8, y: -2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {ev.emoji}
                      </motion.div>
                      <h3 className="font-heading text-2xl text-charcoal">{ev.title}</h3>
                    </div>

                    <ul className="space-y-4">
                      {ev.items.map(({ Icon, label, value }, j) => (
                        <motion.li
                          key={label}
                          initial={{ opacity: 0, x: -18 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.55, delay: 0.5 + i * 0.14 + j * 0.06, ease: EASE }}
                          className="flex items-start gap-3 py-1"
                        >
                          <div
                            className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${ev.accent}18` }}
                          >
                            <Icon size={13} style={{ color: ev.accent }} aria-hidden="true" />
                          </div>
                          <div>
                            <dt className="font-sans text-[10px] text-charcoal-soft uppercase tracking-[0.15em]">{label}</dt>
                            <dd className="font-sans text-sm text-charcoal mt-0.5">{value}</dd>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.article>
                </TiltCard>
              </motion.div>
            </ScrollDepth>
          ))}
        </div>
      </div>
    </section>
  )
}

