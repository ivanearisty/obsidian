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

\end{gather}
$$