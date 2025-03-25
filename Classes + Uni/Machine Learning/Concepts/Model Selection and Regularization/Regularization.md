

- **Purpose:** Prevent overfitting by penalizing model complexity.
- **Ridge Regression (L2):**
    - Loss: $||X\omega - y\|_2^2 + \lambda \|\omega\|_2^2$
    - Shrinks coefficients smoothly (no exact zeros).
- **LASSO (L1):**
    - Loss:$\|X\omega - y\|_2^2 + \lambda \|\omega\|_1$
    - Encourages sparsity by setting some coefficients exactly to zero.
- **Elastic Net:** Combines L1 and L2 penalties.
- **Parameter Tuning:** The regularization parameter λ\lambda is typically chosen via cross-validation, often by grid search in log-space.
