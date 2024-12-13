---
tags:
  - DAA
---
## Question 1: Graph Traversals, Warm up

### Part A

![[Screenshot 2024-12-10 at 11.34.34 PM.jpg]]
### Part B

![[Screenshot 2024-12-11 at 12.05.19 AM.jpg]]

### Part C

![[Screenshot 2024-12-11 at 12.29.46 AM.jpg]]
![[Screenshot 2024-12-11 at 12.33.25 AM.jpg]]
![[Screenshot 2024-12-11 at 12.34.01 AM.jpg]]
![[Screenshot 2024-12-11 at 12.35.32 AM.jpg]]
![[Screenshot 2024-12-11 at 12.37.12 AM.jpg]]
![[Screenshot 2024-12-11 at 12.37.54 AM.jpg]]
![[Screenshot 2024-12-11 at 12.38.31 AM.jpg]]
![[Screenshot 2024-12-11 at 12.39.22 AM.jpg]]
![[Screenshot 2024-12-11 at 12.39.40 AM.jpg]]
![[Screenshot 2024-12-11 at 12.39.57 AM.jpg]]
### Part D
![[Screenshot 2024-12-11 at 1.01.44 AM.jpg]]
Order:
AB,AD
BC,BD,BK
CE, CG, CK
DC, DE
EB, EH
FH
GE, GF, GK
HG
KF, KH

See under second iteration for explanation

**FIRST ITERATION**
![[Screenshot 2024-12-11 at 1.06.33 AM.jpg]]
![[Screenshot 2024-12-11 at 1.12.12 AM.jpg]]
![[Screenshot 2024-12-11 at 1.12.19 AM.jpg]]
![[Screenshot 2024-12-11 at 1.12.26 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.05 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.15 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.23 AM.jpg]]![[Screenshot 2024-12-11 at 1.13.30 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.40 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.49 AM.jpg]]
![[Screenshot 2024-12-11 at 1.13.58 AM.jpg]]
![[Screenshot 2024-12-11 at 1.14.06 AM.jpg]]
![[Screenshot 2024-12-11 at 1.14.49 AM.jpg]]
![[Screenshot 2024-12-11 at 1.15.16 AM.jpg]]

After the first iteration we can already see that there is going to be a problem around edged B, D, and E, since they will continue to decrease forever.

On the second iteration we get:

**SECOND ITERATION**

On Edge E to B:
![[Screenshot 2024-12-11 at 1.18.24 AM.jpg]]

Which will trickle down into infinite updates...

We'll prove this on the next outer loop execution. For now these are the next updates: 

![[Screenshot 2024-12-11 at 1.19.36 AM.jpg]]
![[Screenshot 2024-12-11 at 1.20.05 AM.jpg]]
![[Screenshot 2024-12-11 at 1.20.35 AM.jpg]]

**THIRD ITERATION**

To save myself and you from drawing 30 more of these... see how in the first few updates for BC,BD,BK we get:

![[Screenshot 2024-12-11 at 1.21.56 AM.jpg]]
![[Screenshot 2024-12-11 at 1.22.14 AM.jpg]]

**Which I hope you see will trickle down into a further reduction when we get to edge DE, making E -11 from DE.** 

**This will lead to an improvement beyond the v-1 runs and the algorithm will return false.**

## Question 2: Graph traversals on unweighted graphs

### Part A

![[Screenshot 2024-12-11 at 1.24.43 AM.jpg]]

```python
Init(v):
	visited, parent, distance: arrays indexed by vertices in V
	maxCycleLen = 0

    for each vertex u in V:
        visited[u] = False
        parent[u] = None
        distance[u] = 0

    return MaxCycle(v)

MaxCycle(v):
	v.distance = 0;
	DFS-Visit(v);

	for each vertex u in V:
		for each w in Adj[u]:
			if (parent[u] != w) and (parent[w] != u):
				maxCycleLen = max(maxCycleLen,|distance[u] - distance[w]| + 1)
	return maxCycleLen;
```

DFS-visit runs in O(V+E) from the lecture notes. The core logic of the code runs in O(V+E) time since we check every edge to see if we can detect a cycle and assign max cycle lengths from that. However, total runtime is O(V+E) due to DFS-visit. Initialization is O(V).

### Part B

![[Screenshot 2024-12-11 at 4.24.47 AM.jpg]]

```python
CountLeaves(u):
	Mark node u as visited: u.visited = true 
	count = 0;
	if length of Adj [u] = 1:
		count++;
	For each v ∈ Adj [u] 
		If v.visited = false 
			v.parent = u 
			v.distance = u.distance + 1 
			count = CountLeaves(v) + count;
	return count;
```

Here the runtime is still O(V+E) since we didnt update the core logic of dfs and only added constant steps (figuring out if it's degree 1 and updating and returning count)

### Part C

![[Screenshot 2024-12-11 at 4.30.44 AM.jpg]]

If we have exactly two SCC, call them S1 and S2, in a directed graph, then this means that we must have edges going in exactly one direction from either S1 to S2 or from S2 to S1. 

Take this graph for example:
![[Screenshot 2024-12-11 at 4.46.03 AM.jpg]]

The fact that there can only be two strongly connected components means that once we leave some component to the other we can never go back; however, it is key to realize that we can leave in the first place.

The same also works if there are more roads from components in S1 to S2. Any edges that connect them must go all in one direction.

Then, given the set of vertices, we can go through all the edges (u,v) and find any edge where u and v are not part of the same SCC. We will have two cases, where u belongs to some s1 and points to v in some s2, and the opposite. (We are essentially looking for the cross edge)

Now, we will know what SCC needs to have an edge placed from them to the other side.

Adding, **any**, directed edge will do the trick, so we will just propose to add an edge from u to v or v to u given the cases above. However, we could also select any vertex in S1 and point it to S2 where in this situation S1 is defined as the pointee SCC and S2 as the pointer.

Finding SCCs will take O(n^2); however, our specific algorithm will also take O(n^2) since checking all the edges for cross-edges between the two SCCs will involve looking at all of the edges in the worst case, and all of the edges in the worst case is every vertex, except a singleton SCC vertex who is the pointee, connected to each other which is O(n^2).

### Part D

![[Screenshot 2024-12-11 at 5.00.53 AM.jpg]]

```python
DFS-Routes(u):
	visited = 2D array [Vertices][bool] initialized to False
	return DFS-Routes(u,False, visited)

DFS-Routes(u, usingBridge, visited);
	
	if u = t: # We won
		return True

	# Don't need this anymore methinks
	#if visited[u][usingBridge]: 
		# If we have been here before return false
		# return False

	# Whether we are using or not using a bridge right now 
	# We want to keep track of it
	visited[u][usingBridge] = true;

	for each v ∈ Adj [u]:
	
		if not b(u,v): # Not at a bridge
			if not visited[v][usingBridge]: # haven't explored path
				if DFS-Routes(v, usingBridge, visited):
					return True
		
		else: # at a bridge
			if not usingBridge and not visited[v][True]: 
			# Have not used our one bridge yet or explored this path
				if DFS-Routes(v, True, visited):
					return True
	
	return False
```

![[Screenshot 2024-12-11 at 5.11.19 AM.jpg]]

Time complexity is O(V+E) since each vertex can be visited in at most two states. Additionally, every edge is considered twice per state.

In the above graph, the only way to get to the goal is to cross the vertex disjoint bridge, if we start at the top left, we might first pick the bridge and this would lead us to a false state; however, we would then consider the other routes from above or below, and these would work.

If the trail node connecting the two cyclic graphs was a bridge, then we would explore it and return false, return false from the first bridge, and when going the long way around, we would also return false immediately upon reaching it from above, since it was already proved impossible from recurring on it earlier.

### Part E 

![[Screenshot 2024-12-11 at 5.41.35 AM.jpg]]

Assuming my code above is correct, and it's recursive nature, we can keep track of a new parent array:

```python
DFS-Routes(u):
	visited = 2D Boolean array [Vertices][bool] initialized to False
	parent = 2D Vertix array [Vertices][bool] initialized to Nil
	return DFS-Routes(u,False, visited)

DFS-Routes(u, usingBridge, visited, parent);
	
	if u = t: # We won
		return True

	# Don't need this anymore methinks
	#if visited[u][usingBridge]: 
		# If we have been here before return false
		# return False

	# Whether we are using or not using a bridge right now 
	# We want to keep track of it
	visited[u][usingBridge] = true;

	for each v ∈ Adj [u]:
	
		if not b(u,v): # Not at a bridge
			if not visited[v][usingBridge]: # haven't explored path
				parent[v][usingBridge] = u
				if DFS-Routes(v, usingBridge, visited):
					return True
		
		else: # at a bridge
			if not usingBridge and not visited[v][True]:
				parent[v][True] = u
			# Have not used our one bridge yet or explored this path
				if DFS-Routes(v, True, visited):
					return True
	
	return False
```

Then, we can build the output using parent from target:

```python

Init(s, t, parent, visited):

	endState = visited[t][False] is True ? False : True
	
	PrettyPrinting(s, t, parent, visited, endState)
		
PrettyPrinting(s, currentVertex, parent, visited, currentState):
	
	if currentVertex = s:
		print s
		return

	prevVertex = parent[currentVertex][currentState]

	if currentState == True and b(prevVertex, currentVertex):
        prevState = False
    else:
        prevState = currentState

	PrettyPrinting(s, prevVertex, parent, visited, prevState)
	
	print currentVertex
```

## Question 3: Spanning Trees

### Part A

![[Screenshot 2024-12-11 at 6.09.07 AM.jpg]]

Since we ran Kruskal's algorithm on the tree, we can expect there to be no cycles. 

Since we know the fact that: "Adding any other edge from E to the MST creates a cycle"

The issue reduces to finding a cycle in an undirected, graph.

By running DFS, we will be able to detect where the cycle in the tree occurs. 

We will add a slight modification though, we will keep track of the weight of each item and the current time of DFS.

Then, when we detect the cycle, we will know at which node it starts, ends, and the nodes in the middle thanks to their stopping time.

Take this MST for example:
![[Screenshot 2024-12-11 at 6.24.34 AM.jpg]]

When adding this new edge:
![[Screenshot 2024-12-11 at 6.25.50 AM.jpg]]

DFS will detect a cycle at some point. 

The other nodes which could be a problem would've stopped processing by then, like these ones:

![[Screenshot 2024-12-11 at 6.27.35 AM.jpg]]

And we would also know what nodes not to consider because their start times would be earlier than the node where the cycle was detected (not the one we are at, but the one at the end of the edge we would've compared to).

We could then iterate through these nodes and remove the edge with the heighest weight, since it's guaranteed to be the problem amongst them, since, if not, it would've been included.

Since we have $E \approx V$, DFS runs in O(V+V) time. Additionally, our procedure for removal does ålso at most O(2V). This is then O(V).

### Part B

![[Screenshot 2024-12-11 at 6.33.45 AM.jpg]]

Assume that this were the case for the sake of contradiction.

We know two MSTs must have the same total edge weight by definition.

Since weights are distinct, we know that there is a weight in T1 that is not in T2.

Pick the smallest of these such weights. By adding this weight to T2 we can create a cycle.

Running the algorithm from above, we would remove this cycle and get back our original MST.

However, in the cycle just formed, we can look for an edge that is in T2 and not in T1.

Because all edge weights are distinct and the first edge was chosen as the smallest, this new edge must be heavier.

However, if we were to remove this weight, we would get T2 into a position where it weighs not just less than what it was, but also T1.

Since we know two MSTs must have the same total edge weight, we know it's not possible.

### Part C

![[Screenshot 2024-12-11 at 6.46.12 AM.jpg]]

![[Screenshot 2024-12-11 at 6.57.13 AM.jpg]]

## Question 4: Weighted graphs

### Part A

![[Screenshot 2024-12-11 at 6.59.30 AM.jpg]]

```python
DIJTAX(Graph, start, end):
	# Init
	n.d = infinity for all vertices n
	start.d = start.tax
	Add all n to PriorityQueue Q
	Initialize empty tree T

	# Algo
	While Q not empty:
		u = Extract-min(Q)
		for each v in Adj[u]:
			newCost = u.d + t(u,v) + v.tax
			if newCost < v.d:
				Decrease-key(Q,v,u.d + t(u,v) + v.tax)
				v.parent = u
				v.d = newCost
	
	Print(parent, end)
	
Print(parent, v):
	if parent[v] != None:
		Print(parent, parent[v])
	print t
```

This is a modified version of Dijkstra’s, which is O(E log V), and would make our problem O(mlogn). We must only consider additional steps. In particular, printing will at most take time equal to the size of the parent, which is itself at most the amount of vertices V. Additionally, the modification to take into account taxes is already part of the constant time operations that Dijkstra’s performs. Hence, this algorithm is O(E log V).

### Part B

![[Screenshot 2024-12-11 at 6.59.50 AM.jpg]]

We will do a succession of Dijkstras to solve this problem.

For all 7 toilets (including start and end) we want to check if it's possible to travel between any of them, without going over the 20 mile constraint.

For this, we will utilize a modified version of Dijkstra, that will give us the shortest path between some toilet t and all nodes reachable under the 20 miles constraint.

We can store this information within the nodes at a key value pair for the particular toilet run that some run came from say get(v,u).

Each pass will take at most O(m log n), and, since we are doing this 7 times, the runtime complexity for now is still O(m log n)

Notice how, if we could've reached the end from the start, we would have found the shortest path already. This will be true for any toilet node T along our path.

Using the information about toilet distances, we can construct a new graph with just the 7 toilet vertices that will include this shortest distance between toilets. For the edges, we can call on our previous storage get function and assign them their weights.

We can then re-run Dijkstra's to find the shortest path between the start and the finish on this smaller graph.

This new run is O(m log n) and is proven since the graph is strictly bound to be smaller or equal to the original graph.