'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'

type FormState = { name: string; email: string; phone: string; message: string }
type FieldError = Partial<Record<keyof FormState, string>>

const CONTACT_EMAIL = 'welcome@mpp-insights.com'

export default function ContactFormModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* ── Listen for global open event ── */
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-demo-modal', handler)
    return () => window.removeEventListener('open-demo-modal', handler)
  }, [])

  /* ── Escape key to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* ── Lock body scroll while open ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  const validate = (): boolean => {
    const e: FieldError = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.phone && !/^[+\d\s\-().]{7,20}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.message.trim()) e.message = 'Please enter a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setErrors({ message: `Something went wrong. Please try emailing us directly at ${CONTACT_EMAIL}.` })
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }

  return (
    <>
      {/* Inject scrollbar-hide styles once */}
      <style>{`
        .modal-scroll::-webkit-scrollbar { display: none; }
        .modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              ref={overlayRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-[900] bg-black/70 backdrop-blur-sm"
            />

            {/* Outer centering shell — does NOT scroll */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[901] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-lg pointer-events-auto rounded-2xl border border-white/8 bg-[#0D1B2A]"
                style={{
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(10,174,219,0.1)',
                  maxHeight: '90vh',
                }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={close}
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all duration-150"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, #0AAEDB80, transparent)' }}
                />

                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.1) 0%, transparent 65%)' }}
                />

                <div
                  className="modal-scroll relative z-10 overflow-y-auto rounded-2xl"
                  style={{ maxHeight: '90vh' }}
                >
                <div className="p-8">
                <div className="mb-8 pr-8">
                  <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
                    Book a Demo
                  </p>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
                    Let&apos;s Start a{' '}
                    <span style={{ color: '#0AAEDB' }}>Conversation</span>
                  </h2>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Tell us about your data challenges, and we&apos;ll get back to you.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: '#10B98115', border: '1px solid #10B98130' }}
                    >
                      <CheckCircle size={28} style={{ color: '#10B981' }} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
                      Someone from the MPP Insights team will be in touch shortly.
                    </p>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={reset}
                        className="text-sm font-semibold text-[#0AAEDB] hover:underline"
                      >
                        Send another
                      </button>
                      <span className="text-white/20">·</span>
                      <button
                        onClick={close}
                        className="text-sm font-semibold text-white/50 hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <Field id="name" label="Full Name" icon={<User size={14} />} error={errors.name}>
                      <input
                        id="name" name="name" type="text" placeholder="Jane Smith"
                        value={form.name} onChange={handleChange}
                        className={inputCls(!!errors.name)}
                      />
                    </Field>

                    <Field id="email" label="Email Address" icon={<Mail size={14} />} error={errors.email}>
                      <input
                        id="email" name="email" type="email" placeholder="jane@company.com"
                        value={form.email} onChange={handleChange}
                        className={inputCls(!!errors.email)}
                      />
                    </Field>

                    <Field
                      id="phone"
                      label={<>Phone <span className="text-[#64748B] font-normal">(optional)</span></>}
                      icon={<Phone size={14} />}
                      error={errors.phone}
                    >
                      <input
                        id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000"
                        value={form.phone} onChange={handleChange}
                        className={inputCls(!!errors.phone)}
                      />
                    </Field>

                    <Field id="message" label="Message" icon={<MessageSquare size={14} />} error={errors.message}>
                      <textarea
                        id="message" name="message" rows={4}
                        placeholder="Tell us about your data stack, team size, or anything else…"
                        value={form.message} onChange={handleChange}
                        className={inputCls(!!errors.message) + ' resize-none'}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                      style={{
                        background: loading
                          ? 'rgba(10,174,219,0.5)'
                          : 'linear-gradient(135deg, #0AAEDB 0%, #0074A6 100%)',
                        boxShadow: loading ? 'none' : '0 0 24px rgba(10,174,219,0.3)',
                      }}
                    >
                      {loading ? (
                        <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending…</>
                      ) : (
                        <>Send Message <Send size={14} /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#64748B]">We respect your privacy. No spam, ever.</p>
                  </form>
                )}
              </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Field({ id, label, icon, error, children }: {
  id: string; label: React.ReactNode; icon: React.ReactNode; error?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-semibold text-[#CBD5E1]">
        <span className="text-[#0AAEDB]">{icon}</span>{label}
      </label>
      {children}
      {error && <p className="text-xs text-[#F87171]">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4A5568]',
    'bg-white/5 border transition-all duration-200 outline-none focus:ring-2',
    hasError
      ? 'border-[#F87171]/50 focus:border-[#F87171] focus:ring-[#F87171]/10'
      : 'border-white/8 focus:border-[#0AAEDB] focus:ring-[#0AAEDB]/10 hover:border-white/15',
  ].join(' ')
}
