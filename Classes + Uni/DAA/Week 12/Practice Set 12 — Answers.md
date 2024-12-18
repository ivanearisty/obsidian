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

If you start bfs at the same node, there is no way that two different trees exist.

DFS on an undirected graph can't have any forward edges because their non-directionality would make them both a forward and back edge (a cycle). A cross edge would also lead to a cycle. DFS doesn't work if there are cycles.