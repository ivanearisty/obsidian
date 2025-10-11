---
tags:
  - DAA/Week5
---
# Concept

## Overview

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.21.28 AM.jpg]]

## Partitioning In Place

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.22.30 AM.jpg]]

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.22.55 AM.jpg]]

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.24.12 AM.jpg]]

Pseudocode for partition:
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.28.40 AM.jpg| 500]]

Quicksort code:
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.32.13 AM.jpg| 500]]

## Runtime

Recurrence relation:
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.37.21 AM.jpg]]

Worst Case:
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.38.42 AM.jpg]]

Best Case:
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.39.18 AM.jpg]]

Expected / Average Case

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.41.24 AM.jpg]]

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.41.51 AM.jpg]]

Recursion tree:

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.43.08 AM.jpg]]

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.43.28 AM.jpg]]

Notice that we always get c\*n.
![[z/z ScreenShots/Screenshot 2024-10-08 at 8.44.09 AM.jpg]]

So, we just need to find the size of the tree; however, the height of the tree is random.

If every branch was a good pivot (3n/4), we would have height: $H < \log_{\frac{4}{3}}(n)$

**However**, since we know we are picking a good pivot half the time, we can say that the expected size is:

$H < 2\log_{\frac{4}{3}}(n)$

The important part is that the expected size is **logarithmic**

Hence:

![[z/z ScreenShots/Screenshot 2024-10-08 at 8.47.08 AM.jpg| 500]]

## Note the weird behaviour in leaves:

![[z/z ScreenShots/Screenshot 2024-10-08 at 2.26.00 PM.jpg]]