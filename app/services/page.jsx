import { Top, Strip, Corner } from '../Chrome';
import { services, scope } from '../site';

export const metadata = { title: 'Services · BlackMatter' };

// Five situations, not a sequence: no numbering. The reader scans the questions down the left
// edge for the one that is theirs; the answer sits beside it. The terms of an engagement close the page.
export default function Services() {
  return (
    <main className="stage">
      <Top current="/services/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="relative z-[1]">
          <h1 className="display page-title mb-10 md:mb-14">Services</h1>
          <ul className="ask list-none p-0">
            {services.map((s) => (
              <li key={s.title}>
                <h2 className="display q">{s.title}</h2>
                <p className="a">{s.body}</p>
              </li>
            ))}
          </ul>
          <p className="lede mt-10 md:mt-14">{scope}</p>
        </div>
      </section>
      <Strip />
    </main>
  );
}
