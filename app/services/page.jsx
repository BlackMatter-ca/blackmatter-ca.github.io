import { Top, Strip } from '../Chrome';
import { services } from '../site';

export const metadata = { title: 'Services · BlackMatter' };

export default function Services() {
  return (
    <main className="stage">
      <Top current="/services/" />
      <section className="page page-wide">
        <h1 className="display-lg">Services</h1>
        <p className="body lede">Engagements are scoped to the problem in front of you: an assessment, a build, a migration, or a standing advisory role. Every one ends with documentation your own team can run.</p>
        <ol className="service-grid">
          {services.map((s, i) => (
            <li key={s.title}>
              <span className="label num">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="heading">{s.title}</h2>
              <p className="body">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <Strip />
    </main>
  );
}
