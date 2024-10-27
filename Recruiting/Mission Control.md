---
tags:
  - mission-control
---
## Leetcode Bootcamp

[Syllabus](https://docs.google.com/document/d/1GXI7y7FBEd3jYNx_QyjlXFrM881LFx34o1OxzweVTjM/edit#heading=h.v2426a1xgwhc)
[Assignment Submission](https://docs.google.com/forms/d/e/1FAIpQLSdUUgb-G4rkFdqyRMegO4_h3nIiyKRhVKUPGXn6SYqnyG6nHQ/viewform?fbzx=-4535659911026620957)
[Teaching Session Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSdwxR17oO2S8qm3-m3CfF-G-87IFhR-HZCCMuFOZ2kpFrdbtQ/viewform)
[Coaching](https://calendly.com/ka3535-nyu/30min)
[Github Take Home](https://github.com/Kumuda123/NYU-Tandon-LeetCode-Bootcamp-Fall-2024?tab=readme-ov-file)

## Rundown
### Questions
```dataview
TABLE tags AS "Tags", difficulty AS "Difficulty", completed AS "completed?"
FROM "Recruiting/Leetcode Questions/Questions"
WHERE file.name != "sortspec"
SORT tags ASC
```
### Tag Incidence
```dataviewjs
let tagsCount = {};
let totalCount = 0;
for (let page of dv.pages('"Recruiting/Leetcode Questions/Questions"').where(p => p.file.name != "sortspec" && p.tags != null)) {
    for (let tag of page.tags) {
        if (!tagsCount[tag]) {
            tagsCount[tag] = 0;
        }
        tagsCount[tag]++;
    }
}
for (let count of Object.values(tagsCount)) { totalCount += count; }
dv.table(["Tag", "Count"], Object.entries(tagsCount).sort((a, b) => b[1] - a[1]));
dv.el("b", "Total " + totalCount);
```
### Completions
```dataviewjs
let stats = {};

for (let page of dv.pages('"Recruiting/Leetcode Questions/Questions"').where(p => p.file.name != "sortspec")) {
    let status = page.completed ? "Completed" : "Not Completed";
    let difficulty = page.difficulty || "Unknown";

    if (!stats[status]) {
        stats[status] = {};
    }

    if (!stats[status][difficulty]) {
        stats[status][difficulty] = 0;
    }

    stats[status][difficulty]++;
}

let result = [];
for (let [status, difficulties] of Object.entries(stats)) {
    for (let [difficulty, count] of Object.entries(difficulties)) {
        result.push([status, difficulty, count]);
    }
}

dv.table(["Completed?", "Difficulty", "Count"], result);
```
## Ships
Recruiting --> [[Recruiting/Spaceship|Spaceship]]


## Thoughts


- Legislative Dashboard: View recent bills and implement advanced search options with filters like date range, bill status, and keyword.
    
- Member Profiles: Profiles for Congress members with their bill sponsorship and voting records.
    
- User Accounts: Basic account creation and user authentication using [Firebase](https://firebase.google.com/docs/auth/web/start).
    
- Notifications: Alerts for updates on tracked bills or members.
    
- Data Visualization: Simple graphs for legislative data.
    
- Community Engagement: Implement a feature for users to comment on and discuss bills.

Congress Project
1. User authentication and login - Eli
2. Connect to the congress server and implement the key endpoints that we want (aka bill, senator, law, amendment) - Ivan
3. Figure out database to keep information, how and when to update the information without redundancy - Ian
4. Develop functions to access the info - Ivan 
5. Business logic (follow a senator, follow a bill, aka business functionality and what our users want to do) Chun-Ju