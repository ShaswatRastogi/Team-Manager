# Final Robust Dockerfile for Monolith
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend
COPY frontend/ ./frontend/
RUN npm run build --prefix frontend

FROM python:3.11-slim
WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY --from=frontend-builder /app/frontend/build ./frontend/build
COPY backend/ ./backend/

ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# The app is served from the backend directory
WORKDIR /app/backend
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", "--workers", "2", "--timeout", "120"]
