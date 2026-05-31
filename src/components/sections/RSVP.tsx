'use client'

import { useState, useRef, FormEvent, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { BackgroundOrbs }  from '@/components/ui/BackgroundOrbs'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Inline crystal decor scene for RSVP ── */
const RsvpCrystalScene = dynamic(
  () => import('@/components/3d/RsvpCrystalScene').then((m) => ({ default: m.RsvpCrystalScene })),
  { ssr: false },
)

interface FormData { name: string; email: string; phone: string; guests: string; attending: 'yes' | 'no' | ''; dietary: string }
interface FormErrors { name?: string; email?: string; phone?: string; guests?: string; attending?: string }
const initial: FormData = { name: '', email: '', phone: '', guests: '1', attending: '', dietary: '' }

function validate(d: FormData): FormErrors {
  const e: FormErrors = {}
  if (!d.name.trim())                                e.name      = 'Full name is required.'
  if (!d.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email     = 'A valid email is required.'
  if (!d.phone.trim())                               e.phone     = 'Contact number is required.'
  if (!d.guests || Number(d.guests) < 1)             e.guests    = 'At least 1 guest.'
  if (!d.attending)                                  e.attending = 'Please select yes or no.'
  return e
}

const rsvpOrbs = [
  { color: '#7c3aed', size: 400, x: 5,  y: 30, duration: 20 },
  { color: '#5b21b6', size: 250, x: 50, y: 90, duration: 18 },
]

/* ── SVG Floral corner ornaments ── */
function FloralOrnament({ className = '', flip = false, flipY = false }: { className?: string; flip?: boolean; flipY?: boolean }) {
  return (
    <motion.svg
      width="110" height="110" viewBox="0 0 110 110" fill="none"
      className={`pointer-events-none ${className}`}
      style={{
        transform: `scaleX(${flip ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
      }}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
    >
      {/* Main curved stem */}
      <path d="M4 4 Q28 4 44 20 Q60 36 60 64 Q60 88 80 104" stroke="#C8A2C8" strokeWidth="0.8" fill="none" opacity="0.55" />

      {/* Branch 1 */}
      <path d="M24 14 Q30 24 22 30" stroke="#DCC6F0" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* Branch 2 */}
      <path d="M42 32 Q52 36 50 46" stroke="#DCC6F0" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* Branch 3 */}
      <path d="M58 56 Q70 55 72 66" stroke="#DCC6F0" strokeWidth="0.7" fill="none" opacity="0.5" />

      {/* Rose bud at top */}
      <circle cx="22" cy="30" r="5.5" fill="#DCC6F0" opacity="0.45" />
      <circle cx="22" cy="30" r="3"   fill="#B76E79" opacity="0.5" />
      <circle cx="19.5" cy="27.5" r="1.5" fill="#DCC6F0" opacity="0.3" />

      {/* Rose bud 2 */}
      <circle cx="50" cy="46" r="4.5" fill="#C8A2C8" opacity="0.4" />
      <circle cx="50" cy="46" r="2.5" fill="#B76E79" opacity="0.45" />

      {/* Rose bud 3 */}
      <circle cx="72" cy="66" r="4" fill="#DCC6F0" opacity="0.38" />
      <circle cx="72" cy="66" r="2.2" fill="#9B72AA" opacity="0.42" />

      {/* Small leaves */}
      <ellipse cx="16" cy="18" rx="5" ry="2.5" fill="#C8A2C8" opacity="0.22" transform="rotate(-45 16 18)" />
      <ellipse cx="36" cy="28" rx="5" ry="2.5" fill="#C8A2C8" opacity="0.22" transform="rotate(-20 36 28)" />
      <ellipse cx="54" cy="50" rx="5" ry="2.5" fill="#C8A2C8" opacity="0.22" transform="rotate(15 54 50)" />

      {/* Tiny accent dots */}
      <circle cx="8"  cy="8"  r="1.5" fill="#DCC6F0" opacity="0.5" />
      <circle cx="14" cy="10" r="1"   fill="#C8A2C8" opacity="0.4" />
    </motion.svg>
  )
}

export function RSVP() {
  const [form, setForm]           = useState<FormData>(initial)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px 0px' })

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="rsvp" ref={ref}
      className="relative py-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e0d3e 0%, #130828 50%, #2a1258 100%)' }}
      aria-labelledby="rsvp-heading"
    >
      <BackgroundOrbs orbs={rsvpOrbs} opacity={0.2} />

      {/* 3D crystal scene (behind content at zIndex 2) */}
      <div className="absolute inset-0" aria-hidden="true">
        <RsvpCrystalScene />
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[600, 900].map((r, i) => (
          <motion.div
            key={r}
            className="absolute border border-lavender/6 rounded-full"
            style={{ width: r, height: r }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.28, 0.1] }}
            transition={{ duration: 7 + i * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </div>

      {/* ── SPLIT LAYOUT ── */}
      <div className="relative z-10 flex min-h-[700px]">

        {/* LEFT: Photo panel */}
        <div className="hidden lg:block w-[42%] relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gallery/p12.jpg" alt="Isuru & Sandali"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(30,13,62,0.3), rgba(30,13,62,0.6) 70%, #1e0d3e 100%)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(30,13,62,0.22)' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="absolute bottom-16 left-8 right-8"
          >
            <p className="font-display text-white/70 italic text-xl leading-relaxed">
              &ldquo;Two hearts, one forever.&rdquo;
            </p>
            <div className="mt-3 h-px w-16 bg-gradient-to-r from-rose-gold/60 to-transparent" />
          </motion.div>
        </div>

        {/* RIGHT: Form */}
        <div className="w-full lg:w-[58%] flex items-center justify-center py-28 px-6 md:px-12">
          <div className="w-full max-w-lg relative">

            {/* Floral corner ornaments */}
            <FloralOrnament className="absolute -top-6 -left-6 z-20" />
            <FloralOrnament className="absolute -top-6 -right-6 z-20" flip />
            <FloralOrnament className="absolute -bottom-6 -left-6 z-20" flipY />
            <FloralOrnament className="absolute -bottom-6 -right-6 z-20" flip flipY />

            <div className="text-center mb-12">
              <motion.span
                initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="font-display text-rose-gold italic tracking-[0.35em] text-sm uppercase"
              >
                Kindly
              </motion.span>
              <div className="overflow-visible mt-1">
                <AnimatedLetters text="RSVP" className="font-heading text-5xl md:text-6xl text-white" />
              </div>
              <SectionDivider />
              <motion.p
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-sans text-sm text-lavender/70"
              >
                Please respond by <strong className="text-lavender">August 1, 2026</strong>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="bg-white/7 backdrop-blur-xl border border-white/10 rounded-3xl p-8 card-deep"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-10 gap-5 text-center"
                    role="status" aria-live="polite"
                  >
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <CheckCircle className="text-rose-gold" size={52} />
                    </motion.div>
                    <h3 className="font-heading text-3xl text-white">Thank You!</h3>
                    <p className="font-sans text-sm text-lavender/70 max-w-xs">
                      Your RSVP has been received. We can&apos;t wait to celebrate with you!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-5" exit={{ opacity: 0 }}>
                    <Field label="Full Name" error={errors.name} required>
                      <input
                        type="text" value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="Your full name" className={inp(!!errors.name)} aria-required="true" aria-invalid={!!errors.name}
                      />
                      {errors.name && <Err>{errors.name}</Err>}
                    </Field>
                    <Field label="Email Address" error={errors.email} required>
                      <input
                        type="email" value={form.email} onChange={e => set('email', e.target.value)}
                        placeholder="you@example.com" className={inp(!!errors.email)} aria-required="true"
                      />
                      {errors.email && <Err>{errors.email}</Err>}
                    </Field>
                    <Field label="Contact Number" error={errors.phone} required>
                      <input
                        type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000" className={inp(!!errors.phone)} aria-required="true"
                      />
                      {errors.phone && <Err>{errors.phone}</Err>}
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="No. of Guests" error={errors.guests} required>
                        <input
                          type="number" min="1" max="10" value={form.guests}
                          onChange={e => set('guests', e.target.value)} className={inp(!!errors.guests)}
                        />
                        {errors.guests && <Err>{errors.guests}</Err>}
                      </Field>
                      <Field label="Attending?" error={errors.attending} required>
                        <select
                          value={form.attending} onChange={e => set('attending', e.target.value as 'yes' | 'no' | '')}
                          className={inp(!!errors.attending)}
                        >
                          <option value="">Select…</option>
                          <option value="yes">Joyfully Accept ✓</option>
                          <option value="no">Regretfully Decline</option>
                        </select>
                        {errors.attending && <Err>{errors.attending}</Err>}
                      </Field>
                    </div>
                    <Field label="Dietary Requirements" hint="(optional)">
                      <input
                        type="text" value={form.dietary} onChange={e => set('dietary', e.target.value)}
                        placeholder="Vegetarian, allergies…" className={inp(false)}
                      />
                    </Field>
                    <motion.button
                      type="submit" disabled={loading}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(183,110,121,0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-rose-gold text-white font-sans text-sm tracking-[0.15em] uppercase py-4 rounded-xl hover:bg-rose-light transition-colors duration-300 disabled:opacity-60 mt-2"
                    >
                      {loading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : (
                        <><Send size={16} aria-hidden="true" />Send RSVP</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const inp = (err: boolean) =>
  `w-full font-sans text-sm text-white bg-white/8 border ${err ? 'border-red-400' : 'border-white/15'} rounded-xl px-4 py-3 outline-none focus:border-rose-gold/70 focus:ring-2 focus:ring-rose-gold/15 transition-all duration-200 placeholder:text-white/30`

function Field({ label, children, error, hint, required }: {
  label: string; children: React.ReactNode; error?: string; hint?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-xs text-lavender/70 tracking-[0.12em] uppercase">
        {label}
        {hint && <span className="ml-1 text-white/40 normal-case">{hint}</span>}
        {required && <span className="text-rose-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  )
}
function Err({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-xs text-red-400 mt-0.5" role="alert">{children}</p>
}
