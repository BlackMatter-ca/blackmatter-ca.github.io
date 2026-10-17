// One place for the site's copy. Second draft (16 Oct 2026) with the services panel's four headings applied.
// Square brackets mark what only the owner can fill in; nothing here names a client or an employer.

export const site = {
  name: 'BlackMatter',
  line: 'A one-person IT consultancy in Yellowknife, Northwest Territories.',
  email: 'hello@blackmatter.ca',
  place: 'Yellowknife, Northwest Territories',
  nav: [
    { href: '/services/', label: 'Services' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ],
  cta: { href: '/readiness-check/', label: 'Readiness check' },
};

export const terms = {
  main: 'This is part-time, fixed-scope work alongside a full-time job. There is no after-hours response and no retainer. If something is down right now, I am the wrong call. If you want a piece of work planned, built properly and left in your own hands, keep reading.',
  note: 'Some public bodies in the Northwest Territories I cannot take on while I hold my current role. I will tell you at first contact.',
  short: 'Part-time, fixed scope, no after-hours response.',
};

export const hero = {
  eyebrow: 'BlackMatter · A one-person IT consultancy in Yellowknife, Northwest Territories',
  headline: 'Technology work for organisations that want it done once.',
  lede: 'I take on fixed-scope projects for non-profits, Indigenous governments and development corporations, municipalities and small businesses: proving the backups can be restored, getting a budget number past the board, replacing paper approvals, packaging software so a technician stops installing it by hand. The requirement is written down before anything is built. The result is tested, documented and handed over. Then I leave.',
  caption: '30+ communities · countless unique demands',
  tags: ['Microsoft 365', 'Azure', 'Power Platform', 'ISO 27001', 'Custom LLM agents'],
};

// The four kinds of work, grouped by why they get bought.
export const kinds = [
  {
    id: 'prove',
    title: 'Prove it works',
    quotes: ['We have backups. We have never proved we could restore from them.', 'We have a continuity plan in a PDF from three years ago. Nobody has opened it.'],
    body: 'I restore a real system while you watch, find out what would actually happen if the office flooded or the server died, and write it down in a form your staff can keep and your board can read.',
    projects: ['A backup and recovery review with a witnessed restore.', 'A continuity plan your staff will maintain, with one exercise run.', 'A post-incident check across every machine once an incident is contained, so you can show it was cleaned up.'],
    short: 'Backup review · continuity plan · post-incident check',
    evidenceLabel: 'Done before',
    evidence: 'Across a program covering about eighty servers in three regions.',
  },
  {
    id: 'answer',
    title: 'Answer the question you have been asked',
    quotes: ['Our insurer sent a questionnaire and we cannot answer it truthfully.', 'A client wants to see our security policy and we do not have one.'],
    body: 'I assess where you stand against the Canadian Centre for Cyber Security’s baseline for small organisations, rank what to fix by effort and benefit, and help you answer the form in front of you. I draft; you check and sign. Keep your managed service provider: this tells you what to ask them for.',
    shortBody: 'I assess where you stand against the Canadian Centre for Cyber Security’s baseline for small organisations, rank what to fix, and help you answer the form in front of you. I draft; you check and sign.',
    projects: ['A security readiness check.', 'Drafted answers for an insurance or client questionnaire.', 'A twelve-month fix list.'],
    short: 'Security readiness check · questionnaire answers',
    evidenceLabel: 'Evidence',
    evidence: 'I led the remediation of an email-borne incident across about 120 computers and wrote the report leadership acted on; this check as a packaged service is new for clients, and priced that way.',
  },
  {
    id: 'number',
    title: 'Get a number past the board',
    quotes: ['We need to replace equipment and we cannot get a figure approved.', 'Our Microsoft bill keeps growing and nobody knows what we are paying for.'],
    body: 'I inventory what you have, when it will need replacing and what you are paying for, and turn that into a multi-year budget and a business case your board or council can vote on, in formats your own staff keep updating after I leave.',
    shortBody: 'I inventory what you have, when it will need replacing and what you are paying for, and turn that into a multi-year budget and a business case your board or council can vote on.',
    projects: ['An asset inventory and lifecycle budget.', 'One funding-ready business case.', 'A Microsoft 365 licence and tenant check with a savings list.'],
    short: 'Lifecycle budget · business case · Microsoft 365 check',
    evidenceLabel: 'Done before',
    evidence: 'Business cases written for every major purchase I requested over my career, each funded in full.',
  },
  {
    id: 'manual',
    title: 'Take the manual work off your people',
    quotes: ['Our approvals still run on paper and nobody can tell where a request is.', 'Our tech installs software one machine at a time.'],
    body: 'One piece of work at a time: I build it, test it with the people who will use it, and hand it back with a guide so the next change is yours. This is not outsourced IT; it is the one thing that is eating the week, fixed and returned.',
    shortBody: 'One piece of work at a time: I build it, test it with the people who will use it, and hand it back with a guide so the next change is yours. This is not outsourced IT.',
    projects: ['A digital approval built in Microsoft 365.', 'A software packaging standard and your most-used applications packaged to it, with the runbook.', 'A storage clean-up with a plain-language report per department.'],
    short: 'Digital approvals · software packaging · storage clean-up',
    evidenceLabel: 'Done before',
    evidence: 'Paper forms replaced for a large organisation; a library of about a hundred packages for fleets across a territory.',
  },
];

export const ai = 'I help you decide and stop there: what problem you are solving, whether your data is in any shape to use, and whether to build, buy or wait. I have not yet taken a client through an AI purchase, and I do not build AI systems.';
export const aiShort = 'Thinking about AI? I help you decide and stop there. I have not yet taken a client through an AI purchase, and I do not build AI systems.';

export const process = [
  { title: 'Capture', body: 'Needs, constraints and the definition of done, written and agreed before anything is built. Good work does not come from a vague brief, so I will not start from one.' },
  { title: 'Proposal', body: 'Fixed scope, named deliverables, a price. For work that cannot be fixed in advance, a capped number of hours. You know what you are getting before you sign.' },
  { title: 'Build', body: 'Tested rather than assumed: a restore is restored, a flow is run by the people who will use it, a package is deployed to a real device. You are told what is happening at every stage.' },
  { title: 'Handover', body: 'Documentation your own people can run, training where it is needed, and an exit. The measure of the work is that you do not need to call me again.' },
];

export const touch = 'Only the systems the proposal names, with access you grant and can revoke. I do not read the records inside them, copy your data out, or keep it after handover. Everything I produce is yours.';

export const readiness = {
  body: 'Most technology projects that go wrong in small organisations went wrong before anyone was hired: nobody could say what “done” meant, the budget covered the software and nothing else, or the one person who understood the old system had left. The readiness check asks about twenty questions and tells you which of those you still need to settle, whether you need me, a product, or a different kind of help, and gives you a scoping brief you can hand to anyone.',
  note: 'About ten minutes. Nothing is sent unless you choose to send it.',
  outcomes: [
    'A readiness score across seven areas, with the ones to settle first',
    'A verdict in plain words: ready to scope, nearly ready, or settle these first',
    'A short list of to-dos. Every flag is something to fix, not a rejection',
    'A suggested shape of engagement: fixed price, capped hours, or a short discovery first',
    'Questions to ask any consultant, including me',
    'A one-page scoping brief that is yours to keep, copy, print or send to anyone',
  ],
};

export const truths = [
  'Twenty years of infrastructure and security work for government and police organisations, most of it in the North.',
  'The business case and budget written for every major purchase I requested, each funded in full.',
  'A decade on non-profit boards in Yellowknife, including grant writing and multi-year funder reporting on projects over $150,000.',
  'No commissions, referral fees or payments from vendors. I do not resell anything.',
  'Everything I build is documented for the people who will run it after me.',
];

export const contact = {
  reply: 'I reply within two business days. This is part-time work alongside a full-time job, so I read and write outside business hours. Do not use this address for anything urgent.',
  helps: [
    'What is not working, in your own words. “Nobody has ever restored a backup” is a better brief than “we need a DR strategy.”',
    'Roughly how big you are: staff, devices, sites.',
    'Whether anyone has to approve this besides you.',
    'When you need it done, and whether that date is real or a preference.',
  ],
  brief: 'If you have run the readiness check, send the brief it produced; it answers most of this.',
  where: 'Yellowknife, Northwest Territories. Most work is remote. I can be on site in Yellowknife, and the proposal will say if a visit elsewhere is needed and what it costs.',
  unsure: 'Say so anyway. If you need a managed service provider, a forensics firm, a privacy lawyer or a software vendor, I will tell you, and if I know who I would call, I will say that too.',
};

export const servicesPage = {
  headline: 'Four kinds of work, each shaped to your organisation in the proposal, not here.',
  lede: 'If your situation is close to one of these but not quite, it is still worth a conversation.',
  terms: 'Part-time, fixed scope, no after-hours response. Every engagement is priced before it starts and ends with a handover: documentation your own people can run, and an exit.',
  notHere: 'Managed services, help-desk support, retainers, emergency response, privacy or legal opinions, and anything that needs me on site in a fly-in community on a weekday. If you need one of those, say so and I will tell you who I would call.',
  paying: 'Fixed fee, invoiced; card accepted for smaller engagements. The proposal gives the figure for your organisation and says what is in and out of scope on its first page.',
  payingNote: '[Price bands to be added.]',
};

export const about = {
  who: 'Shylo Foster (she/her), in Yellowknife, Northwest Territories.',
  story: [
    'I have spent twenty years keeping technology running for organisations that cannot afford for it to stop: a few years in Ontario, then most of it in the North, inside government and police organisations where the nearest spare part was a flight away and the systems had to hold without someone standing beside them. The work covered the whole stack a small organisation depends on: the servers and the backups behind them, the security that had to be enforced rather than written, the service desk, the Microsoft tenant, and the automation that took paper and repetition out of other people’s days.',
    'Alongside that, a decade on non-profit boards in Yellowknife, with the grant writing and funder reporting that come with it. I know what a volunteer board meeting is like when the IT item comes up and nobody at the table can say whether the backups work.',
  ],
  why: 'Small organisations in the North get technology help in two forms: a southern vendor who sells something, or a managed service provider who keeps things running but is not paid to plan. The gap is the fixed piece of work in between: proving the backups, writing the business case, building the one approval flow, packaging the software properly, answering the insurer. That is the kind of work I have done inside large organisations for twenty years, and it is all BlackMatter does.',
  how: [
    { title: 'Written before built', body: 'Requirements, constraints and the definition of done are agreed in writing first. I have watched too many projects fail at the brief.' },
    { title: 'Tested rather than assumed', body: 'A restore is restored. A flow is run by the people who will use it. A package is deployed to a real device.' },
    { title: 'Documented for the people who stay', body: 'Runbooks, guides and handover sessions are part of every engagement, not an extra.' },
    { title: 'Nothing to sell you', body: 'I take no commissions, referral fees or payments from vendors, and I resell nothing. When I recommend a product, it is because the criteria we agreed on picked it.' },
    { title: 'Said plainly when I have not done it', body: 'Each service says whether I have delivered it before. Where I have not, the first client’s price reflects it.' },
  ],
  not: 'Not a managed service provider. Not on call: I do the work outside business hours and reply within two business days. Not Indigenous-owned, which matters for some procurement preferences, and I would rather you knew before you asked. Not a lawyer, a privacy officer or a certifier.',
  credentials: 'No degree. I started as a technician with a couple of industry certifications, and everything since was learned by doing it: technician, administrator, infrastructure lead, acting manager. Twenty years of doing the work, and references on request.',
};
