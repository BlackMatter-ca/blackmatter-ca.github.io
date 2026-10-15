import Link from 'next/link';
import Dust from './Dust';
import { Top, Strip } from './Chrome';
import { site, services } from './site';

export default function Home() {
  return (
    <main className="stage">
      <Top current="/" />
      <div className="stone-field" aria-hidden="true">
        <img className="stone" src="/logos/blackmatter-stone-berry.svg" alt="" />
      </div>
      <section className="mark-block">
        <Dust>
          <img className="wordmark" src="/logos/blackmatter-logo-dark.svg" alt="BlackMatter" />
        </Dust>
        <p className="line display-lg">{site.line}</p>
        <p className="lede body">Two decades of mission-critical systems work in the North, now available to organizations that need infrastructure, security and automation done properly.</p>
        <ul className="services-list label">
          {services.map((s) => <li key={s.title}><Link href="/services/">{s.title}</Link></li>)}
        </ul>
      </section>
      <Strip />
    </main>
  );
}
