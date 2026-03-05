import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://clinical-dashboard-react-node-ec3yio6h4.vercel.app"
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server or curl
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) {
        return cb(null, true);
      }

      return cb(new Error("CORS blocked for this origin"));
    }
  })
);

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
  console.log(`🚀 Backend running on port ${PORT}`);
});