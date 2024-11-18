---
tags:
  - DAA
---
# DAA Exam Write Up — Ivan Aristy — iae225
I acknowledge that my submitted Exam work is entirely my own. I have read and am in accordance with the Student Code of Conduct policy of NYU Tandon and fully accept the consequences of breaching the above instructions. 
Name: Ivan Aristy
Signature: Ivan Ernesto Aristy Eusebio


## Part 1
### A
Show how to insert the new node 43. 
You must show both the initial insertion, and any changes made by RB-repair. 

![[3D91F9D0-C7AC-48EC-A619-28DAFA8F8C96.jpg]]
![[7C512BD2-7C28-4921-9318-79DFA4D4EE32.jpg]]
![[627ED480-232E-4928-A94C-F06D6A9912B6.jpg]]

The tree now has 14 nodes. What is the maximum number of nodes that can be added before the black height increases?

Rb tree with black height b has a max number of nodes of:

 $$N_{\text{max}} = 2^{2b} - 1$$

Which is when we are alternating.

Here the bh would be 3.

So

$2^{2*2}-1$ = 63

So we can have at most

63 - 14 = 49 nodes when the tree is completely full and alternating

### B

![[Screenshot 2024-11-18 at 6.18.43 PM.jpg]]

1. Not possible, the 14 interval is too far below and when checking there is no way to make the max height from the left subtree of 10 be equal to that of the right. We would need to apply a rotation.

2. Since left uniquely identifies here pls go with for the nodes starting at intervals:
20: 36

10: 30
32: 36

8: 16
12: 30
21: 27
35: 36

15: 30

14: 30

3. 15,25 is returned. since 8,16 doesnt satisfy condition to search it and none of the ones above intersect with it on the search
4. It is not possible, the 14,30 is too big on the left. and then the 35,36 forces us to look to the right subtree if we make the low of our interval 30.

## Part 2

### A

Give an example of a BST on 10 nodes such that the Inorder and Postorder traversal produce the same output, or explain that it is not possible

Post order traversal always prints out the left, right, root 

inorder visits the left root right

if we eliminate one of the children

both would print out

post: root, right
in: root, right.

so it would be a linkedlist like bst where every node only has a right child and we have not a single node with left children

### B
Give an example of a BST on 10 nodes such that the Preorder and Postorder traversal produce the same output, or explain that it is not possible

I mean, if we do the same analysis as before, we would have to eliminate the root in this situation sicne

post: left, right, root
pre: root, left, right