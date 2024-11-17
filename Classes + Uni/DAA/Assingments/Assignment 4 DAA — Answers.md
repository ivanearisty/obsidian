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
	for j = 1 to i - 1:
		if L[j] >= L[i] and W[j] >= W[i]:
			dp[i] = max(dp[i])

return max(dp)
```
#### Runtime

this is O(n^2) where n is the amount of boxes, because we iterate through every box for every smaller than it.

### Part B

Notice that here the indexes are mixed around; however, I do not believe you should take points of for this, since it's assumed that we can just do the above by creating a copy of each of the arrays, instead of sorting the original arrays around. Also, a fourth array called index could have been created at the start of the above procedure. Please consider this, thanks.

```python
n = length of L
predecessor = [n]

for i = 2 to n:
	for j = 1 to i - 1:
		if L[j] >= L[i] and W[j] >= W[i] and dp[i] == dp[j] + H[i]:
			predecessor[i] = j
			break;

m = index of max(dp) in predecessor
s = new stack

while m != 0:
	s.push(m)
	m = predecessor[m]

while s is not empty:
	print(s.pop())
```

## Question 4
#### Table

For simplicity, assume and map n to d, m to b, and p to c.

The table dp will give the probability of survival given a population (d,b, c).
This survival will be of the form (i, j, k) where i, j and k are probabilities of each population, d, b, c, surviving.
where d is the population of dragons, b is boars,  c is coyotes.

for 1, 1, 1 population:
$\frac{1}{3}p(0,1,1) + \frac{1}{3}p(1,1,0) + \frac{1}{3}p(1,0,1)$

We want to work out the probabilities of survival at A(i,j,k)

P(d, b, c) = Probability of dragon meets a boar + probability of boar and coyote, and dragon and coyote

So, for example, what is the survival rate for a population:
5, 1, 2.
d, b, c

The probability of a dragon meeting a dragon is:
ways dragons can meet = 5 choose 2
and then you divide by number of possible for two people to meet 8 choose 2

However, we want number of possible meetings between different species in the denominator, which is:

(D meets a D) = number of dragons choose 2
(B meets a B) = number of boars choose 2
(C meets a C) = number of coyotes choose 2
(total meetings) = number of animals choose 2
relevant meetings = total meetings - dragon meets dragon - boar meets boar - coyote meets coyote

(D meets a B) = number of dragons * number of boars / relevant meetings
(D meets a C) = number of dragons * number of coyotes / relevant meetings
(C meets a B) = number of coyotes * number of boars / relevant meetings

And in the table, if we ask what is the survival rate for 5, 1 and 2 population

P\[5,1,2] = 5/17 x P\[4,1,2] + 10/17 x P\[5,1,1] + 2/17 x P\[5,0,2]

P\[d,b,c] = 
(d x b / relevant meetings) x P \[d-1,b,c] +
(d x c / relevant meetings) x P \[d,b,c-1] + 
(c x b / relevant meetings) x P \[d,b-1,c]
#### Initialization

We have some base cases where only one species and two species are left.

Since these cases are both deterministic, we have:

If d>0 and b=0 and c=0: \[1, 0, 0]
If d=0 and b>0 and c=0: \[0, 1, 0]
If d=0 and b=0 and c>0: \[0, 0, 1]

If d=0 and b>0 and c>0: Coywolf will kill Boar, so \[0, 0, 1]
If d>0 and b=0 and c>0: Dragon will kill Coywolf, so \[1, 0, 0]
If d>0 and b>0 and c=0: Boar will kill Dragon, so \[0, 1, 0]
#### Recurrence Relation

From some given state, we make recursive calls to compute the probabilities for the next possible states after each interaction.

This will give us a bottom up solution to the first state inputted.

If we have already computed some probability, then we look it up and save a lot of time, 
if not, we recursively calculate what the some state will be and assign it the respective probability in our state.
#### Pseudo code

```python
init(d, b, c):
	dp = new 3d array [d+1,b+1,c+1] # tbh im just giving myself space in case there's something rare i didn't consider
	return p(d,b,c)
	
P(d, b, c):
	# insta memo step
	if (d, b, c) in dp: 
		return dp[(d, b, c)]

	# degen step
	if d == 0 and b == 0 and c == 0: 
		dp[(d, b, c)] = [0, 0, 0] 
		return dp[(d, b, c)]

	# singular species step
	if d > 0 and b == 0 and c == 0: 
		dp[(d, b, c)] = [1, 0, 0] 
		return dp[(d, b, c)]
	if d == 0 and b > 0 and c == 0: 
		dp[(d, b, c)] = [0, 1, 0] 
		return dp[(d, b, c)]
	if d == 0 and b == 0 and c > 0: 
		dp[(d, b, c)] = [0, 0, 1] 
		return dp[(d, b, c)]

	# double species step
	if d > 0 and b > 0 and c == 0: 
		dp[(d, b, c)] = [0, 1, 0] 
		return dp[(d, b, c)]
	if d == 0 and b > 0 and c > 0: 
		dp[(d, b, c)] = [0, 0, 1] 
		return dp[(d, b, c)]
	if d > 0 and b == 0 and c > 0: 
		dp[(d, b, c)] = [1, 0, 0] 
		return dp[(d, b, c)]

	# triple species recur step 
	# possible meaningful interations
	total = (d * b) + (d * c) + (b * c)

	# probability calc
	P_db = (d * b) / total 
	P_dc = (d * c) / total 
	P_bc = (b * c) / total

	# recursive step
	dp_db = compute_dp(d - 1, b, c, dp)
	dp_dc = compute_dp(d, b, c - 1, dp)
	dp_bc = compute_dp(d, b - 1, c, dp)

	# memoization
	dp[(d, b, c)] =
		P_db * dp_db +
		P_dc * dp_dc +
		P_bc * dp_bc

	return dp[(d, b, c)]
```
#### Runtime

Runtime is bound by n^3 if n^3 also binds the animals, but, for completeness, $\mathcal{O}(d\times b\times c)$ is the actual time complexity, for dragons, boars and wolfs.

The reason why is because there are $d \times b \times c$ probabilities out there. By using memoization, we keep these probabilities in memory and save a lot of recalculation.

The probabilities that are low in people or pretty close to die at a base case, like 2, 2, 2 or 1, 5, 2, have very short recursion trees.

However, just like something like fib, for massive probabilities you end up with a huge increase in tree size and redundant calculation.
## Question 5

hehe i know this one https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
#### Table

We create a maximum profit table that will hold the maximum profit value for any day.

We have $dp[i][j][k]$ (new k btw) where i is the current day, j is whether we buy or sell at this day, and k is the remaining number of transactions we can perform after this.
#### Init

we have some base cases: 
(k is number of transactiosn here)
Case 1:
if k = 0 then we have no transactions 
if n <= 1 then we have no transactions because having only 1 day to buy and sell makes no money

Case 2:
if 2k >= n then we you can perform transactions on every day, so we sum up all positive differences.

We can initialize $dp[i][j][0]$ s to 0 since we would have no transactions left.
#### Recurrence

If j = 0, then we can buy on this day:
hence dp\[i]\[0]\[k] = $max(dp[i+1][0][k], -c[])$

#### Pseudo
#### Runtime
We have a O(n\*k) runtime because we iterate over a 



