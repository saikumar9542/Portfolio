/** Central content source for the portfolio (from Saikumar's resume). */

export const profile = {
  name: "Saikumar Kathraj",
  roles: [
    "Java Developer",
    "AEM Developer",
    "Spring Boot Developer",
    "Full Stack Developer",
    "Backend Engineer",
  ],
  title: "Software Engineer",
  email: "saikumarkathraj22@gmail.com",
  phone: "+91 9542264196",
  linkedin: "https://linkedin.com/in/saikumarkathraj",
  github: "https://github.com/Saikumar-1710",
  location: "Hyderabad, India",
  summary:
    "Results-driven Full Stack Java Developer with practical experience designing and developing enterprise web applications using Java, Spring Boot, Hibernate and Adobe Experience Manager (AEM) as a Cloud Service. Skilled in RESTful APIs, responsive frontends, and integrating backend services with MySQL — with a strong grounding in Spring Data JPA, JDBC, MVC architecture and object-oriented design.",
  summaryExtra:
    "Proficient across Git, Maven, Docker, JUnit, Mockito and cloud-based development environments. Experienced building and customizing AEM components, templates, dialogs and content management solutions, always following industry best practices for scalable, maintainable software.",
};

export const stats = [
  { value: 15, suffix: "+", label: "Technologies mastered" },
  { value: 3, suffix: "+", label: "Enterprise projects" },
  { value: 4, suffix: "", label: "Certifications" },
  { value: 100, suffix: "%", label: "Agile delivery mindset" },
];

export const techStack: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Java"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap"] },
  {
    group: "Backend",
    items: ["Spring Boot", "Spring Framework", "Hibernate", "REST APIs", "JDBC", "Spring Data JPA"],
  },
  { group: "Databases", items: ["MySQL", "SQL"] },
  {
    group: "Adobe Experience Manager",
    items: [
      "HTL (Sightly)",
      "Sling",
      "OSGi",
      "Dispatcher",
      "Workflows",
      "Content Fragments",
      "Experience Fragments",
      "MSM",
    ],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Maven", "Postman", "Jira", "VS Code", "Eclipse"],
  },
  { group: "Testing", items: ["JUnit", "Mockito"] },
];

export const experience = [
  {
    role: "Associate Software Developer",
    company: "Bhashaka Technologies",
    period: "Feb 2026 — Present",
    tags: ["AEM Cloud Service", "HTL", "Sling Models", "OSGi", "Dispatcher"],
    points: [
      "Developed reusable and scalable AEM components using HTL (Sightly), Sling Models, OSGi services and Dispatcher configurations.",
      "Implemented Content Fragments, Experience Fragments, MSM and AEM Workflows for efficient content management and multi-site support.",
      "Built and consumed RESTful APIs for seamless frontend-backend integration and headless CMS use cases.",
      "Collaborated with cross-functional teams in Agile environments to deliver performance-optimized applications.",
      "Followed coding standards and security guidelines to ensure scalable, robust software solutions.",
    ],
  },
  {
    role: "Full Stack Web Developer Intern",
    company: "Cyrostack IT Solutions, Hyderabad",
    period: "Jan 2025 — Dec 2025",
    tags: ["Spring Boot", "Microservices", "React.js", "Hibernate", "MySQL"],
    points: [
      "Developed real-time web applications using Microservices, MVC and N-Tier architecture for scalable enterprise solutions.",
      "Built responsive frontend interfaces using React.js, Axios, HTML, CSS, JavaScript and Thymeleaf.",
      "Designed and implemented RESTful APIs using Spring Boot, Hibernate, JDBC and Data JPA.",
      "Worked with MySQL for CRUD operations, data management and backend integration.",
      "Used Maven for project management and Git/GitHub for version control and collaboration.",
    ],
  },
];

export const projects = [
  {
    name: "Fruitables",
    category: "Adobe Experience Manager",
    blurb:
      "An enterprise AEM Cloud Service storefront built on reusable, authorable components with a headless-ready content layer.",
    points: [
      "Reusable, scalable components with HTL + Sling Models",
      "Sling Model Exporters for headless integrations",
      "Content Fragment Models for structured content",
      "Dispatcher caching, OSGi services, responsive UI",
    ],
    stack: ["AEM", "HTL", "Sling", "OSGi", "Dispatcher", "Java"],
    links: { github: "https://github.com/Saikumar-1710", demo: "", caseStudy: "" },
  },
  {
    name: "Food Service Management System",
    category: "Java · Spring Boot",
    blurb:
      "Backend-focused admin platform with layered architecture, secure session management and full CRUD across menu, orders and users.",
    points: [
      "Layered architecture with Spring Boot & Spring Data JPA",
      "REST APIs with Hibernate/JPA persistence on MySQL",
      "Admin dashboard, authentication and session management",
      "Dynamic Thymeleaf interfaces and responsive pages",
    ],
    stack: ["Java", "Spring Boot", "Hibernate", "MySQL", "REST API", "Thymeleaf"],
    links: { github: "https://github.com/Saikumar-1710", demo: "", caseStudy: "" },
  },
  {
    name: "Portfolio Website",
    category: "Frontend",
    blurb:
      "A responsive personal portfolio showcasing projects and technical skills with smooth navigation and mobile-first layouts.",
    points: [
      "Responsive, mobile-friendly layouts",
      "Smooth navigation and section transitions",
      "Deployed on GitHub Pages",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    links: {
      github: "https://github.com/Saikumar-1710",
      demo: "https://saikumar-1710.github.io/Portfolio/Portfolio/",
      caseStudy: "",
    },
  },
];

export const skills = [
  { name: "Java", value: 92 },
  { name: "Spring Boot", value: 88 },
  { name: "AEM", value: 85 },
  { name: "React", value: 80 },
  { name: "MySQL", value: 84 },
  { name: "Git", value: 88 },
  { name: "REST APIs", value: 90 },
  { name: "Docker", value: 72 },
];

export const achievements = [
  {
    title: "Innovators Hive at Google Cloud Next '22",
    detail: "Selected participant among nationwide applicants.",
  },
  {
    title: "Google Cloud Career Readiness",
    detail: "Data Analyst track completion.",
  },
  {
    title: "Full Stack Java Certification",
    detail: "Nit Technology — end-to-end Java engineering.",
  },
  {
    title: "Internship Certificate",
    detail: "Cyrostack IT Solutions — Full Stack Web Development.",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering (AI & ML)",
    school: "CMR Technical Campus, Hyderabad",
    period: "2021 — 2024",
    score: "7.84 CGPA",
  },
  {
    degree: "Diploma in Civil Engineering",
    school: "Kshatriya College of Engineering, Nizamabad",
    period: "2018 — 2021",
    score: "8.9 CGPA",
  },
  {
    degree: "SSC",
    school: "ZP High School, Nizamabad",
    period: "2017 — 2018",
    score: "9.0 CGPA",
  },
];

export const certifications = [
  {
    title: "Full Stack Java Developer Certification",
    issuer: "Nit Technology",
  },
  {
    title: "Full Stack Web Development Internship Certificate",
    issuer: "Cyrostack IT Solutions",
  },
  {
    title: "Google Cloud Career Readiness — Data Analyst Track",
    issuer: "Google Cloud",
  },
  {
    title: "Innovators Hive — Google Cloud Next '22",
    issuer: "Google Cloud",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
