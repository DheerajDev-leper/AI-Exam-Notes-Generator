import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import Finalresult from "../components/Finalresult";

function Notes() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">
            Turn any topic into <span className="marker">exam-ready notes</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-slate-600">
            Enter a topic, pick your level, and get notes, questions and diagrams in one place.
          </p>
        </div>

        <div className="flex justify-center">
          <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mx-auto mt-6 max-w-xl rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-center text-sm font-medium text-coral"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mt-12 max-w-2xl rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center"
            >
              <div className="mb-3 text-4xl">📝</div>
              <h2 className="text-lg font-bold text-ink">Your notes will appear here</h2>
              <p className="mt-1 text-sm text-slate-500">Fill in a topic above and select Generate notes.</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-start"
            >
              <div className="w-full lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
                <Sidebar result={result} />
              </div>
              <div className="min-w-0 flex-1">
                <Finalresult result={result} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default Notes;