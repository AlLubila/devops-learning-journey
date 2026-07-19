# DataPulse - Microservices Architecture Containerization (Beta Launch)


## Overview

This project simulates a real-world DevOps intervention for the tech company **DataPulse** during its beta product launch. The objective was to containerize, secure, and orchestrate a multi-service architecture composed of a frontend, a backend API, and a persistent storage layer while applying production-oriented DevOps practices.

---

## Architecture Overview

The infrastructure is composed of three isolated services communicating over a dedicated Docker network:

- **Frontend (`frontend`)**
  - Nginx (Alpine-based)
  - Exposes port `80`
  - Serves static assets through a mounted volume

- **Backend API (`api`)**
  - FastAPI application
  - Lightweight Python container
  - Connects to the PostgreSQL database

- **Database (`postgres`)**
  - PostgreSQL 15
  - Persistent storage
  - Integrated health checks

---

## Production Best Practices

The project implements several DevOps best practices beyond basic containerization.

### Layer Cache Optimization

The `api/Dockerfile` copies `requirements.txt` before the application source code. This allows Docker to reuse cached dependency layers and significantly reduces rebuild times.

### Deterministic Startup Order

The PostgreSQL service includes a native Docker Compose `healthcheck` using `pg_isready`.

The API service starts only after the database becomes healthy by using:

```yaml
depends_on:
  postgres:
    condition: service_healthy
```

This prevents application failures caused by database startup latency.

### Secrets Management

Configuration is separated from the application code.

Database credentials are injected at runtime through a local `.env` file and are never hardcoded into the source code or Docker images.

### Persistent Storage

A named Docker volume is used to preserve PostgreSQL data across container restarts.

```text
postgres_master_data
```

### Proper Signal Handling

The FastAPI container uses the exec form of `CMD`:

```dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

This ensures the application correctly receives operating system signals such as `SIGTERM`.

---

## Project Structure

```text
.
├── api/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
├── frontend/
│   └── ...
├── docker-compose.yml
├── .env
└── README.md
```

---

## Prerequisites

- Docker
- Docker Compose

---

## Environment Configuration

Create a `.env` file in the project root.

```env
DB_PASSWORD=your_secure_production_password_here
```

---

## Running the Project

Build the images and start all services:

```bash
docker compose up --build
```

---

## Verification

After all containers are running, verify the infrastructure using the following endpoints.

| Service | URL | Purpose |
|----------|-----|---------|
| Frontend | `http://localhost:80` | Verifies static content is served by Nginx |
| API Health | `http://localhost:8000/health` | Confirms the FastAPI service is running |
| Database Connectivity | `http://localhost:8000/database-check` | Confirms API-to-PostgreSQL communication and successful database connectivity |

---

## Key Technologies

- Docker
- Docker Compose
- Nginx
- FastAPI
- PostgreSQL 15
