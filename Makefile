# Convenience Makefile for local development

.PHONY: backend-run backend-docker frontend-run

backend-run:
	cd backend && ./mvnw spring-boot:run

backend-docker:
	cd backend && docker compose up --build -d

backend-docker-down:
	cd backend && docker compose down

frontend-run:
	cd frontend && npm install && npm run dev

logs-backend:
	# show backend logs when running with docker
	docker compose -f backend/docker-compose.yml logs -f backend || true
