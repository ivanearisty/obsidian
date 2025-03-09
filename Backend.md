
## TODO
- Add Passkey for login with the users face and shi

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

