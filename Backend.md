
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

## Adding graph features

- **Leveraging Graph**:
    - You can keep your relational design but store edges/nodes in the AGE graph for advanced queries.
    - No immediate changes are needed in your schema for that; you’d simply create a “wbcore_graph” (or similar) and insert nodes/edges in parallel.
- **Future Enhancements**:
    - Possibly normalize membership plan details.
    - Add triggers or application logic to keep the graph in sync.
    - Add indexes or advanced constraints as you refine your data model.
- **Graph Insert (Apache AGE):**
    
    - Immediately after, run a small “sync” step that issues a `cypher(...)` query to create a corresponding edge in your AGE graph. For example:
        
        `SELECT * FROM cypher('wbcore_graph', $$   MATCH (u1:User {user_id: $userId1}), (u2:User {user_id: $userId2})   CREATE (u1)-[:BOND {status:'ACTIVE'}]->(u2) $$) AS (edge agtype);`
        
- **Transaction or Background Job:**
    
    - **Same Transaction**: If you want strong consistency, you can do both inserts within a single transaction in your application logic. If the relational insert succeeds but the graph insert fails, you can roll back so you don’t end up with data mismatches.
    - **Background Job**: Alternatively, you can push “bond created” events to a queue (like Kafka) or maintain a job that periodically syncs new/updated bonds into the graph. This is more decoupled but can lead to short-term inconsistencies if the job is asynchronous.

## Mockito

1. - Mockito is a **mocking framework** for Java. It helps create mock objects so you can **isolate** the class under test from its real dependencies. This is useful when you want to test logic without hitting an actual database, external service, or complicated code in another class.
2. **Why Use Mocks**
    
    - **Isolation**: Test a single class without depending on real implementations of repositories, services, or APIs.
    - **Determinism**: You can control what the mocked method returns (stubbing), ensuring consistent test results.
    - **Verification**: Check how many times a method was called, what arguments were passed, etc.
3. **Typical Usage**
    
    java
    
    Copy
    
```java
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class MyServiceTest {

    @Mock
    private MyRepository myRepository;

    @InjectMocks
    private MyService myService; // The class under test

    @Test
    void testSomethingWithMock() {
        MockitoAnnotations.openMocks(this);

        // Stub the repository
        when(myRepository.findSomething()).thenReturn("mocked value");

        // Now call the service method
        String result = myService.doWork();

        // Verify the result
        assertEquals("processed: mocked value", result);

        // Check repository interactions
        verify(myRepository).findSomething();
    }
}
```
    
    
- **`@Mock`**: Tells Mockito to create a mock instance of `MyRepository`.
- **`@InjectMocks`**: Tells Mockito to inject the mock `MyRepository` into the `myService` instance.
- **`when(...).thenReturn(...)`**: Stub a method call so it returns a specific value.
- **`verify(...)`**: Check that the method was called, possibly with certain arguments.