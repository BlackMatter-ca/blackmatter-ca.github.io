import Link from 'next/link';
import { Backdrop, Top, Foot } from '../Chrome';
import { site, contact, terms } from '../site';

export const metadata = { title: 'Contact · BlackMatter' };

export default function Contact() {
  return (
    <main className="page">
      <Backdrop />
      <Top current="/contact/" />

      <section className="wrap split" style={{ paddingTop: 96, paddingBottom: 96, gap: '56px 80px' }}>
        <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p className="eyebrow">Contact</p>
          <h1 className="h1">Email is best.</h1>
          <a href={`mailto:${site.email}`} className="link" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', alignSelf: 'flex-start' }}>{site.email}</a>
          <p className="p-lg">{contact.reply}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 24, borderTop: '1px solid var(--rule-soft)' }}>
            <h2 className="eyebrow">What helps me reply well</h2>
            <ul className="bullets">{contact.helps.map((h) => <li key={h}>{h}</li>)}</ul>
            <p className="p-sm">{contact.brief} <Link href="/readiness-check/" className="link-quiet" style={{ minHeight: 0, fontSize: 15 }}>Run it here.</Link></p>
          </div>
        </div>

        {/* The form posts by mail until a form handler exists; every field name matches the copy's list. */}
        <form className="frost form" style={{ flex: '1 1 420px', minWidth: 0, maxWidth: 560 }} action={`mailto:${site.email}`} method="post" encType="text/plain">
          <div className="row">
            <div className="stack"><label htmlFor="c-name">Name</label><input id="c-name" name="name" type="text" className="field" autoComplete="name" /></div>
            <div className="stack"><label htmlFor="c-org">Organisation</label><input id="c-org" name="organisation" type="text" className="field" autoComplete="organization" /></div>
          </div>
          <div className="stack"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" className="field" autoComplete="email" /></div>
          <div className="stack"><label htmlFor="c-msg">What’s going on?</label><textarea id="c-msg" name="message" className="field" placeholder="In your own words." /></div>
          <div className="stack"><label htmlFor="c-size">Size: staff / devices / sites <small>(optional)</small></label><input id="c-size" name="size" type="text" className="field" placeholder="e.g. 40 staff, 55 devices, 2 sites" /></div>
          <div className="stack"><label htmlFor="c-brief">Readiness check brief <small>(optional attachment)</small></label><input id="c-brief" name="brief" type="file" className="field" style={{ paddingTop: 12 }} /></div>
          <button type="submit" className="btn btn-accent" style={{ alignSelf: 'flex-start' }}>Send</button>
          <p className="p-sm" style={{ color: 'var(--ink-3)', fontSize: 13 }}>Goes to {site.email}. Nothing else is collected.</p>
        </form>
      </section>

      <section className="band">
        <div className="wrap grid-2" style={{ paddingTop: 72, paddingBottom: 72, gap: '40px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 className="h3" style={{ fontSize: 18 }}>Where</h2>
            <p className="p">{contact.where}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 className="h3" style={{ fontSize: 18 }}>If you are not sure I am the right person</h2>
            <p className="p">{contact.unsure}</p>
          </div>
        </div>
      </section>

      <section className="wrap split" style={{ paddingTop: 72, paddingBottom: 96, gap: '24px 80px' }}>
        <h2 className="eyebrow label-col" style={{ fontSize: 13 }}>Plain terms, again</h2>
        <p className="p body-col" style={{ display: 'block' }}>{terms.short} If something is down right now, I am the wrong call. If you want a piece of work planned, built properly and left in your own hands, write.</p>
      </section>

      <Foot />
    </main>
  );
}
