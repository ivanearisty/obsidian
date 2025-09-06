# API design, testing & mocking

* **Top picks:**
  * **OpenAPI** (spec as single source of truth) + **Swagger UI/Redoc** (docs)
  * **Insomnia** or **Bruno** (lighter alternatives to Postman)
  * **Prism (Stoplight)** (mock servers from OpenAPI)
  * **MSW (Mock Service Worker)** (frontend API mocking)
  * **Pact** (contract testing)
* **Nice:** **HTTPie/curlie** (human-friendly HTTP), **Hoppscotch** (web client)

# Frontend platform & DX

* **Top picks:**

  * **Next.js** (SSR/ISR, API routes) + **Vite** (fast builds)
  * **TanStack Query** (server cache/data fetching) + **Zustand** (simple state)
  * **Storybook** or **Ladle** (component sandbox)
* **Nice:** **Remix**, **Bun** or **Deno** (alt runtimes)

# Mobile shipping & push

* **Top picks:**

  * **Expo** (EAS builds, OTA updates)
  * **OneSignal** or **Expo Notifications** (multi-platform push)
* **Nice:** **Firebase Cloud Messaging** (Android), direct **APNs** (iOS) for full control

# Data layer, ORM, migrations

* **Top picks (TS/Node):** **Prisma** or **Drizzle ORM** (+ **Zod** schemas)
* **Top picks (Java):** **jOOQ** (type-safe SQL), **Flyway/Liquibase** (migrations)
* **Top picks (Python):** **SQLAlchemy** + **Alembic**
* **Search:** **Meilisearch** or **Typesense**
* **Vector:** **pgvector**, **Qdrant** (if you go beyond Postgres)

# Queues, jobs & workflows

* **Top picks:**

  * **Redis** (queues, cache) + **BullMQ** (Node) / **Celery/RQ** (Python) / **Spring Batch** (Java)
  * **Temporal.io** (durable workflows, retries, schedules)
* **Cloud options:** **SQS/SNS**, **EventBridge**

# Realtime & streaming

* **Top picks:** **Socket.IO** / **SSE**, managed **Ably** or **Pusher**
* **Heavy hitters:** **Kafka** / **Redpanda** (when you truly need streams)

# Observability, logs & uptime

* **Top picks:**

  * **OpenTelemetry** (traces/metrics/logs)
  * **Sentry** (errors + perf)
  * **Prometheus/Grafana** (metrics) + **Loki** (logs)
  * **Uptime Kuma** or **Checkly** (synthetic checks)

# Security, secrets & supply-chain

* **Top picks:**

  * **SOPS (+ age)** or **AWS Secrets Manager/SSM** (secrets)
  * **Gitleaks** (secret scanning), **Dependabot/Renovate** (deps), **Trivy** (container scans)
  * **OWASP ZAP** (DAST), **OPA** (policy as code)

# CI/CD, infra & ops

* **Top picks:**

  * **GitHub Actions** (CI), **Changesets** (versioning/release notes)
  * **Terraform** or **Pulumi** (IaC)
  * **Caddy** or **Traefik** (reverse proxy)
  * **Cloudflare** (**Workers**, **KV**, **R2**, **D1**) for edge & CDN
* **You already have:** Docker, Docker Desktop, OrbStack, ngrok, Watchman (nice!)

# Email, comms & notifications

* **Top picks:** **Resend** or **Postmark** (transactional), **AWS SES** (cost-effective)
* **Event-driven notif orchestration:** **Novu** or **Courier**

# Documentation & portals

* **Top picks:** **Docusaurus** (product/dev docs), **Mintlify** (API docs), **OpenAPI Generator** (SDKs)

# Data/analytics engineering (lightweight)

* **Top picks:** **DuckDB** (local/embedded analytics), **dbt** (transformations)
* **Pipelines:** **Airbyte** (ELT)

# Terminal & CLI quality-of-life (worth adding to your brew set)

* **fzf**, **ripgrep (rg)**, **fd**, **eza**, **zoxide**, **jq/yq**, **delta** (git diffs)

# Edge & image/media utilities

* **imgproxy** or **Thumbor** (on-the-fly image resize), **Sharp** (Node image ops)

---

## Quick cross-check with your Brew/Casks

You already have many foundations covered: **Postman**, **Supabase CLI**, **Stripe CLI**, **Docker** + **Docker Desktop**, **pnpm**, **uv**, **Node**, **MongoDB**, **MySQL**, **pgAdmin4**, **ngrok**, **Wireshark**, **VS Code**, **IntelliJ**, **Raycast**, **iTerm2**, **Xcodes**. Great baseline.

---

If you want, I can **append these picks to your CSV** and **tag top recommendations** so you can track adoption per project (WeBond vs Wavelink), plus add “Owner,” “Env,” and “Status” columns.
