"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

import {
  scrollRevealFade,
  scrollRevealFadeUp,
  scrollRevealHeadingViewport,
  scrollRevealStagger,
  scrollRevealViewport,
} from "./presets";

type ScrollRevealSectionProps = HTMLMotionProps<"section"> & {
  children: ReactNode;
};

type ScrollRevealBlockProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  /** Самостоятельная анимация при скролле (вне stagger-секции) */
  inView?: boolean;
  /** Заголовок секции — появляется раньше контента ниже */
  revealEarly?: boolean;
  /** Только fade, без сдвига — для изображений не использовать */
  fadeOnly?: boolean;
};

function noMotionVariants<T extends { hidden: object; visible: object }>(): T {
  return {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  } as T;
}

function useScrollRevealVariants<T extends { hidden: object; visible: object }>(variants: T): T {
  const reduceMotion = useReducedMotion();
  return reduceMotion ? noMotionVariants<T>() : variants;
}

/** Секция: элементы появляются каскадом при прокрутке (gpbm-style) */
export function ScrollRevealSection({ children, ...props }: ScrollRevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, scrollRevealViewport);
  const variants = useScrollRevealVariants(scrollRevealStagger);

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.section>
  );
}

/** Блок текста / карточки внутри секции или автonomно с inView */
export function ScrollRevealBlock({
  children,
  inView = false,
  revealEarly = false,
  fadeOnly = false,
  ...props
}: ScrollRevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewport = revealEarly ? scrollRevealHeadingViewport : scrollRevealViewport;
  const isInView = useInView(ref, viewport);
  const base = fadeOnly ? scrollRevealFade : scrollRevealFadeUp;
  const variants = useScrollRevealVariants(base);
  const standalone = inView || revealEarly;

  return (
    <motion.div
      ref={standalone ? ref : undefined}
      variants={variants}
      initial={standalone ? "hidden" : undefined}
      animate={standalone ? (isInView ? "visible" : "hidden") : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { scrollRevealViewport, scrollRevealStagger, scrollRevealFadeUp, scrollRevealFade };
