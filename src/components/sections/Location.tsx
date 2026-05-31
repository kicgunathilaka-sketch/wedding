'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { ScrollDepth }    from '@/components/ui/ScrollDepth'

const EASE = [0.22, 1, 0.36, 1] as const

export function Location() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="location" ref={ref}
      className="relative py-28 overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #f0e8ff 0%, #ddd0f8 50%, #e8dbff 100%)' }}
      aria-labelledby="location-heading"
    >
      {/* Depth layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width: 480, height: 480, left: '-6%', top: '-8%', background: '#c8a2c8', opacity: 0.15, filter: 'blur(100px)' }} />
        <div className="absolute rounded-full" style={{ width: 380, height: 380, right: '-5%', bottom: '0%', background: '#9b72aa', opacity: 0.12, filter: 'blur(85px)' }} />
        <div className="absolute rounded-full" style={{ width: 160, height: 160, left: '42%', top: '55%', background: '#b76e79', opacity: 0.09, filter: 'blur(35px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollDepth className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase"
          >
            Find Us
          </motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Location" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </ScrollDepth>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-3 rounded-3xl overflow-hidden min-h-[300px] card-deep-light"
          >
            <iframe
              title="Wedding venue map"
              src="https://maps.google.com/maps?q=Napa+Valley+California&output=embed&z=13"
              width="100%" height="100%"
              className="min-h-[300px] md:h-full grayscale-[0.25] hover:grayscale-0 transition-[filter] duration-500"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: 'block' }}
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="md:col-span-2"
          >
            <motion.div
              className="flex flex-col justify-between h-full rounded-3xl p-8 gap-8 card-deep-light transition-all duration-400"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,232,255,0.8))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(155,114,170,0.18)',
                  }}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: 'spring' }}
                >
                  <MapPin className="text-rose-gold" size={22} aria-hidden="true" />
                </motion.div>
                <h3 className="font-heading text-2xl text-charcoal mb-1">The Grand Rosewood Estate</h3>
                <p className="font-sans text-sm text-charcoal-soft mt-2 leading-relaxed">
                  1234 Vineyard Lane<br />Napa Valley, CA 94558
                </p>
                <p className="font-sans text-sm text-charcoal-soft mt-1">+1 (707) 555-0198</p>
              </div>

              <div className="space-y-3">
                <motion.a
                  href="https://maps.google.com/maps?q=Napa+Valley+California"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 24px rgba(183,110,121,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full bg-rose-gold text-white font-sans text-xs tracking-[0.15em] uppercase py-3.5 rounded-xl hover:bg-rose-light transition-colors duration-300"
                >
                  <Navigation size={14} aria-hidden="true" />Get Directions
                </motion.a>
                <motion.a
                  href="https://maps.google.com/maps?q=Napa+Valley+California"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center justify-center gap-2 w-full border border-purple/40 text-charcoal-soft font-sans text-xs tracking-[0.15em] uppercase py-3.5 rounded-xl hover:border-rose-gold hover:text-rose-gold transition-colors duration-300"
                >
                  <ExternalLink size={14} aria-hidden="true" />View on Maps
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center font-sans text-xs text-charcoal-soft mt-10 tracking-wide"
        >
          Complimentary shuttle from <strong className="text-charcoal">The Rosewood Inn</strong> · Departs 3:15 PM
        </motion.p>
      </div>
    </section>
  )
}
