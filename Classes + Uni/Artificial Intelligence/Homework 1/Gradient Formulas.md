# Question

We consider a 2-component Mixture of Gaussians (MoG) with 1-dimensional data. Show that the gradients you need for solving the estimation problem are as follows. Use LaTeX math in markdown format for this task.

The likelihood for a point $x_i$ is
$$p(x_i \mid \pi, \mu, \sigma^2) = \pi_1 \mathcal{N}(x_i \mid \mu_1, \sigma_1^2) + \pi_2 \mathcal{N}(x_i \mid \mu_2, \sigma_2^2).$$

The log-likelihood for $m$ data points is
$$\mathcal{L} = \sum_{i=1}^{m} \log \left( \sum_{k=1}^{2} \pi_k \mathcal{N}(x_i \mid \mu_k, \sigma_k^2) \right).$$

Define the responsibility of component $k$ for data point $i$:
$$\gamma_{ik} = \frac{\pi_k \mathcal{N}(x_i \mid \mu_k, \sigma_k^2)}{\sum_{j=1}^{2} \pi_j \mathcal{N}(x_i \mid \mu_j, \sigma_j^2)}$$

Then the gradients are:

* **Mean gradient**:
    $$\frac{\partial \mathcal{L}}{\partial \mu_k} = \sum_{i=1}^{m} \gamma_{ik} \frac{(x_i - \mu_k)}{\sigma_k^2}.$$

* **Variance gradient**:
    $$\frac{\partial \mathcal{L}}{\partial \sigma_k^2} = \frac{1}{2} \sum_{i=1}^{m} \gamma_{ik} \left[ \frac{(x_i - \mu_k)^2}{\sigma_k^4} - \frac{1}{\sigma_k^2} \right].$$

* **Mixture weights gradient** (with constraint $\sum_k \pi_k = 1$):
    $$\frac{\partial \mathcal{L}}{\partial \pi_k} = \sum_{i=1}^{m} \frac{\gamma_{ik}}{\pi_k}.$$

# Some Notes
## Likelihood of a point
- The model is a **mixture** of two Gaussian distributions
- $\mathcal{N}(x_i \mid \mu_k, \sigma_k^2)$ is the probability density function (PDF) for a normal distribution, representing the likelihood of $x_{i}$​ belonging to a specific component k with mean $μk$​ and variance $\sigma_{k}^{2}$.
- πk​ is the **mixture weight** for component k. It represents the prior probability that a data point comes from that component. For example, if π1​=0.7 and π2​=0.3, it means there's a 70% chance a data point belongs to the first component and a 30% chance it belongs to the second.
- The total likelihood of a point is the **sum of the likelihoods from each component**, weighted by their respective mixture weights.

## Log-likelihood for all points

- **Log-likelihood** is a mathematical transformation used to simplify calculations. Since the logarithm is a monotonically increasing function, maximizing the log-likelihood is equivalent to maximizing the original likelihood. This turns a product of probabilities into a sum of logarithms, which is much easier to differentiate.
- The outer summation​ assumes that the data points are independent and identically distributed (i.i.d.).
- The inner summation is the mixture of the two Gaussian components, as defined in the first equation.

## Responsibility of a component

- The numerator, $\pi_k \mathcal{N}(x_i \mid \mu_k, \sigma_k^2)$, is the joint probability of the data point xi​ and its being assigned to component k.
# Answer

## Deriving Mean Gradient

$$
\begin{gather}
\text{We have the log-likelihood: } \\
\mathcal{L} = \sum_{i=1}^{m} \log \left( \sum_{k=1}^{2} \pi_k \mathcal{N}(x_i \mid \mu_k, \sigma_k^2) \right) \\ \\
\text{We need to take the derivative with respect to }
\end{gather}
$$