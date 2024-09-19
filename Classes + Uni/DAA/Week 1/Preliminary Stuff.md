---
tags:
  - DAA
---
## Log Rules

A $\log$ is just a dude who asks the question:

> My base, to the power of what, equals the number inside me??

In more rigorous terms...

It's the number that shows how many times a number, called the base, has to be multiplied by itself to produce another number...

Hence we get the following equation for logs:

$$
\begin{gather}
\log_{a}(b) = x \iff a^{x} = b
\end{gather}
$$
An example of a proof of logs:
$$
\begin{gather}
\text{Power Rule:} \\ 
\log(n^{a}) = a\log(n) \\ \\
\text{Let } x = \log_{2}(n) \\ 
\text{By the definition of logarithms, we have: } 2^x = n \\ \\
\text{We can express } \log_{2}(n^a) \text{ as:} \\
\log_{2}(n^a) = \log_{2}((2^x)^a) \\ \\
\text{Using the properties of exponents:} \\
(2^x)^a = 2^{x \times a} \\ 
\therefore \log_{2}(n^a) = \log_{2}(2^{x \times a}) \\ \\
\text{By the definition of logarithms, we know:} \\
\log_{2}(2^{x}) = x \\ \\
\text{Therefore:} \\
\log_{2}(2^{x \times a}) = x \times a \\ \\
\text{Substitute back } x = \log_{2}(n): \\
x \times a = a \log_{2}(n) \\ \\
\text{Thus, we have:} \\
\log_{2}(n^a) = a \log_{2}(n)
\end{gather}
$$

## Proofs of Sum Rules
$$
\begin{gather}
\text{Let's prove that: } \\
\sum_{k=0}^{L} a^{k} = \frac{a^{L+1} - 1}{a - 1} \\ \\
\text{Base case:} \\
P(0): \sum_{k=0}^{0} a^{k} = a^0 = 1 \quad \land \quad \frac{a^{0+1} - 1}{a - 1} = \frac{a - 1}{a - 1} = 1 \quad \checkmark \\ \\
\text{Inductive hypothesis:} \\
\text{Assume } P(x) \text{ is true, i.e., } \sum_{k=0}^{x} a^{k} = \frac{a^{x+1} - 1}{a - 1} \\ \\
\text{We need to prove } P(x+1): \\
\sum_{k=0}^{x+1} a^{k} = \frac{a^{(x+1)+1} - 1}{a - 1} \\ \\
\text{Start with the left-hand side:} \\
\sum_{k=0}^{x+1} a^{k} = \sum_{k=0}^{x} a^{k} + a^{x+1} \\ \\
\text{Using the inductive hypothesis, substitute for } \sum_{k=0}^{x} a^{k}: \\
\sum_{k=0}^{x+1} a^{k} = \frac{a^{x+1} - 1}{a - 1} + a^{x+1} \\ \\
\text{Rewrite } a^{x+1} \text{ to have the same denominator:} \\
\frac{a^{x+1} - 1}{a - 1} + a^{x+1} = \frac{a^{x+1} - 1}{a - 1} + \frac{a^{x+1}(a - 1)}{a - 1} \\ \\
\text{Combine the terms:} \\
\frac{a^{x+1} - 1 + a^{x+1}(a - 1)}{a - 1} = \frac{a^{x+1}(1 + (a - 1)) - 1}{a - 1} \\ \\
\text{Simplify:} \\
\frac{a^{x+1}(a) - 1}{a - 1} = \frac{a^{x+2} - 1}{a - 1} \\ \\
\text{Thus, } \sum_{k=0}^{x+1} a^{k} = \frac{a^{(x+1)+1} - 1}{a - 1}. \blacksquare
\end{gather}
$$

$$
\begin{gather}
\text{Let's proove that:} \\

\end{gather}
$$