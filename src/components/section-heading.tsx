"use client";

import { motion, useReducedMotion } from "motion/react";

export function SectionHeading({
  title,
  body,
  align = "left",
}: {
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <h2 className="display text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1] font-semibold tracking-[-0.035em]">
        {title}
      </h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-muted">{body}</p>}
    </motion.div>
  );
}
