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
\text{We had: } L(\beta_{0},\beta_{1}) = \sum_{i=n}^{n}(y_{i} - \beta_{0} - \beta_{1}\times x_{i})^{2} \\
\text{Since } \beta_{0} = 0 \\
L(\beta) = \sum_{i=n}^{n}(y_{i} - \beta \times x_{i})^{2} \\
\end{gather}
$$
#### B
![[Screenshot 2025-02-26 at 5.22.53 AM.jpg | 500]]
$\text{To find the value of } \beta \text{ that minimizes } L(\beta), \text{we take the derivative of } L(\beta) \text{ with respect to }\beta \text{ and set it to zero}:$
$$
\begin{gather}
L(\beta) = \sum_{i=n}^{n}(y_{i} - \beta \times x_{i})^{2} \\
\frac{d}{d \beta} = \sum_{i=n}^{n} 2 (y_{i} - \beta \times x_{i}) \times (-x_{i}) & \text{ By chain rule} \\
\frac{d}{d \beta} = -2 \sum_{i=n}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i}) & \text{ Extracting Constants} \\
\frac{d}{d \beta} = 0 & \text{Setting Derivative to 0} \\
-2 \sum_{i=n}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i})  = 0 & \text{ } \\
\sum_{i=n}^{n} (y_{i} - \beta \times x_{i}) \times (x_{i})  = 0 & \text{ Simplify} \\
\sum_{i=n}^{n} y_{i} x_{i} - \sum_{i=n}^{n} \beta \times x_{i}^{2}  = 0 & \text{ Distribute} \\
\sum_{i=n}^{n} y_{i} x_{i} = \sum_{i=n}^{n} \beta \times x_{i}^{2} & \text{ Solving for } \beta \\
\sum_{i=n}^{n} y_{i} x_{i} = \beta \sum_{i=n}^{n} \times x_{i}^{2} & \text{ } \\
\beta = \frac{\left( \sum_{i=n}^{n} y_{i} x_{i} \right)}{\sum_{i=n}^{n} x_{i}^{2}} \\
\beta = \frac{\bar{y}\bar{x}}{\bar{x}^{2}}
\end{gather}
$$

