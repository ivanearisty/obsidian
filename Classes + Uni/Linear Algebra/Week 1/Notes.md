# Introduction

The familiar “vector rules” (add tip-to-tail, scale to stretch/shrink, parallelogram picture, etc.) work the same in 3-D space as in the plane. Using those rules, we can write compact vector equations for lines and planes.
## A line through two points $P$ and $Q$

* Let $\mathbf{u}=\overrightarrow{OP}$ and $\mathbf{v}=\overrightarrow{OQ}$ be the **position vectors** of $P$ and $Q$.
* The direction from $P$ to $Q$ is $\mathbf{w}=\overrightarrow{PQ}=\mathbf{v}-\mathbf{u}$ (difference of coordinates).
* Any point $X$ on the line through $P$ and $Q$ is

  $$
  \mathbf{x}=\mathbf{u}+t\,\mathbf{w}
  \;=\; \mathbf{u}+t(\mathbf{v}-\mathbf{u})
  \;=\; P+t(Q-P),\qquad t\in\mathbb{R}.
  $$

  This is the **vector/parametric equation** of the line.
  (If you prefer coordinates: if $P=(x_1,y_1,z_1)$ and $Q=(x_2,y_2,z_2)$, then the direction is $(x_2-x_1,\; y_2-y_1,\; z_2-z_1)$.)

**Example (from the text).**
$P=(-2,0,1),\; Q=(4,5,3)$.
Direction $Q-P=(6,5,2)$.
Line: $\displaystyle \mathbf{x}=(-2,0,1)+t(6,5,2)$.
Equivalently (since all three direction components are nonzero):

$$
\frac{x+2}{6}=\frac{y}{5}=\frac{z-1}{2}.
$$

## A plane through three non-collinear points $P,Q,R$

* Build two independent directions inside the plane:

  $$
  \mathbf{u}=\overrightarrow{PQ}=Q-P,\qquad
  \mathbf{v}=\overrightarrow{PR}=R-P.
  $$
* Any point $X$ in that plane can be reached from $P$ by some combination of those two directions:

  $$
  \mathbf{x}=P+s\,\mathbf{u}+t\,\mathbf{v},\qquad s,t\in\mathbb{R}.
  $$

  That’s the **parametric equation** of the plane. (Requires $P,Q,R$ not collinear so that $\mathbf{u}$ and $\mathbf{v}$ aren’t parallel.)

**Example (from the text).**
$P=(1,0,2),\; Q=(-3,-2,4),\; R=(1,8,-5)$.
$\mathbf{u}=Q-P=(-4,-2,2),\quad \mathbf{v}=R-P=(0,8,-7)$.
Plane: $\displaystyle \mathbf{x}=(1,0,2)+s(-4,-2,2)+t(0,8,-7)$.

It’s often handy to also give the **scalar (implicit) form** using a normal vector.
Take $\mathbf{n}=\mathbf{u}\times\mathbf{v}=(1,14,16)$ (any nonzero multiple works).
Then

$$
\mathbf{n}\cdot(\mathbf{x}-P)=0
\;\;\Longleftrightarrow\;\;
x+14y+16z=33.
$$

## About the “eight properties”

The passage alludes to the standard vector space axioms (closure, associativity/commutativity of $+$, additive identity/inverses, distributivity and associativity for scalar multiplication, and the scalar identity). Any structure satisfying them is a **vector space**—$\mathbb{R}^2$, $\mathbb{R}^3$, and many others.

## Small gotchas

* For a line, $P\neq Q$.
* For a plane, $P,Q,R$ must be non-collinear (otherwise $\mathbf{u}$ and $\mathbf{v}$ are parallel and you don’t get a plane).

## What “parallel” / “collinear” means

* Two **vectors** $\mathbf{a}, \mathbf{b}\neq \mathbf{0}$ are **parallel** iff one is a scalar multiple of the other: $\mathbf{b}=k\mathbf{a}$ for some real $k$.
* Three **points** $O,P,Q$ (with $O$ the origin) are **collinear** iff the vectors $\overrightarrow{OP}$ and $\overrightarrow{OQ}$ are parallel.
  Equivalently, $Q$ lies on the line through $O$ and $P$, i.e. $Q=tP$ for some $t$.

![[Pasted image 20250910185603.png | 700]]

### Proof by “scalar multiple” test (quickest)

Example: $P=(3,1,2),\quad Q=(6,4,2)$

Assume $Q=kP$. Then compare coordinates:

$$
6=3k\Rightarrow k=2,\qquad 4=1k\Rightarrow k=4,\qquad 2=2k\Rightarrow k=1.
$$

You can’t have $k=2,4,$ and $1$ simultaneously. Contradiction.
So $Q$ is **not** a scalar multiple of $P$ ⇒ $\overrightarrow{OP}$ and $\overrightarrow{OQ}$ are **not parallel**, and $O,P,Q$ are **not collinear**.

### Proof by cross product (also standard in $\mathbb{R}^3$)

Compute $P\times Q$:

$$
P\times Q
=\begin{vmatrix}
\mathbf{i}&\mathbf{j}&\mathbf{k}\\[2pt]
3&1&2\\
6&4&2
\end{vmatrix}
=(-6,\,6,\,6)\neq \mathbf{0}.
$$

Nonzero cross product ⇒ not parallel.

### Using your $Q-P$ computation (nice intuition check)

You found $Q-P=(3,3,0)$.
If $O,P,Q$ were collinear, then $Q-P$ would be a scalar multiple of $P$ (indeed, $Q=tP\Rightarrow Q-P=(t-1)P$).
Test that:

$$
(3,3,0)=k(3,1,2)\ \Rightarrow\ 3k=3\Rightarrow k=1,\ \text{but then }1\cdot 1=1\neq 3.
$$



# Vector & Geometry Practice

## 1) Parallel vectors from the origin

Determine whether the vectors **from the origin** to each pair of points are parallel.

**(a)** $(3,\,1,\,2)$ and $(6,\,4,\,2)$

$$
\begin{gather}
\text{Assume } (3,\,1,\,2) \text{ and } (6,\,4,\,2) \text{ are parallel}. \\ \\
\text{Then, there is some k, such that } (3,\,1,\,2) = k(6,\,4,\,2). \\ \\
6=3k\Rightarrow k=2,\qquad 4=1k\Rightarrow k=4,\qquad 2=2k\Rightarrow k=1. \\ \\
\text{You can’t have $k=2,4,$ and $1$ simultaneously. Contradiction.}
\end{gather}
$$

**(b)** $(-3,\,1,\,7)$ and $(9,\,-3,\,-21)$

$$
\begin{gather}
\text{Assume } (-3,\,1,\,7) \text{ and } (9,\,-3,\,-21) \text{ are parallel}. \\ \\
\text{Then, there is some k, such that } (-3,\,1,\,7) = k(9,\,-3,\,-21). \\ \\
-\frac{9}{3} , -\frac{3}{1}, -\frac{21}{7} = \frac{-3}{1} \Rightarrow \text{parallel.}
\end{gather}
$$

> Since the same kkk works for all coordinates, the vectors are **parallel** (specifically, antiparallel—they point in opposite directions).

**(c)** $(5,\,-6,\,7)$ and $(-5,\,6,\,-7)$

$-\frac{5}{5}, -\frac{6}{6}, -\frac{7}{7} = -1 \Rightarrow \parallel$

**(d)** $(2,\,0,\,-5)$ and $(5,\,0,\,-2)$

$\frac{5}{2},0, \frac{2}{5}$ not parallel

*Answer idea:* Check if one vector is a scalar multiple of the other.

---

## 2) Lines through two points in space

Find a vector/parametric equation of the line through each pair of points.

**(a)** $(3,\,-2,\,4)$ and $(-5,\,7,\,1)$

$$
\begin{gather}
u = (3,\,-2,\,4) , v = (-5,\,7,\,1)
\end{gather}
$$

**(b)** $(2,\,4,\,0)$ and $(-3,\,-6,\,0)$
**(c)** $(3,\,7,\,2)$ and $(3,\,7,\,-8)$
**(d)** $(-2,\,-1,\,5)$ and $(3,\,9,\,7)$

*Answer idea:* Use $\mathbf{x} = P + t(Q-P)$.

---

## 3) Planes through three points in space

Find a parametric equation (and optionally a scalar/normal form) of the plane containing each triple of points.

**(a)** $(2,\,-5,\,-1),\ (0,\,4,\,6),\ (-3,\,7,\,1)$
**(b)** $(3,\,-6,\,7),\ (-2,\,0,\,-4),\ (5,\,-9,\,-2)$
**(c)** $(-8,\,2,\,0),\ (1,\,3,\,0),\ (6,\,-5,\,0)$
**(d)** $(1,\,1,\,1),\ (5,\,5,\,5),\ (-6,\,4,\,2)$

*Answer idea:* Let $\mathbf{u}=Q-P$ and $\mathbf{v}=R-P$, then $\mathbf{x}=P + s\mathbf{u} + t\mathbf{v}$.
(Optional) Find a normal $\mathbf{n}=\mathbf{u}\times \mathbf{v}$ and write $\mathbf{n}\cdot(\mathbf{x}-P)=0$.

---

## 4) Concept & proof questions

**(a) Zero vector in the Euclidean plane**
What are the coordinates of the vector $\mathbf{0}$ in $\mathbb{R}^2$ that satisfies *condition 3 on page 3* (the additive identity property: $\mathbf{x} + \mathbf{0} = \mathbf{x}$)?
*Prove that your choice satisfies this condition.*

**(b) Scaling endpoints**
Let $\mathbf{x}$ be the vector from the origin to $(a_1, a_2)$ in $\mathbb{R}^2$. Prove that for any real $t$, the vector $t\mathbf{x}$ (from the origin) terminates at $(ta_1, ta_2)$.

**(c) Parallelogram diagonals**
Prove that the diagonals of a parallelogram bisect each other.

---
