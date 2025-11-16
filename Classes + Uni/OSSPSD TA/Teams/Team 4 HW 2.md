The assignment is out of 100 points but there are 110 points you can get (so you have some leniency)

### 1. Repository (20pts)
- \[ 4 pts ] commit history is kept clean with low # of commits
- \[ 1 pts ] general hygiene. files are purposeful.
### 2. Peer Review (10 pts)
### 3. CI (10 pts)
* \[ 2 pts ] **CI is passing**
### 4. Tooling & Configuration `pyproject.toml` (20 pts)
* \[ 2 pts ] **Ruff strictness:** ruff not extended in child packages
* \[ 4 pts ] **Mypy strictness:** `strict = true` with narrow, documented exceptions.
### 5. Architecture (20 pts)
* \[ 2 pts ] **Interface purity:** token store should not be known by application
* \[2 pts] \_\_all\_\_  is kept. Unsure whether this was flagged to them so not removing points.
### 6. Domain Modeling & API Design (8 pts)
### 7. Testing Strategy (“Testing Pyramid”) 12 pts
* \[ 2 pts ] **Integration tests (top-level `tests/integration/`):**
	  * You made some unit tests that look like integration tests so you're getting partial credit.
* \[ 1 pts ] **E2E tests (top-level `tests/e2e/`):**
	- While there is no traditional end-to-end test for the Slack functionality that runs the application as a subprocess, the CI pipeline includes a deploy_health_check_200
### 8. Documentation (10 pts)
* \[ 1 pts ] **MkDocs site:** `mkdocs` not updated

90/100