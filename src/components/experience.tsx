"use client";

import { GraduationCap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { education, experience } from "@/data/profile";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[22rem_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading title="Where I've worked" body="Four teams in Delhi NCR, from front-end intern to full stack product developer." />
          <div className="mt-10 rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <GraduationCap className="size-4 text-indigo" aria-hidden /> Education
            </p>
            <ul className="mt-3 space-y-3">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">
                    {e.place}
                    {e.year && `, ${e.year}`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol ref={ref} className="relative">
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-full bg-line">
            <motion.div
              className="h-full origin-top rounded-full bg-gradient-to-b from-indigo to-violet"
              style={{ scaleY: reduce ? 1 : fill }}
            />
          </div>
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pb-10 pl-10 last:pb-0"
            >
              <span
                aria-hidden
                className={`absolute top-1.5 left-0 grid size-4 place-items-center rounded-full border-2 bg-paper ${
                  job.current ? "border-green" : "border-indigo"
                }`}
              >
                {job.current && <span className="size-1.5 animate-ping rounded-full bg-green" />}
              </span>
              <div className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur transition-colors hover:border-indigo/50">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="display text-2xl font-semibold tracking-tight">{job.company}</h3>
                  {job.current && (
                    <span className="rounded-full bg-green-soft px-2 py-0.5 text-xs font-medium text-green">Current</span>
                  )}
                  <time className="ml-auto text-sm text-muted">{job.period}</time>
                </div>
                <p className="mt-1 text-[15px] text-muted">
                  {job.role}, {job.place}
                </p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-indigo" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
