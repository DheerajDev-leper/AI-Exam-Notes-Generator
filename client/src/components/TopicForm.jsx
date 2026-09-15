import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });
      setResult(result.data);
      setLoading(false);
      setClassLevel("")
      setTopic("")
      setExamType("")
      setIncludeChart(false)
      setIncludeDiagram(false)
      setRevisionMode(false)

      if(typeof result.creditsLeft === "number"){
        dispatch(updateCredits(result.creditsLeft))
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch notes");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value >= 70) {
        setProgressText("Finalizing your notes...");
      } else if (value >= 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Understanding the topic...");
      }

      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
    >
      {/* Topic */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Topic
        </label>

        <input
          type="text"
          placeholder="Enter your topic"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Class */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Class / Level
        </label>

        <input
          type="text"
          placeholder="Enter your class"
          onChange={(e) => setClassLevel(e.target.value)}
          value={classLevel}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Exam */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Exam Type
        </label>

        <input
          type="text"
          placeholder="Enter your exam"
          onChange={(e) => setExamType(e.target.value)}
          value={examType}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <Toggle
          label="Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />

        <Toggle
          label="Include Diagrams"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />

        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20
        ${loading ? "" : ""}`}
      >
        {loading ? "Generating Notes" : "Generate Notes"}
      </motion.button>

      {loading && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              {progressText}
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-indigo-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
    >
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <motion.div
        animate={{
          backgroundColor: checked ? "#4f46e5" : "#cbd5e1",
        }}
        className="relative h-6 w-11 rounded-full"
      >
        <motion.div
          animate={{
            x: checked ? 20 : 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
        />
      </motion.div>
    </div>
  );
}

export default TopicForm;
