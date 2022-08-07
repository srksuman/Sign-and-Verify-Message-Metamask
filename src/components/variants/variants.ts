export const variants = {
  initial: {
    opacity: 0,
    x: -500,
  },
  animate: {
    opacity: 1,
    x: 0,
    transaction: {
      duration: "5s",
      type: "spring",
      stiffness: 150,
    },
  },
};
