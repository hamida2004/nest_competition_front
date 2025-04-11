import React, { useState } from "react";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import AnalyticsChart from "./components/MainChart";
import ConsumptionCard from "./components/ConsumptionCard";
import "./Dashboard.css";

export default function Dashboard() {
  const [predict, setPredict] = useState([]);
  const [reduce, setReduce] = useState([]);

  // Function to generate a random value within a given range
  const getRandomValue = (min, max) => Math.random() * (max - min) + min;

  // Function to generate predictive maintenance data
  const generate_predict = () => {
    const newDataPoint = {
      minute: predict.length + 1,
      Air_temperature: getRandomValue(295.3, 304.5),
      Process_temperature: getRandomValue(305.7, 313.8),
      Rotational_speed: Math.floor(getRandomValue(1168, 2886)),
      Torque: getRandomValue(3.8, 76.6),
      Tool_wear: Math.floor(getRandomValue(0, 253)),
    };
    setPredict((prev) => [...prev, newDataPoint].slice(-20)); // Keep last 20 points
  };

  // Function to generate reducing subcarriers data
  const generate_reduce = () => {
    const newDataPoint = {
      minute: reduce.length + 1,
      Longitude: getRandomValue(-8.655394, -8.490956),
      Latitude: getRandomValue(51.934883, 52.138499),
      Speed: Math.floor(getRandomValue(23, 114)),
      CellID: Math.floor(getRandomValue(1, 4)),
      RSRP: Math.floor(getRandomValue(-125, -88)),
      RSRQ: Math.floor(getRandomValue(-16, -7)),
      SNR: getRandomValue(-4.0, 25.0),
      CQI: Math.floor(getRandomValue(1, 15)),
      RSSI: Math.floor(getRandomValue(-94, -67)),
      DL_bitrate: Math.floor(getRandomValue(0, 56602)),
      UL_bitrate: Math.floor(getRandomValue(0, 1780)),
      NRxRSRP: getRandomValue(-126.0, -51.0),
      NRxRSRQ: getRandomValue(-225.0, -3.0),
      ServingCell_Lon: getRandomValue(-8.670811, -8.489758),
      ServingCell_Lat: getRandomValue(51.928426, 52.138878),
      ServingCell_Distance: getRandomValue(217.33, 10334.34),
    };
    setReduce((prev) => [...prev, newDataPoint].slice(-20)); // Keep last 20 points
  };

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
            <AnalyticsChart
              data={predict}
              generate_data={generate_predict}
            />
          </div>
          <div className="right-graph">
            <AnalyticsChart
              data={reduce}
              generate_data={generate_reduce}
            />
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