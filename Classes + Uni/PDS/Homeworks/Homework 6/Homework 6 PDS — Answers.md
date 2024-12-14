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

1. Scan Takes to find courses taken by student 12345 and their grades 
2. Join result with Section, selecting sections in JAB building while doing the join 
3. Join result with Course. (Projections can be done along with the joins; No duplicate elimination is needed.)

Step 1:
- Selecting from takes to find student with id 12345
- We do a linear search since we do not have an index, takes doesn't fit into memory, but we don't really care since we can just keep the 10 takes records.
- We perform 1 seek at start = 10 ms
- Transfer: 2,560 MB at 50MB/s = 2,560/50 = 51.2 s
- So about 51.21s total
- Our result size is 10 records of 64 bytes each, which can easily fit into memory and we can keep it in memory

Step 2:
- We have 10 takes records in memory
- Section is 500MB so it doesnt fit into memory
- We can scan section linearly and if we find a match we output the joined records
- 

### Question 4

