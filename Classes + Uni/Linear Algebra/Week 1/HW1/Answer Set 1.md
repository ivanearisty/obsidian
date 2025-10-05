### Problem 1
$$
\begin{gather}
\text{Let } V = {f:R \to (0,\infty)} \text{ with: } \\
(f+g)(x) = f(x)g(x) \text{ and } (cf)(x) = f(x)^{c} \\ \\
\text{Additive identity:} \\
\text{We need a function } z(x) \in V \text{ such that for any function } f(x) \in V: \\
(f+z)(x) = f(x) \\ \\
\text{We have:} \\
(f+z)(x) = f(x)z(x) \\ \\
\text{Since } f(x) \text{ is a positive function, we can devide by it, giving us:} \\
z(x) = 1 \\
\text{which is a continous function that maps } \mathbb{R} \text{ to } (0, \infty), \text{so it is in } V. \\ \\
\text{Therefore the additive identiy is a constant function: } z(x) = 1. \\ \\
\text{Additive Inverse:} \\
\text{The additive inverse of a function } f(x) \in V, \text{ denoted as } -f, \\
\text{is a function such that: } (f+(-f))(x) = z(x), \text{where } z(x) \text{ is the additive identity.} \\ \\
\text{Using the definitions of addition and the additive idenity, we have: } \\(f+(−f))(x)=f(x)(−f)(x)=1 \\ \\
\end{gather}
$$

### Problem 2

$$
\begin{gather}
\text{Let S be the set of polynomials of degree exactly }  n \text{ i.e. } \\
S = \{ a_{n}t^{n} + \dots + a_{0} \in \mathcal{P}_{n}(F) : a_{n} \neq 0\} \\ 
\text{Is } S \text{ a subspace of } \mathcal{P}_{n}(F) \\ \\
(i) 0 ∈ S \\ \\
\text{Since we cannot have } a_{n} = 0 \text{ the 0 vector is not included.} \\
\text{Hence, it's not on a subspace}
\\ \\
\end{gather}
$$
### Problem 3


![[Screenshot 2025-10-02 at 3.34.04 PM.png]]

#### 1
$$
\begin{gather}
\text{The element } \mathbf{0} \in V \text{ is unique.}\\
\text{Assume, for the sake of contradiction, that } \mathbf{0} \text{ is not unique.} \\
\text{Then there must be a vector } \mathbf{0}' \in V \text{ such that: } \\
\forall x \neq 0 \in V : x + \mathbf{0}' = x. \\
\text{However we have that } x + \mathbf{0} = x. \\
\text{Then } x + \mathbf{0}' = x + \mathbf{0} \\ 
\text{Removing x we see that: } \mathbf{0}' = \mathbf{0} \\
\text{So } \mathbf{0} \text{ must be unique.}
\end{gather}
$$

#### 2
$$
\begin{gather}
\text{For any } x ∈ V , 0x = \mathbf{0} \\
(a+b)x = ax + bx \\
(0+0)x = ax + bx \\
0x = 0x + 0x \\
\mathbf{0} = 0x 
\end{gather}
$$
#### 3
$$
\begin{gather}
\text{For any } a \in F, a \mathbf{0} = \mathbf{0} \\
a(x+y) = ax+ax \\
a(\mathbf{0} + \mathbf{0}) = a\mathbf{0}+a\mathbf{0} \\
a\mathbf{0} = a\mathbf{0}+a\mathbf{0} \\
\mathbf{0} = a\mathbf{0}
\end{gather}
$$
#### 4
![[Screenshot 2025-10-04 at 11.32.14 PM.png]]
$$
\begin{gather}
\text{If } a = 0 \\
\text{Then } a\mathbf{0} = \mathbf{0} \text{ which we proved above} \\
\text{If } a \neq 0 \\
a^{-1}(ax) = a^{-1}\mathbf{0}\\
(a^{-1}a)x = a^{-1}\mathbf{0}\\
1x = a^{-1}\mathbf{0}\\
1x = \mathbf{0} \\
x = \mathbf{0}
\end{gather}
$$
