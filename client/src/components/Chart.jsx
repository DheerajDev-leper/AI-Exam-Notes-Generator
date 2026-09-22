import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Chart({ charts }) {
  if (!charts || charts.length === 0) return null;

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h4 className="mb-4 text-lg font-semibold text-slate-800">
            {chart.title}
          </h4>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              
              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                  >
                    {chart.data.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip />

                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                  >
                    {chart.data.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              )}

            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chart;