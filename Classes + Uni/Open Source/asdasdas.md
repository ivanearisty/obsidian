Of course. Based on the provided context, I have refactored and organized your draft into a comprehensive assignment document. This version aims to be declarative, clear, and strongly aligned with the professor's philosophy of building robust, maintainable software. It emphasizes the "why" behind the "how" and sets a professional tone from the start.

Here is the proposed assignment write-up:

***

## OPSD Spring 2025: Homework 1 - The Professional Python Project Template

### 1. Summary

Welcome to your first major assignment in Open Source & Professional Software Development. Your team's mission is to create a professional-grade **template repository** for a modern Python project. This is not a throwaway exercise; the repository you build will serve as the foundation for all subsequent project work in this course.

This assignment focuses on establishing the **structure, processes, and tooling** that enable sustainable, high-quality software development. You will build a small, multi-component system, but the primary deliverables are the *repository structure*, the *CI/CD pipeline*, and a *clear separation of concerns*.

The task is to create the foundational components for an AI-powered email assistant: a **Mail Client Interface** and a **Gmail Implementation** for that interface, demonstrating the principles of dependency injection discussed in class.

### 2. Learning Goals

*   **Master the Toolchain:** Gain proficiency with `uv` for environment/dependency management, `ruff` for linting/formatting, `mypy` for static type checking, and `pytest` for testing.
*   **Implement Component-Based Architecture:** Structure your code into distinct, reusable components (Python packages) with clearly defined interfaces and implementations.
*   **Understand and Apply Dependency Injection:** Decouple components by defining abstract interfaces (`Protocol`) and injecting concrete implementations at runtime.
*   **Embrace Test-Driven Development:** Write comprehensive unit tests for an interface *before* it has a real implementation, using mocks to validate its contract.
*   **Build a CI/CD Pipeline:** Configure CircleCI to automatically enforce code quality, run tests, and report on code coverage, creating a safety net for all future development.
*   **Practice Professional Documentation:** Learn to write clear `README.md` and `component.md` files that make your project understandable and usable by others.

### 3. Best Practices and General Guidelines

In this course, we treat software development as "programming integrated over time." The greatest challenge isn't writing code that works *now*, but managing the **complexity** that makes code difficult to change *later*. This assignment is your first exercise in **strategic**, not tactical, programming.

*   **Interfaces are Contracts:** Your API package (`mail_client_api`) is a promise. It defines *what* a mail client can do. It must remain pure and know nothing of *how* Gmail, Outlook, or any other service works. This decoupling is non-negotiable.
*   **Pull Complexity Downwards:** The implementation (`mail_client_gmail_impl`) bears the burden of complexity. All the messy details of authentication, API calls, and data parsing belong there, hidden behind the simple interface.
*   **Small, Focused Pull Requests:** As you build this, practice creating small, self-contained pull requests. A PR to add a test should not also refactor the build system. This discipline makes code reviews effective and reduces risk.
*   **Automate Everything:** Your CI pipeline is your quality enforcer. It is not optional. It ensures that no code that breaks tests, fails linting, or reduces coverage can be merged. This removes human error and debate from the process.

### 4. Deliverables

Your final submission will be a single GitHub repository configured as a **Project Template**. This repository must be self-contained and ready for a new developer to clone and begin working immediately.

#### **Repository & Project Structure**

The repository must be professionally structured and include the following:

- **Git Configuration:**
    - A clean, well-documented pull request that merges all work from a feature branch into the `root` commit of your repository.
    - A `.gitignore` file properly configured for a Python project, excluding virtual environments, IDE files, and sensitive credentials (`token.json`, `.env`).
- **Standardized Templates:**
    - In a `.github/` directory:
        - A `pull_request_template.md` that guides contributors.
        - Issue templates for both `bug_report` and `feature_request`.
- **Licensing:**
    - An `LICENSE` file containing a standard open-source license (e.g., MIT, Apache 2.0).

#### **Documentation**

Documentation is a primary design tool. The repository must include:

- **Root `README.md`:** A comprehensive guide detailing:
    - The project's purpose.
    - Setup instructions (e.g., `uv sync`).
    - Commands for running linters, formatters, tests, and coverage reports.
- **`component.md`:** A design document in the root directory that defines:
    - The concept of a "component" in this architecture.
    - The required file structure for any new component.
    - An explanation of the dependency injection pattern used to connect interfaces and implementations.
- **Component `README.md` Files:** Each component package (e.g., `src/calculator`, `src/logger`) must have its own `README.md` file that explains its specific purpose, API, and usage.

#### **Component Implementation**

The template must include two distinct, functional components demonstrating a clean interface/implementation separation.

- **Mail Interface Component (`src/mail_client_api`):**
    - A self-contained Python package with its own `pyproject.toml` and `README.md`.
    - Defines abstract `Message` and `MailClient` `Protocol` classes.
    - Contains a `get_client()` factory function that raises `NotImplementedError`.
    - **This package must have no dependencies on any concrete mail provider library.**
- **Gmail Implementation Component (`src/mail_client_gmail_impl`):**
    - A separate Python package with its own `pyproject.toml` and `README.md`.
    - Depends on `mail_client_api` as a workspace dependency.
    - Provides a concrete `GmailClient` class that implements the `MailClient` protocol.
    - **Performs dependency injection:** Its `__init__.py` must overwrite the factory function in `mail_client_api` to provide the concrete `GmailClient` instance.

#### **Testing & Quality Assurance**

A robust testing suite is mandatory to validate the design and implementation.

- **Unit Tests:**
    - Located within each component's `tests/` directory (e.g., `src/mail_client_gmail_impl/tests/`).
    - Tests for the `GmailClient` must use mocks to isolate it from the live Google API.
- **Integration Test:**
    - Located in the root `tests/integration/` directory.
    - Must validate the dependency injection mechanism by using `mail_client_api.get_client()` and receiving a `GmailClient` instance.
    - Must include at least one test that makes a real, authenticated call to the Gmail API (marked with `@pytest.mark.integration`).
- **End-to-End (E2E) Test:**
    - In the root `tests/e2e/` directory, provide one test that simulates the full application flow: performing a calculation, logging the action, and triggering a notification.

#### **Continuous Integration (CI/CD)**

The repository must contain a working `.circleci/config.yml` file that defines a complete, automated CI/CD pipeline.

- **Required Checks:** The pipeline must include separate, clearly defined jobs for:
    1.  **Linting & Formatting:** `ruff check` and `ruff format --check`.
    2.  **Static Type Analysis:** `mypy src tests --strict`.
    3.  **Unit Testing & Coverage:** `pytest -m "not integration"`.
- **Quality Gates:** The build **must fail** if any check fails or if code coverage is below **80%**.
- **Reporting:**
    - Test results must be parsed and displayed in the CircleCI **"Tests"** tab.
    - The code coverage report must be uploaded as a browsable **artifact** (e.g., HTML report).
    - **Links to successful/failed CircleCI builds and the coverage report must be included in your final PR description.**

---

### Tooling & Best Practices Guide

This guide provides a starting point for the tools required in this assignment. The expectation is that you will explore their documentation to solve specific problems.

| Category             | Tool          | Purpose                                                                 |
| -------------------- | ------------- | ----------------------------------------------------------------------- |
| Environment/Package  | `uv`          | An extremely fast, all-in-one tool for Python packaging and resolution. |
| Linting/Formatting   | `ruff`        | A comprehensive and fast linter and formatter.                          |
| Static Type Checking | `mypy`        | Enforces type hints, catching errors before runtime.                    |
| Testing              | `pytest`      | A powerful and flexible testing framework.                              |
| Test Coverage        | `coverage.py` | Measures which lines of your code are executed by tests.                |
- **Continuous Integration** | `CircleCI`                              | Automates your build, test, and quality-check pipeline.              |
- **Documentation**      | `mkdocs` (Optional Extra Credit)        | A static site generator for creating project documentation.          |

#### Key Tooling Concepts

-   **`uv` Workspace:** Use `uv init --workspace` to create a monorepo structure. A single `uv.lock` file in the root will manage dependencies for all components, ensuring consistent and reproducible environments for everyone on your team. This is the modern replacement for managing multiple `requirements.txt` and `venv`s.
-   **Strict Checks:** We start with `ruff` and `mypy` on他们的 most restrictive settings (`select = ["ALL"]`, `strict = true`). This forces a high standard of quality. Your job is to understand the errors and either fix the code or consciously disable a rule with a clear justification. This is a design decision, not a chore.
-   **Isolating Tests:** Use `pytest` markers (`@pytest.mark.integration`) to separate fast-running unit tests from slower integration tests that may require network access or secrets. Your primary CI job should only run unit tests to provide fast feedback.
Excellent. This is a great clarification. The goal is to provide a concise, practical guide within the assignment itself, not just a link to external docs. This reinforces the idea that the tooling is integral to the development philosophy.

Here is the revised "Tooling & Best Practices Guide" section, designed to be dropped into the assignment document. It's brief, declarative, and directly tied to the course's core principles.

***

### Tooling & Best Practices Guide

This project requires a specific set of modern, professional tools. Their purpose is not to create busywork, but to build a foundation for high-quality, maintainable software. Using them correctly is a core part of the assignment.

#### **`uv` - The Project and Package Manager**

*   **What It Is:** An extremely fast, all-in-one tool for managing Python virtual environments and project dependencies.
*   **Why We Use It:** `uv` replaces the need for separate tools like `pip` and `venv`. Its **workspace** feature is essential for our component-based architecture, allowing us to manage multiple local packages (`calculator`, `logger`) from a single `uv.lock` file. This guarantees that every team member has an identical, reproducible development environment.
*   **Key Commands:**
    *   `uv init --workspace`: Use this **once** to bootstrap your repository.
    *   `uv sync`: The primary command to install/update all dependencies from `uv.lock`.
    *   `uv run <command>`: Executes a command (like `pytest` or `ruff`) within the project's managed environment.

#### **`ruff` - The Linter and Formatter**

*   **What It Is:** An integrated tool for enforcing code style and detecting common programming errors.
*   **Why We Use It:** `ruff` automates quality control. By configuring it in `pyproject.toml` with `select = ["ALL"]`, we adopt a high standard by default. Disabling a rule becomes a conscious design decision that **must be justified with a comment**. This prevents style debates in code reviews and keeps the codebase consistent and predictable.
*   **Key Commands:**
    *   `uv run ruff check .`: Analyzes code for errors and style violations.
    *   `uv run ruff format .`: Automatically formats code to the project's standard.

#### **`mypy` - The Static Type Checker**

*   **What It Is:** A tool that enforces Python's type hints.
*   **Why We Use It:** Type safety is not optional. `mypy` helps us build robust interfaces and catches an entire class of bugs before the code is ever run. We use `strict = true` to ensure all parts of our component contracts are explicit and well-defined.
*   **Key Commands:**
    *   `uv run mypy .`: Runs a full type check on the codebase.

#### **`pytest` & `coverage.py` - The Testing Framework**

*   **What It Is:** `pytest` is the framework for writing and running our tests. `coverage.py` measures which lines of code our tests execute.
*   **Why We Use It:** Tests are the only way to verify behavior and refactor with confidence. We will structure our tests into three distinct types:
    1.  **Unit Tests:** Test a single class or function in isolation (using mocks).
    2.  **Integration Tests:** Test how two or more components work together.
    3.  **End-to-End Tests:** Test the complete application workflow from a user's perspective.
*   **Key Commands & Configuration:**
    *   Tests will be organized into `unit`, `integration`, and `e2e` categories.
    *   Use `pytest` markers (e.g., `@pytest.mark.integration`) to run specific test suites.
    *   Run tests with coverage: `uv run pytest --cov=src`

#### **`CircleCI` - The Continuous Integration Pipeline**

*   **What It Is:** An automated service that runs our quality checks for every code change.
*   **Why We Use It:** The CI pipeline is the ultimate, impartial gatekeeper. It protects the `main` branch by ensuring no code is merged unless it is formatted correctly, passes all type checks, and meets the required test coverage. It turns our quality standards from guidelines into enforceable rules.
*   **Key Configuration:**
    *   Define jobs in `.circleci/config.yml` for `lint`, `mypy`, and `test`.
    *   Use `store_test_results` to make test failures easy to debug in the UI.
    *   Use `store_artifacts` to save and link to your HTML coverage report.
    *   **The pipeline must be configured to fail the build if coverage is below 80%.**