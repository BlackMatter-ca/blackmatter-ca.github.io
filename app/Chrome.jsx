import Link from 'next/link';
import { site } from './site';

export function Top({ current }) {
  return (
    <header className="top">
      <Link href="/" className="home" aria-label="BlackMatter home">
        <img className="stone-small" src="/logos/blackmatter-stone-berry.svg" alt="" aria-hidden="true" />
      </Link>
      <nav className="nav label" aria-label="Site">
        {site.nav.map((n) => (
          <Link key={n.href} href={n.href} aria-current={current === n.href ? 'page' : undefined}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function Strip() {
  return (
    <footer className="strip label">
      <span>{site.name}</span>
      <span>Yellowknife, Northwest Territories</span>
    </footer>
  );
}
