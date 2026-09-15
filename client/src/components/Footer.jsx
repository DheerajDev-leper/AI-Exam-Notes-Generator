import { motion } from "motion/react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/50">
      
      {/* Background Effects */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ExamNotes AI
                </span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                Turn your study material into smart AI-powered notes,
                questions, diagrams, and more.
              </p>
            </motion.div>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              <SocialButton icon={<FaGithub />} />
              <SocialButton icon={<FaInstagram />} />
              <SocialButton icon={<FaLinkedin />} />
              <SocialButton icon={<FaEnvelope />} />
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-slate-900">
              Features
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="hover:text-indigo-600 cursor-pointer">
                AI Notes
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                AI Questions
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Diagrams
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                PDF Export
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Credits
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold text-slate-900">
              Get Started
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Start creating smarter study material with AI.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </motion.button>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
          </p>

          <p>
            Made with ❤️ for students
          </p>

          {/* Back To Top */}
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-indigo-600"
          >
            <FaArrowUp size={14} />
          </motion.button>

        </div>
      </div>
    </footer>
  );
}

function SocialButton({ icon }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
    >
      {icon}
    </motion.button>
  );
}

export default Footer;