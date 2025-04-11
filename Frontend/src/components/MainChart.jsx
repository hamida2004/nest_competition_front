import React, { useEffect } from "react";
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

// Colors array with 24 distinct colors
const colors = [
  "#6366F1",
  "#10B981",
  "#FBBF24",
  "#EF4444",
  "#8B5CF6",
  "#3B82F6",
  "#F43F5E",
  "#14B8A6",
  "#EC4899",
  "#F97316",
  "#0EA5E9",
  "#84CC16",
  "#DB2777",
  "#2DD4BF",
  "#F59E0B",
  "#6EE7B7",
  "#A78BFA",
  "#FCD34D",
  "#FB7185",
  "#BAE6FD",
  "#C084FC",
  "#FDE047",
  "#4ADE80",
  "#FF8A65",
];

export default function StockAnalyticsCard({ data, generate_data }) {
  // Automatically generate data every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      generate_data();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [generate_data]);

  // Dynamically extract features from the first data point
  const features =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "minute") // Exclude 'minute' as it's used for the X-axis
      : [];

  return (
    <div
      style={{
        position: "relative",
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button
        onClick={generate_data}
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
          zIndex: 1,
        }}
      >
        generate signal
      </button>

      <h2 style={{ textAlign: "center", marginTop: "16px" }}>Machine Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={[...data].reverse().slice(0, 10)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minute" label={"time (minute)"} />
          <YAxis />
          <Tooltip />
          <Legend />
          {features.map((feature, index) => (
            <Line
              key={feature}
              type="monotone"
              dataKey={feature}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              name={feature.replace(/_/g, " ")} // Replace underscores with spaces
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}