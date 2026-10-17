// Question data, flags and dimensions for the Project Readiness Check.
// Ported unchanged from the standalone wizard (v3); only CONFIG was edited.

/* ===========================================================================
   CONFIGURATION — edit these for your site
   =========================================================================== */
export const CONFIG = {
  consultantName: "BlackMatter",
  contactEmail: "hello@blackmatter.ca",          // e.g. "hello@example.ca" — used by the Send button (mailto)
  bookingUrl: "/contact/",            // optional: link to a booking/contact page
  submitEndpoint: "",          // optional: URL that accepts a JSON POST; if empty, Send uses mailto
  title: "Project Readiness Check",
  intro: "About eighteen questions, ten minutes or so. You get a one-page brief and the three things to sort out before you spend money. It's yours either way."
};

/* ===========================================================================
   FLAGS — each is a to-do, not a rejection. s: high | med | info. p: priority within severity (1 = first).
   w and d may be strings or functions of the answers.
   =========================================================================== */
export const isPub = a => a.orgType==="gov";
export const isIndig = a => a.orgType==="indig";
export const isNP  = a => a.orgType==="np"||a.orgType==="other";
export const isBiz = a => a.orgType==="biz";
export const hasType = t => a => (a.types||[]).includes(t);
export const hasCommunityData = a => a.orgType==="indig"||(a.personal||[]).includes("community");
export const tiny = a => a.size==="s1";
export const soloDecider = a => a.sponsor==="me";

export const FLAGS = {
  KEYS:{s:"high",p:1,t:"Secure your keys first",w:a=>{const parts=[];if(a.support==="msp_keys")parts.push("your provider holds your domain, licences or admin accounts");if(a.a1==="host")parts.push("a web host sold your Microsoft 365 and controls sign-in");if(a.a1==="locked"||a.a1==="no")parts.push("you can't get into the domain registrar or a Global Admin login");if(a.a1==="unsure")parts.push("you're not sure you can get into the domain registrar or a Global Admin login");if(a.f1==="agency"||a.f1==="unsure")parts.push("an agency, provider or departed helper holds the website domain, hosting or CMS logins");const quiet=(a.a1==="locked"||a.a1==="no"||a.f1==="agency"||a.f1==="unsure");if(!quiet&&a.support==="msp_keys")return `Right now your provider holds your domain, licences or admin accounts. If the provider is cooperative this can happen alongside other work. Until the logins are in your organization's name, you can't change providers, win a dispute, or prove to an insurer that you own anything.`;return `Nothing can start until you can get into your own accounts. Right now ${parts.join(", and ")}. ${quiet?"Recovering access from someone who has gone quiet can take weeks, and until then":"Until the logins are in your name,"} you can't change providers or start work.`},d:a=>{const steps=["Get the domain registrar, DNS, hosting and admin logins into your organization's name and into a shared password manager before anyone quotes."];if(a.a1==="locked"||a.a1==="no"||a.a1==="host")steps.push("Recovery path: (1) find who is billed for the domain and for Microsoft/Google — the invoice names the account holder; (2) open an account-recovery case with that company using the organization's legal name and billing proof; (3) if a host like GoDaddy sold Microsoft 365, ask them to 'defederate' the tenant — hand sign-in control back to you — and expect every password to reset; (4) only then create a Global Admin you control and two emergency accounts.");return steps.join(" ")}},
  NO_SPONSOR:{s:"high",p:2,t:"Name one person who can say 'done'",w:"Projects with someone senior behind them get finished. Projects without one wait for a meeting every time a decision comes up.",d:"Agree who's backing this and who can say yes to changes along the way. If it's a committee, get them to name one person."},
  SLOW_APPROVAL:{s:"med",p:3,t:"Plan around your approval cycle",w:a=>a.approver==="two"?"A council or board that needs two meetings per decision adds a month or more to every step — the contract, every change, every surprise.":"A board or council that meets quarterly adds weeks to every decision — the contract, every change, every surprise.",d:"Ask for delegated authority for routine decisions, or book approval dates into the timeline now."},
  NO_OWNER:{s:"high",p:3,t:"Free up an internal owner",w:"Someone on your side has to make decisions every week, roughly an hour for every ten a consultant works. If that's on top of a full job, it happens in the evenings or it doesn't happen.",d:"Name the owner and take something off their plate for the duration."},
  NO_DONE:{s:"high",p:2,t:"Write your one-sentence definition of done",w:"If you can't say what done looks like, nobody can price it, and the scope ends up being whatever the loudest person wanted.",d:"Finish the sentence: 'When this is done, people will be able to ___.' If your leadership can't agree on that sentence, sort that out before paying anyone."},
  NO_METRIC:{s:"info",p:4,t:"Choose one number that matters",w:"Without a number from before, there's no way to tell afterwards whether it worked.",d:"Pick one thing to measure and write down today's figure."},
  PRODUCT_FIRST:{s:"info",p:5,t:"Describe the job, not the tool",w:"Naming the product first skips the part where someone checks it's the right one. It might be. It's cheaper to find out before you buy it.",d:"Keep the product on the list, but write down what people need to do and what's getting in the way."},
  PAST_FAILURE:{s:"med",p:2,t:"Write down what went wrong last time",w:"If the last attempt failed and nobody wrote down why, the next one tends to fail the same way.",d:"Write a short, blunt list: missed dates, wrong product, nobody used it, lost access when someone left. Hand it to whoever comes next."},
  NO_BUDGET:{s:"high",p:3,t:a=>(a.funding==="unsure"&&a.budget==="unsure")?"Find out who holds the budget and what range is realistic":"Pick a working budget range",w:a=>(a.funding==="unsure"&&a.budget==="unsure")?"You don't hold the money, so the first conversation is with whoever does. A range from them — even rough — decides whether this is a project or a first phase.":"Without a range, every quote is a guess in both directions and the first conversation is spent fishing.",d:a=>(a.funding==="unsure"&&a.budget==="unsure")?"Ask your director or finance lead for a working range and who approves it, and put that answer at the top of page one.":"Choose a range you could defend to whoever approves money, even if it isn't approved yet. It isn't a ceiling for vendors; it tells them whether to propose a project or a first phase."},
  SOFTWARE_ONLY_BUDGET:{s:"high",p:4,t:"Budget beyond the software",w:a=>{const T=a.types||[];const sec=T.length&&T.every(t=>["E","G","D","F"].includes(t));if(sec)return "Projects usually go over on the work around the software, not the software: staff time, training, content or translation, and a contingency of 10–20%.";return isNP(a)?"Projects usually go over on the work around the software, not the software. Nonprofits typically budget about 1% for training; it should be closer to 10%, plus 10–20% contingency, plus data cleanup, which almost nobody budgets for.":"Projects usually go over on the work around the software, not the software: training time, cleaning up data, running old and new side by side, and a contingency of 10–20%."},d:a=>{const T=a.types||[];const sec=T.length&&T.every(t=>["E","G","D","F"].includes(t));return sec?"Add lines for staff time, training and contingency — even if rough.":"Add lines for training hours, data cleanup, overlap of old and new, and contingency — even if the numbers are rough."}},
  NO_ONGOING:{s:"high",p:3,t:"Fund the years after the project",w:a=>a.funding==="grant"?"The grant ends. The subscriptions, support and renewals don't.":a.ongoing==="partly"&&isNP(a)?"Part of your ongoing cost rests on donated licences. Microsoft ended its free Business Premium and E1 nonprofit grants in 2025; a free platform is a dependency on a donor program that can change.":((a.lines||[]).includes("translate")||[...(a.f2||[]),...(a.h4||[])].includes("lang"))?"The project pays for the build. For a site in more than one language, the biggest ongoing cost is translating every update. Budget it like a subscription.":"The project pays for the build. Subscriptions, support and renewals keep coming every year after, and someone has to pay for those too.",d:"Put the ongoing annual cost into the operating budget before committing to the build. If any of it rests on donated licences, find the renewal date."},
  HARD_DEADLINE:{s:"med",p:3,t:"Separate the hard date from the wish",w:a=>isBiz(a)?"A fixed date is where testing and training get cut, which is how a cutover goes wrong on the day.":"Dates tied to a grant, year-end or a renewal are where testing and pilots get cut. That's what happened with Phoenix.",d:"Ask whether a smaller first phase meets the date while the rest follows safely."},
  DEADLINE_SOON:{s:"high",p:2,t:a=>a.funding==="grant"?"Spend the grant on the groundwork, then migrate":"Your deadline is very close",w:a=>a.funding==="grant"?"A grant spend-by date before the real work can finish pushes teams to buy software first and clean up later — the expensive order. Grants can usually pay for export, cleanup, discovery and licences in advance; ask the funder which costs are eligible.":a.deadline==="hard0"?"Under three months leaves time for a first phase, not a whole project — especially if data, procurement or training is involved.":"Under six months is tight for anything involving data migration, procurement or staff training.",d:a=>a.funding==="grant"?"Phase one inside the spend-by date: get the data out, clean it, do discovery, buy licences the funder allows. Phase two after: the migration itself. Record the spend-by date, eligible costs, and how ongoing costs are covered afterwards.":"Decide now what a credible first phase looks like, who approves shifting the rest, and work backwards from the date."},
  KEY_PERSON:{s:"high",p:2,t:"Reduce single-person dependency",w:a=>a.support==="me"?"You're the whole IT department. If the laptop dies or you're away, nobody can get in.":"If one person holds all the passwords and all the knowledge, the organization is one resignation away from being locked out, and nobody can check their work.",d:"Put the admin logins in a shared password manager, name a second person who can get in, and write down how things are set up, even roughly."},
  INVOLVE_IT:{s:"med",p:2,t:"Bring your IT department in first",w:"They run the systems this depends on. If they hear about it late, the project gets re-planned around their rules and their queue.",d:"Talk to IT before this goes any further. Ask what they need from you and how long their queue is."},
  NO_IT_SUPPORT:{s:"med",p:3,t:"Decide who supports IT day to day",w:"A project has to be handed to someone at the end. If there's nobody, the consultant becomes your help desk.",d:"Name the person, provider or role, and check their contract and notice period."},
  DATA_UNKNOWN:{s:"high",p:3,t:"Take a quick look at your data",w:"How much data there is, where it's hiding and how messy it is sets the price more than anything else, and it's where most migrations go over.",d:"Count the records. List every spreadsheet, inbox and laptop holding the same information. Guess what share is duplicated or out of date. Rough is fine."},
  DIRTY_DATA:{s:"high",p:3,t:"Clean before you move",w:"Cleaning data before a move is cheap. Cleaning it after is not. And you can start now, before anyone is hired.",d:"Decide what gets cleaned, archived or thrown out before anyone quotes."},
  SENSITIVE_DATA:{s:"med",p:2,t:a=>isPub(a)?"Check whether a privacy impact assessment is required":"Treat sensitive information as a design input",w:a=>{const p=a.personal||[];const hot=p.some(v=>["health","financial","id"].includes(v));if(isPub(a))return "Territorial and provincial privacy law requires a PIA before a new system holding personal information goes live. It can take months and can rule tools out.";if(p.includes("pay")&&!hot)return "Taking payments or sign-ups online means card numbers must never touch your own site or inbox — use a payment processor — and member data needs a privacy notice and a named keeper.";if(p.includes("corr")&&!hot)return "Correspondence can contain any kind of personal information, so the system holding it needs access controls and a retention rule even if nothing else is sensitive.";if(isBiz(a))return p.includes("id")?"ID documents and card numbers carry theft and card-industry obligations; a breach is yours to report and to pay for, not the vendor's.":p.includes("financial")?"Payment and financial details decide which tools are allowed and where data may live; a breach is yours to report, not the vendor's.":"Where personal information is stored and who can see it affects which tools are allowed; breach obligations stay with you.";if(p.includes("health"))return "Client safety and confidentiality come first: health, children's, justice or social-services records decide where data may live, who can see it, and what a breach costs. Those duties stay with you, not the vendor.";if(p.includes("id"))return "ID documents and card numbers carry theft and card-industry obligations; a breach is yours to report and pay for, not the vendor's.";if(p.includes("financial"))return "Payment and financial details decide where data may live and who can see it; a breach is yours to report, not the vendor's.";return "Where personal information is stored and who can see it affects which tools are allowed; breach obligations stay with the organization, not the vendor."},d:a=>isPub(a)?"Ask your privacy officer or ATIPP coordinator now, and put the PIA on the critical path.":"List the categories involved, name a privacy lead, and make storage location, access control and a breach plan conditions of any product you consider."},
  PUBLIC_RULES:{s:"med",p:2,t:a=>isIndig(a)?"Confirm which of your own policies apply":"Confirm the public-sector rules still unchecked",w:a=>{const c=a.pubChecks||[];const names={procure:"procurement rules and thresholds",pia:"whether a privacy impact assessment is needed",records:"records retention and disposition",union:"union notice if duties change (often six months)"};const miss=Object.keys(names).filter(k=>!c.includes(k)).map(k=>names[k]);return `${isIndig(a)?"Your government's own":"These"} rules each run on their own clock and can decide which tools are allowed. Not yet checked: ${miss.join("; ")}.`},d:a=>{const c=a.pubChecks||[];const who=[];if(!c.includes("procure"))who.push("procurement");if(!c.includes("pia"))who.push("your privacy officer");if(!c.includes("records"))who.push("records");if(!c.includes("union"))who.push("HR / labour relations");return `Ask ${who.join(", ")} now and put their lead times on the plan — before a vendor is chosen.`}},
  NO_AFTER_OWNER:{s:"high",p:4,t:"Decide who keeps it running and how people learn it",w:"Systems nobody owns stop being used within a year. Training is the first thing cut from a budget and the main reason that happens.",d:"Name who looks after it afterwards, budget their time and any support contract, and book training close to go-live."},
  LOW_BANDWIDTH:{s:"med",p:3,t:"Design for your actual connection and sites",w:a=>{const c=a.conn||[];const s=[];if(c.includes("geo"))s.push("Traditional satellite adds 600–800 ms to every click; cloud software that works in the south can be unusable over it.");if(c.includes("leo"))s.push("Low-orbit satellite is far better but reliability and coverage still vary site to site.");if(c.includes("outage"))s.push("Outages of days happen in cold snaps, so anything cloud-only needs an offline fallback.");if(c.includes("fly"))s.push("Fly-in sites add charters, weather days and seasonal windows to any on-site work.");return s.join(" ")||"Mixed connections mean the solution has to be tested from the worst site, not the best."},d:"List each site's connection and outage history, insist on a test from the worst site before committing, and price travel contingency for any hands-on work."},
  GRANT_FUNDED:{s:"info",p:5,t:"Note the grant's constraints",w:"The grant's spend-by date and its rules on what counts as an eligible cost shape what's possible, and what's left running when the grant ends.",d:"Write down the spend-by date, what the grant will pay for (discovery? cleanup? licences in advance?), and how the ongoing costs get covered afterwards."},
  MANY_UNSURE:{s:"info",p:5,t:a=>(a.budget==="<2k"||a.budget==="2-10k"||tiny(a))?"Start with a short conversation, not a project":"Consider a short paid discovery first",w:a=>(a.budget==="<2k"||a.budget==="2-10k"||tiny(a))?"Four or more answers are 'not sure', and at your size a formal discovery isn't worth the money. An hour with someone who's done this will settle most of them.":"Four or more answers are 'not sure', so a fixed quote would be a guess. A two-to-four-week fixed-fee assessment gives you a reliable scope, and the output is yours whoever builds it.",d:a=>(a.budget==="<2k"||a.budget==="2-10k"||tiny(a))?"Bring this brief to that conversation; the 'not sure' items are the agenda.":"Ask for a discovery proposal with a fixed fee, clear deliverables and no obligation to continue."},
  DATA_GOV_OWNER:{s:"high",p:1,t:"Identify who governs the data and ask them",w:"Data about a First Nation, Inuit or Métis community belongs to that community. OCAP, Inuit data sovereignty and Métis OCAS all say the same thing: moving it or analysing it is their decision, and no contract changes that.",d:"Name the Nation, community or organization whose data it is, and make sure they've been asked before anything else gets scoped."},
  DATA_GOV_CONSENT:{s:"med",p:3,t:"Anchor governance in client consent",w:"With members of many Nations, there's no single governing body to ask. What matters is what each client agreed to, and whether you're combining data about communities rather than individuals.",d:"Check your consent wording, decide what can be aggregated or shared, and flag any community-level data that needs its own conversation."},
  DATA_GOV_AGREEMENT:{s:"high",p:1,t:"Put a data-governance agreement in place first",w:"If ownership, access, storage, use and return aren't written down, every later question about hosting, backups, reports or AI turns into a new negotiation in the middle of the project.",d:"Get it in writing: who owns the data, who can access it, where it may be stored, and how it comes back or gets destroyed."},
  DATA_GOV_POSSESSION:{s:"med",p:2,t:"Decide where the data lives and who holds the keys",w:"Possession is one of the four OCAP principles. Hosting outside the community's control, or a vendor holding the admin login, may not be acceptable, and that rules some products out.",d:"Settle hosting and admin control with the governing body and make it a condition in any vendor contract."},
  DATA_GOV_AI:{s:"high",p:1,t:"No AI on community data without agreement",w:"AI tools copy and index what they touch, and sometimes keep it. Using them on community data is the governing body's decision to make.",d:"Leave AI out of scope until the governing body has agreed what, if anything, it can be used for."},
  LICENCE_CLIFF:{s:"med",p:3,t:"Check your nonprofit licence renewal",w:"Microsoft stopped giving away Business Premium and E1 at renewals after July 2025. The free tier that's left has no Intune, Conditional Access or Defender, so switching to it quietly removes your security tools.",d:"Find the renewal date and decide whether you're paying to keep the security features or giving them up on purpose."},
  MAIL_SCOPE:{s:"med",p:4,t:"Measure what's moving and what sends mail",w:"Big mailboxes move at about 24 GB a day. The photocopier that emails scans, and any app that sends mail as you, will stop working after the move unless someone finds them first.",d:"Measure total mailbox size, list any archives over 50 GB, and list everything that sends email."},
  NO_SAAS_BACKUP:{s:"med",p:3,t:"Microsoft 365 and Google are not your backup",w:"Microsoft and Google keep the service running. They don't keep a copy of your data for you, and a migration is exactly when things get deleted.",d:"Price a separate backup for mail and files as part of the move."},
  EOL_OS:{s:"high",p:2,t:"End-of-life systems need a plan and a budget",w:a=>{const b=a.b1||[];const parts=[];if(b.includes("old"))parts.push("a computer or server over eight years old is one failure from an outage, and usually can't run current software");if(b.includes("w10"))parts.push("Windows 10 stopped getting security fixes in October 2025; extended updates cost per device and double yearly");if(b.includes("srv")||b.includes("exch"))parts.push("Server 2012/2016, SQL 2016 and on-prem Exchange are out of support or close to it");if(b.includes("vmw"))parts.push("VMware renewals have risen 2–3× for small sites, so the renewal date is usually the real deadline and 'renew short vs move' is the first decision");if(!parts.length)parts.push("out-of-support systems stop getting security fixes, and insurers notice");return parts.join("; ")+"."},d:a=>((a.b1||[]).includes("old")&&(a.b1||[]).filter(x=>x!=="unsure").length===1)?"Price a replacement now and move what's on it somewhere backed up before it fails.":"List every out-of-support system and licence renewal, and decide replace, extend or isolate before anything else is priced."},
  BUSINESS_CASE:{s:"med",p:3,t:"Scope just enough for the business case",w:"A business case needs a defensible range and a list of risks, not a design. Anything scoped in detail before approval gets redone if the number changes.",d:"Use this page as the skeleton for the case, book the committee date now, and keep any paid discovery sized to what the case needs."},
  MONEY_NOT_APPROVED:{s:"high",p:1,t:"Get the money approved before scoping deeper",w:"Money that isn't approved is the most common reason a scoped project never starts. Everything done before approval gets redone to a different number.",d:"Take the range and this page to whoever approves it, and come back with a yes, a no, or a different number."},
  DEPARTED_DEVICES:{s:"high",p:0,t:"Copy records off departed staff's devices now",w:"A laptop belonging to someone who's left is one dead drive or one reset from gone, and it's often the only copy.",d:"Copy everything off those devices this week to somewhere backed up that you control. Do this before planning anything else."},
  NO_BACKUP:{s:"high",p:0,t:"Make a backup this week",w:"Nothing else on this list matters if the only copy dies or gets encrypted. For a small setup this is an afternoon.",d:"Copy everything to a second place now, an external drive plus a cloud copy, then make it automatic. Do the first big upload from wherever your connection is fastest."},
  VOLUNTEER_BUILD:{s:"med",p:2,t:"Ask a volunteer builder the same questions as a vendor",w:"A relative or member building it for free still has to maintain it, hold the logins and hand it over when they're busy or gone. A ready-made membership and payment service is often cheaper over three years than a custom build.",d:"Agree that the domain and admin logins stay in the organization's name, agree what happens when they're unavailable, and price a ready-made service before deciding."},
  UNTESTED_BACKUP:{s:"high",p:1,t:"Test a restore before you rely on it",w:"A backup nobody has restored from is a guess, and ransomware goes after backups first. This is cheap to check and the worst thing to find out late.",d:"Restore a file and a whole system from backup, and confirm at least one copy can't be deleted by someone who gets in."},
  EXPOSED_RDP:{s:"high",p:1,t:"Close internet-facing remote access",w:"An open remote desktop is how most small organizations get ransomware, and insurers can refuse to pay out over it.",d:"Put remote access behind a VPN or an MFA login now. This is a fix, not part of the project."},
  INTEGRATIONS:{s:"med",p:3,t:"Every connection and report has to be rebuilt",w:"Links to payment, email, accounting and forms don't transfer. They get rebuilt and tested one by one, and so do the reports people quietly depend on.",d:"List each connection and each report, what it does, and who knows how it works."},
  EXPORT_RIGHTS:{s:"high",p:2,t:"Confirm you can get your data out",w:"Some vendors limit exports or charge for them, attachments and history included. If a contract end or a grant date is close, getting the data out comes before anything else.",d:"Get the export terms in writing now, decide where old history will live, and make full export rights a condition of anything new."},
  RETENTION:{s:"med",p:3,t:"Know what you must keep",w:a=>isPub(a)||isIndig(a)?"Records may only be destroyed under an approved schedule, and that history needs a home even if it doesn't move.":(isBiz(a)||a.orgType==="other")?"Tax, membership and employment records must be kept for years; that history needs a home even if it doesn't move.":"CRA requires charities to keep certain records for years, in Canada; that history needs a home even if it doesn't move.",d:"Find the retention schedule, decide what is kept where, and who signs off on disposal."},
  PARTNER_RISK:{s:"med",p:4,t:"Check the implementer's track record",w:"A builder who hasn't done this for an organization like yours tends to rebuild your old problems in the new system.",d:"Ask for references from organizations your size, and ask them what the builder is weak at."},
  OVERSHARING:{s:"high",p:1,t:"Fix file permissions before any AI assistant",w:"Copilot shows people whatever they already have permission to open, which includes the HR folder someone shared with Everyone three years ago. Microsoft's own advice is to fix that first.",d:"Review who can see what in SharePoint, OneDrive, shared drives and any database the AI will connect to. Tighten it before rollout."},
  AI_HIGH_RISK:{s:"high",p:1,t:"Decisions about people and public-facing AI need extra steps",w:"A BC tribunal made Air Canada honour what its chatbot said. AI that helps decide things about people may need an impact assessment and a person signing off, under Quebec law, the federal automated-decision rules, or the vendor's own terms.",d:"Keep anything public-facing narrow, with a person to escalate to. Decide where a human reviews and signs off. Check which assessments apply before building."},
  SHADOW_AI:{s:"med",p:2,t:"Write an AI acceptable-use policy and licence by role",w:a=>isNP(a)?"Staff are probably already using AI tools on their own. Paid assistants run about $21 per user per month with no nonprofit discount, and value is uneven across roles.":"Staff are probably already using AI tools on their own. Paid assistants run about $21 per user per month, and value is uneven across roles.",d:"Set simple rules for what data may go where, offer an approved option, and pilot with the few roles where the task is clear."},
  SERVICE_ACCOUNTS:{s:"high",p:2,t:"Move automations off personal accounts",w:"A flow that runs under someone's login stops the day that login is disabled, and it's a security hole until then, especially if that person has already left.",d:"List every flow and connection and who it runs as. Move them to proper service accounts with a named owner."},
  ROOT_CAUSE:{s:"high",p:1,t:"Find how they got in before you rebuild",w:"If you don't know how they got in, you'll probably be doing this again. Insurers and breach-notification rules also ask what was accessed.",d:"Get a short root-cause review (logs, accounts, the first machine affected), close that path, and record what personal information might have been touched."},
  ACTIVE_INCIDENT:{s:"high",p:1,t:"Contain first, plan after",w:"If it's still going on, planning can wait.",d:"Call an incident-response provider or your insurer's hotline now. Keep the evidence. Don't wipe anything."},
  MFA_GAPS:{s:"high",p:1,t:"Turn on MFA everywhere, including outside providers",w:"Missing MFA is the top reason insurers turn people down, and the most common way in. An old provider's forgotten admin account is the next most common.",d:"Admins, email, remote access and any outside logins first. Remove old provider accounts. No exceptions for executives or field staff."},
  INSURANCE_DEADLINE:{s:"high",p:2,t:"Work backwards from the insurance renewal",w:"The renewal date is your real deadline, and anything on the questionnaire you can't back up can void a claim.",d:"Get the questionnaire now and answer only what you can prove. Fix gaps in this order: MFA everywhere (hardware keys for anyone who won't use the app), a tested backup that can't be deleted, remote access behind VPN or MFA, EDR on every device, then phishing filtering and staff training. That list is usually what the insurer is really asking."},
  NO_EDR:{s:"med",p:3,t:"Move from antivirus to EDR",w:"Insurers now expect EDR, software that detects and stops attacks on each computer, not just antivirus.",d:"Price EDR for every computer and server. Most small-business plans are per device per month."},
  ACCESSIBILITY_LAW:{s:"med",p:3,t:"Check accessibility and language obligations",w:"Public bodies, federally regulated organizations and larger Ontario organizations can be required by law to meet the WCAG accessibility standard. Every language you add has to be maintained on every page.",d:a=>{const f=[...(a.f2||[]),...(a.h4||[])];let out=f.includes("lawunsure")?"To find out which law applies: federally regulated or 10+ staff under federal rules → Accessible Canada Act; a territorial or municipal body → your territory's accessibility or human-rights rules and the Yukon/GNWT digital standards; otherwise WCAG AA (the web accessibility standard) is expected even where no law names it. Then ":"Confirm which law applies, then ";return out+"decide which content must be in which languages (and who translates updates), and include an accessibility audit in scope."}},
  PDF_REMEDIATION:{s:"med",p:3,t:a=>hasType("F")(a)?"Old documents are the expensive part":a.h1==="no"?"Make a retention schedule before you move anything":"Dispose before you move",w:a=>{if(hasType("F")(a))return "Making legacy PDFs accessible or moving them with proper retention often costs more than the site itself.";const n=a.h3==="lots"?"Thousands":a.h3==="many"?"Hundreds":"Many";if(a.h1==="no")return `${n} of documents cost more to move than the platform does, and without a retention schedule nobody can say what may be kept, moved or disposed of.${hasCommunityData(a)?" For community records, disposal is the governing body's decision, not a migration shortcut.":""}`;return `${n} of documents cost more to move than the platform does, and many of them should be disposed of under the retention schedule rather than migrated.`},d:a=>{if(hasType("F")(a))return "Count the documents and decide what to remediate, convert, dispose of under your schedule, or retire.";if(a.h1==="no")return hasCommunityData(a)?"Draft a retention schedule with the governing body first; move nothing into a new system until it says what must be kept (copying records to safety is not moving them).":"Draft a simple retention schedule with your records officer first; count only what it says must move.";return `${a.h1==="yes"?"You've read the schedule: now":"Read the schedule, then"} mark what can be disposed of — with your records officer's sign-off — and count only what must move.`}},
  SECRETS_SPRAWL:{s:"high",p:1,t:"Move passwords to a shared manager and create emergency accounts",w:"Admin passwords in a spreadsheet or in one person's head are a security problem and a continuity problem. Without emergency admin accounts, one mistake can lock everyone out.",d:"Move to a password manager with shared vaults, and set up two tested emergency accounts kept offline."},
  NO_INVENTORY:{s:"med",p:3,t:"Build a basic inventory",w:"You can't protect, move or budget for what you don't know you have.",d:"List devices, software, accounts and subscriptions. A spreadsheet is fine to start."},
  MSP_TRANSITION:{s:"med",p:2,t:"Plan the provider handover",w:"Provider handovers take longer than anyone expects. Licences, domains, backups and admin accounts all have to transfer, all of their access has to be removed, and support can't lapse in between.",d:"Read the exit clause, list what they hold, agree a handover checklist, and sequence it so there's never a gap in cover."}
};

/* ===========================================================================
   QUESTIONS
   =========================================================================== */
export const DIMS = {lead:"Leadership & decisions",outcome:"Clear outcome",money:"Budget realism",time:"Timeline & capacity",data:"Data & current state",rules:"Privacy, records & rules",tech:"Technical readiness"};

export const TYPES = [
  {v:"A",l:"Email or Microsoft 365 / Google Workspace move"},
  {v:"B",l:"Servers, infrastructure, backup or network"},
  {v:"C",l:"Replacing or consolidating a core system (CRM, case/client, membership, lands/GIS, accounting, HR) — including moving off paper"},
  {v:"D",l:"AI or automation (Copilot, chatbots, Power Automate)"},
  {v:"E",l:"Security or compliance (incident, insurance, baseline)"},
  {v:"F",l:"Public website"},
  {v:"H",l:"Intranet, document management or records"},
  {v:"G",l:"IT operations (help desk, documentation, changing provider)"},
  {v:"X",l:"Not sure yet — help me figure out what this is"}
];
export const migrationType = a => hasType("C")(a);

export const STEPS = [
 {id:"org",title:"Your organization",intro:"Three quick ones first.",questions:[
  {id:"orgName",type:"text",label:"Organization name",help:"Optional. It goes on your brief."},
  {id:"orgType",type:"single",label:"What kind of organization are you?",why:"Government bodies, charities and Indigenous governments each have rules that change what we can buy and how long it takes.",dim:"rules",options:[
    {v:"np",l:"Nonprofit, charity or society",s:2},
    {v:"gov",l:"Government — territorial, municipal, hamlet, Crown corp, agency or board",s:2},
    {v:"indig",l:"First Nation, Inuit or Métis government or organization",s:2},
    {v:"biz",l:"Business",s:2},
    {v:"other",l:"Other — co-op, club, association, informal group",s:2}]},
  {id:"size",type:"single",label:"How many people use the systems involved?",help:"Staff, plus volunteers or members if they'd log in.",why:"How many people have to learn something new is most of what decides the cost.",dim:"time",options:[
    {v:"s1",l:"1–10",s:2},{v:"s2",l:"11–50",s:2},{v:"s3",l:"51–200",s:1},{v:"s4",l:"More than 200",s:1}]},
  {id:"conn",type:"multi",label:"What internet and access do your sites have?",help:"Pick all that apply.",why:"Whatever gets built has to work from your worst site, not your best one.",dim:"tech",options:[
    {v:"fibre",l:"Fibre, cable or fast DSL",s:2},
    {v:"cell",l:"Cellular or fixed wireless",s:1},
    {v:"leo",l:"Low-orbit satellite (Starlink, OneWeb)",s:1,flag:"LOW_BANDWIDTH"},
    {v:"geo",l:"Traditional satellite (slow, laggy)",s:0,flag:"LOW_BANDWIDTH"},
    {v:"outage",l:"Outages of a day or more a few times a year",s:0,flag:"LOW_BANDWIDTH"},
    {v:"fly",l:"Some sites are fly-in, winter-road or seasonal",s:1,flag:"LOW_BANDWIDTH"},
    {v:"unsure",l:"Not sure",s:1,unsure:true}]}
 ]},
 {id:"what",title:"What you're trying to do",intro:"Describe the job, not the tool.",questions:[
  {id:"types",type:"multi",label:"Which of these best describes the work?",help:"Pick all that apply; each adds three or four specific checks.",options:TYPES.map(t=>({v:t.v,l:t.l,s:2}))},
  {id:"problem",type:"textarea",label:"In plain words: what's the problem, and what will people be able to do when it's fixed?",help:"Two or three sentences. Add a number if you have one (hours a week, days to process, tickets a month). If you can't say what 'done' looks like yet, say so.",why:"If you can't say what done looks like, nobody can price it. Name the product if you like, but say what people need to do.",dim:"outcome",productCheck:true,emptyFlag:"NO_DONE"},
  {id:"trigger",type:"single",label:"Why now?",why:"Tells us whether the date is real, and what went wrong if someone tried before.",dim:"outcome",options:[
    {v:"ending",l:"Something is ending — a licence, contract, system, grant or key person",s:2},
    {v:"incident",l:"An incident, insurance requirement or audit finding",s:2},
    {v:"growth",l:"We have outgrown the current setup",s:2},
    {v:"mandate",l:"A funder, board or law requires it",s:2},
    {v:"window",l:"A funding window or date makes it possible now",s:2},
    {v:"retry",l:"A previous attempt stalled, broke or was abandoned",s:1,flag:"PAST_FAILURE"},
    {v:"idea",l:"New technology makes it possible; nothing is forcing it",s:1},
    {v:"unsure",l:"It just feels overdue",s:1,unsure:true}]}
 ]},
 /* ---------- project-type checks, immediately after the type is chosen ---------- */
 {id:"bA",title:"Email, identity and collaboration",intro:"Four checks for Microsoft 365 / Google Workspace moves.",showIf:hasType("A"),questions:[
  {id:"a1",type:"single",label:"Can someone in your organization log in to the domain registrar and a Global Admin account today?",help:"Registrar = where your domain name is paid for (GoDaddy, Namecheap, Web.com…). Global Admin = the top-level Microsoft 365 or Google login.",why:"If you can't get into these two accounts, nothing can start, and getting them back from a web host or an old contractor takes weeks.",dim:"tech",options:[
    {v:"yes",l:"Yes, both — bought directly or through a partner",s:2},
    {v:"host",l:"Yes, but it was sold by GoDaddy or a web host",s:1,flag:"KEYS"},
    {v:"no",l:"One of them, or they're with a former provider",s:0,flag:"KEYS"},
    {v:"locked",l:"Locked out of both, and it was sold by GoDaddy or a web host",s:0,flag:"KEYS"},
    {v:"unsure",l:"Not sure",s:0,unsure:true,flag:"KEYS"}]},
  {id:"a2",type:"single",label:"Did you have free Microsoft Business Premium or E1 licences, and do you know the renewal date?",showIf:isNP,why:"Microsoft stopped giving those licences away in 2025. If yours are donated, the renewal may be your real deadline.",dim:"money",options:[
    {v:"na",l:"Not applicable, or already planned for",s:2},{v:"yes",l:"Yes, haven't looked at it",s:0,flag:"LICENCE_CLIFF"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"LICENCE_CLIFF"}]},
  {id:"a3",type:"single",label:"Do you know how much email there is, and whether any printer, scanner or app sends email as you?",why:"Big mailboxes take days to move, and the photocopier that emails scans will stop working unless someone knows it's there.",dim:"tech",options:[
    {v:"yes",l:"Yes — sizes measured and senders listed",s:2},{v:"partly",l:"One of the two",s:1,flag:"MAIL_SCOPE"},{v:"no",l:"No",s:0,unsure:true,flag:"MAIL_SCOPE"}]},
  {id:"a4",type:"single",label:"Is there a backup of mail and files that's separate from Microsoft or Google?",why:"Microsoft and Google don't keep a copy for you. If something is deleted during the move, it's gone.",dim:"tech",options:[
    {v:"yes",l:"Yes",s:2},{v:"no",l:"No",s:0,flag:"NO_SAAS_BACKUP"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"NO_SAAS_BACKUP"}]}
 ]},
 {id:"bB",title:"Servers and infrastructure",intro:"Three checks for server, backup, network and cloud moves.",showIf:hasType("B"),questions:[
  {id:"b1",type:"multi",label:"Which of these are still in use?",why:"Anything out of support is a cost line, and usually the thing that sets the deadline.",dim:"tech",options:[
    {v:"none",l:"None of these",s:2},
    {v:"w10",l:"Windows 10 PCs",s:0,flag:"EOL_OS"},{v:"old",l:"A computer or server over 8 years old doing real work",s:0,flag:"EOL_OS"},{v:"srv",l:"Windows Server 2012/2016 or SQL Server 2016 or older",s:0,flag:"EOL_OS"},{v:"exch",l:"On-premises Exchange",s:0,flag:"EOL_OS"},{v:"vmw",l:"VMware (renewal priced or not)",s:0,flag:"EOL_OS"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"EOL_OS"}]},
  {id:"b2",type:"multi",label:"Which of these describe your backups?",help:"Pick all that apply.",why:"A backup that's never been restored is a guess. Ransomware deletes backups first.",dim:"tech",options:[
    {v:"good",l:"A restore was tested in the last six months",s:2},{v:"old",l:"A restore was tested, but over six months ago",s:1,flag:"UNTESTED_BACKUP"},{v:"reach",l:"An attacker on the network could reach or delete the backups",s:0,flag:"UNTESTED_BACKUP"},{v:"never",l:"Never tested, or there is no backup",s:0,flag:"UNTESTED_BACKUP"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"UNTESTED_BACKUP"}]},
  {id:"b3",type:"single",label:"Is remote desktop or any admin interface reachable directly from the internet?",help:"Remote desktop = logging into an office computer from home or the road. A VPN or MFA gateway is a locked front door you sign in through first.",why:"An open remote desktop is how most small organizations get ransomware, and insurers check for it.",dim:"tech",options:[
    {v:"no",l:"No — VPN or MFA gateway only",s:2},{v:"yes",l:"Yes",s:0,flag:"EXPOSED_RDP"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"EXPOSED_RDP"}]}
 ]},
 {id:"bC",title:"Replacing or consolidating a core system",intro:"Three checks. Works whether you're leaving a system, spreadsheets or paper.",showIf:hasType("C"),questions:[
  {id:"c1",type:"single",label:"What connects to the current setup, and is there a list of the reports people rely on?",why:"Every link to another system and every report people rely on has to be rebuilt by hand.",dim:"tech",options:[
    {v:"paper",l:"Nothing — we're on paper or spreadsheets",s:2},{v:"listed",l:"A few connections, and reports are listed",s:2},{v:"some",l:"A few connections, no report list",s:1,flag:"INTEGRATIONS"},{v:"many",l:"Several connections, no list",s:0,flag:"INTEGRATIONS"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"INTEGRATIONS"}]},
  {id:"c2",type:"single",label:"Can you get all of your data out of the current system, and do you know what history you must keep?",why:"Some vendors charge to give you your own data back, and some records have to be kept for years whether or not they move.",dim:"data",options:[
    {v:"paper",l:"We're on paper or spreadsheets, and we know what must be kept",s:2},{v:"paperunk",l:"We're on paper or spreadsheets; not sure what history we must keep",s:1,flag:"RETENTION"},{v:"yes",l:"Export confirmed and retention period known",s:2},{v:"export",l:"Export unclear or the vendor charges for it",s:0,flag:"EXPORT_RIGHTS"},{v:"keep",l:"Export is fine; not sure what history we must keep",s:1,flag:"RETENTION"},{v:"no",l:"Not sure about either",s:0,unsure:true,flag:"EXPORT_RIGHTS"}]},
  {id:"c3",type:"single",label:"If a vendor or partner will implement it, do you know how many organizations like yours they've done?",why:"A builder who hasn't done this for an organization like yours tends to rebuild your old problems in the new system.",dim:"tech",options:[
    {v:"yes",l:"Yes, with references",s:2},{v:"na",l:"No vendor chosen yet",s:2},{v:"vol",l:"A volunteer, member or relative has offered to build it",s:1,flag:"VOLUNTEER_BUILD"},{v:"no",l:"Not yet",s:1,flag:"PARTNER_RISK"}]}
 ]},
 {id:"bD",title:"AI and automation",intro:"Four checks. The expensive mistakes here are governance, not technology.",showIf:hasType("D"),questions:[
  {id:"d1",type:"single",label:"Do you know who can see what in the files, drives or databases the AI would touch?",why:"Copilot shows people whatever they already have permission to open, including the folder someone shared with Everyone by mistake.",dim:"tech",options:[
    {v:"yes",l:"Yes, permissions are reviewed",s:2},{v:"roughly",l:"Roughly",s:1,flag:"OVERSHARING"},{v:"no",l:"No",s:0,flag:"OVERSHARING"}]},
  {id:"d2",type:"multi",label:"Which of these describe how it would be used?",help:"Pick all that apply.",why:"You're responsible for what a chatbot tells people, and anything that decides about a person needs someone to sign off on it.",dim:"rules",options:[
    {v:"internal",l:"Internal drafting, summarising, reporting or search",s:2},
    {v:"accounts",l:"It would connect to records about people (clients, tenants, members, staff)",s:1,flag:"OVERSHARING"},
    {v:"people",l:"It helps decide things about people — eligibility, priority, hiring, services",s:0,flag:"AI_HIGH_RISK"},
    {v:"public",l:"Members of the public interact with it",s:0,flag:"AI_HIGH_RISK"},
    {v:"unsure",l:"Not decided",s:0,unsure:true}]},
  {id:"d3",type:"single",label:"Do you have an AI acceptable-use policy, and have you decided which roles would get a paid licence?",why:"Your staff are already using AI. The question is what they put into it, and who actually needs a paid seat.",dim:"rules",options:[
    {v:"both",l:"Policy in place and roles chosen",s:2},{v:"one",l:"One of the two",s:1,flag:"SHADOW_AI"},{v:"neither",l:"Neither yet",s:0,flag:"SHADOW_AI"}]},
  {id:"d4",type:"single",label:"Do you already have automations (Power Automate flows, scripts, Zapier) — and do any run under a person's account?",why:"A flow that runs under someone's login stops the day that login is disabled.",dim:"tech",options:[
    {v:"none",l:"No automations yet, or none under personal accounts",s:2},{v:"yes",l:"Yes, under a current staff member",s:1,flag:"SERVICE_ACCOUNTS"},{v:"departed",l:"Yes, under someone who has left (staff or consultant)",s:0,flag:"SERVICE_ACCOUNTS"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"SERVICE_ACCOUNTS"}]}
 ]},
 {id:"bE",title:"Security and compliance",intro:"Five checks. If something is happening right now, stop and get help first.",showIf:hasType("E"),questions:[
  {id:"e1",type:"single",label:"Is this in response to an incident, and is it contained?",why:"If it's still going on, we deal with that first.",dim:"tech",options:[
    {v:"no",l:"No incident — insurance, audit or baseline",s:2},{v:"nearmiss",l:"A near-miss (phishing, attempted fraud); nothing got in",s:2},{v:"contained",l:"Yes, contained, and we know how they got in",s:2},{v:"unknown",l:"Yes, contained, but we don't know how they got in",s:1,flag:"ROOT_CAUSE"},{v:"active",l:"Yes, and it may still be ongoing",s:0,flag:"ACTIVE_INCIDENT"}]},
  {id:"e2",type:"single",label:"Is multi-factor authentication on for every account — admins, remote access, executives, field staff, and any outside provider past or present?",why:"Missing MFA is the first thing an insurer checks. An old provider's forgotten admin account is the second.",dim:"tech",options:[
    {v:"all",l:"Everyone, no exceptions, and provider access is reviewed",s:2},{v:"exceptions",l:"Most, with exceptions (some staff refused, or providers unreviewed)",s:0,flag:"MFA_GAPS"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"MFA_GAPS"}]},
  {id:"e3",type:"single",label:"Is there a backup copy attackers couldn't delete, and has a restore been tested in the last six months?",why:"If the backup can be deleted by whoever gets in, it isn't a backup.",dim:"tech",options:[
    {v:"yes",l:"Yes to both",s:2},{v:"partly",l:"One of the two",s:1,flag:"UNTESTED_BACKUP"},{v:"no",l:"No, or not sure",s:0,flag:"UNTESTED_BACKUP"}]},
  {id:"e4",type:"multi",label:"Which of these apply to remote access and endpoint protection?",help:"Pick all that apply. EDR = software on each computer that detects and stops attacks, beyond antivirus.",why:"These are the two gaps insurers ask about by name.",dim:"tech",options:[
    {v:"good",l:"Remote access is behind VPN/MFA and EDR is on everything",s:2},{v:"rdp",l:"Some remote access is open to the internet",s:0,flag:"EXPOSED_RDP"},{v:"av",l:"Antivirus only, no EDR",s:1,flag:"NO_EDR"},{v:"unsure_rdp",l:"Not sure about remote access",s:0,unsure:true,flag:"EXPOSED_RDP"},{v:"unsure_edr",l:"Not sure about EDR",s:0,unsure:true,flag:"NO_EDR"}]},
  {id:"e5",type:"single",label:"When is your cyber-insurance renewal, and do you have the questionnaire?",why:"The renewal date is your real deadline, and the questionnaire tells you what to fix.",dim:"time",options:[
    {v:"have",l:"We have it and the date is more than 3 months away",s:2},{v:"soon",l:"We have it and the renewal is within 3 months",s:1,flag:"INSURANCE_DEADLINE"},{v:"date",l:"Know the date, not the questionnaire",s:1,flag:"INSURANCE_DEADLINE"},{v:"none",l:"No insurance, or not sure",s:0,flag:"INSURANCE_DEADLINE"}]}
 ]},
 {id:"bF",title:"Public website",intro:"Three checks. Ownership, languages and old documents are where these projects grow.",showIf:hasType("F"),questions:[
  {id:"f1",type:"single",label:"Who controls the domain, hosting and CMS logins?",help:"Domain = your web address; hosting = where the site lives; CMS = the system you edit it in (WordPress, Squarespace…).",why:"If an agency or a former helper holds these, getting them back can take weeks.",dim:"tech",options:[
    {v:"us",l:"We do, and they're documented",s:2},{v:"agency",l:"An agency, former provider, or a volunteer who has moved on",s:0,flag:"KEYS"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"KEYS"}]},
  {id:"f2",type:"multi",label:"Which of these apply?",help:"Pick all that apply.",why:"Some organizations are required by law to meet an accessibility standard, and every language you add has to be maintained on every page.",dim:"rules",options:[
    {v:"none",l:"Neither",s:2},
    {v:"law",l:"We're a public body, federally regulated, or an Ontario organization with 50+ staff",s:1,flag:"ACCESSIBILITY_LAW"},
    {v:"lawunsure",l:"Not sure whether an accessibility law applies to us",s:1,unsure:true,flag:"ACCESSIBILITY_LAW"},
    {v:"lang",l:"Content must be in more than one language",s:1,flag:"ACCESSIBILITY_LAW"}]},
  {id:"f3",type:"single",label:"Roughly how many PDFs and documents are on the site?",help:"Payments and member data are covered in the information question later.",why:"Making old PDFs accessible often costs more than the site itself.",dim:"tech",options:[
    {v:"few",l:"Under 50",s:2},{v:"many",l:"50–500",s:1,flag:"PDF_REMEDIATION"},{v:"lots",l:"More than 500",s:0,flag:"PDF_REMEDIATION"},{v:"unsure",l:"No idea",s:0,unsure:true,flag:"PDF_REMEDIATION"}]}
 ]},
 {id:"bH",title:"Intranet, documents and records",intro:"Three checks. Retention and old documents are where these projects grow.",showIf:hasType("H"),questions:[
  {id:"h1",type:"single",label:"Is there a records retention schedule, and do you know who signs off on disposing of records?",why:"Without a schedule, nobody can say what has to be kept and what can go.",dim:"rules",options:[
    {v:"yes",l:"Yes, and I've read it",s:2},{v:"exists",l:"One exists; I haven't read it",s:1,flag:"RETENTION"},{v:"no",l:"No, or not sure",s:0,flag:"RETENTION"}]},
  {id:"h2",type:"single",label:"Who controls the platform this will live on (SharePoint, file servers, intranet)?",why:"If someone else runs the platform, their rules and their queue set the pace.",dim:"tech",options:[
    {v:"us",l:"We do, or our IT is part of this project",s:2},{v:"it",l:"A separate IT department I don't control",s:1,flag:"INVOLVE_IT"},{v:"provider",l:"An outside provider",s:1},{v:"unsure",l:"Not sure",s:0,unsure:true}]},
  {id:"h3",type:"single",label:"Roughly how many documents would move?",why:"Moving documents costs by the hundred, and a lot of them probably shouldn't move at all.",dim:"money",options:[
    {v:"few",l:"Under 100",s:2},{v:"many",l:"Hundreds",s:1,flag:"PDF_REMEDIATION"},{v:"lots",l:"Thousands or more",s:0,flag:"PDF_REMEDIATION"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"PDF_REMEDIATION"}]},
  {id:"h4",type:"multi",label:"Which of these apply?",help:"Pick all that apply. Retention labels automatically keep or delete documents on a schedule; a legal hold freezes documents for a lawsuit or investigation.",why:"Automatic retention and legal holds need higher-tier licences for every user; accessibility law and languages add work to every page.",dim:"rules",options:[
    {v:"none",l:"None of these",s:2},
    {v:"holds",l:"We need automatic retention labels or legal holds",s:1,flag:"PDF_REMEDIATION"},
    {v:"law",l:"We're a public body or federally regulated (accessibility law applies)",s:1,flag:"ACCESSIBILITY_LAW"},
    {v:"lang",l:"Content must be in more than one language",s:1,flag:"ACCESSIBILITY_LAW"},
    {v:"unsure",l:"Not sure",s:1,unsure:true}]}
 ]},
 {id:"bG",title:"IT operations",intro:"Three checks. From 'one person who knows everything' to something that survives a holiday.",showIf:hasType("G"),questions:[
  {id:"g1",type:"single",label:"Where are admin passwords stored, and are there tested emergency admin accounts?",why:"Passwords in one head or a spreadsheet are a security and continuity risk.",dim:"tech",options:[
    {v:"good",l:"A shared password manager, and two tested emergency accounts",s:2},{v:"manager",l:"A password manager, no emergency accounts",s:1,flag:"SECRETS_SPRAWL"},{v:"doc",l:"A spreadsheet, document, or one person's head",s:0,flag:"SECRETS_SPRAWL"}]},
  {id:"g2",type:"single",label:"Is there an up-to-date list of devices, software, accounts and subscriptions?",why:"You can't protect, migrate or budget for what you don't know you have.",dim:"data",options:[
    {v:"yes",l:"Yes",s:2},{v:"partial",l:"Partial",s:1,flag:"NO_INVENTORY"},{v:"no",l:"No",s:0,flag:"NO_INVENTORY"}]},
  {id:"g3",type:"single",label:"Are you joining, changing or leaving a provider, and do you know the exit terms?",why:"Handovers take longer than expected, and support can't lapse in between.",dim:"time",options:[
    {v:"no",l:"No change",s:2},{v:"known",l:"Yes, exit terms understood",s:2},{v:"yes",l:"Yes, haven't read the contract",s:0,flag:"MSP_TRANSITION"}]}
 ]},
 /* ---------- Indigenous data governance ---------- */
 {id:"bI",title:"Community data governance",intro:"Because the work touches data about First Nations, Inuit or Métis people.",showIf:hasCommunityData,questions:[
  {id:"i1",type:"single",label:"Whose data is it, and have they been asked?",why:"Data about a community belongs to that community. Moving it or analysing it is their decision, not a consultant's.",dim:"rules",options:[
    {v:"ours",l:"We are the governing body",s:2},
    {v:"agreed",l:"Another Nation or organization governs it and has agreed",s:2},
    {v:"many",l:"We serve members of many Nations; it rests on each client's consent",s:2,flag:"DATA_GOV_CONSENT"},
    {v:"notasked",l:"We know whose it is but haven't asked yet",s:0,flag:"DATA_GOV_OWNER"},
    {v:"unsure",l:"Not sure who governs it",s:0,unsure:true,flag:"DATA_GOV_OWNER"}]},
  {id:"i2",type:"single",label:"Is there a written data-governance agreement, protocol or consent framework?",showIf:a=>a.i1!=="many",why:"If it isn't written down, every later question about hosting, backups or AI becomes a new negotiation.",dim:"rules",options:[
    {v:"yes",l:"Yes — ownership, access, storage, use and return are written down",s:2},
    {v:"partial",l:"Some of it (a research protocol, ethics approval or consent form)",s:1,flag:"DATA_GOV_AGREEMENT"},
    {v:"no",l:"No",s:0,flag:"DATA_GOV_AGREEMENT"}]},
  {id:"i3",type:"single",label:"Where must the data physically live, and who holds the admin keys?",showIf:a=>a.i1!=="many",why:"Where the data physically sits, and who holds the admin login, is part of what OCAP means by possession.",dim:"rules",options:[
    {v:"decided",l:"Decided with the governing body, and it's a contract condition",s:2},
    {v:"discussed",l:"Discussed, not settled",s:1,flag:"DATA_GOV_POSSESSION"},
    {v:"no",l:"Not considered yet",s:0,flag:"DATA_GOV_POSSESSION"}]},
  {id:"i4",type:"single",label:"Will any AI or automation tool process this data?",why:"AI tools copy and index what they touch. Whether that's allowed is the governing body's call.",dim:"rules",options:[
    {v:"no",l:"No",s:2},{v:"consent",l:"Yes, with the governing body's informed agreement on what and how",s:2},{v:"yes",l:"Yes or maybe — not agreed yet",s:0,flag:"DATA_GOV_AI"}]}
 ]},
 /* ---------- outcome and decisions ---------- */
 {id:"success",title:"Outcome and decisions",intro:"The part a consultant can't do for you.",questions:[
  {id:"sponsor",type:"single",label:"Who backs this and can say \"yes, this is done\"?",why:"Projects stall when no one can say yes. We need a name, not a committee.",dim:"lead",options:[
    {v:"me",l:"Me — I own or run the organization and decide alone",s:2},
    {v:"yes",l:"A named senior person who'll give it a few hours a month",s:2},
    {v:"council",l:"Council, board or committee, with one named delegate",s:2},
    {v:"nominal",l:"Someone on paper, but stretched or with no delegate",s:1,flag:"NO_SPONSOR"},
    {v:"no",l:"Not really — it's being driven from below",s:0,flag:"NO_SPONSOR"}]},
  {id:"approver",type:"single",label:"Who approves the spending, and how quickly?",showIf:a=>!soloDecider(a),why:"If spending needs a meeting, every decision waits for the next one.",dim:"lead",options:[
    {v:"exec",l:"An executive, within days",s:2},
    {v:"execboard",l:"An executive up to a limit; the board above that",s:2},
    {v:"monthly",l:"A board, council or committee that meets monthly",s:1},
    {v:"two",l:"Monthly, but decisions usually take two meetings",s:0,flag:"SLOW_APPROVAL"},
    {v:"quarterly",l:"A board, council or committee that meets quarterly or less",s:0,flag:"SLOW_APPROVAL"},
    {v:"unsure",l:"Not sure",s:0,unsure:true,flag:"NO_SPONSOR"}]},
  {id:"owner",type:"single",label:"Who runs this day to day, and how many hours a week can they really give it?",why:"Someone on your side has to make decisions every week. If that's on top of a full job, the project runs on evenings.",dim:"time",options:[
    {v:"freed",l:"A named person with hours freed from other duties",s:2},
    {v:"hired",l:"Someone hired for it who hasn't started yet",s:2},
    {v:"me",l:"Me, fitted around running the organization",s:1},
    {v:"ontop",l:"A named person, on top of their normal job",s:1,flag:"NO_OWNER"},
    {v:"little",l:"Someone, but under 2 hours a week",s:0,flag:"NO_OWNER"},
    {v:"no",l:"No one yet",s:0,flag:"NO_OWNER"}]}
 ]},
 /* ---------- money and time ---------- */
 {id:"money",title:"Money and time",intro:"Rough numbers are fine.",questions:[
  {id:"budget",type:"single",label:"What's your working budget range for this phase (one-time, CAD)?",why:"A rough range tells a consultant whether to propose the whole thing or a first phase. It isn't a ceiling.",dim:"money",options:[
    {v:"<2k",l:"Under $2,000",s:2},{v:"2-10k",l:"$2,000–10,000",s:2},{v:"10-30k",l:"$10,000–30,000",s:2},{v:"30-100k",l:"$30,000–100,000",s:2},{v:"100-250k",l:"$100,000–250,000",s:2},{v:"250k+",l:"Over $250,000",s:2},
    {v:"unsure",l:"No idea yet, or I don't hold the budget",s:0,unsure:true,sureFlag:true,flag:"NO_BUDGET"}]},
  {id:"funding",type:"single",label:"Where does the money come from, and is it approved?",why:"Grant money has an end date, and money that isn't approved yet changes what's worth proposing.",dim:"money",options:[
    {v:"operating",l:"Operating budget or reserves, approved",s:2},
    {v:"expected",l:"Operating budget or reserves, expected but not yet approved",s:1},
    {v:"grant",l:"A grant or one-time funding with a spend-by date",s:1,flag:"GRANT_FUNDED"},
    {v:"capital",l:"A capital or business-case process still to come",s:1},
    {v:"unsure",l:"Not decided, or not mine to decide",s:0,unsure:true}]},
  {id:"lines",type:"multi",label:"Besides software and the consultant, which of these are in the budget?",help:"Tick what's actually there.",showIf:a=>(hasType("C")(a)||hasType("H")(a)||hasType("A")(a)||hasType("F")(a))&&!(tiny(a)&&(isBiz(a)||a.orgType==="other"))&&!["<2k","2-10k"].includes(a.budget),why:"This is where projects actually go over: not the software, the work around it.",dim:"money",options:[
    {v:"training",l:"Staff time and training hours",s:1},
    {v:"cleanup",l:"Data cleanup before migration",s:1,showIf:migrationType},
    {v:"overlap",l:"Running old and new side by side",s:1,showIf:migrationType},
    {v:"translate",l:"Translation and content work",s:1,showIf:a=>hasType("F")(a)||hasType("H")(a)},
    {v:"contingency",l:"Contingency of 10–20%",s:1},
    {v:"travel",l:"Travel to sites",s:1,showIf:a=>(a.conn||[]).includes("fly")||a.size==="s3"||a.size==="s4"},
    {v:"na",l:"Not applicable — too small to need these",s:1},
    {v:"none",l:"None of these yet",s:0,flag:"SOFTWARE_ONLY_BUDGET"},
    {v:"unsure",l:"Not sure what's in it",s:0,unsure:true}]},
  {id:"ongoing",type:"single",label:"Are the ongoing costs — subscriptions, support, renewals — covered for the years after the project?",showIf:a=>!(a.funding==="operating"&&(isBiz(a)||isPub(a))),why:"The project pays for the build. Someone has to keep paying for it after.",dim:"money",options:[
    {v:"yes",l:"Yes, in the operating budget",s:2},{v:"partly",l:"Partly, or it relies on donated licences",s:1,flag:"NO_ONGOING"},{v:"no",l:"No, only the project is funded",s:0,flag:"NO_ONGOING"},{v:"unsure",l:"Not sure",s:0,unsure:true,flag:"NO_ONGOING"}]},
  {id:"deadline",type:"single",label:"Is there a date this must be done by?",why:"A hard date is where testing gets cut. Better to plan a first phase that meets it.",dim:"time",options:[
    {v:"none",l:"No fixed date, or a preference that could move",s:2},
    {v:"hard12",l:"A hard date more than a year away",s:2,flag:"HARD_DEADLINE"},
    {v:"hard6",l:"A hard date 6–12 months away",s:1,flag:"HARD_DEADLINE"},
    {v:"hard3",l:"A hard date 3–6 months away",s:0,flag:"DEADLINE_SOON"},
    {v:"hard0",l:"A hard date under 3 months away",s:0,flag:"DEADLINE_SOON"}]},
  {id:"deadlineText",type:"text",label:"What is the date and what drives it?",showIf:a=>a.deadline&&a.deadline!=="none"},
  {id:"pubChecks",type:"multi",label:"Which of these have been checked with the right person?",help:"Tick the ones done or confirmed not to apply. Indigenous governments: your own policies apply.",showIf:a=>isPub(a)||isIndig(a),why:"Each of these takes weeks or months, and they can't start until someone asks.",dim:"rules",options:[
    {v:"procure",l:"Procurement rules and thresholds",s:1},
    {v:"pia",l:"Whether a privacy impact assessment is needed (or one already covers this)",s:1},
    {v:"records",l:"Records retention and what may be deleted",s:1},
    {v:"union",l:"Union notice if duties or positions change",s:1},
    {v:"none",l:"None of these yet",s:0,flag:"PUBLIC_RULES"}]}
 ]},
 /* ---------- current state ---------- */
 {id:"now",title:"Where you are now",intro:"Honest answers beat confident ones.",questions:[
  {id:"support",type:"single",label:"Who looks after IT today, and could someone else get in tomorrow?",why:"This is the first thing a consultant asks. One person, or a provider, holding all the keys is a risk every project inherits.",dim:"data",options:[
    {v:"good",l:"IT staff or a provider; we hold our own admin accounts and a systems list",s:2},
    {v:"it",l:"A separate IT department that I don't control",s:2,flag:"INVOLVE_IT"},
    {v:"msp_keys",l:"A provider who holds the keys (domain, licences, admin)",s:1,flag:"KEYS"},
    {v:"one_doc",l:"One person; partly written down; a second person can get in",s:1},
    {v:"one_nodoc",l:"One person; nothing written down; nobody else can get in",s:0,flag:"KEY_PERSON"},
    {v:"me",l:"Me — I'm the whole IT department",s:0,flag:"KEY_PERSON"},
    {v:"mixed",l:"Mixed or ad hoc — a staff member plus whoever we call",s:1,flag:"NO_IT_SUPPORT"},
    {v:"nobody",l:"Nobody really",s:0,flag:"NO_IT_SUPPORT"}]},
  {id:"data",type:"single",label:"How well do you know the data that would move?",help:"Including every spreadsheet, inbox and laptop holding the same information.",showIf:migrationType,why:"How much there is, where it lives and how messy it is sets the price more than anything else.",dim:"data",options:[
    {v:"clean",l:"Counted records and sources; under 10% duplicated or stale",s:2},
    {v:"counted",l:"Counted, but a lot of it is messy",s:1,flag:"DIRTY_DATA"},
    {v:"rough",l:"A rough idea",s:1,flag:"DATA_UNKNOWN"},
    {v:"departed",l:"A rough idea, and some of it sits on departed staff's laptops or drives",s:0,flag:"DATA_UNKNOWN"},
    {v:"no",l:"No idea",s:0,unsure:true,flag:"DATA_UNKNOWN"}]},
  {id:"personal",type:"multi",label:"What kinds of information will the work touch?",showIf:a=>{const T=a.types||[];return !(T.length&&T.every(t=>["E","G"].includes(t)))},why:"What kind of information this touches decides which tools are even allowed. If there's a breach, it's your problem, not the vendor's.",dim:"rules",options:[
    {v:"none",l:"No personal information",s:2},
    {v:"basic",l:"Staff or contact details",s:2,flag:"SENSITIVE_DATA"},
    {v:"donor",l:"Donor, member, tenant, guest or client records",s:1,flag:"SENSITIVE_DATA"},
    {v:"health",l:"Health, disability or accessibility needs, children's, justice or social-services records",s:0,flag:"SENSITIVE_DATA"},
    {v:"financial",l:"Payment or financial details",s:1,flag:"SENSITIVE_DATA"},
    {v:"id",l:"ID documents or card numbers (passports, credit cards)",s:0,flag:"SENSITIVE_DATA"},
    {v:"pay",l:"Online payments or sign-ups through a website",s:1,flag:"SENSITIVE_DATA"},
    {v:"corr",l:"Correspondence that may contain anything (letters to a minister, complaints)",s:1,flag:"SENSITIVE_DATA"},
    {v:"community",l:"Data about First Nations, Inuit or Métis communities or members",s:1}]},
  {id:"after",type:"single",label:"Who looks after the result afterwards, and how will people learn it?",showIf:a=>{const T=a.types||[];return !(a.support==="me"&&a.owner==="me")&&!(T.length&&T.every(t=>t==="E"))},why:"Systems nobody owns stop getting used within a year. Training is the first thing cut and the main reason.",dim:"time",options:[
    {v:"named",l:"A named role with time budgeted, and real training time per person",s:2},
    {v:"namedno",l:"A named person, but no training time planned",s:1,flag:"NO_AFTER_OWNER"},
    {v:"me",l:"Me, and I'll learn it as I go",s:1},
    {v:"same",l:"Whoever does IT now, and an hour or two of training",s:1,flag:"NO_AFTER_OWNER"},
    {v:"nobody",l:"Haven't decided; people will pick it up",s:0,flag:"NO_AFTER_OWNER"}]}
 ]}
];

export const PRODUCT_WORDS=["salesforce","microsoft 365","m365","office 365","google workspace","sharepoint","copilot","chatgpt","dynamics","raiser's edge","raisers edge","bloomerang","keela","civicrm","quickbooks","sage","topdesk","jira","freshservice","zendesk","hubspot","power apps","power automate","intune","azure","aws","workday","bamboohr","wordpress","squarespace","drupal","wix"];
export const EXCLUSIVE=new Set(["none","na","unsure","internal"]);
