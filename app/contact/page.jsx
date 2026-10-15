import { Top, Strip, Corner } from '../Chrome';
import { site } from '../site';

export const metadata = { title: 'Contact · BlackMatter' };

export default function Contact() {
  return (
    <main className="stage">
      <Top current="/contact/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="prose relative z-[1]">
          <h1 className="display page-title mb-8">Contact</h1>
          <p>Tell us what you need, what it has to do for the business, and when. The clearer the brief, the faster the proposal. We reply within two business days.</p>
          <p className="mt-8"><a className="display contact-link text-[clamp(22px,6.5vw,56px)]" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="mt-4 text-[var(--ink-3)]">Yellowknife, Northwest Territories, Canada</p>
        </div>
      </section>
      <Strip />
    </main>
  );
}
