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

### (i)

To find the matrix representation $[T]_\beta^\beta$ for the linear transformation $Tf = f' - f$ with respect to the basis $\beta = \{1, x, x^2, x^3\}$, we need to apply $T$ to each basis polynomial and express the result as a linear combination of the basis polynomials. The coefficients of these linear combinations form the columns of the matrix.

* $T(1) = (1)' - 1 = 0 - 1 = -1$.
    In terms of the basis, this is $-1 \cdot (1) + 0 \cdot (x) + 0 \cdot (x^2) + 0 \cdot (x^3)$.
    The first column is $\begin{pmatrix} -1 \\ 0 \\ 0 \\ 0 \end{pmatrix}$.

* $T(x) = (x)' - x = 1 - x$.
    In terms of the basis, this is $1 \cdot (1) + (-1) \cdot (x) + 0 \cdot (x^2) + 0 \cdot (x^3)$.
    The second column is $\begin{pmatrix} 1 \\ -1 \\ 0 \\ 0 \end{pmatrix}$.

* $T(x^2) = (x^2)' - x^2 = 2x - x^2$.
    In terms of the basis, this is $0 \cdot (1) + 2 \cdot (x) + (-1) \cdot (x^2) + 0 \cdot (x^3)$.
    The third column is $\begin{pmatrix} 0 \\ 2 \\ -1 \\ 0 \end{pmatrix}$.

* $T(x^3) = (x^3)' - x^3 = 3x^2 - x^3$.
    In terms of the basis, this is $0 \cdot (1) + 0 \cdot (x) + 3 \cdot (x^2) + (-1) \cdot (x^3)$.
    The fourth column is $\begin{pmatrix} 0 \\ 0 \\ 3 \\ -1 \end{pmatrix}$.

Combining these columns gives the matrix:
$$[T]_\beta^\beta = \begin{pmatrix} -1 & 1 & 0 & 0 \\ 0 & -1 & 2 & 0 \\ 0 & 0 & -1 & 3 \\ 0 & 0 & 0 & -1 \end{pmatrix}$$

***

### (ii)

The **kernel** of $T$, is the set of all polynomials $f \in \mathcal{P}_3(\mathbb{R})$ such that $Tf = 0$. This means we need to find all polynomials $f(x)$ that satisfy the differential equation $f' - f = 0$.

Let $f(x) = ax^3 + bx^2 + cx + d$.
Then, its derivative is $f'(x) = 3ax^2 + 2bx + c$.

The equation $f' - f = 0$ becomes:
$(3ax^2 + 2bx + c) - (ax^3 + bx^2 + cx + d) = 0$
$-ax^3 + (3a-b)x^2 + (2b-c)x + (c-d) = 0$

For this polynomial to be the zero polynomial, all of its coefficients must be zero:
1.  $-a = 0 \implies a = 0$
2.  $3a - b = 0 \implies 3(0) - b = 0 \implies b = 0$
3.  $2b - c = 0 \implies 2(0) - c = 0 \implies c = 0$
4.  $c - d = 0 \implies 0 - d = 0 \implies d = 0$

Since $a=b=c=d=0$, the only polynomial that satisfies the condition is the zero polynomial.
Thus, $\text{ker} T = \{0\}$.

***

### (iii)

To show that $T$ is surjective, we can use the **Rank-Nullity Theorem**, which states that for a linear transformation $T: V \rightarrow W$, the sum of the dimension of the kernel and the dimension of the image (or range) equals the dimension of the domain:
$$\dim(\text{ker} T) + \dim(\text{Im} T) = \dim(\mathcal{P}_3(\mathbb{R}))$$
The dimension of the polynomial space $\mathcal{P}_3(\mathbb{R})$ is 4, as it has a basis with four elements ($\{1, x, x^2, x^3\}$).

From part (ii), we determined that $\text{ker} T = \{0\}$, so its dimension is 0.
$0 + \dim(\text{Im} T) = 4$
$\dim(\text{Im} T) = 4$

The dimension of the image of $T$ is 4. Since the dimension of the image is equal to the dimension of the codomain, the image must be the entire codomain. Therefore, the transformation $T$ is **surjective**.

> Alternatively, since $T$ is a linear operator on a finite-dimensional vector space, it is injective if and only if it is surjective. Because the kernel of $T$ is trivial ($\text{ker} T = \{0\}$), $T$ is injective, which means it must also be surjective.

## Problem 3

### (i)

Show that $\text{dim}T(U) = \text{dim}U$.

To show that the dimension of the image of a subspace is equal to the dimension of the original subspace under an isomorphism, we can use the Rank-Nullity Theorem.

Let $T|_U: U \rightarrow T(U)$ be the restriction of the linear transformation $T$ to the subspace $U$. The range of this restricted transformation is $T(U)$.

Since $T: V \rightarrow W$ is an **isomorphism**, it is both **injective** and **surjective**
* A linear transformation is injective if and only if its kernel is trivial, i.e., $\text{ker} T = \{0\}$.
* The restriction of an injective map to a subspace is also injective. Therefore, $\text{ker}(T|_U) = \{0\}$.

According to the Rank-Nullity Theorem, for the restricted map $T|_U$:
$$\text{dim}(\text{ker}(T|_U)) + \text{dim}(\text{Im}(T|_U)) = \text{dim}(U)$$We know $\text{dim}(\text{ker}(T|_U)) = 0$ and $\text{Im}(T|_U) = T(U)$. Substituting these into the equation, we get:$$0 + \text{dim}(T(U)) = \text{dim}(U)$$
$$\text{dim}(T(U)) = \text{dim}(U)$$

***

### (ii)

Show that $S$ and $T$ are both invertible.

We are given that $S, T: V \rightarrow V$ are linear transformations and their product $ST$ is invertible. This means that $(ST)^{-1}$ exists, and $ST(ST)^{-1} = (ST)^{-1}ST = \text{id}_V$.

First, let's show that $T$ is invertible.
Since $ST$ is invertible, it is also **injective** (one-to-one). This means if $ST(v_1) = ST(v_2)$, then $v_1 = v_2$.
Now, consider the kernel of $T$. If $T(v) = 0$ for some $v \in V$, then $ST(v) = S(T(v)) = S(0) = 0$. Since $ST$ is injective, this implies $v = 0$. Thus, the kernel of $T$ is trivial, $\text{ker} T = \{0\}$, which means $T$ is injective.
Since $T$ is an injective linear operator on a finite-dimensional vector space, it must also be **surjective** and therefore **invertible**.

Next, let's show that $S$ is invertible.
We have $ST(ST)^{-1} = \text{id}_V$.
Let's consider the composition $S(T(ST)^{-1})$. This is a linear transformation. We can regroup the terms as follows:
$S(T(ST)^{-1}) = \text{id}_V$
This shows that $T(ST)^{-1}$ is a right inverse for $S$.
Also, consider the inverse of the product: $(ST)^{-1} = T^{-1}S^{-1}$. We know from the first part of the proof that $T^{-1}$ exists.
We can write $S = (ST)T^{-1}$. As a product of two invertible matrices, $S$ must also be **invertible**.

***

### (iii)

Show that $S$ is invertible and $S^{-1} = TR$.

We are given that $R, S, T: V \rightarrow V$ are linear transformations and $RST = \text{id}_V$.

Let's show that $R, S,$ and  are all invertible.
Since $RST$ is the identity map, it is an isomorphism, which implies it is both injective and surjective.
1.  **T is injective**: If $T(v)=0$, then $RST(v) = RS(0) = R(0) = 0$. Since $RST = \text{id}_V$, we have $RST(v) = v$. Thus, $v = 0$, which means $\text{ker} T = \{0\}$. So, $T$ is injective and therefore invertible.
2.  **R is surjective**: For any $w \in V$, we have $RST(w) = w$, which means $R(ST(w)) = w$. This shows that any vector $w$ can be expressed as the image of some vector $v = ST(w)$ under the transformation $R$. Therefore, $R$ is surjective and thus invertible.
3.  Since $R$ and $T$ are invertible, $S$ must also be invertible. We can express $S$ in terms of the other transformations and their inverses.
    We are given $RST = \text{id}_V$.
    Multiply by $R^{-1}$ on the left:
    $R^{-1}(RST) = R^{-1}(\text{id}_V)$
    $(R^{-1}R)ST = R^{-1}$
    $\text{id}_V ST = R^{-1}$
    $ST = R^{-1}$
    Now, multiply by $T^{-1}$ on the right:
    $(ST)T^{-1} = R^{-1}T^{-1}$
    $S(TT^{-1}) = R^{-1}T^{-1}$
    $S(\text{id}_V) = R^{-1}T^{-1}$
    $S = R^{-1}T^{-1}$
    Since $R^{-1}$ and $T^{-1}$ exist, their product $S$ must also be invertible.

Now we need to show that $S^{-1} = TR$.
Starting from $RST = \text{id}_V$, we can multiply by $S^{-1}$ on the right to get rid of $S$.
$(RST)S^{-1} = (\text{id}_V)S^{-1}$
$R(ST)S^{-1} = S^{-1}$
$R(T S S^{-1}) = S^{-1}$ This is incorrect because matrix multiplication is not commutative.

Let's use our previous result: $S = R^{-1}T^{-1}$.
Taking the inverse of both sides:
$S^{-1} = (R^{-1}T^{-1})^{-1}$
The inverse of a product of matrices is the product of the inverses in the reverse order: $(AB)^{-1} = B^{-1}A^{-1}$.
So, $S^{-1} = (T^{-1})^{-1}(R^{-1})^{-1} = TR$.