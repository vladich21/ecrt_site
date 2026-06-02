export const motionEase = [0.22, 0.8, 0.28, 1] as const;

/** Порог ~20% секции в viewport (как в gpbm-web) */
export const scrollRevealViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -6% 0px",
} as const;

/** Заголовки секций — срабатывают раньше, до контента ниже */
export const scrollRevealHeadingViewport = {
  once: true,
  amount: 0.05,
  margin: "120px 0px 120px 0px",
} as const;

/** gpbm-style: медленный fade без сдвига */
export const scrollRevealFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.48, ease: motionEase },
  },
};

/** Лёгкий подъём текста (6px) + fade ~1s */
export const scrollRevealFadeUp = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: motionEase },
  },
};

/** Короткий каскад: меньше одновременных animation frame на длинных страницах. */
export const scrollRevealStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

export const scrollRevealLogoStagger = scrollRevealStagger;

export const heroCopyMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.62, ease: motionEase },
};

export const fadeUp = scrollRevealFadeUp;

export const sectionReveal = scrollRevealStagger;
