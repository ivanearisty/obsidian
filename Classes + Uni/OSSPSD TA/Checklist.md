The assignment is out of 100 points but there are 110 points to get.
Extra credit is 10 additional points.
### 1. Repository (20pts)
- commit history is kept clean with low # of commits
* [ ] **`.gitignore`:** Ignores `.venv`, `__pycache__`, `*.pyc`, credentials (`credentials.json`, `token.json`), `.env`, build artifacts.
* [ ] **GitHub templates:** PR and Issue templates exist and are informative.
* [ ] **Commit quality:** Clean, imperative messages; no “wip” noise; logical, small commits.

### 2. Peer Review (10 pts)
Team left constructive comments on some other teams PR that show they took care to review their changes.

### 3. CI (10 pts)
* [ ] **CI/CD:** `.circleci/config.yml` (or equivalent) runs lint (`ruff`), types (`mypy`), unit tests, and reports coverage.
* [ ] CI is passing
* [ ] Ci is public and we can see it

### 4. Tooling & Configuration (`pyproject.toml`) 20 pts

* [ ] **`uv` workspace:** Root `pyproject.toml` is a workspace; all `src/*` members listed.
* [ ] **Centralized configs:** `ruff`, `mypy`, `pytest`, coverage in root `pyproject.toml`.
* [ ] **Ruff strictness:** `select = ["ALL"]`; any `ignore` entries are justified with comments.
* [ ] **Mypy strictness:** `strict = true` with narrow, documented exceptions.
* [ ] **Deps hygiene:** Dev deps under `[project.optional-dependencies]`; runtime deps minimal per package.

### 5. Architecture (20 pts)

* [ ] **`src` layout:** All installable packages live under `src/`.
* [ ] **Clear componentization:** Interfaces/ports and implementations are split (e.g., `ticket_service_api` vs. `jira_ticket_service_impl`; `ticket` vs. `jira_ticket_models_impl`).
* [ ] **Interface purity:** Protocol/port packages have **zero dependencies** on frameworks or concrete SDKs (no FastAPI/Pydantic/Jira SDK in ports).
* [ ] **Dependency injection:** Implementation packages properly register/override factories in the API/port package.
* [ ] **Single Responsibility:** Each component does one thing (ports define contracts; implementations talk to external systems; DTOs define data shape).

### 6. Domain Modeling & API Design (10 pts)

* [ ] Business actions belong on the High Level Ports not on the data classes.
* [ ] **DTOs are data-only:** Domain objects are a *record type* (prefer `@dataclass(frozen=True)` or ABCs) 
* [ ] **Framework-agnostic domain:** Use built-ins (dataclass or ABC) in domain/ports; use **Pydantic only at edges** (HTTP/adapters) for validation/serialization.
* [ ] **Error modeling:** Ports should raise typed errors instead of returning `None` for control flow.
* [ ] **Async API consistency:** If adapters are async (e.g., HTTP), ports are `async` and consistently awaited throughout.
* [ ] **Invariants & workflow:** Workflow/permission checks are enforced in **service/port/adapters**, not encoded as field tweaks on DTOs.
* [ ] **No leakage:** External concerns (auth tokens, HTTP clients, SDK types) do **not** leak into domain/port packages.
* [ ] **Idempotency & retries:** Adapter behavior for retries, rate limits, and idempotency is documented and (where needed) implemented.


### 7. Testing Strategy (“Testing Pyramid”) 10 pts

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

### 8. Documentation (10 pts)

* [ ] **Root `README.md`:** Purpose, architecture, ports/adapters philosophy, setup/auth, how to run toolchain.
* [ ] **Component READMEs:** Each `src/*` package documents its API, dependencies, and role.
* [ ] **Architecture doc:** A `component.md` (or similar) describing what a component is.
* [ ] **MkDocs site:** `mkdocs.yml` present; `mkdocs serve` renders a clean site.


