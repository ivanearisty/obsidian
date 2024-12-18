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
Valid:
![[Screenshot 2024-12-18 at 1.15.19 AM.jpg]]
![[Screenshot 2024-12-18 at 1.17.22 AM.jpg]]
Not valid:
![[Screenshot 2024-12-18 at 1.15.56 AM.jpg]]
![[Screenshot 2024-12-18 at 1.16.59 AM.jpg]]

Insight:
Cycles are allowed, but they have to be of an even number of nodes, which means colors have to be iterating.

When we detect a cycle, if it's the same as the color that we set this node to be, then it's not possible.

```python
DFS-color(u)
	for all v in G v.color = 'NONE'
	return DFS-color(u, 'WHITE')

DFS-color(u, state)
	# set color
	if state = 'WHITE'
		u.color = 'BLACK'
	else 
		u.color = 'WHITE'
		
	for each v ∈ Adj [u]
		if v.color == 'NONE' # if not visited visit
			v.parent = u
			if DFS-cycle(v, u.color) = false
				return false
		else 
			if v.color == u.color
				return false
	return true
```

## Problem 8

