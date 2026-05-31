'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X, Expand } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'

const FloatingPetals3D = dynamic(
  () => import('@/components/3d/FloatingPetals3D').then((m) => ({ default: m.FloatingPetals3D })),
  { ssr: false },
)

const EASE = [0.16, 1, 0.3, 1] as const

const PHOTOS = [
  { src: '/gallery/p13.jpg', caption: 'Pure Joy',         category: 'Graduation'  },
  { src: '/gallery/p9.jpg',  caption: 'Sandali',          category: 'Portrait'    },
  { src: '/gallery/p5.jpg',  caption: 'Her Big Day',      category: 'Graduation'  },
  { src: '/gallery/p11.jpg', caption: 'Birthday Moments', category: 'Celebration' },
  { src: '/gallery/p12.jpg', caption: 'His Graduation',   category: 'Graduation'  },
  { src: '/gallery/p6.jpg',  caption: 'The Ring',         category: 'Milestone'   },
  { src: '/gallery/p1.jpg',  caption: 'Together',         category: 'Us'          },
  { src: '/gallery/p10.jpg', caption: 'Happy Birthday',   category: 'Celebration' },
  { src: '/gallery/p7.jpg',  caption: 'The Groom',        category: 'Portrait'    },
  { src: '/gallery/p2.jpg',  caption: 'By the Water',     category: 'Adventure'   },
  { src: '/gallery/p8.jpg',  caption: 'Night Together',   category: 'Us'          },
  { src: '/gallery/p4.jpg',  caption: 'Life Jacket Love', category: 'Adventure'   },
  { src: '/gallery/p3.jpg',  caption: 'Boat Adventures',  category: 'Adventure'   },
]

const darkOrbs = [
  { color: '#7c3aed', size: 400, x: 10, y: 20, duration: 22 },
  { color: '#b76e79', size: 280, x: 80, y: 65, duration: 18 },
  { color: '#5b21b6', size: 320, x: 50, y: 85, duration: 26 },
]

type Photo = typeof PHOTOS[0]

export function Gallery() {
  const [selected, setSelected] = useState<Photo | null>(null)
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section
      id="gallery" ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0520 0%, #1e0d3e 40%, #130828 100%)' }}
      aria-labelledby="gallery-heading"
    >
      <BackgroundOrbs orbs={darkOrbs} opacity={0.2} />

      {/* 3D floating petals — subtle atmospheric layer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        <FloatingPetals3D className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-rose-gold italic tracking-[0.35em] text-sm uppercase"
          >
            Cherished
          </motion.span>
          <div className="overflow-visible mt-1">
            <AnimatedLetters text="Moments" className="font-heading text-5xl md:text-6xl text-white" />
          </div>
          <SectionDivider />
          <motion.p
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-sans text-xs text-lavender/50 tracking-widest uppercase"
          >
            {PHOTOS.length} photos · our story in pictures
          </motion.p>
        </div>

        {/* CSS masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {PHOTOS.map((photo, i) => (
            <PhotoTile
              key={photo.src}
              photo={photo}
              index={i}
              isInView={isInView}
              onOpen={() => setSelected(photo)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(8,1,21,0.95)', backdropFilter: 'blur(24px)' }}
            onClick={() => setSelected(null)}
            role="dialog" aria-modal="true"
          >
            <motion.button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white z-10"
              onClick={() => setSelected(null)} aria-label="Close"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              <X size={18} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative max-h-[90vh] max-w-[90vw] rounded-2xl overflow-hidden border border-white/12"
              style={{ boxShadow: '0 0 60px rgba(183,110,121,0.25), 0 40px 80px rgba(0,0,0,0.6)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.src} alt={selected.caption}
                className="block max-h-[85vh] max-w-[88vw] w-auto h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-bg-void/92 to-transparent">
                <p className="font-sans text-[10px] text-rose-gold/80 tracking-[0.2em] uppercase">{selected.category}</p>
                <p className="font-heading text-white text-lg mt-0.5">{selected.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Photo tile with 3D tilt + depth shadow ── */
function PhotoTile({ photo, index, isInView, onOpen }: {
  photo: Photo; index: number; isInView: boolean; onOpen: () => void
}) {
  const tileRef   = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotX = useSpring(useTransform(rawY, [-1, 1], [13, -13]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-13, 13]), { stiffness: 200, damping: 30 })
  const glareX = useTransform(rawX, [-1, 1], ['0%', '100%'])
  const glareY = useTransform(rawY, [-1, 1], ['0%', '100%'])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tileRef.current) return
    const { left, top, width, height } = tileRef.current.getBoundingClientRect()
    rawX.set(((e.clientX - left) / width  - 0.5) * 2)
    rawY.set(((e.clientY - top)  / height - 0.5) * 2)
  }
  function onLeave() { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.6 }}
      animate={isInView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
      transition={{ duration: 1.1, delay: index * 0.07, ease: EASE }}
      className="break-inside-avoid mb-3 group cursor-pointer"
      onClick={onOpen}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      aria-label={`View: ${photo.caption}`}
      style={{ perspective: '900px' }}
    >
      <motion.div
        ref={tileRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl"
        whileHover={{ scale: 1.02, z: 18 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src} alt={photo.caption}
          className="w-full h-auto block object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          loading="lazy"
        />

        {/* Depth shadow layer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)' }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void/88 via-bg-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Glare reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 55%)` }}
        />

        {/* Category chip */}
        <div className="absolute top-3 left-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
          <span className="font-sans text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">
            {photo.category}
          </span>
        </div>

        {/* Expand icon */}
        <div className="absolute top-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Expand size={12} className="text-white/70" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <p className="font-heading text-white text-base leading-tight">{photo.caption}</p>
        </div>

        {/* Rose-gold top accent line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-rose-gold to-rose-gold/40"
          animate={isInView ? { width: '35%' } : { width: '0%' }}
          transition={{ duration: 0.7, delay: 0.3 + index * 0.07, ease: EASE }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  )
}
