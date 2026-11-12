"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

const noop = () => () => {};

const nav = [
  { href: "#work", label: "Work" },
  { href: "#sugam-erp", label: "Sugam ERP" },
  { href: "#expertise", label: "Expertise" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const isMac = useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);

    // Highlight the nav item for the section in view
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (window.scrollY < 300) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border border-line/80 bg-surface/70 pr-2 pl-4 shadow-[0_10px_40px_-20px_rgb(20_26_38/0.35)] backdrop-blur-xl">
          <a href="#top" className="mr-auto flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
            <span className="display grid size-8 place-items-center rounded-lg bg-ink text-sm font-bold text-paper">
              VS
            </span>
            <span className="display hidden font-semibold tracking-tight sm:inline">{profile.name}</span>
          </a>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "true" : undefined}
                className={`relative rounded-lg px-3 py-1.5 text-[14px] transition-colors ${
                  active === n.href ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === n.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-sunken"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {n.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden h-9 items-center gap-2 rounded-lg border border-line bg-paper/60 px-3 text-sm text-muted transition-colors hover:text-ink sm:flex"
          >
            <Search className="size-3.5" aria-hidden />
            Search
            <kbd className="ml-1 rounded border border-line px-1 text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-sunken hover:text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-surface/95 p-3 backdrop-blur-xl lg:hidden"
            >
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="display block rounded-xl px-3 py-3 text-xl hover:bg-sunken"
                >
                  {n.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setPaletteOpen(true);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted hover:bg-sunken"
              >
                <Search className="size-4" aria-hidden /> Search pages and actions
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
