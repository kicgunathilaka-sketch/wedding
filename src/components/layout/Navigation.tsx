'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#story',    label: 'Our Story' },
  { href: '#details',  label: 'Details'   },
  { href: '#gallery',  label: 'Gallery'   },
  { href: '#rsvp',     label: 'RSVP'      },
  { href: '#location', label: 'Location'  },
  { href: '#schedule', label: 'Schedule'  },
]

export function Navigation() {
  const [visible, setVisible]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-40 border-b border-white/8"
          style={{ background: 'rgba(19, 8, 40, 0.88)', backdropFilter: 'blur(20px)' }}
          aria-label="Site navigation"
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#hero" className="font-heading text-white/90 italic text-lg hover:text-rose-gold transition-colors duration-200">
              I &amp; S
            </a>

            <ul className="hidden md:flex items-center gap-8" role="list">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-xs tracking-[0.18em] uppercase text-white/50 hover:text-rose-gold transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden border-t border-white/8"
                style={{ background: 'rgba(19, 8, 40, 0.95)' }}
              >
                <ul className="px-6 py-5 flex flex-col gap-5" role="list">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} onClick={() => setMenuOpen(false)}
                        className="font-sans text-sm text-white/60 hover:text-rose-gold tracking-wide">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
