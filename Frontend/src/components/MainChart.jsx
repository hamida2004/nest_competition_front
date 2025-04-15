import React, { useEffect, useState } from "react";
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

export default function StockAnalyticsCard({ data, generate_data, title , generate , report, handleViewReport ,handleClick}) {
  // const [generate, setGenerate] = useState(false);

  // Automatically generate data every 2 seconds when generate is true
  useEffect(() => {
    let interval;
    if (generate) {
      interval = setInterval( async() => {
      generate && await generate_data();
      }, 20000);
    }
    // Cleanup interval on component unmount or when generate changes
    return () => clearInterval(interval);
  }, [generate, generate_data]);


  
  // Dynamically extract features from the first data point
  const features =
    Array.isArray(data) && data.length > 0
      ? Object.keys(data[0]).filter(
          (key) => key !== "minute" && typeof data[0][key] === "number"
        ) // Exclude 'minute' and non-numeric keys
      : [];

  // Safely slice the last 10 data points
  const slicedData = Array.isArray(data) ? data.slice(-10) : [];

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
      {/* Button to toggle data generation */}
      <button
        onClick={handleClick}
        aria-label={generate ? "Stop Signal" : "Generate Signal"}
        style={{
          position: "absolute",
          top: "-15px",
          left: "-15px",
          backgroundColor: generate ? "grey" : "#22C55E", // Red for stop, green for start
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
          transition: "background-color 0.3s ease",
        }}
      >
        {generate ? "stop signal" : "generate signal"}
      </button> {
        report && (
          <button
        onClick={handleViewReport}
        aria-label="view report"
        style={{
          position: "absolute",
          top: "-15px",
          right: "-15px",
          backgroundColor: "#55b5ed", // Red for stop, green for start
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
          transition: "background-color 0.3s ease",
        }}
      >
        view report
      </button>
        )
      }

      <h2 style={{ textAlign: "center", marginTop: "16px" }}>{title}</h2>

      {/* Render chart only if data exists */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={slicedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minute" label={"time (minute)"} />
          <YAxis />
          <Tooltip />
          <Legend />
          {features.length > 0 ? (
            features.map((feature, index) => (
              <Line
                key={feature}
                type="monotone"
                dataKey={feature}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={feature.replace(/_/g, " ")} // Replace underscores with spaces
              />
            ))
          ) : (
            <text x="50%" y="50%" textAnchor="middle" fill="#888">
              No data available
            </text>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}