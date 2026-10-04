import { motion } from "motion/react"

const tone = {
  veryImportant: ["Very important", "bg-coral text-white"],
  important: ["Important", "bg-marker text-ink"],
  lessImportant: ["Less important", "bg-brand-soft text-brand"],
}

function Group({ label, items }) {
  const list = [].concat(items || [])
  if (!list.length) return null
  return (
    <div className="mb-4">
      <p className="mb-1.5 text-xs font-bold text-slate-500">{label}</p>
      <ul className="space-y-1.5">
        {list.map((q, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 3 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-lg bg-white px-3 py-2 text-[13px] leading-5 text-slate-700 ring-1 ring-ink/5 transition-shadow hover:shadow-sm"
          >
            {q}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function Sidebar({ result }) {
    if (!result || !result.importantTopics || !result.questions) {
        return null
    }

    return (
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="ruled paper-shadow rounded-2xl border border-ink/10 py-5 pl-12 pr-4"
        >
            <h3 className="mb-4 font-display text-xl font-bold text-ink">Quick view</h3>

            <section className="mb-6">
                <p className="mb-2 text-sm font-semibold text-ink">Topics to study</p>
                {Object.entries(result.importantTopics).map(([priority, topics], gi) => {
                    const [label, cls] = tone[priority] || [priority, "bg-slate-200 text-ink"]
                    return (
                        <motion.div
                          key={priority}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + gi * 0.08 }}
                          className="mb-3"
                        >
                            <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${cls}`}>{label}</span>
                            <ul className="mt-1.5 space-y-0.5 text-[13px] leading-6 text-slate-700">
                                {[].concat(topics || []).map((topic, i) => (
                                    <li key={i}>- {topic}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                })}
            </section>

            <section>
                <p className="mb-2 text-sm font-semibold text-ink">Practice questions</p>
                <Group label="Short" items={result.questions.short} />
                <Group label="Long" items={result.questions.long} />
                <Group label="Diagram" items={result.questions.diagram} />
            </section>
        </motion.aside>
    )
}

export default Sidebar