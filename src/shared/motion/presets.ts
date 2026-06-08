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
