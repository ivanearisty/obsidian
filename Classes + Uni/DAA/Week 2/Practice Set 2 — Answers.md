---
tags:
  - DAA
---
# Notes

- Problem 1
	- **Assert:** **IF** $T(n)$ is $1\times T\left( \frac{n}{3} \right) + cn$, **THEN** the *one* is because we do the recursive step *once*
- Problem 2:
	- I need 

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

$T(n) = 1\times T\left( \frac{n}{3} \right) + \frac{2n}{3}$ **WRONG**

I forgot the **C**:

$T(n) = 1\times T\left( \frac{n}{3} \right) + \frac{c\times2n}{3}$

Since the latter part is in terms of some n, we can simplify to:

$T(n) = 1\times T\left( \frac{n}{3} \right) + cn$

**Reasoning:** We recursively iterate over a third of the array, we only do this one time in the loop. At the level, we execute stuff for 2 thirds of the array

Master Method:
$$
\begin{gather}
T(n) = 1\times T\left( \frac{n}{3} \right) + cn\\
f(n) = cn \\
\\
k = \log_{b}(a) \\
a = 1 \\
b = 3 \\
k = \log_{3}(1) = 0 \\
n^{k} = n^{0} = \mathcal{O}(1) \\
\\
f(n) \gg n^{k} \rightarrow T(n) = f(n) = \Theta(n)
\end{gather}
$$

## Problem 2 
### Question

![[Screenshot 2024-10-05 at 11.34.58 PM.jpg]]

```java
BSearch(A, s, f, k):
	if( s < f):
		q = (s + f) / 2 // get the midpoint
		if A[q] == k:
			return true
		else if A[q] < k:
			return BSearch(A, q+1, f, k)
		else:
			return BSearch(A, s, q-1, k)
	else if A[s] == k return true
	else return false
```

The T(n) is as such because we are performing constant amount of actions, non-dependent on the input size, at every step, and perfoming a single recursive call on half of the array as we look for the k element, shrinking the subarray size by its half on each consecutive step

