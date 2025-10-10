Based on the provided codebase, here is a guide on how to connect to the MCP server over HTTP and deploy it to a cloud service.

### Connecting to the MCP Server over HTTP

You can run the `mongodb-mcp-server` as an HTTP server, which is useful for remote connections or interacting with it from web-based clients. The default transport method is `stdio`, but you can switch to HTTP using command-line arguments.

**Security Warning:** Running the server with HTTP transport is not recommended for production environments without implementing proper security measures like authentication and encryption (HTTPS/TLS). You should deploy it behind a firewall or within a private network and never expose it directly to the internet.

#### **Starting the Server in HTTP Mode**

To start the server with the HTTP transport, use the `--transport http` command-line argument.

```shell
npx -y mongodb-mcp-server@latest --transport http
```

By default, the server will listen on `http://127.0.0.1:3000`.

#### **Customizing Host and Port**

You can customize the host and port using the `--httpHost` and `--httpPort` options, or their corresponding environment variables.

*   `--httpHost` or `MDB_MCP_HTTP_HOST`: The host to bind the HTTP server to. The default is `127.0.0.1`.
*   `--httpPort` or `MDB_MCP_HTTP_PORT`: The port number for the HTTP server. The default is `3000`.

**Example:**

To run the server on all available network interfaces on port `8080`, use the following command:

```shell
npx -y mongodb-mcp-server@latest --transport http --httpHost=0.0.0.0 --httpPort=8080
```

Once the server is running, any MCP client that supports HTTP transport can connect to it by pointing to the server's address (e.g., `http://0.0.0.0:8080`).

### Deploying the MCP Server to a Cloud Service

The most straightforward way to deploy the `mongodb-mcp-server` to a cloud service is by using a Docker container. The project includes a `Dockerfile` that simplifies this process.

Here is a general guide to deploying the server to a cloud service like Google Cloud Run, AWS App Runner, or Azure Container Apps.

#### **Step 1: Build the Docker Image**

First, you need to build a Docker image from the provided `Dockerfile`. This file defines the steps to create an image with the `mongodb-mcp-server` installed and configured.

The `Dockerfile` performs the following actions:
*   Uses a lightweight Node.js base image (`node:22-alpine`).
*   Installs the `mongodb-mcp-server` from npm.
*   Sets up a non-root user for better security.
*   Sets the default entry point to `mongodb-mcp-server`.

To build the image, run the following command from the root of the project:

```shell
docker build -t mongodb-mcp-server .```

#### **Step 2: Configure the Server via Environment Variables**

The server is configured using environment variables, which you will pass to the container when you run it. The server will not start unless it is configured with either a MongoDB connection string or Atlas API credentials.

**Key Configuration Variables:**

*   **For MongoDB Connection String:**
    *   `MDB_MCP_CONNECTION_STRING`: Your MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/`).
*   **For Atlas API Access:**
    *   `MDB_MCP_API_CLIENT_ID`: Your Atlas API Client ID.
    *   `MDB_MCP_API_CLIENT_SECRET`: Your Atlas API Client Secret.
*   **To Enable Write Operations:**
    *   By default, the server runs in read-only mode for safety. To enable write operations, you can set `MDB_MCP_READ_ONLY="false"` or simply not set the variable.

The `Dockerfile` also sets a default logger configuration `MDB_MCP_LOGGERS=stderr,mcp`, which is suitable for containerized environments as it outputs logs to standard error.

#### **Step 3: Push the Image to a Container Registry**

After building the image, you need to push it to a container registry so your cloud provider can access it. Examples include Docker Hub, Google Container Registry (GCR), Amazon Elastic Container Registry (ECR), or Azure Container Registry (ACR).

**Example (using Google Container Registry):**

1.  **Tag the image:**
    ```shell
    docker tag mongodb-mcp-server gcr.io/your-gcp-project-id/mongodb-mcp-server
    ```
2.  **Authenticate with the registry:**
    ```shell
    gcloud auth configure-docker
    ```
3.  **Push the image:**
    ```shell
    docker push gcr.io/your-gcp-project-id/mongodb-mcp-server
    ```

#### **Step 4: Deploy to a Cloud Service**

Now you can deploy the container image to your chosen cloud service. You will need to configure the service to use the image you just pushed and provide the necessary environment variables for configuration.

**Example (using Google Cloud Run):**

Use the `gcloud run deploy` command to deploy the container. You'll need to set the environment variables for the connection string and specify the port. The server defaults to HTTP on port `3000`.

```shell
gcloud run deploy mongodb-mcp-server \
  --image gcr.io/your-gcp-project-id/mongodb-mcp-server \
  --platform managed \
  --region your-region \
  --allow-unauthenticated \
  --set-env-vars="MDB_MCP_CONNECTION_STRING=your-connection-string" \
  --set-env-vars="MDB_MCP_TRANSPORT=http" \
  --set-env-vars="MDB_MCP_HTTP_HOST=0.0.0.0" \
  --port 3000
```

*   `--image`: Specifies the container image to deploy.
*   `--set-env-vars`: Sets the environment variables needed to configure the server. You would use `MDB_MCP_API_CLIENT_ID` and `MDB_MCP_API_CLIENT_SECRET` instead of `MDB_MCP_CONNECTION_STRING` if you are using Atlas API credentials.
*   `--port`: Exposes the port that the server listens on inside the container (default is 3000).
*   `--allow-unauthenticated`: **For demonstration purposes only.** In a production environment, you should set up authentication.

Once deployed, the cloud service will provide you with a public URL that you can use to connect your MCP clients.