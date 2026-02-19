import "./App.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:4000/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Backend not reachable"));

    // Mock patient data (later comes from API)
    setPatients([
      { name: "John Doe", age: 45, hr: 78, bp: "120/80", status: "Stable" },
      { name: "Jane Smith", age: 62, hr: 92, bp: "140/90", status: "Under Observation" },
      { name: "Mike Johnson", age: 54, hr: 110, bp: "150/95", status: "Critical" },
    ]);
  }, []);

  const counts = {
    Stable: patients.filter(p => p.status === "Stable").length,
    Observation: patients.filter(p => p.status === "Under Observation").length,
    Critical: patients.filter(p => p.status === "Critical").length,
  };

  const statusClass = (status) => {
    if (status === "Stable") return "stable";
    if (status === "Under Observation") return "observe";
    if (status === "Critical") return "critical";
    return "";
  };

  return (
    <div className="container">
      <h1>Clinical Dashboard</h1>
      <p className="backend">Backend Status: {status}</p>

      {/* SUMMARY CARDS */}
      <div className="summary">
        <div className="card stable">Stable<br /><strong>{counts.Stable}</strong></div>
        <div className="card observe">Observation<br /><strong>{counts.Observation}</strong></div>
        <div className="card critical">Critical<br /><strong>{counts.Critical}</strong></div>
      </div>

      {/* TABLE */}
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
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.hr}</td>
              <td>{p.bp}</td>
              <td className={statusClass(p.status)}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
