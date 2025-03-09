
## TODO
- Add Passkey for login with the users face and shi
- We need a predictable way to define locations both for an actual address and general location. General location can be city and state or some other combination of supported sites; however, address should be verified with an external API like google places.
## Technologies

| Need                            | Tool                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------ |
| Compiler/Interpreter            | Java 23+ (OpenJDK)                                                             |
| Testing Framework               | JUnit 5 (with Mockito for mocks)                                               |
| Dependency Manager              | Maven                                                                          |
| Code Formatting                 | Google Java Format                                                             |
| Static Analysis Tool            | SpotBugs                                                                       |
| Code Coverage                   | JaCoCo                                                                         |
| Containerization                | Docker                                                                         |
| CI/CD Pipeline                  | GitHub Actions, Jenkins, or GitLab CI                                          |
| API Documentation               | Springdoc OpenAPI / Swagger                                                    |
| Database                        | PostgreSQL enhanced with Apache AGE                                            |
| Post Alpha:Monitoring & Logging | Prometheus & Grafana (monitoring); ELK/EFK Stack (logging and log aggregation) |
| Cloud Deployment                | Kubernetes                                                                     |
| Mobile Build Management         | Fastlane                                                                       |
| Environment Management          | Spring Boot Profiles & RN config                                               |

## Java Format Google

https://google.github.io/styleguide/javaguide.html

## SpotBugs
https://spotbugs.github.io/spotbugs-maven-plugin/

## JDBC AGE driver

Build jar from https://github.com/apache/age/tree/master/drivers/jdbc

add jar to libs and create dependency...

## Authentication

The [`Authentication`](https://docs.spring.io/spring-security/reference/api/java/org/springframework/security/core/Authentication.html) interface serves two main purposes within Spring Security:

- An input to [`AuthenticationManager`](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-authenticationmanager) to provide the credentials a user has provided to authenticate. When used in this scenario, `isAuthenticated()` returns `false`.
    
- Represent the currently authenticated user. You can obtain the current `Authentication` from the [SecurityContext](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontext).
    

The `Authentication` contains:

- `principal`: Identifies the user. When authenticating with a username/password this is often an instance of [`UserDetails`](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/user-details.html#servlet-authentication-userdetails).
    
- `credentials`: Often a password. In many cases, this is cleared after the user is authenticated, to ensure that it is not leaked.
    
- `authorities`: The [`GrantedAuthority`](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-granted-authority) instances are high-level permissions the user is granted. Two examples are roles and scopes.

## build tricks
Yes, you can rebuild only the database container without rebuilding or redeploying the AGE Viewer. There are a couple of approaches:

### 1. Rebuild Only the Database Container

If you're using Docker Compose, you can rebuild and restart just the database service by running:

```bash
docker-compose up -d --no-deps --build db
```

- `--no-deps` tells Compose not to start linked services.
- `--build db` rebuilds only the service named "db".

### 2. Reset Only the Database

If you need to reinitialize the database (for example, to re-run your initialization scripts), you'll need to remove its persistent volume. You can do this without rebuilding AGE Viewer:

```bash
docker-compose down -v --remove-orphans
docker-compose up -d --no-deps db
```

- The `-v` flag removes volumes, so the DB will be reinitialized (be careful as this deletes all current data).

### 3. Use Targeted Docker Commands

If you prefer, you can stop and remove just the db container and its volume manually:

1. Stop and remove the db container:
    
    ```bash
    docker-compose stop db
    docker-compose rm db
    ```
    
2. Remove the specific volume (assuming it's named `pgdata`):
    
    ```bash
    docker volume rm your_project_pgdata
    ```
    
3. Then start just the db service:
    
    ```bash
    docker-compose up -d --no-deps db
    ```
    

### Summary

- **Rebuild only the DB:** Use `docker-compose up -d --no-deps --build db` to rebuild and restart just the database service.
- **Reinitialize DB:** Remove the database volume with `-v` (or manually) to force reinitialization.
- **Leave AGE Viewer alone:** These commands target only the "db" service, so the AGE Viewer container remains unchanged.

This way, you avoid the lengthy build process for AGE Viewer while updating or reinitializing your database as needed.