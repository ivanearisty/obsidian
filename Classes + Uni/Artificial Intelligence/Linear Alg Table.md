
Make this obsidian ready. Add other common facts I should know like,
$$\sigma(z)=\frac{1}{1+e^{-z}}$$

# [[Deep Neural Networks]] (DNN)

## 1) Core forward/backward equations (1 hidden layer template)

- **Forward**
    
    - (z^{(1)} = W^{(1)}x + b^{(1)}), (h = \phi(z^{(1)}))
        
    - (z^{(2)} = W^{(2)}h + b^{(2)})
        
    - For classification (softmax): (\hat{y}_k=\dfrac{e^{z^{(2)}_k}}{\sum_j e^{z^{(2)}_j}})
        
- **Loss (cross-entropy)**  
    ( \mathcal{L} = -\sum_{k} y_k \log \hat{y}_k)
    
- **Backprop (essential snippets)**
    
    - Output layer: (\displaystyle \frac{\partial \mathcal{L}}{\partial z^{(2)}}=\hat{y}-y)
        
    - Hidden: (\displaystyle \frac{\partial \mathcal{L}}{\partial z^{(1)}}=\big((W^{(2)})^\top(\hat{y}-y)\big)\odot \phi'(z^{(1)}))
        
    - Params: (\displaystyle \frac{\partial \mathcal{L}}{\partial W^{(2)}}=(\hat{y}-y)h^\top,\quad \frac{\partial \mathcal{L}}{\partial b^{(2)}}=\hat{y}-y)  
        (\displaystyle \frac{\partial \mathcal{L}}{\partial W^{(1)}}=\Big(\frac{\partial \mathcal{L}}{\partial z^{(1)}}\Big) x^\top,\quad \frac{\partial \mathcal{L}}{\partial b^{(1)}}=\frac{\partial \mathcal{L}}{\partial z^{(1)}})
        

> **Exam pattern:** “Write gradients for a small MLP with a given nonlinearity + softmax CE.”

---

## 2) Nonlinearities (pick and justify)

- **ReLU**: (\phi(u)=\max(0,u)), avoids vanishing grads, sparse activations.
    
- **Leaky/Parametric ReLU**: keeps small negative slope, helps dead-ReLU.
    
- **Tanh / Sigmoid**: bounded; can saturate → slower training (unless small nets).
    
- **GELU/Swish**: smooth, often stronger on deep nets.
    

> **When asked “why a nonlinearity?”**  
> To make the network **nonlinear** → universal function approximation; without it, stacked affine layers collapse to one affine map.

---

## 3) Initialization & normalization (what to say/do)

- **He init (ReLU)**: (W_{ij}\sim \mathcal{N}(0, \tfrac{2}{\text{fan_in}}))
    
- **Xavier/Glorot (tanh)**: (W_{ij}\sim \mathcal{N}(0, \tfrac{2}{\text{fan_in}+\text{fan_out}}))
    
- **BatchNorm** (per feature):  
    ( \hat{h}=\dfrac{h-\mu}{\sqrt{\sigma^2+\epsilon}},\quad y=\gamma\hat{h}+\beta )  
    _Why it helps:_ stabilizes activations, allows higher learning rates, combats internal covariate shift.
    

---

## 4) Regularization: how to justify quickly

- **Weight decay (L2)**: add (\lambda|W|_2^2) to loss → smaller, smoother weights.
    
- **Dropout (p)**: randomly zero activations during training → ensemble-like, reduces co-adaptation.
    
- **Early stopping / data aug / label smoothing**: standard overfitting controls.
    

---

## 5) Residual learning (often asked conceptually)

- **Block learns a residual:** (y=x+F(x;,\theta)).  
    _Rationale you can write fast:_ optimizing (F(x)=h(x)-x) eases gradient flow and helps very deep nets converge; identity skip lets gradients bypass bad layers.  
    **Bottleneck (1×1-3×3-1×1)** reduces compute/params so depth can increase at similar cost.
    

---

## 6) Losses for representation learning (pair/triplet)

- **Contrastive (pairs, margin (\epsilon))**  
    ( L = \mathbb{1}[y_i=y_j]|f(x_i)-f(x_j)|_2^2 ;+; \mathbb{1}[y_i\neq y_j]\max\big(0,\epsilon-|f(x_i)-f(x_j)|_2\big)^2)
    
    - _Explain quickly:_ pulls same-class embeddings together; pushes different-class pairs at least (\epsilon) apart.
        
- **Triplet (anchor–pos–neg)**  
    ( L = \max\big(0,, |f(a)-f(p)|_2^2 - |f(a)-f(n)|_2^2 + \alpha\big) )
    
    - _Explain quickly:_ enforces a margin (\alpha) between positive and negative distances.  
        **Inference:** k-NN in embedding space or thresholding distances.
        

---

## 7) Empirical vs. true risk (one-liner to reuse)

- **Empirical risk** (L_e(g)=\frac{1}{m}\sum_{i=1}^m \ell(g(x_i),y_i)) averages **over the training samples**.
    
- **True risk** (L(g)=\mathbb{E}_{(x,y)\sim \mathcal{D}}[\ell(g(x),y)]) is expectation **over the data distribution**, not over hypotheses. _Why it matters:_ generalization = how well (L_e) estimates (L).
    

---

## 8) Training loop (what to write if asked to outline)

1. Sample minibatch ((x,y))
    
2. Forward → loss
    
3. Backprop → grads
    
4. Update (SGD/Adam)
    
5. Optional: BN/dropout; LR schedule; early stop.
    

---
