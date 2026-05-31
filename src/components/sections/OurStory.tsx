'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { FloralDivider }  from '@/components/ui/FloralDecor'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { TextReveal }     from '@/components/ui/TextReveal'
import { TiltCard }       from '@/components/ui/TiltCard'
import { BackgroundOrbs } from '@/components/ui/BackgroundOrbs'

const EASE = [0.16, 1, 0.3, 1] as const

const stories = [
  {
    year: '2019', season: 'Summer',
    title: 'First Glance',
    body: "A chance encounter at a mutual friend's gathering. One smile across the room and the whole afternoon stood still.",
    side: 'left', icon: '☀️', photo: '/gallery/p8.jpg',
  },
  {
    year: '2019', season: 'August',
    title: 'First Date',
    body: "A walk along the waterfront, then candlelight and conversation that lasted long past midnight. We never wanted it to end.",
    side: 'right', icon: '🌊', photo: '/gallery/p2.jpg',
  },
  {
    year: '2021', season: 'Spring',
    title: 'Home Together',
    body: "After two years of building something beautiful, we made our home together. Every morning became our favourite moment.",
    side: 'left', icon: '🏡', photo: '/gallery/p11.jpg',
  },
  {
    year: '2023', season: 'December',
    title: 'The Proposal',
    body: "On a quiet evening with fairy lights above, he held her hand and asked forever. She said yes before he could finish.",
    side: 'right', icon: '💍', photo: '/gallery/p9.jpg',
  },
  {
    year: '2024', season: 'Spring',
    title: 'His Graduation',
    body: "Celebrating every milestone together — because every achievement belongs to both of us.",
    side: 'left', icon: '🎓', photo: '/gallery/p12.jpg',
  },
  {
    year: '2026', season: 'September',
    title: 'Forever Begins',
    body: "Now we invite the people we love most to witness us exchange our vows and begin the most beautiful chapter of our lives.",
    side: 'right', icon: '💐', photo: '/gallery/p13.jpg',
  },
]

const lightOrbs = [
  { color: '#9b72aa', size: 350, x: 5,  y: 20, duration: 22 },
  { color: '#b76e79', size: 250, x: 85, y: 65, duration: 18 },
]

export function OurStory() {
  return (
    <section id="story" className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0e8ff 0%, #e8dbff 50%, #ddd0f8 100%)' }}
      aria-labelledby="story-heading"
    >
      <BackgroundOrbs orbs={lightOrbs} opacity={0.07} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <TextReveal delay={0}>
            <span className="font-display text-purple-deep italic tracking-[0.35em] text-sm uppercase">Our</span>
          </TextReveal>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Love Story" className="font-heading text-5xl md:text-6xl text-charcoal" />
          </div>
          <SectionDivider />
          <TextReveal delay={0.2}>
            <p className="font-sans text-charcoal-soft text-sm leading-loose max-w-lg mx-auto">
              Every great love story has its chapters. Here&apos;s ours — written in moments, laughter, and quiet joy.
            </p>
          </TextReveal>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple/30 to-transparent hidden md:block" aria-hidden="true" />
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
    <div ref={ref} className={`relative flex items-start mb-12 gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -55 : 55, filter: 'blur(4px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.95, ease: EASE }}
        className="w-full md:w-5/12"
      >
        <TiltCard intensity={4} className="w-full">
          {/* Photo header */}
          <div className="relative h-52 overflow-hidden rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.photo} alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
            {/* Year badge */}
            <div className="absolute top-3 left-3">
              <span className="font-display text-white/90 italic text-xs bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                {story.season} · {story.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/85 border-x border-b border-purple/15 rounded-b-2xl p-6 backdrop-blur-sm shadow-lg">
            {/* Accent line */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent"
              initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }} aria-hidden="true" />

            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg" role="img" aria-hidden="true">{story.icon}</span>
              <h3 className="font-heading text-xl text-charcoal">{story.title}</h3>
            </div>
            <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{story.body}</p>
          </div>
        </TiltCard>
      </motion.div>

      {/* Centre node */}
      <div className="hidden md:flex w-2/12 justify-center relative z-10 mt-24">
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-4 h-4 rounded-full bg-rose-gold border-4 border-surface shadow-md" />
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  )
}
