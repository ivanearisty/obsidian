## Rods
### Base

[[dp1.pdf]]
![[Screenshot 2024-11-17 at 7.24.14 PM.jpg]]
s array to keep track of best solution is also here
### Ways to Cut Rods CountCuts(n)

Question 2 [[Practice Set 9 — Solutions.pdf]]
### Cutting rods with diminishing piece sizes

[[Assignment 4 DAA — Solutions.pdf]] question 1a

### WalkThrough
[[Practice Set 9 — Questions.pdf]] q5.2
![[Screenshot 2024-11-18 at 12.36.28 PM.jpg]]
## Toll

Getting from point a to point b on a 3d grid by minimizing the amount of tolls we take

Question 4 [[Practice Set 9 — Solutions.pdf]]
## Longest Increasing Subsequence
[[Practice Set 9 — Solutions.pdf]]
Q7

Notice that problem 7 where we care about maximizing stop value

```python
Function LIS_Recursive(H[], k, memo)
    # Base case: If k = 1, LIS ending at k is 1 (single element is the subsequence)
    if k == 1:
        return 1

    # If the result is already computed, return it
    if memo[k] is not EMPTY:
        return memo[k]

    # Initialize max_length for the LIS ending at index k
    max_length = 1

    # Loop over all elements before k
    for i = 1 to k - 1:
        if H[i] < H[k]:
            # Recursively calculate LIS ending at i
            current_length = LIS_Recursive(H, i, memo)
            # Update max_length if including H[k] gives a longer LIS
            if current_length + 1 > max_length:
                max_length = current_length + 1

    # Store the result for LIS ending at index k
    memo[k] = max_length
    return max_length

Function LIS(H[])
    n = length of H
    Initialize memo[1...n] to EMPTY
    max_lis = 0

    # Find the LIS for each ending position and track the overall maximum
    for k = 1 to n:
        max_lis = max(max_lis, LIS_Recursive(H, k, memo))

    return max_lis

Function LongestIncreasingSubsequence(H[])
    n = length of H
    Initialize L[1...n] to 1  # Array to store LIS lengths
    Initialize P[1...n] to -1  # Array to store predecessors for reconstruction
    max_length = 1
    max_index = 1

    # Step 1: Fill the table L[] from left to right
    for k = 2 to n:
        max = 1
        for i = 1 to k - 1:
            if H[i] < H[k]:
                if L[i] + 1 > max:
                    max = L[i] + 1
                    P[k] = i  # Update predecessor
        L[k] = max
        if L[k] > max_length:
            max_length = L[k]
            max_index = k

    # Step 2: Reconstruct the LIS
    LIS = []
    current_index = max_index
    while current_index != -1:
        append H[current_index] to LIS
        current_index = P[current_index]
    Reverse LIS  # To get the LIS in correct order

    Return LIS


```
## Longest Common Subsequence
[[Practice Set 9 — Solutions.pdf]] Q 5.1
![[Screenshot 2024-11-18 at 12.26.06 PM.jpg]]
[[dp2.pdf]]![[Screenshot 2024-11-17 at 7.52.03 PM.jpg]]
## Palindromic Substring

[[dp3.pdf]]
## Palindromic Subsequence

[[dp3.pdf]]
## Weight Set

[[Practice Set 10 — Solutions.pdf]] q3
![[Screenshot 2024-11-18 at 3.52.15 PM.jpg]]
## Max Weight Set

[[Practice Set 10 — Solutions.pdf]] q4

![[Screenshot 2024-11-18 at 4.59.14 PM.jpg]]

## Combo Above

### 1. Subset-Sum Problem
#### Attributes:
- **Goal:** Determine if there exists a subset of weights $w[1 \ldots n]$ whose total weight equals $T$.
- **Table Definition:** $M[i, j]$
  - $M[i, j] = \text{True}$ if a subset of weights $w[1 \ldots i]$ can sum to $j$, otherwise $\text{False}$.
- **Table Dimensions:** $n \times T$ (items by target sum).
#### Recurrence Relation:
- If $w[i] > j$:
  $$
  M[i, j] = M[i-1, j]
  $$
- Otherwise:
  $$
  M[i, j] = M[i-1, j] \, \text{OR} \, M[i-1, j-w[i]]
  $$
#### Initialization:
- $M[i, 0] = \text{True}$: Any subset can sum to $0$ by selecting no items.
- $M[0, j] = \text{False}$: No items can sum to $j > 0$.

#### Runtime:
- **Time Complexity:** $O(n \cdot T)$
- **Space Complexity:** $O(n \cdot T)$

---

### 2. Knapsack Problem
#### Attributes:
- **Goal:** Find the subset of weights $w[1 \ldots n]$ with maximum value $v[1 \ldots n]$ and total weight at most $T$.
- **Table Definition:** $V[i, j]$
  - $V[i, j]$: Maximum value achievable using weights $w[1 \ldots i]$ without exceeding total weight $j$.
- **Table Dimensions:** $n \times T$ (items by capacity).

#### Recurrence Relation:
- If $w[i] > j$:
  $$
  V[i, j] = V[i-1, j]
  $$
- Otherwise:
  $$
  V[i, j] = \max(v[i] + V[i-1, j-w[i]], V[i-1, j])
  $$

#### Initialization:
- $V[i, 0] = 0$: Maximum value is $0$ if the capacity is $0$.
- $V[0, j] = 0$: Maximum value is $0$ if there are no items.

#### Runtime:
- **Time Complexity:** $O(n \cdot T)$
- **Space Complexity:** $O(n \cdot T)$

---

### **Comparison:**
| Attribute                 | Subset-Sum                | Knapsack                 |
|---------------------------|---------------------------|--------------------------|
| **Goal**                  | Determine existence of subset summing to $T$. | Maximize subset value without exceeding weight $T$. |
| **Table Meaning**         | $M[i, j]$: True/False if subset exists. | $V[i, j]$: Maximum value achievable. |
| **Recurrence Relation**   | $\text{OR}$ condition for subset inclusion/exclusion. | $\max$ for value inclusion/exclusion. |
| **Initialization**        | $M[i, 0] = \text{True}, M[0, j] = \text{False}$ | $V[i, 0] = 0, V[0, j] = 0$ |
| **Runtime**               | $O(n \cdot T)$       | $O(n \cdot T)$       |
## Min Stops

[[Practice Set 10 — Solutions.pdf]] q5

## 
## Transaction

HW
## Survival

HW
## Fib

[[Practice Set 9 — Solutions.pdf]] q6 recursive vs dp

LIS vars:

### Variation 2: Maximize Prize with Limited Rest Stops

The hiker can only rest at **at most k stops** while maximizing the prize. The additional constraint ensures the solution includes no more than kkk stops.
#### Pseudocode

```python
Input:
  A[1..n]  - Altitudes of the stops
  P[1..n]  - Prize money at the stops
  k         - Maximum number of stops allowed

Output:
  Maximum prize money with at most k stops
  List of stops corresponding to the maximum prize

Step 1: Initialize the DP table
  H[1..n][1..k] = 0      // Maximum prize for each stop and stop count
  Prev[1..n][1..k] = 0   // Previous stops in the optimal sequence
  H[1][1] = P[1]         // First stop contributes its prize

Step 2: Fill the DP table
  for i = 2 to n:
    for j = 1 to k:       // Iterate over the number of stops
      max_prize = H[i][j]  // Start with the current prize
      Prev[i][j] = 0
      for m = 1 to i-1:
        if A[m] < A[i] and j > 1:  // Ensure increasing altitude and valid stop count
          if H[m][j-1] + P[i] > max_prize:
            max_prize = H[m][j-1] + P[i]
            Prev[i][j] = m
      H[i][j] = max_prize

Step 3: Find the index of the maximum prize for k stops
  max_index = 1
  for i = 1 to n:
    if H[i][k] > H[max_index][k]:
      max_index = i

Step 4: Backtrack to find the stops
  stops = []
  current_k = k
  while max_index != 0 and current_k > 0:
    stops.append(max_index)
    max_index = Prev[max_index][current_k]
    current_k -= 1
  stops.reverse()

Return:
  Maximum prize: max{H[1..n][k]}
  List of stops: stops

```