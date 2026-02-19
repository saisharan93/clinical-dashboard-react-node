import { useEffect, useState } from "react";
import "./App.css";
const getPollingInterval = (status) => {
    return status === "API running" ? 5000 : 15000;
  };  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");


  const fetchAll = async () => {
    try {
      setErr("");
  
      const healthRes = await fetch(`${API_URL}/api/health`);
      if (!healthRes.ok) throw new Error("Health check failed");
      const health = await healthRes.json();
  
      const status = health.status || "API running";
      setBackendStatus(status);
  
      const patientRes = await fetch(`${API_URL}/api/patients`);
      if (!patientRes.ok) throw new Error("Patients API failed");
      const data = await patientRes.json();
      setPatients(Array.isArray(data) ? data : []);
  
      return status;
    } catch (e) {
      setErr(e.message || "Something went wrong");
      setBackendStatus("Offline / Error");
      return "Offline / Error";
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    let timeoutId;
  
    const poll = async () => {
      const status = await fetchAll();
      const interval = getPollingInterval(status);
      timeoutId = setTimeout(poll, interval);
    };
  
    poll();
  
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  
  
  

  const stableCount = patients.filter((p) => p.status === "Stable").length;
  const observationCount = patients.filter((p) => p.status === "Under Observation").length;
  const criticalCount = patients.filter((p) => p.status === "Critical").length;

  return (
    <div className="container">
      <h1>Clinical Dashboard</h1>

      <div className="backend">
  <strong>Backend Status:</strong> {backendStatus}

  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
    Polling: {backendStatus === "API running" ? "Normal (5s)" : "Degraded (15s)"}
  </div>

  {err ? (
    <div style={{ marginTop: 8, color: "#b00020" }}>
      Error: {err}
    </div>
  ) : null}
</div>


      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="summary">
            <div className="card stable">
              <div>Stable</div>
              <strong>{stableCount}</strong>
            </div>

            <div className="card observe">
              <div>Observation</div>
              <strong>{observationCount}</strong>
            </div>

            <div className="card critical">
              <div>Critical</div>
              <strong>{criticalCount}</strong>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.heartRate}</td>
                  <td>{p.bloodPressure}</td>
                  <td className={p.status === "Stable" ? "stable" : p.status === "Under Observation" ? "observe" : "critical"}>
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {patients.length === 0 ? <div style={{ marginTop: 12 }}>No patient data available.</div> : null}
        </>
      )}
    </div>
  );
}
