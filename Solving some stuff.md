9: 

$$
\begin{gather}
\log(n^{2})+\log ^{2}(n) + \sqrt{ n } \\
\log_{2}(n^{2}) = n \\
n+\log ^{2}(n) + \sqrt{ n } \\
\text{And we know that} \\
n \ge n^{1/2} \ge \log ^{2}n \\
\\
\mathcal{O}(n): \\
\forall n_{1} \geq k, \exists c > 0 \rightarrow \\
n+\log ^{2}(n) + \sqrt{ n } \le c \times n_{1} \\
\text{given the above, we can substitute:}
n + n + n = 3n \leq c \times n_{1} \\
c = 3, k = 1\\
\\
\Omega(n):
\forall n_{1} \geq k, \exists c > 0 \rightarrow \\
n+\log ^{2}(n) + \sqrt{ n } \ge c \times n_{1} \\
\text{Since} \log ^{2}(n) + \sqrt{ n } > 0, \forall n>0 \\
\text{for } c = 1, k = 1 \text{ the above holds}
\\\\\therefore f(n) = \Theta(n)
\end{gather}
$$
