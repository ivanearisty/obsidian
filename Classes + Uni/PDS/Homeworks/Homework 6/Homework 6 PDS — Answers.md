---
tags:
  - PDS
---
## Problem 1
### Question 1
```sql
SELECT C.title, T.grade
FROM Takes AS T
JOIN Section AS S ON T.year = S.year 
                  AND T.sem = S.sem
                  AND T.courseID = S.courseID
                  AND T.secID = S.secID
JOIN Course AS C ON S.courseID = C.courseID
WHERE T.sID = 12345 AND S.building = 'JAB';

```

### Question 2
Draw an expression tree illustrating the following relational algebra query, with the operations done in the order indicated by the parentheses:

$\Pi_{title, grade}(\sigma_{sID=12345\land building=\text{"JAB"}}((\text{section}\bowtie\text{takes})\bowtie\text{course}))$

![[Screenshot 2024-12-13 at 7.35.32 PM.jpg]]

### Question 3

