---
tags:
  - DAA/Week3
---
## Randomized Select

### Partitioning:

![[Screenshot 2024-10-06 at 1.37.58 PM.jpg]]

### Recursive Call:

![[Screenshot 2024-10-06 at 1.39.32 PM.jpg]]
*On case 3 we would have to update our rank since.*

### Worst Case:
When we pick the largest element every single time.
![[Screenshot 2024-10-06 at 1.41.17 PM.jpg]]

### Average Case:

![[Screenshot 2024-10-06 at 1.44.17 PM.jpg]]

We pick a **good** pivot *half* of the time. 

On a good case, we partition the array about evenly.

On the edge of the good case, we still partition the array by about *3/4ths* on the worst case:

![[Screenshot 2024-10-06 at 1.46.05 PM.jpg | 500]]

On the worst case we make a recursive call to *3/4ths* of the array.

The chances of selecting one of these goods pivots is *1/2*; so, every second attempt should be good...
#### Expected Runtime:

![[Screenshot 2024-10-06 at 1.51.18 PM.jpg]]

Note that we multiply by 2 since we expect to select a good pivot half of the time.

Then, we know from our facts that:

![[Screenshot 2024-10-06 at 1.53.06 PM.jpg]]

And 

![[Screenshot 2024-10-06 at 1.53.31 PM.jpg | 400]]

With the geometric formula we have:

![[Screenshot 2024-10-06 at 1.54.13 PM.jpg | 400]]

So we have expect $\Theta (n)$ time