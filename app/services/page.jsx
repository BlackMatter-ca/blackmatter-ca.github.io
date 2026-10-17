import Link from 'next/link';
import { Backdrop, Top, Foot } from '../Chrome';
import { kinds, ai, servicesPage } from '../site';

export const metadata = { title: 'Services · BlackMatter' };

export default function Services() {
  return (
    <main className="page">
      <Backdrop />
      <Top current="/services/" />

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 56, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <p className="eyebrow">Services</p>
        <h1 className="h1" style={{ maxWidth: 960 }}>{servicesPage.headline}</h1>
        <p className="p-lg measure-wide">{servicesPage.lede}</p>
        <p className="frost p-sm measure-wide" style={{ padding: '20px 24px', color: 'var(--ink)', marginTop: 8 }}>{servicesPage.terms}</p>
      </section>

      <nav className="wrap pills" aria-label="On this page" style={{ paddingBottom: 48 }}>
        {kinds.map((k) => <a key={k.id} href={`#${k.id}`}>{k.title}</a>)}
        <a href="#ai">Thinking about AI?</a>
      </nav>

      {kinds.map((k, i) => (
        <article key={k.id} id={k.id} className={i % 2 ? 'band' : ''} style={i % 2 ? {} : { borderTop: '1px solid var(--frost-line)' }}>
          <div className="wrap split" style={{ paddingTop: 72, paddingBottom: 72 }}>
            <div className="aside">
              <h2 className="h2-sm" style={{ fontSize: 'clamp(26px, 2.6vw, 32px)' }}>{k.title}</h2>
              {k.quotes.map((q) => <p key={q} className="quote">“{q}”</p>)}
              <p className={`evidence ${i % 2 ? 'frost-deep' : 'frost'}`}><span className="eyebrow">{k.evidenceLabel}</span>{k.evidence}</p>
            </div>
            <div className="main">
              <p className="p-lg" style={{ color: 'var(--ink)' }}>{k.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 className="eyebrow">Typical projects</h3>
                <ul className="bullets">{k.projects.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section id="ai" style={{ borderTop: '1px solid var(--frost-line)' }}>
        <div className="wrap split" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <h2 className="h2-sm aside">Thinking about AI?</h2>
          <p className="p-lg main" style={{ display: 'block' }}>{ai}</p>
        </div>
      </section>

      <section id="not-here" className="band">
        <div className="wrap grid-2" style={{ paddingTop: 72, paddingBottom: 88, gap: '40px 64px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 className="h3">What is not here</h2>
            <p className="p">{servicesPage.notHere}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 className="h3">Paying</h2>
            <p className="p">{servicesPage.paying} <span style={{ color: 'var(--ink-3)' }}>{servicesPage.payingNote}</span></p>
            <Link href="/contact/" className="btn btn-accent" style={{ alignSelf: 'flex-start', marginTop: 8 }}>Get in touch</Link>
          </div>
        </div>
      </section>

      <Foot />
    </main>
  );
}
