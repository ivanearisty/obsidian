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
![[Screenshot 2025-03-02 at 12.25.35 AM.jpg | 900]]
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
L(m) = \text{max}(|y_{min}-m|, |y_{max}-m|) \\

\end{gather}
$$
