'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { buttonClass } from '@/components/ui'

type FormState = { name: string; email: string; phone: string; message: string }
type FieldError = Partial<Record<keyof FormState, string>>

const CONTACT_EMAIL = 'welcome@mpp-insights.com'
const EMPTY: FormState = { name: '', email: '', phone: '', message: '' }

export default function ContactFormModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-demo-modal', handler)
    return () => window.removeEventListener('open-demo-modal', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

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
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }))
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
      setErrors({ message: `Something went wrong. Please email us at ${CONTACT_EMAIL}.` })
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const field = (name: keyof FormState, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-navy ${
          errors[name] ? 'border-red-400' : 'border-line'
        }`}
        {...props}
      />
      {errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name]}</span>}
    </label>
  )

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-deep/60" onClick={() => setOpen(false)} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl sm:p-8"
      >
        <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-slate hover:text-ink" aria-label="Close">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-6">
            <h2 id="demo-title" className="text-2xl font-semibold">Thanks, message sent</h2>
            <p className="mt-3">Someone from MPP Insights will get back to you shortly.</p>
            <button
              onClick={() => { setSubmitted(false); setForm(EMPTY) }}
              className={`${buttonClass.secondary} mt-6`}
            >
              Send another
            </button>
          </div>
        ) : (
          <>
            <h2 id="demo-title" className="text-2xl font-semibold">Book a demo</h2>
            <p className="mt-2 text-sm">
              Tell us what data you work with and what you want to see. We&apos;ll reply by email, or write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-navy underline underline-offset-2">{CONTACT_EMAIL}</a>.
            </p>
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {field('name', 'Name', { autoComplete: 'name' })}
              {field('email', 'Work email', { type: 'email', autoComplete: 'email' })}
              {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel' })}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your data sources, team size, what you use today"
                  className={`w-full resize-none rounded-md border bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-mist focus:border-navy ${
                    errors.message ? 'border-red-400' : 'border-line'
                  }`}
                />
                {errors.message && <span className="mt-1 block text-xs text-red-600">{errors.message}</span>}
              </label>
              <button type="submit" disabled={loading} className={`${buttonClass.primary} w-full disabled:opacity-60`}>
                {loading ? 'Sending…' : 'Send'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
