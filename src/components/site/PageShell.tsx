import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-cream text-ink selection:bg-ink selection:text-cream">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 10%, rgba(232,226,217,0.9), transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(245,241,234,0.9), transparent 60%)",
        }}
      />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {/* Spacer so the fixed mobile tab bar never covers footer content */}
      <div aria-hidden className="h-16 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-5 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-12 lg:px-12 lg:pt-20">
      <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe sm:mb-5 sm:tracking-[0.4em]">
        <span className="h-px w-8 bg-taupe" />
        {eyebrow}
      </p>
      <h1 className="max-w-[18ch] font-serif text-4xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {intro && <p className="mt-6 max-w-[52ch] leading-relaxed text-taupe">{intro}</p>}
    </header>
  );
}
