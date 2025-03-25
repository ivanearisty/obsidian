---
tags:
  - ML/HW
---
# iae225
## Problem 1 — Practice Minimizing a Loss Function
### Question
![[Screenshot 2025-02-26 at 5.07.51 AM.jpg]]
### Answers
#### A
$$
\begin{gather}
\text{We had: } L(\beta_{0},\beta_{1}) = \sum_{i=1}^{n}(y_{i} - \beta_{0} - \beta_{1}\times x_{i})^{2} \\
\text{This is the sum-of-squared distances when we have the intercept unfixed and a slope value} \\
\text{Since } \beta_{0} = 0 \\
L(\beta) = \sum_{i=1}^{n}(y_{i} - \beta \times x_{i})^{2} \\
\end{gather}
$$
#### B
![[Screenshot 2025-02-26 at 5.22.53 AM.jpg | 500]]
$\text{To find the value of } \beta \text{ that minimizes } L(\beta), \text{we take the derivative of } L(\beta) \text{ with respect to }\beta \text{ and set it to zero}:$
$$
\begin{gather}
L(\beta) = \sum_{i=1}^{n}(y_{i} - \beta \times x_{i})^{2} \\
\frac{d}{d \beta} = \sum_{i=1}^{n} 2 (y_{i} - \beta \times x_{i}) \times (-x_{i}) & \text{ By chain rule} \\
\frac{d}{d \beta} = -2 \sum_{i=1}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i}) & \text{ Extracting Constants} \\
\frac{d}{d \beta} = 0 & \text{Setting Derivative to 0} \\
-2 \sum_{i=1}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i})  = 0 & \text{ } \\
\sum_{i=1}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i})  = 0 & \text{ Simplify} \\
\sum_{i=1}^{n} y_{i} x_{i} - \sum_{i=1}^{n} \beta \times x_{i}^{2}  = 0 & \text{ Distribute} \\
\sum_{i=1}^{n} y_{i} x_{i} = \sum_{i=1}^{n} \beta \times x_{i}^{2} & \text{ Solving for } \beta \\
\sum_{i=1}^{n} y_{i} x_{i} = \beta \sum_{i=1}^{n} \times x_{i}^{2} & \text{ } \\
\beta = \frac{\left( \sum_{i=1}^{n} y_{i} x_{i} \right)}{\sum_{i=1}^{n} x_{i}^{2}} \\
\end{gather}
$$
*Should we add a 1/n here? Right now this is adding all of the inputs and outputs, which might not be correct*
In our original function:
$$
\begin{gather}
\beta_{1} = \frac{\sigma_{xy}}{\sigma^{2}_{x}}
\end{gather}
$$
In our current situation we recall our variance of x and covariance of x and y, and when the means of y and x are 0, then they are the same. Hence, for our current function
$$
\begin{gather}
\beta = \frac{\left( \sum_{i=1}^{n} y_{i} x_{i} \right)}{\sum_{i=1}^{n} x_{i}^{2}} = \frac{\bar{y}\bar{x}}{\sigma^{2}_{x}}
\end{gather}
$$
## Problem 2 — Machine Learning Does Averages
### Question
![[Screenshot 2025-03-02 at 12.25.35 AM.jpg | 1000]]
### Answers
#### A
This kind of makes sense if you think about it a bit, if we want to pick some value m that is the most representative of the dataset, it would make sense that this value is the mean.
*To minimize a loss function L(x), one of the techniques is to take the derivative with respect to x and find where they are equal to 0*
$$
\begin{gather}
L(m) = \sum ^{n}_{i=1}(y_{i} - m)^{2} \\
\text{We know that: } \bar{y} = \frac{1}{n}\sum ^{n}_{i=1}(y_{i}) \rightarrow \text{mean of } y_{i} \\
\frac{d}{dm}L(m) = \frac{d}{dm}\sum ^{n}_{i=1}(y_{i} - m)^{2} \\
\frac{d}{dm}L(m) = \sum ^{n}_{i=1}2(y_{i} - m)(-1) = \sum ^{n}_{i=1}-2(y_{i} - m) = -2 \sum ^{n}_{i=1}(y_{i} - m) \\
\text{Nowe we set the derivative to 0, } \frac{d}{dm}L(m) =  -2 \sum ^{n}_{i=1}(y_{i} - m) = 0 \\
-2 \sum ^{n}_{i=1}(y_{i} - m) = 0 \\
\sum ^{n}_{i=1}(y_{i}) - \sum ^{n}_{i=1}(m) = 0 \implies \sum ^{n}_{i=1}(y_{i}) = \sum ^{n}_{i=1}(m) = n \times m \\
n \times m = \sum ^{n}_{i=1}(y_{i}) \\
m = \frac{\left( \sum ^{n}_{i=1}(y_{i}) \right)}{n} \\
m = \frac{1}{n} \sum ^{n}_{i=1}(y_{i}) = \bar{y}
\end{gather}
$$

#### B 
$$
\begin{gather}
L(m) = max_{i}|y_{i}-m| \text{, what value of m minimizes the loss?} \\ \\
\text{In plain english, I read this as m should be whatever value minimizes the maximum diviation when evaluating any point} \\
\text{So, I see two possible worst case scenarios, the largest and smallest data points:}\\
\text{Let } y_{min} = \text{min}_{i}y_{i} \text{ and } y_{max} = \text{max}_{i}y_{i} \\ \\
\text{m should be the value maximum possible deviation, so } \\
L(m) = \text{max}(|y_{min}-m|, |y_{max}-m|) \\ \\
\text{The error from the minimum value can be thought as a V-shaped curve that reaches zero when } m=y_{min} \\
\text{the same is true for } y_{max} \text{ but in the opposite orientation.} \\
\text{Since we are trying to minimize these two values, the best case scenario happens when the two curves intersect: } \\
|y_{min}-m| =|y_{max}-m| \\
\text{Which happens at the midpoint, so:} \\
m = \frac{y_{min} + y_{max}}{2} \\
\text{At this point, both errors are equal, and hence the worst-case error is minimized}
\end{gather}
$$
![[Pasted image 20250302010916.png]]

#### C
Consider the loss function $L(m) = \sum_{i=1}^{n}|y_{i}-m|$. Prove that L(m) is minimized by setting m to the median of the data.

Let's imagine we have a set of points on the number line:

1 2 3 4 10.

Our function is telling us that m=3 will minimize the error in this data, since it's the median.

L(m) = 

2, 1, 0, 1, 7 = 11

Using the mean, we would set m=4 and 

3, 2, 1, 0, 6 = 12

So, at least in our example it does seem to minimize the function better than the median...

but why might this be?

What is different when we do $L(m) = \sum_{i=1}^{n}(y_{i}-m)^{2}$ making us choose the mean?

Let's test it out:

(median) m=3 => 4, 1, 0, 1, 49 = 55
(mean) m=4 => 9, 4, 1, 0, 36 = 50

So it does hold!

Welp, something seems clear, when we square the function, large mistakes have a significantly greater impact on the overall loss, hence encouraging the model to minimize large errors.

When we are not squaring, mistakes are treated the same across the board, contributing linearly to the total loss. 

Taking the median quite literally splits the points into two halves. From above, we saw how when we set the median from 3 to 4, all the points on the left added + 1 to the total loss, and all the points on the right contributed - 1 to the total loss.
Since, by definition of a median, there had to be more points on the left than on the right after moving from 3 to 4, increasing above the median led to a greater increase from the leftward points than the rightward points (since there were more points on the left). Let's try to make this rigurous:

$$
\begin{gather}
\text{First, let's assume that the data is sorted, and let the median be denoted by } y_{k}. \\
\text{We define two sets: }\\
N_{-}(m) = \{ i | y_{i} \leq m \} \text{ and } N_{+}(m) = \{ i | y_{i} \geq m \} \\ 
\text{And we can say that the loss function is equivalent to: } \\
L(m) =  \sum_{i=\in N_{-}(m)}(m -y_{i}) +  \sum_{i=\in N_{+}(m)}(y_{i} - m) \\ \\
\end{gather}
$$
$$
\begin{gather}
\text{When } m > y_{k}: \\
|N_{-}(m)| > |N_{+}(m)| \\ \\
\text{Now, we choose some candidate j such that: } \\
y_{k} \leq j < m \\  \\
\text{When moving from m to j, the change in the loss function is } \\
L(m) - L(j) \\
L(m) - L(j) = \sum_{i=\in N_{-}(m)}[(m -y_{i})-(j -y_{i})] +  \sum_{i=\in N_{+}(m)}[(y_{i} - m)-(y_{i} - j)] \\
L(m) - L(j) = \sum_{i=\in N_{-}(m)}(m - j) +  \sum_{i=\in N_{+}(m)}(-m + j) \\
L(m) - L(j) = \sum_{i=\in N_{-}(m)}(m - j) - \sum_{i=\in N_{+}(m)}(m - j) \\ 
L(m) - L(j) = |N_{-}(m)|(m - j) - |N_{+}(m)|(m - j) \\ \\
L(m) - L(j) = (m - j) (|N_{-}(m)| - |N_{+}(m)| )\\ \\
\text{Since }  \\ 
m > j \implies m - j > 0 \\
\land  \\ 
|N_{-}(m)| > |N_{+}(m)| \implies |N_{-}(m)| - |N_{+}(m)| > 0 \\
\therefore L(m) - L(j) > 0 \implies L(m) > L(j) \text{ and moving from m to j (closer to the median) reduces the loss} \\ \\
\text{Similarly, } \text{when } m < y_{k} \\
\text{A candidate j such that } y_{k} \geq j > m \\ 
\text{Has the same function: } L(m) - L(j) = (m - j) (|N_{-}(m)| - |N_{+}(m)| )\\ 
\text{And since}\\
m < j \implies m - j < 0 \\
\land  \\ 
|N_{-}(m)| < |N_{+}(m)| \implies |N_{-}(m)| - |N_{+}(m)| < 0 \\
\therefore L(m) - L(j) > 0 \text{ and our assumption holds}
\\
\end{gather}
$$
#### D
In a few short sentences, discuss when you might prefer each of the three losses above. Is the median typically considered a more “robust” measure of central tendency than the mean? Why?

The maximum loss might be good when you want to make sure that the worst case error is low. The mean is good when you want to penalize big errors. The median is good when you want each error to contribute linearly to the loss. I think that the median is a better measure of central tendency due to it's equal evaluation of every point and less focus on punishing outliers.

## Practice with Non-linear Transformations
### Question
![[Screenshot 2025-03-02 at 3.50.51 AM.jpg | 1000]]
### Answer
#### A
$$
\begin{gather}
\text{We want to get this into the form: } y_{i} = \beta_{0} + \beta \times x_{i} \\ \\
\text{Current Model} : f_{z_{0}, \alpha}(t) = z_{0}e^{-\alpha t} \\
c_{i} = z_{0}e^{-\alpha t_{i}} \\
\ln(c_{i}) = \ln(z_{0}e^{-\alpha t_{i}})\\
\ln(c_{i}) = \ln(z_{0}e) - \alpha t_{i}\\ \\
\text{If we define: } \\
y_{i} = \ln(c_{i}) \\ x_{i} = t_{i} \\ \beta_{0} = \ln(z_{0}e) = \ln(z_{0}) \\ \text{and } b_{1} = - \alpha \\ \\
\text{We can now fit the data into our linear function.}
\end{gather}
$$
#### B
```python
def func(times, concentrations):
	# the prediction is concentrations' natural log
	y = np.log(concentrations) 
	# the predictor is the same (time) 
	
	n = len(times)

	X = np.column_stack((np.ones(n), times)) # n rows and 2 columns
	# The first column is all ones (for β0​) and the second column contains the x-values (for β1​)

	# https://numpy.org/doc/stable/reference/generated/numpy.linalg.inv.html
	beta = np.linalg.inv(X.T @ X) @ (X.T @ y)

"""
X.T is the transpose of the design matrix.
X.T @ X computes the matrix product X^T X. Similarly for X^T y
"""

	beta_0, beta_1 = beta[0], beta[1]

	return np.exp(beta_0), -beta_1
```
![[Screenshot 2025-03-02 at 4.48.44 AM.jpg]]
![[Screenshot 2025-03-02 at 4.50.14 AM.jpg]]
## Problem 4: Practice With Gradients 
### Question
![[Screenshot 2025-03-02 at 4.54.37 AM.jpg]]
### Answer
#### A

$$
\begin{gather}
\lVert z \rVert ^{p}_{p} = \sum_{i=1}^{n}(z_{i})^{p} \\
\text{Derive an expression for } \nabla g(z), \text{where } g(z) = \lVert z \rVert ^p_{p} \\ \\
\nabla g(z) = \nabla \lVert z \rVert ^{p}_{p} = \frac{\partial}{\partial z_{i}} \sum_{i=1}^{n}(z_{i})^{p} = \sum_{i=1}^{n}(p\times z_{i}^{p-1})
\end{gather}
$$
##### Notes
https://en.wikipedia.org/wiki/Lp_space 
Restricting for even integer values of $p$ is likely made for two important reasons: **to ensure full differentiability** of $g(z)$ in all real directions and to align with the definition of an $\ell_p$ norm without ambiguity.
![[Screenshot 2025-03-02 at 10.24.16 PM.jpg]]
- **Differentiability:** When $p$ is even (e.g. $2,4,6,\dots$), the function $g(z)=\sum_i (z_i)^p$ is a polynomial in the components of $z$. Polynomials are smooth (infinitely differentiable) everywhere on $\mathbb{R}^n$. In particular, there is no cusp or nondifferentiable point at $z_i=0$ because an even power eliminates any sign change issues. For example, $|x|^2 = x^2$ is differentiable for all $x$, including at $x=0$ 
- **Norm Properties:** Norms, by definition, are **absolutely homogeneous** and **positive definite** (always non-negative, and zero only at the origin). For this to equal $(\sum_i z_i^p)^{p}$ without absolute values, we must have $z_i^p = |z_i|^p$ for each term. This equality holds true **only when $p$ is an even integer**, because raising to an even power automatically yields a non-negative result

#### B
$$
\begin{gather}
\text{Derive an expression for: } \nabla L_{p}(\beta) \\
\end{gather}
$$
We know that 
![[Screenshot 2025-03-02 at 10.11.38 PM.jpg |400]]
but this is for the case where we are doing an l-2 norm.

$$
\begin{gather}
\nabla L_{p}(\beta) = \nabla \lVert y - f_{\beta}(x) \rVert ^{p}_{p}  \\
\nabla \lVert y - f_{\beta}(x) \rVert ^{p}_{p} = \nabla \lVert y - X\beta \rVert ^{p}_{p} \\ \\

\nabla \lVert y - X\beta \rVert ^{p}_{p} = \nabla \sum(y_{i} - x_{i}^{\top}\beta)^{p} \\
\text{If we let } r_{i} = y_{i} - x_{i}^{\top}\beta, \forall i \in \{ 1,\dots n \} \text{ we can express as:} \\
\nabla \sum(r_{i})^{p} \\ \\
\text{And if we differentiate: } \\ 
\frac{\partial}{\partial \beta}\sum(r_{i})^{p} \\
p(r_{i})^{p-1} \times \frac{\partial r_{i}}{\partial \beta}\\
\frac{\partial r_{i}}{\partial \beta} = -x^{\top}_{i}\\
p(r_{i})^{p-1} \times -x^{\top}_{i}\\
-p(r_{i})^{p-1} \times x^{\top}_{i}\\ 
-p\sum{(r_{i})^{p-1} \times x^{\top}_{i}\\}
\\ \\
\nabla L_{p}(\beta) = -p X^{\top}((y-X\beta)^{p-1})
\end{gather}
$$
##### Notes

In linear regression or in a general linear model, the **fitted value** (or prediction) for the i-th observation is

$\hat{y}_i \;=\; x_i^\top\,\beta$

i.e., the dot product between the i-th feature vector $x_i$ and the parameter vector $\beta$.

Thus the residual (difference between actual and predicted) is:

$r_i \;=\; y_i - \hat{y}_i \;=\; y_i \;-\; x_i^\top\,\beta.$

When we write a loss function based on these residuals—e.g. the sum of p-th powers:

$\|\,y - X\beta\,\|_p^p \;=\; \sum_{i=1}^n \bigl|\,y_i - x_i^\top \beta \bigr|^p,$

From the Matrix‐Vector Perspective we:

1. **compute predictions** $\hat{y} = X\beta$, which is an $n \times 1$ vector whose i-th entry is $x_{i}^{\top}\beta$
2. **compute residuals** $r \;=\; y - \hat{y} \;=\; y - X\beta$, which is an n $n \times 1$ vector whose i-th entry is $r_{i} = y_{i} - x_{i}^{\top}\beta$
3. **compute the p-norm** $\lVert r \rVert ^{p}_{p} = \sum ^{n}_{i=1}|r_{i}|^{p}$, hence the summation is a component by component version of $\lVert y - X\beta \rVert^{p}_{p}$ (*we can drop abs if p is even*)

## Piecewise Linear Regression via Feature Transformations
### Question
![[Screenshot 2025-03-03 at 9.24.50 AM.jpg]]
![[Screenshot 2025-03-03 at 9.25.02 AM.jpg]]
![[Screenshot 2025-03-03 at 9.25.20 AM.jpg]]
### Answer
#### A
$$
\begin{gather}
\text{Since we have that } a_{1} + s_{1}\lambda = a_{2} + s_{2} \lambda \implies a_{2} = a_{1} + s_{1}\lambda -s_{2}\lambda \\
\\
\text{We can subsitute for } a_{2}, x \geq \lambda \text{ such that: } \\
a_{2} + s_{2}x = [a_{1}+s_{1}\lambda-s_{2}\lambda] + s_{2}x \\ \\
f(x) = \begin{cases}
a_{1}+s_{1}x & x < \lambda \\
[a_{1}+s_{1}\lambda-s_{2}\lambda] + s_{2}x & x \geq \lambda
\end{cases}
\end{gather}
$$
#### B
**I am about confused about norms, we do the second norm here  (and have done it most of the time), but, above, we had p norm. What is the difference as it pertains to our model?**

I am a bit confused here, I know that we want the find
$$
\begin{gather}
\beta* = X^{\top}y(X^{\top}X)^{-1} = \begin{bmatrix}
\beta_{0} \\
\beta_{1} \\
\beta_{2}
\end{bmatrix}
\end{gather}
$$
I tried to get some help with AI but I don't understand if the parameters should directly be the betas or not? 

Is this just algebra or is something more advanced going on here? From what I was thinking, it seems like $a_{1}$ is just the intercept so sure it should be $\beta_{0}$, but $s_{2}$ being $\beta_{1}+\beta_{2}$ is such because we need s1 and s2 to meet up due to $a_{1} + s_{1}\lambda = a_{2} + s_{2}$??

![[Screenshot 2025-03-03 at 11.27.43 AM.jpg | 400]]![[Screenshot 2025-03-03 at 11.27.55 AM.jpg | 400]]