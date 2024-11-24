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

## Part 1

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
2n^{2} + 3n^{2}\log n + 4n\log n \text{}
\end{gather}
$$