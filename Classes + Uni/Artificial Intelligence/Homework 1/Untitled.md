You're right, my apologies. I combined the terms prematurely. Showing the full substitution before simplifying is a clearer way to present the derivation.

Here is the corrected version with that intermediate step included. 👍

***

To find the partial derivative of the Gaussian probability density function $\mathcal{N}$ with respect to the variance $\sigma_k^2$, we use the product rule, $\frac{\partial}{\partial x}(fg) = f'g + fg'$.

We first split the Gaussian function into two parts, $f$ and $g$:
$$\mathcal{N} = \underbrace{\frac{1}{\sqrt{2\pi\sigma_k^2}}}_{f} \underbrace{\exp\left(-\frac{(x_i - \mu_k)^2}{2\sigma_k^2}\right)}_{g}$$

***

### **Component Derivatives**

First, let's find the derivative of each component with respect to the variance, $\sigma_k^2$.

**Derivative of f:**
Let $f = (2\pi\sigma_k^2)^{-1/2}$. Using the power and chain rules:
$$f' = \frac{\partial f}{\partial\sigma_k^2} = -\frac{1}{2}(2\pi\sigma_k^2)^{-3/2} \cdot (2\pi) = -\frac{1}{2\sigma_k^2} \cdot \underbrace{(2\pi\sigma_k^2)^{-1/2}}_{f} = -\frac{1}{2\sigma_k^2}f$$

**Derivative of g:**
Let $g = \exp\left(-\frac{(x_{i}-\mu_{k})^{2}}{2\sigma^{2}_{k}}\right)$. Using the chain rule:
$$g' = g \cdot \frac{(x_{i}-\mu_{k})^{2}}{2\sigma_k^4}$$

***

### **Substitution and Combination**

Now we substitute the full expressions for $f, g, f',$ and $g'$ back into the product rule formula, $f'g + fg'$:

$$\frac{\partial \mathcal{N}}{\partial\sigma^{2}_{k}} = \underbrace{\left( -\frac{1}{2\sigma_k^2} \frac{1}{\sqrt{2\pi\sigma_k^2}} \right)}_{f'} \underbrace{\left( \exp\left(-\frac{(x_i - \mu_k)^2}{2\sigma_k^2}\right) \right)}_{g} + \underbrace{\left( \frac{1}{\sqrt{2\pi\sigma_k^2}} \right)}_{f} \underbrace{\left( \left(\exp\left(-\frac{(x_i - \mu_k)^2}{2\sigma_k^2}\right)\right) \frac{(x_{i}-\mu_{k})^{2}}{2\sigma_k^4} \right)}_{g'}$$

Notice that the original Gaussian function $\mathcal{N} = f \cdot g = \frac{1}{\sqrt{2\pi\sigma_k^2}} \exp(-\dots)$ appears in both terms. We can simplify by substituting $\mathcal{N}$ back in:

$$\frac{\partial \mathcal{N}}{\partial\sigma^{2}_{k}} = \underbrace{\left( -\frac{1}{2\sigma_k^2} \mathcal{N} \right)}_{f'g} + \underbrace{\left( \mathcal{N} \frac{(x_{i}-\mu_{k})^{2}}{2\sigma_k^4} \right)}_{fg'}$$

Now, factor out the common term $\mathcal{N}$:
$$\frac{\partial \mathcal{N}}{\partial\sigma^{2}_{k}} = \underbrace{\mathcal{N} \left[ \frac{(x_{i}-\mu_{k})^{2}}{2\sigma_k^4} - \frac{1}{2\sigma_k^2} \right]}_{\text{Combine terms from } f'g \text{ and } fg'}$$

Factoring out $\frac{1}{2\sigma_k^2}$ gives the final form seen in some derivations:
$$\frac{\partial \mathcal{N}}{\partial\sigma^{2}_{k}} = \overbrace{\frac{1}{2\sigma_k^2}}^{\text{Factor out}} \mathcal{N} \left[ \underbrace{\frac{(x_{i}-\mu_{k})^{2}}{\sigma_k^2} - 1}_{\text{Remaining terms}} \right]$$