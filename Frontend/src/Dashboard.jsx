import React from "react";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import AnalyticsChart from "./components/MainChart";
import ConsumptionCard from "./components/ConsumptionCard";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      
      <main className="main">
        <Topbar />

        <section className="stats">
          <StatCard
            title="Components"
            value="State"
            change="+0.49%"
            active
          />
          <StatCard
            title="Fans"
            value="Active"
            change="+0.49%"
            active
          />
          <StatCard
            title="Extracteur"
            value="Non Active"
            change="-0.49%"
            active={false}
          />
          <StatCard
            title="Cooling"
            value="Non Active"
            change="-0.49%"
            active={false}
          />
        </section>

        <section className="stock-analytics-row">
        <div className="left-graph">
        <AnalyticsChart />
        </div>
        <div className="right-graph">
        <AnalyticsChart />
        </div>
        </section>

        <section className="cards">
        <ConsumptionCard
    label="Service Plus De Fourniture"
    title="Service A"
    value="25%"
    color="#4285F4"
  />
  <ConsumptionCard
    label="Produit Plus Consommé"
    title="Papier"
    value="95%"
    color="#34A853"
  />
  <ConsumptionCard
    label="Produit Moins Consommé"
    title="Papier"
    value="95%"
    color="#EA4335"
  />
  <ConsumptionCard
    label="Article Plus Consommé"
    title="Article A"
    value="95%"
    color="#A142F4"
  />
        </section>
      </main>
    </div>
  );
}