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
### **Comprehensive Guide: CI/CD with GitHub Actions & Google Cloud Build**

This guide documents the full process of setting up a secure CI/CD pipeline to build a Docker image. It uses GitHub Actions with Workload Identity Federation for passwordless authentication to Google Cloud, submits the build to Cloud Build, and stores the final image in Artifact Registry.

The process is broken down into four main parts:
1.  **Google Cloud Project Setup**: Enabling APIs and creating service accounts.
2.  **Permissions (IAM)**: Granting the correct roles to the service accounts.
3.  **Secure Authentication**: Configuring Workload Identity Federation to allow GitHub Actions to securely authenticate as a service account.
4.  **GitHub Actions Workflow**: Creating the final `.yaml` file that executes the build.

---

### **Part 1: Google Cloud Project Setup**

This section covers the initial setup within your GCP project.

#### **Step 1: Enable Necessary APIs**

Ensure the following APIs are enabled for your project (`cs-poc-bfxgyg6b9ugnvbqend3y13n`). This allows your project to use these services.

```bash
gcloud services enable iam.googleapis.com \
    cloudresourcemanager.googleapis.com \
    iamcredentials.googleapis.com \
    sts.googleapis.com \
    serviceusage.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n
```

#### **Step 2: Create Service Accounts**

We use two distinct service accounts for better security and separation of concerns:

*   **Builder Service Account**: The identity that GitHub Actions assumes. Its only job is to *submit the build* to Cloud Build.
*   **Worker Service Account**: The identity that Cloud Build itself uses to *execute the build steps* (e.g., push to Artifact Registry, write logs).

```bash
# 1. Create the Builder Service Account (for GitHub Actions to use)
gcloud iam service-accounts create wbb-prod-builder-sa \
    --display-name="WBB Production Builder SA" \
    --description="Service account for GitHub Actions to submit WBB prod builds" \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n

# 2. Create the Worker Service Account (for Cloud Build to use)
gcloud iam service-accounts create wbb-prod-worker-sa \
    --display-name="WBB Production Worker SA" \
    --description="Dedicated worker SA for WBB Cloud Builds" \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n
```

#### **Step 3: Create the Artifact Registry Repository**

This is where your final Docker images will be stored.

```bash
gcloud artifacts repositories create wbb-prod-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="WBB Production Docker images" \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n
```

#### **Step 4: Create the Custom GCS Bucket for Logs**

Cloud Build needs a location to store build logs. We create a dedicated bucket for this purpose.

*Important: The bucket name must be globally unique and cannot be a Google-owned domain. Using the project ID as a prefix is a best practice.*

```bash
gcloud storage buckets create gs://cs-poc-bfxgyg6b9ugnvbqend3y13n-cloudbuild-logs \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --location=us-central1
```

---

### **Part 2: Permissions (IAM)**

This is the most critical step for fixing permission-related errors. We assign the necessary roles to the service accounts.

#### **Step 1: Grant Roles to the Builder Service Account**

The `wbb-prod-builder-sa` needs permission to impersonate the worker SA, upload source code to the Cloud Build GCS bucket, and trigger builds.

```bash
# Role to allow submitting builds
gcloud projects add-iam-policy-binding cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --member="serviceAccount:wbb-prod-builder-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.editor"

# Role to upload source code to the default `[PROJECT_ID]_cloudbuild` bucket
gcloud projects add-iam-policy-binding cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --member="serviceAccount:wbb-prod-builder-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"

# Role to act as (impersonate) the worker service account
gcloud iam service-accounts add-iam-policy-binding wbb-prod-worker-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com \
    --member="serviceAccount:wbb-prod-builder-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser" \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n
```

#### **Step 2: Grant Roles to the Worker Service Account**

The `wbb-prod-worker-sa` needs permission to push the final image to Artifact Registry and write logs to our custom GCS bucket.

```bash
# Role to push images to Artifact Registry
gcloud projects add-iam-policy-binding cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --member="serviceAccount:wbb-prod-worker-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

# Role to write logs to the custom log bucket
gcloud projects add-iam-policy-binding cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --member="serviceAccount:wbb-prod-worker-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"
```

---

### **Part 3: Secure Authentication (Workload Identity Federation)**

This setup allows GitHub to securely exchange a token for Google Cloud credentials without using long-lived keys.

#### **Step 1: Create the Workload Identity Pool**

A pool is a container for identity providers.

```bash
gcloud iam workload-identity-pools create wbb-github-pool \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --location="global" \
    --display-name="WBB GitHub Actions Pool"
```

#### **Step 2: Get the Pool ID**

You will need this for the next step.

```bash
gcloud iam workload-identity-pools describe wbb-github-pool \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --location="global" \
    --format="value(name)"
```

#### **Step 3: Create the OIDC Provider for the Pool**

This provider trusts tokens issued by GitHub Actions for a specific repository.

```bash
# Replace YOUR_GITHUB_ORG/YOUR_GITHUB_REPO with your actual repository path
gcloud iam workload-identity-pools providers create-oidc wbb-github-provider \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --location="global" \
    --workload-identity-pool="wbb-github-pool" \
    --display-name="WBB GitHub Actions Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --allowed-audiences="https://iam.googleapis.com/projects/377623296389/locations/global/workloadIdentityPools/wbb-github-pool/providers/wbb-github-provider"
```

#### **Step 4: Link the Builder SA to the GitHub Provider**

This final binding allows the GitHub provider to impersonate the `wbb-prod-builder-sa` service account when a workflow runs in the specified repository.

```bash
# Replace YOUR_GITHUB_ORG/YOUR_GITHUB_REPO
gcloud iam service-accounts add-iam-policy-binding wbb-prod-builder-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com \
    --project=cs-poc-bfxgyg6b9ugnvbqend3y13n \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/377623296389/locations/global/workloadIdentityPools/wbb-github-pool/subject/repo:YOUR_GITHUB_ORG/YOUR_GITHUB_REPO:ref:refs/heads/main"
```

---

### **Part 4: The GitHub Actions Workflow**

Finally, create the `.github/workflows/build-and-push.yaml` file with the correct configuration. Add the Workload Identity Provider name and the Builder Service Account email as secrets in your GitHub repository settings (`secrets.GCP_WIF_PROVIDER` and `secrets.GCP_SA_EMAIL`).

#### **`build-and-push.yaml`**

```yaml
name: Build and Push WBB Docker Image

on:
  push:
    branches:
      - main

env:
  GCP_PROJECT_ID: cs-poc-bfxgyg6b9ugnvbqend3y13n
  IMAGE_REPO_HOST: us-central1-docker.pkg.dev
  ARTIFACT_REPO_NAME: wbb-prod-repo
  IMAGE_NAME: wbb
  # The service account Cloud Build will USE to run the build
  GCP_WORKER_SA_EMAIL: wbb-prod-worker-sa@cs-poc-bfxgyg6b9ugnvbqend3y13n.iam.gserviceaccount.com
  # The custom bucket for storing build logs
  GCP_LOG_BUCKET: gs://cs-poc-bfxgyg6b9ugnvbqend3y13n-cloudbuild-logs/

jobs:
  build-and-push:
    name: Build and Push to Artifact Registry
    runs-on: ubuntu-latest

    permissions:
      contents: 'read'
      id-token: 'write'

    steps:
      - name: Checkout code from repository
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WIF_PROVIDER }} # e.g., projects/123/locations/global/workloadIdentityPools/my-pool/providers/my-provider
          service_account: ${{ secrets.GCP_SA_EMAIL }} # e.g., wbb-prod-builder-sa@...

      - name: Build and Push with Google Cloud Build
        id: build
        run: |
          IMAGE_TAG=${GITHUB_SHA::7}
          FULL_IMAGE_PATH="${IMAGE_REPO_HOST}/${GCP_PROJECT_ID}/${ARTIFACT_REPO_NAME}/${IMAGE_NAME}:${IMAGE_TAG}"
          echo "Building and pushing image: ${FULL_IMAGE_PATH}"
          
          gcloud builds submit \
            --pack image="${FULL_IMAGE_PATH}",builder="paketobuildpacks/builder-jammy-base:latest" \
            --service-account="projects/${GCP_PROJECT_ID}/serviceAccounts/${GCP_WORKER_SA_EMAIL}" \
            --gcs-log-dir="${GCP_LOG_BUCKET}" \
            .
          
          echo "image_path=${FULL_IMAGE_PATH}" >> $GITHUB_OUTPUT

      - name: Summary
        run: echo "Successfully built and pushed image to ${{ steps.build.outputs.image_path }}"
```