---
tags:
  - INFOVI
---
# Assignment #1: Expository Visualization

In this assignment, you will become familiar with the basics of simple data processing and data visualization. 

You will design an expository visualization to clearly communicate an idea about a given data set. Additionally, you will provide a written description of the rationale behind the design choices of your visualization. 
## Data set: Monthly hours of sunshine in U.S. cities

Weather is an important factor to consider when deciding where you want to live, since it can have a large impact on people’s wellbeing. In this assignment, you will explore a data set of average monthly climate measurements for six major cities in the USA. The data set can be downloaded [here](https://drive.google.com/file/d/1pGlhwFgG2S6zm5DRg-071qMHcXCfoe1z/view?usp=sharing).


The data set consists of the following attributes (columns):

- city: The name of the city
- lon: The longitude of the city
- lat: The latitude of the city
- month: The measured month, as a string (‘Jan’, ‘Feb’, etc.)
- monthnum: The measured month, as a zero-based integer (0, 1, etc.)
- sunshine: The hours of sunshine per month, averaged over the years 1981 - 2010
## Assignment

Your task for this assignment is to design a static visualization that you believe effectively communicates an idea or message about the sunshine data, and provide a written report (no more than 1 page, single spaced, not including images) that details your design. Note that you should include at least one image of your visualization in your report (i.e., when all of the images are excluded from the report, the text does not exceed 1 page). We recommend that you start this assignment by identifying a question about the data that you would like your visualization to answer. Then, you should design a visualization to answer that question, and use that question as the title of your visualization.

You are required to use the given data set, but you are free to transform the data in any way that you wish. That is, you can manipulate the data using transformations such as a log transformation, computing percentages or averages, grouping elements into categories, or removing unnecessary variables. You are also allowed to incorporate additional data from external sources, but if you do so, you need to make a note of it in your submission.

**Remember that different visualizations can emphasize different aspects of a data set, so your writeup should include details about which components of the data you intended to communicate. You should also provide comments on which aspects of the data set are obscured by your visualization design.**

Your report should explain the rationale behind your design decisions. You should document the visual encodings you used and why they are effective for communicating your intended message. These decisions include things like the choice of visualization type, size, color, scale, and other visual elements (which we will learn more about during Week #3 and Week #4’s lectures).

### Synopsis

- static visualization
- effectively communicates an idea or message about the sunshine data
- at least one image of your visualization in your report
- identifying a question about the data that you would like your visualization to answer
- design a visualization to answer that question
- use that question as the title of your visualization
- You should also provide comments on which aspects of the data set are obscured by your visualization design

## Grading 

The assignment will be graded out of 10 points. Your work will be evaluated based on the soundness of your design choices and the quality of your written report. We will also look for consideration of audience, message, and intended task. Examples of things that would likely lead to point deductions include:

- Missing labels, titles, or descriptions of data transformations
- Missing or incomplete design rationale in your written report
- Use of misleading or unmotivated graphic elements
- Ineffective encodings for your stated communication goals (e.g. distracting colors, improper data transformation)

## Submission Instructions

All assignments are to be completed individually (see [syllabus](https://docs.google.com/document/d/1dGa8Tc1b2M1zC4_Jw411EL2q0kDCXb7pI3OKSXx16qQ/edit?usp=sharing) for further details). The assignment is due on Wednesday 10/2, by 11:59pm. We will be discussing submissions in class, so be sure to avoid a late submission if you can.

You should submit .zip file containing the following components to Brightspace:

- A pdf of your written report (written using the provided [LaTeX template](https://drive.google.com/file/d/1MCfC2c64kTcKo3zzqQqTPxXs4YI75UrC/view?usp=sharing))
- We suggest using [overleaf.com](http://overleaf.com) to write your reports
- All of the code necessary to recreate your visualization(s)
- An image of your visualization(s)

Credit goes to the University of Washington’s data visualization course for the assignment idea/data set.