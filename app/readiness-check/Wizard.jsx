'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CONFIG, FLAGS, DIMS, EXCLUSIVE, isPub, isIndig } from './data';
import { evaluate, visibleSteps, visibleQs, visibleOpts, fx, hasProductWord, sevLabel, VERDICTS, nextStep, VENDOR_QUESTIONS, buildBrief, slug, dimExplain, DIM_ADVICE, briefData } from './engine';
import PrintBrief from './PrintBrief';

const KEY = 'prc.answers.v3';
const STEP_KEY = 'prc.step.v3';

function load(k, fallback) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fallback; } catch { return fallback; } }
function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }

export default function Wizard() {
  const [answers, setAnswers] = useState({});
  const [stepIdx, setStepIdx] = useState(-1);
  const [ready, setReady] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    setAnswers(load(KEY, {}));
    setReady(true);
  }, []);

  useEffect(() => { if (ready) store(KEY, answers); }, [answers, ready]);

  const steps = useMemo(() => visibleSteps(answers), [answers]);
  const resumeAt = () => { const s = load(STEP_KEY, 0); return Math.min(typeof s === 'number' ? s : 0, Math.max(steps.length - 1, 0)); };

  function go(i) {
    const n = Math.max(-1, Math.min(i, steps.length));
    setStepIdx(n);
    if (n >= 0 && n < steps.length) store(STEP_KEY, n);
    requestAnimationFrame(() => {
      const el = topRef.current; if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: Math.max(0, y), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }
  function reset() {
    if (!confirm('Clear all saved answers?')) return;
    setAnswers({}); store(STEP_KEY, 0); go(0);
  }
  function set(id, value) { setAnswers((a) => ({ ...a, [id]: value })); }

  if (!ready) return <div ref={topRef} className="rc" aria-busy="true" />;

  return (
    <div ref={topRef} className="rc">
      {stepIdx < 0 && <Intro answers={answers} onStart={() => go(Object.keys(answers).length ? resumeAt() : 0)} onReset={reset} />}
      {stepIdx >= 0 && stepIdx < steps.length && (
        <StepView steps={steps} idx={stepIdx} answers={answers} set={set} onBack={() => go(stepIdx - 1)} onNext={() => go(stepIdx + 1)} />
      )}
      {stepIdx >= steps.length && <Results answers={answers} set={set} steps={steps} onBack={() => go(steps.length - 1)} onReset={reset} />}
    </div>
  );
}

/* ---------- intro ---------- */
function Intro({ answers, onStart, onReset }) {
  const resume = Object.keys(answers).length > 0;
  return (
    <div className="rc-grid rc-enter">
      <div className="rc-rail">
        <p className="eyebrow">Before you start</p>
        <p className="p" style={{ marginTop: 12 }}>Useful to have in mind: a rough budget figure, who has to approve it, and when it needs to be done. Guesses are fine. “Not sure” is an honest answer and the check treats it as one.</p>
      </div>
      <div className="frost rc-panel">
        <div className="rc-block">
          <h2 className="h3">What you get</h2>
          <ul className="bullets">
            <li><span>The three things to settle <em>before</em> you spend money, each with the reason, plus anything else worth knowing.</span></li>
            <li><span>A one-page brief you can hand to your board, council, boss, or any consultant or vendor, plus the questions to ask them.</span></li>
          </ul>
        </div>
        <div className="rc-block">
          <h2 className="h3">What it is not</h2>
          <p className="p">Not a quote, not legal or privacy advice. Nothing you type leaves your browser unless you choose to send it at the end.</p>
        </div>
        <div className="rc-nav">
          <span className="rc-saved">{resume ? 'Your earlier answers are still here.' : 'Answers stay in this browser.'}</span>
          <div className="rc-actions">
            {resume && <button type="button" className="btn btn-quiet btn-sm" onClick={onReset}>Start over</button>}
            <button type="button" className="btn btn-accent" onClick={onStart}>{resume ? 'Continue where I left off' : 'Start the check'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- questions ---------- */
function StepView({ steps, idx, answers, set, onBack, onNext }) {
  const step = steps[idx];
  const last = idx === steps.length - 1;
  return (
    <div className="rc-grid">
      <aside className="rc-rail" aria-label="Progress">
        <p className="eyebrow">Step {idx + 1} of {steps.length}</p>
        <ol className="rc-steps">
          {steps.map((s, i) => (
            <li key={s.id} className={i < idx ? 'done' : i === idx ? 'cur' : ''} aria-current={i === idx ? 'step' : undefined}>
              <span className="rc-step-n">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.title}</span>
            </li>
          ))}
        </ol>
        <div className="rc-progress" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={idx} aria-label="Steps completed">
          <i style={{ width: `${(idx / steps.length) * 100}%` }} />
        </div>
      </aside>

      <div className="frost rc-panel rc-enter" key={step.id}>
        <header className="rc-head">
          <h2 className="h2-sm">{step.title}</h2>
          {step.intro && <p className="p">{step.intro}</p>}
        </header>
        {visibleQs(step, answers).map((q) => <Question key={q.id} q={q} answers={answers} set={set} />)}
        <div className="rc-nav">
          <button type="button" className="btn btn-quiet btn-sm" onClick={onBack}>Back</button>
          <div className="rc-actions">
            <span className="rc-saved">Saved in this browser only.</span>
            <button type="button" className="btn btn-accent" onClick={onNext}>{last ? 'See my results' : 'Continue'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Question({ q, answers, set }) {
  const v = answers[q.id];
  const why = q.why ? fx(q.why, answers) : null;
  const showTip = q.productCheck && hasProductWord(v);

  function pick(o) {
    if (q.type === 'single') { set(q.id, o.v); return; }
    let cur = new Set(v || []);
    if (cur.has(o.v)) cur.delete(o.v);
    else if (EXCLUSIVE.has(o.v) && q.id !== 'types') cur = new Set([o.v]);
    else { if (q.id !== 'types') EXCLUSIVE.forEach((x) => cur.delete(x)); cur.add(o.v); }
    set(q.id, [...cur]);
  }

  const choice = q.type === 'single' || q.type === 'multi';
  return (
    <fieldset className="rc-q">
      <legend className="rc-label">{q.label}</legend>
      {q.help && <p className="rc-help">{q.help}</p>}
      {why && <p className="rc-why">{why}</p>}
      {choice && (
        <div className="rc-opts">
          {visibleOpts(q, answers).map((o) => {
            const sel = q.type === 'single' ? v === o.v : (v || []).includes(o.v);
            return (
              <label key={o.v} className={`rc-opt${sel ? ' sel' : ''}`}>
                <input type={q.type === 'single' ? 'radio' : 'checkbox'} name={q.id} value={o.v} checked={!!sel} onChange={() => pick(o)} />
                <span className="rc-mark" aria-hidden="true" />
                <span>{o.l}</span>
              </label>
            );
          })}
          {q.type === 'multi' && !/apply/i.test(q.help || '') && <p className="rc-help" style={{ marginTop: 4 }}>Choose all that apply.</p>}
        </div>
      )}
      {q.type === 'textarea' && (
        <>
          <textarea id={`f_${q.id}`} className="field" value={v || ''} onChange={(e) => set(q.id, e.target.value)} rows={5} />
          {showTip && <p className="callout rc-tip">You have named a product. That is fine; it goes in the brief as your preference. Make sure the sentence also says what people need to <em>do</em>.</p>}
        </>
      )}
      {q.type === 'text' && <input id={`f_${q.id}`} type="text" className="field" value={v || ''} onChange={(e) => set(q.id, e.target.value)} />}
    </fieldset>
  );
}

/* ---------- results ---------- */
function Results({ answers, set, steps, onBack, onReset }) {
  const r = useMemo(() => evaluate(answers), [answers]);
  const brief = useMemo(() => buildBrief(r, answers), [r, answers]);
  const B = useMemo(() => briefData(r, answers), [r, answers]);
  const V = VERDICTS[r.verdict];
  const [grown, setGrown] = useState(false);
  const [openDim, setOpenDim] = useState(null);
  const [status, setStatus] = useState('');
  useEffect(() => { const t = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true))); return () => cancelAnimationFrame(t); }, []);
  useEffect(() => { if (!status) return; const t = setTimeout(() => setStatus(''), 5000); return () => clearTimeout(t); }, [status]);

  async function copy() { try { await navigator.clipboard.writeText(brief); setStatus('Copied.'); } catch { setStatus('Select the text and copy it manually.'); } }
  function download() {
    const b = new Blob([brief], { type: 'text/markdown' }); const a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = (slug(answers.orgName) || 'project') + '-brief.md'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  async function send() {
    if (!CONFIG.contactEmail) { setStatus('Download the brief and email it to us.'); return; }
    let body = brief; const cap = 1800;
    if (body.length > cap) { try { await navigator.clipboard.writeText(brief); } catch { /* ignore */ } body = brief.split('\n---')[0] + '\n\n(The full brief was copied to your clipboard — paste it below, or attach the downloaded file.)\n'; }
    const subj = encodeURIComponent(`Project brief${answers.orgName ? ': ' + answers.orgName : ''}`);
    window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subj}&body=${encodeURIComponent(body.slice(0, cap))}`;
    setStatus('Your email app should open with page one. The full brief is on your clipboard.');
  }

  const tender = isPub(answers) || isIndig(answers);
  return (
    <div className="rc-results rc-enter">
      <section className={`rc-verdict ${r.verdict}`}>
        <p className="eyebrow">Your readiness picture</p>
        <h2 className="h1">{V.t}</h2>
        <p className="p-lg measure">{fx(V.d, r)}</p>
      </section>

      <section className="frost rc-panel">
        <div className="rc-dims">
          {Object.keys(DIMS).map((k, i) => {
            const s = r.scores[k]; if (s === null) return null;
            return <DimRow key={k} k={k} s={s} i={i} r={r} answers={answers} grown={grown} open={openDim === k} onToggle={() => setOpenDim(openDim === k ? null : k)} />;
          })}
          <div className="rc-dim rc-dim-total">
            <div className="rc-dim-l"><span>Overall</span><b>{r.overall}%</b></div>
            <div className="rc-bar"><i className={r.verdict} style={{ width: grown ? `${r.overall}%` : 0, transitionDelay: '520ms' }} /></div>
          </div>
        </div>
        <p className="rc-help">Each percentage compares your answers in that area with a fully prepared organisation; 0% means every answer there was a gap or “not sure”. Areas with too few questions on your path are not shown. Hover a score for why; click it for what would move it.</p>
      </section>

      <section className="rc-block">
        <h3 className="h2-sm">Start here</h3>
        {!r.flags.length && <p className="p">Nothing flagged. That is unusual. Worth checking you were not being generous with yourself.</p>}
        <ol className="rc-flags">{r.top.map((f, i) => <Flag key={f.id} f={f} n={i + 1} answers={answers} />)}</ol>
        {r.rest.length > 0 && (
          <details className="rc-more">
            <summary className="btn btn-quiet btn-sm">Also worth knowing ({r.rest.length})</summary>
            <ol className="rc-flags" style={{ marginTop: 20 }}>{r.rest.map((f) => <Flag key={f.id} f={f} answers={answers} />)}</ol>
            {r.noted.length > 0 && <p className="rc-help" style={{ marginTop: 16 }}>Also noted: {r.noted.map((f) => fx(FLAGS[f.id].t, answers)).join('; ')}.</p>}
          </details>
        )}
      </section>

      <section className="rc-two">
        <div className="frost-deep rc-panel">
          <h3 className="h3">What to do next</h3>
          <p className="p" style={{ color: 'inherit' }}>{nextStep(r, answers)}</p>
        </div>
        <div className="frost rc-panel">
          <h3 className="h3">Questions to ask any consultant or vendor</h3>
          <ul className="bullets" style={{ fontSize: 15 }}>{VENDOR_QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      </section>

      <section className="rc-block" id="brief">
        <div className="rc-brief-head">
          <div>
            <h3 className="h2-sm">Your brief</h3>
            <p className="rc-help">Page one is the summary; the full answers follow. Copy it, download it, print it, or send it. It is yours.</p>
          </div>
          <div className="rc-actions rc-noprint">
            <button type="button" className="btn btn-quiet btn-sm" onClick={copy}>Copy</button>
            <button type="button" className="btn btn-quiet btn-sm" onClick={download}>Download .md</button>
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => window.print()}>Print / PDF</button>
          </div>
        </div>
        <pre className="rc-pre">{brief}</pre>
      </section>

      <section className="frost rc-panel rc-noprint">
        <h3 className="h3">Want a second pair of eyes?</h3>
        <p className="p">If you would like {CONFIG.consultantName} to read this and say what we would clarify first, send it over. No obligation, and I will say if I am not the right fit.{tender ? ' If this work will go to tender, keep the brief for your procurement file rather than sending it to any one vendor.' : ''}</p>
        <div className="rc-send">
          <input className="field" placeholder="Organisation name" value={answers.orgName || ''} onChange={(e) => set('orgName', e.target.value)} aria-label="Organisation name" />
          <input className="field" placeholder="Your name" value={answers.contactName || ''} onChange={(e) => set('contactName', e.target.value)} aria-label="Your name" />
          <input className="field" placeholder="Your role" value={answers.contactRole || ''} onChange={(e) => set('contactRole', e.target.value)} aria-label="Your role" />
          <input className="field" type="email" placeholder="Email" value={answers.contactEmail || ''} onChange={(e) => set('contactEmail', e.target.value)} aria-label="Email" />
        </div>
        <div className="rc-actions">
          <button type="button" className="btn btn-accent" onClick={send}>Send my brief to {CONFIG.consultantName}</button>
          {CONFIG.bookingUrl && <Link href={CONFIG.bookingUrl} className="btn btn-quiet">Contact page</Link>}
        </div>
        <p className="rc-help" role="status" aria-live="polite" style={{ minHeight: 20 }}>{status}</p>
      </section>

      <PrintBrief B={B} />
      <div className="rc-nav rc-noprint">
        <button type="button" className="btn btn-quiet btn-sm" onClick={onBack}>Back to the questions</button>
        <button type="button" className="btn btn-quiet btn-sm" onClick={onReset}>Start over</button>
      </div>
    </div>
  );
}

function Flag({ f, n, answers }) {
  const F = FLAGS[f.id];
  return (
    <li className={`rc-flag ${f.s}`}>
      <div className="rc-flag-top">
        {n !== undefined && <span className="rc-flag-n">{n}</span>}
        <span className={`rc-sev ${f.s}`}>{sevLabel(f.s)}</span>
      </div>
      <h4 className="rc-flag-t">{fx(F.t, answers)}</h4>
      <p className="rc-flag-w">{fx(F.w, answers)}</p>
      <p className="rc-flag-d">{fx(F.d, answers)}</p>
    </li>
  );
}

function DimRow({ k, s, i, r, answers, grown, open, onToggle }) {
  const tone = s >= 75 ? 'ok' : s >= 50 ? 'warn' : 'bad';
  const e = dimExplain(r, k, answers);
  const advice = DIM_ADVICE[k];
  const id = `dim-${k}`;
  return (
    <div className={`rc-dim rc-dim-x${open ? ' open' : ''}`}>
      <button type="button" className="rc-dim-btn" aria-expanded={open} aria-controls={id} aria-describedby={`${id}-tip`} onClick={onToggle}>
        <div className="rc-dim-l"><span>{DIMS[k]}</span><b>{s}%</b></div>
        <div className="rc-bar"><i className={tone} style={{ width: grown ? `${s}%` : 0, transitionDelay: `${i * 70}ms` }} /></div>
        <span className="rc-tipbox" role="tooltip" id={`${id}-tip`}>
          <span>{e.brief}</span>
          <span className="rc-tip-more">{open ? 'Click to close' : 'Click for what would move it'}</span>
        </span>
      </button>
      <div className="rc-dim-detail" id={id} hidden={!open}>
        <div className="rc-dim-cols">
          <div>
            <p className="rc-dim-k">Why {s}%</p>
            <p className="rc-dim-legend"><span><i className="rc-dim-dot" style={{ background: 'var(--accent)' }} /> full marks</span><span><i className="rc-dim-dot" style={{ background: 'var(--ink-3)' }} /> part-way</span><span><i className="rc-dim-dot gap" /> gap or not sure</span></p>
            <ul className="rc-dim-rows">
              {e.rows.map((x) => (
                <li key={x.q} className={x.pts === 0 ? 'gap' : x.pts < x.max ? 'part' : 'full'}>
                  <span className="rc-dim-dot" aria-hidden="true" />
                  <span><span className="rc-dim-q">{x.label}:</span> {x.answer}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rc-dim-k">What would move it</p>
            <p className="rc-dim-line">{s === 100 ? 'Nothing here is holding you back. Keep it written down so it survives a change of people.' : advice.line}</p>
            <ul className="rc-dim-rows plain">
              {e.fixes.map((f) => <li key={f}><span className="rc-dim-dot fix" aria-hidden="true" /><span>{f}</span></li>)}
              {s < 100 && advice.more.map((m) => <li key={m}><span className="rc-dim-dot fix" aria-hidden="true" /><span>{m}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
