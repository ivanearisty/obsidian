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
![[Screenshot 2024-10-21 at 10.58.20 PM.jpg]]