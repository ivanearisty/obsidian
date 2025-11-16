The assignment is out of 100 points but there are 110 points you can get (so you have some leniency)

### 1. Repository (20pts)
- \[ 3 pts ] commit history is kept clean with low # of commits
* \[ 2 pts ] **Commit quality:** Clean, imperative messages; no “wip” noise; logical, small commits.
### 2. Peer Review (10 pts)
### 3. CI (10 pts)
### 4. Tooling & Configuration `pyproject.toml` (20 pts)
* \[ 3 pts ] **Ruff strictness:** `select = ["ALL"]`
* \[ 3 pts ] **Mypy strictness:** `strict = true` with narrow, documented exceptions.
	* Although strict = true is set, several key packages (gemini_impl, gemini_service, gemini_adapter) are entirely excluded from type checking in the root pyproject.toml. While excluding the auto-generated client and its direct adapter is understandable, excluding the core implementation and service layers undermines the goal of strict, repository-wide type safety.
* \[ 1 pts ] **Deps hygiene:** Main package and runtime deps minimal per package.
### 5. Architecture (20 pts)
Flag, not points removed: All installable packages are correctly located under the src/ directory. However, the presence of a top-level src/app.py and src/test_app.py violates the principle that all source code should belong to a component package.

* \[ 3 pts ] **Dependency injection:** gemini_service endpoints abandon the dependency injection pattern by instantiating user-specific clients (create_user_client) directly within the endpoint logic. This breaks the core principle of decoupling the service layer from the concrete implementation, making it difficult to swap backends without modifying the service code.
### 6. Domain Modeling & API Design (8 pts)
### 7. Testing Strategy (“Testing Pyramid”) 12 pts`
### 8. Documentation (10 pts)
* \[ 2 pts ] **MkDocs site:** mkdocs not updated

93/100