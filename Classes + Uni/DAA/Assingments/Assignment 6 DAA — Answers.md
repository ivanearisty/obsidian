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

If we set k = n, we are asking the exact same question the hamiltonian cycle tries to solve.

Hamiltonian cycle does a Hamilton Path which is:
	A Hamilton Path is a simple path in G that visits every vertex exactly once.

So, again, if we set that k to be the maximal amount for this cycle (or that some k >= 1), then we are asking the hamiltonian cycle question.

Since HC is NP-complete, no solution that is poly-time can exist for this algo.

### D

A **directed graph G** contains **n vertices** and **m edges**. The problem is to determine if there is path from **vertex s to every other vertex in the graph**.

We can just run a SSSP algorithm, like Dijkstra, from vertex s. If after running the algorithm the exists a vertex v inn G such that v.d = INF, then we return false, if not we return true.

Since Dijkstra is in P, then we have a poly time algo.

(If weights can be negative we run some other SSSP)
### E

A **directed graph G** contains **n vertices** and **m edges**. The problem is to determine if there is path from **vertex s to and from every other vertex in the graph**.

For this algorithm, we can do the above for every vertex v $\in$ G. 

We first would run SSSP on s to determine if the first condition is true.

Then, we would run SSSP on every vertex $u \in G \to u \neq v$ and check if v's v.d = INF on any iteration. 

This time, we are running SSSP n times.

This will make the runtime n x T(n), which would be big O of $n^{2} \times n=n^{3}$ 

This runtime is definitely bigger, but still poly.

(After doing below I realized BFS might also work here but the above does produce an upper bound that would allow me to conclude my conclusion \[wow] )
### F

A directed graph G contains n vertices and m edges. The graph is not weighted. The problem is to determine if there is path from vertex s to every other vertex in the graph, where the number of edges in the path must be at most k.

I am thinking of running BFS here.

If the graph is not weighted, we would just run a BFS and if any node has a final distance attribute > k we return false.

If not we return true.

This is poly because it's based on BFS and running a check of n vertices at the end.
### G

A directed graph contains n vertices and m edges. The problem is to determine if G is a DAG.

Determining if something is a DAG is as simple as running DFS to confirm if there are any back edges.

If we have any back edges we return false, if not true.

This is poly because it's based on DFS.

### H

An undirected graph has weighted edges. The problem is determine if there is a path that starts at vertex s and travels to vertex t where the sum of the edge weights is less than k.

I am a bit torn. 

We can run DJ if there are no negative weights.

At the end of DJ, we can check t.d and compare it to k to return true or false.

The above is poly.

However, in an undirected graph, if we have negative weights, we can't run bellman ford.

Think about it, an undirected graph is a directed graph where every edge is replaced with a directed edge to and from it's source to and from it's end.

So, the above would have negative weight cycles by definition.

Hence, if we have negative weights, and carefully select a specific set of edge weights and a k value, the problem actually becomes hamiltonian cycle.

Since our algorithm would have to solve for this situation, then we know our problem is at least as hard as HC.

Since we know HC is NP, we would not have a poly time algo for this problem.

### J

An undirected graph has weighted edges. The problem is determine if there is a path that starts at vertex s and visits all vertices exactly once, where the sum of the edge weights is less than k.

This problem can reduce to the above dilema from H.

Imagine we setup the problem such that:
- k = n - 1
- every weight = 1

Visiting all edges in this scenario is hamiltonian path, again, so we can't possible have a poly time solution.

## Question 4

![[Screenshot 2024-12-16 at 9.40.44 PM.jpg]]

Prove that the following problem is NP-complete using a reduction from either : Vertex Cover, Inde- pendent Set, Dominating Set, or Clique. Recall the two steps that are necessary in order to show that a problem is NP complete. A set of n people attend a political meeting, where m issues are to be discussed. Each person attending has created a sublist of issues (selected from the main set of m issues) that they are most interested in. The organisers would like to select at most k issues so that each person is interested in at least one of the selected issues. The problem is to determine if it possible or not.


Step 1: show that question 4 is in NP.
We must show that given the input, we can verify if the solution is true.

Given the input and a potential solution of issues I we can verify the solution in polynomial time as such:
1. Check 


## Question 5

![[Screenshot 2024-12-16 at 9.41.00 PM.jpg]]