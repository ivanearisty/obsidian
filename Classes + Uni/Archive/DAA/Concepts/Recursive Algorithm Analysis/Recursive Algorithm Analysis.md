---
tags:
  - DAA/Week2
---
## MergeSort
### Divide and Conquer

divide: break up problems into subproblems
conquer: solve the problems recursively 
combine: use solutions to subproblem to solve original

Merge Sort:![[Screenshot 2024-09-27 at 5.19.26 AM.jpg]]

## Methods
### Recursion Tree

Represent all the steps of the recursive algorithm in a tree.

![[Screenshot 2024-09-27 at 5.22.29 AM.jpg]]
->
![[Screenshot 2024-09-27 at 5.22.55 AM.jpg]]

![[Screenshot 2024-09-27 at 5.23.39 AM.jpg]]

Adding things:
![[Screenshot 2024-11-24 at 5.11.43 PM.jpg]]
![[Screenshot 2024-11-24 at 4.58.38 PM.jpg|300]]
![[Screenshot 2024-09-27 at 5.24.57 AM.jpg]]

The number of levels in a tree where we divide by 2 is $\log_{2}(n)$

> If we divided by 4 it would be log base 4

![[Screenshot 2024-09-27 at 5.25.47 AM.jpg]]

### Substitution Method

Assume we know the runtime of the subproblem and plug that in.

Used when we have a guess or idea of what the runtime is.

![[Screenshot 2024-09-27 at 5.36.14 AM.jpg]]
![[Screenshot 2024-09-27 at 5.36.47 AM.jpg]]
inductive step we do replacement: ![[Screenshot 2024-09-27 at 5.37.57 AM.jpg]]
Combine and simplify:
![[Screenshot 2024-09-27 at 5.39.22 AM.jpg]]
Facts used: 
	Cancelled the 2
	log with a fraction is the log of the top - log of the bottom
	log_2(2) = 1
	common factored an n from rhs

We realize that we can achieve our goal if we get the right constants:
![[Screenshot 2024-09-27 at 5.41.53 AM.jpg]]

#### Substitution example 2
![[Screenshot 2024-09-27 at 5.44.41 AM.jpg]]
We can guess that this is $\mathcal{O}(n)$ since we can replace the T multiple times and see how it behaves.

![[Screenshot 2024-09-27 at 5.46.06 AM.jpg]]

We are done here because we can just assume that d is bigger than c.
### Master method

![[Screenshot 2024-09-27 at 5.47.29 AM.jpg| 400]]

![[Screenshot 2024-09-27 at 5.58.58 AM.jpg| 400]]

Case 3:
![[Screenshot 2024-09-27 at 6.01.20 AM.jpg | 300]]

Case 2: 
![[Screenshot 2024-09-27 at 6.03.33 AM.jpg | 300]]
