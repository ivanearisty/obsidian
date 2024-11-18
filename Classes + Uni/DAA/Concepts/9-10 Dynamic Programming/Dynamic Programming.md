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
## Palindromic Subsequence
## Weight Set
## Max Weight Set
## Min Stops
## Transaction
## Survival
## Fib

[[Practice Set 9 — Solutions.pdf]] q6 recursive vs dp