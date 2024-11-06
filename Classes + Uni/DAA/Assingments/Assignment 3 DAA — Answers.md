# iae225 — Assignment 3
## Question 1
### Problem 1
#### Question

Given the input 5, 1, 4, 2, 7, 9, 3, 6 , count the number of comparisons carried out when a BST is built by inserting the keys in their given order. Recall that in class, we showed that the number of comparisons carried out by the BST building process is the same as the number of comparisons carried out by Quicksort. Your job is to show the execution of quicksort (and which pivots) corresponds to the BST that you built. Be sure to illustrate that both procedures use the exact same number of comparisons.

#### Answers

I was unsure whether to do random insertions or not

![[BST.drawio.svg]]
so for comparisons you can see that each insertion does:
Compare 5 with 1: 1
Compare 4 with 5, Compare 4 with 1: 2
Compare 2 with 5, Compare 2 with 1, Compare 2 with 4: 3
Compare 7 with 5: 1 
Compare 9 with 5, Compare 9 with 7: 2 
Compare 3 with 5, Compare 3 with 1, Compare 3 with 4, Compare 3 with 2: 4  
Compare 6 with 5, Compare 6 with 7: 2
15 total
```
Quicksort representation:
5, 1, 4, 2, 7, 9, 3, 6

Around 7
Arr: [5, 1, 4, 2, 7, 9, 3, 6] 
Comparisons:
- 5 vs. 1 1
- 5 vs. 4 2
- 5 vs. 2 3
- 5 vs. 7 4
- 5 vs. 9 5
- 5 vs. 3 6
- 5 vs. 6 7
Partitions:
- Left: [1, 4, 2, 3]
- Pivot: [5]
- Right: [7, 9, 6]

Around 1:
Array: [1, 4, 2, 3]
Comparisons:
- 1 vs. 4 8
- 1 vs. 2 9
- 1 vs. 3 10
Partitions:
- Left: []
- Pivot: [1]
- Right: [4, 2, 3]

Around 4:
Array: [4, 2, 3]
Comparisons:
- 4 vs. 2 11
- 4 vs. 3 12
Partitions:
- Left: [2, 3]
- Pivot: [4]
- Right: []

Around 2: 
Array: [2, 3]
Comparisons:
- 2 vs. 3 13
Partitions:
- Left: []
- Pivot: [2]
- Right: [3]

Around 7:
Array: [7, 9, 6]
Comparisons:
- 7 vs. 9 14
- 7 vs. 6 15
Partitions:
- Left: [6]
- Pivot: [7]
- Right: [9]

Also 15 total
```

### Problem 2

#### Question
Suppose we build a BST on n elements, by first permuting the input sequence, and then inserting the elements in random order. After n − 1 elements are inserted, we have one element left to insert. How many possible positions are there for the last element to be positioned in the tree? Explain your answer.
#### Answer

You can insert the nth element into any position that there is a null pointer, so, we just have to count null pointers.

We know that a binary tree with n nodes has n + 1 null nodes.

Since we have n - 1 nodes, we can insert into n locations.

### Problem 3
#### Question
![[Screenshot 2024-11-06 at 12.31.41 PM.jpg]]

#### Answer

PrintTree1(T):
if the left node is not null, print the value,
recurse the left and right subtrees.

In essence, we print out every node that has a left child.

```
Indents are recursive tree but also the bolds are the values we print, and, yes, we print immediately.

**50**
	**25**
		**12**
			**6**
				1
				8
				9
		**35**
			**30**
				28
			**40**
				38
				42
				43
				44
	**80**
		**70**
			**60**
				56
				62
		75
			78
	90
		**95**
			92
			99
```
![[Screenshot 2024-11-06 at 12.31.41 PM.jpg]]
PrintTree2(T):
Now, to even go left or right, we have to first pass the has left tree check. So, it's similar to the above, but, if your ancestors are not leftchilds, we wont be hearing from you.

```
**50**
	**25**
		**12**
			**6**
				1
				8 -> same as above where these guys break immediately
		**35**
			**30**
				28
			**40**
				38
				42
	**80**
		**70**
			**60**
				75 -> again note, that we go into this "recursion" but we 
					dont go past just breaking
		90
```

![[Screenshot 2024-11-06 at 12.31.41 PM.jpg]]

PrintTree3(T)

if the node is null we return 0
if we are not null, we set height 
## Question 2
## Question 3
## Question 4
## Question 5
