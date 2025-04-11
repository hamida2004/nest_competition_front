import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiOutlineDatabase } from "react-icons/hi";
import "../styles/StatCard.css";

export default function StatCard({ title, value, change, active }) {
  return (
    <div className="stat-card">
      <div className="header">
        <div className="title-section">
          <div className="title">{title}</div>
          <div className="value">{value}</div>
        </div>
        <div className="icon-box">
          <HiOutlineDatabase className="icon" />
        </div>
      </div>
      <div className={`change ${active ? "up" : "down"}`}>
        <FaArrowUp color="green" />
        {change} this week
      </div>
    </div>
  );
}
