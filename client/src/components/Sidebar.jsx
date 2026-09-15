function Sidebar({ result }) {
    if (
        !result ||
        !result.importantTopics ||
        !result.questions
    ) {
        return null
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">

            {/* Header */}
            <div className="mb-5 flex items-center gap-2">
                <span>📌</span>
                <h3 className="text-lg font-semibold text-slate-800">
                    Quick View
                </h3>
            </div>

            {/* Important Topics */}
            <section className="mb-6">
                <p className="mb-3 font-semibold text-slate-700">
                    Important Topics
                </p>

                {Object.entries(result.importantTopics).map(
                    ([priority, topics]) => (
                        <div key={priority} className="mb-4">

                            <p className="mb-2 text-sm font-medium capitalize text-indigo-600">
                                {priority.replace("veryImportant", "Very Important")}
                            </p>

                            <ul className="list-disc space-y-1 pl-5">
                                {topics.map((topic, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-slate-600"
                                    >
                                        {topic}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )
                )}
            </section>

            {/* Questions */}
            <section>
                <p className="mb-3 font-semibold text-slate-700">
                    Important Questions
                </p>

                {/* Short Questions */}
                <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-slate-700">
                        Short Questions
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                        {result.questions.short.map((question, i) => (
                            <li
                                key={i}
                                className="text-sm text-slate-600"
                            >
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Long Questions */}
                <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-slate-700">
                        Long Questions
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                        {result.questions.long.map((question, i) => (
                            <li
                                key={i}
                                className="text-sm text-slate-600"
                            >
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Diagram Questions */}
                <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                        Diagram Questions
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                        {result.questions.diagram.map((question, i) => (
                            <li
                                key={i}
                                className="text-sm text-slate-600"
                            >
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>

            </section>
        </div>
    )
}

export default Sidebar