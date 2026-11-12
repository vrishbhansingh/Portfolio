import { Backdrop } from "@/components/backdrop";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Stack } from "@/components/stack";
import { Sugam } from "@/components/sugam";
import { Work } from "@/components/work";
import { profile } from "@/data/profile";

export default function Home() {
  const { github, linkedin } = profile.links;
  return (
    <SmoothScroll>
      <Backdrop />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Sugam />
        <Expertise />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <footer className="overflow-hidden border-t border-line">
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <p className="mr-auto">
              {profile.role} in {profile.location}. Built with Next.js, Tailwind CSS and Motion.
            </p>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                GitHub
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                LinkedIn
              </a>
            )}
            <a href={`mailto:${profile.email}`} className="hover:text-ink">
              Email
            </a>
          </div>
          <p
            aria-hidden
            className="display text-sheen animate-sheen mt-12 pb-10 text-center text-[min(10vw,7.25rem)] leading-[1.05] font-bold tracking-[-0.045em] whitespace-nowrap select-none"
          >
            Vrishbhan Singh
          </p>
        </div>
      </footer>
    </SmoothScroll>
  );
}
