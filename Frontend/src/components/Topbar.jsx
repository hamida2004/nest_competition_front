import React from "react";
import { FaBell, FaRegMoon, FaUser } from "react-icons/fa";
import "../styles/Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="logo">
        <span className="eco">Eco</span>
        <span className="secure">Secure</span>
      </div>
      <div className="user-info">
        <div className="icon-container">
          <FaBell className="icon gray-icon" />
        </div>
        <div className="icon-container">
          <FaRegMoon className="icon gray-icon" />
        </div>
        <div className="profile">
          <span>Aouaichia Hafsa</span>
          <div className="avatar-circle">
            <FaUser className="avatar-icon" />
          </div>
        </div>
      </div>
    </header>
  );
}