'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { FloralDivider }   from '@/components/ui/FloralDecor'
import { TiltCard }        from '@/components/ui/TiltCard'
import { ScrollDepth }     from '@/components/ui/ScrollDepth'

const EASE = [0.16, 1, 0.3, 1] as const

const families = [
  {
    side: 'bride', heading: 'The Bride', subheading: 'Sandali & Her Family',
    photo: '/gallery/p9.jpg', emoji: '🌸',
    parents: 'Mr. & Mrs. Jayawardena',
    members: [
      { name: 'Mr. Jayawardena',    role: 'Father of the Bride' },
      { name: 'Mrs. Jayawardena',   role: 'Mother of the Bride' },
      { name: 'Kasun Jayawardena',  role: 'Brother of the Bride' },
      { name: 'Dinali Jayawardena', role: 'Sister of the Bride' },
    ],
    quote: '"Our daughter carries our hearts with her into this beautiful new chapter."',
    accentColor: '#b76e79',
  },
  {
    side: 'groom', heading: 'The Groom', subheading: 'Isuru & His Family',
    photo: '/gallery/p7.jpg', emoji: '🌿',
    parents: 'Mr. & Mrs. Perera',
    members: [
      { name: 'Mr. Perera',   role: 'Father of the Groom' },
      { name: 'Mrs. Perera',  role: 'Mother of the Groom' },
      { name: 'Nuwan Perera', role: 'Brother of the Groom' },
      { name: 'Amaya Perera', role: 'Sister of the Groom' },
    ],
    quote: '"Our son found his forever — and our hearts could not be more full."',
    accentColor: '#9b72aa',
  },
]

export function Family() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="family" ref={ref}
      className="relative py-28 overflow-hidden grain"
      style={{ background: 'linear-gradient(135deg, #130828 0%, #2a1258 45%, #1e0d3e 100%)' }}
      aria-labelledby="family-heading"
    >
      {/* Depth background — three planes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, left: '-10%', top: '5%', background: '#7c3aed', opacity: 0.20, filter: 'blur(120px)' }} />
        <div className="absolute rounded-full" style={{ width: 450, height: 450, right: '-8%', bottom: '5%', background: '#b76e79', opacity: 0.18, filter: 'blur(90px)' }} />
        <div className="absolute rounded-full" style={{ width: 280, height: 280, left: '45%', top: '30%', background: '#5b21b6', opacity: 0.14, filter: 'blur(60px)' }} />
        {/* Near plane — creates foreground depth */}
        <div className="absolute rounded-full" style={{ width: 140, height: 140, left: '8%', bottom: '20%', background: '#dcc6f0', opacity: 0.08, filter: 'blur(24px)' }} />
        <div className="absolute rounded-full" style={{ width: 100, height: 100, right: '10%', top: '18%', background: '#c8a2c8', opacity: 0.08, filter: 'blur(16px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollDepth className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-rose-gold italic tracking-[0.35em] text-sm uppercase"
          >
            Two Families
          </motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Becoming One" className="font-heading text-5xl md:text-6xl text-white" />
          </div>
          <SectionDivider />
        </ScrollDepth>

        <div className="grid md:grid-cols-2 gap-8">
          {families.map((fam, i) => (
            <ScrollDepth key={fam.side} rotateAmount={4}>
              <motion.div
                initial={{ opacity: 0, y: 55, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.0, delay: 0.15 + i * 0.2, ease: EASE }}
                className="h-full"
              >
                <TiltCard intensity={6} className="w-full h-full">
                  <motion.article
                    className="relative rounded-3xl overflow-hidden group card-deep transition-all duration-500"
                    style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35 }}
                    aria-label={fam.heading}
                  >
                    {/* Colored top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${fam.accentColor}90, transparent)` }}
                      aria-hidden="true"
                    />

                    {/* Photo header */}
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fam.photo} alt={fam.heading}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,1,21,0.88) 100%)' }}
                      />
                      <div className="absolute inset-0" style={{ background: 'rgba(42,18,88,0.28)' }} />
                      {/* Depth vignette */}
                      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)' }} />

                      {/* Name badge */}
                      <div className="absolute bottom-5 left-6 right-6">
                        <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: `${fam.accentColor}cc` }}>
                          {fam.subheading}
                        </p>
                        <h3 className="font-heading text-2xl text-white">{fam.heading}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <p className="font-sans text-xs text-lavender/55 mb-5">{fam.parents}</p>

                      <ul className="space-y-0" role="list">
                        {fam.members.map((m, j) => (
                          <motion.li
                            key={m.name}
                            initial={{ opacity: 0, x: -16 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 + j * 0.06, ease: EASE }}
                            className="flex items-center justify-between py-3 border-b border-white/8 last:border-0"
                          >
                            <span className="font-heading text-base text-white/90">{m.name}</span>
                            <span className="font-sans text-xs italic" style={{ color: `${fam.accentColor}cc` }}>
                              {m.role}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      <p className="mt-6 font-display text-sm text-lavender/50 italic leading-relaxed">{fam.quote}</p>
                    </div>
                  </motion.article>
                </TiltCard>
              </motion.div>
            </ScrollDepth>
          ))}
        </div>

        <div className="flex justify-center mt-12 opacity-30"><FloralDivider /></div>
      </div>
    </section>
  )
}
