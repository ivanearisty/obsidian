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
## Strongly Connected Components (SCC)
### Properties
### Pseudocode
### Runtime

## MST

## Prim's Algorithm

## Kruskal’s algorithm

## Dijkstra’s algorithm

## Bellman Ford