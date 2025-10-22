### HW1 Frequently Asked Questions

**Deadlines and Submissions**

*   **When is the final deadline for HW1?**
    The final deadline for HW1 is this Wednesday, October 22nd, at midnight.
*   **When was the first draft due?**
    The first draft was due on Friday at midnight.
*   **How do we submit HW1?**
    You should create a pull request (PR) from your `hw-1` feature branch to your forked repository's `root` branch. Submit the open PR; do not merge or close it. Any further changes pushed to the `hw-1` branch will automatically update the PR.
*   **Should each team member submit a PR or is it one per team?**
    It is one PR per team.
*   **Do we need to submit Team & Individual Updates this week?**
    No, team and individual updates are not due this week but will be due next week.

**Repository and Code**

*   **What should we do with the updates pushed to the TA's main branch?**
    You must pull the new changes from the TA repos into your forked repo. Your `root` branch should mirror the TA's branch. It is recommended to rebase your feature branches on top of the updated `root` branch.
*   **What is the correct process for creating and submitting the homework branch?**
    1.  Branch `hw-1` off of your `root` branch.
    2.  Push your changes to the `hw-1` branch.
    3.  Create a Pull Request from `hw-1` to `root` in your own forked repository.
    4.  Submit the link to this open PR. **Do not merge or close the PR.**
    5.  Continue to push any additional changes to `hw-1`; the PR will update automatically.
    **Do not create a pull request into the TA repositories.**
*   **I'm getting a `NotImplementedError` when running `main.py`. How do I fix this?**
    You need to import the implementation packages at the top of your `main.py` file to trigger dependency injection. For example:
    ```python
    import mail_client_api
    import gmail_client_impl
    ```
*   **Why are my emails not actually being deleted?**
    This was due to the initial repository requesting `gmail.modify` scopes which do not permit deletion. A hotfix was pushed to the `root` branch to request all scopes, which will allow deletion. If you do not want this behavior, you can mock the delete calls.
*   **What should I do if I see new mypy errors after pulling recent changes?**
    A fix to the `pyproject.toml` file was pushed to correct the mypy configuration, enabling it to properly type-check the connections between internal packages. If you see new errors, it means the tool is now working as intended, and you should resolve them.

**Authentication and Testing**

*   **I'm getting an authentication error. How do I fix it?**
    If you're getting an authentication error, you should switch the `interactive` flag to `True` to authenticate via OAuth 2.0 for the first time. This will generate a `token.json`. You can then persist these credentials in a `.env` file and set the `interactive` flag back to `False`. The `interactive` flag must be `False` for CircleCI, as it cannot handle the interactive authentication flow.
*   **How do we structure our end-to-end (e2e) tests, and do they have to run on CI?**
    End-to-end tests should mimic a real user experience with nothing mocked. They must run on CircleCI. Since the interactive authentication flow will not work in CI, your e2e and integration tests should use credentials provided through CircleCI's environment variables.
*   **What if my end-to-end and integration tests don't pass coverage?**
    Do not worry about coverage for e2e and integration tests. Unit tests are the primary drivers for code coverage.
*   **Is coverage needed for auto-generated code?**
    No, you should ignore auto-generated code in the "omits" section of your coverage configuration in the `pyproject.toml` file.
*   **How can I test that my adapter is configured correctly?**
    In the `main.py` file, replace the import of the `gmail_client_impl` component with your adapter. If it is configured correctly, `main.py` should work with your implementation.
