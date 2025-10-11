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

![[z/z ScreenShots/3D91F9D0-C7AC-48EC-A619-28DAFA8F8C96.jpg]]
![[z/z ScreenShots/7C512BD2-7C28-4921-9318-79DFA4D4EE32.jpg]]
![[z/z ScreenShots/627ED480-232E-4928-A94C-F06D6A9912B6.jpg]]

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

![[z/z ScreenShots/Screenshot 2024-11-18 at 6.18.43 PM.jpg]]

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

### A CHECK THIS TODO

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

Think of the left only and right only trees again...

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
![[z/z ScreenShots/Screenshot 2024-11-18 at 6.57.08 PM.jpg]]

## Part 6

### A

We can implement the above as an augmented red black tree.

If we use x as the key we can insert and delete everything in log(n) time. 

We would need modifications to BST delete and insert to keep everything correct as teh tree evolves:

For example, when inserting:
we are given prereq and credits.
maxcredits will always be equal to credits since we would insert a leaf.
same for pmax
same for size it will just be 1.

### B CHECK THIS TODO

```python
MaxCredits(T)
	if(T == null) return 0
	# if this studen't grade is less than 80 go right
	if(T.grade < 80)
		return MaxCredits(T.right)
	else: # this student and all of the students to the right have a higher grade
		student to the right = T.right.maxcredits
		my credits = T.credits
		# check the left subtree to see if anyone has a higher grade and add them too
		maybe we have something on the left credits = MaxCredits(T.left)
		# assuming null is fine
		return max(
			student to the right,
			my credits,
			maybe we have something on the left credits
		)
```

Runtime is O(logn) because a rb tree has height bound by logn and we are executing an algorithm that at most will go all the way to right, or to the left, but it will traverse down one path. From root to leaf, and that leaf is at most h away from root.

### C CHECK THIS TODO

```python
MaxPregrade(T):
	if(T == null) return 0

	## if we have too high of a grade go to the left to find lower
	if(T.grade > 60):
		return MaxPregrade(T.left)
	else: # this sutdent and all the student to it's left have lower grades than 60
		students to the left = T.left.PMax
		my pre  = T.prereq
		maybe we overshot it so check right = MaxPregrade(T.right)
		return max(
			students to the left,
			my pre,
			maybe we overshot it so check right
			)
```

Same as above, runtime is O(logn) because a rb tree has height bound by logn and we are executing an algorithm that at most will go all the way to right, or to the left, but it will traverse down one path. From root to leaf, and that leaf is at most h away from root.

### d
![[z/z ScreenShots/Screenshot 2024-11-18 at 7.23.01 PM.jpg]]
```python
AboveBest(T):
	if T == null return 0

	highestgradepreq = T.PMax

	AboveBest(T, highestgradepreq)

AboveBest(T, target):
	# if i am nobody, i dont exist
	if T == null return 0
	# if we are higher we need to add ourselves on all our right children 
	# and check the left subtree to see if anyone else there is also higher
	if(T.grade > target):
		me = 1 
		my right children = 0
		if T.right != null:
			my right children = T.right.size
		whatever we left on the left = AboveBest(T.left, target)
		return me + my right children + whatever we left on the left
	# if I am in fact lower we should not count me and go to my right child
	# because maybe he is bigger
	else:
		return AboveBest(T.right, target)
```

## Part 7

### A
![[z/z ScreenShots/Screenshot 2024-11-18 at 7.29.31 PM.jpg]]

Why not just level order? Anyways...

So print depth takes in some level i, and then it recursively goes down the tree, and prints out that level.

So we if tell print depth to print the root at depth 0 then it just prints out the root.

So if we have a procedure as defined above (the height procedure), then we can just get the maximum possible height, and iterate through the depths (inverse).

```python
PrintLevelOrder(T):
	height = maxHeight(T)
	for i = 0 to height:
		PrintDepth(T, i)
```

This is inneficient since we make a lot of calls to just find the correct level. 
Nevertheless, we werent asked to optimize for runtime or to hit a specific one.

## Question 8

![[z/z ScreenShots/Screenshot 2024-11-18 at 7.41.09 PM.jpg]]

### Reasoning

M \[0, 1, . . . , n, 0, 1, . . . , T ] where M \[i, j] 
is the minimum possible cost of achieving exactly weight j using weights selected from 0, 1, 2...i. 

If achieving exactly weight j is impossible, you may set entry M [i, j] to an any flag value that works in your solution.

If the total sum has to be exactly equal to j then we can set inf to determine impossibility

### Init

- If the target weight is 0, then we must select no items. therefore M\[i,0] = 0 for all i
- If the target weight i > 0, and we have no weights to reach it, then we need to init to infinity to describe the impossibility. 

### Relationship

If we can include i it's because w\[i] <= j
Then we have a choice of including or not
if we include it then we get:
M\[i,j] = M\[ i - 1 , j - w\[i] ] + p\[i] <- the price of i
And to choose whether we include or not we compare that to the choice of not including and select the minimum. That not including is the same as forced to include.

**Forced to not include**
if w\[i] > j then we exclude, and the minimizing would just be above us, the result of not including and using the pieces before us:
M\[i -1, j]
### Code

```python
for j = 1 to T set M[0,j] = infinity
for i = 0 to n set M[i,0] = 0
for i to n
	for j 1 to T:
	if w[i] <= j # if we gonna include
		M[i,j] = min( # then this will be the minimum between
			M[ i - 1 , j - w[i] ] + p[i], # including it and getting the result 
										  # of the other stuff
			M[i-1, j]					  # or not including it
		)
	else M[i,j] = M[i-1, j]
return M[n,T]
```
### Runtime

We loop through a table of size n · T performing a constant number of steps for each entry. Therefore the overall runtime is O(n · T ).
## Question 9

![[z/z ScreenShots/Screenshot 2024-11-18 at 8.04.11 PM.jpg]]

Ok so this is longest palindromic subsequence, but now we get more money for certain types of joins on the table.

Let's look at what palindromic subsequence is:

![[z/z ScreenShots/Screenshot 2024-11-18 at 8.06.49 PM.jpg]]

Let's define a convenience function called getValue(i) so that for input i, where i is in {R, B, G, Y, P } we will get the respective price. 

We might need another dimension for price.

For initialization, we are going to assign the main diagonal table to 0, since we actually can't draw any rainbows in between.

Then, for the second diagonal table, we can assign if there exists a palindrome or not into the value.

After drawing a quick example

![[z/z ScreenShots/IMG_6308.jpeg]]

Our algorithm does work in selecting the best case, and we know LPS wont make any bad rainbows by the nature of how it works, so:

The DP Table will dp\[i,j] will contain the current maximum value that we can make from i to j in the string, where i and j are the start and ending points of the string

The initialization was explained above.

Now the recurrence relation is:

If c\[i] = c\[j] then the current best price is whatever rainbows are inside + the current gain from making this rainbow. dp(i+1, j-1) + getValue(c\[i])

and if we dont make a palindrome, we take the best out of the right and left sides as before:

```python
from i = 1 to n set dp[i,i] to 0 
from i = 1 to i = n - 1:
	if c[i] = c[i+1] 
		dp[i, i + 1] = getValue(c[i])
	else dp[i, i + 1] = 0
for k = 3 to k = n 
	for i = 1 to i = n − k + 1 
		j is the right endpoint: j = i + k − 1 
		if c[i] = c[j]:
			dp[i,j] = getValue(c[i]) +  dp[i+1, j-1]
		else: 
			dp[i,j] = max(dp[i+1, j], dp[i, j-1]
```

Our algorithm carries out a constant number of operations per cell of the table. 
Since we have $\mathcal{O}(n^{2})$ entries in the table, the algorithm runs in time $\mathcal{O}(n^{2})$.
Just like regular lps
## Question 10

![[z/z ScreenShots/Screenshot 2024-11-18 at 8.27.19 PM.jpg]]

Facts:
- If we pick up a rock at mile marker i and carry itto mile marker j, we get paid j-i * weight
- you can drop and pick up a rock at the same mile marker.

This problem feels very similar to another stock problem I have solved a long time ago, the way I am thinking about it is, imagine we have a setup where we have:

weights:
3, 1, 1, 1, 1, 1, 1 ... lots of 1s, 1, 1, 4, 2

If we pick up the rock at 3, and keep walking until 4, we are effectively making more than we could ever make with any rock in between.

Especially since there is no penalty for holding the rock for too long. 

I mean, we can pick up and drop at any point, so the problem just becomes a sort of increasing graph, where **at any discrete point i, we are making i money = to the largest rock we have seen before.**

So yes, it definitely works, always hold the rock that is making you the most money on each discrete step, no reason to downgrade your rock moneymaking potential, there is only a reason to upgrade it.

## Question 11
![[z/z ScreenShots/Screenshot 2024-11-18 at 8.27.25 PM.jpg]]


### Reasoning

Ok so what do we know? 

- We can still pick up and drop a rock at any point in time.

We have two choices at every step, to pick up a rock, or to not pickup

We want to maximize the amount of rocks we can pick up.

All rocks are worth the same, but we want to maximize rock touching.

So, this preemptively feels like LIS but im not too sure.

Let's try to define the subproblems

At rock M\[i], we have to hold it for D\[i] time.

The decision is whether to hold it or not to hold it

If we hold it, we make
the rock
v 
1  - the cost of carrying it.

The cost of carrying it would be how many rocks we give up for carrying it.

The rocks we give up are naively just the rocks to it's right, but each of those rocks has a cost of being carried too.

For example

2, 1, 5, 1, 1, 1

The cost of rock 2 is 1 + OH! 

The benefit of rock 2 is 1 + the benefit of all rocks after 5!

Ok let's try to write something:
![[z/z ScreenShots/A7200E56-F1AA-486B-9069-355724635AA4.jpg]]

**Table:**

We are going to have a 1 dimensional array such that dp\[i] represents the maximum number of rocks that can be carried from i to the finish line.

**Init**

The last rock is 0

**recurrence**

if d\[i] > n, then we are at an impossible rock, and the value is 0 or the value of the rocks in front of it.

For any one rock i, the utilization of that rock is:
1 + dp\[ i + D\[ i ]] or the value to it's right, whatever is bigger.

**code**

```python
dp = [n] # make a new dp array
dp[n] = 0 # set the last value to 0

for(i = n to 1): # iterate down
	if D[i] > n - i: # if the holding time is bigger than the time to hold
		dp[i] = dp[i+1]
	else:
		dp[i] = max((1 + dp[i+d[i]] ), dp[i+1])
		# 1 for getting this new rock
		# getting how much we can carry later
return dp[0]
```

Bonus,

the selected rocks can be achieved by seeing whenever we go down by 1

```python
dp = [n] # make a new dp array
dp[n] = 0 # set the last value to 0

for(i = n to 1): # iterate down
	if D[i] > n - i: # if the holding time is bigger than the time to hold
		dp[i] = dp[i+1]
	else:
		dp[i] = max((1 + dp[i+d[i]] ), dp[i+1])
		# 1 for getting this new rock
		# getting how much we can carry later

for i = 1 to n-1:
	if(dp[i-1] > dp[i])
		print(mile[i])
	else
		continue

return dp[0]
```

Sanity check:
![[z/z ScreenShots/A2992652-EE5F-4F87-B724-BE2B806731D1.jpg]]