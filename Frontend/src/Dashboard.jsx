import { IoIosClose } from "react-icons/io";
import React, { useState, useEffect, useCallback } from "react";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import AnalyticsChart from "./components/MainChart";
import ConsumptionCard from "./components/ConsumptionCard";
import "./Dashboard.css";
import { writeData, readData } from '../firebase';
import axios from "axios";

export default function Dashboard() {
  // State declarations
  const [temp, setTemp] = useState({
    Inside_temperature: 0,
    Outside_temperature: 0,
  });
  const [generatePredict, setGeneratePredict] = useState(false);

  const [failure, setFailure] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [activate, setActive] = useState(false);
  const [predict, setPredict] = useState([]);
  const [reduce, setReduce] = useState([]);
  const [report, setReport] = useState({});
  const [outsideTempData, setOutsideTempData] = useState([]);
  const [insideTempData, setInsideTempData] = useState([]);
  const [rotationalSpeedData, setRotationalSpeedData] = useState([]);
  const [torqueData, setTorqueData] = useState([]);
  const [currentRotationalSpeed, setCurrentRotationalSpeed] = useState(0);
  const [currentTorque, setCurrentTorque] = useState(0);
  const [nextTemp,setNextTemp]=useState(0);

  // Helper function
  const getRandomValue = useCallback((min, max) => Math.random() * (max - min) + min, []);

  const failureLabels = {
    0: "No Failure",
    1: "Tool Wear Failure",
    2: "Heat Dissipation Failure",
    3: "Power Failure",
    4: "Overstrain Failure",
    5: "Random Noise Failure",
  };
  // Cooling system API call
  const Cooling = useCallback(async () => {
    const date = new Date();
    try {
      const { data } = await axios.post("http://localhost:8000/api/cool", {
        station: 1,
        Present_Tmax: temp.Inside_temperature,
        Present_Tmin: temp.Inside_temperature,
        LDAPS_RHmin: 40.0,
        LDAPS_RHmax: 80.0,
        LDAPS_Tmax_lapse: 0.5,
        LDAPS_Tmin_lapse: 0.3,
        LDAPS_WS: 5.0,
        LDAPS_LH: 10.0,
        LDAPS_CC1: 0.2,
        LDAPS_CC2: 0.3,
        LDAPS_CC3: 0.1,
        LDAPS_CC4: 0.4,
        LDAPS_PPT1: 0.0,
        LDAPS_PPT2: 0.0,
        LDAPS_PPT3: 0.0,
        LDAPS_PPT4: 0.0,
        lat: 37.5665,
        lon: 126.9780,
        DEM: 50.0,
        Slope: 2.0,
        "Solar radiation": 200.0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(), // Fixed from getDay() to getDate()
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setNextTemp(data.representative_temp);
      if (data.representative_temp > 26.5) {
        writeData("Commande", {
          fanActive: temp.Outside_temperature < data.representative_temp,
        });
        setActive(temp.Outside_temperature < data.representative_temp);
       
      }
    } catch (error) {
      console.error("Cooling API error:", error);
    }
  }, [temp.Inside_temperature, temp.Outside_temperature]);

  // Predictive maintenance data generation
  const generate_predict = useCallback(async () => {
    const newDataPoint = {
      minute: predict.length + 1,
      Air_temperature: getRandomValue(295.3, 304.5),
      Process_temperature: getRandomValue(305.7, 313.8),
      Rotational_speed: Math.floor(getRandomValue(1168, 2886)),
      Torque: getRandomValue(3.8, 76.6),
      Tool_wear: Math.floor(getRandomValue(0, 253)),
    };

    setPredict(prev => [...prev.slice(-19), newDataPoint]);

    try {
      const { data } = await axios.post("http://localhost:8000/api/predict", {
        station: 1,
        Product_ID: "M14860",
        Type: "M",
        Air_temperature: newDataPoint.Air_temperature,
        Process_temperature: newDataPoint.Process_temperature,
        Rotational_speed: newDataPoint.Rotational_speed,
        Torque: newDataPoint.Torque,
        Tool_wear: newDataPoint.Tool_wear
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setReport(data);
      console.log(report)
    } catch (error) {
      console.error("Predictive Maintenance API error:", error);
    }
  }, [getRandomValue, predict.length]);

  // Reducing subcarriers data generation
  const generate_reduce = useCallback(async () => {
    const now = new Date();



    const newDataPoint = {
      Longitude: parseFloat(getRandomValue(-8.655394, -8.490956).toFixed(6)),
      Latitude: parseFloat(getRandomValue(51.934883, 52.138499).toFixed(6)),
      Speed: Math.floor(getRandomValue(23, 114)),
      Operatorname: "B",
      CellID: Math.floor(getRandomValue(1, 4)),
      NetworkMode: "LTE",
      RSRP: Math.floor(getRandomValue(-125, -88)),
      RSRQ: Math.floor(getRandomValue(-16, -7)),
      SNR: parseFloat(getRandomValue(-4.0, 25.0).toFixed(1)),
      CQI: Math.floor(getRandomValue(1, 15)),
      RSSI: Math.floor(getRandomValue(-94, -67)),
      DL_bitrate: Math.floor(getRandomValue(0, 5600)),
      UL_bitrate: Math.floor(getRandomValue(0, 1780)),
      State: "D",
      NRxRSRP: parseFloat(getRandomValue(-126.0, -51.0).toFixed(1)),
      NRxRSRQ: parseFloat(getRandomValue(-225.0, -3.0).toFixed(1)),
      ServingCell_Lon: parseFloat(getRandomValue(-8.670811, -8.489758).toFixed(5)),
      ServingCell_Lat: parseFloat(getRandomValue(51.928426, 52.138878).toFixed(6)),
      ServingCell_Distance: parseFloat(getRandomValue(217.33, 10334.34).toFixed(2)),

      year: now.getFullYear(),
      month: now.getMonth() + 1, // because getMonth() is zero-based
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(), // or `reduce.length + 1` if you still want that logic
      second: now.getSeconds()
    };


    setReduce(prev => [...prev.slice(-19), newDataPoint]);

    try {
      const data = await axios.post("http://localhost:8000/api/reduce", {
        station: 1,
        ...newDataPoint
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setFrequency(data.data.details.ofdm_subcarriers);
      console.log("Frequency:", data.data.details.ofdm_subcarriers);
    } catch (error) {
      console.error("Reducing Subcarriers API error:", error);
    }
  }, [getRandomValue, reduce.length]);

  // Update temperature data
  const updateTempData = useCallback(() => {
    setOutsideTempData(prev => [...prev.slice(-6), temp.Outside_temperature]);
    setInsideTempData(prev => [...prev.slice(-6), temp.Inside_temperature]);
  }, [temp.Outside_temperature, temp.Inside_temperature]);

  // Data generation for charts
  const generateRotationalSpeed = useCallback(() => {
    const newValue = Math.floor(getRandomValue(1000, 2000));
    setCurrentRotationalSpeed(newValue);
    setRotationalSpeedData(prev => [...prev.slice(-6), {
      day: prev.length + 1,
      value: newValue
    }]);
  }, [getRandomValue]);

  const generateTorque = useCallback(() => {
    const newValue = parseFloat(getRandomValue(30, 50).toFixed(1));
    setCurrentTorque(newValue);
    setTorqueData(prev => [...prev.slice(-6), {
      day: prev.length + 1,
      value: parseFloat(newValue)
    }]);
  }, [getRandomValue]);

  // Initial data load
  useEffect(() => {
    const unsubscribe = readData("Capteurs", (data) => {
      setTemp({
        Inside_temperature: data.Temp1,
        Outside_temperature: data.Temp2
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Cooling system effect
  useEffect(() => {
    const coolingInterval = setInterval(() => {
      Cooling();
    }, 5000); // Call every 5 seconds

    return () => clearInterval(coolingInterval);
  }, [Cooling]);

  // Real-time data updates
  useEffect(() => {
    // Update torque and rotational speed every 2 seconds
    const valueInterval = setInterval(() => {
      generateRotationalSpeed();
      generateTorque();
    }, 2000);

    // Update charts every second
    const chartInterval = setInterval(() => {
      updateTempData();
      generate_predict();
      generate_reduce();
    }, 1000);

    return () => {
      clearInterval(valueInterval);
      clearInterval(chartInterval);
    };
  }, [generateRotationalSpeed, generateTorque, generate_predict, generate_reduce, updateTempData]);

  return (
    <div className="dashboard">
      <main className="main">
        <Topbar />

        <section className="stats">
          <StatCard title="Next 24h temperature" value={`${parseFloat(nextTemp.toFixed(2))} °C`} active />
          <StatCard title="Fans" value={activate ? "Active" : "Non Active"} active />
          <StatCard title="Extracteur" value={activate ? "Active" : "Non Active"} active={false} />
          <StatCard title="Cooling" value={!activate ? "Active" : "Non Active"} active={false} />
        </section>
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(36, 255, 127, 0.4)",
            padding: "20px",
            border: "1px solid rgb(36, 255, 127)",
            width: "100%",
            gap: "10px",

          }}
        >
          <p>the number of ofdm frequencies needed :</p>
          <h3>{frequency}</h3>
        </section>
        <section className="cards">
          <ConsumptionCard
            label="Outside Temperature"
            title="Outside Temp"
            value={`${temp.Outside_temperature}°C`}
            color="#4285F4"
            data={outsideTempData.map((val, i) => ({ day: i + 1, value: val }))}
          />
          <ConsumptionCard
            label="Inside Temperature"
            title="Inside Temp"
            value={`${temp.Inside_temperature}°C`}
            color="#34A853"
            data={insideTempData.map((val, i) => ({ day: i + 1, value: val }))}
          />
          <ConsumptionCard
            label="Rotational Speed"
            title="Rotational Speed"
            value={`${currentRotationalSpeed} RPM`}
            color="#EA4335"
            data={rotationalSpeedData}
          />
          <ConsumptionCard
            label="Torque"
            title="Torque"
            value={`${currentTorque} Nm`}
            color="#A142F4"
            data={torqueData}
          />
        </section>

        <section className="stock-analytics-row">
          <div className="left-graph">
            <AnalyticsChart
              report={true}
              handleViewReport={() => setFailure(prev => !prev)}
              title="Predictive Maintenance"
              data={predict}
              generate_data={generate_predict}
              generate={generatePredict}
            />
          </div>
          <div className="right-graph">
            <AnalyticsChart
              title="Reducing Subcarriers"
              data={reduce}
              generate_data={generate_reduce}
              generate={generatePredict}
            />
          </div>
        </section>
      </main>

      {failure && (
        <div

          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 787786786,
          }}

        >
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "500px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h2 style={{ marginBottom: "10px", color: "#4A7F5D" }}>Equipment Failure Report</h2>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ margin: "10px 0", fontSize: "16px", color: "#333" }}>Failure Probabilities:</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {Object.entries(report.failure_probabilities).map(([key, value]) => (
                  <li key={key} style={{ marginBottom: "5px" }}>
                    <strong>{failureLabels[key]}:</strong> {value}%
                  </li>
                ))}
              </ul>
            </div>
            <div
              onClick={() => setFailure(prev => !prev)}
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}

            >

              <IoIosClose
                color="red"
                size={40}
              />
            </div>
            <div>
              <p style={{ fontSize: "16px", marginBottom: "5px" }}>
                <strong>Most Likely Failure:</strong> {failureLabels[report.most_likely_failure]}
              </p>
              <p style={{ fontSize: "16px" }}>
                <strong>Maximum Probability:</strong> {report.max_probability}%
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

