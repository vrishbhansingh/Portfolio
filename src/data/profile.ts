// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Vrishbhan Singh",
  role: "Full Stack Developer",
  location: "Delhi, India",
  email: "vrishbhansingh321@gmail.com",
  resume: "/vrishbhan-singh-resume.pdf",
  availability: "Available for full-time roles and freelance projects",
  // Leave a link empty ("") to hide it on the site.
  links: {
    github: "https://github.com/vrishbhansingh",
    linkedin: "https://www.linkedin.com/in/vrishbhan-singh-17a3141b3",
  },
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  /** "saas" = multi-tenant, database per company. "client" = built for one client. */
  tenancy: "saas" | "client";
  /** What I personally did on the project */
  contribution: string[];
  /** How it is built */
  technical: string[];
  modules: string[];
  stack: string[];
  url?: string;
  image?: { src: string; alt: string };
  /** Brand colour used for the glow behind the screenshot */
  accent: string;
};

export const stats = [
  { value: "2+", label: "years shipping production software" },
  { value: "4", label: "business products: an HRMS, a CRM and two ERPs" },
  { value: "3", label: "multi-tenant SaaS products, one database per company" },
  { value: "4", label: "teams in Delhi NCR" },
];

export const marquee = [
  "Payroll",
  "Attendance",
  "Leave approvals",
  "Leads",
  "Deals",
  "Sales pipeline",
  "Quotations",
  "BOM and MRP",
  "Production runs",
  "Inventory",
  "Billing",
  "Dispatch",
  "Role-based access",
  "Multi-tenancy",
];

const stack = ["React.js", "Laravel", "PHP", "MySQL", "REST APIs"];

// Shared by EZHRM, EZCRM and Sugam ERP: what I own on the SaaS products.
const saasContribution = [
  "Worked across the front end and back end, with most of my time on the backend",
  "Built authentication, the API layer, and the validation and permission checks on every request",
  "Built company signup with email OTP verification",
];

// Shared architecture of the three SaaS products.
export const saasTechnical = [
  "Each company gets its own database. A central master database maps every company to its database.",
  "Requests are routed to the signed-in company's database, so one company has no way to reach another's data.",
  "Each company sets up its own masters (settings, lists and rules) after signing up",
  "Audit logs are kept separately for every company",
];

export const projects: Project[] = [
  {
    slug: "ezhrm",
    name: "EZHRM",
    kind: "Multi-tenant HR and payroll platform",
    summary:
      "One system where many companies run their HR: employee records, attendance, leave, payroll and approvals. Each company's data stays separate from the others.",
    tenancy: "saas",
    contribution: [
      ...saasContribution,
      "Role-based access for company admins, managers and employees",
    ],
    technical: [
      "Separate database for every company, routed through a central master database",
      "Each company sets up its own masters and gets its own audit log",
      "React.js front end talking to Laravel REST APIs on MySQL",
    ],
    modules: [
      "Attendance",
      "Leave",
      "Payroll",
      "Salary master",
      "Role management",
      "Time tracking",
      "Travel and expense",
      "WFH and comp-off requests",
      "Document approvals",
      "POSH",
    ],
    stack,
    accent: "#3b5bdb",
    url: "https://ezhrm.in/",
    image: {
      src: "/work/ezhrm-dashboard.webp",
      alt: "EZHRM admin dashboard showing today's attendance, pending approvals and leave requests",
    },
  },
  {
    slug: "ezcrm",
    name: "EZCRM",
    kind: "Multi-tenant sales CRM",
    summary:
      "A CRM for sales teams to track leads from first contact to closed deal, with follow-ups, assignment rules and a live pipeline view for managers.",
    tenancy: "saas",
    contribution: [
      ...saasContribution,
      "Backend for leads, deals, follow-ups and assignment",
    ],
    technical: [
      "Separate database for every company, routed through a central master database",
      "Each company sets up its own masters and gets its own audit log",
      "React.js dashboards on Laravel REST APIs, with a pipeline view by stage",
    ],
    modules: [
      "Leads",
      "Deals and pipeline",
      "Contacts",
      "Lead assignment",
      "Lead integrations",
      "Tickets",
      "Roles and team",
      "Activity log",
    ],
    stack,
    accent: "#7a4ff0",
    url: "https://ezcrm.in/",
    image: {
      src: "/work/ezcrm-dashboard.webp",
      alt: "EZCRM dashboard with lead totals, won revenue and a sales pipeline funnel by stage",
    },
  },
  {
    slug: "dst-erp",
    name: "DST Production ERP",
    kind: "Production ERP built for one manufacturer",
    summary:
      "Runs a factory's order flow from sales order to dispatch: which product goes through which process on which machine, what is in production, and what stock is ready to ship.",
    tenancy: "client",
    contribution: [
      "Worked across the front end and back end, with most of my time on the backend",
      "Built authentication, the API layer, and the validation and permission checks on every request",
      "Process-wise modules: product to process, process to machine, and user access",
    ],
    technical: [
      "Built for a single client, DST, rather than as SaaS: one deployment and one database",
      "Role-based access, so each user only sees the modules for their process",
      "React.js interface inside a Laravel application, on MySQL",
      "Product-wise inventory showing ordered, produced and dispatched quantities",
    ],
    modules: [
      "Sales orders",
      "Production runs",
      "Production queue",
      "Inventory",
      "Dispatch",
      "Waste logs",
      "Machines and operators",
      "Product to process mapping",
    ],
    stack,
    accent: "#e8590c",
    image: {
      src: "/work/dst-erp-dashboard.webp",
      alt: "DST Production ERP command center with the production pipeline and product-wise inventory",
    },
  },
  {
    slug: "sugam-erp",
    name: "Sugam ERP",
    kind: "Multi-tenant SaaS ERP for manufacturers",
    summary:
      "Connects every department of a manufacturing business: the sales team in the field, the production floor, quality checks, stores, billing and the gate. One order can be followed from the first customer visit to the truck leaving the gate.",
    tenancy: "saas",
    contribution: [
      ...saasContribution,
      "Backend for connected modules that hand one record from department to department",
    ],
    technical: [
      "Separate database for every company, routed through a central master database",
      "Each company sets up its own masters and gets its own audit log",
      "React.js front end on Laravel REST APIs and MySQL",
    ],
    modules: [
      "Quotation",
      "Sales order",
      "Salesman tracking",
      "Customer visits",
      "BOM and MRP",
      "Semi-finished production",
      "Testing",
      "Gate pass",
      "Invoicing and billing",
      "Vendors and customers",
    ],
    stack,
    accent: "#18804f",
  },
];

export const orderFlow = [
  "Customer visit",
  "Quotation",
  "Sales order",
  "BOM and MRP",
  "Production",
  "Testing",
  "Invoice and billing",
  "Gate pass and dispatch",
];

// Sugam ERP, grouped by the department that uses each module.
export const sugamDepartments = [
  {
    name: "Sales and field team",
    color: "#3b5bdb",
    modules: [
      { title: "Quotations", note: "Price and send offers to customers" },
      { title: "Sales orders", note: "Confirmed orders that drive everything else" },
      { title: "Salesman work", note: "Daily tasks and targets for each salesman" },
      { title: "Customer visit tracking", note: "Who visited which customer, when, and the outcome" },
    ],
  },
  {
    name: "Production",
    color: "#e8590c",
    modules: [
      { title: "Bill of materials", note: "What goes into each product, level by level" },
      { title: "MRP and planning", note: "What to make, and what to buy, to meet orders" },
      { title: "Semi-finished goods", note: "In-house parts built before final assembly" },
      { title: "Production runs", note: "Track work in progress on the floor" },
    ],
  },
  {
    name: "Quality and stores",
    color: "#7a4ff0",
    modules: [
      { title: "Testing", note: "Pass or fail checks before goods move on" },
      { title: "Raw material stock", note: "What came in and what is left" },
      { title: "Finished goods", note: "Tested stock ready to sell" },
      { title: "Gate pass", note: "Every item entering or leaving the premises" },
    ],
  },
  {
    name: "Accounts and partners",
    color: "#18804f",
    modules: [
      { title: "Invoicing and billing", note: "Bills raised straight from the sales order" },
      { title: "Dispatch", note: "What shipped, to whom, against which invoice" },
      { title: "Customers", note: "Accounts, contacts and order history" },
      { title: "Vendors", note: "Suppliers for raw material and services" },
    ],
  },
];

// Areas of expertise. Icons are mapped in components/expertise.tsx.
export const expertise = [
  {
    icon: "react",
    title: "React front ends",
    body: "Component-driven dashboards, forms and data tables that stay fast with real business data.",
    tags: ["React.js", "ES6", "Responsive UI"],
  },
  {
    icon: "server",
    title: "Laravel back ends and APIs",
    body: "REST APIs, MVC structure and business logic for modules that many teams depend on.",
    tags: ["Laravel", "PHP", "REST"],
  },
  {
    icon: "database",
    title: "Database design",
    body: "Multi-tenant MySQL with a separate database for every company and a central master database, plus query tuning.",
    tags: ["MySQL", "Database per tenant", "Optimisation"],
  },
  {
    icon: "cloud",
    title: "Deployment and VPS servers",
    body: "Putting apps live on VPS servers, managing environments and keeping production running.",
    tags: ["VPS", "Deployment", "Production support"],
  },
  {
    icon: "card",
    title: "Payment gateway integration",
    body: "Connecting payment gateways so customers can pay online and orders update on their own.",
    tags: ["Payments", "Webhooks", "Order status"],
  },
  {
    icon: "plug",
    title: "Third-party integrations",
    body: "Hooking business software up to outside services and APIs, and keeping data in sync.",
    tags: ["API integration", "JSON", "Postman"],
  },
  {
    icon: "shield",
    title: "Auth and permissions",
    body: "Signup with email OTP, login, roles and permission checks on every API request.",
    tags: ["OTP verification", "Roles", "Audit logs"],
  },
  {
    icon: "workflow",
    title: "ERP, CRM and HRMS workflows",
    body: "Turning how a business actually works into modules: approvals, pipelines, production and billing.",
    tags: ["ERP", "CRM", "HRMS", "SaaS"],
  },
] as const;

export const experience = [
  {
    company: "30Days Technologies",
    place: "Delhi",
    role: "Full Stack Web Developer",
    period: "Mar 2026 – Present",
    current: true,
    points: [
      "Build and maintain business management products in React.js, Laravel and MySQL",
      "Ship dashboards, workflows and user modules from business requirements",
      "Integrate APIs, handle authentication and keep performance in check through testing and deployment",
    ],
  },
  {
    company: "Tech Web Mantra",
    place: "Delhi",
    role: "Full Stack Web Developer",
    period: "Apr 2025 – Feb 2026",
    points: [
      "Built CRM and business applications in Laravel, PHP, MySQL and JavaScript",
      "Created admin and user panels with role-based permissions and access control",
      "Delivered lead management, follow-ups, sales tracking and project modules",
      "Optimised database queries, backend APIs and application performance",
    ],
  },
  {
    company: "Gratix Solution",
    place: "Nirman Vihar, Delhi",
    role: "Full Stack Web Developer",
    period: "Oct 2024 – Mar 2025",
    points: [
      "Built admin dashboards for billing and e-commerce platforms",
      "Connected React.js front ends to backend APIs for real-time data",
      "Improved UI consistency, page speed and cross-browser support",
    ],
  },
  {
    company: "Innovative Solutions",
    place: "Noida",
    role: "Front-End Developer Intern",
    period: "Jul 2024 – Sep 2024",
    points: [
      "Built reusable React.js components and integrated APIs for dynamic data",
    ],
  },
];

export const stackLayers = [
  {
    layer: "Interface",
    note: "What people click",
    items: ["React.js", "JavaScript (ES6)", "HTML5", "CSS3", "Bootstrap", "Responsive design"],
  },
  {
    layer: "Application",
    note: "Rules, roles and APIs",
    items: ["Laravel", "PHP", "MVC", "REST APIs", "Authentication", "Role management"],
  },
  {
    layer: "Data",
    note: "Where the records live",
    items: ["MySQL", "SQL", "Query optimisation", "Multi-tenant schemas"],
  },
  {
    layer: "Workflow",
    note: "How it ships",
    items: ["Git", "GitHub", "Postman", "VS Code", "JSON"],
  },
];

export const education = [
  { title: "B.Tech, Computer Science", place: "MDU, Rohtak", year: "2024" },
  { title: "Full Stack Web Development", place: "8-week certified training", year: "" },
];
