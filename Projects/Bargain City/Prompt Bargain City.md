Here is my [[Personal Stack]]

# Technology Stack & Skillset

## **I. Programming Languages**

This is the foundational layer, comprising the core languages used to write application logic.

| Language | Description | Common Use Case |
| :--- | :--- | :--- |
| **TypeScript (TS)** | A statically typed superset of JavaScript that compiles to plain JavaScript. It adds type safety to large-scale JS projects, improving code quality and maintainability. | Building complex frontend applications (with React/Angular), backend services (with Node.js), and full-stack applications with frameworks like tRPC. |
| **Python** | A high-level, interpreted programming language known for its clear syntax and extensive standard library. It's versatile and widely used in many domains. | Backend web development (Django, FastAPI), data science, machine learning, scripting, and automation. |
| **Java** | A class-based, object-oriented, and high-performance language designed to have as few implementation dependencies as possible. It's known for its stability and scalability ("write once, run anywhere"). | Building enterprise-scale backend systems, microservices (with Spring Boot), Android mobile applications, and large-scale distributed systems. |
| **C++** | A high-performance, general-purpose programming language that provides low-level memory manipulation. It's an extension of the C language. | Systems programming, game development, high-frequency trading, and performance-critical applications where direct hardware access is needed. |
| **Rust** | A systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without needing a garbage collector. | Building command-line tools, web servers, and performance-critical services where reliability and safety are paramount. |
| **HTML/CSS** | The standard markup and styling languages for creating web pages and user interfaces. HTML provides the structure, and CSS handles the visual presentation. | The fundamental building blocks for all websites and web applications. |

## **II. Frontend Development**

Tools, frameworks, and libraries for building the client-side of an application.

| Tool/Framework     | Description                                                                                                                                                                         | Common Use Case                                                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **React**          | A JavaScript library for building user interfaces, particularly single-page applications (SPAs). It uses a component-based architecture.                                            | Creating dynamic, interactive, and complex user interfaces for the web.                                                                    |
| **React Native**   | A framework based on React for building native mobile applications for iOS and Android using a single JavaScript/TypeScript codebase.                                               | Developing cross-platform mobile apps with a look and feel that is native to each platform.                                                |
| **Next.js**        | A popular React framework that enables features like server-side rendering (SSR) and static site generation (SSG), providing performance and SEO benefits.                          | Building production-ready, performant, and scalable React applications, from marketing sites to complex web apps.                          |
| **Redux**          | A predictable state container for JavaScript apps. It helps you manage global application state in a centralized "store".                                                           | Managing complex state that is shared across many components in a large-scale application, such as user sessions or application-wide data. |
| **TanStack Query** | A data-fetching and caching library. It simplifies fetching, caching, synchronizing, and updating server state in your applications.                                                | Managing server state, including caching, background refetching, and optimistic updates to create a smoother user experience.              |
| **Tailwind CSS**   | A utility-first CSS framework for rapidly building custom user interfaces directly in your HTML/JSX, without writing custom CSS files.                                              | Quickly styling web components with a consistent design system. Often used with React, Vue, and other frameworks.                          |
| **Radix UI**       | A library of unstyled, accessible, low-level UI primitives for React. It provides the building blocks (e.g., dropdowns, dialogs) without dictating the style.                       | Creating a completely custom, accessible design system from scratch without having to build core component logic.                          |
| **shadcn/ui**      | A collection of beautifully designed, reusable UI components built using Radix UI and Tailwind CSS. It is not a component library but rather components you can copy into your app. | Quickly adding styled and accessible components (like buttons, cards, forms) to a React/Next.js application.                               |
| **daisyUI**        | A plugin for Tailwind CSS that provides a set of pre-styled component classes (e.g., `.btn`, `.card`) to speed up development.                                                      | Adding semantic component classes to Tailwind CSS projects for faster development, similar to frameworks like Bootstrap.                   |

## **III. Backend Development**

Frameworks and technologies for building server-side logic, APIs, and business rules.

| Tool/Framework      | Description                                                                                                                                                               | Common Use Case                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Spring Boot**     | A Java-based framework that makes it easy to create stand-alone, production-grade Spring-based applications. It simplifies the setup and development of backend services. | Building robust, scalable REST APIs and microservices in the Java ecosystem.                                                            |
| **Spring Security** | A powerful and highly customizable authentication and access-control framework within the Spring ecosystem.                                                               | Securing Spring-based applications by handling authentication (who are you?) and authorization (what can you do?).                      |
| **Django**          | A high-level Python web framework that encourages rapid development and clean, pragmatic design. It's "batteries-included," offering an ORM, admin panel, and more.       | Building full-featured, data-driven web applications and APIs quickly and securely.                                                     |
| **FastAPI**         | A modern, high-performance Python web framework for building APIs. It is known for its speed, automatic interactive documentation (Swagger UI), and type hints.           | Developing fast, efficient, and well-documented RESTful APIs with Python.                                                               |
| **tRPC**            | A framework for building end-to-end typesafe APIs with TypeScript, without schemas or code generation. It allows you to share types between your client and server.       | Creating APIs for full-stack TypeScript applications (e.g., Next.js + Node.js) where type safety across the entire stack is a priority. |
| **gRPC**            | A high-performance, open-source universal RPC (Remote Procedure Call) framework developed by Google. It uses Protocol Buffers for serializing structured data.            | High-performance communication between microservices in a polyglot environment (services written in different languages).               |

## **IV. Databases, Caching & Data Platforms**

Systems for storing, managing, caching, and retrieving data.

| Tool/Platform   | Category          | Description                                                                                                                                        | Common Use Case                                                                                                                           |
| :-------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **MySQL**       | Relational (SQL)  | A popular open-source relational database management system (RDBMS) that uses Structured Query Language (SQL).                                     | Storing structured data for web applications, e-commerce platforms, and any application requiring transactions and data integrity.        |
| **MongoDB**     | NoSQL (Document)  | A source-available, document-oriented database program. It uses JSON-like documents with optional schemas.                                         | Storing unstructured or semi-structured data, content management systems, and applications requiring high scalability and flexibility.    |
| **Redis**       | In-Memory / Cache | An open-source, in-memory data structure store, used as a database, cache, and message broker for low-latency applications.                        | Caching frequently accessed data to speed up applications, managing user sessions, and implementing real-time features like leaderboards. |
| **Prisma**      | ORM (TS/JS)       | A next-generation ORM for Node.js and TypeScript that makes database access easy with an auto-generated and type-safe query builder.               | Simplifying database interactions in TypeScript/JavaScript backends, providing type safety and autocompletion for queries.                |
| **Drizzle ORM** | ORM (TS/JS)       | A lightweight, SQL-like TypeScript ORM that focuses on performance and type safety without the overhead of traditional ORMs.                       | Writing type-safe SQL queries in TypeScript for developers who prefer writing SQL but want the benefits of type-checking.                 |
| **SQLAlchemy**  | ORM (Python)      | A powerful and widely used SQL toolkit and Object-Relational Mapper for Python, providing a full suite of persistence patterns.                    | Connecting Python applications to relational databases, from simple queries to complex domain models.                                     |
| **Firebase**    | BaaS              | A Backend-as-a-Service platform by Google. It provides a suite of tools including a NoSQL database (Firestore), authentication, hosting, and more. | Rapidly developing web and mobile applications, MVPs, and real-time applications without building a custom backend.                       |
| **Supabase**    | BaaS              | An open-source alternative to Firebase. It provides a PostgreSQL database, authentication, storage, and auto-generated APIs.                       | Building applications with a robust, scalable SQL backend while leveraging the convenience of a BaaS platform.                            |
| **Convex**      | BaaS              | A modern, real-time backend platform that provides a reactive database with built-in TypeScript functions for server-side logic.                   | Building real-time, collaborative applications where data consistency and reactivity between clients are critical.                        |

## **V. Cloud, Hosting & DevOps**

Tools for deploying, managing, and maintaining applications and infrastructure.

| Tool/Platform      | Category         | Description                                                                                                                                              | Common Use Case                                                                                                                                    |
| :----------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS**            | Cloud Provider   | Amazon Web Services is a comprehensive and broadly adopted cloud platform offering over 200 fully featured services from data centers globally.          | Hosting scalable infrastructure for any application, using services like EC2 (compute), S3 (storage), and RDS (managed databases).                 |
| **GCP**            | Cloud Provider   | Google Cloud Platform is a suite of cloud computing services that runs on the same infrastructure that Google uses internally.                           | Hosting applications with a strong focus on data analytics, machine learning (BigQuery, AI Platform), and container orchestration (GKE).           |
| **Vercel**         | Hosting/PaaS     | A cloud platform for static sites and serverless functions, optimized for frontend frameworks like Next.js (which they created).                         | Deploying modern Jamstack websites and full-stack React/Next.js applications with a focus on developer experience and performance.                 |
| **DigitalOcean**   | Cloud Provider   | A cloud infrastructure provider known for its simplicity, developer-friendly interface, and straightforward pricing.                                     | Hosting virtual private servers (Droplets), managed databases, and Kubernetes for startups and individual developers.                              |
| **Cloudflare**     | Edge Platform    | A global network that provides content delivery (CDN), security (WAF, DDoS mitigation), and serverless compute (Workers) at the edge.                    | Improving website performance and security, and running serverless functions close to the user for low latency.                                    |
| **Docker**         | Containerization | A platform for developing, shipping, and running applications in isolated environments called containers.                                                | Packaging applications and their dependencies to ensure they run consistently across different development and production environments.            |
| **GitHub Actions** | CI/CD            | An automation platform integrated into GitHub that allows you to build, test, and deploy your code directly from your repository.                        | Automating software workflows, such as running tests on every push and deploying to production after a merge.                                      |
| **Git & GitHub**   | Version Control  | Git is a distributed version control system for tracking changes in source code. GitHub is a platform for hosting and collaborating on Git repositories. | Managing code history, collaborating with teams on software projects, and automating CI/CD pipelines.                                              |
| **npm / pnpm**     | Package Manager  | Node Package Manager (npm) and Performant npm (pnpm) are tools for managing JavaScript/TypeScript project dependencies.                                  | Installing, updating, and managing third-party libraries in a Node.js project. pnpm is often preferred for its efficiency in disk space and speed. |
| **uv**             | Package Manager  | An extremely fast Python package installer and resolver, written in Rust. It's a modern replacement for tools like `pip` and `pip-tools`.                | Dramatically speeding up the installation and management of Python dependencies in development and CI/CD environments.                             |

## **VI. Services, APIs & Observability**

Third-party services and tools for specialized functionality and monitoring.

| Service/Tool           | Category       | Description                                                                                                                                               | Common Use Case                                                                                                                          |
| :--------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Stripe**             | Payments       | A suite of payment APIs that powers commerce for online businesses of all sizes.                                                                          | Integrating credit card processing, subscriptions, and other payment solutions into web and mobile applications.                         |
| **Clerk**              | Authentication | A complete user management and authentication service. It provides pre-built UI components and APIs for sign-in, sign-up, and user profiles.              | Quickly adding secure and feature-rich user authentication (including social logins) to an application without building it from scratch. |
| **Auth.js / NextAuth** | Authentication | An open-source authentication library for Next.js and modern web applications. It's highly configurable and supports many providers (OAuth, email, etc.). | Implementing custom, flexible authentication flows in a Next.js or other modern JavaScript application.                                  |
| **OpenAuth**           | Authentication | A standards-based, self-hostable OAuth 2.0 provider, allowing you to own and control your authentication server.                                          | Building a custom, self-hosted authentication solution when control over the auth infrastructure is a requirement.                       |
| **PostHog**            | Analytics      | An open-source product analytics platform. It allows you to track user behavior, conduct A/B tests, and analyze funnels and retention.                    | Understanding how users interact with your application to make data-driven decisions about product development.                          |


## **VII. Design, Testing & Methodologies**

Tools, concepts, and principles that guide the software development lifecycle.

| Concept/Tool             | Category          | Description                                                                                                                                                            | Common Use Case                                                                                                                               |
| :----------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Figma**                | Design Tool       | A collaborative, web-based interface design tool used for creating user interfaces, prototypes, and design systems.                                                    | Designing and prototyping the UI/UX of an application and facilitating collaboration between designers and developers.                        |
| **OpenAPI**              | API Specification | A standard, language-agnostic specification for describing RESTful APIs. It allows both humans and computers to discover and understand the capabilities of a service. | Defining a clear contract for an API, which can be used to generate documentation, server stubs, and client SDKs automatically.               |
| **Mock Service Worker**  | API Mocking       | An API mocking library that uses the Service Worker API to intercept and mock network requests on the client side.                                                     | Mocking API responses in development and testing environments to build and test the frontend without a live backend.                          |
| **Zod**                  | Schema Validation | A TypeScript-first schema declaration and validation library. It helps define data structures and validate them with type safety.                                      | Ensuring data integrity at runtime by validating API inputs, form data, and environment variables, while inferring static TypeScript types.   |
| **Domain-Driven Design** | Methodology       | An approach to software development that focuses on modeling the software to match a specific business domain.                                                         | Designing complex software systems where the business logic is intricate, ensuring the code is a direct reflection of business rules.         |
| **Microservices**        | Architecture      | An architectural style that structures an application as a collection of loosely coupled, independently deployable services.                                           | Building large, complex applications that can be scaled, maintained, and updated more easily by breaking them into smaller, focused services. |
| **REST API**             | Architecture      | REpresentational State Transfer is an architectural style for designing networked applications, often used for web services.                                           | Creating a standardized, stateless, and scalable way for clients (like a frontend) to communicate with a server over HTTP.                    |
| **Agile**                | Methodology       | An iterative approach to project management and software development that helps teams deliver value to their customers faster.                                         | Managing software projects in a flexible way that allows for changing requirements and continuous feedback (e.g., using Scrum or Kanban).     |
| **OrbStack**             | Dev Tool          | A fast, light, and simple replacement for Docker Desktop and local Linux virtual machines on macOS.                                                                    | Running Docker containers and Linux environments locally on a Mac for development with better performance and lower resource usage.           |

I want to build an app for https://bargaincitypr.com/ which takes their current https://bargaincitypr.com/shopper/ endpoint and transforms it into an e-commerce augmented pdf.

https://www.shoprite.com/sm/pickup/rsid/812/circulars https://www.shoprite.com/sm/pickup/rsid/812/circulars?c=week-of-09_14-z5-r5&page=1 

I think it is an extremely elegant solution to and a beautiful skeuomorphism. 

my client https://bargaincitypr.com/ has a similar thing, but it's not clickable https://bargaincitypr.com/shopper/; this shopper thing is just a pdf viewer without the fancy clicking of shoprite. give me an overview of ways I can implement this for them.


![[Pasted image 20251026133955.png]]

![[Pasted image 20251026134001.png]]

What are the different components and services that need to be stood up for it?

