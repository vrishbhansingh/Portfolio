"use client";

import { Check, RotateCcw } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { orderFlow } from "@/data/profile";

const STEP_MS = 600;

// A sales order moving through Sugam ERP's departments, from quotation to dispatch.
// Starts when it scrolls into view; visitors can replay it.
export function OrderFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const last = orderFlow.length;
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = -1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = reduce ? last : i + 1;
      setStep(i);
      if (i < last) timer = setTimeout(tick, STEP_MS);
    };
    timer = setTimeout(tick, reduce ? 0 : 300);
    return () => clearTimeout(timer);
  }, [inView, run, reduce, last]);

  function replay() {
    setStep(-1);
    setRun((r) => r + 1);
  }

  const done = step >= last;
  const progress = Math.max(0, Math.min(step, last)) / last;

  return (
    <div ref={ref} className="ring-gradient rounded-3xl border border-line bg-surface/80 p-5 backdrop-blur sm:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div>
          <p className="text-xs text-muted">Sales order</p>
          <p className="display text-2xl font-semibold">SO-2417</p>
        </div>
        <p
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            done ? "bg-green-soft text-green" : "bg-saffron-soft text-saffron"
          }`}
          aria-live="polite"
        >
          <span className={`size-1.5 rounded-full ${done ? "bg-green" : "animate-pulse bg-saffron"}`} aria-hidden />
          {done ? "Dispatched to customer" : step < 0 ? "Order received" : `At ${orderFlow[step].toLowerCase()}`}
        </p>
        <button
          type="button"
          onClick={replay}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Replay
        </button>
      </div>

      <ol className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-2">
        {/* connector line on large screens */}
        <div aria-hidden className="absolute top-5 right-[6%] left-[6%] hidden h-0.5 bg-line lg:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-green via-green to-saffron"
            animate={{ scaleX: progress }}
            transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: "easeOut" }}
          />
        </div>
        {orderFlow.map((stage, i) => {
          const state = i < step ? "done" : i === step ? "active" : "waiting";
          return (
            <li key={stage} className="relative flex flex-col items-start lg:items-center lg:text-center">
              <motion.span
                animate={state === "active" && !reduce ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative z-10 grid size-10 place-items-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 ${
                  state === "done"
                    ? "border-green bg-green text-surface"
                    : state === "active"
                      ? "border-saffron bg-saffron-soft text-saffron shadow-[0_0_0_6px_var(--saffron-soft)]"
                      : "border-line bg-surface text-muted"
                }`}
              >
                {state === "done" ? <Check className="size-4" aria-label="done" /> : i + 1}
              </motion.span>
              <p
                className={`mt-3 text-[14px] leading-snug font-medium transition-colors ${
                  state === "waiting" ? "text-muted" : "text-ink"
                }`}
              >
                {stage}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
