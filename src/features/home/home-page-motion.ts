export const ease = [0.22, 0.8, 0.28, 1] as const;

export const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.04,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export const futureMotion = {
  futureStack: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.62, delayChildren: 0.2 },
    },
  },
  futureLine: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.72, ease: [0.22, 1, 0.34, 1] as const },
    },
  },
  flagshipSection: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  },
  flagshipGroup: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.04 },
    },
  },
  flagshipItem: {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease },
    },
  },
  flagshipFact: {
    hidden: { opacity: 0, x: 18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.54, ease },
    },
  },
};
