---
tags:
  - DAA/Week3
---
## Heap
Heaps are **complete** (every level is full except the last from L -> R)

**Max Heap**: Every node in the tree has a value that is $\geq$ all values in subtree.

![[Screenshot 2024-10-13 at 8.35.45 PM.jpg | 400]]

![[Screenshot 2024-10-13 at 8.36.16 PM.jpg | 400]]

Height of a Heap with n nodes is $\log_{2}n$ rounded down.

![[Screenshot 2024-10-13 at 8.42.59 PM.jpg | 400]]
![[Screenshot 2024-10-13 at 8.43.16 PM.jpg | 400]]

## Iterative Heap Building

Bubble Up:
![[Screenshot 2024-10-13 at 10.35.30 PM.jpg]]

List of num
![[Screenshot 2024-10-13 at 8.53.31 PM.jpg]]

## Bottom Up

Bubble Down:
![[Screenshot 2024-10-13 at 9.08.59 PM.jpg]]

![[Screenshot 2024-10-13 at 10.33.01 PM.jpg]]

Only works on situations where the other subtrees are already heaps.

![[Screenshot 2024-10-13 at 9.08.42 PM.jpg]]

Runtime:

![[Screenshot 2024-10-13 at 9.48.27 PM.jpg]]

Blue is how many nodes there are.
Yellow is how long each one of them take.
We make the some infinity since it's obviously bigger.
The term inside the sum is now a geometric sum equal to the constant 2.

Insert and Delete, both logn.

![[Screenshot 2024-10-13 at 9.50.33 PM.jpg]]

Heap Delete
![[Screenshot 2024-10-13 at 11.35.58 PM.jpg]]

Best vs worst case : iterative vs bottom up 

![[Screenshot 2024-10-14 at 12.27.40 AM.jpg]]

