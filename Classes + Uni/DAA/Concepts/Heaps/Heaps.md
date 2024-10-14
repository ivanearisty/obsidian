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

![[Screenshot 2024-10-13 at 8.53.31 PM.jpg]]

## Bottom Up

Bubble Down:

Only works on situations where the other subtrees are already heaps.

