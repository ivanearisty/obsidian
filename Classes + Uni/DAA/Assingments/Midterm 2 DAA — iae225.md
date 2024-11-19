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

### A REVISIT

Give an example of a BST on 10 nodes such that the Inorder and Postorder traversal produce the same output, or explain that it is not possible

Post order traversal always prints out the left, right, root 

inorder visits the left root right

if we eliminate one of the children maybe we could do something, 

for pre we could eliminate left
both would print out
pre: root, right
in: root, right.

but for post order, we cant eliminate anything and it's not possible
### B
Give an example of a BST on 10 nodes such that the Preorder and Postorder traversal produce the same output, or explain that it is not possible

I mean, if we do the same analysis as before, we would have to eliminate the root in this situation.

post: left, right, root
pre: root, left, right

So again we can't do much.

## Part 3

We define a leaf to have a x.leaves value of 1, since it is a leaf
We define a null node to have a  x.leave value of 0
We want to get to the end and if a node has both of their children be null return 1

else traverse left and right

```python
SetLeaves(T):
	if T == null return 0

	# I am a leaf
	if(T.left == null and T.right == null)
		T.leaves = 1
		return 1

	left = SetLeaves(T.left)
	right = SetLeaves(T.right)

	T.leaves = left + right
	return T.leaves
	
```

## Part 4

Whenever a new node is inserted into a tree, it will be a leaf, without exception.

Hence, we know that adding 1 to the leaf count down the tree would be sufficient sometimes.

However, it might be the case that a node gets inserted as a child of a  node that was a leaf. 

In this scenario, then we would not want to update this property.

We do not know before inserting a node where it will go, hence the tree insert algorithm.

Therefore, we must verify whether the parent know of the tree that was inserted has another child, after the insertion.

Two cases arise:
1: If we have a sibling we must update the leaf size down our path.
2: If we do not have a sibling, our parent was a leaf, nothing to update.

In case 1, our approach will be to call another algorithm at the end of tree insert that will go search down the path for the the newly inserted node, and add 1 to the leaf sizes of each node we traverse.

This would be a modified version of the BST-search algorithm.

It is O(h) still.

This is because the time complexity of tree-insert is O(h) since we at maximum go down the path of the tree.

We are adding a new algorithm that also goes down the path of the tree, but perform constant amount of work at each step. 

Hence, this algorithm is also Oh

And, O(h+h) is just equal to h.

## Part 5

Since we talked about it in class, I am assuming that I can call an algorithm that returns the maximum height of the tree. This algorithm goes through all nodes and is O(n) so it wont increment our time complexity if we only call it once in the init.

```python
CheckColoring(T):
	maxHeight = maxHeight(T)
	return CheckColoring(T, maxHeight)

CheckColoring(T, h):
	if(T == NIL) return true
	# if we are at the last level of the tree
	if(h == 0):
		if(T.color == red):
			return true
		else return false
	else:
		# if im not at the last level and im red return false
		if(T.color == red):
			return false
		else:
			return
				# both left and right subtrees follow our rules
				CheckColoring(T.left, h - 1)
				and
				CheckColoring(T.right, h - 1)
```

Our algorithm is O(n) since we visit every node once, and the init maxheight is also O(n)

More justified, this is the same time complexity as inorder traversal since
T(n) leq t(lx) + t(rx) + c where l and r denote the left and right subtrees. And we have proved before that this runtime is indeed O(n)
From lecture notes:
![[Screenshot 2024-11-18 at 6.57.08 PM.jpg]]

## Part 6

### A

We can implement the above as a red black tree.

If we use x as the key we can insert and delete everything in log(n) time. 

The following would be modifications to BST delete and insert to keep everything correct as teh tree evolves:

When inserting:
we are given prereq and credits.
maxcredits will always be equal to credits since we would insert a leaf.
