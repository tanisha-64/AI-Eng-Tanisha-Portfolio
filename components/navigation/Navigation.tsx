"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const NAV_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "RESEARCH", href: "/research" },
  { label: "JOURNEY", href: "/journey" },
  { label: "CONTACT", href: "/contact" },
];

interface MagnifyNavItemProps {
  item: { label: string; href: string };
  mouseX: MotionValue<number>;
  active: boolean;
}

function MagnifyNavItem({ item, mouseX, active }: MagnifyNavItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  // Measure distance from mouse cursor to center of item
  const distance = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect();
    if (!bounds || val === Infinity) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  // macOS dock proximity scale mapping
  const scaleSync = useTransform(
    distance,
    [-150, -80, -35, 0, 35, 80, 150],
    [1, 1.06, 1.16, 1.25, 1.16, 1.06, 1]
  );

  const scale = useSpring(scaleSync, {
    mass: 0.22,
    stiffness: 240,
    damping: 18,
  });

  return (
    <motion.div
      style={{
        scale,
        transformOrigin: "center center",
      }}
      className="relative flex items-center justify-center py-1 will-change-transform"
    >
      <Link
        ref={itemRef}
        href={item.href}
        data-cursor="link"
        aria-current={active ? "page" : undefined}
        className={`relative inline-block px-3 py-1 font-mono text-[12px] tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none ${
          active
            ? "font-semibold text-[var(--accent)]"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
      >
        {item.label}

        {/* Active route indicator dot */}
        {active && (
          <motion.span
            layoutId="activeNavDot"
            className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

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
      <header
        className="fixed left-0 right-0 top-0 z-50 flex h-[62px] items-center px-5 md:px-12 backdrop-blur-md"
        style={{
          background: "rgba(7, 7, 7, 0.75)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            data-cursor="link"
            aria-label="Tanisha Gupta — Home"
            className="font-mono text-sm tracking-[0.16em] font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
          >
            TG
            <span style={{ color: "var(--accent)" }}>/</span>
            AI
          </Link>

          {/* Desktop macOS Magnification Dock Navigation */}
          <nav
            aria-label="Primary navigation"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="hidden items-center gap-4 rounded-full border border-[rgba(243,240,234,0.08)] bg-[#101010]/70 px-4 py-1.5 backdrop-blur-lg md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <MagnifyNavItem
                key={item.href}
                item={item}
                mouseX={mouseX}
                active={isActive(item.href)}
              />
            ))}
          </nav>

          {/* Desktop AI Twin Button */}
          <button
            type="button"
            onClick={openAITwin}
            data-cursor="ai"
            aria-label="Open Tanisha's AI Twin"
            className="group hidden items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.15em] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] md:inline-flex"
            style={{
              borderColor: "var(--line)",
              color: "var(--accent)",
            }}
          >
            <span>ASK MY AI TWIN</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:rotate-45"
            >
              ✦
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="font-mono text-xs tracking-[0.15em] text-[var(--text-primary)] md:hidden"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
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
              className="mt-5 rounded-full border px-6 py-3 font-mono text-[12px] tracking-[0.15em]"
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