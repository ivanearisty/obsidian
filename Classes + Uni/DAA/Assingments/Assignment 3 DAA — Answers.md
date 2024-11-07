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
to whatever we got from below the left subtree, and + 1
we print only when h is bigger than 4
Here we go left from 50
left from 25 
from 12, 6 and 1...
now we are at a null node
so we go 
0 
1 for 1
6 for 2
12 for 3
25 for 4 and print it 
and 50 for 4 and print it.

PrintTree4(T) is the same as above, and, im gonna cheat, we do the same as above but add 1 
so 25 and 50 now print 4 and 5 respectively.

### Problem 4
#### Question
![[Screenshot 2024-11-06 at 1.29.16 PM.jpg]]
#### Answer

This can be done in 3 steps: 
1. perform an inorder traversal of the trees, which would give us the sorted order of the elements. O(n)
2. merge the lists together, as we saw on mergesort, also O(n)
3. build the rb tree from the sorted list. this is simple as pie, first take the middle as root, and recur on left and right subtrees, setting left or right child to the parent of the subtrees (return value). At the end, this algorithm will yield a tree where all nodes but the last ones can be marked as black, so, recolor if there are any issues there.
## Question 2
### Problem 1
#### Question
![[Screenshot 2024-11-06 at 1.46.53 PM.jpg]]
#### Answer
(assuming that boolean values get converted to 0 or 1 as integers)
```
TrimTree(T):
	if(T == null) return T;

	T.left = TrimTree(T.left) 
	T.right = TrimTree(T.right)
	
	if (T.left and not T.right)
		return T.right
	if (not T.left and T.right)
		return T.left

	return T
```

For any tree, the runtime is T(n) = T(k) + T(n-k-1) + cn where k is the amount of children in the left subtree.

Since we make a recursive call to all k nodes on the left, and the remaining nodes on the right, we will end up processing all nodes, no matter what. 

Since we perform constant work at each step, we perform constant work n times.

So T(n) = O(n)

### Problem 2
#### Question
![[Screenshot 2024-11-06 at 3.35.58 PM.jpg]]

#### Answer

```
RecreateBST(A,i,n):
	
	if (s > n) return null;

	root = New Tree node();
	root.val = A[f];

	int j = i;
	while (j < n and A[j] < A[f]) j++;

	root.left = RecreateBST(A, s, j - 1);
	root.right = RecreateBST(A, j, n - 1);

	return root
```

### Problem 3
#### Question
![[Screenshot 2024-11-06 at 3.50.28 PM.jpg]]

#### Answer

```
PrintDeep(T):
	PrintDeep(T, 0, maxDepth(T));

PrintDeep(T, depth, maxDepth):
	if(T == null) return;
	if(depth == maxDepth) print(t.val);
	PrintDeep(T.left, depth + 1, maxDepth);
	PrintDeep(T.right, depth + 1, maxDepth);

maxDepth(T):
	if(T == null) return 0;
	return max(maxDepth(T.left), maxDepth(T.right)) + 1;
```

### Problem 4

![[Screenshot 2024-11-06 at 4.03.35 PM.jpg]]

```
MyNeighbour(T,y):
	\\degen case
	if(y.parent.left == y) return y.parent.right;
	
	\\ init 
	int yValue = y.val;
	int steps = 0;
	T = y;
	
	\\find the next node that includes the neighbour in the subtree
	while(T.val <= yValue){
		T = T.parent;
		steps++;
	}
	\\move to the right subtree
	T = T.right;
	
	while(--steps > 0) T = T.left;
	return T;
```

![[Screenshot 2024-11-06 at 5.11.36 PM.jpg]]

We go up the tree once, and down the tree once, only going through a path that is at most H\*2, one H for each of the traversals, which is O(H).
## Question 3
### Problem 1
#### Question
![[Screenshot 2024-11-06 at 5.14.41 PM.jpg]]

#### Answer
If we insert 17 we have the straight case and rb repair performs the rotation straight up.

The uncle of 17 (node 15) is black, so we do a right rotation around 20 which fixes the violation after adjusting colors.

```
		       30 (Black)
			      /                    \
			   10 (Black)               40 (Black)
		   /     \                       /     \
	 5 (Black)  20 (Red)            35 (Black)  45 (Black)
	 /     \        /     \
2 (Red)  7 (Red) 15 (Black) 25 (Black)
	             /       \
	         12 (Red)   16 (Red)
					         \
						   17 (Red)
Recolor 12 and 16 (the parent and uncle) to black
		       30 (Black)
			      /                    \
			   10 (Black)               40 (Black)
		   /     \                       /     \
	 5 (Black)  20 (Red)            35 (Black)  45 (Black)
	 /     \        /     \
2 (Red)  7 (Red) 15 (red) 25 (Black)
	             /       \
	         12 (black)   16 (black)
					         \
						   17 (Red)
after recursively recolloring we spot another problem 
```

Since we're not adding or removing any black nodes, the total count of black nodes on each path remains the same.

An addition would only cause the black height to increase if it
## Question 4
## Question 5

All, thanks for the call today, and I greatly appreciate your thoughtful feedback.

Glenn, please send over the recording of the last call we had with Tecnotree, I'd like to parse through the sections where we talked about the DOM and DMLD.

Bryan, feel free to send over the list of security requirements whenever it's most convenient for you. 

And, Bruce, here is a long-form version of our concerns, please feel free to modify as desired, and, Ronnie, feel free to add anything else if it was missed.

In the domain of the web applications tecnotree provides, we want to evaluate to what extent, both, the buyflow's (DOM) and self-care portal (DMLD) have a prebuilt frontend. Is it the case that 1) both have a prebuilt frontend that only requires us to provide a uiKit for a fully functional solution, 2) we are provided prebuilt frontend components/modules, but must put together the actual webpage, or 3) we are not provided with any client facing frontend, and only api endpoints to customer journeys.   
Given scenario 1, how would these be deployed? Are each of these their own web application, and, hence, can be mapped to something like selfcare.wavelinkinternet.com or buyflow.wavelinkinternet.com?
Given scenario 3, we need the api documentation to start our build process for these.