import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Code2, Megaphone, Palette, Search, ShieldCheck, Sparkles, Star, UsersRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const categories = [
  { title: 'Development', icon: Code2, links: ['Web Development', 'Mobile App Development', 'Software Development', 'AI Development', 'Ecommerce Development'] },
  { title: 'Design & Production', icon: Palette, links: ['Web Design', 'UX/UI Design', 'Logo Design', 'Brand Identity', 'Product Design'] },
  { title: 'Marketing', icon: Megaphone, links: ['Digital Marketing', 'SEO', 'Content Marketing', 'Social Media Marketing', 'Paid Advertising'] },
  { title: 'Business Services', icon: BriefcaseBusiness, links: ['Consulting', 'Accounting', 'HR Services', 'Call Centers', 'Commercial Real Estate'] },
  { title: 'IT Services', icon: ShieldCheck, links: ['Managed IT Services', 'Cybersecurity', 'Cloud Consulting', 'Data Analytics', 'Staff Augmentation'] },
  { title: 'Pricing & Packages', icon: BarChart3, links: ['Fixed Price Projects', 'Hourly Providers', 'Startup Budgets', 'Enterprise Teams', 'Local Partners'] },
]

const stats = [
  ['12K+', 'listed providers'],
  ['2K+', 'service categories'],
  ['4.8/5', 'average review signal'],
  ['38%', 'faster shortlisting'],
]

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Listings'
}

function ProviderCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block rounded-lg border border-black/[0.06] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#12323d] text-white">
          <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-90" />
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-xl font-black tracking-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-[#667985]">
            <span className="text-[#ee2c25]">★★★★★</span>
            <span>Verified listing</span>
          </div>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#667985]">{getEditableExcerpt(post, 170) || 'Business profile with services, contact details, and buyer-focused company information.'}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#ee2c25]">View profile</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

function DarkFeature({ icon, eyebrow, title, children }: { icon: ReactNode; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <article className="rounded-lg bg-[#12323d] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#c9f3e5] text-[#12323d]">{icon}</div>
      <p className="mt-5 text-sm font-black text-[#c9f3e5]">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/80">{children}</p>
    </article>
  )
}

export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  const hero = pagesContent.home.hero
  return (
    <section className="border-b border-black/[0.06] bg-[#f7fbff]">
      <div className={`${dc.shell.section} grid gap-10 py-12 lg:grid-cols-[minmax(0,1.05fr)_430px] lg:items-center lg:py-16`}>
        <div>
          <div className="inline-flex items-center gap-3 rounded-lg border border-black/[0.06] bg-[#e7f0ff] px-4 py-3 text-sm font-bold text-[#12323d]">
            <Sparkles className="h-4 w-4 text-[#ee2c25]" />
            {hero.badge}
          </div>
          <h1 className="mt-8 max-w-3xl text-4xl font-black leading-[1.03] tracking-tight text-[#0b2f3a] sm:text-5xl lg:text-6xl">{hero.title.join(' ')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667985]">{hero.description}</p>
          <form action="/search" className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label className="flex min-h-14 flex-1 items-center gap-3 rounded-lg border border-black/[0.06] bg-white px-4 shadow-sm">
              <Search className="h-5 w-5 text-[#667985]" />
              <input name="q" placeholder={hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#0b2f3a] outline-none placeholder:text-[#667985]" />
            </label>
            <button className="min-h-14 rounded-lg bg-[#ee2c25] px-7 text-base font-black text-white shadow-sm transition hover:bg-[#ee2c25]/90">Get matched</button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Web design agency', 'SEO company', 'Managed IT provider'].map((item) => (
              <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="inline-flex items-center gap-2 rounded-lg border border-black/[0.06] bg-white px-4 py-2 text-sm font-semibold text-[#415967] hover:border-[#ee2c25]">
                <Search className="h-4 w-4" /> {item}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#12323d] px-6 py-3 text-sm font-black text-white">Browse listings <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/create" className="inline-flex items-center justify-center rounded-lg border border-[#12323d] bg-white px-6 py-3 text-sm font-black text-[#12323d]">Post a listing</Link>
          </div>
        </div>
        <div className="rounded-lg border border-black/[0.06] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
          <div className="rounded-lg bg-[#12323d] p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c9f3e5]">Project brief</p>
            <div className="mt-5 space-y-3">
              {['What service do you need?', 'What is your budget?', 'Which location works best?'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#12323d]">
                  <span>{item}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e7f0ff] text-xs">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-black/[0.06] bg-[#f3f7f9] p-4">
                <p className="text-2xl font-black text-[#0b2f3a]">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#667985]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 6)
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-14`}>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight text-[#0b2f3a] sm:text-4xl">The perfect partner for any project</h2>
          <p className="mt-3 text-base leading-7 text-[#667985]">Browse in-demand categories and shortlist top-ranked companies without stretching the page into an endless wall of content.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.title} className="rounded-lg border border-black/[0.06] bg-white p-6 shadow-sm">
              <category.icon className="h-9 w-9 text-[#ee2c25]" />
              <h3 className="mt-4 text-2xl font-black tracking-tight text-[#0b2f3a]">{category.title}</h3>
              <div className="mt-5 grid gap-3">
                {category.links.map((link) => (
                  <span key={link} className="text-sm font-semibold text-[#415967]">{link}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        {railPosts.length ? (
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ee2c25]">Featured {taskLabel(primaryTask).toLowerCase()}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0b2f3a]">Provider listings worth a closer look</h2>
              </div>
              <Link href={primaryRoute} className="hidden rounded-lg border border-black/[0.06] px-5 py-3 text-sm font-black text-[#12323d] sm:inline-flex">View all</Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {railPosts.map((post) => <ProviderCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit(_props: HomeSectionProps) {
  return (
    <section className="bg-[#c9f3e5]">
      <div className={`${dc.shell.section} py-14`}>
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#0b2f3a] sm:text-4xl">Your one-stop shop for better business decisions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#12323d]">Tools for every stage of the research process, from broad search to confident provider selection.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <DarkFeature icon={<Search className="h-5 w-5" />} eyebrow="Search" title="Browse service providers">
            Explore a focused network of trusted partners across business categories. Find the right company or service in minutes.
          </DarkFeature>
          <DarkFeature icon={<UsersRound className="h-5 w-5" />} eyebrow="Find" title="Narrow results and shortlist top picks">
            Filter by service, budget, location, and industry so a long list turns into a practical shortlist.
          </DarkFeature>
          <DarkFeature icon={<CheckCircle2 className="h-5 w-5" />} eyebrow="Decide" title="Read verified profile details">
            Use reviews, portfolio notes, and contact details to select a vendor who can deliver the project.
          </DarkFeature>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ee2c25]">For buyers and providers</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b2f3a] sm:text-4xl">Join leaders who use {globalContent.site.name} to connect with trusted business partners</h2>
          <p className="mt-4 text-base leading-8 text-[#667985]">Explore the marketplace to understand why teams come back when they need a practical, comparable view of business services.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="rounded-lg bg-[#12323d] px-6 py-3 text-sm font-black text-white">Find companies</Link>
            <Link href="/contact" className="rounded-lg border border-black/[0.06] bg-white px-6 py-3 text-sm font-black text-[#12323d]">Talk to us</Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Compare with context', 'Service lines, budget cues, location, and profile summaries are easy to scan before outreach.'],
            ['Grow your visibility', 'Providers can present their company with clear services, proof points, and contact paths.'],
            ['Search by real needs', 'Visitors can start with a project goal instead of needing to know every vendor name.'],
            ['Keep decisions moving', 'Focused layouts reduce distraction and make shortlisting feel faster.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-black/[0.06] bg-[#f7fbff] p-5">
              <Star className="h-5 w-5 fill-[#ee2c25] text-[#ee2c25]" />
              <h3 className="mt-4 text-xl font-black tracking-tight text-[#0b2f3a]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#667985]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-listed" className="bg-[#12323d] text-white">
      <div className={`${dc.shell.section} grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center`}>
        <div>
          <p className="text-sm font-black text-[#c9f3e5]">Selling B2B services?</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Connect with your next client through a stronger business listing.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{pagesContent.home.cta.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/create" className="rounded-lg bg-white px-6 py-3 text-sm font-black text-[#12323d]">Create a profile</Link>
          <Link href="/contact" className="rounded-lg border border-white/10 px-6 py-3 text-sm font-black text-white">Leave a review</Link>
        </div>
      </div>
    </section>
  )
}
