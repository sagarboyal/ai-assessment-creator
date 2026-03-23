# AI Assessment Creator

AI Assessment Creator is a full-stack application for creating academic assessments and generating AI-assisted question papers through a modern frontend and a Spring Boot backend.

It is designed as a recruiter-friendly and developer-friendly monorepo with separate frontend and backend applications, live deployment, real-time status updates, and Redis-backed caching.

## Live Deployment

- Frontend: https://ai-assessment-creator-two.vercel.app/
- Backend API: https://ai-assessment-creator-g96o.onrender.com/api/v1
- WebSocket endpoint: wss://ai-assessment-creator-g96o.onrender.com/ws

## Project Highlights

- Create, edit, search, and manage assessments from a polished React interface
- Generate question papers with AI using Groq
- Receive live question-generation updates over WebSockets
- Store core data in MongoDB
- Cache assessments and question papers with Redis on Upstash
- Deploy the frontend and backend separately for a production-style full-stack setup

## Architecture

### Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS v4

### Backend

- Java 21
- Spring Boot 4
- Spring Web and WebSocket
- Spring Data MongoDB
- Spring Data Redis
- Spring Cache
- Groq API integration

### Infrastructure

- Frontend hosting: Vercel
- Backend hosting: Render
- Redis hosting: Upstash
- Primary database: MongoDB

## Repository Structure

```text
AI Assessment Creator/
|-- backend/
|-- frontend/
`-- docker-compose.yml
```

## Monorepo Docs

- Frontend guide: `frontend/README.md`
- Backend guide: `backend/README.md`
- Backend environment template: `backend/.env.example`
- Frontend environment template: `frontend/.env.example`

## Quick Start

### 1. Start the backend

```powershell
cd backend
mvn spring-boot:run
```

### 2. Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

### 3. Open the app

Frontend local URL:

```text
http://localhost:5173
```

Backend local URL:

```text
http://localhost:8080/api/v1
```

## Environment Setup

- Frontend configuration lives in `frontend/.env`
- Frontend example file: `frontend/.env.example`
- Backend configuration lives in `backend/.env`
- Backend example file: `backend/.env.example`

The backend currently uses environment-based configuration for:

- MongoDB connection
- Redis / Upstash connection
- cache TTL values
- Groq API settings
- CORS configuration
- WebSocket configuration

## Free-Tier Hosting Note

This project is deployed on free-tier services. Because of that, the initial request can be slower after inactivity, especially when the Render backend needs to wake up. This is expected behavior for demo deployments.

## Why This Project Stands Out

- Full-stack architecture instead of a frontend-only demo
- Real async workflow with WebSocket updates
- Production-style cache layer with Redis
- Clean monorepo structure with separated service documentation
- Useful blend of UI work, backend logic, AI integration, and deployment
