// ─────────────────────────────────────────────────────────────────
//  portfolio.js  —  Mohammad Farhan — edit ALL content here only.
// ─────────────────────────────────────────────────────────────────

export const ME = {
  name:       "Mohammad Farhan",
  tagline:    "Security-focused developer building resilient systems from code to cloud.",
  bio1:       "I'm a DevSecOps-minded Full-Stack Developer who integrates security at every layer — from writing hardened React & Java applications to conducting VAPT on live infrastructure.",
  bio2:       "I thrive where Dev, Sec, and Ops intersect — designing cloud-native architectures on AWS, automating deployments, and ensuring every line of code ships safely.",
  location:   "Noida, India",
  experience: "1+ Year",
  projects:   "5+",
  stack:      "React · Java · AWS · Kali",
  status:     "Open to Work",
  email:      "mf6448841@gmail.com",
  phone:      "+91 6392254405",
 // github:     "https://github.com/MohammadFarhanayyubi",
  linkedin:   "linkedin.com/in/mohammed-farhan-cs",
  cvLink:     "#",
};

// ── Typing roles ─────────────────────────────────────────────────
export const ROLES = [
  "Full-Stack Developer",
  "Security Engineer",
  "DevSecOps Practitioner",
  "Cloud (AWS) Specialist",
];

// ── Work experience ──────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role:    "Full-Stack Development Trainee",
    company: "CodeSquadz",
    type:    "On-site · Noida",
    period:  "Aug 2025 – Present",
    tag:     "dev",
    bullets: [
      "Integrated security practices into full-stack development workflows.",
      "Built secure frontend and backend components using React and Java.",
      "Explored AWS-based deployment models focusing on scalability and security.",
      "Deployed 3 live applications progressively on Netlify over consecutive months.",
    ],
  },
  {
    role:    "Security Engineer Intern (DevSecOps)",
    company: "Yahya Cyber Security",
    type:    "Remote",
    period:  "Jul 2025 – Oct 2025",
    tag:     "sec",
    bullets: [
      "Conducted application and network security assessments using Nmap, Wireshark, and Burp Suite.",
      "Performed VAPT on OWASP Juice Shop using Kali Linux with Secure SDLC remediation.",
      "Assisted in AWS cloud security hardening — IAM review, logging, and network segmentation.",
      "Built the company website from scratch and deployed it live.",
    ],
  },
  {
    role:    "Security Operations Intern",
    company: "Yahya Pvt Ltd",
    type:    "Remote",
    period:  "Jun 2024 – Sep 2024",
    tag:     "ops",
    bullets: [
      "Conducted application and network-level security testing aligned with enterprise programs.",
      "Supported AWS infrastructure security and compliance documentation.",
    ],
  },
];

// ── Skills split into Dev / Sec / Ops tabs ───────────────────────
export const SKILL_GROUPS = [
  {
    label: "Dev",
    color: "#0066ff",
    items: [
      { name: "HTML / CSS",       pct: 82, color: "#61dafb" },
      { name: "React.js",       pct: 82, color: "#61dafb" },
      { name: "JavaScript",     pct: 80, color: "#f0db4f" },
      { name: "Java (Core)",    pct: 75, color: "#f89820" },
      { name: "Node.js ",        pct: 70, color: "#6cc24a" },
      { name: "MongoDB / MySQL / PostgreSQL / Oracle",  pct: 68, color: "#336791" },
      { name: "Bootstrap / Tailwind CSS",      pct: 75, color: "#7952b3" },
    ],
  },
  {
    label: "Sec",
    color: "#e53e3e",
    items: [
      { name: "VAPT / OWASP",          pct: 80, color: "#dd6b20" },
      { name: "Burp Suite",            pct: 78, color: "#ff6b35" },
      { name: "Nmap / Wireshark",      pct: 75, color: "#e53e3e" },
      { name: "Kali Linux",            pct: 76, color: "#268bd2" },
      { name: "Secure SDLC",           pct: 70, color: "#d53f8c" },
      { name: "Incident Analysis",     pct: 65, color: "#805ad5" },
    ],
  },
  {
    label: "Ops",
    color: "#00e5c4",
    items: [
      { name: "AWS (EC2, S3, SQS, SNS)", pct: 74, color: "#ff9900" },
      { name: "IAM / VPC",              pct: 72, color: "#ff9900" },
      { name: "Linux (Ubuntu / Kali)",  pct: 80, color: "#dd6b20" },
      { name: "Git / Version Control",  pct: 82, color: "#f05033" },
      { name: "Netlify / CI-CD",        pct: 70, color: "#00c7b7" },
      { name: "Network Architecture",   pct: 68, color: "#f0a060" },
    ],
  },
];

export const BADGES = [
  "React.js","Node.js","Java","JavaScript","HTML/CSS","Bootstrap",
  "Kali Linux","Burp Suite","Nmap","Wireshark","OWASP","VAPT","Secure SDLC",
  "AWS EC2","AWS S3","VPC","IAM","Git","Linux","MongoDB","SQL","Netlify",
];

// ── Projects — cat: "dev" | "sec" | "ops" ───────────────────────
export const PROJECTS = [
  {
    title:  "Admin Dashboard",
    desc:   "Responsive admin panel built with React, Bootstrap, and Recharts for data visualization. Uses Axios for API integration, React Hook Form, and React Toastify. Deployed live on Netlify.",
    tags:   ["React", "Bootstrap", "Recharts", "Axios", "Netlify"],
    cat:    "dev",
    status: "Live",
    year:   "2025",
    demo:   "#",
    repo:   "#",
  },
  {
    title:  "Yahya CyberSec Website",
    desc:   "Built the full company website for Yahya Cyber Security from scratch — responsive design, version-controlled, and deployed live on Netlify.",
    tags:   ["React", "JavaScript", "HTML/CSS", "Netlify", "Git"],
    cat:    "dev",
    status: "Live",
    year:   "2025",
    demo:   "#",
    repo:   "#",
  },
  {
    title:  "Enterprise Web App VAPT",
    desc:   "End-to-end vulnerability assessment and penetration testing on a live enterprise app. Identified insecure headers, session weaknesses, and exposed services with full remediation report.",
    tags:   ["Burp Suite", "Nmap", "Kali Linux", "OWASP", "VAPT"],
    cat:    "sec",
    status: "Done",
    year:   "2025",
    demo:   "#",
    repo:   "#",
  },
  {
    title:  "OWASP Juice Shop VAPT",
    desc:   "Full penetration test on OWASP Juice Shop using Kali Linux. Exploited and documented SQLi, XSS, and broken auth vulnerabilities with Secure SDLC remediation steps.",
    tags:   ["Kali Linux", "Burp Suite", "OWASP", "SQLi", "XSS"],
    cat:    "sec",
    status: "Done",
    year:   "2025",
    demo:   "#",
    repo:   "#",
  },
  {
    title:  "Secure Startup Network Architecture",
    desc:   "Designed a secure multi-layer Cloud, Endpoint, and Wi-Fi architecture using Draw.io — covering VPC segmentation, IAM policies, and endpoint hardening for a startup environment.",
    tags:   ["AWS", "VPC", "IAM", "Draw.io", "Network Security"],
    cat:    "ops",
    status: "Done",
    year:   "2024",
    demo:   "#",
    repo:   "#",
  },
];

// ── Certifications ───────────────────────────────────────────────
export const CERTS = [
  { title: "Certificate of Excellence — Security Engineer Intern", issuer: "Yahya Cyber Security", year: "2025", tag: "sec" },
  { title: "Security Operations & VAPT Training",                  issuer: "Yahya Cyber Security", year: "2025", tag: "sec" },
  { title: "AWS Cloud Security Fundamentals",                      issuer: "AWS / Self-paced",     year: "2024", tag: "ops" },
];

// ── Education ────────────────────────────────────────────────────
export const EDUCATION = {
  degree:  "B.Tech — Computer Science & Engineering",
  spec:    "Cloud Computing & Cyber Security",
  college: "Invertis University, Bareilly",
  period:  "2021 – 2025",
  cgpa:    "7.9 / 10",
};


// ── EmailJS config ───────────────────────────────────────────────
// Fill these in after setting up EmailJS (see instructions below)
export const EMAILJS = {
  serviceId:  "service_8uc9gp8",    // e.g. "service_abc123"
  templateId: "template_bqa04fa",   // e.g. "template_xyz789"
  publicKey:  "hZcnGIAjhxV6FcJ07",    // e.g. "AbCdEfGhIjKlMnOp"
};
