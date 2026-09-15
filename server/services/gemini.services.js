const Gemini_URL =
    "https://generativelanguage.googleapis.com/v1beta/interactions"

export const generateGeminiResponse = async (prompt) => {
    try {
        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "gemini-3.5-flash-lite",
                input: prompt
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("Gemini API Error:", data)
            throw new Error(data.error?.message || "Gemini API failed")
        }

        const text = data.steps
            ?.find(step => step.type === "model_output")
            ?.content
            ?.find(content => content.type === "text")
            ?.text

        if (!text) {
            console.error("Unexpected Gemini response:", data)
            throw new Error("No text returned from Gemini")
        }

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

        return JSON.parse(cleanText)

    } catch (err) {
        console.error("Gemini Error:", err.message)
        throw new Error("Gemini API failed")
    }
}