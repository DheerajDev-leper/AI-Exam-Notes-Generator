import { useState } from "react"
import ReactMarkdown from "react-markdown"
import Mermaid from "./Mermaid"
import Chart from "./Chart"
import { downloadPdf } from "../services/api"

const markdownComponents = {
    h1: ({ children }) => (
        <h1 className="mt-6 mb-4 border-b pb-2 text-2xl font-bold text-indigo-700">
            {children}
        </h1>
    ),

    h2: ({ children }) => (
        <h2 className="mt-5 mb-3 text-xl font-semibold text-indigo-600">
            {children}
        </h2>
    ),

    h3: ({ children }) => (
        <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
            {children}
        </h3>
    ),

    p: ({ children }) => (
        <p className="mb-3 leading-relaxed text-gray-700">
            {children}
        </p>
    ),

    ul: ({ children }) => (
        <ul className="my-3 ml-6 list-disc space-y-1 text-gray-700">
            {children}
        </ul>
    ),

    li: ({ children }) => (
        <li className="leading-relaxed">
            {children}
        </li>
    ),

    strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">
            {children}
        </strong>
    ),
}

function Finalresult({ result }) {
    const [quickRevision, setquickRevision] = useState(false)

    if (
        !result ||
        !result.importantTopics ||
        !result.questions
    ) {
        return null
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                    Generated Notes
                </h2>

                <div className="flex gap-2">
                    <button onClick={()=>setquickRevision(!quickRevision)}
                     className={`rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white
                     ${quickRevision ? "bg-indigo-600" : "bg-gray-400"}`}>
                        {quickRevision ? "Quick Revision" : "Detailed Notes"}
                    </button>
                    <button onClick={() =>downloadPdf(result)} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white">
                        Download PDF
                    </button>

                </div>
            </div>

            {!quickRevision &&
            <section>
                <SectionHeader icon="star" title="Sub topics" color="indigo" />
                {
                    Object.entries(result.importantTopics).map(
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
                }   

            {/* Notes */}
            {!quickRevision && 
            <section>
                <SectionHeader icon="" title="Detailed Notes" color="purple" />
                <div>
                    <ReactMarkdown components={markdownComponents}>
                        {result.notes}
                    </ReactMarkdown>
                </div>
            </section>}

            {quickRevision &&
            <section>
                <h3>
                    Exam quick revision points
                </h3>
                <ul>
                    {result.revisionPoints.map((p,i)=>{
                        <li key={i}>{p}</li>
                    })}
                </ul>
            </section>
            }

            {result.diagram?.data && <section>
                <SectionHeader icon="chart" title="Diagram" color="cyan" />
                <Mermaid diagram={result.diagram?.data} />
                <p>
                    If you need diaagram just take screenshot
                </p>
            </section>}

            { result.charts?.length > 0 &&
                <section>
                <SectionHeader icon="chart" title="Charts" color="cyan" />
                    <Chart charts={result.charts} />
                    <p>
                        If you need charts just take screenshot.
                    </p>
            </section>}

            {result.charts?.length === 0 && <section>
                <SectionHeader icon="chart" title="Charts" color="cyan" />
                <p>
                    No charts found for this topic.
                </p>
            </section>}

            <section>
                <SectionHeader icon="" title="Imp questions" color="rose" />

                <p className="">Short Questions</p>
                <ul>{result.questions.short.map((q,i)=>{
                    <li key={i}>{q}</li>
                })}</ul>

                <p className="">Long Questions</p>
                <ul>{result.questions.long.map((q,i)=>{
                    <li key={i}>{q}</li>
                })}</ul>

                <p className="">Diagram Questions</p>
                <ul>
                    <li>{result.questions.diagram}</li>
                </ul>
            </section>

            

        </div>
    )
}

function SectionHeader({icon, title, color}){
    const colors ={

    }
    return (
        <div className={`${colors[color]}`}>
            <span>{icon}</span>
            <span>{title}</span>
        </div>
    )
}

export default Finalresult