import React from "react";
import "../styles/StatCard.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({ title, value, change, active }) {
  return (
    <div className="stat-card">
      <div className="title">
        {title}
        <span className="icon-status">
          {active ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
        </span>
      </div>
      <div className="value">{value}</div>
      <div className={`change ${active ? "up" : "down"}`}>
        {change} this week
      </div>
    </div>
  );
}
