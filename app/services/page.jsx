import { Top, Strip, Corner } from '../Chrome';
import { services } from '../site';

export const metadata = { title: 'Services · BlackMatter' };

export default function Services() {
  return (
    <main className="stage">
      <Top current="/services/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="relative z-[1]">
          <h1 className="display page-title mb-6">Services</h1>
          <p className="lede">Engagements are scoped to the problem in front of you: an assessment, a build, a migration, or a standing advisory role. Every one ends with documentation your own team can run.</p>
          <ol className="mt-12 list-none p-0 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.title} className="border-t border-[var(--rule-strong)] pt-3">
                <span className="label block mb-3 text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display text-2xl mb-2">{s.title}</h2>
                <p className="text-[var(--ink-2)] text-[15px] leading-[22px]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Strip />
    </main>
  );
}
