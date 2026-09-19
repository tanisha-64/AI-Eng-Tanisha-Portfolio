"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

type CursorVariant = "default" | "link" | "ai";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [variant, setVariant] =
    useState<CursorVariant>("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, {
    damping: 30,
    stiffness: 400,
    mass: 0.4,
  });

  const springY = useSpring(cursorY, {
    damping: 30,
    stiffness: 400,
    mass: 0.4,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerMode = () => {
      setIsTouch(!mediaQuery.matches);
    };

    updatePointerMode();

    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      const target = event.target;

      if (!(target instanceof Element)) {
        setVariant("default");
        return;
      }

      if (target.closest("[data-cursor='ai']")) {
        setVariant("ai");
      } else if (
        target.closest("a, button, [data-cursor='link']")
      ) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };

    const resetCursor = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      setVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetCursor);
    };
  }, [cursorX, cursorY, isTouch]);

  if (isTouch) {
    return null;
  }

  const size =
    variant === "default"
      ? 10
      : variant === "link"
        ? 34
        : 40;

  const cursorColor =
    variant === "ai"
      ? "var(--accent)"
      : "var(--text-primary)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        backgroundColor: cursorColor,
      }}
    />
  );
}