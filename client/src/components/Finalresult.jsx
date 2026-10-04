import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { AnimatePresence, motion } from "motion/react"
import Mermaid from "./Mermaid"
import Chart from "./Chart"
import { downloadPdf } from "../services/api"

const md = {
  h1: ({ children }) => <h1 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-bold text-ink">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 mt-7 text-xl font-bold text-brand">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-5 text-lg font-semibold text-ink">{children}</h3>,
  p: ({ children }) => <p className="mb-3 max-w-[70ch] leading-7 text-slate-700">{children}</p>,
  ul: ({ children }) => <ul className="my-3 ml-5 list-disc space-y-1.5 text-slate-700 marker:text-brand">{children}</ul>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => <strong className="rounded bg-marker/40 px-1 font-semibold text-ink">{children}</strong>,
}

const toneMap = {
  brand: "bg-brand-soft text-brand",
  marker: "bg-marker/50 text-ink",
  mint: "bg-mint/15 text-mint",
  coral: "bg-coral/15 text-coral",
}

function SectionHeader({ icon, title, tone = "brand" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="mb-4 mt-10 flex items-center gap-3"
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-base ${toneMap[tone]}`}>{icon}</span>
      <h3 className="text-xl font-bold text-ink">{title}</h3>
    </motion.div>
  )
}

const asList = (v) => (Array.isArray(v) ? v : v ? [v] : [])

function QuestionGroup({ label, items }) {
  if (!items.length) return null
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm font-semibold text-slate-500">{label}</p>
      <ul className="space-y-2">
        {items.map((q, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 4, borderColor: "var(--color-brand)" }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 transition-colors"
          >
            {q}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.28, ease: "easeOut" },
}

function Finalresult({ result }) {
  const [quick, setQuick] = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (!result || !result.importantTopics || !result.questions) return null

  const handleDownload = async () => {
    try {
      setDownloading(true)
      await downloadPdf(result)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-shadow rounded-3xl p-5 sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-ink">
          <span className="marker">Your notes</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented switch */}
          <div className="relative flex rounded-full bg-slate-200/70 p-1">
            {[
              [false, "Detailed"],
              [true, "Quick revision"],
            ].map(([val, label]) => (
              <button
                key={label}
                onClick={() => setQuick(val)}
                className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${quick === val ? "text-white" : "text-slate-600"}`}
              >
                {quick === val && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand to-brand-deep shadow-md shadow-brand/30"
                  />
                )}
                {label}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownload}
            disabled={downloading}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 disabled:opacity-60"
          >
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quick ? (
          <motion.div key="detailed" {...fade}>
            <SectionHeader icon="★" title="Sub topics" tone="marker" />
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(result.importantTopics).map(([priority, topics], gi) => (
                <motion.div
                  key={priority}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md hover:shadow-brand/10"
                >
                  <p className="mb-2 text-sm font-bold capitalize text-brand">
                    {priority.replace("veryImportant", "Very important")}
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {asList(topics).map((t, i) => (
                      <li key={i} className="flex gap-2"><span className="text-brand">•</span>{t}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <SectionHeader icon="✎" title="Detailed notes" tone="brand" />
            <ReactMarkdown components={md}>{result.notes || ""}</ReactMarkdown>
          </motion.div>
        ) : (
          <motion.div key="quick" {...fade}>
            <SectionHeader icon="⚡" title="Exam quick revision" tone="marker" />
            <ul className="space-y-2">
              {asList(result.revisionPoints).map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 transition-colors hover:border-marker"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-marker ring-2 ring-marker/30" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {result.diagram?.data && (
        <section>
          <SectionHeader icon="◈" title="Diagram" tone="mint" />
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <Mermaid diagram={result.diagram.data} />
          </motion.div>
          <p className="mt-2 text-xs text-slate-500">Need it for your notebook? Take a screenshot.</p>
        </section>
      )}

      {result.charts?.length > 0 && (
        <section>
          <SectionHeader icon="▥" title="Charts" tone="mint" />
          <Chart charts={result.charts} />
        </section>
      )}

      <SectionHeader icon="?" title="Important questions" tone="coral" />
      <QuestionGroup label="Short questions" items={asList(result.questions.short)} />
      <QuestionGroup label="Long questions" items={asList(result.questions.long)} />
      <QuestionGroup label="Diagram questions" items={asList(result.questions.diagram)} />
    </motion.div>
  )
}

export default Finalresult