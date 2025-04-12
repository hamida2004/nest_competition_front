import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/ConsumptionCard.css";

export default function ConsumptionCard({ label, title, value, color, data }) {
  return (
    <div className="consumption-card">
      <div className="card-label">{label}</div>
      <div className="card-main">
        <span className="card-title">{title}</span>
        <strong className="card-value">{value}</strong>
      </div>
      <div className="card-chart">
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={data}>
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