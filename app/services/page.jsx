import { Top, Strip, Corner } from '../Chrome';
import { services, process, exclusions } from '../site';

export const metadata = { title: 'Services · BlackMatter' };

export default function Services() {
  return (
    <main className="stage">
      <Top current="/services/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="relative z-[1]">
          <h1 className="display page-title mb-6">Services</h1>
          <p className="lede">Every engagement starts with a full capture of what you need, what the business requires of it, and what done looks like. From there it is scoped as an assessment, a build, a migration or a standing advisory role, and every one ends with documentation your own team can run.</p>
          <ol className="mt-12 list-none p-0 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.title} className="border-t border-[var(--rule-strong)] pt-3">
                <span className="label block mb-3 text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display text-2xl mb-2">{s.title}</h2>
                <p className="text-[var(--ink-2)] text-[15px] leading-[22px]">{s.body}</p>
              </li>
            ))}
          </ol>
          <h2 className="display text-[clamp(28px,4vw,44px)] mt-20 mb-6">How an engagement runs</h2>
          <ol className="list-none p-0 grid gap-8 md:grid-cols-2 xl:grid-cols-4 max-w-[1200px]">
            {process.map((p, i) => (
              <li key={p.title} className="border-t border-[var(--rule-strong)] pt-3">
                <span className="label block mb-3 text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display text-2xl mb-2">{p.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] leading-[22px]">{p.body}</p>
              </li>
            ))}
          </ol>
          <h2 className="display text-[clamp(28px,4vw,44px)] mt-20 mb-6">What we do not do</h2>
          <p className="lede">{exclusions}</p>
        </div>
      </section>
      <Strip />
    </main>
  );
}
