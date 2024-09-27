---
tags:
  - DAA
---
### Divide and Conquer

divide: break up problems into subproblems
conquer: solve the problems recursively 
combine: use solutions to subproblem to solve original

Merge Sort:![[Screenshot 2024-09-27 at 5.19.26 AM.jpg]]

Three methods:
1. Recursion tree
2. Substitution/Induction
3. Master method

### Recursion Tree

Represent all the steps of the recursive algorithm in a tree.

![[Screenshot 2024-09-27 at 5.22.29 AM.jpg]]
->
![[Screenshot 2024-09-27 at 5.22.55 AM.jpg]]

![[Screenshot 2024-09-27 at 5.23.39 AM.jpg]]

Adding things:

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