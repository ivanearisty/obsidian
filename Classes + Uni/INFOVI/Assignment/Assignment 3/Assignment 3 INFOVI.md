---
tags:
  - INFOVI
---
Assignment #3: Interactive Visualization

CS-GY 6313 B: Information Visualization

  

In this assignment, you will gain experience with creating an interactive visualization. Interactive visualizations allow you to create more complex visualizations that are able to handle intricate and large-scale data more easily. 

  

# Assignment (10 points)

The goal of this assignment is to gain familiarity with implementing different interaction techniques and strengthen your understanding of when interaction techniques are effective or ineffective. For example, [zipdecode](https://benfry.com/zipdecode/) and [NameVoyager](https://web.archive.org/web/20211107232302/https://www.babynamewizard.com/namevoyager-expert) are visualizations that allow you to interact with the data to explore it in different ways. You will create an interactive visualization for this assignment.

  

To make sure that the project is manageable, you should focus on creating a limited but compelling visualization that allows users to interactively explore the data along dimensions of the data that you believe are important. A visualization with a clear focus and a user-friendly implementation is much preferred over a sprawling design that tries to do too much all at once. The [NameVoyager](https://web.archive.org/web/20211107232302/https://www.babynamewizard.com/namevoyager-expert) visualization is a good example of the level of complexity/scope we expect.

  

The written report should explain the question(s) you wanted to answer about your dataset, explain the design decisions and rationale in your visualization, and provide details on all of the interaction methods you implemented. Details on interaction methods should include how to use the interaction and a description of what the interaction does (i.e., how it modifies the data and/or visualization). Your report should discuss both the strengths and weaknesses of your visualization design. Note that there is no page limit.

  

# Data sources

You will pick your own dataset for this assignment. You are allowed to use the same dataset from Assignment #2, but you must create a different kind of visualization if you do. You should make sure that your data is complex enough to support the implementation of meaningful interactions (e.g., filtering, sorting, highlighting, etc.) to provide new views of the dataset or make specific aspects of the data more readily apparent. You can find data sources in Assignment #2 and in this resources document, but you are also allowed to use a dataset from another source.

  

# Extra Credit (2 points) 

Run a simple user study to gather feedback on the usability and effectiveness of your visualization, and include a summary of findings in your report. You should let users explore your visualization and try to gain insights to answer your question(s), and observe how easily they are able to find the relevant information to answer your question(s). Afterwards, you should also ask them to provide feedback on the usability of the visualization (e.g. via a short interview and/or a questionnaire). Include the results of your user study in the writeup.

# Grading 

The assignment is scored out of 15 points (excluding extra credit). We will determine scores by judging the soundness of your visualization designs, the usefulness and effectiveness of the interactions, and the quality of the write-up. Here are examples of aspects that may lead to point deductions:

- Errors or broken features.
    
- Confusing interface design or unhelpful interactions.
    
- Lack of interaction techniques that facilitate exploration of the data.
    
- Ineffective visual encodings for your stated goal.
    
- Missing indication of the main analysis question(s).
    
- Missing or incomplete design rationale in write-up.
    

# Submission Instructions

All assignments are to be completed individually (see [syllabus](https://docs.google.com/document/d/1dGa8Tc1b2M1zC4_Jw411EL2q0kDCXb7pI3OKSXx16qQ/edit?usp=sharing) for further details). The assignment is due on Wednesday 10/30, by 11:59pm. We will be discussing submissions in class, so be sure to avoid a late submission if you can.

  

You are required to deploy your visualization to the web. The popular visualization libraries that support interactions also allow you to embed your visualization in an HTML file (e.g., [bokeh](https://docs.bokeh.org/en/2.4.3/docs/user_guide/embed.html), [plotly](https://plotly.com/chart-studio-help/embed-graphs-in-websites/), [vega-altair](https://altair-viz.github.io/user_guide/saving_charts.html), D3 is natively web-based).

  

You should submit .zip file containing the following components to Brightspace:

- A pdf of your written report (written using the provided [LaTeX template](https://drive.google.com/file/d/1MCfC2c64kTcKo3zzqQqTPxXs4YI75UrC/view?usp=sharing)).
    

- We suggest using [overleaf.com](http://overleaf.com) to write your reports.
    

- All of the code necessary to recreate your visualization.
    
- The webpage files that host your interactive visualization (HTML file and any additional CSS and Javascript files that are needed to locally view your visualization).
    
- The dataset file(s) or instructions on how we can download the dataset.
    
- A video of you demonstrating the interactions in your visualization.
    

- You can use [OBS](https://obsproject.com/) to record your screen.
    

  
  
  

Credit goes to the University of Washington’s data visualization course for the assignment idea.