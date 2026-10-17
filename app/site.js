// One place for the site's shared copy. Change the words here, not in the pages.
export const site = {
  name: 'BlackMatter',
  line: 'A consultancy. Yellowknife, Northwest Territories.',
  email: 'hello@blackmatter.ca', // placeholder until the mailbox exists
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/services/', label: 'Services' },
    { href: '/contact/', label: 'Contact' },
  ],
};

// Services: five situations a reader scans for their own. The title is the reader's question; the body is the answer.
// Approved copy. Do not add words, numbers, tools, deliverable names or past-work references here.
export const services = [
  { title: 'If we lost everything tomorrow, would we get it back?', body: 'I check whether your backups would bring you back, not just whether they run. Then I write down how to get back, in words your own people can follow.' },
  { title: 'Someone\u2019s asking how protected we are. What do we tell them?', body: 'Insurers, funders and clients ask. I find out where you actually stand on security and help you answer in words you can stand behind.' },
  { title: 'What should IT cost us? Is that new tool worth it?', body: 'I turn what you have into a number and a case leadership can approve. Before you buy, I give you an independent read, including whether AI fits at all.' },
  { title: 'Why does so much of the week go to paper and re-typing?', body: 'Forms, re-keying, chasing signatures. I replace those manual steps with simple workflows, using what you already pay for.' },
  { title: 'How do I ever clear the IT backlog?', body: 'Every install, update and fix lands on you. I standardise how software is installed and kept current, then hand you the standard, so you fix things once, not machine by machine.' },
];

// The terms of every engagement. Shown once, at the foot of the Services page.
export const scope = 'Every engagement starts with a scoping conversation and a written proposal; the specifics belong there. I work part-time, fixed scope, no after-hours response. When the work is done, I hand it over so your people can carry on without me.';

// Home lede and the shape of an engagement. Every claim below is drawn from the record; nothing names a client or an employer.
export const lede = 'A consultancy in Yellowknife, Northwest Territories, for organizations that know what they need and intend to get it done once. We capture the requirement in full, build to it, document it, and leave.';

// No page imports `process` any more: the Services page dropped its "How an engagement runs" block on 2026-10-17.
// Kept for reference; its "we" and "named deliverables" language predates the first-person, fixed-scope copy.
export const process = [
  { title: 'Capture', body: 'Needs, business requirements, constraints and the definition of done, written up and agreed before anything is built. Quality output does not come from a vague brief, so we do not start from one.' },
  { title: 'Proposal', body: 'Fixed scope, named deliverables, a price. You know what you are getting before you sign.' },
  { title: 'Build', body: 'Done properly, tested rather than assumed, with you informed at every stage.' },
  { title: 'Handover', body: 'Documentation your own team can run, training where it is needed, and a clean exit. The measure of the work is that you do not need to call us again.' },
];


export const record = [
  'Led a backup and recovery program for more than eighty servers across three provinces, from business case through bare-metal recovery testing, on a purchase over two hundred thousand dollars.',
  'Designed and built three storage area network environments, including the high-availability cluster behind a territory’s front-line police radio network, and led the recovery when vendor firmware took one down.',
  'Wrote the business case and budget for every major infrastructure purchase requested, with disclosed contingency, and was funded in full each time.',
  'Technical lead for in-car computing across the Northwest Territories, adapting national specifications to northern conditions and documenting the deployment for the analysts who followed.',
  'Replaced an insecure vendor monitoring console for remote radio sites with a custom SNMP and Nagios platform: a live territorial map, two weeks of history on every site, and alerts on a trusted clock.',
  'Built a library of roughly one hundred automated application packages, with device and user targeting, for fleets spread across a territory.',
  'One of the global administrators for a government-wide service management platform; built its directory and mail integrations and the template logic that runs its workflows.',
  'Replaced paper approval forms and ticket queues with Microsoft 365 approvals and automated Teams provisioning, built against the Microsoft Graph.',
  'Led remediation of a security incident across more than seventy endpoints, with per-system security reporting that leadership could act on.',
  'Project lead for the readdressing of a provincial headquarters network, three hundred workstations and mission-critical systems included.',
  'More than a decade of not-for-profit board service in Yellowknife, including grant writing and multi-year funder reporting on projects over one hundred and fifty thousand dollars.',
];
