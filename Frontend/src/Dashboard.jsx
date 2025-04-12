import React, { useState, useEffect } from "react";
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

  // State for consumption metrics
  const [outsideTempData, setOutsideTempData] = useState([]);
  const [insideTempData, setInsideTempData] = useState([]);
  const [rotationalSpeedData, setRotationalSpeedData] = useState([]);
  const [torqueData, setTorqueData] = useState([]);

  // Function to generate random values within a range

  // Generate new data point for Outside Temperature
  const generateOutsideTemp = () => {
    const newDataPoint = {
      day: outsideTempData.length + 1,
      value: getRandomValue(20, 30), // Example range for outside temperature
    };
    setOutsideTempData((prev) => [...prev, newDataPoint].slice(-7)); // Keep last 7 points
  };

  // Generate new data point for Inside Temperature
  const generateInsideTemp = () => {
    const newDataPoint = {
      day: insideTempData.length + 1,
      value: getRandomValue(35, 45), // Example range for inside temperature
    };
    setInsideTempData((prev) => [...prev, newDataPoint].slice(-7));
  };

  // Generate new data point for Rotational Speed
  const generateRotationalSpeed = () => {
    const newDataPoint = {
      day: rotationalSpeedData.length + 1,
      value: Math.floor(getRandomValue(1000, 2000)), // Example range for rotational speed
    };
    setRotationalSpeedData((prev) => [...prev, newDataPoint].slice(-7));
  };

  // Generate new data point for Torque
  const generateTorque = () => {
    const newDataPoint = {
      day: torqueData.length + 1,
      value: getRandomValue(30, 50), // Example range for torque
    };
    setTorqueData((prev) => [...prev, newDataPoint].slice(-7));
  };

  // Automatically generate data every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      generateOutsideTemp();
      generateInsideTemp();
      generateRotationalSpeed();
      generateTorque();
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

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


        <section className="cards">
          {/* Outside Temperature Card */}
          <ConsumptionCard
            label="Outside Temperature"
            title="Outside Temp"
            value={`${getRandomValue(20, 30).toFixed(1)}°C`}
            color="#4285F4"
            data={outsideTempData}
          />{/* Inside Temperature Card */}
          <ConsumptionCard
            label="Inside Temperature"
            title="Inside Temp"
            value={`${getRandomValue(35, 45).toFixed(1)}°C`}
            color="#34A853"
            data={insideTempData}
          />

          {/* Rotational Speed Card */}
          <ConsumptionCard
            label="Rotational Speed"
            title="Rotational Speed"
            value={`${Math.floor(getRandomValue(1000, 2000))} RPM`}
            color="#EA4335"
            data={rotationalSpeedData}
          />

          {/* Torque Card */}
          <ConsumptionCard
            label="Torque"
            title="Torque"
            value={`${getRandomValue(30, 50).toFixed(1)} Nm`}
            color="#A142F4"
            data={torqueData}
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
      </main>
    </div>
  );
}