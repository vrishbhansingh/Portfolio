"use client";

import { Cloud, CreditCard, Database, Plug, Server, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { SiReact } from "react-icons/si";
import type { IconType } from "react-icons";
import { expertise } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { SpotlightCard } from "./spotlight-card";

const icons: Record<(typeof expertise)[number]["icon"], LucideIcon | IconType> = {
  react: SiReact,
  server: Server,
  database: Database,
  cloud: Cloud,
  card: CreditCard,
  plug: Plug,
  shield: ShieldCheck,
  workflow: Workflow,
};

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="What I can take on"
          body="Work across the front end, the back end, the database and the server it runs on."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item) => {
            const Icon = icons[item.icon];
            return (
              <SpotlightCard
                key={item.title}
                as="li"
                className="flex flex-col rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur transition-colors hover:border-indigo/40"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-indigo-soft text-indigo">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="display mt-5 text-xl leading-snug font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <li key={t} className="rounded-md bg-sunken px-2 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
