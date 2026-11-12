"use client";

import { Check, Copy, FileDown, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";

const reasons = ["Full-time role", "Freelance project", "Something else"] as const;

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const field =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-indigo";

export function Contact() {
  const [reason, setReason] = useState<(typeof reasons)[number]>("Full-time role");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, reason }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "The message didn't go through.");
      form.reset();
      setState({ kind: "sent" });
    } catch (err) {
      setState({
        kind: "error",
        message: `${err instanceof Error ? err.message : "The message didn't go through."} You can email ${profile.email} directly.`,
      });
    }
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="ring-gradient relative mx-auto grid max-w-6xl gap-12 overflow-hidden rounded-[2rem] border border-line bg-surface/70 p-6 backdrop-blur-xl sm:p-10 lg:grid-cols-[1fr_minmax(0,32rem)] lg:p-14">
        <div aria-hidden className="absolute -top-32 -left-32 -z-10 size-96 rounded-full bg-indigo opacity-20 blur-3xl" />
        <div aria-hidden className="absolute -right-24 -bottom-32 -z-10 size-80 rounded-full bg-violet opacity-15 blur-3xl" />
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-green-soft px-3 py-1 text-sm font-medium text-green">
            <span className="size-1.5 animate-pulse rounded-full bg-green" aria-hidden />
            Open to work and freelance
          </p>
          <h2 className="display mt-5 max-w-[11ch] text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
            Have something to build?
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted">
            I&apos;m open to full-time roles and freelance projects, especially internal tools,
            dashboards and SaaS products. Tell me what you need and I&apos;ll reply by email.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-[15px] font-medium transition-colors hover:border-ink/40"
            >
              <Mail className="size-4" aria-hidden />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-[15px] text-muted transition-colors hover:bg-sunken hover:text-ink"
            >
              {copied ? <Check className="size-4 text-green" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 text-[15px] text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            <FileDown className="size-4" aria-hidden />
            Download resume (PDF)
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            {profile.links.linkedin && (
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-surface p-5 shadow-[0_30px_60px_-30px_rgb(20_26_38/0.35)] sm:p-7"
          aria-describedby="form-status"
        >
          <fieldset>
            <legend className="text-sm font-semibold">What is this about?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {reasons.map((r) => (
                <label
                  key={r}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-indigo ${
                    reason === r ? "border-indigo bg-indigo-soft text-ink" : "border-line text-muted hover:text-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason-choice"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="sr-only"
                  />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className={`${field} mt-1.5`}
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-medium">Message</span>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={4000}
              rows={5}
              placeholder={
                reason === "Freelance project"
                  ? "What do you need built, and by when?"
                  : reason === "Full-time role"
                    ? "Tell me about the role and the team."
                    : "How can I help?"
              }
              className={`${field} mt-1.5 resize-y`}
            />
          </label>
          {/* Honeypot: hidden from people, filled in by bots */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={state.kind === "sending"}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[15px] font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {state.kind === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {state.kind === "sending" ? "Sending" : "Send message"}
            </button>
            <p id="form-status" role="status" className="text-sm">
              {state.kind === "sent" && <span className="text-green">Message sent. I&apos;ll reply by email.</span>}
              {state.kind === "error" && <span className="text-red-600 dark:text-red-400">{state.message}</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
