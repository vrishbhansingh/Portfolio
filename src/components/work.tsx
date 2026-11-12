"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "@/data/profile";
import { SpotlightCard } from "./spotlight-card";
import { SectionHeading } from "./section-heading";

function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

function Showcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [reduce ? 1 : 0.3, 1]);

  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} className="relative">
      <div className="mb-8 flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="mr-auto max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="display text-sm font-semibold" style={{ color: project.accent }}>
              Project {String(index + 1).padStart(2, "0")}
            </span>
            {project.url ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-2.5 py-0.5 text-xs font-medium text-green">
                <span className="size-1.5 animate-pulse rounded-full bg-green" aria-hidden />
                Live in production
              </span>
            ) : (
              <span className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-medium text-muted">Client project</span>
            )}
          </div>
          <h3 id={`${project.slug}-title`} className="display mt-3 text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
            {project.name}
          </h3>
          <p className="mt-2 text-xl text-muted">{project.kind}</p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name} live site (opens in a new tab)`}
            className="group inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-[15px] font-medium transition-colors hover:border-ink/40"
          >
            Visit {hostOf(project.url)}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        )}
      </div>

      {project.image && (
        <div ref={ref} className="relative [perspective:2000px]">
          <div
            aria-hidden
            className="absolute inset-x-[8%] top-[10%] bottom-0 -z-10 rounded-[40px] opacity-40 blur-3xl dark:opacity-30"
            style={{ background: project.accent }}
          />
          <motion.div
            style={{ rotateX, scale, opacity, transformOrigin: "50% 0%" }}
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_50px_100px_-40px_rgb(20_26_38/0.5)]"
          >
            <div className="flex h-10 items-center gap-2 border-b border-line bg-paper px-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="mx-auto rounded-md bg-sunken px-3 py-0.5 text-xs text-muted">
                {project.url ? hostOf(project.url) : `${project.name.toLowerCase().replace(/\s+/g, "-")} / dashboard`}
              </span>
              <span className="w-12" />
            </div>
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1920}
              height={918}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <SpotlightCard className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur">
          <h4 className="text-sm font-semibold text-muted">What it does</h4>
          <p className="mt-3 text-[15px] leading-relaxed">{project.summary}</p>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur">
          <h4 className="text-sm font-semibold text-muted">What I built</h4>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed">
            {project.built.map((b) => (
              <li key={b} className="flex gap-2.5">
                <Check className="mt-1 size-4 shrink-0" style={{ color: project.accent }} aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur">
          <h4 className="text-sm font-semibold text-muted">Modules</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.modules.map((m) => (
              <li key={m} className="rounded-lg border border-line bg-paper px-2.5 py-1 text-[13px]">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{project.stack.join("  /  ")}</p>
        </SpotlightCard>
      </div>
    </article>
  );
}

export function Work() {
  const withScreens = projects.filter((p) => p.image);
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Products I've built"
          body="Business software where many companies, roles and departments share one system. Every screen below is from the running product."
        />
        <div className="mt-20 space-y-32">
          {withScreens.map((p, i) => (
            <Showcase key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
