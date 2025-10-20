# Homework 2

## Intro

Well, congrats! By now you should've successfully implemented an adapter for a gmail service.

As a reminder, this class is focused on the motions of professional and open source software development, rather than particular implementations.

By now, you should have a very good idea of what it takes to build a component like we described.

You need a good interface api that serves as a contract of what your package can do.
an implementation of that contract that could wrap a public api 
a fastapi service that makes your endpoints discoverable
a way to autogenerate a client like the openapi-python-client package
and then an adapter of that client so that you can use your service logic just as you wood the interface api locally.

Insert Mermaid chart
## Remarks and increased expectations

We wanted to mention a few things that we saw that should not be in your hw2, we'll be a bit lenient in some of these but yeah:

commits and prs: you should read the slides we released on the student portal about how to do pr's for this class. some prs had many many many commits and this is not easy for us or a reviewer to see what happened.

in hw2 we want you to have more meaningful commmits, this does not mean that you should just commit 2-3 times while working, but you should have a main hw2 branch and then you should make changes to hw-2 feature branches that are then squash merged into the hw2 branch when a very significant body of work is completed

for example, you could have 30 commits on the feature branch around setting up the interface, writing tests, and then developing the library component, but then all these 30 commits can be squashed into just 1 commit in the hw2 branch.

we wont mark you down this time but yeah

other big nonos are:
- pushing directly to root.
- not rebasing changes TAs make (this ends up making the TAs commits look as part of your homework, which is not good) 

mypy and ruff: 
some of you were not respecting mypy or ruff.
mypy errors should not just be ingnored willy nilly, and they indicate that something is wrong with your code if you are getting them.
mypy is a tool, not a hassle. 
if it says something is off, you either have a wrong configuration, or something actually is wrong in your code! this happened multiple times in some of your repos and people would just type ignore the suggestions mypy was making.
just because your code runs doesnt mean it is safe

ruff is the same thing. 3-4 ignored rules are fine but you should explain why you actually ignored them. having many ignores is bad practice since ruff was made by aggregating many python rules that very knowladgable developers have made

it's fine if you ignore more often that regular when writing niche tests, but your source code should not be riddle with noqa's.

I also hope you're not developing all your code and just at the end running mypy and ruff, these tools should be ran fairly consistenly to certify that small changes align with expected structure.

circleci:
many of you added ci when finishing your project but for this one we want you to add ci as early as possible so that you can see if your builds are breaking or not.

authentication:
look, i'll be honest, neither of our (TAs) repos had a particularly good way of handling auth  because we were not thinking about proper 0auth when writing these. 
in your new components we expect you to implement some of the fixes kamen talked about in class such that 0auth works properly and clients can authenticate even if communicating through a service instead of doing the trick we were doing for things to run local.

## Assigning you to a component

## 


(BLURB)**Objective:**  
The primary goal of this assignment is to design, implement, and deploy a complete, standalone microservice from scratch. You will select a service category, define its API, build its core functionality including user authentication, and make it publicly accessible. This project will build upon the skills you developed in the first assignment and challenge you to think about system architecture and user interaction.

**Timeline:** This is a two-week assignment.

**Instructions:**

1. **Service Selection:**  
    Each team will choose **one** of the following service categories to implement. To ensure a diverse range of projects, please coordinate with other teams on the class Slack channel to avoid duplication where possible.
    
    - **Chat Service** (e.g., Slack, Discord, WhatsApp)
        
    - **Mail Service** (e.g., Gmail, Outlook)
        
    - **AI Service** (e.g., an interface to an AI model like OpenAI's)
        
    - **Issue Tracker** (e.g., Jira, Trello, Asana)
        
2. **API Design First:**
    
    - Before implementation, design the API for your service. This should be your first pull request.
        
    - Define the endpoints, request/response structures, and data models. Think about how other developers or services would interact with your service.
        
3. **Implementation:**
    
    - **Core Logic:** Implement the main features of your chosen service.
        
    - **User Authentication:** This is a key requirement. Your service must handle user authentication. When a user interacts with your service, they should be able to log in via an external provider (like Google). Your service will then need to handle the authentication flow, receive credentials (like a token), and store them in a database.
        
    - **Structure:** You can use the project structure from Homework 1 as a starting point.
        
4. **Deployment:**
    
    - Deploy your completed service to a cloud platform (like Render) and ensure it is publicly accessible via a URL.
        
5. **Development Process and Documentation:**
    
    - Break your work into smaller, logical pull requests. Avoid submitting one large PR with all your changes. Your development process should be iterative.
        
    - Maintain your contributing.md and design documents, updating them as your project evolves.
        

**Extra Credit:**

For teams looking for an additional challenge, extra credit will be offered for:

- **Containerization:** Package your application using Docker.
    
- **Orchestration:** Deploy your service using Kubernetes.
    
- **Advanced Integration Prep:** Implement an NCMP (Nano-Composable Micro-Protocol) server for your service. This will set the stage for more complex integrations in future assignments.
    

**Key Takeaways from This Assignment:**

- **From Concept to Deployment:** You'll experience the full lifecycle of creating a new service.
    
- **API-First Design:** Emphasizing the importance of a well-thought-out API before implementation.
    
- **Authentication:** Gaining hands-on experience with a critical component of modern applications.
    
- **Iterative Development:** Reinforcing the practice of incremental progress and continuous feedback.