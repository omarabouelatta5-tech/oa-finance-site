// All content comes from Omar_Abouelatta_Portfolio.pdf

export const site = {
  name: "Omar Abouelatta",
  email: "omarabouelatta5@gmail.com",
  whatsapp: "+971 50 681 5365",
  phone: "+66 61 518 8772",
  linkedin: "in/omar-abouelatta",
  linkedinUrl: "https://www.linkedin.com/in/omar-abouelatta",
  location: "Chanthaburi, Thailand",
};

export const brand = {
  tagline: "Clean books. Calmer month-ends.",
  goal: "Keep your ledgers clean, so closing the month feels calm.",
};

// Home page: four headline services (circle cards)
export const homeServices = [
  {
    icon: "ap",
    title: "Accounts Payable",
    body: "Invoice receipt, 3-way PO match, approvals, payment runs and supplier-statement reconciliation, so vendors get paid on time.",
  },
  {
    icon: "ar",
    title: "Receivables & Collections",
    body: "City ledger billing checked against contracts, structured follow-up and payment plans that bring cash in faster.",
  },
  {
    icon: "payroll",
    title: "Payroll & Cash Control",
    body: "Payroll inputs verified with HR, multi-currency deposits, petty cash and audit-ready documentation.",
  },
  {
    icon: "auto",
    title: "Accounting Automation",
    body: "n8n workflows that do the checking and matching, while a person still approves everything that goes out.",
  },
];

// Results slider (all figures from the portfolio)
export const results = [
  { big: "45 → 30", unit: "days DSO", text: "City ledger billing and collections for 50+ travel agents and corporates, with a 95% collection rate.", where: "Accounts Receivable · Centara Mirage Beach Resort, Dubai" },
  { big: "15% → 5%", unit: "overdue invoices", text: "Overdue vendor invoices cut within 3 months, across 500–600 invoices a month and 250–300 vendors.", where: "Accounts Payable · Centara Mirage Beach Resort, Dubai" },
  { big: "<0.5%", unit: "payroll error rate", text: "Payroll inputs for 300–500 employees verified with HR against authorization forms.", where: "Paymaster · Centara Mirage Beach Resort, Dubai" },
  { big: "0", unit: "unreconciled variances", text: "Daily multi-currency deposits (AED, USD, EUR) from 6+ outlets, with zero unreconciled variances over 15 months.", where: "General Cashier · Centara Mirage Beach Resort, Dubai" },
  { big: "−35%", unit: "aged 60+ balances", text: "Aged receivables brought down while credit-card payments, commissions and VAT on commission were posted with 100% accuracy.", where: "Accounts Receivable · Centara Mirage Beach Resort, Dubai" },
];

export const process = [
  { n: "01", title: "Free consultation", body: "A short call about your books, your systems and what is taking up your team's time." },
  { n: "02", title: "Review & clean-up", body: "Ledgers, aging and reconciliations reviewed, and open items cleared before anything new is built." },
  { n: "03", title: "Set up & automate", body: "The right routine in Xero, QuickBooks or your ERP, and n8n workflows where they save real hours." },
  { n: "04", title: "Monthly support", body: "Reconciliations, reports and a calm month-end close, on schedule, every month." },
];

export const stats = [
  { value: 6, suffix: "+", label: "years in hotel & resort finance (UAE and Egypt)" },
  { value: 500, suffix: "+", label: "vendor invoices a month (500–600), 90–95% paid on time" },
  { value: 30, from: 45, suffix: "", arrow: true, label: "days DSO, with a 95% collection rate on city ledger" },
  { value: 0.5, prefix: "<", suffix: "%", decimals: 1, label: "payroll error rate as Paymaster for 300–500 employees" },
];

export const tags = [
  "Arabic — Native",
  "English — Fluent",
  "B.Com, Accounting",
  "Xero Certified Specialist L3",
  "General Cashier & Paymaster",
];

export type Service = {
  tag: string;
  title: string;
  body: string;
  metric: string;
  group: "accounting" | "automation" | "software";
  featured?: boolean;
};

export const groups = [
  {
    id: "accounting",
    label: "Accounting",
    intro:
      "Hands-on accounting for hotels, resorts and any business that needs clean ledgers, on-time payments and a calm month-end.",
  },
  {
    id: "automation",
    label: "Accounting Automation · n8n",
    intro:
      "n8n workflows built by an accountant, for accountants: they do the checking and matching, and a person still approves what goes out.",
  },
  {
    id: "software",
    label: "Software",
    intro:
      "Day-to-day work in the systems finance teams already run, from cloud bookkeeping to hotel PMS and point-of-sale.",
  },
] as const;

export const services: Service[] = [
  // Accounting
  {
    group: "accounting",
    featured: true,
    tag: "AP · Full cycle",
    title: "Accounts Payable",
    body: "Invoice receipt, 3-way PO match, approval, ERP posting, payment runs and supplier-statement reconciliation, so vendors get paid on time and nothing slips.",
    metric: "Overdue invoices cut from 15% to 5% in 3 months",
  },
  {
    group: "accounting",
    tag: "AR · Credit control",
    title: "Accounts Receivable & Collections",
    body: "City ledger billing checked against contracts, structured follow-up and payment plans for travel agents and corporate accounts.",
    metric: "DSO 45 → 30 days · aged 60+ balances down 35%",
  },
  {
    group: "accounting",
    tag: "Payroll · Cash",
    title: "Paymaster & Payroll",
    body: "Payroll inputs verified with HR against authorization forms, plus weekly variance, overtime and payroll reports for finance leadership.",
    metric: "300–500 employees · error rate below 0.5%",
  },
  {
    group: "accounting",
    tag: "Reconciliation",
    title: "Bank, Vendor & Card Reconciliations",
    body: "Multi-account bank reconciliations, supplier statements, credit-card settlements, commissions and VAT on commission, resolved before close.",
    metric: "3 bank accounts · 10–15 discrepancies cleared monthly",
  },
  {
    group: "accounting",
    tag: "Close · Reporting",
    title: "Month-End Closing & Reporting",
    body: "Accruals, prepayments, journal entries and GL posting, with aging, DSO, cash-receipt and credit-memo reports delivered on schedule.",
    metric: "100% of bank credits posted before closing",
  },
  {
    group: "accounting",
    tag: "Cash · Controls",
    title: "Cash Control & Audit Support",
    body: "Multi-currency deposits, petty cash and due backs, plus audit-ready documentation and internal controls for internal and external audits.",
    metric: "Zero unreconciled variances over 15 months",
  },
  // Automation
  {
    group: "automation",
    featured: true,
    tag: "n8n · Intake",
    title: "Finance Data Intake",
    body: "Excel files and e-mail attachments pulled in automatically, with English or Arabic headers, and stored in structured data tables ready to work with.",
    metric: "Gmail · Excel · upload forms · data tables",
  },
  {
    group: "automation",
    tag: "n8n · Matching",
    title: "Automated Reconciliations",
    body: "Statements vs invoices, bank receipts vs statements with payment allocation, and card batches vs bank settlement, with commission checked against the agreed rate.",
    metric: "SOA · bank · POS card batches",
  },
  {
    group: "automation",
    tag: "n8n · AR control",
    title: "Invoice & Contract Checks",
    body: "Every invoice rate and promotion checked against the contract terms, and wrong invoices held before they ever reach the client.",
    metric: "Period · room type · rate · extras",
  },
  {
    group: "automation",
    tag: "n8n · Credit",
    title: "Aging & Credit Control",
    body: "Daily aging with a reason for every overdue item, credit-limit control, and invoices dispatched per contract terms with escalating reminders.",
    metric: "Due dates · reminders · credit limits",
  },
  {
    group: "automation",
    tag: "n8n · Reporting",
    title: "Excel Reports & Closing Packs",
    body: "Ready-to-use Excel reports and month-end closing packs for finance, plus posting sheets for the team. The workflow never writes to your system on its own.",
    metric: "Excel · Google Sheets",
  },
  {
    group: "automation",
    tag: "AI · Human-in-the-loop",
    title: "AI-Drafted Summaries & E-mails",
    body: "Google Gemini drafts the manager summary and customer e-mails. Nothing is sent until a manager approves it.",
    metric: "Google Gemini · approval step",
  },
  // Software
  {
    group: "software",
    featured: true,
    tag: "Certified · Level 3",
    title: "Xero Bookkeeping",
    body: "Bookkeeping, bank reconciliation and reporting in Xero, backed by all three Xero certifications.",
    metric: "Xero Certified Specialist · valid until 2027",
  },
  {
    group: "software",
    tag: "Cloud accounting",
    title: "QuickBooks Bookkeeping",
    body: "Recording transactions, reconciling accounts and producing reports in QuickBooks for small businesses.",
    metric: "QuickBooks Online",
  },
  {
    group: "software",
    tag: "Hotel ERP",
    title: "Sun Systems Posting",
    body: "AP and GL posting, journal entries and month-end work in Sun Systems, the finance ERP used across many hotel groups.",
    metric: "GL · AP · journals",
  },
  {
    group: "software",
    tag: "Hotel PMS",
    title: "Opera PMS — AR & City Ledger",
    body: "City ledger and guest ledger work in Opera: billing, credit-card and commission postings, and clearing aged accounts.",
    metric: "Opera AR ledger · Micros POS",
  },
  {
    group: "software",
    tag: "Advanced Excel",
    title: "Excel Reports & Dashboards",
    body: "Pivot tables, VLOOKUP and aging dashboards that turn raw ledger exports into reports managers can act on.",
    metric: "Pivot tables · VLOOKUP · aging dashboards",
  },
  {
    group: "software",
    tag: "Google Workspace · AI",
    title: "Sheets, Gmail & Gemini",
    body: "Google Sheets reporting, Gmail automation and Google Gemini for drafting summaries, connected together with n8n.",
    metric: "Google Sheets · Gmail · Gemini · n8n",
  },
];

export const project = {
  tag: "Portfolio project · 50-node workflow",
  title: "Hotel AR Automation for Opera PMS",
  chips: ["n8n", "Gmail", "Google Gemini", "Excel"],
  bullets: [
    "Reads the Opera AR ledger, bank statements, SOAs, sales contracts and POS card batches from e-mail or an upload form.",
    "Daily AR control: checks each invoice rate and promotion against the contract and holds wrong invoices before they're sent.",
    "Reconciles SOA vs invoices, bank receipts with payment allocation, and credit cards from POS batch to bank settlement.",
    "Aging with a reason for every invoice over 60 days, credit-limit control and a month-end closing pack in Excel.",
    "Gemini drafts the AR manager summary and customer e-mails. Nothing goes out before the manager approves.",
  ],
  invoice: {
    id: "DEMO-20481",
    title: "Corporate account · 3 nights",
    lines: [
      { label: "Room · Deluxe King × 3", contract: 360, invoiced: 425, mismatch: true },
      { label: "Extra adult × 3", contract: 60, invoiced: 60 },
      { label: "Breakfast package", contract: 45, invoiced: 45 },
    ],
    why: "A long-stay promotion applies to these dates but wasn't posted. The invoice is held and corrected before the client ever sees it.",
  },
  personal: {
    tag: "Personal project",
    title: "AI Screening & Reporting Workflow",
    body: "Collects listings from 16 online sources, scores each one with Gemini against set criteria, removes duplicates with a data table, generates PDF documents and e-mails a formatted daily report.",
    flow: ["16 sources", "Gemini score", "De-dupe", "PDF + e-mail"],
  },
};

export const experience = [
  {
    dates: "Aug 2025 — Oct 2026",
    place: "Dubai, UAE",
    role: "Accounts Payable Executive (Acting)",
    company: "Centara Mirage Beach Resort",
    current: true,
    bullets: [
      "500–600 vendor invoices a month across 250–300 vendors through the full AP cycle, 90–95% paid on time.",
      "Overdue invoices reduced from 15% to 5% within 3 months.",
      "Bank reconciliations across 3 accounts; zero major AP audit findings.",
      "20+ vendor disputes resolved monthly; recurring complaints down 40%.",
    ],
    note: "Official title: General Cashier & Paymaster, entrusted with the full AP Executive role",
  },
  {
    dates: "Apr 2024 — Oct 2026",
    place: "Dubai, UAE",
    role: "General Cashier & Paymaster",
    company: "Centara Mirage Beach Resort",
    bullets: [
      "Daily multi-currency deposits (AED, USD, EUR) from 6+ outlets with zero unreconciled variances over 15 months.",
      "Payroll inputs for 300–500 employees with an error rate below 0.5%.",
      "Weekly variance, overtime and payroll reports to the Hotel Controller and Director of Finance.",
      "Petty cash and due backs reconciled within 24 hours.",
    ],
  },
  {
    dates: "Jul 2022 — Mar 2024",
    place: "Dubai, UAE",
    role: "Accounts Receivable Clerk",
    company: "Centara Mirage Beach Resort",
    bullets: [
      "City ledger billing and collections for 50+ travel agents and corporates: 95% collection rate, DSO from 45 to 30 days.",
      "Credit-card payments, commissions and VAT on commission posted with 100% accuracy.",
      "Aged 60+ day balances reduced by 35%.",
    ],
  },
  {
    dates: "Sep 2021 — Jun 2022",
    place: "Marsa Alam, Egypt",
    role: "Accounts Receivable Specialist",
    company: "Iberotel Costa Mares",
    bullets: [
      "Monthly invoicing checked against contracts for 30+ tour operator and corporate accounts.",
      "Contractual billing discrepancies reduced by 25%.",
      "Collections, account reconciliations and AR month-end closing.",
    ],
  },
  {
    dates: "Sep 2019 — Sep 2021",
    place: "Sharm El Sheikh, Egypt",
    role: "Accounts Receivable Accountant",
    company: "Steigenberger Alcazar Hotel",
    bullets: [
      "Verified and posted receivables and reconciled the AR ledger.",
      "Resolved billing issues and reported status to management.",
      "Cleared 15+ aged guest and city ledger accounts during annual audit preparation.",
    ],
  },
];

export const earlyCareer = [
  { role: "Customer Service Specialist", where: "Awlad Ragab, Cairo", years: "2016–2017" },
  { role: "Cashier", where: "Jaz Almaza Beach Resort, Marsa Matruh", years: "2014–2015" },
];

export const tools = [
  { name: "Xero", note: "Certified Specialist, Level 3", certified: true },
  { name: "QuickBooks", note: "Cloud bookkeeping" },
  { name: "Sun Systems", note: "Finance ERP · AP & GL posting" },
  { name: "Opera PMS", note: "Hotel AR, city & guest ledger" },
  { name: "Micros POS", note: "Outlet sales & card batches" },
  { name: "Microsoft Excel", note: "Advanced: pivots, VLOOKUP, dashboards" },
  { name: "n8n", note: "Workflow automation" },
  { name: "Google Gemini", note: "AI drafting & scoring" },
  { name: "Google Sheets", note: "Reporting & data tables" },
  { name: "Gmail", note: "E-mail automation" },
];

export const credentials = {
  certs: [
    { name: "Xero Certified Specialist — Level 3", org: "Xero", date: "2026 · Valid to 2027", hot: true },
    { name: "Xero Certified Professional — Level 2", org: "Xero", date: "2026 · Valid to 2027", hot: true },
    { name: "Xero Certified Associate — Level 1", org: "Xero", date: "2026 · Valid to 2027", hot: true },
    { name: "Professionalism in the Office", org: "Alison", date: "2022" },
    { name: "Time Management Mastery", org: "Alison", date: "2022" },
  ],
  edu: [
    { name: "Bachelor of Commerce, Accounting", org: "Faculty of Commerce, English Section", date: "2018" },
    { name: "Arabic", org: "Native", date: "Language" },
    { name: "English", org: "Fluent", date: "Language" },
  ],
};

// Career map (globe)
export const places = [
  { name: "Marsa Matruh", lat: 31.35, lon: 27.24, years: "2014–15" },
  { name: "Cairo", lat: 30.04, lon: 31.24, years: "2016–17" },
  { name: "Sharm El Sheikh", lat: 27.92, lon: 34.33, years: "2019–21" },
  { name: "Marsa Alam", lat: 25.07, lon: 34.9, years: "2021–22" },
  { name: "Dubai", lat: 25.2, lon: 55.27, years: "2022–26" },
  { name: "Chanthaburi", lat: 12.61, lon: 102.1, years: "Now" },
];

// ---------------- Business framing ----------------
// NOTE: working brand name. Change it here and it updates everywhere.
export const business = {
  name: "OA Finance",
  tagline: "Hotel bookkeeping & accounting automation",
  promise: "Books that close at zero.",
  founder: "Omar Abouelatta",
};

export const audiences = [
  {
    title: "Hotels & resorts",
    body: "City ledger, travel-agent and corporate billing, vendor payments, cashiering and payroll, run the way a luxury-resort finance office runs them.",
    points: ["Opera PMS · Micros POS · Sun Systems", "AP, AR, Paymaster & cash control", "Audit-ready month-end"],
  },
  {
    title: "Small businesses",
    body: "Clean books in Xero or QuickBooks, bank reconciliations and reports you can read, without hiring a full-time accountant.",
    points: ["Xero Certified Specialist", "Monthly bookkeeping & reconciliations", "Reports that make sense"],
  },
  {
    title: "Finance teams",
    body: "n8n workflows that take the repetitive checking and matching off your team, while a manager still approves what goes out.",
    points: ["Data intake from Excel & e-mail", "Automated reconciliations", "AI drafts, human approval"],
  },
];

export const packages = [
  {
    name: "Monthly Bookkeeping",
    for: "Small businesses and single properties",
    body: "Your transactions recorded, bank and card accounts reconciled, and a short monthly report delivered on schedule.",
    includes: ["Transaction recording in Xero or QuickBooks", "Bank, card and supplier-statement reconciliations", "Monthly P&L, aging and cash report", "E-mail support during the month"],
  },
  {
    name: "Month-End Close & Clean-up",
    for: "Hotels and finance teams that need a calm close",
    body: "Accruals, prepayments, journals and GL posting, with aged items cleared and every account tied out before the books close.",
    includes: ["Full month-end closing pack", "City ledger and vendor aging clean-up", "Audit-ready documentation and controls", "Hand-over notes for your team"],
    featured: true,
  },
  {
    name: "Automation Build",
    for: "Teams drowning in repetitive checks",
    body: "An n8n workflow built around your systems: intake, matching, contract checks and reports, with a manager approving anything sent out.",
    includes: ["Process review and workflow design", "Build, test and documentation", "Excel / Google Sheets outputs", "30 days of adjustments after go-live"],
  },
];

export const why = [
  { title: "Built on hotel finance", body: "Six years in luxury-resort finance offices in the UAE and Egypt: AP, AR, Paymaster and cash control, not theory." },
  { title: "Numbers that tie out", body: "Zero unreconciled cash variances over 15 months and 100% of bank credits posted before closing. That standard comes with us." },
  { title: "Automation by an accountant", body: "Workflows that understand contracts, aging and approvals, because the person who built them has done the job by hand." },
  { title: "A person still approves", body: "Nothing an AI drafts is sent without a manager's sign-off. Automation does the checking; people keep the decisions." },
];

export const faq = [
  { q: "Do you only work with hotels?", a: "No. Hotels and resorts are where the experience comes from, but the reconciliations, accruals and month-end close transfer to any business. Small businesses on Xero or QuickBooks are a good fit too." },
  { q: "Can you work remotely?", a: "Yes. Based in Chanthaburi, Thailand, working remotely worldwide, and open to on-site roles and relocation for the right engagement." },
  { q: "Which systems do you work in?", a: "Xero (Certified Specialist, Level 3), QuickBooks Online, Sun Systems, Opera PMS, Micros POS, advanced Excel, Google Sheets, Gmail, n8n and Google Gemini." },
  { q: "How does the automation stay safe?", a: "Workflows never write to your accounting system on their own. They read, check, match and prepare; a person reviews and posts. AI-drafted e-mails and summaries wait for a manager's approval." },
  { q: "How do we start?", a: "Book a free consultation. We talk about your books, your systems and what takes up your team's time, then you get a clear proposal." },
];
