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
If the current rod size is greater than the target rod size, our rod is too big.
#### Pseudo Code
#### Runtime
This runtime is $\mathcal{O}(n^{2})$ where n is the size of the rod in question. 
This is because for every rod size, we are evaluating it against all previous combinations it could've made.


q5, q4