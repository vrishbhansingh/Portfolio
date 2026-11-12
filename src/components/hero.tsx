"use client";

import { ArrowDown, FileDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { marquee, profile, stats } from "@/data/profile";
import { ProductStack } from "./product-stack";

const lines = ["Software that runs", "payroll, pipelines", "and factory floors."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/80 px-3 py-1.5 text-sm backdrop-blur sm:rounded-full"
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-green" />
            </span>
            {profile.availability}
          </motion.p>

          <h1 className="display mt-7 text-[clamp(2.1rem,9.2vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em] lg:text-[clamp(3rem,4.6vw,4.4rem)] lg:whitespace-nowrap">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m <span className="font-medium text-ink">{profile.name}</span>, a full stack
              developer in Delhi. I build multi-tenant HR, CRM and ERP products with React.js and
              Laravel, from the database schema to the last pixel of the dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-medium text-paper shadow-[0_10px_30px_-10px_var(--indigo)] transition-transform hover:-translate-y-0.5"
              >
                See my work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-surface/80 px-5 text-[15px] font-medium backdrop-blur transition-colors hover:border-ink/40"
              >
                <FileDown className="size-4" aria-hidden />
                Resume
              </a>
              <div className="flex items-center gap-1 pl-1">
                {profile.links.github && (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:bg-sunken hover:text-ink"
                  >
                    <SiGithub className="size-5" />
                  </a>
                )}
                {profile.links.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:bg-sunken hover:text-[#0a66c2]"
                  >
                    <FaLinkedin className="size-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <ProductStack />
      </div>

      {/* Stats */}
      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-line p-5 sm:p-6 [&:not(:last-child)]:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-4xl font-semibold tracking-tight sm:text-5xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Modules marquee */}
      <div className="group relative mt-16 overflow-hidden border-y border-line bg-surface/50 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="animate-marquee flex w-max gap-10" aria-label="Modules I have built">
          {[...marquee, ...marquee].map((m, i) => (
            <li
              key={i}
              aria-hidden={i >= marquee.length}
              className="display flex items-center gap-10 text-2xl font-medium whitespace-nowrap text-muted sm:text-3xl"
            >
              {m}
              <span className="size-1.5 rounded-full bg-indigo" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
