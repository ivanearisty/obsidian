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
2^{bh(x)} \le n + 1\\
bh(x) \le \log_{2}(n+1)
\end{gather}
$$

Max Height of RB Tree Bind

$$
\begin{gather}
\text{Actual height} \le 2 \times bh(x) \\
h(x) \le 2 \times bh(x) \le 2 \times \log_{2}(n+1) \\
h(x) \le \log(n)
\end{gather}
$$

## RB Repair

### Case 0

Parent is Black

![[Screenshot 2024-11-17 at 5.00.21 PM.jpg]]

### Case 1

Parent and Uncle are Red

![[Screenshot 2024-11-17 at 5.02.21 PM.jpg]]

### Case 2

