### Project Review Checklist

#### **1. Architecture & Design (“Forklift Test”)**

* [ ] **`src` layout:** All installable packages live under `src/`.
* [ ] **Clear componentization:** Interfaces/ports and implementations are split (e.g., `ticket_service_api` vs. `jira_ticket_service_impl`; `ticket` vs. `jira_ticket_models_impl`).
* [ ] **Interface purity:** Protocol/port packages have **zero dependencies** on frameworks or concrete SDKs (no FastAPI/Pydantic/Jira SDK in ports).
* [ ] **Dependency injection:** Implementation packages properly register/override factories in the API/port package.
* [ ] **Single Responsibility:** Each component does one thing (ports define contracts; implementations talk to external systems; DTOs define data shape).

#### **2. Domain Modeling & API Design (Ports/Adapters)**

* [ ] **Ports define system behavior, not DTOs:** Business actions belong on the **Ticket Tracker port** (e.g., `reassign`, `transition`, `search`), not on the `Ticket` DTO.
* [ ] **DTOs are data-only:** Domain `Ticket` is a *record type* (prefer `@dataclass(frozen=True)`) with **no side effects** or business methods.
* [ ] **Framework-agnostic domain:** Use **dataclasses** in domain/ports; use **Pydantic only at edges** (HTTP/adapters) for validation/serialization.
* [ ] **Explicit operations over generic updates:** Prefer explicit methods (`reassign(ticket_id, user_id)`, `transition(ticket_id, to_status)`) vs. dumping everything into `update_ticket(**fields)` unless both are justified.
* [ ] **Error modeling:** Ports should raise typed errors (e.g., `TicketNotFound`, `PermissionDenied`) instead of returning `None` for control flow.
* [ ] **Async API consistency:** If adapters are async (e.g., HTTP), ports are `async` and consistently awaited throughout.
* [ ] **Invariants & workflow:** Workflow/permission checks are enforced in **service/port/adapters**, not encoded as field tweaks on DTOs.

#### **3. Adapters & Integration**

* [ ] **Clean mapping:** Adapters (e.g., `JiraTicketService`) map each port method 1:1 to external API calls and translate external errors to domain exceptions.
* [ ] **Edge DTOs:** FastAPI schemas use **Pydantic** for request/response validation; map to/from domain dataclasses cleanly.
* [ ] **No leakage:** External concerns (auth tokens, HTTP clients, SDK types) do **not** leak into domain/port packages.
* [ ] **Idempotency & retries:** Adapter behavior for retries, rate limits, and idempotency is documented and (where needed) implemented.

#### **4. Tooling & Configuration (`pyproject.toml`)**

* [ ] **`uv` workspace:** Root `pyproject.toml` is a workspace; all `src/*` members listed.
* [ ] **Centralized configs:** `ruff`, `mypy`, `pytest`, coverage in root `pyproject.toml`.
* [ ] **Ruff strictness:** `select = ["ALL"]`; any `ignore` entries are justified with comments.
* [ ] **Mypy strictness:** `strict = true` with narrow, documented exceptions.
* [ ] **Deps hygiene:** Dev deps under `[project.optional-dependencies]`; runtime deps minimal per package.

#### **5. Testing Strategy (“Testing Pyramid”)**

* [ ] **Unit tests (per component):**
  * Live under each component’s `tests/`.
  * Use `unittest.mock`/fakes for external services (no network).
  * Verify ports raise proper domain exceptions; DTOs remain behavior-free.
* [ ] **Integration tests (top-level `tests/integration/`):**
  * Validate DI wiring: calling the abstract factory returns the concrete adapter.
  * Exercise a real adapter path against a sandbox or recorded responses (or 1 live call when required), asserting domain mapping and error translation.
* [ ] **E2E tests (top-level `tests/e2e/`):**
  * Run the app entry point as a subprocess; black-box assertions on user-visible behavior.
* [ ] **Coverage:** Threshold defined in `pyproject.toml`; rationale documented.

#### **6. Documentation (“Docs as a Product”)**

* [ ] **Root `README.md`:** Purpose, architecture, ports/adapters philosophy, setup/auth, how to run toolchain.
* [ ] **Component READMEs:** Each `src/*` package documents its API, dependencies, and role (port vs. adapter vs. DTOs).
* [ ] **Architecture doc:** A `component.md` (or similar) describing:
  * **Ports vs. DTOs**: behavior on ports, data-only DTOs.
  * **Framework at the edges**: dataclasses inside, Pydantic at I/O.
  * **Error modeling** and pagination/search conventions.
  * **Adapter mapping** (e.g., Jira specifics).
* [ ] **MkDocs site:** `mkdocs.yml` present; `mkdocs serve` renders a clean site.

#### **7. Repository & Professionalism (Git Hygiene)**

* [ ] **`.gitignore`:** Ignores `.venv`, `__pycache__`, `*.pyc`, credentials (`credentials.json`, `token.json`), `.env`, build artifacts.
* [ ] **GitHub templates:** PR and Issue templates exist and are informative.
* [ ] **Commit quality:** Clean, imperative messages; no “wip” noise; logical, small commits.
* [ ] **CI/CD:** `.circleci/config.yml` (or equivalent) runs lint (`ruff`), types (`mypy`), unit tests, and reports coverage.
