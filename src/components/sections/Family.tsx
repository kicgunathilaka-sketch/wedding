'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'
import { FloralDivider }   from '@/components/ui/FloralDecor'
import { TiltCard }        from '@/components/ui/TiltCard'

const EASE = [0.16, 1, 0.3, 1] as const

const families = [
  {
    side:    'bride',
    heading: "The Bride",
    subheading: "Sandali & Her Family",
    photo:   '/gallery/p9.jpg',
    emoji:   '🌸',
    parents: 'Mr. & Mrs. Jayawardena',
    members: [
      { name: 'Mr. Jayawardena',    role: 'Father of the Bride' },
      { name: 'Mrs. Jayawardena',   role: 'Mother of the Bride' },
      { name: 'Kasun Jayawardena',  role: 'Brother of the Bride' },
      { name: 'Dinali Jayawardena', role: 'Sister of the Bride' },
    ],
    quote: '"Our daughter carries our hearts with her into this beautiful new chapter."',
    accentFrom: 'from-rose-gold/20',
  },
  {
    side:    'groom',
    heading: "The Groom",
    subheading: "Isuru & His Family",
    photo:   '/gallery/p7.jpg',
    emoji:   '🌿',
    parents: 'Mr. & Mrs. Perera',
    members: [
      { name: 'Mr. Perera',   role: 'Father of the Groom' },
      { name: 'Mrs. Perera',  role: 'Mother of the Groom' },
      { name: 'Nuwan Perera', role: 'Brother of the Groom' },
      { name: 'Amaya Perera', role: 'Sister of the Groom' },
    ],
    quote: '"Our son found his forever — and our hearts could not be more full."',
    accentFrom: 'from-purple/20',
  },
]

const darkOrbs = [
  { color: '#7c3aed', size: 380, x: 8,  y: 20, duration: 22 },
  { color: '#b76e79', size: 280, x: 80, y: 65, duration: 26 },
]

export function Family() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section id="family" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #130828 0%, #2a1258 45%, #1e0d3e 100%)' }}
      aria-labelledby="family-heading"
    >
      <BackgroundOrbs orbs={darkOrbs} opacity={0.22} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity:0, y:14 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
            className="font-display text-rose-gold italic tracking-[0.35em] text-sm uppercase">Two Families</motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Becoming One" className="font-heading text-5xl md:text-6xl text-white" />
          </div>
          <SectionDivider />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {families.map((fam, i) => (
            <motion.div key={fam.side}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.95, delay: 0.15 + i * 0.2, ease: EASE }}
            >
              <TiltCard intensity={4} className="w-full h-full">
                <article className="relative bg-white/6 backdrop-blur-sm border border-white/12 rounded-3xl overflow-hidden group"
                  aria-label={fam.heading}>

                  {/* Photo header */}
                  <div className="relative h-64 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fam.photo} alt={fam.heading}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
                    {/* Gradient */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,1,21,0.85) 100%)' }} />
                    {/* Purple tint */}
                    <div className="absolute inset-0" style={{ background: 'rgba(42,18,88,0.3)' }} />

                    {/* Name badge over photo */}
                    <div className="absolute bottom-5 left-6 right-6">
                      <p className="font-sans text-[10px] text-rose-gold/80 tracking-[0.2em] uppercase">{fam.subheading}</p>
                      <h3 className="font-heading text-2xl text-white mt-0.5">{fam.heading}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <p className="font-sans text-xs text-lavender/60 mb-5">{fam.parents}</p>

                    <ul className="space-y-3" role="list">
                      {fam.members.map((m, j) => (
                        <motion.li key={m.name}
                          initial={{ opacity: 0, x: -14 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.1 + j * 0.06, ease: EASE }}
                          className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0"
                        >
                          <span className="font-heading text-base text-white/90">{m.name}</span>
                          <span className="font-sans text-xs text-rose-gold italic">{m.role}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <p className="mt-6 font-display text-sm text-lavender/55 italic leading-relaxed">{fam.quote}</p>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12 opacity-30"><FloralDivider /></div>
      </div>
    </section>
  )
}
