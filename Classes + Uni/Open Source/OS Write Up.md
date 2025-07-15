# iae225 - TA Assignment Write Up

## Assignment Summary

### Summary
Welcome to your first major assignment in Open Source & Professional Software Development. Your team's mission is to create a repository for a modern Python project. This repository will serve as the foundation for all subsequent project work in this course.

This assignment is not just about writing code; it is about establishing the **structure, processes, and tooling** that enable sustainable, high-quality software development. You will build a small, multi-component system, but the primary deliverables are the repository structure, the CI/CD pipeline, and the clear separation of concerns.

The task is to create two core components: a **Mail Client API** and a **Gmail Implementation** for that API, demonstrating the principles of dependency injection discussed in class.

**Working code isn't enough**. Your goal is to create systems that are not only functional today but are also understandable, adaptable, and a source of productivity—not frustration—for the developers who will inherit them tomorrow. This is a practical, industry-forged approach that values clarity, modularity, and disciplined collaboration as the essential ingredients for building software that lasts...
### Learning Goals
- **Master the Toolchain:** Gain proficiency with uv for environment and dependency management, ruff for linting and formatting, mypy for static type checking, and pytest for testing (see below for some starter guides on the tools you will be using).
- **Implement Component-Based Architecture:** Structure your code into distinct, reusable components with clearly defined interfaces and implementations.
- **Understand and Apply Dependency Injection:** Decouple components by defining abstract interfaces and injecting concrete implementations at runtime.
- **Embrace Test-Driven Development:** Write unit tests for your interfaces before the implementation exists, using mocks to validate the contract.
- **Build a CI/CD Pipeline:** Configure CircleCI to automatically enforce code quality, run tests, and report on code coverage, creating a safety net for future development.
- **Practice Professional Documentation:** Learn to write clear README.md and component.md files that make your project understandable and usable by others.

## Best Practices and General Guidelines
In this course, we treat software development as "programming integrated over time." The greatest challenge we face is not writing code that works now, but managing the **complexity** that makes code difficult to change later. This assignment is your first exercise in **strategic**, *not tactical*, programming.

Our entire framework is designed to arm you with the mindset, architectural patterns, and collaborative processes required to combat this complexity and build sustainable, evolvable systems.

To this end, below are some core principles you should be familiar with from the lectures, but are also provided here for clarity. 

**You should feel comfortable with this before getting to the Requirements section below.** If you are still confused, please do not hesitate to reach out to Professor Kamen, Professor Nikolai, or the TAs :)
### What is a “Component”?
The foundational pillar of this philosophy is the non-negotiable separation of interface and implementation through **deep, abstract components**. Professor Yotov consistently emphasizes that a component’s interface is a sacred contract, one that should be simple, explicit, and entirely decoupled from the "how" of its implementation. This is not merely an academic exercise; it is the key to enabling parallel development, simplifying testing, and allowing parts of a system to be replaced or refactored without causing cascading failures. His insistence on dependency injection, where implementations are "plugged into" abstract protocols, is the practical mechanism for enforcing this separation. By making this a central requirement, he forces students to move beyond writing monolithic scripts and to think in terms of reusable, black-box modules whose value lies in hiding complexity, not just producing an output.

### Regarding Physical Structure

### On Entropy
The second pillar is the establishment of **rigorous, automated processes as guardrails against entropy**. Recognizing that human discipline is fallible under pressure, the professor advocates for a toolchain that automates best practices. The mandatory use of uv for dependency management, ruff for linting, mypy for static analysis, and a comprehensive CI/CD pipeline with CircleCI is not about learning specific tools. It's about instilling a culture where quality is not an afterthought but a prerequisite for every change. The emphasis on high test coverage, distinct unit, integration, and end-to-end tests, and the integration of these checks directly into the development workflow ensures that structural integrity is continuously verified. This transforms quality from a subjective debate into an objective, measurable, and enforceable standard.
### On Teamwork and Collaboration
Finally, Professor Yotov's philosophy is grounded in the reality that software development is a **socio-technical system**. He extends the concept of structured design from code to human interaction. The emphasis on small, self-contained pull requests, detailed PR descriptions, and structured peer review is designed to manage the "cognitive load" of collaboration. By making changes digestible and their intent clear, the process becomes more efficient and less error-prone. His anecdotes about hiring, team dynamics, and the true cost of bad hires underscore a critical lesson: the most elegant code is worthless if the team building and maintaining it is dysfunctional. The structure of the class, with its emphasis on teamwork, peer feedback, and clear communication in weekly updates, is a direct simulation of the professional environment he seeks to prepare students for—one where success is defined not just by what you build, but by how you build it with others.

## Deliverables

Your final submission will be a single GitHub repository configured as a **Project Template**. This repository must be self-contained and ready for a new developer to clone and begin working immediately.

### Repository & Tooling Setup

- **Git Configuration:**
  - A clean, well-documented pull request that merges all work from a feature branch into the `root` commit of your repository.
  - A `.gitignore` file properly configured for a Python project, excluding virtual environments, IDE files, and sensitive credentials (`token.json`, `.env`).
- **Standardized Templates:**
	In a `.github/` directory:
	- A `pull_request_template.md` that guides contributors.
	- Issue templates for both `bug_report` and `feature_request`.
- **Repository Structure:**
    * Create a root `src` directory. All components will live inside this directory.
    * Create a root `tests` directory. Integration and End-to-End tests will live here.
    * Create a `.github/` directory for issue and pull request templates.
*   **Root `pyproject.toml`:**
    * Initialized as a `uv` workspace.
    * **Workspace Members:** The `[tool.uv.workspace]` section must declare all component packages (e.g., `src/mail_client_api`).
    * **Tool Configuration:** All tool configurations (`ruff`, `mypy`, `pytest`, `coverage.py`) must be in this file.
        * **Ruff:** `select = ["ALL"]`. *All disabled rules must be justified with a comment.*
        * **MyPy:** `strict = true`.
        * **Coverage:**
### Documentation

Documentation is a primary design tool. The repository must include:

*   **Root `README.md`:** A comprehensive guide detailing the template's purpose, setup (`uv sync`), and usage of all integrated tools.
*   **`component.md`:** A design document in the root directory explaining the component architecture and the dependency injection strategy.
*   **Component `README.md` files:** Each component package must have its own `README.md` describing its specific API, purpose, and usage.

### Component Creation
The repository must contain the following components, demonstrating a clear separation of interface and implementation.

#### Mail Interface Component (`src/mail_client_api`)
- A self-contained Python package with its own `pyproject.toml` and `README.md`.
- Defines abstract `Message` and `MailClient` `Protocol` classes.
- NOTE: **This package must have no dependencies on any concrete mail provider library.**

#### Gmail Implementation Component (`src/mail_client_gmail_impl`):
- A self-contained Python package with its own `pyproject.toml` and `README.md`.
- Depends on `mail_client_api` as a workspace dependency.
- Provides a concrete `GmailClient` class that implements the `MailClient` protocol.
- **Performs dependency injection.**

### Testing
1.  **Unit Tests:**
    * Located within each component's `tests/` directory (e.g., `src/mail_client_gmail_impl/tests/`).
    * Tests for the `GmailClient` must use mocks to isolate it from the live Google API.
2.  **Integration Test:**
    * Located in the root `tests/integration/` directory.
    * Must validate the dependency injection mechanism by using `mail_client_api.get_client()` and receiving a `GmailClient` instance.
    * Must include at least one test that makes a real, authenticated call to the Gmail API (marked with `@pytest.mark.integration`). (You might want to ignore this test in CircleCI)

### CI/CD
The repository must have a working `.circleci/config.yml` pipeline that automates quality control.

*   **Automated Jobs:** The pipeline must execute jobs for linting (`ruff`), static analysis (`mypy`), and unit testing (`pytest`).
*   **Quality Gates:** The build **must fail** if any check fails or if code coverage is below a certain % threshold which *you must justify*.
*   **Reporting:**
    *   Test results must be parsed and displayed in the CircleCI **"Tests"** tab.
    *   The coverage report must be uploaded as a browsable **artifact**.
    *   **Links to successful/failed CircleCI builds and the coverage report must be included in your pull request description.**

## Tooling Guides (Python)

| Programming Language | Python        | C/C++       |
| -------------------- | ------------- | ----------- |
| Compiler/Interpreter | CPython       | Clang       |
| Testing Framework    | Pytest        | Google Test |
| Dependency Manager   | uv            | vcpkg       |
| Code Formatting      | ruff          | ClangFormat |
| Static Analysis Tool | mypy and ruff | ClangTidy   |
| Code Coverage        | coverage.py   | gcov        |

### uv
VERY IMPORTANT SEE
https://docs.astral.sh/uv/guides/projects/#project-structure

### ruff 

### mypy

### mkdocs 

### circleci

## Further Reading