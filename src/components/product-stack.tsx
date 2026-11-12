"use client";

import Image from "next/image";
import { Activity, IndianRupee, Factory } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// Three real dashboards stacked in perspective. Tilts gently toward the cursor.
export function ProductStack() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40, rotateX: 18 },
          animate: { opacity: 1, y: 0, rotateX: 0 },
          transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div
      className="relative mx-auto aspect-[16/12] w-full max-w-[640px] [perspective:1600px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX: rx, rotateY: ry }}>
        {/* Back: DST ERP */}
        <motion.div
          {...enter(0.5)}
          className="absolute top-0 right-0 w-[78%] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl [transform:translateZ(-80px)]"
        >
          <Image src="/work/dst-erp-dashboard.webp" alt="" width={1920} height={918} className="h-auto w-full opacity-90" priority />
        </motion.div>
        {/* Middle: EZCRM */}
        <motion.div
          {...enter(0.35)}
          className="absolute top-[22%] left-0 w-[78%] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl [transform:translateZ(-20px)]"
        >
          <Image src="/work/ezcrm-dashboard.webp" alt="" width={1920} height={918} className="h-auto w-full" priority />
        </motion.div>
        {/* Front: EZHRM */}
        <motion.div
          {...enter(0.2)}
          className="ring-gradient absolute right-[4%] bottom-0 w-[80%] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_80px_-30px_rgb(20_26_38/0.55)] [transform:translateZ(40px)]"
        >
          <div className="flex h-6 items-center gap-1.5 border-b border-line bg-paper px-3">
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="ml-2 text-[10px] text-muted">premium.ezhrm.in</span>
          </div>
          <Image
            src="/work/ezhrm-dashboard.webp"
            alt="Dashboards from EZHRM, EZCRM and DST Production ERP"
            width={1920}
            height={918}
            className="h-auto w-full"
            priority
          />
        </motion.div>

        {/* Floating widgets lifted from the dashboards */}
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 1.1 } })}
          className="absolute top-[14%] -left-[4%] [transform:translateZ(90px)]"
        >
          <div className="animate-float flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3 py-2 shadow-xl backdrop-blur">
            <span className="grid size-8 place-items-center rounded-lg bg-indigo-soft text-indigo">
              <Activity className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] text-muted">EZHRM attendance</p>
              <p className="text-sm font-semibold">58 employees synced</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 1.3 } })}
          className="absolute top-[52%] -right-[3%] [transform:translateZ(110px)]"
        >
          <div className="animate-float flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3 py-2 shadow-xl backdrop-blur [animation-delay:-2s]">
            <span className="grid size-8 place-items-center rounded-lg bg-green-soft text-green">
              <IndianRupee className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] text-muted">EZCRM won revenue</p>
              <p className="text-sm font-semibold">₹1,63,697</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 1.5 } })}
          className="absolute -bottom-[5%] left-[2%] [transform:translateZ(70px)]"
        >
          <div className="animate-float flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3 py-2 shadow-xl backdrop-blur [animation-delay:-4s]">
            <span className="grid size-8 place-items-center rounded-lg bg-saffron-soft text-saffron">
              <Factory className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] text-muted">DST ERP floor</p>
              <p className="text-sm font-semibold">3 orders in production</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
