import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopicForm from "../components/TopicForm";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Finalresult from "../components/Finalresult";

function Notes() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Navbar */}
      <motion.header>
        <Navbar />
      </motion.header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900">
            Generate Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Notes
            </span>
          </h1>

          <p className="mt-3 text-slate-600">
            Enter your topic and let AI create exam-ready notes for you.
          </p>
        </motion.div>

        {/* Form */}
        <div className="flex justify-center">
          <TopicForm
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
        </div>

        {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-center text-black font-medium mb-6"
          >
            Generating exam-focused notes...
          </motion.div>
        )}

        {error && (
          <div className="mb-6 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center"
          >
            <div className="mb-4 text-4xl">📝</div>

            <h2 className="font-semibold text-slate-800">
              Your generated notes will appear here
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter a topic above and click Generate Notes.
            </p>
          </motion.div>
        )}
      </main>

      {result && (
        <motion.div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-80 lg:shrink-0">
            <Sidebar result={result} />
          </div>

          {/* Notes */}
          <div className="min-w-0 flex-1">
            <Finalresult result={result} />
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

export default Notes;
