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
DFS-cycle(u) 
	u.visited = true
	for each v ∈ Adj [u]
		if v.visited = false 
			v.parent = u 
			v.distance = u.distance + 1 
			if DFS-cycle(v) = true
				return true
		else 
			if v.parent != u
				return true
	return false
```

## Problem 4

```python
DFS-visit(u) 
	u.visited = true
	for each v ∈ Adj [u]
		if v.visited = false 
			v.parent = u
			u.add(v)
			v.distance = u.distance + 1 
			DFS-cycle(v)
```

```python
PrintTree(u)
	print(u)
	for each v ∈ u.children:
		PrintTree(u)
```

## Problem 5

## Problem 6

