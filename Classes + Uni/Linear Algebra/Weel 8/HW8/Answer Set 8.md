## Problem 1

![[Screenshot 2025-11-09 at 6.25.29 PM.png]]

$$
\begin{gather}
tI = \begin{pmatrix}
t & 0 & 0 & \dots & 0  \\
0 & t & 0 & \dots & 0  \\
0 & 0 & t & \dots & 0  \\
0 & 0 & 0 & \dots & t 
\end{pmatrix}
\end{gather}
$$
$$
\begin{gather}
M = A + tI = \begin{pmatrix}
t & 0 & 0 & \dots & a_{0}  \\
-1 & t & 0 & \dots & a_{1}  \\
\vdots & \vdots & \vdots & \vdots &\vdots & \\
0 & -1 & t & \dots & a_{n-2}  \\
0 & 0 & -1 & \dots & t a_{n-1}
\end{pmatrix}
\end{gather}
$$
$$
\begin{gather}
\det(A + tI) = t \cdot -1^{1+1} \det M_{11} + -1^{1+n} \cdot a_{0} \det(M_{1n}) \\
\det(A + tI) = t \det M_{11} + -1^{1+n} \cdot a_{0} \det(M_{1n}) \\ 
\\ \text{Deleting the first row and column gives the same pattern as the original,} \\
\text{but with size } (n-1)\times (n-1) \\
\\
D_{n-1}(t) = \det(M_{11}) \\
\\
\text{Deleting the first row and last column gives us a minor that is upper triangular.} \\
\text{It's determinant is } -1^{n-1} \\
\text{Thererefore we have } -1^{1+n} \cdot a_{0} -1^{1-n} = -1^{(1+n)+(n-1)} \cdot a_{0} = -1^{2n} \cdot a_{0} \\
\text{Since 2n is always positive we just get } a_{0} \\ \\

D_{n}(t) = t \cdot D_{n-1}(t) + a_{0} \\
\\
\text{With the base case } D_{1}(t) = t + a_{0} \\
\text{this recurrence will unroll to } t^{n} + a_{n-1}t^{n-1} + a_{n-2}t^{n-2} + \dots a_{1}t + a_{0}
\end{gather} 
$$

## Problem 2
![[Screenshot 2025-11-09 at 7.07.08 PM.png]]
### (i)
$$
\begin{gather}
\text{If } (A^m=0) \text{ for some } (m>0), \text{ then} \\
0=\det(A^m)=\det(A)^m. \\
\text{Over a field, the only scalar whose m-th power is 0 is 0. Hence }  \\\det(A)=0.
\end{gather}
$$

### (ii)

 Scaling one row by c scales the determinant by c. Scaling **all n rows** multiplies by $c^{n}$.

### (iii)

$\det(A)=\det(A^t)=\det(-A)=(-1)^{2n+1}\det(A)=-\det(A).$
Thus $2\det(A)=0\Rightarrow \det(A)=0$
### (iv)
$1=\det(I)=\det(AA^t)=\det(A)\det(A^t)=\det(A)^2.$
### (v)
$$
\begin{gather}
\text{Two identities:} \\
1. \text{Since } A \text{ is orthogonal }, A^tA=I \\
   A^t-I=A^t-A^tA=A^t(I-A) \\
   \text{Taking determinants:} \\
   \det(A^t-I)=\det(A^t)\det(I-A)=\det(A)\det(I-A)=\det(I-A) \\
   \text{because } \det(A)=1 \text{ and } \det(A^t)=\det(A). \\
\\
2. \text{Also } (I-A)^t=I-A^t, \text{ hence} \\
   A^t-I=-(I-A^t)=-(I-A)^t \\
   \text{so, for} 3\times3 \text{ matrices}, \\
   \det(A^t-I)=\det!\big(- (I-A)^t\big)=(-1)^3\det!\big((I-A)^t\big)=-\det(I-A) \\
\\
\text{Combine the two expressions for } \det(A^t-I) \\
\det(I-A)=-\det(I-A) \Rightarrow 2\det(I-A)=0 \Rightarrow \boxed{\det(I-A)=0.}
\end{gather}
$$


## Problem 3

### $\Leftarrow$ If $\det(A)=\pm1$, then $A^{-1}$ has integer entries

Cofactor/adjugate formula:

$$A^{-1}=\frac{1}{\det(A)}\operatorname{adj}(A)$$

where $\operatorname{adj}(A)$ is the transpose of the cofactor matrix.

Each cofactor is $(\pm)\det(\text{integer minor})$, hence integer. So $\operatorname{adj}(A)\in M_{n\times n}(\mathbb{Z})$.

If $\det(A)=\pm1$, dividing by $\pm1$ doesn’t change integrality, thus $A^{-1}\in M_{n\times n}(\mathbb{Z})$.

### $\Rightarrow$ If $A^{-1}$ has integer entries, then $\det(A)=\pm1$

Take determinants:

$$\det(A^{-1})=\frac{1}{\det(A)}$$

Since $A$ has integer entries, $\det(A)\in\mathbb{Z}$. Since $A^{-1}$ has integer entries, $\det(A^{-1})\in\mathbb{Z}$ too.

Thus $1/\det(A)\in\mathbb{Z}$. The only integers whose reciprocals are integers are $\pm1$. Hence $\det(A)=\pm1$.
## Problem 4
### (i)
#### 1
$$
 \\ \mathbf{1}\mathbf{1}^t = \begin{pmatrix} 1 \\ 1 \\ \vdots \\ 1 \end{pmatrix} \begin{pmatrix} 1 & 1 & \cdots & 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 & \cdots & 1 \\ 1 & 1 & \cdots & 1 \\ \vdots & \vdots & \ddots & \vdots \\ 1 & 1 & \cdots & 1 \end{pmatrix} = J\_n
$$
$$
 \\ I\_n + J\_n = \begin{pmatrix} 1 & 0 & \cdots & 0 \\ 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 1 \end{pmatrix} + \begin{pmatrix} 1 & 1 & \cdots & 1 \\ 1 & 1 & \cdots & 1 \\ \vdots & \vdots & \ddots & \vdots \\ 1 & 1 & \cdots & 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 & \cdots & 1 \\ 1 & 2 & \cdots & 1 \\ \vdots & \vdots & \ddots & \vdots \\ 1 & 1 & \cdots & 2 \end{pmatrix}
$$
#### 2 
$A^{-1} = I_n^{-1} = I_n$.
$v^t A^{-1} u = \mathbf{1}^t I_n \mathbf{1} = \mathbf{1}^t \mathbf{1}$.
This is the dot product of $\mathbf{1}$ with itself:
$$ \\ \mathbf{1}^t \mathbf{1} = \begin{pmatrix} 1 & 1 & \cdots & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \\ \vdots \\ 1 \end{pmatrix} = (1 \cdot 1) + (1 \cdot 1) + \cdots + (1 \cdot 1) \text{ (n times)} = \sum_{i=1}^n 1 = n$$

### (ii)

$$R_2 \leftarrow R_2 - u \cdot R_1$$
$$\begin{pmatrix} 1 & -v^t \\ 0 & A+uv^t \end{pmatrix}$$
This kind of row operation does not change the determinant. So, $\det(M)$ is the same as the determinant of this new, cleaner matrix.

Because it's block upper-triangular, the determinant is just the product of the determinants of the blocks on the diagonal:
$$\det(M) = \det(1) \cdot \det(A+uv^t) = \det(A+uv^t)$$

---

### (iii) The Column Operation Trick

Let's call $C_1 = \begin{pmatrix} 1 \\ u \end{pmatrix}$ and the second column block $C_2 = \begin{pmatrix} -v^t \\ A \end{pmatrix}$.


$C_1 \leftarrow C_1 - C_{2} \cdot (A^{-1}u)$
$$\begin{pmatrix} 1+v^t A^{-1}u & -v^t \\ 0 & A \end{pmatrix}$$
Just like our row operation, this column operation does not change the determinant.

This matrix is *also* block upper-triangular. So, we calculate its determinant the same way:
$$\det(M) = \det(1+v^t A^{-1}u) \cdot \det(A)$$
Since $1+v^t A^{-1}u$ is just a single number (a $1 \times 1$ matrix), its determinant is just itself.
### (iv)


### (v)