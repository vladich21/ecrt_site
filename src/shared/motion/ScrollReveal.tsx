"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  scrollRevealHeadingViewport,
  scrollRevealViewport,
} from "./presets";
import styles from "./scroll-reveal.module.scss";

type RevealViewport = typeof scrollRevealViewport | typeof scrollRevealHeadingViewport;

type ScrollRevealSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

type ScrollRevealBlockProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  inView?: boolean;
  revealEarly?: boolean;
  fadeOnly?: boolean;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function observerOptions(viewport: RevealViewport): IntersectionObserverInit {
  const threshold = "amount" in viewport ? viewport.amount : 0.2;
  const rootMargin = "margin" in viewport ? viewport.margin : "0px 0px -6% 0px";

  return { threshold, rootMargin };
}

function useRevealInView<T extends Element>(viewport: RevealViewport) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      startTransition(() => setVisible(true));
      observer.disconnect();
    }, observerOptions(viewport));

    observer.observe(element);
    return () => observer.disconnect();
  }, [viewport, visible]);

  return { ref, visible };
}

export function ScrollRevealSection({
  children,
  className,
  ...props
}: ScrollRevealSectionProps) {
  const { ref, visible } = useRevealInView<HTMLElement>(scrollRevealViewport);

  return (
    <section
      ref={ref}
      {...props}
      className={classNames(styles.stagger, className)}
      data-revealed={visible ? "true" : undefined}
    >
      {children}
    </section>
  );
}

export function ScrollRevealBlock({
  children,
  className,
  style,
  inView = false,
  revealEarly = false,
  fadeOnly = false,
  ...props
}: ScrollRevealBlockProps) {
  const viewport = revealEarly ? scrollRevealHeadingViewport : scrollRevealViewport;
  const standalone = inView || revealEarly;
  const { ref, visible } = useRevealInView<HTMLDivElement>(viewport);

  return (
    <div
      ref={standalone ? ref : undefined}
      {...props}
      className={classNames(
        styles.reveal,
        fadeOnly && styles.fadeOnly,
        standalone && visible && styles.visible,
        className,
      )}
      style={style as CSSProperties}
      data-revealed={standalone && visible ? "true" : undefined}
    >
      {children}
    </div>
  );
}

export { scrollRevealViewport };
