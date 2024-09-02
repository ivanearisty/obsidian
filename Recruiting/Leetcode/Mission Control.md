```dataview
TABLE file.link AS "Question", tags AS "Tags"
FROM "Questions"
FLATTEN tags AS Tag
GROUP BY Tag
WHERE contains(tags, "leetcodeQuestion")
SORT length(Tag) DESC, file.name ASC
```
