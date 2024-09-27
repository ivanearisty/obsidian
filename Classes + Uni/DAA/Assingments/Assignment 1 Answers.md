---
tags:
  - DAA
cssclasses:
  - academic-pdf-export
---
# Ivan Aristy — iae225
## Question 1: Asymptotic Notation

### Question A (8 points)

Rank the following functions in order (non-decreasing) of their asymptotic growth. Next to each function, write its big-Theta value, (ie. write the correct Θ(g(n)) next to each function but you are not required to prove the big-Theta value).

| Function to be Examined                             | Big Theta Value                                        |
| --------------------------------------------------- | ------------------------------------------------------ |
| $\frac{\sqrt{ n\log n+1 }}{n^{2}+1}$                | $\Theta\left( \frac{\sqrt{ \log n }}{n^{3/2}} \right)$ |
| $\log(n^{3}+ 2n)$                                   | $\Theta(\log n)$                                       |
| $\left( \log\left( \frac{n}{2} \right) \right)^{2}$ | $\Theta((\log n)^{2})$                                 |
| $2^{\log_{3}n}$                                     | $\Theta (n^{\log_{3}2})$                               |
| $2^{\log_{2}n+1}$                                   | $\Theta(n)$                                            |
| $\log_{3}2^n$                                       | $\Theta(n)$                                            |
| $\frac{n^{2}\log n + n}{n+\log n}$                  | $\Theta(n\log n)$                                      |
| $\sqrt{ n^{3}(\log n) + n}$                         | $\Theta(n^{3/2}\cdot \sqrt{ \log n })$                 |
| $8^{n/3+1}$                                         | $\Theta(2^{n})$                                        |
| $(2^{10}+6)\cdot(2^{n}+3^{n})$                      | $\Theta(3^{n})$                                        |
| $2^{3n+1}$                                          | $\Theta(8^{n})$                                        |

### Question B (6 points)

Determine if each of the following statements are true or false. If the statement is false, provide a counter example. If the statement is true, justify the statement using the formal definitions from class.

1. $\text{If } f(n) \text{ is } \mathcal{O}(n), \text{does this imply that } f(n) \text{ is also } \Theta(n) \text{?}$

False. $f(n)$ being $\mathcal{O}(n)$ just means that $f(n)$ has an upper bound of n; however, it does not describe the lower bound. The lower bound could be much smaller. For example, binary search has a $\Theta(\log n)$ however, anything higher is a valid upper bound; hence, it is also $\mathcal{O}(n)$

2. $\text{If } f(n) \text{ is } \mathcal{O}(n^{3}), \text{does this imply that } f(n) \text{ is also } \mathcal{O}(3^{n}) \text{?}$

True. The exponential function will grow larger asymptotically than the polynomial. Since the algorithm runs in $\mathcal{O}(n^{3})$ then we can say that there exists a positive constant c, such that after some threshold k we have: $f(n) \leq c_{1}*n^{3}$. It would also be $\mathcal{O}(3^{n})$ since there will exist some $n^{*}$ such that for all further n's, $n \geq n^{*}$, $n^{3} < 3^{n}$. Hence, $f(n) \leq c_{1} * n^{3} \leq c_{2} * 3^{n} : \forall n>n^{*}$

3. $\text{If} f(n) \text{ is } \mathcal{O}(n^{2}), \text{ does this imply that } f(n) \text{ is also } \mathcal{O}(n) \text{?}$

False. $f(n)$ being $\mathcal{O}(n^{2})$ does not necessarily imply that it is also $\mathcal{O}(n)$. Since big O describes an upper bound, it asserts that there exists some constant c, such that after a certain threshold, k, $f(n) \leq c * n^{2}:\forall n \geq k$ However, this is not a strict upper bound. Our function could actually be $\Theta(n)$ and the above would still be valid, but it would be $\mathcal{O}(n)$ as well—this being the tighter lower bound. In that scenario, $f(n)\leq c_{2}*n \leq c_{1} * n^2$ for all n after a large enough n.

### Question C (16 points)

For each of the following $f(n)$, show that $f (n)$ is $\Theta(g(n))$ for the correct function $g(n)$. Prove your result using the definitions from class, justifying your statement is true for all n ≥ k. (provide the value of k).

$f(n) = n^2 - \frac{\sqrt{ n }}{\log n}+n(\log n)^{2}$

$$
\begin{gather}
\text{We set out to prove that } f(n) \text{ is } \Theta(g(n)) \text{ for some function } g(n) . \\ \\
\text{First we have to realize that the dominant term is } n^{2} \text{ in the function above.} \\
\text{This is because it grows faster asymptotically than the other terms as } \lim_{ n \to \infty } . \\ \\
\text{To prove that} f(n) = \Theta(n^2), \text{ we set out to prove that there exists constants } c_{1}, c_{2} > 0 \\ \text{ and } k \geq 1 \text{ such that: } \\
c_{1} \cdot n^{2} \leq f(n) \leq c_{2} \cdot n^2 : \forall n \geq k. \\ \\
\text{Upper bound proof:} \\
\mathcal{O}(n^{2}) : \text{ We shall show that } n^2 - \frac{\sqrt{ n }}{\log n}+n(\log n)^{2} \leq c_{2} \cdot n^{2} \\
\end{gather}
$$
$$
\begin{align}
n^2 - \frac{\sqrt{ n }}{\log n} + n(\log n)^{2} \leq c_{2} \cdot n^{2} && \text{Initial Inequality} \\
n^2 + n(\log n)^{2} \leq c_{2} \cdot n^{2} && \text{Middle term makes smaller } \\ \\
n \geq (\log n)^{2}  && \forall n \geq 1 \text{ ... yes I checked} \\  \\
n^2 + n^2 \leq c_{2} \cdot n^{2} && n(\log n)^{2} \leq n^2 : \lim_{ n \to \infty } \space \land \forall n \geq 1  \\
2 \cdot n^2 \leq c_{2} \cdot n^2 && c_{2} = 2 \text{ is acceptable.} 
\end{align}
$$
$$
\begin{gather}
\text{And, we can set the value for } k_{1} = 1.
\end{gather}
$$
$$
\begin{gather}
\text{Lower bound proof:} \\
\Omega(n^{2}): \text{ We shall show that } n^2 - \frac{\sqrt{ n }}{\log n}+n(\log n)^{2} \geq c_{1} \cdot n^{2} \\
\end{gather}
$$

## Question 2

## Notes for self
1.3.1: is $n \geq \log(n)^{k} : \forall n \geq \land \space \forall k \geq 1$?