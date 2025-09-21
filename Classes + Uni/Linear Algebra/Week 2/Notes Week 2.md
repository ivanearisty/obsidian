## 2.1 Span

### Definition 2.1 (Linear combination & span)
A **linear combination** of vectors $v_1,\dots,v_n\in V$ is anything you can build with addition and scalar multiplication:
$$a_1v_1+\cdots+a_nv_n, \quad a_i\in\mathbb{F}.$$
The **span**, denoted $\mathrm{span}(v_1,\dots,v_n)$, is the set of all such linear combinations. By convention, $\mathrm{span}\,\varnothing=\{0\}$ (if you have no building blocks, the only vector you can make is the zero vector).

**Why it matters:** Span answers the question, “what vectors can I make from these?” It’s how we generate entire spaces out of a small set of vectors.

### Proposition 2.2 (Span is a subspace)
$\mathrm{span}(v_1,\dots,v_n)$ is always a subspace of $V$. The proof checks the subspace axioms: it contains $0$, and it’s closed under vector addition and scalar multiplication.

**Why it matters:** This guarantees the span is a legitimate vector space living inside $V$, so all your usual vector-space tools apply.

### Example 2.3 (Geometric intuition in $\mathbb{R}^3$)
- With $v_1=(1,0,0)^t$: $\mathrm{span}(v_1)$ is the x-axis.
- With $v_1$ and $v_2=(0,1,0)^t$: $\mathrm{span}(v_1,v_2)$ is the xy-plane.
- Adding $v_3=(1,1,0)^t$ doesn’t enlarge the span; it’s still the xy-plane.
- Adding $v_4=(0,0,1)^t$ now spans all of $\mathbb{R}^3$.

**Takeaway:** Extra vectors can be redundant (they don’t increase the span). This idea is the doorway to understanding independence vs. dependence.

### Definition 2.4 (Spanning set; finite/infinite dimensional)
A list $v_1,\dots,v_n$ **spans** $V$ if $\mathrm{span}(v_1,\dots,v_n)=V$. A space that has a finite spanning set is **finite-dimensional**; otherwise it’s **infinite-dimensional**.

**Why it matters:** Finite dimensionality is what unlocks most of the “counting” theorems you learn next (like the replacement theorem and dimension formulas).

---

## 2.2 Linear dependence and independence

### Definition 2.5 (Dependent vs. independent)
- $v_1,\dots,v_n$ are **linearly dependent** if some non-all-zero coefficients exist with $a_1v_1+\cdots+a_nv_n=0$.
- They’re **linearly independent** if the only solution to $a_1v_1+\cdots+a_nv_n=0$ is $a_1=\cdots=a_n=0$.

**Why it matters:** Dependence means there is redundancy in your generating set. Independence means there is no redundancy. Independence is the “minimality” half of the coming notion of a basis.

### Examples 2.6 & 2.7 (Quick tests)
- $(1,0,0)^t$ and $(0,1,0)^t$ are **independent** because $a_1(1,0,0)^t+a_2(0,1,0)^t=(0,0,0)^t$ forces $a_1=a_2=0$.
- Adding $v_3=(1,1,0)^t$ makes the list **dependent** since $v_1+v_2-v_3=0$.

### Lemma 2.8 (Characterization via prefixes of the list)
(i) The list $v_1,\dots,v_n$ is **dependent** iff some vector $v_k$ lies in $\mathrm{span}(v_1,\dots,v_{k-1})$.
(ii) The list is **independent** iff no $v_k$ lies in the span of its predecessors.

**Why it matters:** This provides a practical, algorithmic test for independence: scan from left to right; each new vector must bring something genuinely new to the span.

---

## 2.3 Basis

### Definition 2.10 (Basis)
A list $v_1,\dots,v_n$ is a **basis** of $V$ if it both (a) **spans** $V$ and (b) is **linearly independent**. That is: it builds the space with no redundancy.

### Lemma 2.11 (Every spanning set contains a basis)
Start with any spanning list. For each vector in order, delete it if it lies in the span of the preceding vectors. The vectors that remain will still span the space and will be linearly independent—hence, a basis.

**Why it matters:** You can always prune a bulky spanning set down to a minimal, efficient one.

### Theorem 2.13 (Replacement Theorem)
If $v_1,\dots,v_n$ is a basis of $V$ and $w_1,\dots,w_m$ are linearly independent, then $n \ge m$. In other words, a linearly independent set can’t be longer than a spanning set.

**Why it matters:** This is the engine behind the uniqueness of dimension.

### Corollary 2.14 (All bases have the same length)
In a finite-dimensional space, any two bases have the same number of vectors.

### Definition 2.15 (Dimension)
The **dimension**, $\dim V$, is the number of vectors in any basis for $V$.

### Corollary 2.16 (Extend LI to a basis)
Any linearly independent set in a finite-dimensional space can be extended to a basis.

### Corollary 2.17 (Subspace dimension inequality)
If $W \subseteq V$ and $V$ is finite-dimensional, then $W$ is also finite-dimensional and $\dim W \le \dim V$. If equality holds, then $W=V$.

### Examples of Bases and Dimension
- **Example 2.18:** The standard basis of $\mathbb{F}^n$ is $\{e_1, \dots, e_n\}$, so $\dim\mathbb{F}^n=n$.
- **Example 2.19:** The plane $V=\{(a_1,a_2,a_3)^t\in\mathbb{F}^3: a_1+a_2+a_3=0\}$ has basis $\{(-1,1,0)^t,\,(-1,0,1)^t\}$ and $\dim V=2$.
- **Example 2.20:** The basis for $M_{m\times n}(\mathbb{F})$ consists of matrices with a single 1 and zeros elsewhere. Thus, $\dim M_{m\times n}(\mathbb{F})=mn$.
- **Example 2.21:** The standard basis of $P_n(\mathbb{F})$ is $\{1,x,\dots,x^n\}$, so $\dim P_n(\mathbb{F})=n+1$.
- **Example 2.22:** The solution space $V=\{f\in C^2(\mathbb{R}): f''+f=0\}$ has basis $\{\cos x,\sin x\}$; hence $\dim V=2$.

---

## 2.4 Operations on Subspaces

### Proposition 2.23 (Intersections are subspaces)
If $V_1$ and $V_2$ are subspaces of $V$, then their intersection $V_1\cap V_2$ is also a subspace.

### Definition 2.25 (Sum of subspaces)
For subspaces $V_1, V_2 \subseteq V$, their **sum** is:
$$V_1+V_2=\{v_1+v_2: v_1\in V_1, v_2\in V_2\}.$$
This is the smallest subspace that contains both $V_1$ and $V_2$.

### Theorem 2.28 (Dimension formula for two subspaces)
$$\dim(V_1+V_2)=\dim V_1+\dim V_2-\dim(V_1\cap V_2).$$
This formula corrects for double-counting the vectors in the intersection.

---

## Meta-Insights

- **Minimal Generators = Bases:** Span tells you what a set can generate; independence tells you if any generators are redundant. A **basis** is the sweet spot: it generates everything with no redundancy.
- **Replacement Controls Size:** The Replacement Theorem is the backbone of dimension theory. It’s why all bases have the same length.
- **Operations on Subspaces Behave Nicely:** Intersections and sums of subspaces are still subspaces. The dimension formula provides a quantitative relationship between them.