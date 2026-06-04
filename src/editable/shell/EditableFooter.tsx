'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#ffffff', '--editable-footer-text': '#0b2f3a', '--editable-container': '1180px' } as CSSProperties
  const taskLinks = globalContent.nav.primaryLinks.slice(0, 5)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="border-t border-slate-200 bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="bg-[#12323d] text-white">
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-black text-[#62d6af]">Ready to compare providers?</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight">Find, shortlist, and contact trusted companies from one directory.</h2>
          </div>
          <Link href="/listings" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-black text-[#12323d]">
            Browse Listings <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
              <img src="/favicon.png?v=20260413" alt={globalContent.site.name} className="h-9 w-9 object-contain" />
            </span>
            <span className="text-3xl font-black tracking-tight">{globalContent.site.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.href} href={task.href} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#ee2c25]">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Marketplace</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search Companies', '/search'],
              ...(session ? [['Create Listing', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-slate-600 hover:text-[#ee2c25]">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-slate-600 hover:text-[#ee2c25]">Logout {session.name}</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs font-bold text-slate-500">
        &copy; {year} {globalContent.site.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
