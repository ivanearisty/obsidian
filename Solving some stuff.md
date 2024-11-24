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
\Omega(n)
\end{gather}
$$
