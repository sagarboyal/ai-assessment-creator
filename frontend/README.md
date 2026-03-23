# AI Assessment Creator Frontend

Professional frontend for creating, managing, and reviewing AI-assisted school assessments. This application connects to the `ai-assessment-creator` backend to manage assignments, trigger question-paper generation, receive live status updates, and display generated papers in a polished teacher-facing workflow.

## Live Application

- Frontend: https://ai-assessment-creator-two.vercel.app/
- Backend API: https://ai-assessment-creator-g96o.onrender.com/api/v1
- WebSocket endpoint: wss://ai-assessment-creator-g96o.onrender.com/ws

## Deployment Note

This project uses free-tier hosting.

- The frontend is deployed on Vercel.
- The backend API and WebSocket service are deployed on Render.
- Redis caching is deployed on Upstash free tier.
- The initial request can be slower after inactivity because free-tier services may cold start.

## What This Frontend Supports

- Create assignments with academic metadata, timing, due date, and optional instructions
- Edit and delete existing assignments
- Search assignments by title and filter by due date
- Trigger AI-based question-paper generation
- Receive live generation status updates over WebSockets
- View generated question papers in a dedicated detail page
- Work with backend-cached question paper responses for faster retrieval

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS v4
- `@react-pdf/renderer`
- `html2pdf.js`

## Backend Architecture This Frontend Integrates With

The current backend on `main` includes:

- Spring Boot 4
- MongoDB for primary persistence
- Redis caching with Spring Cache
- Upstash Redis deployment for cache storage
- WebSocket messaging for generation status updates
- Groq-powered question-paper generation using `llama-3.3-70b-versatile`

The backend now caches:

- assessments by ID
- question papers by question-paper ID
- question papers by assessment ID

It also includes a cache fallback handler so cache failures do not block normal API behavior.

## Environment Variables

Use the included `.env.example` as the starting point for local development.

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_WS_URL=ws://localhost:8080/ws
```

For the deployed application, the frontend points to:

```env
VITE_API_BASE_URL=https://ai-assessment-creator-g96o.onrender.com/api/v1
VITE_WS_URL=wss://ai-assessment-creator-g96o.onrender.com/ws
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm
- Running backend service

### Install dependencies

```powershell
npm install
```

### Start the frontend

```powershell
npm run dev
```

The app usually runs at `http://localhost:5173`.

## Available Scripts

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend Endpoints Used By The Frontend

- `GET /assessments`
- `POST /assessments`
- `PUT /assessments`
- `DELETE /assessments/{id}`
- `POST /questions/{id}/generate`
- `GET /questions/assessment/{assessmentId}`
- WebSocket endpoint: `/ws`
- WebSocket topic pattern: `/topic/questions/{assessmentId}`

## Recommended Development Flow

1. Start MongoDB and Redis if you are running the full stack locally.
2. Start the backend from the repository `backend` folder.
3. Configure `frontend/.env` with the correct API and WebSocket URLs.
4. Run `npm run dev` inside `frontend`.

## Repository Context

This frontend is part of the full-stack monorepo:

```text
AI Assessment Creator/
|-- backend/
|-- frontend/
`-- docker-compose.yml
```

## Production Review Note

If you are evaluating the deployed project, give the first request a few seconds when the services have been idle. That startup delay is expected on free-tier Vercel, Render, and Upstash-backed setups and is normal for demo deployments.
