"use client";

import { Database, KeyRound, Lock, MailCheck, ScrollText, Settings2, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const companies = ["Company A", "Company B", "Company C"];

const insideEach = [
  { icon: Settings2, label: "Its own masters" },
  { icon: Users, label: "Users and roles" },
  { icon: ScrollText, label: "Audit log" },
];

// How EZHRM, EZCRM and Sugam ERP are put together: database per company,
// with a central master database that knows where each company lives.
export function TenancyDiagram() {
  const reduce = useReducedMotion();
  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay },
        };

  return (
    <figure className="ring-gradient rounded-3xl border border-line bg-surface/80 p-5 backdrop-blur sm:p-8">
      <figcaption>
        <h3 className="display text-2xl font-semibold tracking-tight sm:text-3xl">How my SaaS products are built</h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
          EZHRM, EZCRM and Sugam ERP share one architecture: every company gets its own database. I built the
          backend pieces that make this work.
        </p>
      </figcaption>

      <div className="mt-8 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_2.2fr]">
        {/* Step 1: signup */}
        <motion.div {...appear(0)} className="rounded-2xl border border-line bg-paper p-5">
          <p className="text-xs text-muted">Step 1</p>
          <MailCheck className="mt-3 size-6 text-indigo" aria-hidden />
          <p className="display mt-3 text-lg font-semibold">Company signs up</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">Email and OTP verification before an account is created.</p>
        </motion.div>

        <Arrow />

        {/* Step 2: master DB */}
        <motion.div {...appear(0.1)} className="rounded-2xl border border-indigo/40 bg-indigo-soft p-5">
          <p className="text-xs text-muted">Step 2</p>
          <Database className="mt-3 size-6 text-indigo" aria-hidden />
          <p className="display mt-3 text-lg font-semibold">Master database</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Registers the company, creates its database and remembers which database belongs to whom.
          </p>
        </motion.div>

        <Arrow />

        {/* Step 3: one DB per company */}
        <motion.div {...appear(0.2)} className="rounded-2xl border border-line bg-paper p-5">
          <p className="text-xs text-muted">Step 3</p>
          <p className="display mt-3 text-lg font-semibold">A separate database for each company</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {companies.map((c) => (
              <li key={c} className="rounded-xl border border-line bg-surface p-3">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Database className="size-4 text-green" aria-hidden />
                  {c}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {insideEach.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-1.5 text-xs text-muted">
                      <Icon className="size-3.5" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        {...appear(0.3)}
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        <div className="flex gap-3 rounded-2xl border border-line bg-paper p-4">
          <KeyRound className="mt-0.5 size-5 shrink-0 text-saffron" aria-hidden />
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Every API request is checked.</span>{" "}
            <span className="text-muted">Authentication, validation and permission checks run before anything touches a company&apos;s data.</span>
          </p>
        </div>
        <div className="flex gap-3 rounded-2xl border border-line bg-paper p-4">
          <Lock className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Companies are fully isolated.</span>{" "}
            <span className="text-muted">A request only ever reaches the signed-in company&apos;s own database, so no company can read another&apos;s data.</span>
          </p>
        </div>
      </motion.div>
    </figure>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 text-muted lg:py-0">
      <svg viewBox="0 0 24 24" className="size-5 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
