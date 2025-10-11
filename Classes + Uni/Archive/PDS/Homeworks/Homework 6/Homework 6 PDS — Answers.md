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

![[z/z ScreenShots/Screenshot 2024-12-13 at 7.35.32 PM.jpg]]
### Question 3
![[z/z ScreenShots/Screenshot 2024-12-13 at 10.28.25 PM.jpg]]
### Question 4

I was confused about whether we are projecting here or not.

If the query plan is:

1. Scan Takes to find courses taken by student 12345 and their grades 
2. Join result with Section, selecting sections in JAB building while doing the join 
3. Join result with Course. (Projections can be done along with the joins; No duplicate elimination is needed.)

I will be assuming that we will not be projecting anything, and this is different from the RA query above.

If we would be considering projections, the steps would be slightly different.

Step 1:
- Selecting from takes to find student with id 12345
- We do a linear search since we do not have an index, takes doesn't fit into memory, but we don't really care since we can just keep the 10 takes records.
- We perform 1 seek at start = 10 ms
- Transfer: 2,560 MB at 50MB/s = 2,560/50 = 51.2 s
- So about 51 seconds in total.
- Our result size is 10 records of 64 bytes each, which can easily fit into memory and we can keep it in memory

Step 2:
- We have 10 takes records in memory
- Section is 500MB so it doesnt fit into memory and we perform a block-nested loop join applying the filter as we read section.
- We can scan section linearly and if we find a match we output the joined record.
- We perform 1 seek at start = 10 ms
- Transfer: 512 MB / 50MB/s = 10.24 s
- So about 10 seconds in total.
- Our result size is 10 tuples (Takes + Section), each about (64 + 512) ≈ 576.

Step 3:
- We have 10 takes + section records in memory
- Course is 10 MB, can fit entirely in memory
- We can load Course into memory once and do a single pass join.
- IO times is less than 1 second: 
	- Seeks: 1 seek = 10 ms
	- Transfer: 10 MB / 50MB/s = 0.2 s

Our total time is about 1 minute.
## Problem 2

Without the index we had to perform a full sequential scan of the Takes relation (2,560 MB) to find the 10 records for the student. 

This took about 51 seconds, and was the most time expensive operation in our query.

Now, we perform a search on the B+ tree index, which involves a small number of random seeks to traverse from the root down to the leaf level.

Since the index is unclustered, we still have to go fetch records from the actual table, so we'd perform 10 x 10ms transactions for this fetching.

Since the block size is 4KB and each takes record is only 64 bytes, we would perform 3 or 4 seeks and block transfers (depending on the size of the tree).

The total time would then be at about 130 to 140 ms, significantly reducing our time spent.

Given that the steps are sequential, it is beneficial to reduce the amount of time by creating this index.