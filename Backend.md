
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