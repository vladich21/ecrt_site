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
    transition: { duration: 1, ease: motionEase },
  },
};

/** Лёгкий подъём текста (6px) + fade ~1s */
export const scrollRevealFadeUp = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: motionEase },
  },
};

/** Каскад элементов секции — multiplier 0.35s как getInitialAnimation в gpbm */
export const scrollRevealStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.35, delayChildren: 0.1 },
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
