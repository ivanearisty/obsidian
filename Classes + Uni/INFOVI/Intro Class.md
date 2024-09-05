---
tags:
  - INFOVI
---
## Goals
- How and why visualizations work
	- Visual perception system
	- Effective encoding channels for types of data
	- What kind of problems vizualisations can solve
- How to create effective visualizations
	- Tools and programming fundamentals
	- Identify which aspects of a data set can/should be visualized
- Research skills
	- Reading and comprehending state of the art research
	- Presenting work in clear and effective manner
- Hands on projects

## Pre-reqs
- Python (Matplotlib and Bokeh)
- Javascript (Use at your own risk!)
	- [D3.JS](https://d3js.org/)
- Data structures and algos

- Academic Writing
	- LatEx

Materials
- Google Scholar
- VIS journal
- IREE Transactions on VIsualization and COmputer graphics
- Documentation: Bokeh & Matplot

Grading breakdown:
● Assignments: 15% x 4
	Alone, short report, presentation, lenient late policy with 3 days banked for all 4.
● Article survey report: 10%
● Final project: 30%

There will be showing offs of work for the assignments

## Course Content

> #Definition Data visualization: Graphical representation of data or concepts with a message to convey

### Visualization Components
- Perpetually grounded theories of color and graphics
- Scientific visualizations
- Information visualizations
- Interfaces for presenting content

### Advantages
- Comprehend huge amounts of data (Ocean data example)
- Facilitates simultaneous understanding of both large-scale and small-scale features
- Facilitates hypothesis formation
- Facilitates recognition of missing/corrupted data

> viz.wtf for seeing funny data mess ups

Main question: How can you transform your data into something that people can understand for optimal decision making.
	**Human Visual System**: How people see
	**Cognitive System**: How people think
	**Display Modality**: What is the medium, how will it be displayed 

## Topics

|                 |                                                      |                                          |
| --------------- | ---------------------------------------------------- | ---------------------------------------- |
| Date            | Topic                                                | Assignments                              |
| Week 1 (9/5)    | Introduction to data visualization, syllabus details |                                          |
| Week 2 (9/12)   | Data types, visualization techniques & tools         |                                          |
| Week 3 (9/19)   | The human visual system                              | Assignment 1 released.                   |
| Week 4 (9/26)   | Visual encoding + perception                         |                                          |
| Week 5 (10/3)   | 2D visualization - spatial data                      | Assignment 1 due. Assignment 2 released. |
| Week 6 (10/10)  | 2D visualization - temporal data                     |                                          |
| Week 7 (10/17)  | 2D visualization - network data                      | Assignment 2 due. Assignment 3 released. |
| Week 8 (10/24)  | 3D visualization - basic projection and graphics     |                                          |
| Week 9 (10/31)  | Animation                                            | Assignment 3 due. Assignment 4 released. |
| Week 10 (11/7)  | Final project proposals                              |                                          |
| Week 11 (11/14) | Uncertainty visualization                            | Assignment 4 due.                        |
| Week 12 (11/21) | Storytelling, ethics, and misinformation             |                                          |
| Week 13 (11/28) | Thanksgiving Break                                   |                                          |
| Week 14 (12/5)  | Modern topics: deep learning/VR/AR/interaction       |                                          |
| Week 15 (12/12) | Final project presentations                          |                                          |
## Why
Why do we have a user in the loop?
	We want to communicate a message
		Messages are useless without a recipient
	Data Viz allows users to answer/formulate questions
		Questions that machine's can't answer
		Viz can be a stepping stone for developing a computer based answer

Why consider the computer?
	Too much data -> need to process it all
	Different questions might require different types of processing
	Data might change in real-time

Why use external representation?
"Renderings"
	Organize info by spatial organization
	Offload internal cognition
	Can speed up recognition and search

Why use human vision?
	What about perceptual channels, haptic, taste, audio...?
	We are visual creatures and a lot of our brain is allocated to visual; it's fast and high bandwidth
	We have appropriate devices for vision (displays and such)

Why not use summary statistics?
	Summary statistics can be extremely misleading -> Anscombe's Quartet
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Anscombe%27s_quartet_3.svg/850px-Anscombe%27s_quartet_3.svg.png" alt="Anscombe's" width="300px" />
<img src="https://miro.medium.com/v2/resize:fit:1166/1*JyDU5qgFA-S2XOFBah9YcQ.png" alt="Anscombe's" width="300px" />

Why consider multiple techniques?
	Many possible ways to do viz's -> consider all -> leads to good design

Why is validation difficult? 
	Many reasonable ways to communicate one message
	Different representations resonate differently for different people
	Your audience will have bias from life experiences
	Users will do unexpected things
	Subjective outcomes (visual appeal)

Why analyze vizs?
	Most data sets are not *that* unique -> there probably exists a similar data set with an associated viz. 
	Learn from mistakes and successes of others
	Ask -> Why is the task being performed, what data is shown, and how the viz idiom is constructed in terms of design choice

