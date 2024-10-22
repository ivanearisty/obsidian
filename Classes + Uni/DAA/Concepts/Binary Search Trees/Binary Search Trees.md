---
tags:
  - DAA/Week7
---
## Overview 

![[Screenshot 2024-10-21 at 10.45.36 PM.jpg | 400]]

**BST Definition**:
- A type of *Binary Tree*
- The nodes are objects that store:
	- key: element of the comparable set (x.key)
	- pointer to left child (x.left)
	- pointer to right child (x.right)
	- optionally we might have parents (x.parent)
- All of the *keys* in the *left subtree* of a node are *less than or equal* to the node's key
- All of the *keys* in the *right subtree* of a node are *greater than or equal* to the node's key

## Inorder Traversal

Algorithm:
![[Screenshot 2024-10-21 at 10.51.56 PM.jpg]]

Runtime:
![[Screenshot 2024-10-21 at 10.52.48 PM.jpg]]

BST Search:

![[Screenshot 2024-10-21 at 10.54.17 PM.jpg | 400]]

Runtime is $\mathcal{O}(h)$ where h is the height of the tree

## Insertion

![[Screenshot 2024-10-21 at 10.56.37 PM.jpg]]

Runtime is $\mathcal{O}(h)$ where h is the height of the tree

## Deletion


![[Screenshot 2024-10-21 at 10.58.10 PM.jpg | 400]]

Assuming we get a pointer to the node through search:
![[Screenshot 2024-10-21 at 10.58.20 PM.jpg | 400]]
![[Screenshot 2024-10-21 at 10.59.00 PM.jpg | 400]]
 ![[Screenshot 2024-10-21 at 11.00.08 PM.jpg | 300]] ![[Screenshot 2024-10-21 at 10.59.52 PM.jpg | 300]]

## Height of a BST
 
 ![[Screenshot 2024-10-21 at 11.01.31 PM.jpg]]

We can mess up and make a height of n-1 making everything wrong.

### Random Insertions

![[Screenshot 2024-10-21 at 11.02.17 PM.jpg]]

Important to know that the expected height from above

### Runtime of Building a Random BST

![[Screenshot 2024-10-21 at 11.03.41 PM.jpg]]

![[Screenshot 2024-10-21 at 11.04.17 PM.jpg | 300]]

The number of comparisons would be the same as in quicksort.

![[Screenshot 2024-10-21 at 11.05.33 PM.jpg | 500]]