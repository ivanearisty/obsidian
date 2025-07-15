Of course. This is an excellent task that combines understanding a specific teaching philosophy with technical writing. Based on all the provided context—the syllabus, lecture transcripts, your notes, and your own project work—I will craft an assignment write-up for the TA application.

The goal is to create an assignment that not only tests the students' technical skills but also implicitly and explicitly teaches the core philosophies of the course, as articulated by the professors. It will be structured, clear, and demanding, reflecting the high standards of a professional software engineering environment.

***

### **TA Application: Assignment Write-Up**

**To:** Professor Kamen Yotov, Professor Nikolai Avteniev
**From:** [Your Name]
**Subject:** TA Application - OPSD Assignment 1 Proposal: Building a Python Component Template

Hello Professors,

Here is my submission for the first part of the TA application. This document outlines a proposed first assignment for the Open Source and Professional Software Development course.

The assignment is designed to be a practical, hands-on introduction to the course's core themes. It forces students to immediately engage with professional tooling (`uv`, `ruff`, `mypy`, `CircleCI`), structured project layout, and the crucial concept of separating a component's interface from its implementation using dependency injection—a topic you've both emphasized.

By making the first deliverable a reusable *template* rather than just a one-off script, it aligns with the philosophy of building for the long term and making future work easier. The provided "Tooling and Best Practices Guide" is intended to scaffold the initial learning curve, allowing students to focus on *why* they are using these tools, not just *how*.

I believe this assignment sets the right tone for the semester, emphasizing discipline, thoughtful design, and collaboration from day one.

---

### **Assignment 1: The Professional Python Project Template**

#### **1. Summary**

Welcome to your first major assignment in Open Source & Professional Software Development. Your team's mission is to create a **template repository** for a modern Python project. This repository will serve as the foundation for all subsequent project work in this course.

This assignment is not just about writing code; it is about establishing the **structure, processes, and tooling** that enable sustainable, high-quality software development. You will build a small, multi-component system, but the primary deliverables are the *repository structure*, the *CI/CD pipeline*, and the *clear separation of concerns*.

The task is to create two core components: a **Mail Client API** and a **Gmail Implementation** for that API, demonstrating the principles of dependency injection discussed in class.

#### **2. Learning Goals**

- **Master the Toolchain:** Gain proficiency with `uv` for environment and dependency management, `ruff` for linting and formatting, `mypy` for static type checking, and `pytest` for testing.
- **Implement Component-Based Architecture:** Structure your code into distinct, reusable components (Python packages) with clearly defined interfaces and implementations.
- **Understand and Apply Dependency Injection:** Decouple components by defining abstract interfaces (Protocols) and injecting concrete implementations at runtime.
- **Embrace Test-Driven Development (TDD):** Write unit tests for your interfaces *before* the implementation exists, using mocks to validate the contract.
- **Build a CI/CD Pipeline:** Configure CircleCI to automatically enforce code quality, run tests, and report on code coverage, creating a safety net for all future development.
- **Practice Professional Documentation:** Learn to write clear `README.md` and `component.md` files that make your project understandable and usable by others.

#### **3. The Philosophy: Why We Build This Way**

In this course, we treat software development as "programming integrated over time." The greatest challenge we face is not writing code that works *now*, but managing the **complexity** that makes code difficult to change *later*. This assignment is your first exercise in strategic, not tactical, programming.

-   **Interfaces are Contracts:** Your API package (`mail_client_api`) is a promise. It defines *what* a mail client can do. It must remain pure and know nothing of *how* Gmail, Outlook, or any other service works. This decoupling is non-negotiable.
-   **Pull Complexity Downwards:** The implementation (`mail_client_gmail_impl`) bears the burden of complexity. All the messy details of authentication, API calls, and data parsing belong there, hidden behind the simple interface.
-   **Small, Focused Pull Requests:** As you build this, practice creating small, self-contained pull requests. A PR to add a test should not also refactor the build system. This discipline makes code reviews effective and reduces risk.
-   **Automate Everything:** Your CI pipeline is your quality enforcer. It is not optional. It ensures that no code that breaks tests, fails linting, or reduces coverage can be merged. This removes human error and debate from the process.

#### **4. Requirements**

Your team will create a single GitHub repository that serves as a template for a Python-based AI-powered email assistant.

**Part 1: Repository & Tooling Setup**

1.  **Repository Structure:**
    *   Create a root `src` directory. All components will live inside this directory.
    *   Create a root `tests` directory. Integration and End-to-End tests will live here.
    *   Create a `.github/` directory for issue and pull request templates.
2.  **Configuration (`pyproject.toml`):**
    *   At the root of the repo, create a `pyproject.toml`.
    *   Configure it as a `uv` workspace, declaring each of your components in the `[tool.uv.workspace.members]` section.
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

#### **5. Submission Guidelines**

1.  All work must be done on a development branch (e.g., `feature/hw1-template`).
2.  When you are ready to submit, create a Pull Request (PR) on GitHub.
3.  The **target** branch of the PR must be your repository's initial commit (often named `main` or `root`), not the branch you are working on. This ensures the PR shows *all* changes for a clean review.
4.  Submit the URL of the Pull Request on Brightspace.
5.  Include links in your PR description to a successful CircleCI run, a failed run (e.g., by temporarily breaking a test), and the browsable coverage report artifact.