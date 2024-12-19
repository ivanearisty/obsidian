---
tags:
  - DAA
---
# iae225 - Exam Writeup

I acknowledge that my submitted Exam work is entirely my own. I have read and am in accordance with the Student Code of Conduct policy of NYU Tandon and fully accept the consequences of breaching the above instructions. 
Name: Ivan Aristy
Signature: Ivan Ernesto Aristy Eusebio

## Question 1

![[Screenshot 2024-12-18 at 5.58.44 PM.jpg]]

Order:
AB, AD
BC, BD, BE
CE
DC
EB, ED

![[Screenshot 2024-12-18 at 6.03.08 PM.jpg]]
Show:
- distance attribute
- parent attribute
- current edges of SSP
- no changes

Init:
![[Screenshot 2024-12-18 at 6.05.49 PM.jpg]]

V-1 iterations:

Iteration 1:
AB
![[Screenshot 2024-12-18 at 6.08.50 PM.jpg]]
AD
![[Screenshot 2024-12-18 at 6.09.11 PM.jpg]]
BC
![[Screenshot 2024-12-18 at 6.09.48 PM.jpg]]
BD
![[Screenshot 2024-12-18 at 6.10.37 PM.jpg]]
BE
![[Screenshot 2024-12-18 at 6.11.02 PM.jpg]]
CE
No changes made
DC
No changes made
EB
No changes made
ED
**HERE I FORGOT TO CHANGE THE PARENT POINTER BUT WE FIX LATER**
![[Screenshot 2024-12-18 at 6.15.57 PM.jpg]]

Iteration 2:
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
**HERE I FORGOT TO CHANGE THE PARENT POINTER BUT WE FIX LATER**
![[Screenshot 2024-12-18 at 6.18.05 PM.jpg]]
**So we will probably have an issue**
EB
No changes
ED
No changes

Iteration 3:
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
*Oh nevermind maybe we wont have an issue after all*
No changes since -2 + 3 = 1 > 0 
DC
No changes
EB
No changes
ED
No changes

Iteration 4:
**Here is when i realized that I forgot to change parent pointers, graph looks like this right now:**
![[Screenshot 2024-12-18 at 6.22.39 PM.jpg]]
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
No changes
EB
No changes
ED
No changes

Final Iteration:
**Graph looks like this:**
![[Screenshot 2024-12-18 at 6.24.17 PM.jpg]]
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
No changes
EB
No changes
ED
No changes

No changes made: Graph is valid

## Question 2

### Part A
![[Screenshot 2024-12-18 at 6.26.08 PM.jpg]]
- color is either red or green 
- any path from s to t that is:
	- all one color
	- start with red and switches to green

![[Screenshot 2024-12-18 at 6.27.41 PM.jpg]]
![[Screenshot 2024-12-18 at 6.34.19 PM.jpg]]
First DFS consideration with state might work but it produces a solution that uses backtracking and way too much space.

Plain BFS doesn't work because we can go back to visit nodes at previous levels.

Insight: if at some point of dfs we are at a red state and reach a green that was already visited, that path would have already been considered and we dont have to explore it.

We are going to execute dfs as follows:

For initialization, we will call DFS on every neighbor of n and set the parent pointer to n.

The key insight is that:
*If we come from any green path, we know that we cannot explore red paths.*
*If we come from any red path, we can explore green paths.*
*Red paths should be explored first since they can lead us to the solution directly*

Hence, when we explore neighbours, dfs will be updated to only explore green paths if the path from (u, u.parent) was green. If (u,v) is red, we will skip this path.

However, if (u, u.parent) was red, we will explore all paths from the edges of v. 
*The key to solving the problem is the way we explore*
*If at a red path, we will explore other red paths first, and then green paths.*
This will guarantee that if a route through a red path exists we will explore it.

For example:
![[Screenshot 2024-12-18 at 6.57.28 PM.jpg]]
We might have an issue here by incorrectly marking the paths from the selected node as explored if we did not process red paths first. However, by exploring the red path we can find the solution.

The key to a O(V+E) time complexity is that we will ignore visited nodes.

If a node is already visited, by definition we have explored all paths to the south pole and did not find a solution.

If a path we took is all green, for example, imagine the first node upwards from n was green, it might find the solution of just going all the way to the right by exploring all the neighbours. It would not explore any of the red neighbours.

We do not have to worry about re-switching from red to green, because no green path can ever consider a red path

The path resides at the parent pointers from S.

We only ever visit a vertex once
For each vertex, the algorithm carries out a for loop for each neighbor of v. The additional time it takes to explore red path first only increases the time complexity by a factor of 2 at most (since we might have to reloop depending if we store or do two sepearte for loops)
Hence, the total runtime is then Θ(V + E).

### Part b

If the graph were directed we would want to run a set of very similar steps due to using DFS.

 Now we would explore paths that are outgoing from some vertex.

If at any point we detect a cycle, which would be when a node would have been marked as visited, we would do as above and ignore it.

Forward edges would not have to be explored either since by marking them as visited we know that either:
1. they were explored from the path of a red path (and with maximum permission for exploration found nothing)
2. they were explored from a green path and still found nothing

The path resides at the parent pointers from S.

The time complexity is still O(V+E) because we have not changed the core logic of how the algorithm operates.

## Question 3

![[Screenshot 2024-12-18 at 7.07.30 PM.jpg]]

```python
DFS(n): # if it's all connected
	for all v ∈ V set v.visitedFromGreen = false
	for all v ∈ V set v.visitedFromRed = false
	for all v ∈ V set v.parent = NIL
	n.visitedFromRed = true
	for each v ∈ Adj[n]
		if e(n,v) = green
			v.visitedFromRed = true
			DFS-visit(v, red)
		
DFS-visit(u, fromColor):
	found = false
	if(fromColor = red):
		# I am a green path
		for each v ∈ Adj[u]
			if v.visitedFromGreen = false and e(n,v) = green
				if found == true
					return true
				v.visitedFromGreen = true
				v.parent = u
				found = DFS-visit(v, green)
	else
		# I am a red path
		for each v ∈ Adj[u]
			if v.visitedFromRed = false and e(n,v) = red
				if found == true
					return true
				v.visitedFromRed = true
				v.parent = u
				found = DFS-visit(v, green)
	return found
```

## Question 4

![[Screenshot 2024-12-18 at 7.25.19 PM.jpg]]

![[Screenshot 2024-12-18 at 7.31.15 PM.jpg]]

In the example above, we can apply Kruskals to see that the there is only one configuration that would make the case on the left work. Any other configuration would choose a higher weight node.

On the chart on the left, we have to include the middle node, and we have options regarding which path (the 1s) to follow. We would not be able to pick the other weight 3 at any point because it would create a cycle.

## Question 5

![[Screenshot 2024-12-18 at 7.33.41 PM.jpg]]

```python
LongPath(T):
	for all v ∈ V set v.visited = false
	for all v ∈ V set v.parent = NIL
	u.distance = 0
	DFS-visit(u)
		
DFS-visit(u):
	u.visited = true
	maxdist = 0
	for each v ∈ Adj[u] 
		if v.visited = false 
			v.parent = u 
			v.distance = u.distance + 1 
			dist = DFS-visit-distance(v) 
			maxdist = max(dist, maxdist)
	return max(maxdist, u.distance)
```

This algorithm is O(V+E) since it