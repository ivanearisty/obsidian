---
tags:
  - ML/Week2
---

# Linear Least-Squares Regression
## 2. Model: $f_{\beta}(x) = \langle x, \beta \rangle$

- **Notation**: 
  - $x$ is a feature vector, typically written as $x = (x_1, x_2, \ldots, x_d)$.
  - $\beta$ (the Greek letter “beta”) is the parameter (or weight) vector, $\beta = (\beta_1, \beta_2, \ldots, \beta_d)$.
  - $\langle x, \beta \rangle$ denotes the dot product (inner product) between $x$ and $\beta$. In coordinates, 
    $$\langle x, \beta \rangle = x_1 \beta_1 + x_2 \beta_2 + \cdots + x_d \beta_d.$$

- **Interpretation**: 
  - Given an input $x$, the model’s prediction $f_{\beta}(x)$ is a linear combination of the components of $x$. Each component $x_j$ gets multiplied by a corresponding weight $\beta_j$, and then all those products are summed.
  - This is the core idea of **linear regression**: we assume the output is a weighted sum of the features.

---

## 3. Model Parameters: $\beta = [\beta_1, \beta_2, \ldots, \beta_d]$

- This line states explicitly that the parameter vector $\beta$ consists of $d$ entries (one weight for each feature in $x$).
- Each $\beta_j$ is a real number that we will learn/fit from data.
- In a regression problem, finding (or “learning”) $\beta$ is the main goal.

---

## 4. Loss Function: 
$$
L(\beta) = \sum_{i=1}^n \bigl(y_i - \langle x_i,\beta\rangle\bigr)^2 
= \|\,y - X\beta\|_{2}^{2}.
$$

### a) Sum of squared errors

- The left-hand side, 
  $$\sum_{i=1}^n (y_i - \langle x_i,\beta\rangle)^2,$$
  is the **sum of squared errors**. 
  - We have $n$ data points $(x_i, y_i)$. 
  - $y_i$ is the actual/true value for data point $i$.
  - $\langle x_i,\beta\rangle$ is the model’s prediction for data point $i$.
  - We subtract the predicted value from the actual value $(y_i - \langle x_i,\beta\rangle)$, square it to keep it positive and penalize large errors more strongly, and then sum over all $n$ data points.

### b) Matrix/vector notation: $\|\,y - X\beta\|_{2}^{2}$

- Here, $y$ is the vector of all target values:
  $$
  y = 
  \begin{pmatrix}
    y_1 \\
    y_2 \\
    \vdots \\
    y_n
  \end{pmatrix}.
  $$
- $X$ is the $n \times d$ “data matrix,” whose $i$th row is $x_i^T$. That is, 
  $$
  X = 
  \begin{pmatrix}
    - x_1^T - \\
    - x_2^T - \\
    \vdots \\
    - x_n^T - 
  \end{pmatrix},
  $$
  so that $X \beta$ is exactly the vector of predictions 
  $$\bigl(\langle x_1,\beta\rangle,\; \langle x_2,\beta\rangle,\; \dots,\; \langle x_n,\beta\rangle\bigr)^T.$$

- The expression 
  $$\|y - X\beta\|_{2}^{2}$$
  is the **squared Euclidean norm** of the vector $(y - X\beta)$. Concretely,
  $$
  \|y - X\beta\|_{2}^{2} 
  = 
  (y_1 - \langle x_1,\beta\rangle)^2 
  + (y_2 - \langle x_2,\beta\rangle)^2 
  + \cdots + (y_n - \langle x_n,\beta\rangle)^2.
  $$
  This matches exactly the sum of squared errors shown on the left.

### c) Why use squared error?

- **Least-squares** is a standard approach for regression because:
  1. It has a simple closed-form solution (you can solve for $\beta$ using linear algebra).
  2. Squaring penalizes large errors more, which often helps keep the model stable.
  3. It corresponds to maximizing likelihood under a Gaussian noise assumption in classical statistics (though that’s more detail than the slide shows).

---

## Putting it all together

- **Goal**: We want to choose $\beta$ to minimize this loss function $L(\beta)$.  
- Mathematically, that means solving 
  $$\min_{\beta} \; \|y - X\beta\|_{2}^{2}.$$
- Once $\beta$ is found, the function $f_{\beta}(x) = \langle x, \beta\rangle$ is our fitted linear model.

---

### Summary

1. **Model**: A linear function $f_{\beta}(x)$ = dot product of $x$ and $\beta$.  
2. **Parameters**: The vector $\beta = (\beta_1, \ldots, \beta_d)$.  
3. **Loss Function**: The sum of squared errors, $\sum_{i=1}^n (y_i - \langle x_i,\beta\rangle)^2$, which can also be written in vector/matrix form as $\|y - X\beta\|_2^2$.

This slide sets the stage for **ordinary least-squares** linear regression, where we learn $\beta$ by minimizing the total squared difference between our predictions and the actual target values.

# Gradient

### What is a Gradient? 
- **Definition:** The gradient of a function is a vector of partial derivatives that indicates the direction of the steepest ascent of that function. - **For a function** $L(\beta)$, where $\beta = (\beta_1, \beta_2, \ldots, \beta_d)$, the gradient is: $$ \nabla L(\beta) = \begin{pmatrix} \frac{\partial L}{\partial \beta_1} \\ \frac{\partial L}{\partial \beta_2} \\ \vdots \\ \frac{\partial L}{\partial \beta_d} \end{pmatrix}. $$
- **Interpretation:** Each component $\frac{\partial L}{\partial \beta_j}$ shows how much the loss changes with a small change in $\beta_j$. The gradient points in the direction of the greatest increase in the loss function. 
### Role in Minimization: 
- **Gradient Descent:** To minimize $L(\beta)$, we update $\beta$ in the direction opposite to the gradient: $$ \beta \leftarrow \beta - \eta \, \nabla L(\beta), $$ where $\eta$ is the learning rate that controls the step size. 
- **Closed-Form for Squared Loss:** For the squared error loss, $$ L(\beta) = \|y - X\beta\|_2^2, $$ the gradient is derived as: $$ \nabla L(\beta) = -2 \, X^T (y - X\beta). $$
- Setting $\nabla L(\beta) = 0$ leads to the **normal equations**: $$ X^T X\, \beta = X^T y, $$ and solving these gives the closed-form solution: $$ \beta = (X^T X)^{-1} X^T y. $$
![[Screenshot 2025-03-02 at 3.45.26 AM.jpg]]
![[Screenshot 2025-03-02 at 3.46.09 AM.jpg]]