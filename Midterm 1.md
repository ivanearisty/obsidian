# DAA Exam Write Up — Ivan Aristy — iae225

Rules:
 This exam is a take-home exam. You may use only the resources from the online class (any material
on NYU classes for this course) and any type of calculator (although it is not needed).
 Your work must be entirely your own. It is forbidden to discuss any work with any other
person. Furthermore, your work must be done without using internet searches (although this is
completely unhelpful for this exam). Any breach of academic honesty will be handled in accordance
with the Student Code of Conduct, (a copy of which is provided), and in this particular case, taken
very seriously.
 You are asked to read the attached Student Code of Conduct Section III subsections A,B,C,D,E and
sign below to acknowledge that you aware of the policy. Once signed, a copy of this page must be
uploaded with your exam.

I acknowledge that my submitted Exam work is entirely my own. I have read and am in accordance with the Student Code of Conduct policy of NYU Tandon and fully accept the consequences of breaching the above instructions. 
Name: Ivan Aristy
Signature: Ivan Ernesto Aristy Eusebio

## Q1
### A
![[Screenshot 2024-11-24 at 5.56.09 PM.jpg]]
![[Screenshot 2024-10-13 at 8.49.36 PM.jpg]]
$$
\begin{gather}
\sqrt{ 3n^{4} + \log n } \\
2^{64} \times n + \frac{n^{2}}{n^{0.5}} \\
n! + 6 \times 2^{n} \\
n^{n} + 3^{n/2} \\
3n + n\log n \\
2n^{2} + 3n^{2}\log n + 4n\log n
\end{gather}
$$
$$
\begin{gather} 
\sqrt{ 3n^{4} + \log n }, \sqrt{ n^{4} } \text{ highest order}, \mathcal{O}(n^{4})\\
2^{64} \times n + \frac{n^{2}}{n^{0.5}}, n^{1.5} \text{ highest order}. \mathcal{O}(n^{1.5})\\ 
n! + 6 \times 2^{n} \text{ factorial by far highest order } \mathcal{O}(n!)\\
n^{n} + 3^{n/2} \text{ n to the n always a bomb, } \mathcal{O}(n^{n})\\
3n + n\log n \text{ an n with a log better than n alone } \mathcal{O}(n\log n)\\
2n^{2} + 3n^{2}\log n + 4n\log n \mathcal{O}(n^{2}\log n)
\end{gather}
$$

Ordering stuff:

$$
\begin{gather} 
3n + n\log n , \mathcal{O}(n\log n)\\ \\
2^{64} \times n + \frac{n^{2}}{n^{0.5}}, n^{1.5} , \mathcal{O}(n^{1.5})\\  \\
2n^{2} + 3n^{2}\log n + 4n\log n,  \mathcal{O}(n^{2}\log n) \\ \\
\sqrt{ 3n^{4} + \log n }, \sqrt{ n^{4} } , \mathcal{O}(n^{4})\\ \\
n! + 6 \times 2^{n} , \mathcal{O}(n!)\\ \\
n^{n} + 3^{n/2} , \mathcal{O}(n^{n})\\
\end{gather}
$$

### B
![[Screenshot 2024-11-24 at 6.04.46 PM.jpg]]

$$
\begin{gather}
f(n) = (2^{n} + n)(\log n + 2^{n}) \\
\\
\text{expand out stuff:} \\
4^{n} + 2^{n}\log n + n\log n + n\times 2^{n}
\\
\text{Highest order term is } 4^{n}
\\ \\
\mathcal{O}(4^{n}) \\
\text{Claim that } \forall n_{1} \ge k, \exists c > 0 \rightarrow \\
f(n) = 4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} = \mathcal{O}(4^{n}) \\
4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} \le c \times 4^{n_{1}} \\
\\
\text{simplifications: } \\ 
2^{n}\log n \le 4^{n}, \forall n>1 \text{ I know this might be lower but im buying room just in case } \\ \\
n\log n \le 4^{n}: \\ 
\text{Try 1, 4rd 1 = 4, 1 log 1 is less for the same parameters as above} \\ 
\therefore \forall n > 1 \text{ also works} \\ \\
\text{Finally, }n \times 2^{n} \text{is also less, try 1 and 2 we get}: \\
1 \times 2 = 2 \land 2 \times 4 \\
vs \\
4^{1} = 4 \land 4^{2} = 16 \\ \\
\therefore 
4^{n} + 4^{n} + 4^{n} + 4^{n} \le c \times 4^{n_{1}} \\
\text{for } c \geq 4 \land n_{1} > 1
\end{gather}
$$
$$
\begin{gather}
\text{Lower bound is much easier:} \\ 
\Omega(3^{n}) \\
\text{Claim that } \forall n_{1} \ge k, \exists c > 0 \rightarrow \\
f(n) = 4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} = \Omega(3^{n}) \\
4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} \ge c \times 3^{n_{1}} \\
\\
\text{We know from above that }:
2^{n}\log n + n\log n + n\times 2^{n} > 0 \\
\text{Hence, } 4^{n} \text{ plus a bunch of oterh stuff will be greater than} \\
4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} \ge c \times 4^{n_{1}}
\\ \text{ and since } 4^{n} \geq 3^{n} \\
4^{n} + 2^{n}\log n + n\log n + n\times 2^{n} \ge c \times 4^{n_{1}}  \geq 3^{n} \\
\text{and the proof is done.}
\end{gather}
$$

### C

![[Screenshot 2024-11-24 at 6.15.59 PM.jpg]]

$$
\begin{gather}
g = \frac{2n^{2} + (\log n)^{2}}{n-6} - 6n \\
\text{Identifying the highest order term we have: } n \\
\text{sinnce both the difference outside and the quotient simplify to it} \\
\text{We shall prove } \Theta(n) \\ \\
\frac{2n^{2} + (\log n)^{2}}{n-6} - 6n \\
\text{Show } g \le c \times n \text{ for }\mathcal{O}(n) \\
\frac{2n^{2} + (\log n)^{2}}{n-6} - 6n \le c\times n \\
\frac{2n^{2} + (\log n)^{2}}{n-6} - 6n \le \frac{2n^{2} + (\log n)^{2}}{n-6} \\
\frac{2n^{2} + (\log n)^{2}}{n-6} \text{ since both the -6 and log are making it bigger, } \\
\text{We cant simply remove them so we say:} \\
(\log n)^{2} <2n^{2},  \forall n > \text{some } k \\
\text{and } \frac{n}{2} \ge 6,  \forall n > 12 \\
\frac{2n^{2} + n}{n - \frac{n}{2}} = 
\frac{2n^{2} + n}{\frac{n}{2}} \\
\frac{2n^{2} + n}{\frac{n}{2}} = \frac{2n^{2}}{\frac{n}{2}} + \frac{n}{\frac{n}{2}} \\
\frac{2n^{2}}{\frac{n}{2}} + \frac{n}{\frac{n}{2}} =
4n - 2 \\
4n > c*n
\\ c = 4 \land k > 12 \\ 
\\
\text{For } \Omega(n)  \\
\frac{2n^{2} + (\log n)^{2}}{n-6} - 6n \geq c\times n\\
\frac{2n^{2}}{n} - 6n \geq c\times n \text{can remove stuff this time around} \\
2n - 6n \geq c\times n  \\
-4n \geq c\times n  \\
\therefore c = 0 \land k = 1
\end{gather}
$$