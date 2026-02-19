# Clinical Dashboard (React + Node)

A production-style full-stack clinical monitoring dashboard built with **React (Vite)** and **Node.js (Express)**.

Designed to simulate hospital triage workflows using status-based prioritization, KPI summaries, and a clean API-driven architecture.

---

## 🚀 Features

- Backend health check endpoint
- Clinical patient table displaying vital signs
- Status-based visual prioritization (Stable / Observation / Critical)
- KPI summary cards for rapid triage overview
- Interactive UI with hover states and responsive layout
- Clean separation between frontend and backend layers

---

## 🏗 Architecture

clinical-dashboard-react-node/
├── client/ # React (Vite) frontend
└── src/ # Express backend API


- Frontend consumes REST API endpoints
- Backend exposes structured JSON responses
- Frontend and backend are designed for independent deployment

---

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- Modern CSS (Flexbox, hover interactions, card elevation)

### Backend
- Node.js
- Express.js

### Dev Tools
- Nodemon
- Concurrent local development

---

## ⚙️ How to Run Locally

### 1️⃣ Backend
From the project root:

```bash
npm install
npm run dev
Runs on:

http://localhost:5000
2️⃣ Frontend
From the project root:

cd client
npm install
npm run dev
Runs on:

http://localhost:5173
📌 API Endpoints
Health Check
GET /api/health
Returns backend service status.

Patient Data
GET /api/patients
Returns mock clinical patient data including:

Name

Age

Heart Rate

Blood Pressure

Clinical Status

🎯 Project Purpose
This project demonstrates:

Full-stack integration using REST APIs

Status-driven UI logic and visual prioritization

Clean component structure and maintainable CSS

Clear API contracts between frontend and backend

Production-style UI polish without external UI frameworks

Focus was placed on maintainability, clarity, and scalable UI patterns.

📈 Planned Improvements
Persistent data storage (database integration)

Live polling or WebSocket updates

Authentication and role-based access

Dockerization

Cloud deployment (Vercel + Render)

📎 Notes
This project serves as a foundation for extending into production-grade monitoring and dashboard systems.