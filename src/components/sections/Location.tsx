'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'

const lightOrbs = [
  { color: '#9b72aa', size: 280, x: 5,  y: 50, duration: 22 },
  { color: '#c8a2c8', size: 220, x: 90, y: 20, duration: 18 },
]

export function Location() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section id="location" ref={ref} className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0e8ff 0%, #ddd0f8 50%, #e8dbff 100%)' }} aria-labelledby="location-heading">
      <BackgroundOrbs orbs={lightOrbs} opacity={0.08} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity:0, y:14 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
            className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase">Find Us</motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Location" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          <motion.div
            initial={{ opacity:0, x:-40 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.85, ease:[0.22,1,0.36,1] }}
            className="md:col-span-3 rounded-3xl overflow-hidden border border-purple/20 shadow-xl shadow-purple/15 min-h-[300px]"
          >
            <iframe
              title="Wedding venue map"
              src="https://maps.google.com/maps?q=Napa+Valley+California&output=embed&z=13"
              width="100%" height="100%"
              className="min-h-[300px] md:h-full grayscale-[0.3] hover:grayscale-0 transition-[filter] duration-500"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:40 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.85, delay:0.15, ease:[0.22,1,0.36,1] }}
            whileHover={{ boxShadow: '0 24px 60px rgba(155,114,170,0.25)' }}
            className="md:col-span-2 flex flex-col justify-between bg-white/80 border border-purple/20 rounded-3xl p-8 gap-8 backdrop-blur-sm"
          >
            <div>
              <motion.div
                className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center mb-5"
                whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring' }}
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
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(183,110,121,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full bg-rose-gold text-white font-sans text-xs tracking-[0.15em] uppercase py-3.5 rounded-xl hover:bg-rose-light transition-colors duration-300"
              >
                <Navigation size={14} aria-hidden="true" />Get Directions
              </motion.a>
              <motion.a
                href="https://maps.google.com/maps?q=Napa+Valley+California"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 w-full border border-purple/40 text-charcoal-soft font-sans text-xs tracking-[0.15em] uppercase py-3.5 rounded-xl hover:border-rose-gold hover:text-rose-gold transition-colors duration-300"
              >
                <ExternalLink size={14} aria-hidden="true" />View on Maps
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity:0, y:16 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, delay:0.5 }}
          className="text-center font-sans text-xs text-charcoal-soft mt-10 tracking-wide"
        >
          Complimentary shuttle from <strong className="text-charcoal">The Rosewood Inn</strong> · Departs 3:15 PM
        </motion.p>
      </div>
    </section>
  )
}
