import { motion } from "motion/react";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-24 border-t border-ink/10 bg-gradient-to-r from-ink via-[#201f4d] to-ink text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
        <p className="font-display text-lg font-bold">
          Exam<span className="text-marker">Notes</span>
        </p>
        <p className="text-white/60">© {new Date().getFullYear()} ExamNotes AI. Made for students.</p>
        <motion.button
          whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.16)" }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full border border-white/20 px-4 py-2 font-medium text-white/80 transition-colors"
        >
          Back to top
        </motion.button>
      </div>
    </motion.footer>
  );
}

export default Footer;