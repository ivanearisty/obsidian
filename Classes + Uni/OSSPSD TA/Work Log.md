Finish out the last section. our goal with hw2 is to start the quest to do the different types of providers. maybe starting with interface definition and then moving on to actually choosing something to implement for every team.

To-Dos:
Team and Individual Update Forms
Team formation form
Update calendar with TA Office Hours schedule
Update calendar with class schedule

Done:
Made a quick sketch of a fastapi implementation https://github.com/ivanearisty/oss-taapp/tree/fastapi-test

Hello there,

Here are two drafts for HW0 and HW1. 

HW0 could be team formation, pulling the actual repos, making sure they run locally --> making students feel comfortable with the prior work.

HW1 could be the fastapi service (I have some questions on this which I'd like to talk to prof Kamen about), with extra credit for containerization, deployment to some cloud, and enabling MCP. I made a quick sketch of what I'd expect the fastapi impl to kinda look like in my repo.

HW2 we're working on, but our main idea would be to expand the project into a modular, multi-provider system.
Students would first collaborate to define a generic IngressProvider interface. Then, each team will choose a new service (e.g., Slack, Discord, GitHub) and build a concrete implementation, adapting their chosen service's API to the shared interface. This moves the project from a single-purpose client to an extensible platform.