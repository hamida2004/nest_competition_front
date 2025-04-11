import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", visits: 4000, purchases: 2400, returns: 1400, revenue: 3000 },
  { name: "Feb", visits: 3000, purchases: 1398, returns: 1600, revenue: 4200 },
  { name: "Mar", visits: 2800, purchases: 9800, returns: 1800, revenue: 6000 },
  { name: "Apr", visits: 2780, purchases: 3908, returns: 1500, revenue: 5100 },
  { name: "May", visits: 3200, purchases: 4000, returns: 1300, revenue: 4800 },
  { name: "Jun", visits: 3500, purchases: 3200, returns: 1700, revenue: 5200 },
];

export default function StockAnalyticsCard() {
  return (
    <div style={{ position: "relative", padding: "24px", backgroundColor: "white", borderRadius: "16px" }}>
      {/* BOUTON FLOTTANT EN HAUT À GAUCHE */}
      <button
        style={{
          position: "absolute",
          top: "-15px",
          left: "-15px",
          backgroundColor: "#22C55E",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "999px",
          fontWeight: "bold",
          fontSize: "14px",
          textTransform: "lowercase",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        generate signal
      </button>

      {/* TITRE */}
      <h2 style={{ textAlign: "center", marginTop: "16px" }}>Stock Analytics</h2>

      {/* GRAPHIQUE */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#6366F1"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Website Visits"
          />
          <Line
            type="monotone"
            dataKey="purchases"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product Purchases"
          />
          <Line
            type="monotone"
            dataKey="returns"
            stroke="#FBBF24"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product Returns"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Total Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
