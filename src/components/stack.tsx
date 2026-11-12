"use client";

import { Building2, GitBranch, LayoutDashboard, ShieldCheck } from "lucide-react";
import {
  SiBootstrap,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPostman,
  SiReact,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { SectionHeading } from "./section-heading";
import { SpotlightCard } from "./spotlight-card";

type Tool = { name: string; icon: IconType; color: string };

const front: Tool[] = [
  { name: "React.js", icon: SiReact, color: "#58c4dc" },
  { name: "JavaScript", icon: SiJavascript, color: "#e8c500" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", icon: SiCss, color: "#663399" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
];
const back: Tool[] = [
  { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
  { name: "PHP", icon: SiPhp, color: "#777bb4" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "REST APIs", icon: SiJson, color: "#8a8f98" },
];
const tools: Tool[] = [
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "currentColor" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37" },
];

const patterns = [
  { icon: Building2, title: "Multi-tenancy", body: "Many companies on one deployment, each with its own data, users and settings." },
  { icon: ShieldCheck, title: "Roles and permissions", body: "Admin, manager and employee views that only show what each person may touch." },
  { icon: GitBranch, title: "Approval workflows", body: "Leave, documents, reimbursements and orders that move through people in order." },
  { icon: LayoutDashboard, title: "Live dashboards", body: "Counts and pipelines that tell a manager what needs attention today." },
];

function ToolGrid({ items }: { items: Tool[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map(({ name, icon: Icon, color }) => (
        <li
          key={name}
          className="group/tool inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
        >
          <Icon className="size-[18px]" style={{ color }} aria-hidden />
          {name}
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Full stack, for real"
          body="From the screen a user clicks to the query that answers it. These are the tools I ship production code with every day."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <SpotlightCard className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:col-span-4">
            <SiReact aria-hidden className="absolute -top-10 -right-10 size-56 text-[#58c4dc] opacity-[0.08] motion-safe:animate-[spin_40s_linear_infinite]" />
            <p className="text-sm text-muted">Interface</p>
            <h3 className="display mt-1 text-3xl font-semibold">Fast, responsive dashboards</h3>
            <p className="mt-2 max-w-md text-[15px] text-muted">
              Reusable React components, clean state and layouts that work from a phone to a 27-inch monitor.
            </p>
            <ToolGrid items={front} />
          </SpotlightCard>

          <SpotlightCard className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:col-span-2">
            <p className="text-sm text-muted">Workflow</p>
            <h3 className="display mt-1 text-3xl font-semibold">Ship it clean</h3>
            <p className="mt-2 text-[15px] text-muted">Version control, API testing and a tidy history.</p>
            <ToolGrid items={tools} />
          </SpotlightCard>

          <SpotlightCard className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:col-span-3">
            <SiLaravel aria-hidden className="absolute -right-8 -bottom-8 size-44 text-[#ff2d20] opacity-[0.07]" />
            <p className="text-sm text-muted">Application and data</p>
            <h3 className="display mt-1 text-3xl font-semibold">Laravel APIs on MySQL</h3>
            <p className="mt-2 max-w-md text-[15px] text-muted">
              MVC backends, authentication, role management and queries tuned for multi-tenant scale.
            </p>
            <ToolGrid items={back} />
          </SpotlightCard>

          <div className="grid gap-4 sm:grid-cols-2 md:col-span-3">
            {patterns.map(({ icon: Icon, title, body }) => (
              <SpotlightCard key={title} className="rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur">
                <span className="grid size-10 place-items-center rounded-xl bg-indigo-soft text-indigo">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="display mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
