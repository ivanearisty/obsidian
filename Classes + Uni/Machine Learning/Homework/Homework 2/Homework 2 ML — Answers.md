# iae225
## Problem 1: Regularization (12pts)
![[Screenshot 2025-03-12 at 3.25.31 AM.jpg]]
### A
```python
best = None
bestloss = float('inf')

for i in range(0, Xtr.shape):

	Xtr_i = Xtr[:, [i]]
	Xts_i = Xts[:, [i]]

	model = LinearRegression()
    model.fit(Xtr_i, ytr)

	yhat = model.predict(Xts_i)

	loss = np.sum((yts - yhat)**2)

	if loss < bestloss:
		bestloss = loss
		best = i
```

### B

```python
best = None
bestloss = float('inf')

for i in range(0, Xtr.shape):
	for j in range(0, Xtr.shape):
		if i == j:
			continue
		Xtr_i = Xtr[:, [i, j]]
		Xts_i = Xts[:, [i, j]]
	
		model = LinearRegression()
	    model.fit(Xtr_i, ytr)
	
		yhat = model.predict(Xts_i)
	
		loss = np.sum((yts - yhat)**2)
	
		if loss < bestloss:
			bestloss = loss
			best = i
```

### C

You have to call it by the number of subsets so $p\choose k$ times.

$$
\begin{gather}
1000 \choose 10 \\
\frac{p!}{k!(p-k)!}= \frac{1000!}{10!990!} 
\end{gather}
$$

## Problem 2: Impacts of Regularization (12pts)

![[Screenshot 2025-03-12 at 3.42.24 AM.jpg]]
### A
$$
\begin{gather}
\text{We know that }
\beta^{*} = X^{T}y \space (X^{T}X + \lambda I)^{-1} \\
\text{In } (X^{T}X + \lambda I)^{-1}, \text{ as } \lambda \text{ increases, } \\
\text{we are essentially dividing by a bigger value.}
\end{gather}
$$
### B
A bigger penalty means we sacrifice fit accuracy to keep coefficients small, so the training residual must go up intuitively.
$$
\begin{gather}

\text{Teh ridge expression is: }
min_{\beta} \lVert X \beta - y \rVert ^{2}_{2} + \lambda \lVert \beta \rVert ^{2}_{2} \\
\\
\text{We claimed that for any } \lambda \rightarrow \\
\beta^{*}_{\lambda} = \frac{argmin}{\beta:\lVert \beta \rVert^{2}_{2} < c(\lambda)} \lVert X\beta - y \rVert ^{2}_{2} \\
\text{which represents the smallest training error achievable } \\
\text{when you only allow beta to have norm at most c.} \\
\\
\text{Also, we have that for } \lambda_{1} > \lambda_{2}, \space c(\lambda_{1}) < c(\lambda_{2}) \\
\\
\text{So } \\
\frac{argmin}{\beta:\lVert \beta \rVert^{2}_{2} < c(\lambda_{1})} \lVert X\beta - y \rVert ^{2}_{2} 
\geq \frac{argmin}{\beta:\lVert \beta \rVert^{2}_{2} < c(\lambda_{2})} \lVert X\beta - y \rVert ^{2}_{2}
\\
\\
\therefore
\lVert X\beta_{1}^{*} - y \rVert ^{2}_{2} \geq \lVert X\beta_{2}^{*} - y \rVert ^{2}_{2} \\
\end{gather}
$$

### C
No because we are still adding a penalty of some sort.

## Problem 4: Logistic Regression (12pts)
### B
$$
\begin{gather}
\text{bias b} = w_{0} \\
\text{We need to find a linear function that produces at most one error on: } \\
w_{0}+w_{1}x_{1}+w_{2}+x_{2} \\
\text{Let } w = [20,]
\end{gather}
$$