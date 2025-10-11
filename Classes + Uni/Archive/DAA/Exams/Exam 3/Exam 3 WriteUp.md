---
tags:
  - DAA
---
# iae225 - Exam Writeup

I acknowledge that my submitted Exam work is entirely my own. I have read and am in accordance with the Student Code of Conduct policy of NYU Tandon and fully accept the consequences of breaching the above instructions. 
Name: Ivan Aristy
Signature: Ivan Ernesto Aristy Eusebio

## Question 1

![[z/z ScreenShots/Screenshot 2024-12-18 at 5.58.44 PM.jpg]]

Order:
AB, AD
BC, BD, BE
CE
DC
EB, ED

![[z/z ScreenShots/Screenshot 2024-12-18 at 6.03.08 PM.jpg]]
Show:
- distance attribute
- parent attribute
- current edges of SSP
- no changes

Init:
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.05.49 PM.jpg]]

V-1 iterations:

Iteration 1:
AB
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.08.50 PM.jpg]]
AD
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.09.11 PM.jpg]]
BC
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.09.48 PM.jpg]]
BD
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.10.37 PM.jpg]]
BE
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.11.02 PM.jpg]]
CE
No changes made
DC
No changes made
EB
No changes made
ED
**HERE I FORGOT TO CHANGE THE PARENT POINTER BUT WE FIX LATER**
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.15.57 PM.jpg]]

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
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.18.05 PM.jpg]]
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
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.22.39 PM.jpg]]
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
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.24.17 PM.jpg]]
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
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.26.08 PM.jpg]]
- color is either red or green 
- any path from s to t that is:
	- all one color
	- start with red and switches to green

![[z/z ScreenShots/Screenshot 2024-12-18 at 6.27.41 PM.jpg]]
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.34.19 PM.jpg]]
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
![[z/z ScreenShots/Screenshot 2024-12-18 at 6.57.28 PM.jpg]]
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

![[z/z ScreenShots/Screenshot 2024-12-18 at 7.07.30 PM.jpg]]

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
	if s = n return true
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

![[z/z ScreenShots/Screenshot 2024-12-18 at 7.25.19 PM.jpg]]

![[z/z ScreenShots/Screenshot 2024-12-18 at 7.31.15 PM.jpg]]

In the example above, we can apply Kruskals to see that the there is only one configuration that would make the case on the left work. Any other configuration would choose a higher weight node.

On the chart on the left, we have to include the middle node, and we have options regarding which path (the 1s) to follow. We would not be able to pick the other weight 3 at any point because it would create a cycle.

## Question 5

![[z/z ScreenShots/Screenshot 2024-12-18 at 7.33.41 PM.jpg]]

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

We mark each vertex as visited once and visit each vertex only once.
For each vertex, the algorithm carries out a for loop for each neighbor of v. 
Over all vertices in the graph, we keep a distance attribute which takes constant amount of time to update and keep track of (just like for parent)
Hence, the total runtime is Θ(V + E).

## Question 6
![[z/z ScreenShots/Screenshot 2024-12-18 at 7.42.09 PM.jpg]]
![[z/z ScreenShots/Screenshot 2024-12-18 at 7.50.29 PM.jpg]]
It does not work.

Dijstra removes nodes from Q when it evaluates their path because that *must* be the shortest path to get to them.

A path cannot become shorter after being the shortest discoverable from the source vertex. However, it can definitely become longer by exploring a path that was not yet seen.

This preemptively removes nodes from potentially being the longest.

The above would work if paths "could not get any bigger" which would be when all the weights are actually negative.

## Question 7

![[z/z ScreenShots/Screenshot 2024-12-18 at 7.55.33 PM.jpg]]

- A person can make both pickups.

This is similar to what we discussed in office hours. What we want here is to minimize the path it takes for both of us to do everything and we have a couple of scenarios we can lay out:

- Ivan goes directly to the party, Erin picks up the beer, then the pizza, then goes to the party.
- Ivan picks up beer, then goes to the party. Erin up pizza, then goes to the party.
- Ivan picks up pizza, then goes to the party. Erin up beer, then goes to the party.
- Ivan picks up beer, the picks up pizza, then goes to the party. Erin goes directly to the party.

We can represent this problems as a graph, and the previous scenarios can happen as we minimize and pick the scenario with least time

Since time can't be negative, we use DJ.

First we will run DJ on Ivan and augment the algorithm so that each node reached from ivan contains an attribute called .fromIvan which represents the shortest path ivan can take to get to that node. We will be utilizing the same graph, but, instead of d for distance, we will use this from variable for our distinct operations.

Then we will do something similar for Erin, but with fromErin.

Then we will do something similar with Pizza, but with fromPizza.

Then we will do something similar with Beer, but with fromBeer.

At the end of our algorithm, the finish, beer, and pizza will have the amount it takes ivan and erin to get to that node.

The finish will have the amount it takes to get there from pizza and beer.

Now we can perform a minimization to output what the best scenario would be:

First we calculate the results for each scenario and add it into a scenarios table of size 4
Scenario 1:
- Ivan goes directly to the party, Erin picks up the beer, then the pizza, then goes to the party.
- max(finish.fromIvan, beer.fromErin + pizza.fromBeer + finish.fromBeer)

Scenario 2:
- Ivan picks up beer, then goes to the party. Erin up pizza, then goes to the party.
- max(beer.fromIvan + finish.fromBeer, pizza.fromErin + finish.fromPizza)

Scenario 3:
- Ivan picks up pizza, then goes to the party. Erin up beer, then goes to the party.
- max(beer.fromErin + finish.fromBeer, pizza.fromIvan + finish.fromPizza)

Scenario 4:
- Ivan picks up beer, the picks up pizza, then goes to the party. Erin goes directly to the party.
- max(finish.fromErin, beer.fromIvan + pizza.fromBeer + finish.fromBeer)

At the end, we will have our results stored in an array. 

We will pick the minimum and keep track of the index and output which scenario erin and ivan should follow based on what minimized the time.
## Question 8

![[z/z ScreenShots/Screenshot 2024-12-18 at 8.11.03 PM.jpg]]

If we have 5 strongly connected components, we would like to make a loop between all 5 of them.

By the definition of an SCC, from any point in the SCC, you can get to any node in that same SCC.

You can think of the SCCs as nodes really. 

We can have them as such

![[z/z ScreenShots/Screenshot 2024-12-18 at 8.15.27 PM.jpg]]
or like this
![[z/z ScreenShots/Screenshot 2024-12-18 at 8.16.47 PM.jpg]]
or this:
![[z/z ScreenShots/Screenshot 2024-12-18 at 8.17.10 PM.jpg]]

This is non-exhaustive, but it illustrates the idea.

First we will build our sccs.

For every vertex in the graph, we will run DFS visit with timestamps.

Then, we will copy vertices from v to the set of vertices in G^t

Then, for each edge in the original list of edges, we will:
- add the opposite direction edge to G^t
- add the vertices of our original edge to the adjacency list of the transpose
This will build our transpose graph.

Then we will create a list of vertices sorted by their decreasing finish times.

We will create a temporary array of size 6 that will store nodes and initialize a variable count = 1

For each vertex in this list:
- we will run DFS-visit-with-children as long as visited = false
- every restart of this loop WILL be an SCC, and we will have the parent pointer of that scc, hence **we will add this node to array[count]** and increment it.

This will finalize the creation of the SCCs and we will end with an array that will contain the parent nodes. It might look like: \[parent1,parent2,parent3,parent4,parent5,NULL]

Now we will set array[6] = to parent 1: \[parent1,parent2,parent3,parent4,parent5,parent1]

The next step will complete the task:
**We will run a loop 5 times that creates a new edge from array\[i] to array\[i+1]**

At the end we will have completed a cycle between all the sccs, and NO MATTER WHAT was the state of our initial graph, it will, by definition, look like this:
![[z/z ScreenShots/Screenshot 2024-12-18 at 8.31.00 PM.jpg]]

Given that from any SCC you can get to any node within it, and the sccs are now in a loop, it must be the case that we have created only 1 scc.

The first part algorithm is O(V+E) since creating the sccs involves running DFS twice: once on G on again on GT. 
The steps of the final algorithm are always 5, so O(1)
The dominant term, and therefore the total runtime, is Θ(V + E)
## Question 9

![[z/z ScreenShots/Screenshot 2024-12-18 at 8.33.25 PM.jpg]]

### Problem 1

A set of n children are such that certain pairs of children are friends. A friendship is a bi-directional relationship between two children. The school teacher would like to select at least k children who are all friends with each other.

If children are vertexes in a graph, and friendships are edges, the problem the teacher wants to solve infolves selecting k children which are all pair-wise connected by their friendships. Hence this is an instance of Cliques, and we do not have a poly time solution.

### Problem 2

Graph G is a simple, connected, undirected graph. There are n vertices and m edges. The goal is to find at least k vertices and color them pink such that no two pink vertices share an edge.

Coloring vertices pink and not letting them share an edge.
Not sharing an edge is the same thing as not being being adjacent.
Coloring vertices pink and not letting be adjacent is analogous to Independent set. 
Hence, we do not have a poly time solution. 

### Problem 3

 Graph G is a simple, connected, undirected graph. There are n vertices and m edges. The goal is to determine if the vertices can be colored in two different colors so that no edge exists between vertices of the same color.

We have explored coloring in the course and found that it is analogous to finding if a graph is BiPartite. This is a poly-time problem and can be solved with BFS from a source vertex, where we iterate along the nodes, shifting colors, and return true if no nodes colored the same are adjacent.

### Problem 4

A set of m children go shopping in a shop with n different toys. Each child picks exactly TWO of their favourite toys. Note that some children may chose the same toy. The problem is to select at least k toys so that no child goes home with TWO toys (going home with none or one is okay).

The shop has n different toys.
We can model child choices as edges in between the toys.
Going home with none or 1 is okay.
We can turn vertex cover into an instance of this problem.
Vertex cover specifies that we select a set of at most k vertices such that each edge has at least one selected endpoint.
Since we can make every child go home with 1 toy, there is no poly time algorithm since this can be an instance of vertex cover.

## Question 10
![[z/z ScreenShots/Screenshot 2024-12-18 at 8.33.33 PM.jpg]]
Let G be a directed unweighted graph on n vertices, where each vertex is colored either black or white. The goal is to find a a simple cycle through at least k vertices where all vertices are of the same color. Show that this problem is NP complete, using a reduction from a problem from class.

directed unweighted graph on n vertices
color either black or white
simple cycle where all vertices are of the same color

Step 1: verify a proposed solution to the problem is polynomial time. Given a path P through the input graph:
- Verify that the length of path p is >= k O1
- Loop through adjacent pairs of vertices in P and ensure that there is an edge in G for each adjacent pair in the path O(V + E)
- Loop through adjacent vertices in P and ensure they are all of color white or Loop through adjacent vertices in P and ensure they are all of color black  O(P)
The following will run in poly

Step 2: Reduction from Hamiltonian Cycle
	Given an input graph G to HamiltonianCycle, we translate it into input for Question10 as follows:
	The input graph G is converted into G1 where G1 has vertexes (and their edges) which would be black removed.
	We set the amount of of vertices added equal to k.
	We copy this as input.

Step 2 Verification:
For instances of hamiltonian cycle where the answer is yes, the the corresponding output in q is yes. If the original graph has a path through these vertices that exists and greater than k, it will come from such input

For instances of hamiltonian cycle where the answer is no, the the corresponding output in q is no. If the original graph has no path then it would 