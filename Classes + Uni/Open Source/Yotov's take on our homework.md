---
tags:
  - OpenSource
---
## High Level Feedback

Notes
- seperate interface and implementation 
- insist on dependency injection
- Final template repo should be only small number of commits — ideally 1
	- Otherwise everybody is going to inherit all that history.
	- PR from one branch into the main
- Top level directory src is common, components seems a bit weird? Definitely not a good directory for a template
- People expect some basic structure.
- It could make sense to put the test of the component close tothe component.
	- That might eb a good call for unit tests (should be close to the things you are testing
- We want a template such that it shows hwo to do proper tests
- These things should be publishable in pypy , you can't just take a class and send it to pypy, you cant push a calculator with add and subtract to pypy but all the mechanism should be in the repo. 
- Python
	- avoid separate ruff.toml file — use pyproject.toml
	- no pip install no venv
	- 
- Do some thinking such that the code for the tests 
- When you run a build script then you should not have any tests.
- Api is important and necessary 
	- either in init.py or inseperate api.py 
	- Always have puytest — nose is extra credit
- Each component has to be a separate uv package 
	- -owen dependencies , etc
	- own pyproject.toml
- CI/CD Links
	- Passed tests
	- Failed tests
	- Code coverage

- cpp is more nuanced, because of the nature of the language and different priorities there is a lot fo choices and there are differnt ways to do interfaces, from very tightly coupled to loosley coupled stuff.
- if we take the python and translate as is is creating a class with abstract methods and have an impl of the class that overrides those abstract methods virtual dispatch
- The way cpp has evolved , templates are very prevalent, adn they requeire to put the code of the template in the headers .
- cpp modules is new and cool, they are not very prevalent but you can explore this in the homework. 
- all the testing frameworks can explote the lists fo texts in the binary, then you can add stuff to only run some specific texts. CI has integration for that. Google test integration will eternally create rules and run them in parallel or crazy nice things that can. Use the integration.
- Make each component be able to be a seperate project, they should be at least separate, you can forklift this from this project and put this into some other project with minimal effort .
	- Physical design look into, Consider how you are specifying you rinterface and you need to. 
	- "These are the interface headers" anybody who is linking this library should need these things.
	- cc files dont make it into the installation glob \*.cc wildcard matching
	- very dangerous things in build systems
- gtest for cpp
- documentation generator, a very popular one is called makedocs, for python, doxygen for c++ 
- do't include headers that you do not use
- don't leave any old code comments
- for e2e tests usually run the whole app. 
- a perfect e2e test is abstracting the app.
- python is the glue code, you want to automate stuff such that the e2e test for.
- Component directory structure is important
- Add all clang-tidy and then remove lints that you explain why you removed something .

interface isf for users
private is for your use

all the calculators have different degrees of crazyness I guess.

look at calculator 3 and how we use pimpl

application binary interface

tightly couple for high performance and costly to maintain

- add dependencies of things internally

Mental model: If you have a good component then it's something that you can easily fork lift away from the project into a different project.
## Homework 2
If you do not understand something give something hard.
