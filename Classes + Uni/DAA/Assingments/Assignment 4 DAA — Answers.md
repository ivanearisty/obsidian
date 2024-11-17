---
tags:
  - DAA
---
# iae225
## Question 1

### Part A

#### The Table

We are going to create a 2D array dp.
dp\[r]\[t] represents the maximum total price achievable at some move, 
where the moves are defined by r and t, 
where r represents the rod pieces available to us (+ the size that just became available to us),
and t represents the target rod size.
#### Initialization

Our table is describing the maximum achievable price at some "move" as defined above; however, some moves are illegal or don't make any sense.

For example, at dp\[0]\[0], we are saying:
 
> What is the maximum achievable price by splitting up a rod of size 0 using pieces up to size 0?

Here the maximum size is 0, since we can't make any money doing this.

Additionally, there are two more base cases:

Whenever t = 0, we are asking to split up a rod of size 0. No matter the pieces available to us, we can't make any money in this situation. Hence:
$$
\begin{gather}
\forall dp[i][j] \space ((j = 0) \rightarrow dp[i][j] = 0)
\end{gather}
$$
Finally, whenever r = 0, we can't cut the rod t any way, and it's an impossible problem. To represent it, we can use:
$$
\begin{gather}
\forall dp[i][j] \space ((i = 0) \rightarrow dp[i][j] = - \infty)
\end{gather}
$$

#### Recurrence Relation
Consider every entry dp\[r]\[t]

Case 1:  $t \ge r$ 
If the current rod size is shorter or equal to the target rod size, we can use the current rod to evaluate the solution at dp, hence:

dp\[r]\[t] = max(dp\[r-1]\[t], dp\[r-1]\[t-r] + p(r))
where dp\[r-1]\[t] represent the maximum of using just the previous rod sizes and
dp\[r-1]\[t-r] + p(r) represents using the current rod and getting p(r) for it, and then the dp lookup gives us the profit from using all previous rod sizes up to this rod, and the target size of the new rod (which is the rod we had - how much rod we just used)

Case 1:  $t < r$ 
If the current rod size is greater than the target rod size, our rod is too big. Hence, we should take the previous entry. This will make this, and all subsequent previous entries, be equal to the maximum possible price for the target, even if we can't use the current size.

So, $dp[r][t] = dp[r-1][t]$

The solution will be at dp\[n]\[n]
#### Pseudo Code

```python
q1(p[]):
	n = len of p
	dp = new 0 indexed 2-d array of size [n+1][n+1]
	for r = 0 to n:
		dp[r][0] = 0
	for t = 1 to n:
		dp[0][t] = -inf
	for r = 1 to n:
		for t = 1 to n:
			if t < r: ## case 2
				dp[r][t] = dp[r-1][t]
			else: ## case 1
				dp[r][t] = max(dp[r-1][t], dp[r-1][t-r] + p(r))
	return dp[n][n]
```
#### Runtime
This runtime is $\mathcal{O}(n^{2})$ where n is the size of the rod in question. 
This is because for every rod size, we are evaluating it against all previous combinations it could've made.

## Question 2
### Part A 
#### Evaluating a simpler problem

Let's imagine that our game is played on a 2D grid instead of a 3D grid. 

In this situation, we have a $m\times n$ grid where A\[i]\[j] represents the number of assassins at any position in this grid

In this situation, we start at coordinate (1,1) and want to get to (m,n).

The analogous movement at each position corresponds to increasing the x or y cordinate by 1.

Here, there would only be two ways to get to any position (i,j) in the grid. Namely, through (i-1, j) or (i, j-1).

So, if we knew the total chance of survival of (m-1,n) and (m, n-1), then we would know that the max chance of survival for the entire problem would be max((m-1,n), (m, n-1)).

By going a table from L -> R (inner) , UP -> Down (outer), dp\[i]\[j] would be equal to this max.

Let's actually try to go ahead and solve this and maybe we'll be able to generalize
#### Table — 2D

> Fact: We can determine maximum survival rate by minimizing the total number of assassins encountered along the path from the starting point (1,1) to any position (i,j)

$dp[i][j]$ describes the minimum number of assassins encountered to get to  i and j.
where i is the x coordinate
and j is the y coordinate
#### Init — 2D

We initialize locations that we can only arrive one way (the first row and first column) to their A values plus the previous.
#### Recurrence Relation — 2D

We kinda described it above already. but

$dp[i][j] = min(dp[i-1][j],dp[i][j-1])$ 
#### Pseudo Code — 2D

```
dp[1][1] = A[1][1]
for i = 2 to m:
	dp[i][1] = dp[i-1][1] + A[i][1]
for j = 2 to n:
	dp[1][j] = dp[1][j-1] + A[1][j]
for i = 2 to m:
	for j = 2 to n:
		dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + A[i][j]
return 0.9^(dp[m][n])
```
#### Runtime — 2D

This will have runtime $\mathcal{O}(m*n)$

#### Generalization to 3d

Now the grid dimensions are $m \times n \times p$, but we are still dealing with the same kind of problem. 

The table will represent the same thing as before, but we add the additional dimension.

The initialization is almost the same, but considering the new dimension of going only forwards in z. 

The equivalent 2d problem is hidden implicitly in the 3d problem, since every plane that only moves two of the variables is the 2d problem defined before. Hence, it makes sense to solve the 2d problem for these areas. This can be considered initializing as well.

Then, the recurrence relation becomes:

$$
\begin{gather}
dp[i][j][k] = \min\left\{ 
\begin{aligned} & 
dp[i-1][j][k], \\ 
& dp[i][j-1][k], \\ 
& dp[i][j][k-1] 
\end{aligned} 
\right\} + A[i][j][k]
\end{gather}
$$
```python
MaxSurvival(A[1..m, 1..n, 1..p])):
	dp = new 3D array of size [m + 1][n + 1][p + 1]

	dp[1][1][1] = A[1][1][1]

	# 1D init
	for i = 2 to m: 
		dp[i][1][1] = dp[i - 1][1][1] + A[i][1][1] 
	for j = 2 to n: 
		dp[1][j][1] = dp[1][j - 1][1] + A[1][j][1] 
	for k = 2 to p: 
		dp[1][1][k] = dp[1][1][k - 1] + A[1][1][k]

	# 2D init
	for i = 2 to m: 
		for j = 2 to n: 
			dp[i][j][1] = min(dp[i - 1][j][1], dp[i][j - 1][1]) + A[i][j][1] 
	for i = 2 to m: 
		for k = 2 to p: 
			dp[i][1][k] = min(dp[i - 1][1][k], dp[i][1][k - 1]) + A[i][1][k] 
	for j = 2 to n: 
		for k = 2 to p: 
			dp[1][j][k] = min(dp[1][j - 1][k], dp[1][j][k - 1]) + A[1][j][k]

	# 3D fill
	for i = 2 to m: 
		for j = 2 to n: 
			for k = 2 to p: 
				dp[i][j][k] 
				= min(  
					dp[i - 1][j][k], 
					dp[i][j - 1][k], 
					dp[i][j][k - 1] 
				) + A[i][j][k]

	return 0.9^(dp[m][n][p])
```


#### Generalization 3D Runtime

The runtime is $\mathcal{O}(m*n*p)$ which is bound by $O(*n^3)$ where $*n$ is a different n > m n and p.

### Part B 

We can reconstruct the path since we know what the previous value aught to be: 
	the current dp - how many assasins we have at A(i,j,k)

This is exactly the inverse of what we did to find current dp.

We will have 3 choices at each step, but we can select any which is equal to it:

```
i = m 
j = n 
k = p

while not (i == 1 and j == 1 and k == 1):
	print("Starting at:", (i,j,k))
	
	previous = dp[i][j][k] - A[i][j][k]
	if i > 1 and dp[i - 1][j][k] == previous_dp: 
		i = i - 1 
		print("Moved to:", (i, j, k)) 
	else if j > 1 and dp[i][j - 1][k] == previous_dp: 
		j = j - 1 
		print("Moved to:", (i, j, k)) 
	else:
		k = k - 1 
		print("Moved to:", (i, j, k))

print("Starting at:", (i,j,k))
```

q5, q4

## Question 3

### Part A
#### Reasoning

1. The longest box will always be used in the best tower
2. The smallest box will always be used in the best tower
3. We can select either L or W to be sorted. We can then sub-sort same lengths by their widths (double key sorting or two stable merge sorts)

Problem reduces to a version of longest increasing subsequence.
#### Table

We will use dp\[i], where i is a certain box and dp\[i] corresponds to the maximum height that can be achieved when that box is the tallest box in the table.

From LIS, the "length" of the subsequence is replaced by the "height" of the tower.

By filling it up from the largest bases to the smallest, we will have, somewhere in the table (near the end but not necessarily the end) the maximum height achievable.
#### Init

Set every box represented in dp to be equal to it's height (dp\[i] = H\[i])
#### Recurrence

For each box i, we will iterate over previous boxes j where j < i. 

The condition where j < i is not as simple as in LIS, since we need to consider both:
$L[j] \ge L[i] \land W[j] \ge W[i]$ 
and do that for every box (since there could be a path that leads to this box from the same fixed dimension, L, but a "bigger" subdimension, W in our case)

Finally, we can update the best height at i as:
$dp[i] = max(dp[i],dp[j]+H[i])$
#### Pseudo

```python
n = length of L

# This is equivalent to making objects I guess, but follows the 
# constraints of the class
apply a stable mergesort on W, but taking effect also in L and H
apply a stable mergesort on L, but taking effect also in W and H

dp = [n]

for i = 1 to n
	dp[i] = H[i]

for i = 2 to n 
	for j = 1 to i:
		if L[j] >= L[i] and W[j] >= W[i]:
			dp[i] = max(dp[i])
```
#### Runtime

## Question 5

hehe i know this one: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/

