import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#12323d] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1180px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
            <h1 className="text-3xl font-black tracking-tight">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-slate-600">Already have an account? <Link href="/login" className="font-black text-[#0b7895] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/60">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/75">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
