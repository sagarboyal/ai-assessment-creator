# AI Assessment Creator

AI Assessment Creator is a full-stack project for creating assessments and generating question papers with AI assistance.

The repository currently contains:

- `backend`: Spring Boot API for assessment and question-paper management
- `frontend`: React + TypeScript + Vite app for the UI

## Tech Stack

- Frontend: React, TypeScript, Vite, Redux Toolkit, Axios, Tailwind CSS
- Backend: Spring Boot, MongoDB, WebSocket support
- AI integration: Groq API

## Project Structure

```text
.
|-- backend/
|-- frontend/
|-- docker-compose.yml
`-- README.md
```

## Prerequisites

- Node.js 20+ and npm
- Java 21+
- Maven
- MongoDB running locally on `mongodb://localhost:27017/assesment-db`
- A Groq API key

## Environment Notes

The backend reads the Groq API key from the `KEY` environment variable.

Example PowerShell session:

```powershell
$env:KEY="your-groq-api-key"
```

## Local Development

### 1. Start the backend

```powershell
cd backend
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

### 2. Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs on Vite's local dev server, typically `http://localhost:5173`.

## Frontend Commands

```powershell
cd frontend
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend Notes

- Main application config: `backend/src/main/resources/application.yaml`
- CORS is configured for local frontend origins
- MongoDB is used as the primary datastore

## Docker

A `docker-compose.yml` file exists in the project root and can be used as a starting point for local services if needed.

## Development Workflow

- Build features in a dedicated branch
- Test backend and frontend changes locally
- Merge completed work into `main` after validation

## Status

This repository includes both the assessment-management backend and the frontend UI for creating and listing assignments.
