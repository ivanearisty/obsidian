```dataview
TABLE tags AS "Tags", difficulty AS "Difficulty", completed AS "completed?"
FROM "Recruiting/Leetcode/Questions"
WHERE file.name != "sortspec"
SORT tags ASC
```

## Ships
Recruiting --> [[Recruiting/Spaceship|Spaceship]]