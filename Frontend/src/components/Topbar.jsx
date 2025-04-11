import React from "react";
import "../styles/Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="logo">
        <span className="eco">Eco</span>
        <span className="secure">Secure</span>
      </div>
      <div className="user-info">
        <span className="icon">🔔</span>
        <span className="icon">🌙</span>
        <div className="profile">
          <span>Aouaichia Hafsa</span>
          <div className="avatar">👤</div>
        </div>
      </div>
    </header>
  );
}
