## Introduction

We have arrived at the final stretch of the semester. While we call these "homeworks," you have likely realized by now that they are actually iterative sprints in a larger engineering project.

At the end of the day, this entire course is built on the reality of group work and professional standards. By now, I hope you understand that we are lenient with the use of AI generators because the raw implementation details—inefficient sorting algorithms, slow data access, or funky loops—are not what this course is about.

We care about the process that makes you a deployable engineer.

If you are writing Python in an enterprise environment, the reality is strict:

  * You won't use out of the box `pip`; you will use a deterministic (sometimes even custom) package manager.
  * You will face strict governance on how you commit, push, squash, and rebase.
  * Your CI pipeline will act as a gatekeeper, rejecting anything that breaks the build.
  * Your senior engineers will be brutal if you make brittle design choices.
  * Documentation is not optional.

That is the soul of this class. The leap in quality between HW1 and HW2 was significant, and I hope you are finding better ways to prototype and collaborate.

More remarks are at the bottom of the doc this time around.

## The Assignment

### Objective

For this final assignment, you are no longer building in isolation. You will be building a **Smart Chat Bot** that integrates three distinct domains: **Chat, Tickets, and AI**.

  * The Bot must be able to answer questions.
  * The Bot must be able to fetch and summarize tickets ("Show me my 3 most recent open tickets").
  * The Bot must be able to take action ("Close this ticket").

But here is the catch: **You cannot just use your own code.**

You must negotiate shared interfaces with **other teams**. You will need to incorporate other teams' packages into your ecosystem. Your system must eventually work with at least 2 different AIs, 2 different Chat systems, and 2 different Ticket systems.

You will have to bargain, agree on contracts (ABCs), and perhaps use Git submodules to glue it all together.

We are moving from "Does it run?" to "Does it play well with others?"

### Instructions

## Deadlines

12/17 -- **Final submission**: students addressed all feedback from TAs on reviews, etc. (**this can be negotiated, we can technically push it all the way up to the 21st \[since Monday, Dec 22, 2025 is winter recess], but that's so close to holidays and we don't know if that'd be acceptable? Leave comments here. If you want that extra time we can also leave the 17th as a suggested deadline but not penalize submissions up till the 21st. Anything you want.**)

12/10 -- Peer Feedback & TA Feedback

12/7 -- **Second submission**: first integration

12/3 -- Feedback: TA feedback on API alignment and Interface.

12/30 -- **First submission**: API alignment

11/27 -- **Interface Deliverable**: teams must agree on shared interface

11/26 -- We freeze the draft

11/21 -- We provide the draft

A good example for how your PRs might look like (in the primary HW3 branch) is as follows, imagine I'm a chat team:

1. feat: Align to shared API

2. feat: Integrated AI system.
- verified at least 2 different AIs work
- added integration tests between our two systems
- other ai specific stuff

3. feat: Integrated ticketing system.
- verified at least 2 different ticketing systems work
- added integration tests between our two systems
- other ticket specific stuff

1. feat: Add e2e tests & main.py
- verified full app workflow 
- stuff
## Remarks

### Advice for Teams
#### Chat

Team 4's Slack doesn't have delete. 
Team 1 did not implement channels.

I think you need a get messages, get message, send message, detele message, get channels, and get channel methods.



Team 1 - Discord: 
Team 4 - Slack
Team 7 - Discord
#### Tickets

Team 2 - Google Tasks
Team 6 - Jira
Team 8 - Trello

#### AI

I think all of you should have a send message method. At minimum that is the api, send a message to the chatbot.

You have to come up with a way that auth works for everyone as well.

Team 3 - OpenAI
Team 5 - Gemini
Team 9 - OpenAi
Team 10 - Claude

### Notes on Tooling

Before we start this assignment, I want you to reflect on your dev loop. Now that you know how to make `ruff` and `mypy` work, don't just run them at the end.

I work on many diverse projects, and I swear by a hyper-strict configuration. When you are deep in the code, specifically when working with things like ML models, untyped Python makes me get lost in the sauce. You will routinely see code where variables are passed around without context. Is `x` a tensor? A numpy array? A feature vector? A raw file path?

Strict typing prevents this confusion. To help you out, here is the VS Code configuration I use personally. It turns Python into a much more rigorous language (folks with statically typed language backgrounds will appreciate this IMO):

```json
"python.analysis.typeCheckingMode": "strict",
"python.analysis.inlayHints.variableTypes": true,
"python.analysis.inlayHints.functionReturnTypes": true,
"python.analysis.autoFormatStrings": true,
"python.analysis.enablePytestSupport": true,
"python.analysis.supportDocstringTemplate": true,
"python.analysis.typeEvaluation.strictListInference": true,
"python.analysis.typeEvaluation.strictSetInference": true
```

I think your senior engineers will be impressed when you work with care. Meaning: making tight interfaces and respecting the cognitive load of the developers who will read your code next. 

I remember a specific technical interview where I needed the binomial distribution function. I'm under time pressure and didn't even remember what it was. So, I didn't implement the logic right away; I just wrote the method signature, defined the interface, and moved on to the rest of the system. I didn't even finish up writing it, and the interviewer didn't fault me for it; we just moved on. **The bigger picture is always more important.**

There is nothing cleaner than breaking a complex problem down into a set of strictly typed method signatures.