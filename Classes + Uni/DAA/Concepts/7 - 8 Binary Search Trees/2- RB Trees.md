---
tags:
  - DAA/Week7
---
## Overview

 ![[Screenshot 2024-10-22 at 11.47.30 AM.jpg]]

## Definition

![[Screenshot 2024-10-22 at 11.49.17 AM.jpg]]

Notice the differnt amount of black nodes:
![[Screenshot 2024-10-22 at 11.49.59 AM.jpg]]

## Height

![[Screenshot 2024-10-22 at 11.55.52 AM.jpg]]

Max Black Height of a RB Tree Bind

$$
\begin{gather}
2^{bh(x)} - 1 \le n \\
\\
bh(x) \le \log_{2}(n+1)
\end{gather}
$$

Max Height of RB Tree Bind

$$
\begin{gather}
\text{Actual height} \le 2 \times bh(x) \\ \\
h(x) \le 2 \times bh(x) \le 2 \times \log_{2}(n+1) \\ \\
h(x) \le \log(n)
\end{gather}
$$

![[Screenshot 2024-11-17 at 6.51.15 PM.jpg]]


**The shortest RB tree we can build is when all the nodes are black**. For example, when then black-height of the tree is 3, the height of the tree is 2. *For a tree with black-height b, the shortest tree has height b − 1.*

**The longest red-black path we can build in a tree is a path that alternates red and black nodes.** For example, when the black-height is 3, the maximum height of the tree is 5. An example of each case is shown below. Therefore *when the black height is b, the tree with the maximum height has height 2b − 1.*

It is impossible to have a path of length 5 with only 2 black nodes.
## RB Repair

### Case 0

Parent is Black

![[Screenshot 2024-11-17 at 5.00.21 PM.jpg]]

### Case 1

Parent and Uncle are Red

![[Screenshot 2024-11-17 at 5.02.21 PM.jpg]]

### Case 2

[[2 - rb trees.pdf]]

![[Screenshot 2024-11-17 at 10.42.11 PM.jpg]]

### Runtime of RB-repair
Case 1 and Case 2 together represent our RB-repair algorithm. In Case 1, we make a recursive call to the grandparent. In Case 2, there is no recursive call. Both Case 1 and Case 2 only take constant amount of time for the work they do

## Given pre order or post order we can determine shape of tree

```
Pre-order traversal: 10, 5, 2, 7, 6, 15, 12, 14, 20, 25
Post-order traversal: 2, 6, 7, 5, 14, 12, 25, 20, 15, 10
```
![[Screenshot 2024-11-17 at 10.37.55 PM.jpg]]

## When does the height of rb tree change? 

 A new node does not always change the black-height of tree. The RB-repair algorithm performs rotations in Case 2(which do not alter the number of black nodes on a path). RB-repair performs recolorings in Case1 (the parent and the uncle are recolored black, and the grandparent is colored red). Generally this recoloring does not change the number of black nodes on the path from the root. However, it may be that the grandparent is in fact the root node. In this case, the grandparent is left as a black node. The black height of the entire tree has increased by one.