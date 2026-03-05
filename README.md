# Clinical Dashboard (React + Node)

A production-style, full-stack clinical monitoring dashboard built with **React (Vite)** and **Node.js (Express)**.
Designed to simulate triage workflows using **status-based prioritization**, KPI summaries, and an API-driven architecture.

## Live Demo
- Frontend: (add after deploy)
- API: (add after deploy)

## Screenshots
![Overview](client/public/screenshots/overview.png)
![Table](client/public/screenshots/table.png)
![Mobile](client/public/screenshots/mobile.png)

## What this demonstrates
- Building data-heavy UI with clear visual hierarchy
- Accessible, responsive component patterns
- Deploy-safe API integration with health-aware polling
- Clean separation of frontend and backend

## Features
- Backend health check endpoint (`/api/health`)
- Patient table with vitals + severity
- KPI summary cards for fast triage
- Adaptive polling: 5s normal / 15s degraded
- Clean API-first architecture

## Architecture
```txt
clinical-dashboard-react-node/
  client/   # React (Vite) frontend
  src/      # Express backend API