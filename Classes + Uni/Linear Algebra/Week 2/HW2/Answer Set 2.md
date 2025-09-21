# Problem Set 2
## Problem 1
### i

$$
\begin{gather}
\text{(i) Let } u, v \in V \text{ be distinct vectors in V. Then } \\ u,v \text{ is linearly dependent if and only if } u \text{ or } v \text{ is a multiple of each other.}
\end{gather}
$$

- $v_1,\dots,v_n$ are **linearly dependent** if some non-all-zero coefficients exist with $a_1v_1+\cdots+a_nv_n=0$.
- They’re **linearly independent** if the only solution to $a_1v_1+\cdots+a_nv_n=0$ is $a_1=\cdots=a_n=0$.

$$
\begin{gather}
\Rightarrow 
\text{If } \{ u,v \} \text{ is linearly dependent, then one vector is a multiple of another.} \\ \\
\text{From the definition of linear dependence: } \\
\{ u,v \} \text{ is LD if }  ∃a,b∈F \text{ such that } (¬(a=0∧b=0))∧(au+bv= \mathbf{0}).
\\
\\
\text{Since not both a and b are zero, we have two cases: } \\
\text{Case 1: } b \neq 0 \\
au+bv = 0  \\ 
bv = -au \\
v = \left( -\frac{a}{b} \right) u\\ \\
\text{Case 2: } a \neq 0 \\
au + bv = 0 \\
au = -bv \\
u = \left( -\frac{b}{a} \right)v \\

\text{since } a \in \mathbb{R} \land b \in \mathbb{R} \text{ in all possibilities, one vector is a multiple of another.} \\
\\ 
\Leftarrow 
\text{If one vector is a multiple of another, then } \{ u,v \} \text{ is LD:} \\
\text{Let } c \text{ be a scalar such that } c \in \mathbb{R}.  \\
\text{This means that there is a scalar such that:} \\
u = cv \\
u + (-cv) = \mathbf{0} \\
(1)u + (-c)v = \mathbf{0} \\
\text{This is a linear combination of u and v that equals the zero vector.} \\
\text{The coefficients are a₁ = 1 and a₂ = -c.} \\
\text{Since a₁ is not zero, the coefficients are not both zero.} \\
\text{Therefore, by definition, the set } \{ u,v \} \text{is linearly dependent}
\end{gather}
$$

### ii

Any subset of linearly independent vectors is linearly independent.

$$
\begin{gather}
\text{Let } S = \{ v_{1},v_{2},\dots,v_{n} \} \text{ be an arbitrary linearly dependent set of vectors.} \\
\text{Let } T \subseteq S \to 
\end{gather}
$$