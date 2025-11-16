The assignment is out of 100 points but there are 110 points you can get (so you have some leniency)

### 1. Repository (20pts)
- \[ 8 pts ] Bad Hygiene:
	- Commit history is scattered and non-linear. 
	- Way too many branches with no clean up.
	- PR is from a feature branch to hw2 instead of hw2 -> hw1. Hard to find real changes.
### 2. Peer Review (10 pts)
### 3. CI (10 pts)
* \[ 2 pts ] **CI is passing**
### 4. Tooling & Configuration `pyproject.toml` (20 pts)
* \[ 3 pts ] **Deps hygiene:** Dev deps under `[project.optional-dependencies]`; runtime deps minimal per package; 
* \[ 2 pts ] **Mypy strictness:** Ignoring Internal Project Modules defeats a primary purpose of using a type checker in a multi-package project.
### 5. Architecture (20 pts)
### 6. Domain Modeling & API Design (8 pts)
### 7. Testing Strategy (“Testing Pyramid”) 12 pts

Both integration and E2E tests rely on mocks that prevent them from testing what they are supposed to.
* \[ 3 pts ] **Integration tests (top-level `tests/integration/`):**
* \[ 3 pts ] **E2E tests (top-level `tests/e2e/`):**
* \[ 1 pt ] **Coverage:** Threshold is extremely low.
### 8. Documentation (10 pts)

88/100