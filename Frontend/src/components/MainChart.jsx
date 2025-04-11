// src/components/StockAnalyticsCard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/MainChart.css";

const data = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 60 },
  { name: "May", value: 55 },
  { name: "Jun", value: 57 },
  { name: "Jul", value: 75 },
];

export default function StockAnalyticsCard() {
  return (
    <div className="stock-card-wrapper">
      <button className="generate-btn">generate signal</button>
      <div className="stock-card">
        <h3>Stock Analytics</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#007bff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
