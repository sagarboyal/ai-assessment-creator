# AI Assessment Creator Backend

Spring Boot backend for managing assessments, generating AI-powered question papers, publishing live generation updates, and caching frequently requested data with Redis.

## Service Role

This backend is responsible for:

- creating, updating, listing, and deleting assessments
- generating question papers from assessment definitions
- publishing live status updates through WebSockets
- storing persistent data in MongoDB
- caching assessment and question-paper lookups in Redis

## Live Deployment

- Backend API: https://ai-assessment-creator-g96o.onrender.com/api/v1
- WebSocket endpoint: wss://ai-assessment-creator-g96o.onrender.com/ws

## Deployment Note

This backend runs on free-tier infrastructure.

- API hosting: Render
- Redis hosting: Upstash free tier
- The first API request after inactivity may be slower because the service can cold start.

## Tech Stack

- Java 21
- Spring Boot 4
- Spring Web
- Spring WebSocket
- Spring Data MongoDB
- Spring Data Redis
- Spring Cache
- WebFlux client support
- Groq API integration

## Core Features

- REST API for assessment lifecycle management
- AI-based question-paper generation
- WebSocket topic updates for async generation progress
- Redis-backed caching for faster reads
- Cache fallback behavior so cache issues do not break core API flows
- Startup connection verification for MongoDB and Redis

## Cache Design

The backend currently defines Redis caches for:

- `assessmentById`
- `questionPaperById`
- `questionPaperByAssessmentId`

Question papers are cached when generated and evicted when related records are deleted. Assessments are also cached by ID through Spring Cache annotations.

## Environment Variables

Copy `.env.example` to `.env` and fill in your real values.

```powershell
Copy-Item .env.example .env
```

```env
SERVER_PORT=8080
SPRING_APPLICATION_NAME=assessment-service
MONGODB_URI=mongodb://localhost:27017/assessment
DATABASE_NAME=assessment
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=your-redis-password
REDIS_SSL_ENABLED=true
REDIS_TIMEOUT=2s
CACHE_TYPE=redis
CACHE_REDIS_TTL=10m
CACHE_REDIS_CACHE_NULL_VALUES=false
APP_CACHE_ASSESSMENT_BY_ID_TTL=10m
APP_CACHE_QUESTION_PAPER_BY_ID_TTL=15m
APP_CACHE_QUESTION_PAPER_BY_ASSESSMENT_ID_TTL=15m
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_URL=https://api.groq.com/openai/v1/chat/completions
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
APP_CORS_ALLOWED_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
APP_CORS_ALLOWED_HEADERS=*
APP_CORS_ALLOW_CREDENTIALS=true
APP_WEBSOCKET_ENDPOINT=/ws
APP_WEBSOCKET_BROKER_PREFIXES=/topic
APP_WEBSOCKET_APPLICATION_DESTINATION_PREFIXES=/app
```

## Local Setup

### Prerequisites

- Java 21+
- Maven
- MongoDB
- Redis or Upstash Redis credentials
- Groq API key

### Start the backend

```powershell
cd backend
mvn spring-boot:run
```

The API usually runs at `http://localhost:8080`.

## Main API Routes

- `POST /api/v1/assessments`
- `PUT /api/v1/assessments`
- `GET /api/v1/assessments/{id}`
- `GET /api/v1/assessments`
- `PATCH /api/v1/assessments/status`
- `DELETE /api/v1/assessments/{id}`
- `POST /api/v1/questions/{id}/generate`
- `GET /api/v1/questions/assessment/{assessmentId}`
- `GET /api/v1/questions/{id}`
- `DELETE /api/v1/questions/{id}`
- `DELETE /api/v1/questions/assessment/{assessmentId}`

## WebSocket Configuration

- Endpoint: `/ws`
- Broker prefix: `/topic`
- Application destination prefix: `/app`
- Question generation topic: `/topic/questions/{assessmentId}`

The frontend subscribes to question-generation status updates using the assessment ID topic.

## Important Config Files

- `backend/src/main/resources/application.yaml`
- `backend/.env.example`
- `backend/pom.xml`

## Repository Context

This backend is part of the full-stack monorepo:

```text
AI Assessment Creator/
|-- backend/
|-- frontend/
`-- docker-compose.yml
```
