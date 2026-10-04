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
import { motion } from "motion/react";

function Chart({ charts }) {
  if (!charts || charts.length === 0) return null;

  const COLORS = ["#5b3df5", "#ffd84d", "#ff6b5b", "#14b88a"];

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/10"
        >
          <h4 className="mb-4 text-lg font-semibold text-ink">
            {chart.title}
          </h4>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">

              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={900} animationEasing="ease-out">
                    {chart.data.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#5b3df5" strokeWidth={3} animationDuration={900} animationEasing="ease-out" />
                </LineChart>
              )}

              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip />
                  <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} animationDuration={900} animationEasing="ease-out">
                    {chart.data.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}

            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Chart;