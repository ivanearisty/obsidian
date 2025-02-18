## Probability
### Random Variables
### Discrete and Continuous Probability Distributions
### Expectation
### Variance,
### Covariance
### Correlation
### Conditional and Joint Probability
### Gaussian random variables 
### Law of Large Numbers

## [Linear Algebra](http://web.stanford.edu/class/cs246/handouts/CS246_LinAlg_review.pdf)
https://chatgpt.com/c/67b41041-92d8-8009-9afd-ebf59877ca56
### Lesson 0:  Latex

$$
\begin{gather}
\text{vec + v } \rightarrow \vec{v} \\ \\

\text{pmat} \rightarrow \begin{pmatrix}
a \ b \ c  \\
d , e\\
e
\end{pmatrix} \\ \\

\text{bmat} \rightarrow
\begin{bmatrix}
a, b \\
c, d
\end{bmatrix}
\end{gather}
$$
### Lesson 1: Introduction to Scalars, Vectors, and Matrices

- **Topics Covered:**
    - Definitions of scalars, vectors, and matrices
    - Basic operations on vectors and matrices
    - The role of these structures in machine learning

A **scalar** is a single numerical value. Think of it as a point on the number line.

A **vector** is an ordered list of numbers. It can be thought of as a point in a multi-dimensional space.

Vectors are often written in bold (e.g., **v**) or with an arrow over them (e.g., $v$. They can also be represented as a column or row.

A **matrix** is a two-dimensional array of numbers arranged in rows and columns. Matrices are typically denoted by uppercase letters (e.g. **A, B**)

**i-hat** is the base vector in the x direction $\hat{i}$
**j-hat** is the base vector in the y direction $\hat{j}$
both of length 1

These **basis vectors** can be different on different coordinate systems.

The set of all possible vectors reachable with a linear combination of two vectors is called the **span**.
#### Addition
Add corresponding elements of two vectors.

![[Pasted image 20250217235844.png]]

#### Scalar Multiplication
Multiply each element by a scalar.
![[Pasted image 20250217235914.png]]
![[Pasted image 20250217235930.png | 400]]



### Lesson 2: Products and Multiplications

- **Topics Covered:**
    - Inner products (dot product)
    - Outer products
    - Matrix-vector multiplication
    - Matrix-matrix multiplication

![[Screenshot 2025-02-18 at 12.31.35 AM.jpg]]
#### Inner Product (Dot Product)

The **inner product** (commonly known as the dot product) of two vectors is the sum of the products of their corresponding entries. It gives a single scalar value.

For two vectors $\vec{a} = [a_1, a_2, \dots, a_n]$ and $\vec{b} = [b_1, b_2, \dots, b_n]$, the dot product is:
$$
\begin{gather}
\vec{a} \cdot \vec{b} = \sum_{i=1}^{n} a_i b_i
\end{gather}
$$
![[Screenshot 2025-02-18 at 12.05.36 AM.jpg]]



**Lesson 3: Norms and the Triangle Inequality**

- **Topics Covered:**
    - Vector norms (e.g., Euclidean norm)
    - Matrix norms (e.g., Frobenius norm, operator norm)
    - Understanding and applying the triangle inequality

**Lesson 4: Solving Systems of Linear Equations and Related Concepts**
<iframe width="560" height="315" src="https://www.youtube.com/embed/uQhTuRlWMxw?si=y9-ZNwxitPjc56LF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
- **Topics Covered:**
	- Inverse Matrix
    - Methods for solving linear systems (e.g., Gaussian elimination)
    - Linear independence
    - Matrix rank

**Lesson 5: Null Space and Orthogonal Matrices**

- **Topics Covered:**
    - The concept of the null space
    - Properties and applications of orthogonal matrices

**Lesson 6: Eigenvectors, Eigenvalues, and Eigendecomposition**

- **Topics Covered:**
    - Definitions and properties of eigenvectors and eigenvalues
    - Eigendecomposition
    - How these concepts apply to machine learning (e.g., PCA)
