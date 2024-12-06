---
tags:
  - PDS
---
# iae225  - Indexing

## Problem 1
![[Screenshot 2024-12-06 at 12.28.01 PM.jpg]]

### Set 1

A:

Find 680.

Load Node R into main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 680$
Comparison 1: $400 \ngeq 680$
Move to next K.
Arrived at end. 
$C = P_{m}=P_{b}$
Drop R from main memory.
Search in pointer $C=P_{m} \rightarrow B$

Load Node B into main main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 680$
Comparison 1: $480 \ngeq 680$
Comparison 2: $620 \ngeq 680$
Comparison 3: $740 \geq 680$
Since $740 \neq 680 \rightarrow C = P_{I}$
Drop Node B from main memory.
Search in pointer $C = P_{I}$

Load Node I into main memory.
Node is leaf.
Begin algorithm: Find $K_{i}$ such that $K_{i} = 680$
Comparison 1: $620 \neq 680$
Comparison 2: $640 \neq 680$
Comparison 3: $660 \neq 680$
Comparison 4: $680 = 680$
Return P(4) which directs to the record in data file.

B: 

Find 620.

Load Node R into main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 620$
Comparison 1: $400 \ngeq 620$
Move to next K.
Arrived at end. 
$C = P_{m}=P_{b}$
Drop R from main memory.
Search in pointer $C=P_{m} \rightarrow B$

Load Node B into main main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 620$
Comparison 1: $480 \ngeq 620$
Comparison 2: $620 \geq 620$
Since $620 = 620 \rightarrow C = P_{I}$
Drop Node B from main memory.
Search in pointer $C = P_{I}$

Load Node I into main memory.
Node is leaf.
Begin algorithm: Find $K_{i}$ such that $K_{i} = 620$
Comparison 1: $620 = 620$
Return P(1) which directs to the record in data file.
![[Screenshot 2024-12-06 at 12.28.01 PM.jpg]]
C: 
Find all records with key values between 685 and 825, inclusive, assuming the B+ tree is a sparse primary (clustering) index on the data file.

Load Node R into main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 685$
Comparison 1: $400 \ngeq 685$
Move to next K.
Arrived at end. 
$C = P_{m}=P_{b}$
Drop R from main memory.
Search in pointer $C=P_{m} \rightarrow B$

Load Node B into main main memory.
Begin algorithm: Find smallest key $K_{i}$ such that $K_{i} \geq 685$
Comparison 1: $480 \ngeq 685$
Comparison 2: $620 \ngeq 685$
Comparison 3: $750 \geq 685$
Since $720 \neq 685 \rightarrow C = P_{I}$
Drop Node B from main memory.
Search in pointer $C = P_{I}$

Load Node I into main memory.
Node is leaf.
Begin algorithm: Find $K_{i}$ such that $K_{i} \geq 685$
Comparison 1: $620 \neq 685$
Comparison 2: $640 \ngeq 685$
Comparison 3: $660 \ngeq 685$
Comparison 4: $680 \ngeq 685$
Comparison 4: $700 \ge 685$
D: 
Find all records with key values between 680 and 820, inclusive,assuming the B+ tree is a secondary (non-clustering) index on the data file.

### Set 2

![[Screenshot 2024-12-06 at 12.58.32 PM.jpg]]

a. insert 795 
b. insert 192 
c. insert 593 
d. delete 200 
e. delete 340 
f. delete 40

## Problem 2

![[Screenshot 2024-12-06 at 12.59.15 PM.jpg]]