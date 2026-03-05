import { useEffect, useState } from "react";
import "./App.css";
const getPollingInterval = (status) => {
    return status === "API running" ? 5000 : 15000;
  };  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

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
      <p className="subtitle">
        A data-heavy triage dashboard focused on clarity, accessibility, and deploy-safe API polling.
      </p>
  
      <div className="panel backend">
        <div className="badge" aria-live="polite">
          <span
            className="dot"
            style={{
              background:
                backendStatus === "API running" ? "var(--stable)" : "var(--critical)",
            }}
          />
          <span>
            <strong>Backend:</strong> {backendStatus}
          </span>
        </div>
  
        <div className="badge">
          Polling: {backendStatus === "API running" ? "Normal (5s)" : "Degraded (15s)"}
        </div>
      </div>
  
      {err ? <div className="error">Error: {err}</div> : null}
  
      {loading ? (
        <div className="panel" style={{ marginTop: 14 }}>Loading…</div>
      ) : (
        <>
          <div className="summary">
            <div className="card stable">
              <div className="label">Stable</div>
              <div className="value">{stableCount}</div>
            </div>
  
            <div className="card observe">
              <div className="label">Under Observation</div>
              <div className="value">{observationCount}</div>
            </div>
  
            <div className="card critical">
              <div className="label">Critical</div>
              <div className="value">{criticalCount}</div>
            </div>
          </div>
  
          <div className="tableWrap">
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
                {patients.map((p, idx) => {
                  const statusClass =
                    p.status === "Stable"
                      ? "stable"
                      : p.status === "Under Observation"
                      ? "observe"
                      : "critical";
  
                  return (
                    <tr key={idx}>
                      <td>{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.heartRate}</td>
                      <td>{p.bloodPressure}</td>
                      <td className={`status ${statusClass}`}>{p.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
  
          <div className="footerNote">
            {patients.length === 0 ? "No patient data available." : "Mock data for portfolio demonstration."}
          </div>
        </>
      )}
    </div>
  );
}
