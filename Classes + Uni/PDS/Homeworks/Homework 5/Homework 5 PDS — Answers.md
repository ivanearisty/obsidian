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
Comparison 5: $700 \ge 685$

Compare to 825.
Comparison leads to: Add 700 to rs,
Comparison leads to: Add 720 to rs,
Move to leaf J via $P_{n+1}$,
Comparison leads to: Add 740 to rs,
Comparison leads to: Add 760 to rs,
Comparison leads to: Add 800 to rs,
Move to leaf K via $P_{n+1}$
Comparison leads to: Add 820 to rs,
Comparison leads to: $840 \ge 825$.

Fetch all records directly from the data file for keys 700, 720, 740, 760, 800, and 820.

D: 
Find all records with key values between 680 and 820, inclusive,assuming the B+ tree is a secondary (non-clustering) index on the data file.

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
Comparison 3: $750 \geq 680$
Since $720 \neq 680 \rightarrow C = P_{I}$
Drop Node B from main memory.
Search in pointer $C = P_{I}$

Load Node I into main memory.
Node is leaf.
Begin algorithm: Find $K_{i}$ such that $K_{i} \geq 680$
Comparison 1: $620 \neq 680$
Comparison 2: $640 \ngeq 680$
Comparison 3: $660 \ngeq 680$
Comparison 4: $680 \geq 680$

Since $680=680$, Add 680 to RS

Compare to 820.
Comparison leads to: Add 700 to rs,
Comparison leads to: Add 720 to rs,
Move to leaf J via $P_{n+1}$,
Comparison leads to: Add 740 to rs,
Comparison leads to: Add 760 to rs,
Comparison leads to: Add 800 to rs,
Move to leaf K via $P_{n+1}$
Comparison leads to: $820 \ge 820$ and stop
Since 820 = 820. Add result to rs

Fetch all matching records individually, performing random I/O operations at each key 680, 700, 720, 740, 760, 800, and 820.

### Set 2

![[Screenshot 2024-12-06 at 12.58.32 PM.jpg]]

![[Screenshot 2024-12-06 at 2.38.16 PM.jpg | 500]]

a. insert 795 

Insert 795 into leaf node J and since J.size < n and > n/2 we do nothing else.

b. insert 192 
Insert 192 into leaf node E.
Since E is full we split into:
E: 180, 192, 200, 220
E': 240, 260, 280, 300

Update parent, A, as:
A: $p_{c}, 100, p_{d}, 180,p_{e},240,p_{e'},320,p_{f}$

c. insert 593 

Insert 593 into leaf node H.
Since H is full split into:
H: 480 500 520 540
H': 560 580 593 600

Update B:
B: $p_{g}, 480, p_{h}, 560,p_{h'}, 620, p_{i}, 740, p_{j},820,p_{k},1000,p_{l},2000,p_{m}3000,p_{n}$

But now B is overflown, so split B into 

B: $p_{g}, 480, p_{h}, 560,p_{h'}, 620, p_{i}$
B': $p_{j}, 820,p_{k},1000,p_{l},2000,p_{m}3000,p_{n}$

and set root to:

$p_{a},400,p_{b},740,p_{b'}$

d. delete 200 

Delete directly from leaf E:
E: 180, 220, 240, 260, 280, 300

e. delete 340 

Delete from F: 320, 340, 360, 380

320, 360, 380

Need to redistribute since we dont meet minimum requirement.

We check neighbouring node E, and redistribute by sending 300 from e to f

E: 180, 200, 220, 240, 260, 280,
F: 300, 320, 360, 380

Update parent from 320 to 300:

A: $p_{c},100,p_{d},180, p_{e},300,p_{f}$

f. delete 40

Delete from C: 20, 40, 60, 80

20, 60, 80

Can coalesce since we dont meet minimum requirement here or on checking node D.

New node is

C: 20, 60, 80, 100, 120, 140, 160
D is deleted
and the parent becomes A: $p_{c},180,p_{e},320,p_{f}$

## Problem 2

![[Screenshot 2024-12-06 at 12.59.15 PM.jpg]]

A:

Recall that a B+ tree has a parameter n that determines the min and max number of key values and pointers in each node. Determine the largest value of n that allows n pointers and n-1 keys to fit into a block.

Each block contains n-1 keys and n pointers.

So for 4KB we have $4096=8(n-1)+ 8n \rightarrow n=256$

B:

Choose a convenient number x to work with, somewhere between n/2 and n, assume each node has x children, and estimate the height of the tree. Note that there are many records for each sID; assume that there are duplicates of the same sID in the leaf nodes, so that the number of key values is equal to the number of records in Takes.

Let's assume that we are $\frac{2}{3}$ full, so each node has $\frac{2}{3}\times 256 \approx 170$

to store all the 500,000,000 records we need $\frac{500,000,000}{170} \approx 3,000,000$ leaf nodes.

We can get the height with a log:

$$
h = \lceil \log_{170}(3,000,000) \rceil 
$$![[Screenshot 2024-12-06 at 9.22.58 PM.jpg]]

So we need 3 levels apart from the root node.

So 4 levels total.

C:

Searching the tree requires 4 seeks and 4 block transfers