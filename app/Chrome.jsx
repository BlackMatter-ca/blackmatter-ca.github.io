import Link from 'next/link';
import { site } from './site';
import { Stone } from './Marks';
import { ThemeToggle } from './Theme';

export function Top({ current }) {
  return (
    <header className="top relative z-10 flex items-center justify-between gap-4 px-4 py-4 border-b border-[var(--rule)]">
      <Link href="/" aria-label="BlackMatter home" className="block">
        <Stone className="block h-7 w-auto text-[var(--accent)]" />
      </Link>
      <nav className="nav label flex gap-6" aria-label="Site">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current === n.href ? 'page' : undefined}>{n.label}</Link>
          ))}
        </nav>
      <ThemeToggle />
    </header>
  );
}

export function Strip() {
  return (
    <footer className="label relative z-10 flex justify-between gap-4 px-4 py-3 border-t border-[var(--rule)]">
      <span className="text-[var(--accent)] before:content-[''] before:inline-block before:w-[7px] before:h-[7px] before:mr-2 before:bg-[var(--accent)] before:[clip-path:polygon(50%_0,100%_100%,0_100%)] before:align-[1px]">{site.name}</span>
      <span className="text-[var(--ink-3)] text-right">Yellowknife, Northwest Territories</span>
    </footer>
  );
}

// The stone in the corner of the inner pages, pushed into the background.
export function Corner() {
  return <Stone className="stone-corner" />;
}
