const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite"
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const arr = (v) => (Array.isArray(v) ? v : v ? [v] : [])

// Guarantee the shape the frontend and PDF export rely on
const normalize = (d) => ({
  ...d,
  importantTopics: {
    veryImportant: arr(d.importantTopics?.veryImportant),
    important: arr(d.importantTopics?.important),
    lessImportant: arr(d.importantTopics?.lessImportant),
  },
  notes: typeof d.notes === "string" ? d.notes : "",
  revisionPoints: arr(d.revisionPoints),
  questions: {
    short: arr(d.questions?.short),
    long: arr(d.questions?.long),
    diagram: arr(d.questions?.diagram),
  },
  diagram: { type: "flowchart", data: d.diagram?.data || "" },
  charts: arr(d.charts),
})

export const generateGeminiResponse = async (prompt) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
    }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || `Gemini error ${response.status}`)

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("")
  if (!text) throw new Error("Gemini returned no text")

  try {
    return normalize(JSON.parse(text.replace(/```json|```/g, "").trim()))
  } catch {
    throw new Error("Gemini returned invalid JSON")
  }
}
