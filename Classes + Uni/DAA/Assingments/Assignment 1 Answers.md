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
### A (12 points)

Write the pseudo-code (non-recursive) for this algorithm. You must use the skeleton below, called SimpleSort(A, s, f ) which sorts array A between indices s and f . The final sorted array is in array L\[1, . . . , n]

Simple sort loops through input array and takes the first element of the array. It then finds a bigger number and you add it to a list, continuing for numbers that are bigger adding them to that list.
Then it merges both lists together. 


```
n = f - s + 1
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

- What is the worst-case number of comparisons on array A of length n? You must describe the input that causes this worst-case scenario, and justify the worst-case number of comparisons.

The worst case happens when we have an array in decreasing order.
But see, this is complicated because with a better implementation we kind of get two answers for this question.
Since here we are doing from i = s to f every time, we technically get **$n^2$ comparisons**, if we count comparing the elements that we "remove," but we don't *actually* remove them here do we? We make them -infinity, and those should count for comparisons.
If we had a way to actually remove those elements, then we'd do n comparisons on the first run, then n-1 on the second, and so on... this leads to $\frac{n(n+1)}{2}$ comparisons. But that's not what we did above. So my answer remains the first point

- What is the best-case number of comparisons made on array A of length n? You must describe the input that causes this best-case scenario, and justify the best-case number of comparisons.

When the array is already sorted, we add everything in immediately. Hence we only ever do n comparisons and the while loop then breaks.

I found it to be strand sort with O(n^2) complexity from these sources:
- https://viblo.asia/p/strand-sort-XL6lAQLRlek
- https://stackoverflow.com/questions/4579786/why-is-strand-sort-on-sqrt-n-in-the-average-case
- https://groups.google.com/g/fido7.ru.algorithms/c/dL4SAH96OPY/m/s4oABNtMCCYJ?pli=1

### B (12 points)

Below is a non-recursive variation of MergeSort, which is intended to sort array A between indices s and f . Note that it makes reference to the Merge procedure from week 2. You should remind yourself of the specific parameters of the Merge algorithm.

![[Screenshot 2024-09-27 at 3.01.04 AM.jpg]]

- Procedure Execution:
Start:
\[3,4,5,1,6,2]

First while loop:
\[3 < e ,4,5,1,6,2]
\[3,4 < e ,5,1,6,2]
\[3,4,5 < e ,1,6,2]

Second while loop
\[3,4,5 < e ,1 < e2 ,6,2]
\[3,4,5 < e ,1,6 < e2 ,2]

Merge:
\[1,3,4 < e,5,6 < e2,2]

e = e2:
\[1,3,4,5,6 < e e2,2]

While start:
e2 = e+1
\[1,3,4,5,6 < e, 2 < e2]

e2 >= f

Merge:
\[1,2,3,4,5,6] done.

- Is this a correct sorting algorithm?

Yes. It does sort the array.

- Let T (n) be the best-case runtime of this procedure. Express T (n) is a function and show that it is O(n).

In the best case the input array is already sorted. We do constant work at e=s, do constant work n times for every member of the array in the first while loop, and finally check the second while loop and fail. 

$$
\begin{gather}
T(n) = c \cdot n + d \\
\text{We want to show that } T(n) \text{ is } \mathcal{O}(n) \\ \\
\text{Let c and d be two positive constants.} \\
\text{We must find } c^* \text{ such that:} \\
T(n) \leq c^* n \\
T(n) = c \cdot n + d \leq c^* n \\ 
c \cdot n + d \leq c \cdot n + d \cdot n \\
T(n) = c \cdot n + d \cdot n \leq (c+d) n \\
\text{Since } (c+d) \text{ are two constants,} (c+d) = c^*
\end{gather}
$$
- Suppose the input array A has n elements which are sorted in decreasing order. In this case, show that the number of comparisons is $\mathcal{O}(n^{2})$.

The first while loop will break immediately after doing one comparison. Then the second while will do another comparison in it's nested while. This will break to call merge. Afterwards, we will call merge n-1 times for an array that always just increases from size 2 to n. Merge will then perform 1 comparison per element in the arrays merge works on (the singleton array and the already sorted array). 
$$
\begin{gather}
\text{For completeness, here's an abbreviated proof just for merge: } \\
T(n) = 1 + 2 + \dots + (n-1) = \frac{n(n-1)}{2} \\
\frac{n(n-1)}{2} \leq c*n^{2} \\
\frac{n^{2}-n}{2} \leq c*n^{2} \\
n^{2}-n \leq 2*n^{2} \\
n^{2} \leq 2*n^{2}
\end{gather}
$$

However, we must note that we do n comparisons in the while loops' if statements that immediately break. Adding this to the above is trivial and will still yield an $\mathcal{O}(n^{2})$ number of comparisons. We can just pick up were we left off and say $\frac{n^{2}-n}{2} \leq c*n^{2}$ becomes $\frac{n^{2}-n}{2} + n \leq c*n^{2}$, with c = 4 after simplifying $n^{2}+n \rightarrow 2n^{2} \leq 2c \cdot n^{2}$.

## Question 3 

### A (3 points)

Recall that the pseudo-code from class for MergeSort required external space as part of the merge step. These types of algorithms are referred to as sorting algorithm that do not run in-place. Do some research to determine if there is a known version of MergeSort that runs in-place, and if so, what its best-known runtime is.

I found a couple of attempts from wikipedia and these posts: 
- https://stackoverflow.com/questions/2571049/how-to-sort-in-place-using-the-merge-sort-algorithm
- https://www.interviewkickstart.com/blogs/learn/in-place-merge-sort#:~:text=The%20standard%20implementation%20of%20merge,called%20in%2Dplace%20merge%20sort.

There seem to be multiple variations that either create a constant amount of extra space, use temporary memory cells, or relax the meaning of in-place.

One of them has $\mathcal{O}(n^2)$ time because it just used the extra space as storage for merging.

The other combines shell sort with merge sort to create an algorithm with $\mathcal{O}(n(\log n)^{2})$ complexity, but it is not stable (doesn't keep relative order of elements).

I believe this method uses a version of this in place merging algorithm: https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=ed3adb71787fd7cf0fc32053af920fe1e5bf3cc6 which is where the additional logn comes from.

### B (8 points)
Suppose we want to re-write the MergeSort algorithm so that it splits the array into three subarrays each of size approximately n/3. Your job is to write the pseudo-code for this new version of MergeSort. Ensure that you have a valid base case! (you can check this by testing it on input of size n = 1,n = 2. You will have to write a new version of the Merge procedure, which merges three sorted arrays. You can call this procedure MergeThree(A, s, q, q2, f ), which merges sorted subarrays A\[s . . . q], A\[q + 1 . . . q2], A\[q2 + 1 . . . f ].

```
MergeThree(A, s, q, q2, f ):
	Initialize an array L[] of size f - s + 1
	
	a = s
	b = q
	c = q2
	i = 1
	
	while a < q and b < q2 and c <= f:
		if A[a] <= A[b] and A[a] <= A[c]:
			L[i] = A[a]
			a++
		else if A[b] <= A[a] and A[b] <= A[c]:
			L[i] = A[b]
			b++
		else:
			L[i] = A[c]
			c++
		i++

	while b < q2 and c <= f:
		if A[b] <= A[c]:
			L[i] = A[b]
			b++
		else:
			L[i] = A[c]
			c++
		i++	

	while a < q and c <= f:
		if A[a] <= A[c]:
			L[i] = A[a]
			a++
		else:
			L[i] = A[c]
			c++
		i++	
			
	while a < q and b < q2:
		if A[a] <= A[b]:
			L[i] = A[a]
			a++
		else:
			L[i] = A[b]
			b++
		i++	

	while a < q:
		L[i] = A[a]
		a++
		i++

	while b < q2:
		L[i] = A[b]
		b++
		i++
		
	while c <= f:
		L[i] = A[c]
		c++
		i++
		
	Copy elements from L[] between s and f into array A[]
```

This merging algorithm runs in 2n time, since we do one pass through all the elements to add them to L, and another pass to add them back to A . This won't matter for master method later though...

```
MergeSort(A, s, f):

	if f - s + 1 == 1:
		return
	
	if f - s + 1 == 2:
		if A[s] > A[f]:
			swap A[s] and A[f]
		return
		
	q1 = [(2s+f)/3]
	q2 = [(s+2f)/3]

	MergeSort(A, s, q1)
	MergeSort(A, q1, q2)
	MergeSort(A, q2, f)
		
	MergeThree(A, s, q1+1, q2+1, f)
```

There's some iffyness that could happen with assigning the weights, but double test cases fix that from what I have reasoned. No infinite recursion here since we break when we have two elements, not just 1.

### C (4 points)

$$
\begin{gather}
T(n) = aT\left( \frac{n}{b} \right)+ f(n) \\
T(n) = 3T\left( \frac{n}{3} \right) + c n \text{ , the c encompasses the 2n we talked about above }\\ \\
a = 3 \\
b = 3 \\
f = n \\ \\
k = \log_{3}(3) = 1 \rightarrow n^{k} = n^{1} = 1 \\ \\
\text{Comparing } f(n) = n \text{ to } n^{1} \rightarrow n = n \\
f(n) = n \text{ is } \Theta(n) \\
\therefore T(n) \text{ is } \Theta(n\log n)
\end{gather}
$$

### D (8 points)

8 points Consider the the pseudo-code below for the recursive algorithm MyPrint(A, s, f ), which takes as input an array A, indexed between s and f .

![[Screenshot 2024-09-27 at 8.03.29 AM.jpg]]

- Trace the recursive algorithm on the input A = \[5, 4, 3, 2, 1] indexed from s = 1 to f = 5. Ensure that you show the state of the array during the recursive calls, and detail the parameters passed at each stage of the recursion. Clearly show the final state of the array A. 

The following is a tree like interpretation of the call stack and A, q1, and q2 as new calls happen (represented as indentations)

```
MyPrint(A,1,5):
	\[5, 4, 3, 2, 1]
	q1 = 2
	q2 = 3
	MergeSort(A,2,3):
		 \[5, 3, 4, 2, 1]
	MyPrint(A, 2, 5):
		 \[5, 3, 4, 2, 1]
		 q1 = 3
		 q2 = 4
		 MergeSort(A,3,4):
			  \[5, 3, 2, 4, 1]
			MyPrint(A,3,5):
				\[5, 3, 2, 4, 1]
				Mergesort(A,3,5):
					\[5, 3, 1, 2, 4]
			MyPrint(A,2,4)
				\[5, 3, 1, 2, 4]
				Mergesort(A,2,4):
					\[5, 1, 2, 3, 4]
	MyPrint(A, 1, 3)
	\[5, 1, 2, 3, 4]
		Mergesort(A,1,3)
		\[1, 2, 5, 3, 4]
	\[1, 2, 5, 3, 4]
\[1, 2, 5, 3, 4]
```

Write and justify the runtime recurrence for the above algorithm. 

The algorithm splits an array into two parts of size 2/3 and then passes overlapping parts into two other functions, finishing when the final function takes input of size 2 or smaller, but it always does mergesort when it ends or 

We can represent as:

$T(1) = n\log n$ 
$T(n) = 2 \cdot T\left( n \cdot  \right) + \frac{1}{3}n\log n$ 
$T(n) = 2 \cdot T\left( n \cdot \frac{2}{3} \right) + c \cdot n\log n$

Use Master Method to theta-value for the runtime of this algorithm.
$$
\begin{gather}
T(n) = 2 \cdot T\left( n \cdot \frac{2}{3} \right) + \frac{1}{3}n\log n \\
\\
a = 2 \\
b = \frac{3}{2} \\
f(n) = c \cdot n\log n \\
\\
k = \log_{b}a = \log_{\frac{3}{2}}2 \approx 1.7 \\
n^{k} = n^{1.7} \\ \\
n^{1.7} \geq n\log n \\
f(n) \text{ is } \Omega(n^{1.7 + e}) \\
\therefore T(n) \text{ is } \Theta(n^{1.7})
\end{gather}
$$


## Question 4

### A (12 points)
Use the recursion tree to find a tight asymptotic bound for each of

- $T(n) = 2T\left( \frac{n}{4} \right)+1$

We do 1 work, twice, and break n/4

![[Drawing 2024-09-27 11.11.23.excalidraw]]

Hence we do $1, 2, 4, \dots 2^{\log_{4}n}$

$\sum_{k=0}^{L} 2^{\log_{4}n} = \frac{2^{\log_{4}n+1}-1}{2-1} \rightarrow 2 \cdot 2^{\log_{4}n}-1 \rightarrow 2\sqrt{ n } -1$

$\therefore T(n) \text{ is } \Theta(\sqrt{ n })$

- $T (n) = 4T \left( \frac{n}{4} \right) + n$ 

Here we do n work, 4 times, and divide the input size by 4

![[Drawing 2024-09-27 14.10.27.excalidraw]]

This one is pretty simple, we just have n work per level for log_4(n) levels, which is $n\log_{4}n$ making the entire thing $T(n) = \Theta(n\log_{4}n)$

- Show $T(n) = T(n/2) + \log n \text{ is } \mathcal{O}((\log n)^{2})$

![[Drawing 2024-09-27 14.18.40.excalidraw]]

So for $\log_{2}n$ levels we can make a sum.
Then we find the work done at each level:
$$
\begin{gather}
\log\left( \frac{n}{2^{k-1}} \right) \\
\log_{2} n - \log_{2}(2^{k-1}) \\
\log_{2} n - (k-1) \\
\end{gather}
$$
$$
\begin{gather}
\text{The series as each level, k, increases:} \\
\log n + (\log n-1) + (\log n-2) + \dots + 1 \\ \\
\text{Which simplifies to our good old:} \\
\frac{\log n \cdot (\log n+1)}{2} \\
\text{which will give:} \\
\frac{(\log n)^{2}+\log n}{2} \\
\text{And from our growth of functions we know that } (\log n)^{2} \geq \log n \\
\text{So, } T(n) = \Theta((\log n)^{2}) \\ \\
\text{I guess we could quickly prove the upper bound for fun as well:} \\
\frac{(\log n)^{2}+\log n}{2} \leq c \cdot (\log n)^{2}\\
\frac{(\log n)^{2}+(\log n)^{2}}{2} \leq c \cdot (\log n)^{2}\\
(\log n)^{2}\leq c \cdot (\log n)^{2}\\
\text{ for any constant c that is greater than or equal to 1}
\end{gather}
$$

- $T (n) = 9T (n/3) + n^{2}$
I mean...
![[Assignment 1 Answers 2024-09-27 15.09.21.excalidraw]]

Height is log_3(n)

We do $3^{k-1} \cdot n^{2}$ work on each level.

$$
\begin{gather}
\sum_{k=0}^{\log_{3}n} n^2 \cdot 3^{k} \\
\sum_{k=0}^{\log_{3}n} n^2 \cdot 3^{k} \\
n^{2} \cdot \frac{3^{\log_{3}n+1}​-1}{3-1} \\
n^{2} \cdot \frac{3 \cdot 3^{\log_{3}n}​-1}{3-1} \\
n^{2} \cdot \frac{3 \cdot n​-1}{2} \approx n^{3}\\
\text{So, it is } \Theta(n^{3})
\end{gather}
$$

### B (8 points)

Apply the master theorem to to each of the following, or state that it does not apply:

- $T(n) = 2 \cdot T\left( \frac{n}{2} \right) + n^{2}+n$

$$
\begin{gather}
T(n) = 2 \cdot T\left( \frac{n}{2} \right) + n^{2}+n \\ \\
a = 2 \\
b = 2 \\
f(n) = n^{2} + n = n^{2}\\
\\ 
k=\log_{2}(2)=1 \\
n^{k} = n\\ 
\\
\text{Case 3 } f(n) \text{ is } \Omega(n^{1+e}) \\
\therefore T(n) \text{ is } \Theta(n^{2})
\end{gather}
$$

- $T(n) = 15 \cdot T\left( \frac{n}{4} \right)+n^{2}\log n$

$$
\begin{gather}
T(n) = 15 \cdot T\left( \frac{n}{4} \right)+n^{2}\log n \\ \\
a = 15 \\
b = 4 \\
f(n) = n^{2}\log n \\
\\ 
k=\log_{4}(15) \approx 1.95 \\
n^{k} = n^{1.95}\\ 
\\
\text{Case 3 } f(n) \text{ is } \Omega(n^{2+e}) \\
\therefore T(n) \text{ is } \Theta(n^{2}\log n)
\end{gather}
$$

- $T(n) = 17 \cdot T\left( \frac{n}{4} \right) + n^{2}+\log n$

$$
\begin{gather}
T(n) = 17 \cdot T\left( \frac{n}{4} \right) + n^{2}+\log n \\ \\
a = 17 \\
b = 4 \\
f(n) = n^{2} + \log n \\
\\ 
k=\log_{4}(17) \approx 2.04 \\
n^{k} = n^{2.04}\\ 
\\
\text{Case 1, fn is much smaller and is } \mathcal{O}(n^{2.04-e}) \\
T(n) \text{ is } \mathcal{O}(n^{2.04})
\end{gather}
$$

- $T(n) = 16T\left( \frac{n}{4} \right)+n^{2}\log n+n^{3}$

$$
\begin{gather}
T(n) = 16T\left( \frac{n}{4} \right)+n^{2}\log n+n^{3} \\ \\
a = 16 \\
b = 4 \\
f(n) = n^{3} + n^{2}\log n \\
\\ 
k=\log_{4}(16) = 2 \\
n^{k} = n^{2}\\ 
\\
\text{Case 3 } f(n) \text{ is } \Omega(n^{2+e}) \\
\therefore T(n) \text{ is } \Theta(n^{3})
\end{gather}
$$

## Notes for self
1.3.1: is $n \geq \log(n)^{k} : \forall n \geq \land \space \forall k \geq 1$?
1.3.3: can i drop the n and logn from the table? Like, I already know for sure that n > log n, could I worry about the 2^n and n^5 terms and call it a day when I find the values?
3.2: how come we do not care about index out of bound errors for our traditional merge algorithm? 