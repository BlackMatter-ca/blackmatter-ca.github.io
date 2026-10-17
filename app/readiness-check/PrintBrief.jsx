'use client';

import { createPortal } from 'react-dom';
import { Wordmark } from '../Marks';
import { site } from '../site';
import { CONFIG } from './data';

// The brief laid out for US Letter. Lives at the end of <body> and is only visible when printing.
export default function PrintBrief({ B }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="pb" aria-hidden="true">
      <header className="pb-head">
        <Wordmark className="pb-logo" />
        <div className="pb-head-r">
          <div className="pb-kicker">{CONFIG.title}</div>
          <div className="pb-meta">{B.date}</div>
        </div>
      </header>

      <section className="pb-title">
        <div><h1>Project brief</h1>{B.orgName && <p className="pb-org">{B.orgName}</p>}</div>
        <div className="pb-verdict">
          <span className="pb-verdict-t">{B.verdict}</span>
          <span className="pb-verdict-n">{B.overall}%</span>
        </div>
      </section>

      <section className="pb-scores">
        {B.scores.map(([name, s]) => (
          <div className="pb-score" key={name}>
            <div className="pb-score-l"><span>{name}</span><b>{s}%</b></div>
            <div className="pb-bar"><i style={{ width: `${s}%` }} /></div>
          </div>
        ))}
      </section>

      <section className="pb-sec">
        <h2>Page one</h2>
        <dl className="pb-dl">
          {B.pageOne.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>

      <section className="pb-sec">
        <h2>Settle first</h2>
        {B.settle.length === 0 && <p>Nothing flagged.</p>}
        <ol className="pb-settle">
          {B.settle.map((f, i) => (
            <li key={f.t}>
              <span className="pb-n">{i + 1}</span>
              <div><b>{f.t}</b><p>{f.d}</p></div>
            </li>
          ))}
        </ol>
        {B.also.length > 0 && <p className="pb-also"><b>Also worth knowing:</b> {B.also.join('; ')}{B.alsoMore ? `; and ${B.alsoMore} more in the full results` : ''}.</p>}
      </section>

      <section className="pb-sec pb-break">
        <h2>Full answers</h2>
        {B.steps.map((s) => (
          <div className="pb-step" key={s.title}>
            <h3>{s.title}</h3>
            <dl className="pb-dl pb-dl-tight">
              {s.rows.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}
            </dl>
          </div>
        ))}
        {B.contact.length > 0 && (
          <div className="pb-step"><h3>Contact</h3><p>{B.contact.join(' · ')}</p></div>
        )}
      </section>

      <footer className="pb-foot">
        <p>{B.footer}</p>
        <p className="pb-foot-l">{site.name} · {site.place} · {site.email}</p>
      </footer>
    </div>,
    document.body,
  );
}
