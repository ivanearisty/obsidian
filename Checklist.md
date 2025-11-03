### Project Review Checklist
#### **1. Architecture and Design (`The "Forklift Test")**

*   [ ] **`src` Layout:** Is all source code for installable packages located inside the `src/` directory?
*   [ ] **Componentization:** Are the interface and implementation correctly separated into distinct packages (e.g., `mail_client_api` vs. `gmail_client_impl`, `message` vs. `gmail_message_impl`)?
*   [ ] **Interface Purity:** Do the protocol packages (`mail_client_api`, `message`) have **zero dependencies** on any concrete implementation or external libraries like `google-api-python-client`?
*   [ ] **Dependency Injection:** Is the dependency injection mechanism implemented correctly? Check that the `__init__.py` of the implementation packages (e.g., `gmail_client_impl`) correctly overrides the factory functions from the protocol packages.
*   [ ] **Single Responsibility:** Does each component have a clear and single purpose? (e.g., `message` only defines the message structure, `gmail_client_impl` only handles Gmail API communication).

#### **2. Tooling and Configuration (`pyproject.toml`)**

*   [ ] **`uv` Workspace:** Is the root `pyproject.toml` correctly configured as a `uv` workspace, listing all `src` components as members?
*   [ ] **Centralized Configuration:** Are all tool configurations (`ruff`, `mypy`, `pytest`, `coverage`) located in the **root** `pyproject.toml`?
*   [ ] **Strictness (`ruff`):** Is `ruff` configured with `select = ["ALL"]`? Are any ignored rules in the `ignore` list justified with a comment explaining why?
*   [ ] **Strictness (`mypy`):** Is `mypy` configured with `strict = true`?
*   [ ] **Dependency Management:** Are development dependencies (`pytest`, `ruff`, `mkdocs`) correctly listed under `[project.optional-dependencies]`?

#### **3. Testing Strategy (`The Testing Pyramid`)**

*   [ ] **Unit Tests:**
    *   Are they located inside each component's own `tests/` directory (e.g., `src/gmail_client_impl/tests/`)?
    *   Are they fully isolated? Do they use `unittest.mock` to patch out external services (like the Google API) and other components?
    *   Are they fast and reliable?
*   [ ] **Integration Tests:**
    *   Are they located in the top-level `tests/integration/` directory?
    *   Does at least one test verify that dependency injection works by calling the abstract factory (`mail_client_api.get_client()`) and asserting it receives the concrete implementation?
    *   Does at least one test make a **real, authenticated call** to the live Gmail API to prove the connection works?
*   [ ] **End-to-End (E2E) Tests:**
    *   Are they located in the top-level `tests/e2e/` directory?
    *   Does at least one test run the application's main entry point (`main.py`) as a subprocess, treating the whole system as a black box?
*   [ ] **Test Coverage:** Is a coverage threshold set in `pyproject.toml`? Is there a justification for the chosen percentage?

#### **4. Documentation (`Docs as a Product`)**

*   [ ] **Root `README.md`:** Is it comprehensive? Does it explain the project's purpose, architecture, and provide clear, step-by-step instructions for setup, authentication, and running the toolchain?
*   [ ] **Component `README.md`s:** Does **every** component in `src/` have its own `README.md` explaining its specific purpose, API, and dependencies?
*   [ ] **Architectural Document:** Is there a `component.md` (or similar) that explains the high-level architectural philosophy (dependency injection, forklift test, etc.)?
*   [ ] **MkDocs Site:** Is there a working `mkdocs.yml`? Does `mkdocs serve` produce a clean, navigable documentation website?

#### **5. Repository and Professionalism (`Git Hygiene`)**

*   [ ] **`.gitignore`:** Is it correctly configured? Does it ignore `.venv`, `__pycache__`, `*.pyc`, `credentials.json`, `token.json`, and `.env` files?
*   [ ] **GitHub Templates:** Are there templates for Pull Requests (`.github/pull_request_template.md`) and Issues (`.github/ISSUE_TEMPLATE/`)?
*   [ ] **Git History:** Is the commit history clean and professional, with clear, imperative messages (e.g., "Feat: Add authentication logic to Gmail client" instead of "wip")?
*   [ ] **CI/CD Configuration:** Is there a `.circleci/config.yml` file? Does it automate the core quality checks: linting (`ruff`), type checking (`mypy`), and running the unit tests?