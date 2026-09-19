"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "RESEARCH", href: "/research" },
  { label: "JOURNEY", href: "/journey" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openAITwin = () => {
    window.dispatchEvent(new CustomEvent("open-ai-twin"));
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-5 py-5 md:px-10">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            data-cursor="link"
            aria-label="Tanisha Gupta — Home"
            className="font-mono-label text-sm tracking-[0.15em]"
          >
            TG
            <span style={{ color: "var(--accent)" }}>/</span>
            AI
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 font-mono-label text-[12px] tracking-[0.15em] md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  aria-current={active ? "page" : undefined}
                  className={`link-underline transition-opacity duration-300 hover:opacity-80 ${
                    active
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop AI Twin */}
          <button
            type="button"
            onClick={openAITwin}
            data-cursor="ai"
            aria-label="Open Tanisha's AI Twin"
            className="hidden items-center gap-2 rounded-full border px-4 py-2 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] md:inline-flex"
            style={{
              borderColor: "var(--line)",
              color: "var(--accent)",
            }}
          >
            ASK MY AI TWIN
            <span aria-hidden="true">✦</span>
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="font-mono-label text-xs tracking-[0.15em] md:hidden"
            style={{ color: "var(--text-primary)" }}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 px-6 md:hidden"
            style={{ background: "var(--bg-primary)" }}
          >
            <nav
              aria-label="Mobile primary navigation"
              className="flex flex-col items-center gap-7"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    data-cursor="link"
                    onClick={() => setOpen(false)}
                    aria-current={
                      isActive(item.href) ? "page" : undefined
                    }
                    className="display text-4xl font-semibold tracking-[-0.04em]"
                    style={{
                      color: isActive(item.href)
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: NAV_ITEMS.length * 0.06,
                duration: 0.4,
              }}
              onClick={() => {
                setOpen(false);
                openAITwin();
              }}
              data-cursor="ai"
              className="mt-5 rounded-full border px-6 py-3 font-mono-label text-[12px] tracking-[0.15em]"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              ASK MY AI TWIN ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}