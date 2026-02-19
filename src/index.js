import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

/**
 * Health check
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "API running" });
});

/**
 * Mock patient data
 */
app.get("/api/patients", (req, res) => {
  res.json([
    {
      name: "John Doe",
      age: 45,
      heartRate: 78,
      bloodPressure: "120/80",
      status: "Stable",
    },
    {
      name: "Jane Smith",
      age: 62,
      heartRate: 92,
      bloodPressure: "140/90",
      status: "Under Observation",
    },
    {
      name: "Mike Johnson",
      age: 54,
      heartRate: 110,
      bloodPressure: "150/95",
      status: "Critical",
    },
  ]);
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
