'use client'

import { motion } from 'framer-motion'

interface Orb { color: string; size: number; x: number; y: number; duration: number; delay?: number }

const defaultOrbs: Orb[] = [
  { color: '#7c3aed', size: 500, x: 10,  y: 15,  duration: 20 },
  { color: '#b76e79', size: 350, x: 70,  y: 60,  duration: 25, delay: 3 },
  { color: '#c8a2c8', size: 300, x: 40,  y: 75,  duration: 18, delay: 6 },
  { color: '#9b72aa', size: 400, x: 80,  y: 10,  duration: 22, delay: 2 },
  { color: '#5b21b6', size: 250, x: 20,  y: 80,  duration: 28, delay: 8 },
]

/* Deterministic drift paths — no Math.random() */
const paths = [
  { x: [0, 40, -30, 20, 0],  y: [0, -30, 25, -15, 0]  },
  { x: [0, -35, 25, -15, 0], y: [0,  30, -20,  18, 0]  },
  { x: [0,  25, -40, 15, 0], y: [0, -20,  30, -25, 0]  },
  { x: [0, -20,  30, -25, 0], y: [0, 40, -15,  20, 0]  },
  { x: [0,  30, -20, 35, 0], y: [0, -35,  15, -20, 0]  },
]

export function BackgroundOrbs({ orbs = defaultOrbs, opacity = 0.18 }: { orbs?: Orb[]; opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => {
        const path = paths[i % paths.length]
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:   orb.size,
              height:  orb.size,
              left:    `${orb.x}%`,
              top:     `${orb.y}%`,
              background: orb.color,
              opacity,
              filter: `blur(${orb.size * 0.28}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ x: path.x, y: path.y }}
            transition={{
              duration:   orb.duration,
              delay:      orb.delay ?? 0,
              repeat:     Infinity,
              ease:       'easeInOut',
              repeatType: 'mirror',
            }}
          />
        )
      })}
    </div>
  )
}
