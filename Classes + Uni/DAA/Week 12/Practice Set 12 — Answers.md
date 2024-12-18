---
tags:
  - DAA/Week12
---
## Problem 1
**Topological Sort**
![[Topo Sort 1.drawio.svg]]

**Strongly Connected Components**
![[SCC.drawio.svg]]

## Problem 2

DFS on an undirected graph can't have any forward edges because their non-directionality would make them both a forward and back edge (a cycle). A cross edge would also lead to a cycle. DFS doesn't work if there are cycles.

## Problem 3
```python
DFS-cycle(u):
	dummy = new Node
	add u to the adjencency list of dummy
	return DFS-cycle(u, ) 

DFS-cycle(u, p) 
	u.visited = true
	For each v ∈ Adj [u]
		If v.visited = false 
			v.parent = u 
			v.distance = u.distance + 1 
			DFS-cycle(u)
	
```