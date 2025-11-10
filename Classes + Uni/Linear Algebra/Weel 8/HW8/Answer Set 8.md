## Problem 1

![[Screenshot 2025-11-09 at 6.25.29 PM.png]]

$$
\begin{gather}
tI = \begin{pmatrix}
t & 0 & 0 & \dots & 0  \\
0 & t & 0 & \dots & 0  \\
0 & 0 & t & \dots & 0  \\
0 & 0 & 0 & \dots & t 
\end{pmatrix}
\end{gather}
$$
$$
\begin{gather}
M = A + tI = \begin{pmatrix}
t & 0 & 0 & \dots & a_{0}  \\
-1 & t & 0 & \dots & a_{1}  \\
\vdots & \vdots & \vdots & \vdots &\vdots & \\
0 & -1 & t & \dots & a_{n-2}  \\
0 & 0 & -1 & \dots & t a_{n-1}
\end{pmatrix}
\end{gather}
$$
$$
\begin{gather}
\det(A + tI) = t \cdot -1^{1+1} \det M_{11} + -1^{1+n} \cdot a_{0} \det(M_{1n}) \\
\det(A + tI) = t \det M_{11} + -1^{1+n} \cdot a_{0} \det(M_{1n}) \\ 
\\ \text{Deleting the first row and column gives the same pattern as the original,} \\
\text{but with size } (n-1)\times (n-1) \\
\\
D_{n-1}(t) = \det(M_{11}) \\
\\
\text{Deleting the first row and last column gives us a minor that is upper triangular.} \\
\text{It's determinant is } -1^{n-1} \\
\text{Thererefore we have } -1^{1+n} \cdot a_{0} -1^{1-n} = -1^{(1+n)+(n-1)} \cdot a_{0} = -1^{2n} \cdot a_{0} \\
\text{Since 2n is always positive we just get } a_{0} \\ \\

D_{n}(t) = t \cdot D_{n-1}(t) + a_{0} \\
\\
\text{With the base case } D_{1}(t) = t + a_{0} \\
\text{this recurrence will unroll to } t^{n} + a_{n-1}t^{n-1} + a_{n-2}t^{n-2} + \dots a_{1}t + a_{0}
\end{gather} 
$$

## Problem 2
![[Screenshot 2025-11-09 at 7.07.08 PM.png]]
### (i)


### (ii)
### (iii)
### (iv)
### (v)
## Problem 3
## Problem 4
### (i)
### (ii)
### (iii)
### (iv)
### (v)