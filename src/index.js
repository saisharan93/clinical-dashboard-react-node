import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Fake clinical data (for now)
const patients = [
  {
    id: "p001",
    name: "John Doe",
    age: 45,
    heartRate: 78,
    bloodPressure: "120/80",
    status: "Stable"
  },
  {
    id: "p002",
    name: "Jane Smith",
    age: 62,
    heartRate: 92,
    bloodPressure: "140/90",
    status: "Under Observation"
  },
  {
    id: "p003",
    name: "Mike Johnson",
    age: 54,
    heartRate: 110,
    bloodPressure: "150/95",
    status: "Critical"
  }
];

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "API running" });
});

// Patients API
app.get("/patients", (req, res) => {
  res.json(patients);
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
