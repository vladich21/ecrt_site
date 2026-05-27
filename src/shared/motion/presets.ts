export const motionEase = [0.22, 0.8, 0.28, 1] as const;

export const heroCopyMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.62, ease: motionEase },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: motionEase },
  },
};

export const sectionReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};
