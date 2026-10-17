// Scoring, flag ranking and brief text for the Project Readiness Check.
// Logic ported from the standalone wizard (v3); answers are passed in rather than read from a global.

import { CONFIG, FLAGS, DIMS, TYPES, STEPS, PRODUCT_WORDS, isPub, isIndig, isBiz, tiny } from './data';

export const fx = (x, a) => (typeof x === 'function' ? x(a) : x);

export function visibleSteps(a) { return STEPS.filter((s) => !s.showIf || s.showIf(a)); }
export function visibleQs(step, a) { return step.questions.filter((q) => !q.showIf || q.showIf(a)); }
export function visibleOpts(q, a) { return (q.options || []).filter((o) => !o.showIf || o.showIf(a)); }

export function hasProductWord(text) {
  const low = (text || '').toLowerCase();
  return PRODUCT_WORDS.some((w) => low.includes(w));
}

export function evaluate(answers) {
  const dims = {}; for (const k in DIMS) dims[k] = { pts: 0, max: 0 };
  const flags = new Map();
  let unsure = 0;
  const fire = (id, q, sure) => { const cur = flags.get(id); if (!cur) flags.set(id, { sure, q }); else if (sure) cur.sure = true; };
  for (const step of visibleSteps(answers)) for (const q of visibleQs(step, answers)) {
    const v = answers[q.id];
    if (q.type === 'single' || q.type === 'multi') {
      const chosen = q.type === 'single' ? (v ? [v] : []) : (v || []); if (!chosen.length) continue;
      let pts = 0; const max = 2;
      if (q.type === 'single') { const o = q.options.find((o) => o.v === chosen[0]); if (!o) continue; pts = o.s; if (o.unsure) unsure++; if (o.flag) fire(o.flag, q.id, !o.unsure || !!o.sureFlag); }
      else {
        const sel = q.options.filter((o) => chosen.includes(o.v)); sel.forEach((o) => { if (o.unsure) unsure++; if (o.flag) fire(o.flag, q.id, !o.unsure); });
        if (q.id === 'lines') { const avail = visibleOpts(q, answers).filter((o) => !['none', 'unsure', 'na'].includes(o.v)).length; const n = sel.filter((o) => !['none', 'unsure', 'na'].includes(o.v)).length; const need = Math.min(3, avail); pts = sel.some((o) => o.v === 'na') ? 2 : n >= need ? 2 : n >= 1 ? 1 : 0; if (n > 0 && n < need) fire('SOFTWARE_ONLY_BUDGET', q.id, true); }
        else if (q.id === 'pubChecks') { const n = sel.filter((o) => o.v !== 'none').length; pts = n >= 4 ? 2 : n >= 2 ? 1 : 0; if (n > 0 && n < 4) fire('PUBLIC_RULES', q.id, true); }
        else if (q.id === 'types') { pts = 2; }
        else pts = Math.min(...sel.map((o) => o.s));
      }
      if (q.dim) { dims[q.dim].pts += pts; dims[q.dim].max += max; }
    } else if (q.type === 'textarea' && q.emptyFlag) {
      const t = (v || '').trim(); dims[q.dim].max += 4;
      if (t.length < 25 || /can't say|cannot say|not sure what done|don't know what done|no idea what done/i.test(t)) fire(q.emptyFlag, q.id, true);
      else dims[q.dim].pts += (/\d/.test(t) ? 4 : 3);
    }
  }
  const low = (answers.problem || '').toLowerCase();
  if (low.length < 160 && PRODUCT_WORDS.some((w) => new RegExp('(need|want|get|buy|move to|switch to|go to|implement)\\s+(a |an |the |onto |to )?' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(low))) fire('PRODUCT_FIRST', 'problem', true);

  const scores = {}; for (const k in dims) scores[k] = dims[k].max >= 4 ? Math.round(100 * dims[k].pts / dims[k].max) : null;
  const vals = Object.values(scores).filter((x) => x !== null);
  const overall = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  if (unsure >= 4) fire('MANY_UNSURE', '', true);
  if (isPub(answers) && (answers.pubChecks || []).includes('pia')) flags.delete('SENSITIVE_DATA');
  {
    const T = answers.types || []; const onlyEG = T.length && T.every((t) => ['E', 'G'].includes(t));
    if (onlyEG) flags.delete('SENSITIVE_DATA');
    if (flags.has('INSURANCE_DEADLINE')) flags.delete('DEADLINE_SOON');
    if (flags.has('DEADLINE_SOON') && answers.funding === 'grant') flags.delete('GRANT_FUNDED');
    if (T.includes('D') && flags.has('OVERSHARING') && flags.has('SENSITIVE_DATA') && !(answers.personal || []).some((v) => ['health', 'id'].includes(v))) flags.delete('SENSITIVE_DATA');
    if (T.length && T.every((t) => t === 'B') && answers.after !== 'nobody') flags.delete('NO_AFTER_OWNER');
    if (answers.funding === 'expected') fire('MONEY_NOT_APPROVED', 'funding', true);
    if (answers.funding === 'capital') fire('BUSINESS_CASE', 'funding', true);
    if (isPub(answers) && flags.has('PUBLIC_RULES') && !(answers.pubChecks || []).includes('pia')) flags.delete('SENSITIVE_DATA');
    if (T.includes('D') && flags.has('OVERSHARING') && !isPub(answers)) flags.delete('SENSITIVE_DATA');
    if (T.includes('H') && flags.has('PDF_REMEDIATION')) flags.delete('RETENTION');
    if (answers.data === 'departed') fire('DEPARTED_DEVICES', 'data', true);
    if (answers.a1 === 'unsure' && tiny(answers)) { const m = flags.get('KEYS'); if (m) m.sure = true; }
  }
  if (answers.i1 === 'many') { flags.delete('DATA_GOV_AGREEMENT'); flags.delete('DATA_GOV_POSSESSION'); }
  if ((answers.b2 || []).includes('never')) { flags.delete('UNTESTED_BACKUP'); fire('NO_BACKUP', 'b2', true); }
  const order = { high: 0, med: 1, check: 2, info: 3 };
  const list = [...flags.entries()].filter(([k]) => FLAGS[k]).map(([k, m]) => {
    let s = FLAGS[k].s, p = FLAGS[k].p; if (!m.sure && s !== 'info') s = 'check';
    const adj = adjust(k, answers, m.sure); if (adj) { if (adj.s && s !== 'check') s = adj.s; if (adj.p !== undefined) p = adj.p; }
    return { id: k, s, p };
  }).sort((a, b) => order[a.s] - order[b.s] || a.p - b.p);
  const high = list.filter((f) => f.s === 'high').length;
  let verdict = overall >= 75 ? 'ok' : overall >= 50 ? 'warn' : 'bad';
  if (high >= 4) verdict = 'bad'; else if (high >= 2 && verdict === 'ok') verdict = 'warn';
  return { scores, overall, flags: list, high, unsure, verdict, top: list.slice(0, 3), rest: list.slice(3, 8), noted: list.slice(8) };
}

function adjust(k, a) {
  const T = a.types || []; const only = (...ts) => T.length && T.every((t) => ts.includes(t)); const has = (t) => T.includes(t);
  const soon = a.deadline === 'hard0' || a.deadline === 'hard3'; const P = a.personal || []; const hot = P.some((v) => ['health', 'id', 'financial'].includes(v));
  switch (k) {
    case 'KEYS': return has('E') ? { p: 2 } : { p: 0 };
    case 'NO_BACKUP': return { p: -1 };
    case 'DEADLINE_SOON': return { p: 0 };
    case 'INSURANCE_DEADLINE': return a.e5 === 'soon' ? { s: 'high', p: 0 } : {};
    case 'MFA_GAPS': return { p: 0.42 };
    case 'EXPOSED_RDP': return { p: 0.4 };
    case 'UNTESTED_BACKUP': return { p: 0.45 };
    case 'MONEY_NOT_APPROVED': return { p: 0.3 };
    case 'DEPARTED_DEVICES': return { p: 0 };
    case 'ACTIVE_INCIDENT': return { p: 0 };
    case 'DATA_GOV_OWNER': case 'DATA_GOV_AGREEMENT': case 'DATA_GOV_AI': return { p: 0 };
    case 'DATA_GOV_POSSESSION': return { s: 'high', p: 1 };
    case 'SERVICE_ACCOUNTS': return a.d4 === 'departed' ? { p: 0 } : {};
    case 'SENSITIVE_DATA': if (P.some((v) => ['health', 'id'].includes(v))) return { s: 'high', p: 0.5 }; if (hot || P.includes('donor') || P.includes('pay') || P.includes('corr')) return { s: 'med', p: 2 }; return { s: 'info', p: 5 };
    case 'SLOW_APPROVAL': return a.approver === 'quarterly' ? { s: 'high', p: 0.8 } : (a.deadline && a.deadline !== 'none' && a.deadline !== 'hard12') ? { s: 'high', p: 1 } : {};
    case 'NO_BUDGET': if (a.funding === 'unsure' && a.budget === 'unsure') return { s: 'med', p: 3 }; return (a.approver === 'two' || a.approver === 'quarterly') ? { p: 0.3 } : { p: 1 };
    case 'NO_ONGOING': return a.funding === 'grant' ? { p: 0.35 } : {};
    case 'GRANT_FUNDED': return soon ? { s: 'med', p: 2 } : {};
    case 'SOFTWARE_ONLY_BUDGET': return (only('E', 'G', 'D', 'F') || a.size === 's1') ? { s: 'med', p: 4 } : {};
    case 'NO_AFTER_OWNER': return only('E', 'G', 'B') ? { s: 'med', p: 4 } : {};
    case 'KEY_PERSON': return a.support === 'me' ? { s: 'med', p: 3 } : {};
    case 'DATA_UNKNOWN': case 'DIRTY_DATA': return (has('C') && !tiny(a)) ? { p: soon ? (a.c1 === 'paper' ? 0.6 : 0.45) : 1.5 } : { s: 'med', p: 4 };
    case 'EXPORT_RIGHTS': return soon ? { p: 0 } : {};
    case 'INVOLVE_IT': return { s: 'high', p: 1 };
    case 'RETENTION': return has('H') ? { s: 'high', p: 2 } : {};
    case 'ACCESSIBILITY_LAW': return (has('F') || has('H')) ? { s: 'high', p: 2 } : {};
    case 'PDF_REMEDIATION': return has('F') ? { s: 'high', p: 2 } : (has('H') && (a.h3 === 'many' || a.h3 === 'lots')) ? { s: 'high', p: 1.2 } : {};
    case 'ROOT_CAUSE': return { p: 0.2 };
    case 'NO_SAAS_BACKUP': case 'MAIL_SCOPE': return has('A') ? { s: 'high', p: 2 } : {};
    case 'OVERSHARING': return (a.orgType === 'indig' || P.includes('community')) ? { p: 3 } : {};
    case 'PUBLIC_RULES': return (!(a.pubChecks || []).includes('union') && (a.size === 's3' || a.size === 's4')) ? { s: 'high', p: 1 } : { p: 2 };
    case 'NO_SPONSOR': return a.sponsor === 'no' ? { p: 1 } : a.approver === 'unsure' ? { p: 3 } : {};
    case 'SHADOW_AI': { const d2 = [].concat(a.d2 || []); if (d2.includes('public') && a.d3 === 'neither') return { s: 'high', p: 0.9 }; if (d2.length && d2.every((x) => x === 'internal')) return { s: 'med', p: 4 }; return {}; }
    case 'AI_HIGH_RISK': { const d2 = [].concat(a.d2 || []); return (d2.includes('public') && d2.includes('people')) ? { p: 0.85 } : {}; }
    case 'VOLUNTEER_BUILD': return { s: 'high', p: 1 };
    default: return null;
  }
}

export function sevLabel(s) { return s === 'high' ? 'Settle first' : s === 'med' ? 'Worth settling' : s === 'check' ? 'Check this' : 'Good to know'; }

export const VERDICTS = {
  ok: { t: 'Ready to scope', d: 'You have enough for a consultant to give you a real answer. The items below are worth doing, but none of them should stop you.' },
  warn: { t: 'Nearly ready', d: 'A few things are worth settling first. Each one saves paid hours later.' },
  bad: { t: 'Settle these first', d: (r) => `${r.high} items need settling before money is spent. All of them are cheaper to fix now than mid-project.` },
};

export function nextStep(r, a) {
  const small = (a.budget === '<2k' || a.budget === '2-10k' || tiny(a));
  if (r.unsure >= 4) return "You answered 'not sure' a few times, so a fixed quote right now would be a guess. Ask for a short fixed-fee discovery, two to four weeks. What comes out of it is yours, whoever does the build.";
  if (small) return "At your size, start with a conversation rather than a project. Take page one of the brief to someone who has done this before and let the 'start here' items set the agenda.";
  return 'Your scope is clear enough to ask for a fixed price or a capped quote, with anything outside the brief handled as a change.';
}

export const VENDOR_QUESTIONS = [
  'What have you done for organizations our size, and can we speak to two of them? What are you weaker at?',
  "Do you earn reseller or referral income on anything you'll recommend? Will you disclose it?",
  'What do we own at the end (data, documents, configurations, code), and in what format can we export it?',
  "What's the notice period to leave, and what does handover include?",
  'Will every account you use to access our systems have MFA? Who else on your side gets access?',
  'What does "done" look like in the statement of work, and when does post-go-live support end: on a date, or when agreed criteria are met?',
  'Have you tested your proposed solution from a site with a connection like our worst one?',
];

export function slug(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function localDate() { return new Date().toLocaleDateString('en-CA'); }
function qById(qid) { for (const s of STEPS) { const q = s.questions.find((q) => q.id === qid); if (q) return q; } return null; }
function answerText(qid, a) {
  const q = qById(qid); const v = a[qid];
  if (!q || v === undefined || v === '' || (Array.isArray(v) && !v.length)) return null;
  if (q.type === 'single') { const o = q.options.find((o) => o.v === v); return o ? o.l : String(v); }
  if (q.type === 'multi') return q.options.filter((o) => v.includes(o.v)).map((o) => o.l).join('; ');
  return String(v);
}
const BRIEF_LABELS = {
  sponsor: { me: (a) => isBiz(a) || a.orgType === 'other' ? 'the owner decides alone; no separate sign-off step' : (isPub(a) || isIndig(a)) ? 'the delegated official decides' : 'the head of the organization decides; no separate sign-off step', yes: 'a named senior backer who will give it a few hours a month', council: 'council/board collectively, with a named delegate', nominal: 'a senior backer who supports it but has limited time; no delegate named yet', no: 'no senior backer yet; driven from below' },
  approver: { exec: 'an executive, within days', execboard: 'an executive up to a set limit, the board above that', monthly: 'a board/council/committee that meets monthly', two: 'a monthly board/council, decisions usually take two meetings', quarterly: 'a board/council/committee that meets quarterly or less', unsure: 'not yet known' },
  owner: { freed: 'a named owner with hours freed up', hired: 'a hire who starts soon', me: (a) => isBiz(a) || a.orgType === 'other' ? 'the owner, around running the business' : 'the person completing this check (add your role), around the day job', ontop: 'a named owner, on top of their normal job', little: 'someone, under 2 hours a week', no: 'no one yet' },
  support: { good: 'IT staff or a provider; we hold our own admin accounts and a systems list', it: 'a separate internal IT department', msp_keys: 'an outside provider, who currently holds the domain, licences and admin accounts', one_doc: 'one person, partly documented; a second person can get in', one_nodoc: 'one person, undocumented; nobody else can get in', me: 'the owner is the whole IT department', mixed: 'ad hoc — a staff member plus whoever gets called', nobody: 'nobody in particular' },
  trigger: { ending: 'something is ending (licence, contract, system, grant or key person)', incident: 'an incident, insurance requirement or audit finding', growth: 'outgrown the current setup', mandate: 'required by a funder, board or law', window: 'a funding window or date makes it possible now', retry: 'a previous attempt stalled, broke or was abandoned', idea: 'newly possible; nothing is forcing it', unsure: 'feels overdue; no forcing event' },
  after: { named: 'a named role with time budgeted and real training per person', namedno: 'a named person; no training time planned yet', me: 'the owner, learning as they go', same: 'whoever does IT now; an hour or two of training', nobody: 'not decided; people will pick it up' },
  funding: { operating: 'operating budget or reserves, approved', expected: 'operating budget or reserves, not yet approved', grant: 'a grant with a spend-by date', capital: 'a capital or business-case process still to come', unsure: "not decided, or not this person's to decide" },
  ongoing: { yes: 'in the operating budget', partly: 'partly covered, or relying on donated licences', no: 'not funded beyond the project', unsure: 'not known' },
  deadline: { none: 'no fixed date', hard12: 'a hard date more than a year away', hard6: 'a hard date 6–12 months away', hard3: 'a hard date 3–6 months away', hard0: 'a hard date under 3 months away' },
};
function shown(qid, a) { for (const st of visibleSteps(a)) if (visibleQs(st, a).some((q) => q.id === qid)) return true; return false; }
function briefText(qid, a) { if (!shown(qid, a)) return null; const v = a[qid]; const m = BRIEF_LABELS[qid]; if (m && v !== undefined && m[v]) return fx(m[v], a); return answerText(qid, a); }
function short(qid) { const q = qById(qid); return q ? q.label.replace(/\?$/, '') : qid; }

export function buildBrief(r, A) {
  const L = []; const name = A.orgName ? ` — ${A.orgName}` : '';
  const verdict = { ok: 'Ready to scope', warn: 'Nearly ready', bad: 'Settle these first' }[r.verdict];
  const typeNames = (A.types || []).map((v) => (TYPES.find((t) => t.v === v) || {}).l).filter(Boolean);
  L.push(`# Project brief${name}`);
  L.push(`${localDate()} · ${CONFIG.title} · Readiness: ${verdict} (${r.overall}%)`);
  L.push('');
  L.push('## Page one');
  L.push(`**Organization:** ${answerText('orgType', A) || '—'}; ${answerText('size', A) || '—'} people; sites/internet: ${answerText('conn', A) || '—'}.`);
  L.push(`**The work:** ${typeNames.join('; ') || '—'}`);
  if (A.problem) L.push(`**The problem and what done looks like:** ${A.problem.trim()}`);
  if (briefText('trigger', A)) L.push(`**Why now:** ${briefText('trigger', A)}`);
  L.push(`**Who decides:** ${briefText('sponsor', A) || '—'}${A.approver ? `; spending approved by ${briefText('approver', A)}` : ''}; day-to-day owner: ${briefText('owner', A) || '—'}`);
  L.push(`**Money:** ${answerText('budget', A) || '—'}; ${briefText('funding', A) || '—'}${briefText('ongoing', A) ? `; ongoing costs: ${briefText('ongoing', A)}` : ''}`);
  L.push(`**Timeline:** ${briefText('deadline', A) || '—'}${A.deadlineText ? ` — ${A.deadlineText.trim()}` : ''}`);
  if (shown('personal', A) && answerText('personal', A)) L.push(`**Information involved:** ${answerText('personal', A)}`);
  L.push(`**IT today:** ${briefText('support', A) || '—'}${briefText('after', A) ? `; afterwards: ${briefText('after', A)}` : ''}`);
  L.push('');
  L.push('**Settle first:**');
  r.top.forEach((f, i) => L.push(`${i + 1}. **${fx(FLAGS[f.id].t, A)}** — ${fx(FLAGS[f.id].d, A)}`));
  { const all = [...r.rest, ...r.noted]; if (all.length) { L.push(''); L.push(`**Also worth knowing:** ${all.slice(0, 8).map((f) => fx(FLAGS[f.id].t, A)).join('; ')}${all.length > 8 ? `; and ${all.length - 8} more in the full results` : ''}.`); } }
  L.push('');
  L.push('---'); L.push('## Full answers');
  for (const s of visibleSteps(A)) { const rows = visibleQs(s, A).map((q) => { const t = answerText(q.id, A); return t ? `- ${short(q.id)}: ${t}` : null; }).filter(Boolean); if (rows.length) { L.push(`### ${s.title}`); L.push(...rows); L.push(''); } }
  const c = [A.contactName, A.contactRole, A.contactEmail].filter(Boolean); if (c.length) { L.push('### Contact'); L.push(`- ${c.join(' · ')}`); L.push(''); }
  L.push(`_Prepared by the organization with the ${CONFIG.title} (${CONFIG.consultantName}). A starting point for a conversation, not a specification, and not legal or privacy advice._`);
  return L.join('\n');
}
