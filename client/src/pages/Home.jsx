import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const features = [
  ["Exam notes", "Structured by topic, sized to your level."],
  ["Important questions", "Short and long answers, ranked by likelihood."],
  ["Diagrams and charts", "Flowcharts for processes, charts for data."],
  ["PDF export", "Print it or revise on your phone."],
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>
      <Navbar />

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            Type a topic. Walk in with <span className="marker">the notes done.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
            ExamNotes writes structured notes, likely questions and diagrams for any topic, tuned to your class and exam.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="btn-brand rounded-full px-8 py-4 font-semibold"
            >
              Make my notes
            </motion.button>
            <button onClick={() => navigate("/history")} className="font-semibold text-ink underline decoration-marker decoration-4 underline-offset-4">
              See past notes
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500">50 free credits to start. One note costs 10.</p>
        </div>

        {/* Sample notebook page */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.25 }}
          className="relative"
        >
          <div className="ruled paper-shadow rounded-2xl border border-ink/10 py-7 pl-16 pr-7">
            <p className="font-display text-2xl font-bold leading-8 text-ink">Normalization (DBMS)</p>
            <ul className="mt-4 text-[15px] leading-8 text-slate-700">
              <li>- Removes <mark className="rounded bg-marker/60 px-1">redundant data</mark> from tables</li>
              <li>- 1NF: every cell holds one value</li>
              <li>- 2NF: no partial dependency</li>
              <li>- 3NF: no <mark className="rounded bg-marker/60 px-1">transitive dependency</mark></li>
              <li>- BCNF: every determinant is a key</li>
            </ul>
            <p className="mt-4 text-sm font-semibold leading-8 text-brand">Likely question: Explain 3NF with an example.</p>
          </div>
          <motion.span
            animate={{ rotate: [4, 7, 4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-3 -top-4 rounded-lg bg-coral px-3 py-1.5 text-xs font-bold text-white shadow-lg"
          >
            Very important
          </motion.span>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([title, des], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-ink/10 bg-white p-5"
          >
            <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">{des}</p>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Home;