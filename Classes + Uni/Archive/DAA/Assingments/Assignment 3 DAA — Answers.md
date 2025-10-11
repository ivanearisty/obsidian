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
![[z/z ScreenShots/Screenshot 2024-11-06 at 12.31.41 PM.jpg]]

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
![[z/z ScreenShots/Screenshot 2024-11-06 at 12.31.41 PM.jpg]]
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

![[z/z ScreenShots/Screenshot 2024-11-06 at 12.31.41 PM.jpg]]

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
![[z/z ScreenShots/Screenshot 2024-11-06 at 1.29.16 PM.jpg]]
#### Answer

This can be done in 3 steps: 
1. perform an inorder traversal of the trees, which would give us the sorted order of the elements. O(n)
2. merge the lists together, as we saw on mergesort, also O(n)
3. build the rb tree from the sorted list. this is simple as pie, first take the middle as root, and recur on left and right subtrees, setting left or right child to the parent of the subtrees (return value). 
4. At the end, this algorithm will yield a tree where all nodes but the last ones can be marked as black, so, recolor if there are any issues there.
4. At the end, this algorithm will yield a tree where we can recolor. For the coloring strategy we can color even levels as black, and odd levels as red. If while coloring an even level we run out of nodes, we go back to the previous level, which is red, and iterate on all the neighbours (using the neighbour algorithm defined above) of this node's parent, coloring them black, and ensuring that black height was maintained. If we run out of nodes on an odd level, we just stop.
## Question 2
### Problem 1
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 1.46.53 PM.jpg]]
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
![[z/z ScreenShots/Screenshot 2024-11-06 at 3.35.58 PM.jpg]]

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
![[z/z ScreenShots/Screenshot 2024-11-06 at 3.50.28 PM.jpg]]

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

![[z/z ScreenShots/Screenshot 2024-11-06 at 4.03.35 PM.jpg]]

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

![[z/z ScreenShots/Screenshot 2024-11-06 at 5.11.36 PM.jpg]]

We go up the tree once, and down the tree once, only going through a path that is at most H\*2, one H for each of the traversals, which is O(H).
## Question 3
### Problem 1
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 5.14.41 PM.jpg]]

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
After recursively recolloring we spot another problem  at 15 and 20
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
```

Since we're not adding or removing any black nodes, the total count of black nodes on each path remains the same.

An addition would only cause the black height to increase if it

### Problem 2
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 8.04.55 PM.jpg]]

#### Answer
1. For a rb tree thats all black, we know the max will be $n=2^{bh(x)}-1$ If for every black node, we assume that it has 2 red children, in alternating order. If we assume that every node has two red children, then the formula for a maxed out tree is $2^{bh(x)}-1 + 2(2^{bh(x)}-1)$ or 45
2. 4
3. double the black height, so, 8.
4. It's always possible for all nodes to be coloured black if inserted using our mergesortish technique.
5. I mean, we didn't specify if it was black height or just regular height, for height 2, we can color all leafs red or all leafs black.

### Problem 3
#### Question

![[z/z ScreenShots/Screenshot 2024-11-06 at 8.26.15 PM.jpg]]
#### Answer

bh is upper bounder by 
$$
\begin{gather}
bh(x) \le \log(n+1)
\end{gather}
$$
so we can have at most
$$
\begin{gather}
2^{bh(x)} - 1 = n
\end{gather}
$$
since every black node can have two red children, we would multiply 

### Problem 4
#### Question
Draw an example of a RBT on 16 nodes with black height 3 that has two different possible colorings. Show the different possible colorings.
#### Answer
![[z/z ScreenShots/Screenshot 2024-11-06 at 9.55.50 PM.jpg]]
Node 30 can be recolored as black and 25 as red
This is because we kept one side of the tree alternating, and on the other side kept the black height at 3. Adding the new red node to the leftmost node allows us the flexibility of recolloring however we want. We could have added to 25 or 81 in this case.

### Problem 5
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 9.59.12 PM.jpg]]

#### Answer
It takes O(nlogn) because: Insertions to the tree take logn time and we have to insert n nodes. 

Insertions take logn time because the height of the tree is guaranteed to be logn, and repairing a single node takes O(1), but we have to repair for every node up (the ancestors) which is log(n) or, in other words, the max height.

To transform a BST to RBT in O(n) time we can get the inorder traversal of the BST, store it in an array, and rebuild the rb tree with the method we used in problem 4.

We could store the nodes and remove and re attach all pointers, or just store values and make a new tree.
## Question 4

### Problem 1
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 10.13.33 PM.jpg]]
#### Answer

```
SetDiff(T):
    if(T == null) return -1;
    left = SetDiff(T.left);
    right = SetDiff(T.right)l
    T.diff = left - right;
	return max(left,right) + 1;
```

As soon as we hit a null node, we return -1 to the parent, and then they can resume calculations. All calculations happen in O(1) and we do this for n nodes. Hence, this will run in O(n) because we visit every node at most once and perform constant calculations while there.
### Problem 2
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 10.22.29 PM.jpg]]
#### Answer
The first thing to realize, is that a tree being inserted will only impact it's ancestors, it will have no effect on the rest of the tree. So, at most we are going to have to change h nodes, where h is the height of the tree, making this O(h)

We have tree insert is:

```
TreeInsert(T, val):
	y = null;
	while T != null
		y = T;
		if(val < T.val)
			T = T.left;
		else
			T = T.right;
	if(val < y.val)
		y.left = newNode(val);
	else 
		y.right = newNode(val);
```

But after careful consideration, i just don't see a way to update the tree size in O(h) if we only have access to diff. 
I assume we dont have access to height because we didnt have it either for the question above.
I thought about setting a boolean flag to see if the diff had changed or not, and then re-running insert but updating the diff based on the new heights, but it's just no possible without having access to a height variable.
### Problem 3
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 10.45.38 PM.jpg]]
#### Answer
1. Since 9,25 and 1,24 overlap with 15,16, we will always find those first.
2. now we can insert something like 8,27 in the pink node, and it will be found since nothing to it's left will overlap.

### Problem 4
#### Question
Rewrite the interval search algorithm so that it prints out all intervals that intersect with the input interval i. Call your procedure PrintAll(T, i), where T is a reference to the root node of an interval tree, and i is an interval object. The result is that ALL intervals in the tree that intersect with i are returned.
#### Answer
```
INTERVAL-SEARCH(x,i) 
	While x != NIL and i does not overlap with x.interval 
		if x.left != NIL and x.left.max ≥ i.low 
			x = x.left 
		else 
			x = x.right 
	return x
PrintAll(T,i) 
	if(T == null)
		return
	if(T.left != null and T.left.max >= i.low)
		PrintAll(T.left, i)
	if(T.interval overlaps with i)
		print(T.interval)
	if(T.right != null and T.right.low <= i.high)
		PrintAll(x.right, i)
```

### Problem 5
#### Question
How can you implement an interval tree so that deletions and insertions are carried out in time O(log n)?
#### Answer
We can make the bst a rb or avl tree. 
If we go with a RB tree, rb repair will maintain a balanced tree.
We would have to modify it so that it updates the max values after each rotation;
however, whenever we perform rotations, only the node we are perfoming a rotation on, and the sibling will need updating.
From our lecture notes, we set their new max to max(T.left.max, T.right.max, T.int.high) respectively.
At each step, we now perform 2 more constant operations; however, there are only performed at most H times, which is the worst case scenario for an RB tree, when we go all the way to the top and recolor the root. 
Hence insertions and deletions will be O(logn) since h = log(n)
## Question 5

### Problem 1
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 11.29.30 PM.jpg]]
#### Answer

The first thing is to realize that all the projects from some interval will be valuable to us, if it's start time is before the start time of our project; hence, in this scenario, we don't have to even check the left subtree, we just take btotal immediately.

The other scenario is that we are at a project which actually does have a start time after s. Here we can essentially ignore the current project, and everything to the right, since those will start later too.

```
EarlyBudget(T,s):
	if(T == null)
		return 0;
	if(T.start >= s)
		return EarlyBudget(T.left,s);
	else
		leftTotal = T.left.btotal;
		rightTotal = EarlyBudget(T.right, s);
		return T.budget + leftTotal = rightTotal;
```

The reason this algorithm is O(h) is because we only recurse into the right subtree ever.
We never touch the left subtree, only getting the btotal. 
Hence, on the worst case, we are going to go on a path straight down the rightmost, latest starting project.
On this worst case, we traverse the height of this path, which, at most, is the height of the tree, H. 
So, the algorithm is O(h)

### Problem 2
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 11.38.56 PM.jpg]]
#### Answer

```
ProjectsAfter(T,k):
	if(T == null)
		return 0;
	if(T.start <= k.start)
		return ProjectsAfter(T.right,k);
	else
		leftTotal = ProjectsAfter(T.left,k);
		rightTotal = T.right.btotal;
		return T.budget + leftTotal = rightTotal;
```

This is also O(h) since we again follow a path from a root to the leaf. 
By knowing the exact end date of the project, we know what start date we are looking for.
Looking by start dates (or the min) is O(h) for interval trees.

### Problem 3
#### Question
![[z/z ScreenShots/Screenshot 2024-11-06 at 11.48.06 PM.jpg]]
#### Answer
```
IntervalTotal(T,a,b):
	if(T == null)
		return 0;
	if(T.start < a)
		return IntervalTotal(T.right,a,b);
	else if(T.start > b)
		return IntervalTotal(T.left,a,b);
	else
		count = 1;
		if(T.left.max >= a)
			left = IntervalTotal(T.left,a,b);
		else 
			left = T.left.size
```