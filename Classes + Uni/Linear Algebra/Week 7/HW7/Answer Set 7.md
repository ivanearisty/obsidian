## Problem 1

![[Screenshot 2025-11-02 at 3.34.33 PM.png]]

The vectors are

$$
\begin{gather}
p_{1} = \{ 1,2,0 \} \\
p_{2} = \{ 1,1,1 \} \\
p_{2} = \{ 1,0,5 \}
\end{gather}
$$

Match coefficients of powers of (x):
$$
\begin{gather}
(x^3: a + c = 0) \\
(x^2: b = 0) \\
(x^1: 2a + b = 0) \\
\text{constant}: (b + 5c = 0)
\end{gather}
$$
From $(b=0)$, the $(x^1)$ equation gives $(2a=0\Rightarrow a=0)$. Then $(a+c=0\Rightarrow c=0)$, and the constant equation is satisfied automatically.

Thus the only solution is (a=b=c=0). Therefore it is **linearly independent**.

## Problem 2

![[Screenshot 2025-11-02 at 5.41.42 PM.png]]

$$
\begin{gather}
\textbf{Compute } \det P. \\
\quad \text{Expand along the 3rd column (two zeros):} \\
\det P
= 1\cdot \\
\det\begin{pmatrix}1 & k \\ k & 1\end{pmatrix}
= (1)(1) - (k)(k) \\
= 1 - k^2.
\end{gather}
$$
$$
\begin{gather}
1 - k^2 = 0 
\;\Longleftrightarrow\;
k^2 = 1
\;\Longleftrightarrow\;
k = \pm 1.
\end{gather}
$$

$$
\begin{gather}
P =
\begin{pmatrix}
1 & k & 0 \\
k & 1 & 0 \\
0 & 1 & 1
\end{pmatrix}, \\[8pt]
P^{-1} =
\begin{pmatrix}
-\dfrac{1}{k^2 - 1} & \dfrac{k}{k^2 - 1} & 0 \\[6pt]
\dfrac{k}{k^2 - 1} & -\dfrac{1}{k^2 - 1} & 0 \\[6pt]
-\dfrac{k}{k^2 - 1} & \dfrac{1}{k^2 - 1} & 1
\end{pmatrix}, \\[12pt]
P^{-1} P =
\begin{pmatrix}
-\dfrac{1}{k^2 - 1} & \dfrac{k}{k^2 - 1} & 0 \\[6pt]
\dfrac{k}{k^2 - 1} & -\dfrac{1}{k^2 - 1} & 0 \\[6pt]
-\dfrac{k}{k^2 - 1} & \dfrac{1}{k^2 - 1} & 1
\end{pmatrix}
\begin{pmatrix}
1 & k & 0 \\
k & 1 & 0 \\
0 & 1 & 1
\end{pmatrix}
=
\begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{pmatrix}
= I_3.
\end{gather}
$$

## Problem 3

### 1

For the zero argument:
$$
\omega(v_1,\dots,0,\dots,v_m)
= 0\cdot\omega(v_1,\dots,1,\dots,v_m)
= 0.
$$

For the linear combination:
$$
\omega(v_1,\dots,v_j+\sum_{i\ne j}\lambda_i v_i,\dots,v_m)
= \omega(v_1,\dots,v_j,\dots,v_m)
+ \sum_{i\ne j}\lambda_i\,\omega(v_1,\dots,v_i,\dots,v_m).
$$
Each term in the sum has a repeated vector (since $v_i$ appears twice),  
so by the alternating property they are $0$.  
Hence only the first term remains.

### 2

If the vectors are linearly dependent, one can be written as  
$$
v_j = \sum_{i\ne j}\lambda_i v_i.
$$
Then
$$
\omega(v_1,\dots,v_j,\dots,v_m)
= \sum_{i\ne j}\lambda_i\,\omega(v_1,\dots,v_i,\dots,v_m).
$$
Each sum has two identical vectors $\Rightarrow 0$.  
Therefore $\omega(v_1,\dots,v_m)=0$.

### 3

Any $m$ vectors in $V$ with $m>n$ are linearly dependent.  
By part (ii), $\omega(v_1,\dots,v_m)=0$.  
Hence $\bigwedge^m V^* = \{0\}$.

## Problem 4

### 1

Row-reduce (or solve) $Bx=0$:
$$
\mathrm{Null}(B)=\operatorname{span}\{\,(-1,-1,1)\,\}.
$$
So all solutions are
$$
x=t\,(-1,-1,1),\quad t\in\mathbb{R}.
$$

### 2

A quick consistency test uses a left-null vector of $A$ (i.e., $w\neq 0$ with $w^\top A=0$).
Since $w\in\mathrm{Null}(A^\top)=\mathrm{Null}(B)$, take $w=(-1,-1,1)$.  
Then a necessary condition for solvability is $w^\top b=0$:
$$
w^\top b = (-1,-1,1)\cdot (1,2,5) = -1-2+5 = 2\neq 0.
$$
Therefore
$$
\text{the system } Ax=\begin{pmatrix}1\\2\\5\end{pmatrix}\ \text{is inconsistent (no solution).}
$$

---

**(iii) Find a basis of the solution set } \{(x,y)\in\mathbb{R}^3\times\mathbb{R}^3: Ax=By\}.**

Equivalently,
$$
\begin{pmatrix}A & -B\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}=0.
$$
A basis for this nullspace is given by the three vectors
$$
\begin{pmatrix}1\\-1\\ 1\\[2pt] 0\\ 0\\ 0\end{pmatrix},\quad
\begin{pmatrix}-1\\ 1\\ 0\\[2pt] 0\\ 1\\ 0\end{pmatrix},\quad
\begin{pmatrix}-1\\ 1\\ 0\\[2pt] -1\\ 0\\ 1\end{pmatrix}.
$$
Thus,
$$
\{(x,y): Ax=By\}
=
\operatorname{span}\!\left\{
\big((1,-1, 1),(0,0,0)\big),\;
\big((-1,1,0),(0,1,0)\big),\;
\big((-1,1,0),(-1,0,1)\big)
\right\}.
$$

---

**(iv) Find a basis of } \operatorname{im}A \cap \operatorname{im}B.**

By (iii), vectors in the intersection are exactly those of the form $z=Ax=By$.  
For example,
$$
x=(-1,1,0),\ y=(0,1,0) \ \Longrightarrow\ 
Ax=By=\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$
Since $\operatorname{rank}(A)=\operatorname{rank}(B)=2$ in $\mathbb{R}^3$, the intersection has dimension $1$.
Therefore
$$
\operatorname{im}A\cap\operatorname{im}B
= \operatorname{span}\!\left\{\begin{pmatrix}0\\1\\1\end{pmatrix}\right\}.
$$

---

**(v) Find a basis of } L_A^{-1}(\operatorname{im}B)
=\{\,x\in\mathbb{R}^3:\ Ax\in\operatorname{im}B\,\}.**

This is precisely the set of $x$ for which there exists $y$ with $Ax=By$, i.e., the projection onto the $x$–coordinates of the solution set in (iii).  
From the basis in (iii), the $x$–parts are
$$
(1,-1, 1),\quad (-1,1,0),\quad (-1,1,0),
$$
so a basis is
$$
L_A^{-1}(\operatorname{im}B)
=\operatorname{span}\{\, (1,-1,1),\ (-1,1,0)\,\}.
$$
(Equivalently, this is $\ker A\ \oplus\ \operatorname{span}\{(-1,1,0)\}$, since $\ker A=\operatorname{span}\{(1,-1,1)\}$.)
