---
tags:
  - classes/machinelearning/lecture
---
## Last Class
### Simple Linear Regression
$$
\begin{gather}
\text{Model} &
f_{\beta_{0},\beta_{1}(x)} = \beta_{0} + \beta_{1} \times x \\
\text{Model Parameters: } & 
\beta_{0}, \beta_{1} \\
\text{Loss Function: } &
L(\beta_{0},\beta_{1})
\end{gather}
$$

### Multiple Linear Regression

Predict target y using multiple features (in the x dimention).

> **Motivating example:**  Predict multiple features

*Linear Least Squares Regression*
$$
\begin{gather}
\text{Model}: \\
f_{\beta}(x)= < x,\beta > \space \rightarrow  \text{x is an array(vector), beta is a vector} \\
\end{gather}
$$

The difference is still the same, 

Howe do we minimize? **Gradient** set to 0. **We can do this because this is a complex function that we can find a closed form solution for.**
## Model Selection

#### Why consider alternatives to least squares?

- When $d>n$, we want to control the variance.
- Model Interpretability: remove irrelevant features by setting theri corresponding coefficients to zero. Obtain a sparse model that is easier to interpret.

#### Three classes of methods

- [[Regularization]]
- [[Feature Selection]]
- [[Model Selection]]

#### Polynomial Fit Colab

#### Training Loss Vs Testing Loss

- As degree increase the training loss goes down, but the test loss can go up, highlighting that we are creating an overfit model.

We want test loss to remain low $\rightarrow$ generalization error.

Typical train-test split 70-90 / 30-10

#### K-fold cross validation

