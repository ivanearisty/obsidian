## Question 5

### Problem 1
#### Question
![[Screenshot 2024-11-06 at 11.29.30 PM.jpg]]
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
![[Screenshot 2024-11-06 at 11.38.56 PM.jpg]]

#### Answer
```
ProjectsAfter(T,k):
	
```
### Problem 3
#### Question
![[Screenshot 2024-11-07 at 12.02.20 AM.jpg]]
#### Answer

```
PostBudget(T,k):
	if(T == null)
		return 0;
	if(T.start <= k.start)
		return PostBudget(T.right,k);
	else
		leftTotal = PostBudget(T.left,k);
		rightTotal = T.right.btotal;
		return T.budget + leftTotal = rightTotal;
```

This is also O(h) since we again follow a path from a root to the leaf. 
By knowing the exact end date of the project, we know what start date we are looking for.
Looking by start dates (or the min) is O(h) for interval trees.
### Problem 4
#### Question
![[Screenshot 2024-11-06 at 11.48.06 PM.jpg]]
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