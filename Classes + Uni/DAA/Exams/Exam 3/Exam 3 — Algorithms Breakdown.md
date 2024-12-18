---
tags:
  - DAA
---
## DFS


## BFS

### Properties
- Discovers all vertices reachable from s
- Computes the shortest distance from s to every vertex in G
- Produces a “breadth-first search tree” with root s that contains all reachable vertices from s
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
	ENQUEUE
```
### Runtime

### Variations
## Topological Sort

## Strongly Connected Components (SCC)