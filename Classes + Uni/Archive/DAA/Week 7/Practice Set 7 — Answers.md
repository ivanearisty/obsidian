## Problem 1

### Part 1
```
10

10
	\
	15

10
	\
	15
		\
		22
	/		\
	20		30

	10
		\
		15
	/		\
	12		22
		/		\
		20		30

	10
/		    \
7		    15
		/		\
		12		22
			/		\
			20		30

		10
	/		    \
	7		    15
/			/		\
4			12		22
				/		\
				20		30
```

## Problem 2

Let T be a pointer to the root node of a BST. Write the pseudo-code for a recursive algorithm called VerifyBST(T) that returns true if the tree rooted at T is a valid binary search tree, and false otherwise.

```java
VerifyBST(T):
	if(T == null) return true;
	boolean leftSide = VerifyBST(T.left);
	boolean rightSide = VerifyBST(T.right);
	if(T.left != null && T.left.val > T.val) return false;
	if(T.right != null && T.right.val < T.val) return false;
	return leftSide && rightSide;
```

**This is wrong** I forgot to use findmin of right and compare to curr, and min or left and compare to curr.

## Problem 3

```java
findMin(T):
	if(T.left != null)
		return findMin(T.left);
	else 
		return T;
```

## Problem 4

Let x be a reference to a node in a BST. Let y be the root of another BST. Write the pseudo-code for Replace(x,y) which replaces node x with the subtree rooted at y. You may assume for simplicity that x is not the root of the BST, and that replacing x with y does not violate the BST property.

