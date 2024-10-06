---
tags:
  - DAA
---
# Notes

## Problem 1


# Practice Set 2
## Problem 1
### Question

![[Screenshot 2024-10-05 at 10.15.16 PM.jpg]]

### Answer

Algorithm in english:

If the subarray has more than 1 element:
	the midpoint is two thirds of the way there
	then, from 1 more than the midpoint to the end, print everything
	do it again from the start to the midpoint
in the case that there is only one element in this array, print it immediately and end...


A = \[1,2,3...12] and s = 1 and f = 12.

Algorithm:

Run 1:
s = 1, f = 12
$(1\times 2 + 12) = 14 \rightarrow \frac{14}{3} \rightarrow 4.\text{something} \rightarrow \text{ rounding down} \rightarrow 4$
q = 4 
loop: i = 5

Run 2: 
s = 1, f = 4
$(1\times 2 + 4) = 6 \rightarrow \frac{6}{3} \rightarrow 2$
q = 2
loop i = 3

Run 3:
s = 1, f = 2
$(1 \times 2 + 2) = 4 \rightarrow \frac{4}{3} \rightarrow 1.\text{something} \rightarrow \text{rounding down} \rightarrow 1$
q = 1
i = 2 

Run 4:
s = 1, f = 1
base case.

Output: 
5, 6, 7, 8, 9, 10, 11, 12, 3, 4, 2, 1

$T(n) = 1\times T\left( \frac{n}{3} \right) + \frac{n}{2}$

**Reasoning:** We recursively iterate over a third of the array, we only do this one time in the loop. 