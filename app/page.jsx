import Link from 'next/link';
import Map from './Map';
import { Backdrop, Top, Foot, ContactBand } from './Chrome';
import { hero, terms, kinds, aiShort, process, touch, readiness, truths, contact } from './site';

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export default function Home() {
  return (
    <main className="page">
      <Backdrop />
      <Top current="/" />

      <section id="top" className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="h1">{hero.headline}</h1>
          <p className="p-lg measure">{hero.lede}</p>
          <div className="actions">
            <Link href="/services/" className="btn btn-accent">See the services</Link>
            <Link href="/readiness-check/" className="btn btn-quiet">Check whether your project is ready</Link>
          </div>
        </div>
        <figure className="hero-figure">
          <Map />
          <figcaption className="eyebrow">{hero.caption}</figcaption>
        </figure>
        <div className="tags">{hero.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </section>

      <section id="terms" className="band">
        <div className="wrap split" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <h2 className="h2-sm label-col">Plain terms, up front</h2>
          <div className="body-col">
            <p className="p-lg" style={{ color: 'var(--ink)' }}>{terms.main}</p>
            <p className="p-sm" style={{ color: 'var(--ink-3)' }}>{terms.note}</p>
          </div>
        </div>
      </section>

      <section id="services" className="wrap section" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 className="h2">What people come here for</h2>
        <div className="grid-2">
          {kinds.map((k) => (
            <article key={k.id} className="frost card">
              <h3 className="h3">{k.title}</h3>
              <p className="quote">{k.quotes.map((q) => `“${q}”`).join(' ')}</p>
              <p className="p-sm">{k.shortBody ?? k.body}</p>
              <Link href={`/services/#${k.id}`} className="link link-caps">{k.short}<Arrow /></Link>
            </article>
          ))}
        </div>
        <p className="p-sm">{aiShort} <Link href="/services/" className="link" style={{ minHeight: 0 }}>All four kinds of work</Link></p>
      </section>

      <section id="process" className="wrap section-tight" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <h2 className="h2">How an engagement runs</h2>
        <ol className="grid-4 steps">
          {process.map((p, i) => (
            <li key={p.title}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{p.title}</h3>
              <p className="p-sm">{p.body}</p>
            </li>
          ))}
        </ol>
        <div className="split" style={{ paddingTop: 40, borderTop: '1px solid var(--rule-soft)', gap: '16px 64px' }}>
          <h3 className="eyebrow label-col" style={{ fontSize: 13 }}>What I touch</h3>
          <p className="p body-col">{touch}</p>
        </div>
      </section>

      <section id="ready" className="band">
        <div className="wrap split split-center" style={{ paddingTop: 104, paddingBottom: 104, gap: 64 }}>
          <div className="main" style={{ flex: '1 1 420px' }}>
            <p className="eyebrow">Project readiness check</p>
            <h2 className="h2">Not sure yet?</h2>
            <p className="p-lg">{readiness.body}</p>
            <div className="band-actions">
              <Link href="/readiness-check/" className="btn btn-accent">Run the readiness check</Link>
              <span className="p-sm" style={{ color: 'var(--ink-3)' }}>{readiness.note}</span>
            </div>
          </div>
          <div className="frost-deep" style={{ flex: '1 1 380px', minWidth: 0, padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 className="eyebrow">At the end you get</h3>
            <ul className="bullets">{readiness.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="true" className="wrap section split" style={{ gap: '40px 80px' }}>
        <div className="label-col" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="h2">A few things that are true</h2>
          <Link href="/about/" className="link link-caps">About BlackMatter<Arrow /></Link>
        </div>
        <ul className="hairlist" style={{ flex: '1 1 520px', minWidth: 0 }}>
          {truths.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <ContactBand>{contact.reply}</ContactBand>
      <Foot />
    </main>
  );
}
