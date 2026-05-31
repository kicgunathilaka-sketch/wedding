'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { FloralDivider }  from '@/components/ui/FloralDecor'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { TextReveal }     from '@/components/ui/TextReveal'
import { TiltCard }       from '@/components/ui/TiltCard'
import { ScrollDepth }    from '@/components/ui/ScrollDepth'

const EASE = [0.16, 1, 0.3, 1] as const

const stories = [
  {
    year: '2019', season: 'Summer',
    title: 'First Glance',
    body: "A chance encounter at a mutual friend's gathering. One smile across the room and the whole afternoon stood still.",
    side: 'left', icon: 'â˜€ï¸', photo: '/gallery/p8.jpg',
  },
  {
    year: '2019', season: 'August',
    title: 'First Date',
    body: "A walk along the waterfront, then candlelight and conversation that lasted long past midnight. We never wanted it to end.",
    side: 'right', icon: 'ðŸŒŠ', photo: '/gallery/p2.jpg',
  },
  {
    year: '2021', season: 'Spring',
    title: 'Home Together',
    body: "After two years of building something beautiful, we made our home together. Every morning became our favourite moment.",
    side: 'left', icon: 'ðŸ¡', photo: '/gallery/p11.jpg',
  },
  {
    year: '2023', season: 'December',
    title: 'The Proposal',
    body: "On a quiet evening with fairy lights above, he held her hand and asked forever. She said yes before he could finish.",
    side: 'right', icon: 'ðŸ’', photo: '/gallery/p9.jpg',
  },
  {
    year: '2024', season: 'Spring',
    title: 'His Graduation',
    body: "Celebrating every milestone together â€” because every achievement belongs to both of us.",
    side: 'left', icon: 'ðŸŽ“', photo: '/gallery/p12.jpg',
  },
  {
    year: '2026', season: 'September',
    title: 'Forever Begins',
    body: "Now we invite the people we love most to witness us exchange our vows and begin the most beautiful chapter of our lives.",
    side: 'right', icon: 'ðŸ’', photo: '/gallery/p13.jpg',
  },
]

export function OurStory() {
  return (
    <section
      id="story"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0e8ff 0%, #e8dbff 50%, #ddd0f8 100%)' }}
      aria-labelledby="story-heading"
    >
      {/* Depth background orbs â€” three planes of blur depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Far plane â€” very blurred, large */}
        <div className="absolute rounded-full" style={{ width: 600, height: 600, left: '-10%', top: '5%', background: '#c8a2c8', opacity: 0.18, filter: 'blur(120px)', transform: 'translate(0,0)' }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, right: '-8%', bottom: '10%', background: '#9b72aa', opacity: 0.14, filter: 'blur(100px)' }} />
        {/* Mid plane */}
        <div className="absolute rounded-full" style={{ width: 320, height: 320, left: '55%', top: '25%', background: '#b76e79', opacity: 0.10, filter: 'blur(60px)' }} />
        {/* Near plane â€” sharper, smaller */}
        <div className="absolute rounded-full" style={{ width: 140, height: 140, left: '12%', bottom: '18%', background: '#dcc6f0', opacity: 0.22, filter: 'blur(20px)' }} />
        <div className="absolute rounded-full" style={{ width: 100, height: 100, right: '14%', top: '12%', background: '#dcc6f0', opacity: 0.18, filter: 'blur(14px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollDepth className="text-center mb-20">
          <TextReveal delay={0}>
            <span className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase">Our</span>
          </TextReveal>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Love Story" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
          <TextReveal delay={0.2}>
            <p className="font-sans text-charcoal-soft text-sm leading-loose max-w-lg mx-auto">
              Every great love story has its chapters. Here&apos;s ours â€” written in moments, laughter, and quiet joy.
            </p>
          </TextReveal>
        </ScrollDepth>

        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple/25 to-transparent hidden md:block" aria-hidden="true" />
          {stories.map((s, i) => <TimelineItem key={i} story={s} index={i} />)}
        </div>

        <div className="flex justify-center mt-8"><FloralDivider /></div>
      </div>
    </section>
  )
}

function TimelineItem({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const isLeft   = story.side === 'left'

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-14 gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.0, ease: EASE }}
        className="w-full md:w-5/12"
      >
        {/* TiltCard intensity bumped to 9 for dramatic 3D */}
        <TiltCard intensity={9} className="w-full">
          <article
            className="overflow-hidden rounded-2xl card-deep-light transition-all duration-500"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
          >
            {/* Photo header with parallax-ready structure */}
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.photo} alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
              {/* Depth vignette edges */}
              <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 40px rgba(155,114,170,0.15)' }} />
              {/* Season badge */}
              <div className="absolute top-3 left-3">
                <span className="font-display text-white/90 italic text-xs bg-black/25 backdrop-blur-md px-3 py-1 rounded-full border border-white/25">
                  {story.season} Â· {story.year}
                </span>
              </div>
              {/* Icon */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-base">
                {story.icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6">
              {/* Inner top highlight line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />

              <h3 className="font-heading text-xl text-charcoal mb-2">{story.title}</h3>
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{story.body}</p>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent"
                initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
                aria-hidden="true"
              />
            </div>
          </article>
        </TiltCard>
      </motion.div>

      {/* Centre node */}
      <div className="hidden md:flex w-2/12 justify-center relative z-10 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          <div className="w-5 h-5 rounded-full bg-rose-gold border-[3px] border-white"
            style={{ boxShadow: '0 0 0 4px rgba(183,110,121,0.25), 0 4px 12px rgba(183,110,121,0.4)' }}
          />
        </motion.div>
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  )
}

