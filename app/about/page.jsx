import Link from 'next/link';
import { Backdrop, Top, Foot } from '../Chrome';
import { about } from '../site';

export const metadata = { title: 'About · BlackMatter' };

export default function About() {
  return (
    <main className="page">
      <Backdrop />
      <Top current="/about/" />

      <section className="wrap split" style={{ paddingTop: 96, paddingBottom: 96, gap: '40px 80px' }}>
        <div className="label-col" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p className="eyebrow">About</p>
          <h1 className="h1">BlackMatter is me.</h1>
          <p className="p-lg">{about.who}</p>
          <div className="placeholder"><span className="eyebrow">[Photo]</span></div>
        </div>
        <div className="body-col" style={{ gap: 24 }}>
          <p className="p-lg" style={{ color: 'var(--ink)' }}>{about.story[0]}</p>
          <p className="p-lg">{about.story[1]}</p>
        </div>
      </section>


      <section className="band">
        <div className="wrap split" style={{ paddingTop: 80, paddingBottom: 80, gap: '32px 80px' }}>
          <h2 className="h2-sm label-col">Why a consultancy</h2>
          <p className="p-lg body-col" style={{ color: 'var(--ink)', display: 'block' }}>{about.why}</p>
        </div>
      </section>

      <section className="wrap split" style={{ paddingTop: 96, paddingBottom: 96, gap: '40px 80px' }}>
        <h2 className="h2-sm label-col">How I work</h2>
        <ul className="hairlist" style={{ flex: '1 1 520px', minWidth: 0 }}>
          {about.how.map((h) => (
            <li key={h.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h3 className="h3" style={{ fontSize: 16 }}>{h.title}</h3>
              <p className="p-sm">{h.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap grid-2" style={{ paddingBottom: 96, gap: 20 }}>
        <div className="frost card">
          <h2 className="h3" style={{ fontSize: 18 }}>What I am not</h2>
          <p className="p-sm">{about.not}</p>
        </div>
        <div className="frost card">
          <h2 className="h3" style={{ fontSize: 18 }}>Credentials, plainly</h2>
          <p className="p-sm">{about.credentials}</p>
        </div>
      </section>

      <section className="band band-tint">
        <div className="wrap band-row" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="h2">Want to talk about a piece of work?</h2>
          <Link href="/contact/" className="btn btn-accent">Contact</Link>
        </div>
      </section>

      <Foot />
    </main>
  );
}
