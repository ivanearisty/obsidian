# Obsidian MathJax

## Problem 1

### (i)
Let $T: \mathbb{R}^4 \rightarrow \mathbb{R}^4$ be given by $T(x_1, x_2, x_3, x_4)^t = (x_1, x_1+x_2, x_1+x_2+x_3, x_1+x_2+x_3+x_4)^t$ and $\beta = \gamma$ be the standard basis of $\mathbb{R}^4$.

The standard basis vectors for $\mathbb{R}^4$ are:
$e_1 = (1, 0, 0, 0)^t$
$e_2 = (0, 1, 0, 0)^t$
$e_3 = (0, 0, 1, 0)^t$
$e_4 = (0, 0, 0, 1)^t$

We apply the transformation $T$ to each basis vector to find the columns of the matrix $[T]_\beta^\gamma$:
$T(e_1) = T(1, 0, 0, 0)^t = (1, 1, 1, 1)^t$
$T(e_2) = T(0, 1, 0, 0)^t = (0, 1, 1, 1)^t$
$T(e_3) = T(0, 0, 1, 0)^t = (0, 0, 1, 1)^t$
$T(e_4) = T(0, 0, 0, 1)^t = (0, 0, 0, 1)^t$

The matrix $[T]_\beta^\gamma$ is formed by these vectors as its columns:
$$[T]_\beta^\gamma = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 1 & 1 & 0 & 0 \\ 1 & 1 & 1 & 0 \\ 1 & 1 & 1 & 1 \end{pmatrix}$$

---

### (ii)
Let $T: \mathbb{R}^2 \rightarrow \mathbb{R}^2$ be the rotation of the plane around the origin counter-clockwise by angle $\theta$ and $\beta = \gamma$ be the standard basis on $\mathbb{R}^2$.

The standard basis vectors for $\mathbb{R}^2$ are:
$e_1 = (1, 0)^t$
$e_2 = (0, 1)^t$

The rotation matrix for a counter-clockwise rotation by angle $\theta$ is:
$$\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

Applying the transformation to the basis vectors:
$T(e_1) = T(1, 0)^t = (\cos\theta, \sin\theta)^t$
$T(e_2) = T(0, 1)^t = (-\sin\theta, \cos\theta)^t$

The matrix $[T]_\beta^\gamma$ is formed by these vectors as its columns:
$$[T]_\beta^\gamma = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

---

### (iii)
Let tr : $M_{2\times2}(\mathbb{F}) \rightarrow \mathbb{F}$ be the trace map defined by tr$\begin{pmatrix} a & b \\ c & d \end{pmatrix} = a + d$,
$\beta = \left\{ \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} \right\}$ and $\gamma = \{1\}$.

We need to find the matrix representation $[tr]_\beta^\gamma$ of the trace map.

We apply the trace map to each basis vector in $\beta$:
$tr\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} = 1+0 = 1$
$tr\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} = 0+0 = 0$
$tr\begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} = 0+0 = 0$
$tr\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = 0+1 = 1$
$$[tr]_\beta^\gamma = \begin{pmatrix} 1 & 0 & 0 & 1 \end{pmatrix}$$

## Problem 2

