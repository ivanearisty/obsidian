
#### **Category 1: The Definition of a Linear Transformation**

These problems test your ability to apply the two core properties of linearity: `T(x+y) = T(x)+T(y)` and `T(cx) = cT(x)`.

1.  **Verifying Linearity (Adapted from Problem Set 3, Problem 4)**
    Let `T: P₂(ℝ) → P₂(ℝ)` be the transformation defined by `T(p(x)) = p(x-1)`. For example, `T(x² + 3) = (x-1)² + 3 = x² - 2x + 4`. Is `T` a linear transformation? Prove your answer by checking the two properties.

    *   **What this tests**: Your ability to apply the definition of linearity in a vector space other than ℝⁿ. You must show that `T(p+q) = T(p)+T(q)` and `T(c*p) = c*T(p)` for any polynomials `p` and `q`.

2.  **Identifying Non-Linearity**
    Consider the map `T: C¹(ℝ) → C(ℝ)` (from continuously differentiable functions to continuous functions) defined by `T(f(x)) = x * f'(x) + 1`. Is `T` a linear transformation? If not, provide a specific counterexample.

    *   **What this tests**: Your ability to spot a failure of linearity. A transformation must map the zero vector to the zero vector. What is `T(0)` here? This is often the quickest way to disqualify a transformation.

---

#### **Category 2: Kernel, Image, Rank, and Nullity**

This is a core computational skill. These problems test your ability to find the fundamental subspaces of a linear transformation and relate their dimensions.

3.  **Finding Bases for Kernel and Image (From Practice Midterm, Problem 5)**
    Consider the linear transformation `T: ℝ³ → ℝ³` given by `T(x) = Ax`, where
    `A = [[2, 4, 1], [-3, -6, 2], [1, 2, 1]]`
    *   **(a)** Find a basis for the kernel (null space) of `T`.
    *   **(b)** Find a basis for the image (range) of `T`.
    *   **(c)** State the nullity (`dim(ker T)`) and the rank (`dim(im T)`) of `T`.

    *   **What this tests**: Your mastery of Gaussian elimination (row reduction). You need to solve the homogeneous system `Ax=0` to find the kernel and identify the pivot columns of `A` to find a basis for the image.

4.  **Applying the Rank-Nullity Theorem (Conceptual)**
    *   **(a) (From Lecture 4, Corollary 4.15)** Let `T: ℝ⁵ → ℝ³` be a linear transformation. Can `T` be injective (one-to-one)? Explain your answer using the Rank-Nullity Theorem.
    *   **(b)** Suppose you are told that the transformation `T` from part (a) is surjective (onto). What must the dimension of its kernel be?

    *   **What this tests**: Your understanding of the **Rank-Nullity Theorem** (`dim(V) = rank(T) + nullity(T)`) as a theoretical tool, not just a computational check. For (a), consider the maximum possible rank of `T`. For (b), use the definition of surjectivity to determine the rank.

---

#### **Category 3: Matrix Representation of a Linear Transformation**

This tests your ability to translate an abstract linear transformation into a concrete matrix with respect to given bases.

5.  **Finding the Matrix [T] (From Practice Midterm, Problem 4)**
    Let `V` be the vector space `V = span{e³ˣcos(x), e³ˣsin(x)}`. Let `β = (e³ˣcos(x), e³ˣsin(x))` be a basis for `V`. Consider the linear map `L: V → V` defined by `L(f) = f' - f` (the derivative of `f` minus `f`). Find the matrix representation of `L` with respect to the basis `β`, denoted `[L]β`.

    *   **Hint**: To find the first column of the matrix, calculate `L(e³ˣcos(x))`, and write the result as a linear combination of the basis vectors in `β`. The coefficients will be the first column. Repeat for the second basis vector.
    *   **What this tests**: The full procedure for finding a matrix representation: apply the transformation to each basis vector of the domain, and then find the coordinates of the resulting vectors with respect to the basis of the codomain.

6.  **Matrix Representation with Polynomials (From Problem Set 4, Problem 2)**
    Let `T: P₂(ℝ) → P₂(ℝ)` be the linear transformation `T(f) = f' - f`. Let `β = {1, x, x²}` be the standard basis for `P₂(ℝ)`. Find the matrix `[T]β`.

    *   **What this tests**: The same skill as the previous problem but in the more familiar setting of polynomials, which can be a good way to check your understanding of the process.

---

#### **Category 4: Synthesis and Proofs**

This problem requires you to use the definitions of linearity and independence to construct a formal proof, a key skill for the exam.

7.  **A Proof on Injectivity and Independence (From Problem Set 3, Problem 3.iv)**
    Let `T: V → W` be a linear transformation. Suppose you have a set of vectors `{v₁, ..., vₙ}` in `V` such that their images, the set `{T(v₁), ..., T(vₙ)}`, are linearly independent in `W`. Prove that the original set of vectors `{v₁, ..., vₙ}` must be linearly independent in `V`.

    *   **Hint**: Start with the standard setup for an independence proof: `c₁v₁ + ... + cₙvₙ = 0`. Your goal is to show all `cᵢ` must be zero. Apply the transformation `T` to both sides of the equation and use the property of linearity.
    *   **What this tests**: Your ability to write a formal proof using the definitions. This shows a deep understanding of how linearity preserves structure.