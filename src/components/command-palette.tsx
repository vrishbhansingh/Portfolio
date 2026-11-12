"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Copy,
  ExternalLink,
  FileDown,
  Layers,
  Mail,
  Moon,
  Search,
  Send,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/data/profile";
import { toggleTheme } from "./theme-toggle";

type Command = {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  run: () => void;
};

function go(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", hash);
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActive(0);
  }, [onOpenChange]);

  const commands = useMemo<Command[]>(
    () => [
      { id: "work", label: "Go to work", group: "Sections", icon: Briefcase, run: () => go("#work") },
      { id: "sugam", label: "Go to Sugam ERP", group: "Sections", icon: Layers, run: () => go("#sugam-erp") },
      { id: "expertise", label: "Go to expertise", group: "Sections", icon: Layers, run: () => go("#expertise") },
      { id: "exp", label: "Go to experience", group: "Sections", icon: Layers, run: () => go("#experience") },
      { id: "stack", label: "Go to stack", group: "Sections", icon: Layers, run: () => go("#stack") },
      { id: "contact", label: "Go to contact", group: "Sections", icon: Send, run: () => go("#contact") },
      ...projects
        .filter((p) => p.url)
        .map((p) => ({
          id: `open-${p.slug}`,
          label: `Open ${p.name} live site`,
          group: "Products",
          icon: ExternalLink,
          run: () => window.open(p.url, "_blank", "noopener,noreferrer"),
        })),
      ...(
        [
          ["linkedin", "Open LinkedIn profile", profile.links.linkedin],
          ["github", "Open GitHub profile", profile.links.github],
        ] as const
      )
        .filter(([, , url]) => url)
        .map(([id, label, url]) => ({
          id,
          label,
          group: "Profiles",
          icon: ExternalLink,
          run: () => window.open(url, "_blank", "noopener,noreferrer"),
        })),
      {
        id: "copy",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      { id: "mail", label: "Write an email", group: "Actions", icon: Mail, run: () => (location.href = `mailto:${profile.email}`) },
      { id: "resume", label: "Download resume", group: "Actions", icon: FileDown, run: () => window.open(profile.resume, "_blank") },
      { id: "theme", label: "Switch light or dark mode", group: "Actions", icon: Moon, run: toggleTheme },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  function runAt(index: number) {
    const cmd = results[index];
    if (!cmd) return;
    cmd.run();
    if (cmd.id !== "copy") close();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  }

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[14vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(16_20_28/0.45)]"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search pages and actions"
                aria-label="Search pages and actions"
                aria-controls="command-results"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                className="h-13 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 text-xs text-muted">Esc</kbd>
            </div>
            <ul id="command-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  Nothing matches “{query}”. Try “work” or “email”.
                </li>
              )}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                const Icon = cmd.icon;
                return (
                  <li key={cmd.id} role="presentation">
                    {header && (
                      <div className="px-3 pt-3 pb-1 text-xs font-medium text-muted">{header}</div>
                    )}
                    <div
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => runAt(i)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] ${
                        i === active ? "bg-indigo-soft text-ink" : "text-ink/85"
                      }`}
                    >
                      <Icon className={`size-4 ${i === active ? "text-indigo" : "text-muted"}`} aria-hidden />
                      <span className="flex-1">{cmd.id === "copy" && copied ? "Email copied" : cmd.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
