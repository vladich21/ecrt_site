
export const scrollRevealViewport = {
  once: true,
  // Low threshold + positive bottom margin: tall sections must not stay at opacity 0
  // when only the top is visible (common first-scroll / Edge first-paint issue).
  amount: 0.05,
  margin: "0px 0px 12% 0px",
} as const;

export const scrollRevealHeadingViewport = {
  once: true,
  amount: 0.05,
  margin: "120px 0px 120px 0px",
} as const;
