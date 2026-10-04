import { useRef, useEffect, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.trim();

  // Remove markdown code fences if AI returns them
  clean = clean
    .replace(/^```mermaid\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // Make sure graph TD is separated from the first node
  clean = clean.replace(/^graph\s+TD\s*/i, "graph TD\n");

  // Add graph TD if AI forgot it
  if (!clean.toLowerCase().startsWith("graph td")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

function Mermaid({ diagram }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;
    setReady(false);

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const safeChart = cleanMermaidChart(diagram);

        console.log("Mermaid input:", safeChart);

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);

        containerRef.current.innerHTML = `
          <p style="color: red;">
            Unable to render diagram
          </p>
        `;
      } finally {
        setReady(true);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="w-full overflow-x-auto">
      <div
        ref={containerRef}
        className="transition-all duration-500 ease-out"
        style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(8px)" }}
      />
    </div>
  );
}

export default Mermaid;