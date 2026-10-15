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

export const services = [
  { title: 'Infrastructure and continuity', short: 'Virtualization, storage, backup and tested recovery.', body: 'Virtualization, storage and backup designed to stay up, with recovery that has been tested rather than assumed. Lifecycle planning and the business cases that fund it.' },
  { title: 'Security readiness and response', short: 'Enforced baselines, audits, remediation at scale.', body: 'Baselines that are enforced, not just written. Audits, remediation at scale, and incident reporting leadership can act on.' },
  { title: 'Microsoft 365 and automation', short: 'Teams governance, approvals, Graph integrations.', body: 'Teams governance, approvals and provisioning on the Power Platform, with integrations built on the Microsoft Graph. Paper forms and ticket queues replaced with workflows.' },
  { title: 'Service management', short: 'ITSM design, integrations and reporting.', body: 'ITSM platform design and administration, API integrations, template-driven automation and the reporting that shows whether service is improving.' },
  { title: 'Endpoint management', short: 'Imaging and deployment standards that hold.', body: 'Imaging, application packaging and deployment standards for fleets spread across a territory, so technicians install once and it holds.' },
  { title: 'Monitoring and reporting', short: 'Monitoring, dashboards and data audits.', body: 'Custom monitoring for the systems vendors do not cover, real-time dashboards for the people on shift, and data audits that give each department its own clear picture.' },
  { title: 'Documentation and knowledge', short: 'Runbooks written for the people who use them.', body: 'Procedures, runbooks and reference material written for the audience that will use it, from the service desk to the executive table.' },
  { title: 'Project leadership and advisory', short: 'Technical lead, vendors, proposals, funding.', body: 'Technical lead for capital and migration projects, vendor and supplier management, specifications, proposals and funding submissions.' },
];

// Home lede and the shape of an engagement. Every claim below is drawn from the record; nothing names a client or an employer.
export const lede = 'A consultancy in Yellowknife, Northwest Territories, for organizations that know what they need and intend to get it done once. We capture the requirement in full, build to it, document it, and leave.';

export const process = [
  { title: 'Capture', body: 'Needs, business requirements, constraints and the definition of done, written up and agreed before anything is built. Quality output does not come from a vague brief, so we do not start from one.' },
  { title: 'Proposal', body: 'Fixed scope, named deliverables, a price. You know what you are getting before you sign.' },
  { title: 'Build', body: 'Done properly, tested rather than assumed, with you informed at every stage.' },
  { title: 'Handover', body: 'Documentation your own team can run, training where it is needed, and a clean exit. The measure of the work is that you do not need to call us again.' },
];

export const exclusions = 'BlackMatter is not a help desk, a web agency or a retainer for whatever comes up. We do not fix email, browsers or printers, and we do not build websites. If a request falls outside the services above we will say so, and where we can, point you to someone who does that work.';

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
