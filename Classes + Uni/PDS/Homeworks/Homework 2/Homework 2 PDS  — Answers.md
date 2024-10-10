---
tags:
  - PDS
---
# Ivan Aristy - iae225
## ER Diagram

![[Screenshot 2024-10-10 at 11.28.20 AM.jpg]]
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
2. 
## Problem 2

4. Write a TRC query to find the ID of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\{ t | 

% \text{Is this corner cutting fine?}
\exists 
e \in \text{teaches} , 
s \in \text{section} , 
c \in \text{course}( \\

t[\text{ID}] = e[\text{ID}] \land \\
t[\text{year}] = e[\text{year}] \land \\

% \text{Queston We need to associate this weak entity set all the way through}
e[\text{course\_id}] = s[\text{course\_id}] \land \\
e[\text{sec\_id}] = s[\text{sec\_id}] \land \\
e[\text{semester}] = s[\text{semester}] \land \\
e[\text{year}] = s[\text{year}] \land \\

s[\text{course\_id}] = c[\text{course\_id}] \land \\
c[\text{title}] = \text{``CS-101"} \land 
\\
)\}
\end{gather}
$$
5. 
## Problem 3 

7. Write a TRC query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\{ t | 

% \text{Is this corner cutting fine?}
\exists 
e \in \text{teaches} , 
s \in \text{section} , 
c \in \text{course}, 
i \in \text{instructor}( \\

t[\text{ID}] = e[\text{ID}] \land \\
t[\text{name}] = i[\text{name}] \land \\
t[\text{year}] = e[\text{year}] \land \\

% \text{Queston We need to associate this weak entity set all the way through}
e[\text{course\_id}] = s[\text{course\_id}] \land \\
e[\text{sec\_id}] = s[\text{sec\_id}] \land \\
e[\text{semester}] = s[\text{semester}] \land \\
e[\text{year}] = s[\text{year}] \land \\

e[\text{ID}] = i[\text{ID}] \land \\

s[\text{course\_id}] = c[\text{course\_id}] \land \\
c[\text{title}] = \text{``CS-101"} \land 
\\
)\}
\end{gather}
$$

8. 
## Lecture 4 Material

## Retailer Database