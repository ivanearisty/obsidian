---
tags:
  - mission-control
---
w## Leetcode Bootcamp

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
for (let page of dv.pages('"Recruiting/Leetcode Questions/Questions"').where(p => p.file.name != "sortspec")) {
    for (let tag of page.tags) {
        if (!tagsCount[tag]) {
            tagsCount[tag] = 0;
        }
        tagsCount[tag]++;
    }
}

dv.table(["Tag", "Count"], Object.entries(tagsCount).sort((a, b) => b[1] - a[1]));
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