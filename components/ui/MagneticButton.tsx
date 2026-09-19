"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  as = "button",
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    window.requestAnimationFrame(() => {
      setIsFinePointer(mediaQuery.matches);
    });

    const updatePointer = (event: MediaQueryListEvent) => {
      setIsFinePointer(event.matches);
    };

    mediaQuery.addEventListener("change", updatePointer);
    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isFinePointer || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isExternal = href?.startsWith("http");

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {as === "a" && href ? (
        isExternal ? (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            data-cursor="link"
            className={className}
            style={{ x: springX, y: springY }}
          >
            {children}
          </motion.a>
        ) : (
          <Link href={href} legacyBehavior passHref>
            <motion.a
              onClick={onClick}
              data-cursor="link"
              className={className}
              style={{ x: springX, y: springY }}
            >
              {children}
            </motion.a>
          </Link>
        )
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          data-cursor="link"
          className={className}
          style={{ x: springX, y: springY }}
        >
          {children}
        </motion.button>
      )}
    </div>
  );
}

