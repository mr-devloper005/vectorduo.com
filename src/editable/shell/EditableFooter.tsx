'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Mail, Search } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#12323d', '--editable-footer-text': '#ffffff', '--editable-container': '1180px' } as CSSProperties
  const taskLinks = globalContent.nav.primaryLinks.slice(0, 5)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="bg-gradient-to-r from-[#ee2c25] to-[#d41920]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-lg font-black tracking-tight text-white sm:text-left">Ready to grow your business? Get listed today.</p>
          <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-black text-[#ee2c25] shadow-lg transition hover:shadow-xl">
            Post a Listing <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={globalContent.site.name} className="h-20 w-20 object-contain" />
            <span className="text-2xl font-black tracking-tight">{globalContent.site.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">{globalContent.footer.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition hover:bg-white/15 hover:text-white"><Search className="h-3.5 w-3.5" /> Find Companies</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition hover:bg-white/15 hover:text-white"><Mail className="h-3.5 w-3.5" /> Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c9f3e5]">Categories</h3>
          <div className="mt-5 grid gap-3">
            {taskLinks.map((task) => (
              <Link key={task.href} href={task.href} className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white">
                {task.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c9f3e5]">Company</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['All Listings', '/listings'],
              ...(session ? [['Create Listing', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-semibold text-white/55 transition hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-semibold text-white/55 transition hover:text-white">Logout</button> : null}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c9f3e5]">Why {globalContent.site.name}?</h3>
          <p className="mt-5 text-sm leading-7 text-white/50">{globalContent.footer.bottomNote}</p>
          <div className="mt-6 rounded-xl bg-white/[0.06] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">Search the directory</p>
            <form action="/search" className="mt-3 flex gap-2">
              <input name="q" placeholder="Try &quot;marketing&quot;..." className="h-10 min-w-0 flex-1 rounded-lg bg-white/10 px-3 text-sm font-semibold text-white outline-none placeholder:text-white/30" />
              <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#ee2c25] text-white"><Search className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-white/35">&copy; {year} {globalContent.site.name}. All rights reserved.</p>
          <p className="hidden text-xs font-semibold text-white/35 sm:block">{globalContent.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
