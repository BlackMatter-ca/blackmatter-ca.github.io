import { Top, Strip } from '../Chrome';
import { site } from '../site';

export const metadata = { title: 'Contact · BlackMatter' };

export default function Contact() {
  return (
    <main className="stage">
      <Top current="/contact/" />
      <section className="page">
        <div className="page-text">
          <h1 className="display-lg">Contact</h1>
          <p className="body">Tell us what you are working on and what is in the way. We reply within two business days.</p>
          <p className="contact-line"><a className="display-lg" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="body meta-line">Yellowknife, Northwest Territories, Canada</p>
        </div>
        <div className="page-stone" aria-hidden="true">
          <img src="/logos/blackmatter-stone-berry.svg" alt="" />
        </div>
      </section>
      <Strip />
    </main>
  );
}
