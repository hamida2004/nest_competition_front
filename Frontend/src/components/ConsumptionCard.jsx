// src/components/ConsumptionCard.jsx
import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/ConsumptionCard.css";

const sampleData = [
  { day: "M", value: 20 },
  { day: "T", value: 30 },
  { day: "W", value: 25 },
  { day: "T", value: 40 },
  { day: "F", value: 45 },
  { day: "S", value: 35 },
];

export default function ConsumptionCard({ label, title, value, color }) {
  return (
    <div className="consumption-card">
      <div className="card-label">{label}</div>
      <div className="card-main">
        <span className="card-title">{title}</span>
        <strong className="card-value">{value}</strong>
      </div>
      <div className="card-chart">
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={sampleData}>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
