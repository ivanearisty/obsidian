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

Given the input and a potential solution of issues J we can verify the solution in polynomial time as such:
1. Check every person's list of issues
	1. Check if each list has at least 1 selected issue from J
2. Check that the total number of issues, J.length, is less than or equal to k

The time it takes for verification is polynomial since we do a triple for loop through every person, through their list, and through every issue selected. So it's O(n^3) where n is greater than all the input sizes.

Step 2: Reduction

An instance of vertex cover consists of a graph G = (V,E) and an integer k. 

We will convert this into an instance of question 4.

Each edge becomes a person.
Each vertex becomes an issue.
The value of k stays the same.
For each edge $e \in E$ we let the two endpoints be the two issues that they are allowed to select.
In other words, for e = (u, v), person e is interested in issues u and v.

We now have created an instance of question 4.

We will now verify that the reduction is valid:
1 If there is a vertex cover of size ≤ k, then it is possible to select ≤ k issues:

Suppose G has a vertex cover called set C of size ≤ k. Each edge in G is adjacent to at least one vertex in C. Let the vertices in C correspond to the selected issues in question 4. Since each edge e = (u,v) in G corresponds to a person in question 4 with interests in issues u and v, then we know that either u or v is in C, and therefore the person e has interest in at least one issue.

2 If there is NO vertex cover of size ≤ k, then it is NOT possible to select ≤ k issues:

If it is NOT possible to select k vertices to cover all edges, then no set of k issues would interest  all people. This is because each issue corresponds to a vertex, so if the issues had interest from all people, this would mean it corresponded to a vertex cover.

## Question 5

![[Screenshot 2024-12-16 at 9.41.00 PM.jpg]]

Step 1: show that question 5 is in NP.
We must show that given the input, we can verify if the solution is true.

Given the Graph G and a sequence of vertices S from v1 to vn where each v is a distinct vertex:
1. We verify that v1 is in S (O(S))
2. We verify that all vertices in S appear exactly once in the sequence (O(V^2))
3. We verify that all vertices in from G are present in S (O(VxG(V)))
4. For every pair $(v_{i},v_{i+1})$ in the sequence, we verify that the edge $e(v_{i},v_{i+1}) \in G$  (O(S))

The verification is polynomial since we are performing linear time operation checks on every step 

Step 2: Reduction

We will transform from hamiltonian path

We are given a graph G = (V,E) and the vertex S

We will convert this into an instance of question 5.
First we will add a new vertex S
Then we will connect S to all vertices in G

S is going to be designated as the starting vertex in question 5.

Since S is connected to all vertices in S
