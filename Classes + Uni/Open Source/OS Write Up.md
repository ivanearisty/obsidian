# iae225 - TA Assignment Write Up

## Assignment Summary

### Summary
Welcome to your first major assignment in Open Source & Professional Software Development. Your team's mission is to create a **template repository** for a modern Python project. This repository will serve as the foundation for all subsequent project work in this course.

This assignment is not just about writing code; it is about establishing the **structure, processes, and tooling** that enable sustainable, high-quality software development. You will build a small, multi-component system, but the primary deliverables are the repository structure, the CI/CD pipeline, and the clear separation of concerns.

The task is to create two core components: a **Mail Client API** and a **Gmail Implementation** for that API, demonstrating the principles of dependency injection discussed in class.

**Working code isn't enough**. Your goal is to create systems that are not only functional today but are also understandable, adaptable, and a source of productivity—not frustration—for the developers who will inherit them tomorrow. This is a practical, industry-forged approach that values clarity, modularity, and disciplined collaboration as the essential ingredients for building software that lasts...
### Learning Goals
- **Master the Toolchain:** Gain proficiency with uv for environment and dependency management, ruff for linting and formatting, mypy for static type checking, and pytest for testing (see below for some starter guides on the tools you will be using).
- **Implement Component-Based Architecture:** Structure your code into distinct, reusable components with clearly defined interfaces and implementations.
- **Understand and Apply Dependency Injection:** Decouple components by defining abstract interfaces and injecting concrete implementations at runtime.
- **Embrace Test-Driven Development:** Write unit tests for your interfaces before the implementation exists, using mocks to validate the contract.
- **Build a CI/CD Pipeline:** Configure CircleCI to automatically enforce code quality, run tests, and report on code coverage, creating a safety net for all future development.
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

## Requirements

Your team will create a single GitHub repository that serves as a template for a Python-based AI-powered email client.

**Part 1: Repository & Tooling Setup**

1.  **Repository Structure:**
    *   Create a root `src` directory. All components will live inside this directory.
    *   Create a root `tests` directory. Integration and End-to-End tests will live here.
    *   Create a `.github/` directory for issue and pull request templates.
2.  **Configuration (`pyproject.toml`):**
    *   At the root of the repo, create a `pyproject.toml`.
    *   Configure it as a `uv` workspace, declaring each of your components in the `[tool.uv.workspace.members]` section. (Note: this is not the only way to handle ___ in uv. )
    *   Add and configure `ruff`, `mypy`, `pytest`, and `coverage.py` in the `[tool.*]` sections. **Enable all `ruff` rules (`select = ["ALL"]`) and `mypy`'s `strict` mode.** You must explicitly `ignore` rules you disagree with and provide a comment in the `pyproject.toml` file explaining why.
3.  **Documentation:**
    *   **Root `README.md`:** A comprehensive guide on how to clone, set up, test, and use the template. Include sections for each tool.
    *   **`component.md`:** A file in the root directory that defines what a "component" is in your project, its required file structure (e.g., `pyproject.toml`, `src/`, `tests/`), and the dependency injection pattern you are using.

**Part 2: Component Creation**

You will create two main components for the Mail Client.

1.  **The Mail Interface (`src/mail_client_api`)**
    *   This is a Python package. It must have its own `pyproject.toml`.
    *   It should contain a `message_api.py` and a `client_api.py` (or similar) defining the following as `typing.Protocol`:
        *   `Message`: A protocol with read-only properties like `id: str`, `subject: str`, `sender: str`, `body: str`.
        *   `MailClient`: A protocol with methods like `get_messages() -> Iterator[Message]`.
    *   It **must not** have any dependencies on Google's libraries.
    *   Include a factory function `get_client() -> MailClient` which raises `NotImplementedError`.

2.  **The Gmail Implementation (`src/mail_client_gmail_impl`)**
    *   This is a separate Python package with its own `pyproject.toml`.
    *   It must depend on the `mail_client_api` as a workspace dependency.
    *   It will contain a `_impl.py` file with a `GmailClient` class that implements the `MailClient` protocol.
    *   In its `__init__.py`, it must **inject** its implementation into the API package by overwriting `mail_client_api.get_client`.

**Part 3: Testing**

1.  **Unit Tests:**
    *   Create unit tests for the `GmailClient` implementation. Use `unittest.mock` to mock the `googleapiclient` so that no real network calls are made.
    *   These tests should live in `src/mail_client_gmail_impl/tests/`.
2.  **Integration Test:**
    *   Create one integration test that validates the dependency injection and real-world authentication.
    *   This test should live in the root `tests/integration/` directory.
    *   It should call `mail_client_api.get_client()` and assert that it receives a functioning `GmailClient` instance capable of connecting to Gmail.
    *   This test will be marked with `@pytest.mark.integration` and will be skipped in the main CI test run.

**Part 4: Continuous Integration (CircleCI)**

*   Create a `.circleci/config.yml` that defines a workflow to:
    1.  Install dependencies using `uv sync`.
    2.  Run `ruff` and `mypy` checks.
    3.  Run the **unit tests** with `pytest` and `coverage`.
    4.  Generate and store both test results and a coverage report (e.g., XML or HTML) as artifacts.
    5.  Enforce a minimum of **80%** test coverage.

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