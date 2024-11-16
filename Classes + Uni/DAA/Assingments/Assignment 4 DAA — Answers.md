---
tags:
  - DAA
---
# iae225
## Question 1

### Part A
#### Reasoning (ignore)
P\[i] is the price of a piece of size i. 
maximum price achievable when cutting the rod into integer sized pieces.
a piece size can only be cut once.

Can use a size used table to keep track of whether we can cut a piece of a certain size

Let's see, is this algo greedy?

If we have a piece of size 7, will the answer to a piece of size 8 be the solution for 7 and then the solution for 1?

Not really, what if p\[8] was infinity price? It doesnt work.

However, we can evaluate something similar.

The solution for a rod of size 8, would be the maximum price between a solution for:
p\[1] + s(7), p\[2] + s(6), p\[3] + s(5), ... p\[7] + s(1), p\[8]


#### The Table
#### Initialization
Why we setup 
#### Recurrence Relation
This because I cannot use x.
#### Pseudo Code
#### Runtime

q5, q4