## Introduction and Remarks

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

### Note on Tooling

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

## The Assignment

### Objective

For HW2, to be honest, we didn't run a single line of your code. We trusted your tests and your CI. We checked `uv sync` and `uv build`, and if the lights turned green, you got those marks.

Homework 3 is different.

For this final assignment, you are no longer building in isolation. You will be building a **Smart Chat Bot** that integrates three distinct domains: **Chat, Tickets, and AI**.

  * The Bot must be able to answer questions.
  * The Bot must be able to fetch and summarize tickets ("Show me my 3 most recent open tickets").
  * The Bot must be able to take action ("Close this ticket").

But here is the catch: **You cannot just use your own code.**

You must negotiate shared interfaces with **other teams**. You will need to incorporate other teams' packages into your ecosystem. Your system must eventually work with at least 2 different AIs, 2 different Chat systems, and 2 different Ticket systems.

This is a "Quid Pro Quo" economy. You will have to bargain, agree on contracts (ABCs), and perhaps use Git submodules to glue it all together.

We are moving from "Does it run?" to "Does it play well with others?"

### Instructions

