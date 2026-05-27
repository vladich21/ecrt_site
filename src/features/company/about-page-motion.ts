import { motionEase, heroCopyMotion, fadeUp, sectionReveal } from "@/shared/motion/presets";

export { motionEase as ease, heroCopyMotion, fadeUp, sectionReveal };

export const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: motionEase },
  },
};

export const pillarStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

export const pillarItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionEase },
  },
};
