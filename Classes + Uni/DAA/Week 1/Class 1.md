---
tags:
  - DAA
---
### Problem 1:
\# Comparisons: n-1 is the best case scenario of **comparisons**
\# Swaps: 0 is the best case scenario of **swaps**

Worst cases are $\frac{(n-1)*n}{2}$ 
Since every comparison results in a swap, this  is also applicable for swaps

> When counting comparisons in a sorting algorithm, you only count comparisons between elements of the input

Do whatever you can do to justify your goal. 

For example if you want to prove linear. Then you do $T(n) \leq x\times n$

I've heard that insertion sort is really good for when arrays are almost sorted, bubble feels good too, can you help articulate why insertion sort is better for that use case?