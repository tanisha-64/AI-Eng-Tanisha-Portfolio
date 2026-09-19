"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

interface RevealTextProps {
  text: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.6,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className = "",
}: RevealTextProps) {
  if (!text) return null;

  const words = text.trim().split(/\s+/);

  return (
    <span className={`inline-wrap ${className}`.trim()}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}