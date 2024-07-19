"use client";

import React,{ useRef } from "react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { CSSProperties } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inview?: boolean;
  inViewMargin?: string;
  blur?: string;
  Color?:string,
  TableRows?:boolean
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inview = false,
  inViewMargin = "-50px",
  blur = "6px",
  Color,
  TableRows=false,
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inview || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  const style: CSSProperties = {
    "--accent": Color,
  } as CSSProperties;

  return (
    <AnimatePresence>
      {TableRows ? <motion.tr
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
        style={style}
      >
        {children}
      </motion.tr>:
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
      }
    </AnimatePresence>
  );
}
