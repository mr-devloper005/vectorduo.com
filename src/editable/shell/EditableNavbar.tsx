'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, LogIn, X, PlusCircle } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#ffffff', '--editable-nav-top': '#12323d', '--editable-nav-text': '#0b2f3a', '--editable-nav-active': '#12323d', '--editable-nav-active-text': '#ffffff', '--editable-cta-bg': '#ee2c25', '--editable-cta-text': '#ffffff', '--editable-search-bg': '#ffffff', '--editable-border': `${preset.colors.muted}33`, '--editable-container': '1180px' } as CSSProperties
  const navItems = useMemo(
    () => globalContent.nav.primaryLinks,
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-sm">
      <div className="bg-[var(--editable-nav-top)] text-white">
        <div className="mx-auto flex min-h-11 w-full max-w-[var(--editable-container)] items-center justify-between gap-4 px-4 text-sm sm:px-6 lg:px-8">
          <form action="/search" className="hidden min-w-0 flex-1 md:block">
            <label className="flex h-8 max-w-52 items-center gap-2 rounded-full border border-white/70 px-3">
              <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-white" />
              <Search className="h-4 w-4" />
            </label>
          </form>
          <div className="ml-auto flex items-center gap-5 font-bold">
            <Link href="/contact" className="hidden hover:text-[#62d6af] sm:inline">Leave a Review</Link>
            <Link href="/create" className="hidden hover:text-[#62d6af] sm:inline">For Providers</Link>
            {session ? (
              <>
                <span className="max-w-40 truncate text-[#62d6af]">{session.name}</span>
                <button type="button" onClick={logout} className="rounded-full border border-white/70 px-4 py-1.5 font-black hover:bg-white hover:text-[#12323d]">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center gap-1 hover:text-[#62d6af]"><LogIn className="h-4 w-4" /> Sign In</Link>
                <Link href="/signup" className="rounded-full border border-white px-5 py-1.5 font-black hover:bg-white hover:text-[#12323d]">Join</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="mx-auto flex min-h-[58px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[var(--editable-border)] bg-white shadow-sm">
            <img src="/favicon.png?v=20260413" alt={globalContent.site.name} className="h-9 w-9 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-3xl font-black tracking-tight">{globalContent.site.name}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center xl:flex">
          <label className="relative flex w-full max-w-xl items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search companies" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-slate-100'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/create" className="hidden items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><PlusCircle className="h-4 w-4" /> Post a Listing</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-lg border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search companies" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, ...(session ? [{ label: session.name, href: '/create' }, { label: 'Logout', href: '#' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} onClick={(event) => { if (item.label === 'Logout') { event.preventDefault(); logout() } setOpen(false) }} className="rounded-lg border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
