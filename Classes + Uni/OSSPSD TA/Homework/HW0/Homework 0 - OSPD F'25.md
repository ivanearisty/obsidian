### Assignment 0: Course Setup & Team Formation

#### Objective

Welcome to Open Source & Professional Software Development!

The objective of this "Homework 0" is to get you and your team set up for success for the rest of the semester. This involves three simple steps: forming a team, setting up your project repository, and ensuring your local development environment is working correctly.

As we discussed in our first lecture, this course is highly interactive and collaborative. The "motions" of working together effectively are just as important as the code you write.
#### Form a Team

This course is entirely team-based. You will be working in teams of 3-4 students for your projects.

* Please fill out the **[Team Formation Google Form]()** before our next class (September 17).
* You can either register a pre-formed team or sign up as an individual looking for a team. We will help place individuals into teams.
* Finalized team lists will be announced via Slack the following day.

#### Set Up Your Team Repository

Once your team is formed, one member should act as the initial repository owner.

1.  **Choose a Starter Repository:** Your team should select one of the TA's assignment submissions to use as a starting template. These are excellent, working examples of the component-based architecture we will be building upon.
	* [**TA Repo 1 (Ivan)**](https://github.com/ivanearisty/oss-taapp/pull/1)
	* [**TA Repo 2 (Adithya)**](https://docs.google.com/spreadsheets/d/1fCkgSQU0nAMvZkH1UHVCjWAc2bzL1MwPNzgpBkZ2KZU/edit?gid=0#gid=0)
2.  **Fork or Clone the Repository:** Create a new repository under one of your team member's GitHub accounts by forking or cloning the chosen template.
3.  **Add Collaborators:** Add all other team members (and the TAs: `ivanearisty`, `adithyab-20`, `amoghkr1shna`) as collaborators to your new repository.

#### Verify Your Local Setup

The final step is to ensure every team member can successfully run the project locally. This is a critical check to prevent technical issues in future assignments.

* **For each team member):**
    1.  **Clone** your team's new repository to your local machine.
    2.  **Follow the `README.md`** instructions in the repository to set up the project using `uv`. This will involve:
        *   Running `uv sync --all-packages --dev` (or a similar command) to install all dependencies.
        *   Activating the virtual environment (`source .venv/bin/activate`).
    3.  **Run the Quality Checks:** Verify that you can successfully run the core toolchain commands from the root of the project:
        *   `ruff check .`
        *   `mypy src tests`
        *   `pytest`
    4.  **Run the Application:** Execute the main entry point to ensure the application runs without errors: `python main.py`.

#### Submission

This assignment is about setup and readiness. The deliverable is a confirmation that your team is formed and your environment is working.

*   **Deliverable:**
    1.  One member from each team should submit a single document to Brightspace.
    2.  The document must contain:
        * The names and NYU NetIDs of all team members.
        * A link to your newly created team GitHub repository.
        * A brief confirmation statement that all members have successfully cloned the repository and run the local setup steps (install, lint, test, run).

Good luck, and please don't hesitate to reach out to the TAs on Slack or during office hours if you run into any issues.

#### Miscellaneous — Project Vision

As discussed in class, the project you are embarking on is a component of a much larger, ambitious vision: to build an AI-powered assistant that helps users manage the overwhelming flow of daily information and ensures they "don't drop any balls."

This is not just a theoretical exercise. You are building upon the foundational work of students from previous semesters. Last cohort successfully created the first major component: a modular Gmail client based on a generic mail client interface. The starter repositories you are using are direct results of that effort.

Your work this semester will be to pick up the baton. The immediate goal is to master the existing component-based architecture. Looking ahead, your team and others will adapt and expand this structure to create new "providers" for the AI system, integrating other information streams like Slack, Discord, Outlook, or Apple Mail.

The code you write in this class is a tangible contribution to a complex, evolving, and potentially powerful open-source AI notifier. This assignment is your first step in that exciting journey.