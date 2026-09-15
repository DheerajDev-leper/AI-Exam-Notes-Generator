import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";

function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">

      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-300/10 blur-3xl" />
      </div>

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-75px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            AI-powered learning assistant
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Create your

            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text pb-2 text-transparent">
              smart AI notes
            </span>

            in seconds.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-600"
          >
            Upload your study material and let AI transform it into
            clear, structured and exam-ready notes, questions,
            diagrams and PDFs.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.button onClick={()=> navigate("/notes")}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 35px rgba(79, 70, 229, 0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition"
            >
              Get Started
              <span className="ml-2">→</span>
            </motion.button>

          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            <Stat number="50+" label="Free Credits" />
            <Stat number="AI" label="Powered" />
            <Stat number="PDF" label="Export" />
          </motion.div>
        </motion.div>

        {/* ================= AI PREVIEW ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-3 -top-5 z-20 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
                ✓
              </div>

              <div>
                <p className="text-xs font-semibold">
                  AI Ready
                </p>

                <p className="text-[10px] text-slate-500">
                  Notes generated
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Preview */}
          <div className="relative rounded-3xl border border-white/80 bg-white/70 p-5 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl">

            {/* Browser header */}
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-300" />

              <div className="ml-3 h-7 flex-1 rounded-lg bg-slate-50" />
            </div>

            {/* AI Header */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-100">
                    AI GENERATED NOTES
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Database Management System
                  </h3>
                </div>

                <div className="text-3xl">
                  🧠
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4 space-y-3">

              <Note
                title="01. What is DBMS?"
                text="A database management system is software used to create, manage and organize data efficiently."
              />

              <Note
                title="02. Key Advantages"
                text="Data security, reduced redundancy, data consistency and easy data access."
              />

              <Note
                title="03. Important Concepts"
                text="Tables, relationships, primary keys, foreign keys and normalization."
              />

            </div>

            {/* AI processing */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />

                <span className="text-xs font-medium text-indigo-700">
                  AI generated
                </span>
              </div>

              <span className="text-xs text-slate-500">
                3.2k words
              </span>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Everything you need
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your complete AI study assistant
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Turn your study material into powerful learning resources
            with just a few clicks.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Feature
            icon="📚"
            title="Exam Notes"
            des="Generate clear, structured and exam-focused notes."
          />

          <Feature
            icon="🧠"
            title="AI Questions"
            des="Create MCQs and important questions automatically."
          />

          <Feature
            icon="📊"
            title="Diagrams"
            des="Understand difficult concepts through visual explanations."
          />

          <Feature
            icon="📄"
            title="PDF Export"
            des="Download your notes and revise them anywhere."
          />

        </div>
      </section>

      <Footer />

    </div>
  );
}


/* ================= FEATURE ================= */

function Feature({ icon, title, des }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group rounded-2xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/40"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-2xl ring-1 ring-indigo-100 transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {des}
      </p>

    </motion.div>
  );
}


/* ================= NOTE ================= */

function Note({ title, text }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <h4 className="text-sm font-semibold text-slate-800">
        {title}
      </h4>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </motion.div>
  );
}


/* ================= STAT ================= */

function Stat({ number, label }) {
  return (
    <div>
      <p className="text-xl font-bold text-slate-900">
        {number}
      </p>

      <p className="mt-0.5 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default Home;