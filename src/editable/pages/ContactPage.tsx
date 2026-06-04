'use client'

import { Building2, MapPin, Phone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your provider profile live quickly.' },
    { icon: Phone, title: 'Buyer support', body: 'Tell us what kind of company you need and we will point you toward the right category path.' },
    { icon: MapPin, title: 'Coverage requests', body: 'Need a new location or service lane? Share the market you want represented in the directory.' },
  ]

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[1180px] px-4 py-14 text-[#0b2f3a] sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <lane.icon className="h-5 w-5 text-[#0b7895]" />
                  <h2 className="mt-3 text-xl font-black tracking-tight">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-[#f7fbff] p-5">
            <h2 className="text-2xl font-black tracking-tight">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
