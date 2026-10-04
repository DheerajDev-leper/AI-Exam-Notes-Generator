import { motion } from "motion/react";

// Wrap any page's top-level element with this for a consistent enter/exit feel.
const variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

function PageTransition({ children, className = "" }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className={className}>
      {children}
    </motion.div>
  );
}

export default PageTransition;