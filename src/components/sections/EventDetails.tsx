'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { TiltCard }        from '@/components/ui/TiltCard'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'

const EASE = [0.16, 1, 0.3, 1] as const

const events = [
  {
    type: 'ceremony', title: 'Wedding Ceremony', emoji: '💐',
    accentColor: 'from-purple/30 to-rose-gold/15',
    items: [
      { Icon: Calendar, label: 'Date',       value: 'Saturday, September 12, 2026' },
      { Icon: Clock,    label: 'Time',       value: '4:00 PM – 5:30 PM' },
      { Icon: MapPin,   label: 'Venue',      value: 'The Grand Rosewood Chapel' },
      { Icon: MapPin,   label: 'Address',    value: '1234 Vineyard Lane, Napa Valley, CA' },
      { Icon: Shirt,    label: 'Dress Code', value: 'Black Tie' },
    ],
  },
  {
    type: 'reception', title: 'Wedding Reception', emoji: '🥂',
    accentColor: 'from-rose-gold/15 to-purple/30',
    items: [
      { Icon: Calendar, label: 'Date',       value: 'Saturday, September 12, 2026' },
      { Icon: Clock,    label: 'Time',       value: '6:30 PM – Midnight' },
      { Icon: MapPin,   label: 'Venue',      value: 'The Crystal Ballroom' },
      { Icon: MapPin,   label: 'Address',    value: '1234 Vineyard Lane, Napa Valley, CA' },
      { Icon: Shirt,    label: 'Dress Code', value: 'Black Tie' },
    ],
  },
]

const lightOrbs = [
  { color: '#c8a2c8', size: 300, x: 80, y: 10, duration: 20 },
  { color: '#9b72aa', size: 250, x: 5,  y: 70, duration: 24 },
]

export function EventDetails() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section id="details" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #e8dbff 0%, #f0e8ff 50%, #ddd0f8 100%)' }}
      aria-labelledby="details-heading"
    >
      <BackgroundOrbs orbs={lightOrbs} opacity={0.08} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity:0, y:14 }} animate={isInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase">Event</motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Details" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((ev, i) => (
            <motion.div
              key={ev.type}
              initial={{ opacity: 0, y: 60, filter: 'blur(6px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.95, delay: 0.15 + i * 0.2, ease: EASE }}
            >
              <TiltCard intensity={6} className="w-full h-full">
                <article
                  className="relative bg-white border border-purple/15 rounded-3xl p-8 overflow-hidden group h-full shadow-lg"
                  aria-label={ev.title}
                >
                  {/* Animated gradient fill on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${ev.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

                  {/* Top accent line draws on enter */}
                  <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent"
                    initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4 + i * 0.2, ease: EASE }} aria-hidden="true" />

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-7">
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl shrink-0"
                        whileHover={{ scale: 1.18, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 280 }}
                      >
                        {ev.emoji}
                      </motion.div>
                      <h3 className="font-heading text-2xl text-charcoal">{ev.title}</h3>
                    </div>

                    <ul className="space-y-4">
                      {ev.items.map(({ Icon, label, value }, j) => (
                        <motion.li key={label}
                          initial={{ opacity: 0, x: -16 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.5 + i * 0.15 + j * 0.07, ease: EASE }}
                          className="flex items-start gap-3"
                        >
                          <Icon size={15} className="text-rose-gold mt-0.5 shrink-0" aria-hidden="true" />
                          <div>
                            <dt className="font-sans text-[10px] text-charcoal-soft uppercase tracking-[0.15em]">{label}</dt>
                            <dd className="font-sans text-sm text-charcoal mt-0.5">{value}</dd>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
