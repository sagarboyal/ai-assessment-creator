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

## Environment Variables

Create a local `.env` file from `.env.example` and use it as the starting point for local development.

```powershell
Copy-Item .env.example .env
```

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

## Repository Context

This frontend is part of the full-stack monorepo:

```text
AI Assessment Creator/
|-- backend/
|-- frontend/
`-- docker-compose.yml
```

For backend setup and environment details, see `../backend/README.md`.

## Production Review Note

If you are evaluating the deployed project, give the first request a few seconds when the services have been idle. That startup delay is expected on free-tier Vercel, Render, and Upstash-backed setups and is normal for demo deployments.
