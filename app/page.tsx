"use client";

import { FormEvent, useState } from "react";

const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
];

const stats = [
    { value: "4.6+", label: "Years Exp" },
    { value: "3+", label: "Projects" },
    { value: "BSC(cs)", label: "Graduate" },
];

const topSkills = [
    { name: "KUBERNETES", proficiency: 95 },
    { name: "DOCKER", proficiency: 92 },
    { name: "TERRAFORM", proficiency: 88 },
    { name: "AWS / CLOUD", proficiency: 90 },
    { name: "JENKINS / CI-CD", proficiency: 85 },
    { name: "PYTHON / SCRIPTING", proficiency: 80 },
];

const skillCategories = [
    {
        title: "INFRASTRUCTURE & DEVOPS",
        icon: "⚙️",
        color: "border-blue-500/30",
        skills: ["Kubernetes", "Docker", "Terraform", "AWS", "Azure", "GCP", "Jenkins", "GitLab CI", "GitHub Actions"]
    },
    {
        title: "CLOUD PLATFORMS",
        icon: "☁️",
        color: "border-cyan-500/30",
        skills: ["AWS (EC2, ECS, EKS, RDS, S3, Lambda)", "Azure (VMs, App Service, Storage)", "GCP (Compute Engine, Cloud Run)"]
    },
    {
        title: "SECURITY & SCANNING",
        icon: "🔒",
        color: "border-red-500/30",
        skills: ["SonarQube", "Trivy", "OWASP", "SSL/TLS", "IAM Policies", "Security Groups"]
    },
    {
        title: "MONITORING & OBSERVABILITY",
        icon: "📊",
        color: "border-green-500/30",
        skills: ["Grafana", "Prometheus", "CloudWatch", "Datadog", "Splunk", "ELK Stack", "Opsgenie"]
    },
    {
        title: "PROGRAMMING LANGUAGES",
        icon: "💻",
        color: "border-purple-500/30",
        skills: ["Python", "Bash", "Shell Script", "JavaScript", "TypeScript", "SQL"]
    },
    {
        title: "TOOLS & PLATFORMS",
        icon: "🛠️",
        color: "border-amber-500/30",
        skills: ["Git/GitHub", "GitLab", "Artifactory", "Maven", "Ansible", "Helm", "Linux", "YAML"]
    }
];

const skills = [
    "AWS",
    "Azure",
    "Jenkins",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Python",
    "Bash",
    "CI/CD",
    "GCP",
    "MySQL",
    "Grafana",
    "Prometheus",
    "GitOps",
    "Git",
    "GitHub",
    "Ansible",
    "Gerrit",
    "Sonarqube",
    "Artifactory",
    "Linux",
];

const education = [
    {
        title: "Master of Computer Applications (MCA)",
        details: "jain College, Bengalore · 2025–2027",
    },
    {
        title: "Bachelor of Computer Science (BCS(cs))",
        details: "karnataka science College, Dharwad · 2017–2020",
    },
];

const projects = [
    {
        Company: "Capgemini",
        title: "E-Commerce Application",
        desc: "Implemented end-to-end CI/CD pipeline for a large-scale enterprise application using Jenkins, Docker, Kubernetes, and AWS EKS with automated deployment, monitoring, and security scanning.",
        date: "Nov 2021 - Dec 2022",
        location: "Bengaluru, Karnataka",
    },
    {
        Company: "Capgemini",
        title: "Enterprise Operations Platform",
        desc: "Designed and managed containerized microservices with Kubernetes orchestration, autoscaling, monitoring, and zero-downtime deployments.",
        date: "Jan 2023 - Nov 2024",
        location: "Bengaluru, Karnataka",
    },
    {
        Company: "Greenway Health pvt Ltd",
        title: "Greenway Assist (NOVARE)",
        desc: "Automated deployment and infrastructure provisioning for a large-scale production platform using Terraform, Kubernetes, Jenkins, and AWS. Managed CI/CD pipelines, resolved build failures and production issues, supported cloud and Artifactory migrations, handled staging and production deployments, performed code reviews, managed manual cloud updates, provided user access governance, and supported around 14 product lines across multiple environments.",
        date: "Dec 2024 - Present, Remote",
        location: "Bengaluru, Karnataka",
    },
];

export default function Page() {
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!contactEmail || !contactMessage) {
            setStatusMessage("Please provide both your email and message.");
            return;
        }

        setIsSubmitting(true);
        setStatusMessage("Sending message...");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to send message.");
            }

            setStatusMessage("Message sent successfully. Thank you!");
            setContactName("");
            setContactEmail("");
            setContactMessage("");
        } catch (error) {
            setStatusMessage(
                error instanceof Error ? error.message : "An error occurred while sending your message."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative overflow-hidden bg-slate-50 text-slate-950">
            <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <a href="#home" className="text-xl font-black tracking-[0.35em] text-slate-950">
                        Nagaraj chabbi
                    </a>
                    <nav className="hidden items-center gap-6 lg:flex">
                        {navLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:text-slate-950"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <section id="home" className="relative overflow-hidden px-6 pt-28 pb-20 lg:pb-28">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_34%)]" />
                <div className="absolute right-0 top-0 hidden h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.05),transparent_40%)] lg:block" />

                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="space-y-8">
                        <span className="inline-flex rounded-full border border-slate-200/60 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-600 shadow-sm">
                            SYSTEM ONLINE // PORTFOLIO_v3.0
                        </span>
                        <div className="max-w-3xl space-y-4">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Hi, I’m</p>
                            <h1 className="text-6xl font-black tracking-[-0.04em] text-slate-950 sm:text-7xl">
                                Nagaraj chabbi
                            </h1>
                            <div className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10">
                                ROLE:: DevSecOps Engineer
                            </div>
                            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Passionate about automating secure cloud infrastructure, optimizing CI/CD workflows, and building scalable, resilient platforms for healthcare and AI-driven applications.
                            </p>
                            <p className="text-sm text-slate-500">📍 Bengaluru, Karnataka</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5"
                            >
                                VIEW PROJECTS
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                CONTACT ME
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[480px]">
                        <div className="absolute -left-14 top-16 h-32 w-32 rounded-full bg-cyan-200/40 blur-3xl" />
                        <div className="absolute -right-16 bottom-10 h-28 w-28 rounded-full bg-violet-200/30 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/90 p-8 shadow-[0_32px_120px_-50px_rgba(15,23,42,0.35)]">
                            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(102,153,255,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_40%)]" />
                            <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-[2rem] border border-slate-200/50 bg-slate-950/95 p-8 text-slate-100 shadow-2xl">
                                <img src="/robot.svg" alt="DevSecOps Robot" className="h-64 w-64 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-6 right-6 z-40 hidden rounded-full border border-slate-200/60 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 md:flex">
                    AI CHAT
                </div>
            </section>

            <section id="about" className="relative px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 space-y-3 text-center lg:text-left">
                        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{/* MODULE_01 — IDENTITY */}</p>
                        <h2 className="text-5xl font-black tracking-[-0.04em] text-slate-950">About Me</h2>
                    </div>
                    <div className="grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:items-start">
                        <div className="space-y-8">
                            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_90px_-45px_rgba(15,23,42,0.12)]">
                                <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-cyan-200/40 blur-3xl" />
                                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-4">
                                    <div className="relative mx-auto w-[260px] sm:w-[300px] h-[500px] sm:h-[520px] overflow-hidden rounded-[1.75rem] bg-slate-900/5">
                                        <img
                                            src="/profile.jpg.png"
                                            alt="Nagaraj Chabbi"
                                            className="h-full w-full object-cover"
                                            style={{ objectPosition: 'center 18%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
                                        <p className="text-4xl font-black tracking-[-0.04em] text-slate-950">{item.value}</p>
                                        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-6 rounded-[2.5rem] border border-slate-200/70 bg-white p-10 shadow-[0_18px_70px_-35px_rgba(15,23,42,0.15)]">
                                <p className="text-lg leading-8 text-slate-600">
                                    DevSecOps professional with 4.6+ years of experience building secure, resilient infrastructure for enterprise systems. Expert in automating infrastructure provisioning and CI/CD pipelines with Terraform, Jenkins, Docker, Kubernetes, and AWS. Proven track record in managing staging and production deployments, troubleshooting build and production issues, leading cloud and Artifactory migrations, enforcing security scanning and access controls, and delivering observability through Grafana, AWS CloudWatch, SNS, and Opsgenie. Focused on reliable, scalable, and secure delivery for high-impact systems across multiple environments.
                                </p>
                            </div>

                            <div className="rounded-[2.5rem] border border-slate-200/75 bg-white p-8 shadow-[0_18px_70px_-35px_rgba(15,23,42,0.15)]">
                                <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">Technical Skills</h3>

                                {/* Top Skills with Progress Bars */}
                                <div className="mt-8 space-y-5">
                                    {topSkills.map((skill) => (
                                        <div key={skill.name} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                                                <span className="text-sm font-semibold text-slate-600">{skill.proficiency}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-200">
                                                <div
                                                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Categorized Skills */}
                                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {skillCategories.map((category) => (
                                        <div
                                            key={category.title}
                                            className={`rounded-xl border-l-4 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-5 transition hover:shadow-md`}
                                        >
                                            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900">{category.title}</h4>
                                            <ul className="mt-4 space-y-2">
                                                {category.skills.map((skill) => (
                                                    <li key={skill} className="flex items-start">
                                                        <span className="mr-2 text-cyan-500">•</span>
                                                        <span className="text-sm text-slate-700">{skill}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-slate-200/75 bg-white p-8 shadow-[0_18px_70px_-35px_rgba(15,23,42,0.15)]">
                                <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">Education</h3>
                                <div className="mt-6 space-y-6">
                                    {education.map((item) => (
                                        <div key={item.title} className="space-y-2">
                                            <p className="text-xl font-semibold text-slate-950">{item.title}</p>
                                            <p className="text-sm text-slate-600">{item.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 text-center">
                        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{/* MODULE_02 — WORK HISTORY */}</p>
                        <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] text-slate-950">Professional Experience</h2>
                    </div>
                    <div className="space-y-8">
                        {projects.slice().reverse().map((proj) => (
                            <div key={proj.title} className="rounded-[1.25rem] border border-slate-200/80 bg-white p-8 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.08)]">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-950">{proj.title}</h3>
                                        <p className="mt-1 text-sm text-slate-500">Project</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        {proj.date && (
                                            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 bg-slate-50 rounded px-3 py-1">
                                                {proj.date}
                                            </div>
                                        )}
                                        {proj.location && proj.location.length > 0 && (
                                            <div className="mt-2 text-sm text-slate-500 flex items-center gap-2">
                                                <span className="text-slate-600">📍</span>
                                                <span>{proj.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-4 text-slate-600 leading-7">{proj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projects" className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 text-center">
                        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">// MODULE_03 — PROJECTS</p>
                        <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] text-slate-950">Projects</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {projects.slice().reverse().map((project) => (
                            <div key={project.title} className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.12)] transition hover:-translate-y-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-950">{project.title}</h3>
                                        {project.Company && <p className="mt-1 text-sm text-slate-500">{project.Company}</p>}
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        {project.date && <div className="text-xs uppercase tracking-[0.2em] text-slate-500 bg-slate-50 rounded px-3 py-1">{project.date}</div>}
                                        {project.location && project.location.length > 0 && (
                                            <div className="mt-2 text-sm text-slate-500 flex items-center gap-2">
                                                <span className="text-slate-600">📍</span>
                                                <span>{project.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-4 text-slate-600 leading-7">{project.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="relative px-6 py-24">
                <div className="mx-auto max-w-7xl mb-14 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{/* MODULE_05 — COMMUNICATION */}</p>
                    <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] text-slate-950">Contact Me</h2>
                </div>

                <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200/80 bg-white p-10 shadow-[0_24px_100px_-60px_rgba(15,23,42,0.16)]">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                        <div className="space-y-8">
                            <div className="max-w-xl">
                                <p className="text-lg leading-8 text-slate-600">Open to opportunities, collaborations, and freelance projects. Let’s build something incredible together.</p>
                            </div>

                            <div className="space-y-4 rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                                <ContactCard icon="✉️" label="Email" value="nagaraj7rg@gmail.com" href="mailto:nagaraj7rg@gmail.com" />
                                <ContactCard icon="🔗" label="LinkedIn" value="linkedin.com/in/nagaraj-chabbi-950b22319" href="https://www.linkedin.com/in/nagaraj-chabbi-950b22319/" />
                                <ContactCard icon="🐙" label="GitHub" value="github.com/NagarajCha" href="https://github.com/NagarajCha" />
                                <ContactCard icon="📞" label="Phone" value="+91 8495903060" href="tel:+919380227725" />
                                <ContactCard icon="📍" label="Location" value="Bengaluru, Karnataka, India" />
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm">
                            <div className="mb-6 text-sm uppercase tracking-[0.35em] text-slate-500">Send Message → nagaraj7rg@gmail.com</div>
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Your Name</p>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={contactName}
                                        onChange={(event) => setContactName(event.target.value)}
                                        className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email Address</p>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={contactEmail}
                                        onChange={(event) => setContactEmail(event.target.value)}
                                        className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Message</p>
                                    <textarea
                                        rows={6}
                                        placeholder="I’d like to discuss a project..."
                                        value={contactMessage}
                                        onChange={(event) => setContactMessage(event.target.value)}
                                        className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full rounded-3xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition ${isSubmitting ? "bg-slate-700 cursor-not-allowed" : "bg-slate-950 hover:bg-slate-800"
                                        }`}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                                {statusMessage && <p className="text-sm text-slate-600">{statusMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ContactCard({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
    const content = (
        <div className="flex items-center gap-4 rounded-[1.75rem] border border-slate-200 bg-white px-5 py-4 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg text-slate-800 shadow-sm">{icon}</span>
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
            </div>
        </div>
    );

    if (!href) {
        return content;
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    );
}
