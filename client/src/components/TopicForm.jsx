import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { generateNotes } from "../services/api";
import { updateCredits } from "../redux/userSlice";

const fields = [
  ["topic", "Topic", "e.g. Normalization in DBMS"],
  ["classLevel", "Class / level", "e.g. B.Tech 2nd year"],
  ["examType", "Exam type", "e.g. University semester"],
];

const stages = ["Understanding the topic…", "Processing content…", "Finalizing your notes…", "Almost done…"];

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [form, setForm] = useState({ topic: "", classLevel: "", examType: "" });
  const [opts, setOpts] = useState({ revisionMode: false, includeDiagram: false, includeChart: false });
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!form.topic.trim()) return setError("Please enter a topic first.");
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await generateNotes({ ...form, ...opts });
      if (!res?.data) throw new Error("Empty response");
      setResult(res.data);
      setForm({ topic: "", classLevel: "", examType: "" });
      setOpts({ revisionMode: false, includeDiagram: false, includeChart: false });
      if (typeof res.creditsLeft === "number") dispatch(updateCredits(res.creditsLeft));
    } catch (err) {
      console.log(err);
      setError(err.message || "Couldn't generate notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) return setProgress(0);
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(95, v + Math.random() * 8);
      setProgress(Math.floor(v));
      if (v >= 95) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, [loading]);

  const stage = stages[Math.min(3, Math.floor(progress / 30))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-shadow w-full max-w-xl rounded-3xl p-6 sm:p-8"
    >
      <div className="space-y-4">
        {fields.map(([key, label, ph]) => (
          <label key={key} className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={ph}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-2.5">
        <Toggle label="Revision mode" hint="Short, last-minute points" checked={opts.revisionMode} onChange={() => setOpts({ ...opts, revisionMode: !opts.revisionMode })} />
        <Toggle label="Include diagrams" hint="Flowchart of the concept" checked={opts.includeDiagram} onChange={() => setOpts({ ...opts, includeDiagram: !opts.includeDiagram })} />
        <Toggle label="Include charts" hint="Visual data where it helps" checked={opts.includeChart} onChange={() => setOpts({ ...opts, includeChart: !opts.includeChart })} />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        className="btn-brand mt-7 w-full rounded-xl py-3.5 font-semibold disabled:opacity-70"
      >
        {loading ? "Generating…" : "Generate notes"}
      </motion.button>

      {loading && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-600">{stage}</span>
            <span className="font-bold text-brand">{progress}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-marker"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Toggle({ label, hint, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
        checked ? "border-brand/30 bg-brand-soft" : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block text-xs text-slate-500">{hint}</span>
      </span>
      <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-brand" : "bg-slate-300"}`}>
        <motion.span
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
        />
      </span>
    </button>
  );
}

export default TopicForm;