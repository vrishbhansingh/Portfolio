"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Boxes, ShieldCheck } from "lucide-react";
import { projects, sugamDepartments } from "@/data/profile";
import { OrderFlow } from "./order-flow";
import { SectionHeading } from "./section-heading";
import { ProjectDetails } from "./work";

const highlights = [
  {
    icon: MapPin,
    title: "Field sales you can see",
    body: "Every salesman's visits, tasks and follow-ups are logged against the customer, so managers know what happened on the ground.",
  },
  {
    icon: Boxes,
    title: "Production from the BOM",
    body: "Orders explode into materials and semi-finished parts. The floor builds in-house parts first, then the final product.",
  },
  {
    icon: ShieldCheck,
    title: "Tracked to the gate",
    body: "Goods are tested before they're stocked, billed before they ship, and logged on a gate pass when they leave.",
  },
];

export function Sugam() {
  const reduce = useReducedMotion();
  const sugam = projects.find((p) => p.slug === "sugam-erp")!;

  return (
    <section id="sugam-erp" className="relative overflow-hidden border-y border-line bg-surface/40 py-24 sm:py-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_100%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="display text-sm font-semibold text-green">Sugam ERP</span>
          <span className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-medium text-muted">Multi-tenant SaaS</span>
        </div>
        <div className="mt-3">
          <SectionHeading title="From customer visit to the factory gate" body={sugam.summary} />
        </div>

        {/* 1. The flow */}
        <div className="mt-14">
          <OrderFlow />
        </div>

        {/* 2. What makes it different */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur">
              <Icon className="size-5 text-green" aria-hidden />
              <h3 className="display mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>

        {/* 3. Every module, grouped by who uses it */}
        <div className="mt-20">
          <h3 className="display text-3xl font-semibold tracking-tight">Every module, by department</h3>
          <p className="mt-2 max-w-xl text-muted">Sixteen modules in four departments, all working on the same records.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sugamDepartments.map((dept, i) => (
              <motion.section
                key={dept.name}
                aria-labelledby={`dept-${i}`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="h-1" style={{ background: dept.color }} aria-hidden />
                <div className="p-5">
                  <h4 id={`dept-${i}`} className="display text-lg font-semibold" style={{ color: dept.color }}>
                    {dept.name}
                  </h4>
                  <ul className="mt-4 divide-y divide-line">
                    {dept.modules.map((m) => (
                      <li key={m.title} className="py-3 first:pt-0 last:pb-0">
                        <p className="text-[15px] font-medium">{m.title}</p>
                        <p className="mt-0.5 text-sm leading-snug text-muted">{m.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">Built with {sugam.stack.join(", ")}.</p>
        </div>

        <ProjectDetails project={sugam} showSummary={false} showModules={false} />
      </div>
    </section>
  );
}
