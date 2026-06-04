import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight company identity, location, contacts, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#f7fbff', '--archive-text': '#0b2f3a', '--archive-surface': '#ffffff', '--archive-accent': '#ee2c25', '--editable-container': '1180px' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
          <div className="rounded-lg border border-slate-200 bg-[var(--archive-surface)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-[#e7f0ff] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0b7895]"><Icon className="h-4 w-4" /> {label}</div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-6 rounded-lg border border-slate-200 bg-[#f7fbff] p-4 text-sm font-bold leading-7 text-slate-600">{deck.promise}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="rounded-lg bg-[#12323d] px-5 py-3 text-sm font-black text-white">Browse all</Link>
              <Link href="/search" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-black">Search companies</Link>
            </div>
          </div>

          <form action={basePath} className="self-end rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] opacity-55"><Filter className="h-4 w-4" /> Filter</div>
            <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full rounded-lg bg-[#ee2c25] text-sm font-black text-white">Apply</button>
            <p className="mt-3 text-xs font-bold opacity-55">Showing: {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/60 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm opacity-65">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-lg bg-[#12323d] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  const services = [getField(post, ['category', 'service', 'services']), ...(post.tags || [])].filter(Boolean).slice(0, 3)
  const websiteHref = website && /^https?:\/\//i.test(website) ? website : website ? `https://${website.replace(/^\/+/, '')}` : ''
  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid gap-6 p-5 md:grid-cols-[250px_minmax(0,1fr)_220px]">
        <div>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-[#12323d] ring-1 ring-slate-200">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-8 w-8 text-white/75" />}
            </div>
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-2xl font-black leading-tight tracking-tight text-[#0b2f3a]">{post.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-black text-[#ee2c25]">5.0 ★★★★★</span>
                <span className="text-[#006b92]">verified reviews</span>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-2 text-sm font-semibold text-slate-600">
            {location ? <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {location}</span> : null}
            {phone ? <span>Phone: {phone}</span> : null}
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#c9f3e5] px-3 py-1 text-xs font-black text-[#12323d]"><CheckCircle2 className="h-3.5 w-3.5" /> Premier Verified</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Services provided</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[52%] bg-[#5c83de]" />
          </div>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            {(services.length ? services : ['Business Services', 'Consulting', 'Marketing Strategy']).map((service, index) => (
              <span key={`${service}-${index}`} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-[#5c83de]' : index === 1 ? 'bg-[#2c9bae]' : 'bg-[#62d6af]'}`} />
                <strong className={index === 0 ? 'text-[#0b2f3a]' : ''}>{index === 0 ? '50% ' : ''}{service}</strong>
              </span>
            ))}
          </div>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">{getSummary(post) || 'A verified business listing with service details, company profile information, and practical contact options for buyers.'}</p>
          <Link href={href} className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#006b92]">See provider profile <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <Link href={href} className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-[#12323d] bg-white px-5 text-sm font-black text-[#12323d] md:w-40">View Profile</Link>
          {websiteHref ? (
            <Link href={websiteHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ee2c25] px-5 text-sm font-black text-white md:w-40">
              Visit Website <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="grid gap-3 border-t border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 md:grid-cols-4">
        {['Reviewed recently', 'Responsive team', 'Experience across industries', 'Strong value for cost'].map((item) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold">{item}</div>
        ))}
      </div>
    </article>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold opacity-75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-[var(--archive-text)] hover:text-[var(--archive-bg)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
    </Link>
  )
}
