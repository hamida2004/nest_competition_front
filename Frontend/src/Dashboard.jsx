import React, { useState, useEffect } from "react";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import AnalyticsChart from "./components/MainChart";
import ConsumptionCard from "./components/ConsumptionCard";
import "./Dashboard.css";
import { writeData, readData } from '../firebase';
import axios from "axios";

export default function Dashboard() {

  const [temp, setTemp] = useState({
    Inside_temperature: 0,
    Outside_temperature: 0,
  })
  
  const date = new Date();
  const Cooling = async () => {
    try {
      const data = await axios.post("http://localhost:8000/api/cool", {
        "station": 1,
        "Present_Tmax": temp.Inside_temperature,
        "Present_Tmin": temp.Inside_temperature,
        "LDAPS_RHmin": 40.0,
        "LDAPS_RHmax": 80.0,
        "LDAPS_Tmax_lapse": 0.5,
        "LDAPS_Tmin_lapse": 0.3,
        "LDAPS_WS": 5.0,
        "LDAPS_LH": 10.0,
        "LDAPS_CC1": 0.2,
        "LDAPS_CC2": 0.3,
        "LDAPS_CC3": 0.1,
        "LDAPS_CC4": 0.4,
        "LDAPS_PPT1": 0.0,
        "LDAPS_PPT2": 0.0,
        "LDAPS_PPT3": 0.0,
        "LDAPS_PPT4": 0.0,
        "lat": 37.5665,
        "lon": 126.9780,
        "DEM": 50.0,
        "Slope": 2.0,
        "Solar radiation": 200.0,
        "year": date.getFullYear(),
        "month": date.getMonth() + 1,
        "day": date.getDay(),
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(data.data.representative_temp > 30){
        if ( temp.Outside_temperature < data.data.representative_temp) {
          try {
            writeData("Commande", {
              fanActive: true,
            });
          } catch (error) {
            console.error("Error writing to Commande:", error);
          }
        }
        else {
          try {
            writeData("Commande", {
              fanActive: false,
            });
          } catch (error) {
            console.error("Error writing to Commande:", error);
          }
        }
      }

    } catch (error) {
      console.error("Cooling API error:", error);
    }
  };

   
  useEffect(() => {
    Cooling()

    readData("Capteurs", (data) => {
      // console.log("📡 Data from DB:", data);
      setTemp({
        Inside_temperature: data.Temp1,
        Outside_temperature: data.Temp2
      })

    });
   
  })

  const [failure, setFailure] = useState(false);
  const [predict, setPredict] = useState([]);
  const [reduce, setReduce] = useState([]);
  const [report, setReport] = useState({});
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
    setPredict((prev) => [...prev, newDataPoint].slice(-20)); 
    try {
      const data = axios.post("http://localhost:8000/api/predict", {
        "station": 1,
        "Air_temperature": newDataPoint.Air_temperature,
        "Process_temperature": newDataPoint.Process_temperature,
        "Rotational_speed": newDataPoint.Rotational_speed,
        "Torque": newDataPoint.Torque,
        "Tool_wear": newDataPoint.Tool_wear
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setReport(data.data);
      console.log("Predictive Maintenance API response:", data.data);
    } catch (error) {
      console.error("Predictive Maintenance API error:", error);
    }
    // Keep last 20 points
  };

  // Function to generate reducing subcarriers data
  const generate_reduce = async () => {
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
    
    setReduce((prev) => [...prev, newDataPoint].slice(-20));
    
    try {
      const data = axios.post("http://localhost:8000/api/reduce", {
        "station": 1,
        "Longitude": newDataPoint.Longitude,
        "Latitude": newDataPoint.Latitude,
        "Speed": newDataPoint.Speed,
        "CellID": newDataPoint.CellID,
        "RSRP": newDataPoint.RSRP,
        "RSRQ": newDataPoint.RSRQ,
        "SNR": newDataPoint.SNR,
        "CQI": newDataPoint.CQI,
        "RSSI": newDataPoint.RSSI,
        "DL_bitrate": newDataPoint.DL_bitrate,
        "UL_bitrate": newDataPoint.UL_bitrate,
        "NRxRSRP": newDataPoint.NRxRSRP,
        "NRxRSRQ": newDataPoint.NRxRSRQ,
        "ServingCell_Lon": newDataPoint.ServingCell_Lon,
        "ServingCell_Lat": newDataPoint.ServingCell_Lat,
        "ServingCell_Distance": newDataPoint.ServingCell_Distance
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });


      console.log("Reducing Subcarriers API response:", data.data);
    } catch (error) {
      console.error("Reducing Subcarriers API error:", error);
    }// Keep last 20 points
  };

  // State for consumption metrics
  const [outsideTempData, setOutsideTempData] = useState([]);
  const [insideTempData, setInsideTempData] = useState([]);
  const [rotationalSpeedData, setRotationalSpeedData] = useState([]);
  const [torqueData, setTorqueData] = useState([]);

  // Function to generate random values within a range

 
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
      
      generateRotationalSpeed();
      generateTorque();
    }, 1000);

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
            value={`${temp.Outside_temperature}°C`}
            color="#4285F4"
            data={outsideTempData}
          />{/* Inside Temperature Card */}
          <ConsumptionCard
            label="Inside Temperature"
            title="Inside Temp"
            value={`${temp.Inside_temperature}°C`}
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
              report={true}
              handleViewReport={() => setFailure((prev) => !prev)}
              title="Predictive Maintenance"
              data={predict}
              generate_data={generate_predict}
            />
          </div>
          <div className="right-graph">
            <AnalyticsChart
              title="Reducing Subcarriers"
              data={reduce}
              generate_data={generate_reduce}
            />
          </div>
        </section>
      </main>
      {failure && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              textAlign: 'center',
              width: '300px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              zIndex: 9999999,
            }}
          >
            <h2>Failure Detected!</h2>
            <p>Please check the system immediately.</p>
          </div>
        </div>
      )}

    </div>
  );
}