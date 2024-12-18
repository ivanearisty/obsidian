---
tags:
  - DAA
---
## DFS

### Pseudocode

```python
DFS(u): # if it's all connected
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	u.distance = 0
	DFS-visit(u)
		
# we have to switch the above if the graph is not connected:
DFS(G):
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	for all v ∈ V 
		if v.visited = false 
			DFS-visit(v)

DFS-visit(u):
	u.visited = true 
	for each v ∈ Adj[u] 
		if v.visited = false 
			v.parent = u 
			v.distance = u.distance + 1 
			DFS-visit(v)
```

### Runtime

The DFS algorithm marks each vertex as visited only once. 
For each vertex, the algorithm carries out a for loop for each neighbor of v. 
Over all vertices in the graph, this is equivalent to doing a constant amount of work for each edge in the tree. The total runtime is then Θ(V + E).

### Variations
- Problem 3: Back Edge, Cycle detection, Undirected
- Problem 4: With children and preorder printing
- 
## BFS

### Properties
- Discovers all vertices reachable from s
- Computes the shortest distance from s to every vertex in G
- Produces a “breadth-first search tree” with root s that contains all reachable vertices from s
- It is possible to have two different BFS trees for the same graph depending on how we process neighbors 
### Pseudocode
```python
BFS(G,s):
	# Clean
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	for all v ∈ V set v.children = NIL
	# Init
	s.visited = true
	s.distance = 0
	ENQUEUE(G,s)
	# Algo
	while Q is not empty
		u = DEQUEUE(Q)
		for each v in Adj[u]
			if v.visited = false
				v.visited = true
				v.distance = u.distance + 1
				v.parent = u
				u.children.add(v)
				ENQUEUE(G,v)
```

Resultant Tree:
![[Screenshot 2024-12-18 at 4.40.47 AM.jpg | 300]]
### Runtime
- Step 1 runs in O(V)
- Step 2 is O(1)
- Step 3: O(V + E)
	- Each vertex is placed in the queue once = O(V)
	- For loop executes each edge twice O(2E) = O(E)
	- **Total runtime = O(V+E)**

### Variations
#### Using Adjacency Matrix
```python
BFS(G,s):
	# Clean
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	for all v ∈ V set v.children = NIL
	# Init
	s.visited = true
	s.distance = 0
	ENQUEUE(G,s)
	# Algo
	while Q is not empty
		u = DEQUEUE(Q)
		for all v in V # For every vertex
			if Adj[u][v] = 1 # Check where there is an edge
				if v.visited = false
					v.visited = true
					v.distance = u.distance + 1
					v.parent = u
					u.children.add(v)
					ENQUEUE(G,v)
```

> When a node u is dequeued during BFS, the entire row of the adjacency matrix would need to be searched in order to identify the neighbors of u.

Runtime is $\mathcal{O}(V^{2}+V) = \mathcal{O}(V^{2})$

If there are many many edges, like a clique, this approach might be better. Most of the time, for sparse graphs, it's worse.

#### Coloring / BiPartite Graph 

```python
BFS(G):
	# Clean
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	for all v ∈ V set v.children = NIL
	# Init
	s = any vertex in V # pick a starting point
	s.visited = true
	s.distance = 0
	s.color = black # set starting point color
	ENQUEUE(G,s)
	# Algo
	while Q is not empty
		u = DEQUEUE(Q)
		for each v in Adj[u]
			if v.visited = false
				v.visited = true
				# assign colors
				if u.color = black
					v.color = white
				else
					v.color = black
				v.distance = u.distance + 1
				v.parent = u
				u.children.add(v)
				ENQUEUE(G,v)
			else # if we have already visited
				if v.color = u.color
					return false # if we encounter two adjacent nodes of the 
								 # same color, we return false.
	return true
```

#### Alternating color paths and finding a specific vertex
[[Practice Set 12 — Solutions.pdf]] Problem 11
## Topological Sort

### Properties
- Consider only directed acyclic graphs
- 
### Pseudocode
```python
DFS-visit(u) 
	time = time + 1 
	u.visited = true 
	u.start = time 
		for each v ∈ Adj[u]
			if v.visited = false 
				v.parent = u 
				v.distance = u.distance + 1 
				DFS-visit(v) 
		time = time + 1 
		u.finish = time
```
### Runtime
The runtime of DFS is Θ(V + E), and the extra time needed to simply place the vertices in a linked list in the order that they are finished is O(1) per node. Therefore the overall runtime is Θ(V + E).
## Strongly Connected Components (SCC)
### Properties
### Pseudocode

```python
# step 1: usual dfs with timestamps
for each v in V
	if v.visited = false
		DFS-visit(v)
# step 2: create G^t
Copy vertices from V to the set of vertices in G^t
for each edge e = (u, v) in E 
	add edge (v, u) to E^t 
	add vertex u to Adj[v] 
for each v in V # reset all vertices as unvisited. 
	v.visited = false
# sort by decreasing finish times
L = Sort vertices in V by decreasing v.finish
# Run dfs on transpose, every restart is a SCC
for each v in L 
	if v.visited = false 
		DFS-visit-with-children(v) # or something else to get the scc
```
### Runtime
The algorithm above runs a DFS twice: once on G on again on GT . Therefore the total runtime is Θ(V + E)

## MST

### Traits

1. MST is not necessarily unique
2. MST is a tree
3. Any cut edge is in the MST
4. Adding any other edge from E to the MST creates a cycle
5. The lightest-edge across any partition must be in the MST

[[Practice Set 13 — Solutions.pdf]] problem 6:
It cannot contain the edge with maximum weight on the cycle

[[Practice Set 13 — Solutions.pdf]] problem 11:
Distinct weights and needing to be in the cycle



## Prim's Algorithm

### Trait

- Builds MST
- Parent pointers when a tree is added and it remains permanent are the edges of the tree
### Pseudocode
```python
Prim(G,s):
	# Init
	for all v ∈ V set v.d = INF
	for all v ∈ V set v.parent = NIL
	T is a new empty Tree
	s.d = 0
	for all v ∈ V Decrease-key(Q, v, v.d)
	# get minimum-distance item from the queue until the queue is empty
	while Q != Nil
		u = Extract-min(Q)
		for each v in Adj[u]
			if v ∈ Q and v.d > weight(u, v) # Update the distance to v
				Decrease-key(Q, v, w(u, v))
				v.parent = u # Set this node as the child of u
```

### Runtime
**Deletes**
Over the entire course of the algorithm, a vertex is removed from the queue exactly once. Recall that the priority queue carries out a delete in O(log n) time, and in this case n = |V |. Therefore each delete in the priority queue takes time O(log V ). Since there are V vertices, this accounts for a runtime of O(V log V ).
**Key Updates**
The for loop that examines the adjacency list of each vertex examines each edge exactly twice during the entire algorithm - and each examination may carry out a Decrease-key() operation in (taking time O(log V )). This accounts for a total runtime of O(E log V ).
**Total**
Therefore the overall runtime of step 2 is therefore O(E log V + V log V ) = O(E log V ), and thus the runtime of Prim is O(E log V )

### Variations

**With children** [[Practice Set 13 — Solutions.pdf]]

## Kruskal’s algorithm

## Dijkstra’s algorithm

## Bellman Ford

## Care

