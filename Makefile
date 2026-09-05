SHELL := /bin/bash

.PHONY: help db-up db-down backend-build backend-test backend-run web-install web-lint web-typecheck web-test web-build web-dev mobile-install mobile-lint mobile-typecheck mobile-test packages-test all-checks

help:
	@echo "Autonomous College Platform — developer commands"
	@echo ""
	@echo "  make db-up             Start local PostgreSQL (docker compose)"
	@echo "  make db-down           Stop local PostgreSQL"
	@echo "  make backend-build     Compile backend (Gradle)"
	@echo "  make backend-test      Run backend tests incl. ArchUnit (Gradle)"
	@echo "  make backend-run       Run the Spring Boot app locally"
	@echo "  make web-install       Install JS/TS workspace dependencies (root)"
	@echo "  make web-lint          Lint the web app"
	@echo "  make web-typecheck     Typecheck the web app"
	@echo "  make web-test          Run web unit/component tests (Vitest)"
	@echo "  make web-build         Production build the web app"
	@echo "  make web-dev           Run the web dev server"
	@echo "  make mobile-lint       Lint the mobile app"
	@echo "  make mobile-typecheck  Typecheck the mobile app"
	@echo "  make mobile-test       Run mobile unit/component tests"
	@echo "  make packages-test     Test shared packages/*"
	@echo "  make all-checks        Run every check this repo currently has"

db-up:
	docker compose up -d postgres

db-down:
	docker compose down

backend-build:
	cd backend && ./gradlew build -x test

backend-test:
	cd backend && ./gradlew test

backend-run:
	cd backend && ./gradlew :app:bootRun

web-install:
	npm install

web-lint:
	npm run web:lint

web-typecheck:
	npm run web:typecheck

web-test:
	npm run web:test

web-build:
	npm run web:build

web-dev:
	npm run web:dev

mobile-lint:
	npm run mobile:lint

mobile-typecheck:
	npm run mobile:typecheck

mobile-test:
	npm run mobile:test

packages-test:
	npm test --workspaces --if-present --include-workspace-root=false

all-checks: backend-test web-lint web-typecheck web-test web-build mobile-lint mobile-typecheck mobile-test
