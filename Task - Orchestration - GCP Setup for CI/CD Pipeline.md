---
status: Completed
priority: High
assignees:
  - ivan
tags:
  - task
  - orchestration
  - deployment
  - gcp
  - backend
parentFeature: "[[Epic — Orchestration]]"
related:
  - "[[Dev/Archive/Backend Plan]]"
  - "[[WBB/build-cloud.sh]]"
  - "[[.github/workflows/build-and-push.yaml]]"
blockers: []
dueDate:
---
# Task - GCP Setup for CI/CD Pipeline

## 📖 Overview

This task involved configuring the necessary Google Cloud Platform (GCP) infrastructure to enable a secure, automated CI/CD pipeline from GitHub Actions. The goal is to allow GitHub to build a Docker image of the Spring Boot application and push it to a private Artifact Registry repository without using static secret keys. This was achieved by setting up Workload Identity Federation.

## ✅ What Worked (The Final Solution)

The successful configuration involved four key steps, performed via the `gcloud` command-line tool:

1.  **Create Artifact Registry Repository:** A dedicated, private repository was created to store the application's Docker images.
    *   **Repository Name:** `wbb-prod-repo`
    *   **Location:** `us-central1`

2.  **Create a Dedicated Service Account:** A specific identity (`wbb-prod-builder-sa`) was created for the GitHub Actions workflow to use within GCP.

3.  **Grant IAM Permissions:** The new service account was granted the necessary roles to perform its job:
    *   `Cloud Build Editor`: To run the build process.
    *   `Artifact Registry Writer`: To push the final image to the repository.

4.  **Configure Workload Identity Federation:** This was the most critical and complex part, creating a trust relationship between GCP and GitHub.
    *   Created a Workload Identity Pool (`wbb-github-pool`) to group identity providers.
    *   Created an OIDC Provider (`wbb-github-provider`) that trusts GitHub's token issuer.
    *   **Crucially, this step included both an `attribute-mapping` and a required `attribute-condition` to ensure security.**
    *   Finally, linked the Service Account to a specific GitHub repository (`ivanearisty/WBB`), allowing it to be impersonated by workflows originating only from that repo.

## ❌ What Didn't Work and Why

During the initial setup of Workload Identity Federation, we encountered a persistent `INVALID_ARGUMENT` error when trying to create the OIDC provider.

*   **Initial Attempts:** We tried several variations of the `--attribute-mapping` flag, from simple (`google.subject=assertion.sub`) to more complex ones.
*   **The Root Cause:** The error message "The attribute **condition** must reference one of the provider's claims" was the key. Our initial commands were **missing the `--attribute-condition` flag entirely**. The GCP API requires this flag for security when creating a provider for GitHub, to ensure that you are restricting access to a specific GitHub organization or user (e.g., `ivanearisty`).
*   **The Resolution:** The final, successful command included both the full `--attribute-mapping` and the required `--attribute-condition`.

### The Correct Command that Fixed the Issue:
```bash
gcloud iam workload-identity-pools providers create-oidc wbb-github-provider \
    --project="cs-poc-bfxgyg6b9ugnvbqend3y13n" \
    --location="global" \
    --workload-identity-pool="wbb-github-pool" \
    --display-name="WBB GitHub Actions Provider" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
    --attribute-condition="attribute.repository_owner == 'ivanearisty'"
```

## Commands in Handy 