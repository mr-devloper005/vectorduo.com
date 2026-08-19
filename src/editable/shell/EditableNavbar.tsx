'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Menu, Search, LogIn, X, PlusCircle, ChevronRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#12323d', '--editable-nav-text': '#ffffff', '--editable-nav-active': '#ee2c25', '--editable-cta-bg': '#ee2c25', '--editable-cta-text': '#ffffff', '--editable-border': 'rgba(255,255,255,0.1)', '--editable-container': '1180px' } as CSSProperties
  const navItems = useMemo(
    () => globalContent.nav.primaryLinks,
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <div className="mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3 py-4">
          <img src="/favicon.png?v=20260413" alt={globalContent.site.name} className="h-20 w-20 object-contain" />
          <div className="hidden sm:block">
            <span className="block text-xl font-black tracking-tight">{globalContent.site.name}</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9f3e5]">{globalContent.nav.tagline}</span>
          </div>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {searchOpen ? (
            <form action="/search" className="flex items-center gap-2">
              <label className="flex h-9 w-56 items-center gap-2 rounded-full bg-white/10 px-3 backdrop-blur">
                <Search className="h-4 w-4 text-white/60" />
                <input name="q" type="search" placeholder="Search companies..." autoFocus className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-white/40" />
              </label>
              <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-1 text-white/60 hover:text-white"><X className="h-4 w-4" /></button>
            </form>
          ) : (
            <button type="button" onClick={() => setSearchOpen(true)} className="hidden rounded-full bg-white/[0.07] p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white md:block" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
          )}

          {session ? (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="max-w-32 truncate text-sm font-bold text-[#c9f3e5]">{session.name}</span>
              <button type="button" onClick={logout} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black transition hover:bg-white hover:text-[#12323d]">Logout</button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white/80 transition hover:text-white"><LogIn className="h-3.5 w-3.5" /> Sign In</Link>
              <Link href="/signup" className="rounded-full border border-white/15 px-4 py-2 text-xs font-black transition hover:bg-white hover:text-[#12323d]">Join Free</Link>
            </div>
          )}

          <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-lg shadow-[#ee2c25]/20 transition hover:brightness-110 md:inline-flex"><PlusCircle className="h-4 w-4" /> Post Listing</Link>

          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-full bg-white/10 p-2.5 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#ee2c25] to-transparent opacity-60" />

      {open ? (
        <div className="border-t border-white/10 bg-[#0e2a34] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 rounded-xl bg-white/[0.07] px-4 py-3">
            <Search className="h-4 w-4 text-white/50" />
            <input name="q" type="search" placeholder="Search companies..." className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-white/40" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/[0.07] hover:text-white">
                {item.label} <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-xl bg-[#ee2c25] px-4 py-3 text-center text-sm font-black text-white">Post a Listing</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/70">Logout ({session.name})</button>
              </>
            ) : (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-xl bg-[#ee2c25] px-4 py-3 text-center text-sm font-black text-white">Post a Listing</Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold text-white/70">Sign In</Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-bold text-white">Join Free</Link>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
