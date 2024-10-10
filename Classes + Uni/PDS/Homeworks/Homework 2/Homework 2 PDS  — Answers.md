---
tags:
  - PDS
---
# Ivan Aristy - iae225
## ER Diagram

![[Screenshot 2024-10-10 at 11.12.14 AM.jpg]]
## Problem 1

1. Write a tuple relational calculus (TRC) query to find the ID and name of each student in the Comp. Sci. department

$$
\begin{gather}
\{

t | \exists s \in \text{student} ( \\
t[\text{ID}] = s[\text{ID}] \land \\
t[\text{name}] = s[\text{name}] \land \\
s[\text{dept\_name}] = \text{``Comp. Sci."}
)

\}
\end{gather}
$$

## Problem 2

2. Write a TRC query to find the ID of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\{

t | \\ 
\exists s \in \text{instructor} (t[\text{ID}] = s[\text{ID}]) \land \\
\exists u \in 
\}
\end{gather}
$$