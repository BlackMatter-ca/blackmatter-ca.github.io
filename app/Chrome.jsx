import Link from 'next/link';
import { site } from './site';
import { Wordmark, Stone } from './Marks';
import { ThemeToggle } from './Theme';

// The fixed layers every page sits on: the stone texture fading in from the top, and the stone itself,
// pinned so the page scrolls over both.
export function Backdrop() {
  return (
    <>
      <div className="backdrop-texture" aria-hidden="true" />
      <Stone className="backdrop-stone" />
    </>
  );
}

export function Top({ current }) {
  return (
    <header className="top">
      <nav className="wrap top-nav" aria-label="Primary">
        <Link href="/" aria-label="BlackMatter home" className="top-mark"><Wordmark className="top-wordmark" /></Link>
        <div className="top-links">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current === n.href ? 'page' : undefined}>{n.label}</Link>
          ))}
          <Link href={site.cta.href} className="btn btn-accent btn-sm">{site.cta.label}</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function Foot() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <Wordmark className="foot-wordmark" />
        <div className="foot-links">
          {site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <p className="foot-note">© {new Date().getFullYear()} {site.name} · {site.place}</p>
      </div>
    </footer>
  );
}

// The closing band shared by every page: email first, limits stated.
export function ContactBand({ children }) {
  return (
    <section id="contact" className="band band-tint">
      <div className="wrap band-row">
        <div className="band-copy">
          <h2 className="h2">Email is best.</h2>
          <p className="p-lg">{children}</p>
        </div>
        <div className="band-actions">
          <a href={`mailto:${site.email}`} className="btn btn-accent">{site.email}</a>
          <Link href="/contact/" className="link-quiet">What helps me reply well</Link>
        </div>
      </div>
    </section>
  );
}
