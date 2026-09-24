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
          <li key={i} className="rounded-lg bg-white px-3 py-2 text-[13px] leading-5 text-slate-700 ring-1 ring-ink/5">{q}</li>
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
        <aside className="ruled paper-shadow rounded-2xl border border-ink/10 py-5 pl-12 pr-4">
            <h3 className="mb-4 font-display text-xl font-bold text-ink">Quick view</h3>

            <section className="mb-6">
                <p className="mb-2 text-sm font-semibold text-ink">Topics to study</p>
                {Object.entries(result.importantTopics).map(([priority, topics]) => {
                    const [label, cls] = tone[priority] || [priority, "bg-slate-200 text-ink"]
                    return (
                        <div key={priority} className="mb-3">
                            <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${cls}`}>{label}</span>
                            <ul className="mt-1.5 space-y-0.5 text-[13px] leading-6 text-slate-700">
                                {[].concat(topics || []).map((topic, i) => (
                                    <li key={i}>- {topic}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </section>

            <section>
                <p className="mb-2 text-sm font-semibold text-ink">Practice questions</p>
                <Group label="Short" items={result.questions.short} />
                <Group label="Long" items={result.questions.long} />
                <Group label="Diagram" items={result.questions.diagram} />
            </section>
        </aside>
    )
}

export default Sidebar