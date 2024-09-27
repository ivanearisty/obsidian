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
\text{And, we can set the value for } k_{2} = 1.
\end{gather}
$$
$$
\begin{gather}
\text{Lower bound proof:} \\
\Omega(n^{2}): \text{ We shall show that } n^2 - \frac{\sqrt{ n }}{\log n}+n(\log n)^{2} \geq c_{1} \cdot n^{2} \\
\text{We can drop the } n(\log n)^{2} \text{ since it makes the function bigger and we have:} \\
n^2 - \frac{\sqrt{ n }}{\log n}\geq c_{1} \cdot n^{2} \\
\text{ We can replace } \frac{\sqrt{ n }}{\log n}\geq c_{1}  \text{ with } \frac{n^{2}}{2} \\
\text{ for a k value of 4 we get}: \frac{\sqrt{ 4 }}{\log_{2}(4)} = \frac{2}{2} \text{ and } \frac{n^{2}}{2} = \frac{4^{2}}{2}=8 \\
\text{Hence, we get:} \\
n^{2} - \frac{n^{2}}{2} = \frac{1}{2} \cdot n^{2} \geq c_{1} \cdot n : \forall n \geq k_{1}, k_{1} = 4
\end{gather}
$$
$$
\begin{gather}
\text{Finally, we can say that the function f(n) is } \Theta(n^{2}) \\ \text{ for all } n \geq 4 \text{ sandwiched between our } c_{1} \text{ and } c_{2}
\end{gather}
$$
$f(n) = \frac{3n^{3}-n}{2n+\log n} + 2^{10}$
$$
\begin{gather}
\text{We set out to prove that } f(n) \text{ is } \Theta(g(n)) \text{ for some function } g(n) . \\ \\
\text{First we have to realize that the dominant term is } n^{2} \text{ in the function above.} \\
\text{This is because } 2^{10} \text{ is just some constant and the terms in the fraction come out to } n^{2} \\
\text{To prove that} f(n) = \Theta(n^2), \text{ we set out to prove that there exists constants } c_{1}, c_{2} > 0 \\ \text{ and } k \geq 1 \text{ such that: } \\
c_{1} \cdot n^{2} \leq \frac{3n^{3}-n}{2n+\log n} + 2^{10} \leq c_{2} \cdot n^{2}
\end{gather}
$$
$$
\begin{gather}
\text{Upper bound: } \\
\text{We set out to show that } \mathcal{O}(n^{2}) = \frac{3n^{3}-n}{2n+\log n} + 2^{10} \\ 
\text{So, there exists a } c_{2} \text{ and } k_{2} \text{ such that: }\\
\frac{3n^{3}-n}{2n+\log n} + 2^{10} \leq c_{2} \cdot n^{2} : \forall n \geq k \\
\\
\text{Let's deal with the constant first.}\\
2^{10} = 1024. \text{ So, we can replace it with an } n^{2} \text{ for values where } n^{2} \geq 1024 \\
\text{This is } n = \sqrt{ 1024 } = 32\\
\text{Preliminarily, } k_{2} = 32 \\ \\
\text{Now we have:} \\
\frac{3n^{3}-n}{2n+\log n} + n^{2} \leq c_{2} \cdot n^{2} \\ \\
\text{Since the logarithm on the denominator and negative n on numerator} \\
\text{both decrease the function's value:} \\
\frac{3n^{3}}{2n} + n^{2} \leq c_{2} \cdot n^{2} \rightarrow \frac{3n^{2}}{2} + n^{2} \rightarrow \frac{5n^{2}}{2} \leq c_{2} \cdot n^{2} \\
c_{2} = \frac{5}{2}, k_{2} = 32
\end{gather}
$$
$$
\begin{gather}
\text{Lower Bound:} \\
\text{We set out to show that } \Omega(n^{2}) = \frac{3n^{3}-n}{2n+\log n} + 2^{10} \\ 
\text{So, there exists a } c_{1} \text{ and } k_{1} \text{ such that:} \\
\frac{3n^{3}-n}{2n+\log n} + 2^{10} \geq c_{1} \cdot n^{2} \\ \\
\text{Let's deal with the constant first.} \\
\text{We can just drop it, since it is adding to the lower bound.} \\ \\
\text{Since } n \geq \log n: \\
\frac{3n^{3}-n}{2n+n} \geq c_{1} \cdot n^{2} \\  \\
\text{ and since } n \leq n^{3}: \\
\frac{3n^{3}-n^{3}}{2n+n} \geq c_{1} \cdot n^{2} \\ \\
\frac{2n^{3}}{3n} \rightarrow \frac{2}{3} \cdot n^{2}\geq c_{1} \cdot n^{2} \\
\text{So we can use } c_{1} = \frac{2}{3}
\end{gather}
$$
$$
\begin{gather}
\text{Finally, we can say that the function f(n) is } \Theta(n^{2}) \\ \text{ for all } n \geq 32 \text{ sandwiched between our } c_{1} \text{ and } c_{2}
\end{gather}
$$
$2^{n} \cdot n + n^{5}\log n - 1.5^{n}$

$$
\begin{gather}
\text{We set out to prove that } f(n) \text{ is } \Theta(g(n)) \text{ for some function } g(n) . \\ \\
\text{First we have to realize that the dominant term is } 2^{n} \cdot n \text{ in the function above.} \\
\text{To prove that } f(n) = \Theta(2^{n}), \text{ we will find constants } c_{1}, c_{2} \text{ such that:} \\
2^{n}n \cdot c_{1} \leq 2^{n} \cdot n + n^{5}\log n - 1.5^{n} \leq 2^{n}n \cdot c_{2} : \forall n \geq k. \\
\text{Upper Bound: } \\
\mathcal{O}(2^{n}) = 2^{n} \cdot n + n^{5}\log n - 1.5^{n} \\
2^{n} \cdot n + n^{5}\log n - 1.5^{n} \leq c_{2} \cdot 2^{n}n \\ \\
\text{We can drop the } -1.5^{n} \text{ since we're making the function bigger:} \\
2^{n} \cdot n + n^{5}\log n \leq c_{2} \cdot 2^{n}n \\ \\
\text{Now we can transform the second term into } 2^{n}\cdot n \text{, but we need to find when it is true:}
\end{gather}
$$

| $n$    | $2^{n} \cdot n$ | $n^{5} \log n$ |
| ------ | --------------- | -------------- |
| 5      | 160             | 7256           |
| 10     | 10240           | 332192         |
| 15     | 491,520         | 2,966,795      |
| **20** | **20,971,520**  | **13,830,169** |
$$
\begin{gather}
\text{Let's go with 20 then} \dots \\ \\
2^{n} \cdot n + 2^{n} \cdot n \leq c_{2} \cdot 2^{n}n \\
2 \cdot (2^{n} \cdot n) \leq c_{2} \cdot 2^{n}n \\
c_{2}= 2, k_{2} =20
\end{gather}
$$
$$
\begin{gather}
\text{Lower Bound}: \\
\Omega(2^{n}) = 2^{n} \cdot n + n^{5}\log n - 1.5^{n} \\
2^{n} \cdot n + n^{5}\log n - 1.5^{n} \geq c_{1} \cdot 2^{n}n \\ \\
\text{Here we can drop the log term: } \\
2^{n} \cdot n - 1.5^{n} \geq c_{1} \cdot 2^{n}n \\ \\
\text{Then we can sub:} \\
2^{n} \cdot n - \frac{2^{n} \cdot n}{2} \geq c_{1} \cdot 2^{n}n \\
\text{since we are making the fraction smaller.} \\
\text{We don't really have to prove this since } 2^{n} > 1.5^{n} \\ 
\text{Our } c_{1} \text{ would be } \frac{1}{2} \text{ and we can just leave } k_{1} = k_{2} = 20\\ \\
\text{Finally, we can say that the function f(n) is } \Theta(2^{n}n) \\ \text{ for all } n \geq 20 \text{ sandwiched between our } c_{1} \text{ and } c_{2}
\end{gather}
$$
$f(n) = \sqrt{ n^{3} + 1 } + n^{2} \sqrt{ n+1 }$

$$
\begin{gather}
\text{We set out to prove that } f(n) \text{ is } \Theta(g(n)) \text{ for some function } g(n) . \\ \\
\text{First we have to realize that the dominant term is } n^{5/2} \text{ in the function above.} \\ 
\text{We set out to prove that } \Theta(n^{5/2}) \\
\text{We will find constants } c_{1}, c_{2} \text{ such that: } \\
c_{1} \cdot n^{5/2} \leq \sqrt{ n^{3} + 1 } + n^{2} \sqrt{ n+1 } \leq c_{2} \cdot n^{5/2} : \forall n \geq k
\\ \\
\text{This time the lower bound is pretty easy so let's do it first.} \\
\text{We can ignore } \sqrt{ n^{3} + 1 } \text{ since it is positive, leaving us:} \\
n^{2}\sqrt{ n+1 } \geq c_{1} \cdot n^{5/2} \\ \\
\text{We can also ignore the 1, since it is positive:} \\
n^{2}\sqrt{ n} \geq c_{1} \cdot n^{5/2} \\
\text{This leaves us with: }
n^{2}*n^{1/2} \rightarrow n^{5/2}. \\
\text{So, } c_{1} = 1, k_{1} = 1 \\ 
\text{Note that this could be much tighter but it works.}\\
\text{For the upper bound:} \\
\end{gather}
$$
$$
\begin{align}
\sqrt{ n^{3} + 1 } + n^{2} \sqrt{ n+1 } \leq c_{2} \cdot n^{5/2} && \text{Initial expression}\\
\sqrt{ n^{3} + n^{3} } + n^{2} \sqrt{ n+1 } \leq c_{2} \cdot n^{5/2} && n^{3} \geq 1 \\
\sqrt{ 2n^{3} } + n^{2} \sqrt{ n+1 } \leq c_{2} \cdot n^{5/2} && \text{ Simplify}  \\
\sqrt{ 2n^{3} } + n^{2} \sqrt{ n+n} \leq c_{2} \cdot n^{5/2} && n\geq1 \\
\sqrt{ 2n^{3} } + n^{2} \sqrt{ 2n} \leq c_{2} \cdot n^{5/2} && \text{Simplify}  \\
\sqrt{ 2n^{3} } + \sqrt{ 2 }n^{5/2}  \leq c_{2} \cdot n^{5/2} && \text{Evaluate exponent}  \\
\sqrt{2}n^{3/2} + \sqrt{ 2 }n^{5/2}  \leq c_{2} \cdot n^{5/2} && \text{Evaluate exponent}  \\
\sqrt{2}n^{5/2} + \sqrt{ 2 }n^{5/2}  \leq c_{2} \cdot n^{5/2} && n^{3/2} \leq n^{5/2}  \\
2 \sqrt{ 2 }n^{5/2}  \leq c_{2} \cdot n^{5/2} && \text{Combine like terms}
\end{align}
$$
$$
\begin{gather}
\text{Hence } c_{2} = 2\sqrt{ 2 }, k=1 \\
\text{Finally, we can say that the function f(n) is } \Theta(n^{5/2}) \\ \text{ for all } n \geq 1 \text{ sandwiched between our } c_{1} \text{ and } c_{2}
\end{gather}
$$
## Question 2

Write the pseudo-code (non-recursive) for this algorithm. You must use the skeleton below, called SimpleSort(A, s, f ) which sorts array A between indices s and f . The final sorted array is in array L\[1, . . . , n]

Simple sort loops through input array and takes the first element of the array. It then finds a bigger number and you add it to a list, continuing for numbers that are bigger adding them to that list.
Then it merges both lists together. 


```
n = f - s
Initialize array L[1, . . . , n] 
last = -infinity
lastindex = 0
end = 0 
while lastindex ≠ n
	for i = s to f 
		if A[i] > last 
			lastindex ++ 
			last = A[i]
			L[lastindex] = last
			A[i] = -infinity <- idk how to solve this without adding this
	Merge(L, 1, end, lastindex) <- this asumes that we merge from 1 to end and from end + 1 to last index
	end = lastindex
	last = -infinity
```

I found it to be strand sort with O(n^2) complexity from these sources:
- https://viblo.asia/p/strand-sort-XL6lAQLRlek
- https://stackoverflow.com/questions/4579786/why-is-strand-sort-on-sqrt-n-in-the-average-case
- 
## Notes for self
1.3.1: is $n \geq \log(n)^{k} : \forall n \geq \land \space \forall k \geq 1$?
1.3.3 can i drop the n and logn from the table? Like, I already know for sure that n > log n, could I worry about the 2^n and n^5 terms and call it a day when I find the values?