---
tags:
  - ml/week3
---
Below is a concise cheat‐sheet rundown on model selection based on Lecture 3:

### Model Selection Overview

- **Goal:** Choose a model that not only fits the training data well but also generalizes to unseen data.
- **Key Problem:** Training loss tends to decrease with model complexity, but too complex a model (overfitting) performs poorly on new data.

### Overfitting vs. Underfitting

- **Underfitting:** Model is too simple, unable to capture the underlying patterns.
- **Overfitting:** Model is too complex, capturing noise along with the signal.

### Train-Test Paradigm & Cross-Validation

- **Train-Test Split:**
    - **Training Set:** Used to fit models.
    - **Test Set:** Evaluates performance on “fresh” data.
    - **Observation:** Training loss decreases monotonically with complexity, while test loss reaches a minimum and then rises.
- **K-Fold Cross Validation:**
    - Divide the data into K folds.
    - Iteratively train on K–1 folds and test on the remaining fold.
    - Average the test loss across folds to estimate generalization error.
    - **Use:** Helps in robustly selecting model complexity and tuning hyperparameters.

### Risk: True vs. Empirical

- **Population (True) Risk:** Expected loss over the data distribution.
- **Empirical Risk:** Average loss measured on a sample (training/test data).
- **Key Idea:** With i.i.d. samples, the empirical risk provides an unbiased estimate of the true risk.