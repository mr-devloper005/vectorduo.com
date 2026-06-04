import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f7fbff)] px-4 py-14 text-[var(--editable-page-text,#0b2f3a)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] opacity-55">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">About {globalContent.site.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-slate-600">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black tracking-tight">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
