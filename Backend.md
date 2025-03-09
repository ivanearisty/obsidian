
## TODO
- Add Passkey for login with the users face and shi
- We need a predictable way to define locations both for an actual address and general location. General location can be city and state or some other combination of supported sites; however, address should be verified with an external API like google places.
## Technologies

| Need                            | Tool                                                                           | Checklist |
| ------------------------------- | ------------------------------------------------------------------------------ | --------- |
| Code Formatting                 | Google Java Format                                                             |           |
| Code Coverage                   | JaCoCo                                                                         |           |
| CI/CD Pipeline                  | GitHub Actions, Jenkins, or GitLab CI                                          |           |
| API Documentation               | Springdoc OpenAPI / Swagger                                                    |           |
| Post Alpha:Monitoring & Logging | Prometheus & Grafana (monitoring); ELK/EFK Stack (logging and log aggregation) |           |
| Cloud Deployment                | Kubernetes                                                                     |           |
| Mobile Build Management         | Fastlane                                                                       |           |
| Compiler/Interpreter            | Java 23+ (OpenJDK)                                                             | ✅         |
| Dependency Manager              | Maven                                                                          | ✅         |
| Static Analysis Tool            | SpotBugs                                                                       | ✅         |
| Containerization                | Docker                                                                         | ✅         |
| Database                        | PostgreSQL enhanced with Apache AGE                                            | ✅         |
| Environment Management          | Spring Boot Profiles & RN config                                               | ✅         |
| Testing Framework               | JUnit 5 (with Mockito for mocks)                                               | ✅--       |
| DB Connection                   | Hibernate/JPA                                                                  |           |
| Auth                            |                                                                                |           |

## Java Format Google

https://google.github.io/styleguide/javaguide.html

## SpotBugs
https://spotbugs.github.io/spotbugs-maven-plugin/

## JDBC AGE driver

Build jar from https://github.com/apache/age/tree/master/drivers/jdbc

add jar to libs and create dependency...

# Authentication

The [`Authentication`](https://docs.spring.io/spring-security/reference/api/java/org/springframework/security/core/Authentication.html) interface serves two main purposes within Spring Security:

- An input to [`AuthenticationManager`](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-authenticationmanager) to provide the credentials a user has provided to authenticate. When used in this scenario, `isAuthenticated()` returns `false`.
    
- Represent the currently authenticated user. You can obtain the current `Authentication` from the [SecurityContext](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontext).
    

The `Authentication` contains:

- `principal`: Identifies the user. When authenticating with a username/password this is often an instance of [`UserDetails`](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/user-details.html#servlet-authentication-userdetails).
    
- `credentials`: Often a password. In many cases, this is cleared after the user is authenticated, to ensure that it is not leaked.
    
- `authorities`: The [`GrantedAuthority`](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-granted-authority) instances are high-level permissions the user is granted. Two examples are roles and scopes.

# build tricks
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

# Adding graph features

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

# Mockito

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


# JPA

Using JPA (and especially Spring Data JPA) means you can dramatically reduce the amount of boilerplate code needed for common CRUD operations and queries. With your current plain JDBC repository implementation, you’re manually writing SQL strings, mapping results with row mappers, managing parameters, and handling exceptions—all of which JPA and Spring Data JPA abstract away.

---

## How It Changes with JPA

### 1. Defining an Entity

Instead of defining a domain object and then writing SQL to insert, update, or select it, you annotate your class as an entity. For example:

```java
import jakarta.persistence.*;

@Entity
@Table(name = "user_account", schema = "wbcore")
public class UserAccount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;
    
    @Column(name = "display_name")
    private String displayName;
    
    @Column(unique = true)
    private String email;
    
    // standard getters and setters
}
```

### 2. Creating a Repository Interface

You then define a repository interface that extends one of Spring Data JPA’s repository interfaces, such as `JpaRepository`. For example:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByPhoneNumber(String phoneNumber);
    Optional<UserAccount> findByEmail(String email);
}
```

Spring Data JPA automatically provides implementations for methods like `save()`, `findById()`, `findAll()`, and even your custom query methods (like `findByPhoneNumber()`).

### 3. Benefits in Boilerplate Reduction

- **No Manual SQL:**  
    You don’t have to write SQL queries for common operations. The framework generates them based on your entity mappings and method names.
    
- **Automatic Mapping:**  
    JPA handles the mapping between your Java objects and database rows. You no longer need to write custom row mappers or set parameters manually.
    
- **Transaction Management:**  
    Spring Data JPA integrates with Spring’s transaction management, reducing the need to manage connection lifecycles or handle transaction boundaries explicitly.
    
- **Consistent Exception Translation:**  
    JPA translates SQL exceptions into a consistent hierarchy of Spring’s `DataAccessException`, which simplifies error handling.
    
- **Query Derivation:**  
    You can define methods in your repository interface and let Spring Data JPA generate queries automatically based on method names (e.g., `findByEmail()`).
    

---

## Comparing to Your JDBC Repository

### Plain JDBC Repository (Example Excerpt)

```java
@Override
public User create(User user) {
    // Manual SQL and parameter mapping
    KeyHolder holder = new GeneratedKeyHolder();
    SqlParameterSource parameters = getSqlParameterSource(user);
    jdbc.update(INSERT_USER_QUERY, parameters, holder);
    user.setId(requireNonNull(holder.getKey()).longValue());
    // Additional logic...
    return user;
}
```

### With JPA Repository

```java
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> { }
```

Then in your service layer, creating a user is as simple as:

```java
@Service
public class UserService {
    
    private final UserAccountRepository userRepo;

    public UserService(UserAccountRepository userRepo) {
        this.userRepo = userRepo;
    }
    
    public UserAccount createUser(UserAccount user) {
        return userRepo.save(user);
    }
}
```

Notice how the repository layer now is just an interface with no implementation to write—the framework does the heavy lifting.

---

## Summary

- **Repository Layer Still Exists:**  
    Even with JPA, you maintain a repository layer—but instead of manually coding CRUD operations with SQL and JDBC, you define interfaces that extend `JpaRepository` or similar. Spring Data JPA then generates the implementation at runtime.
    
- **Reduced Boilerplate:**  
    JPA eliminates the need for manual SQL queries, parameter setting, result mapping, and much of the error handling, making your code more concise and easier to maintain.
    
- **Best Practices:**  
    Defining your domain as JPA entities and using Spring Data repositories is widely considered best practice for enterprise applications and significantly simplifies development.
    

This approach not only reduces boilerplate code but also helps maintain a clear separation of concerns between your business logic and persistence layer.

While JPA (and Spring Data JPA) works great for many applications, there are scenarios where it can become a limitation. Here are some common situations where JPA might not be enough and strategies to address them:

---

### 1. Performance-Critical or Complex Queries

- **Scenario:**  
    When you need highly optimized queries or very complex joins, subqueries, and aggregations, JPA’s generated SQL might not be optimal or even feasible.
- **What to Do:**
    - **Native Queries:** Use the `@Query(nativeQuery = true)` annotation to write raw SQL queries that leverage database-specific optimizations.
    - **Stored Procedures:** For complex operations, consider using stored procedures that can run more efficiently on the database side.
    - **Query DSLs:** Tools like **QueryDSL** or **JOOQ** can provide a more type-safe and flexible way to construct complex queries.

---

### 2. Bulk Operations

- **Scenario:**  
    JPA’s entity management (caching, dirty checking) can make bulk operations slow or memory-intensive because it loads and manages entities in the persistence context.
- **What to Do:**
    - **Bulk Updates/Deletes:** Use JPQL bulk operations (e.g., `UPDATE ...` or `DELETE ...`) which bypass the persistence context.
    - **JDBC Template:** For very large batch operations, consider using Spring’s `JdbcTemplate` to execute batch inserts/updates directly, then clear or detach entities from the persistence context if necessary.

---

### 3. Advanced Database Features or Custom Data Models

- **Scenario:**  
    When you need to use advanced features of your database (such as custom data types, graph queries, full-text search, or non-relational structures) that don’t map well to the JPA model.
- **What to Do:**
    - **Native SQL or Custom Repositories:** Write custom repository implementations that use JDBC or a lower-level API to access these features directly.
    - **Hybrid Approach:** Use JPA for standard CRUD and rely on a separate data access strategy (like Spring Data JDBC or a specialized library) for advanced operations.

---

### 4. Microservices & Non-Relational Stores

- **Scenario:**  
    If parts of your system require eventual consistency or a more flexible data model (e.g., documents, graphs, key-value pairs), JPA’s relational focus might not be a natural fit.
- **What to Do:**
    - **Alternative Persistence Technologies:** Use NoSQL databases (like MongoDB or Cassandra) with their own Spring Data modules.
    - **Polyglot Persistence:** Combine JPA for transactional data with another data store optimized for the specific use case (for example, Apache AGE for graph queries).

---

### 5. Fine-Grained Control Over SQL Generation

- **Scenario:**  
    When you need complete control over the SQL generated, such as for auditing, logging, or custom performance tuning, JPA’s abstraction might hide important details.
- **What to Do:**
    - **Custom Query Implementations:** Write your own repository methods using native queries or a lightweight framework like Spring Data JDBC.
    - **Monitor and Optimize:** Use tools like Hibernate’s statistics and logging to see the generated SQL, and then optimize it by rewriting critical queries as native SQL.

---

### Summary

JPA excels at abstracting away boilerplate CRUD operations and managing the persistence lifecycle of entities, which can boost productivity and maintainability. However, when your application demands:

- **High-performance complex queries,**
- **Efficient bulk processing,**
- **Advanced or non-standard database features,**
- **A non-relational data model,** or
- **Full control over SQL generation,**

… it may be necessary to complement or replace some JPA functionality with native SQL, custom repositories, or even different data access frameworks.

A common strategy is to use JPA for the majority of day-to-day operations and then selectively drop down to lower-level solutions for the parts where JPA’s abstractions become a bottleneck. This hybrid approach lets you enjoy JPA’s benefits while still having the flexibility to optimize where it really matters.