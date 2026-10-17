import Link from 'next/link';
import Dust from './Dust';
import { Top, Strip } from './Chrome';
import { Wordmark, Stone } from './Marks';
import { services, lede } from './site';

export default function Home() {
  return (
    <main className="stage">
      <Top current="/" />
      <section className="relative px-4 pt-10 pb-16 md:pt-14">
        <Stone className="stone-watermark" />
        <div className="relative z-[1]">
          <div className="max-w-[640px]">
            <Dust><Wordmark className="wordmark" /></Dust>
          </div>
          <h1 className="display headline mt-12 md:mt-16">Infrastructure. Security. <em>Automation.</em></h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12 md:items-end">
            <p className="lede">{lede}</p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/contact/" className="btn btn-accent">Request a proposal</Link>
              <Link href="/services/" className="btn btn-quiet">Services</Link>
            </div>
          </div>
          {/* The five questions from the Services page, one ruled row each. Not a sequence, so no numbers. */}
          <ul className="ledger ask-list mt-14 list-none p-0">
            {services.map((s) => (
              <li key={s.title}>
                <span className="t"><Link href="/services/">{s.title}</Link></span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Strip />
    </main>
  );
}
