## Question 1: Complexity Classes

![[Screenshot 2024-12-16 at 5.26.12 PM.jpg]]

**Travelling Salesman**
TSP is NP-complete.
It is possible that there exists a poly time algorithm if P = NP.
Therefore it is possible.

**N x N chess**
n x n chess is in EXP
n x n chess is not in NP
Therefore it is not possible.

**The Halting Problem**
The halting problem is undecidable
Therefore it is not possible.

**Vertex Cover**
VC is NP-complete.
It is possible that there exists a poly time algorithm if P = NP.
Therefore it is possible.

**Integer Factorization**
Integer Factorization is in NP, but not NP complete.
It is possible that there exists a poly time algorithm if P = NP.
Therefore it is possible.

**Knapsack Problem**
This problem is a decision problem that looks to be NP-complete
It is possible that there exists a poly time algorithm if P = NP.
Therefore it is possible.

## Question 2

Below are a list of runtimes for decision problems. For each runtime, determine if the corresponding problem is in P or EXP or both or neither.

First thing to realize is that: If a problem is in P, then it is also in EXP.

- $T(n) = (\log n)^{6}$
	- This is in P and EXP
- $T(n) = \log(n^{6})$
	- This can be reduced to $\log n$ by using our log rules. 
- $T(n) = (6n)^{6}$ 
	- This is P and EXP
- $T(n) = n + 1000$
	- This is P and EXP
- $T(n) = n^{n}$ 
	- This is in EXP
- $T(n) = 3^{n}+n^{6}$
	- This is in EXP
- $T(n) = 3^{n^{2}} + 6$
	- This is in EXP

## Question 3

For each problem below, determine whether or not there is a known polynomial-time algorithm for solving the problem. You must justify why there is **no known poly-time algorithm OR identify a poly-time procedure that solves the problem.**

### A

Consider a the political meeting which has **n** participants. There are **m** issues which are to be discussed at the meeting. Each participant must list **exactly two issues** that interest them. The organisers would like **select at most k issues**, so that each person is **interested in at least one of the selected issues**.

$$
\begin{gather}
n = [1, 2, 3, \dots, n] \\
m = [1, 2, 3, \dots, m] \\
p = [\{n_{1},m_{a}\}, \{n_{1},m_{b}\}, \{n_{2},m_{a}\}, \dots , n\times_{2}] \\
k \subseteq m
\end{gather}
$$

We can create a graph where the vertices are the issues in m.
![[Screenshot 2024-12-16 at 8.21.14 PM.jpg]]

And then we can draw edges between issues to show that a person, n, has selected those two issues:
![[Screenshot 2024-12-16 at 8.22.57 PM.jpg]]

Now, we have to select k vertices such that every edge is incident to at least one of the selcted vertices.

This formulation is now analogous to vertex cover, and it is NP-complete, so, no known poly-time algorithm exists.

### B

A graph **G** has **n** vertices and **m** edges. The problem is to determine if **G** contains a simple cycle of length at least 3.

This problem reduces to finding a cycle with the DFS algorithm.

A cycle, by definition, requires there to be at least 3 edges, so we don't really have to worry about the cases of 2 or 1.

Since DFS is a poly-time algorithm, we are good.

### C

A graph **G** has **n** vertices and **m** edges. The problem is to determine if **G** contains a simple cycle of length at least k.

