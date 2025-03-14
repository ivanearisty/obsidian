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

## Problem 3: Naive Bayes (12pts)

### A
P(spam) = 2/3
### B
P("password" | spam) = 1/2
### C
$$
\begin{gather}
P(spam | 'send, us, your, account') = P('send, us, your, account' | spam) \times P(spam) \\ \\
P('send, us, your, account' | spam) = \frac{3+1}{13+6} \times \frac{3+1}{13+6} \times \frac{4+1}{13+6} \times \frac{1+1}{13+6} \\ \\
P(spam | 'send, us, your, account') = P('send, us, your, account' | spam) \times P(spam) =  \frac{3+1}{13+6} \times \frac{3+1}{13+6} \times \frac{4+1}{13+6} \times \frac{1+1}{13+6} \times \frac{2}{3}\\ \\ 
\end{gather}
$$
### D
$$
\begin{gather}
P(spam | 'send, us, your, account') = P('send, us, your, account' | spam) \times P(spam) \\ \\
P('send, us, your, account' | spam) = \frac{3+1}{13+6} \times \frac{3+1}{13+6} \times \frac{4+1}{13+6} \times \frac{1+1}{13+6} \\ \\
P(spam | 'send, us, your, account') = P('send, us, your, account' | spam) \times P(spam) =  \frac{3+1}{13+6} \times \frac{3+1}{13+6} \times \frac{4+1}{13+6} \times \frac{1+1}{13+6} \times \frac{2}{3} \\ \\ 
\end{gather}
$$
## Problem 4: Logistic Regression (12pts)
### A
![[Screenshot 2025-03-13 at 8.48.43 PM.jpg]]
### B
$$
\begin{gather}
\text{bias b} = w_{0} \\
\text{We need to find a linear function that produces at most one error on: } \\
w_{0}+w_{1}x_{1}+w_{2}+x_{2} >0 \rightarrow y=1\\
\text{Let } w \text{with w0 included be } = [40,1,-40,] \\
\text{This incorrectly predicts the third value as yes, but predicts the first value as no.} \\
\text{All other values become yes.}
\end{gather}
$$

### C
$$
\begin{gather}
P(y_{i} = 1|x_{i}) = \frac{1}{1+e^{-z_{i}}}, z_{i} = w^{T}x_{i} + b \\
\\
\end{gather}
$$
$$
\begin{align}
P(y_{i} = 1|x_{i}) = \frac{1}{1+e^{-z_{i}}}, z_{i} = w^{T}x_{i} + b && \text{Formula}\\
f(z_{i} = 30,0) && \frac{1}{1+e^{-(0 \times 40 + 1 \times 30 - 40)}} = -10\\
f(z_{i} = 50,1) && \frac{1}{1+e^{-(1 \times 40 + 1 \times 50 - 40)}} = 50 \\
f(z_{i} = 70,1) && \frac{1}{1+e^{-(1 \times 40 + 1 \times 70 - 40)}} = 70\\
f(z_{i} = 80,2) && \frac{1}{1+e^{-(2 \times 40 + 1 \times 80 - 40)}} = \dots\\
f(z_{i} = 100,1) && \frac{1}{1+e^{-(1 \times 40 + 1 \times 100 - 40)}} =\dots \\
\end{align}
$$
The least likely comes from the first value where up top we get -10.

### D
$$
\begin{gather}
\text{The decision boundary does not really change with our scaling: } 
z_{i} = \alpha w_{0} + + \alpha w_{1}x_{1}+\alpha w_{2}x_{2} \\
\text{However, I do think that we push values to be more positive or negative, which, in a way,}\\
\text{is like saying that we are "more confident?" on our predictions.}
\end{gather}
$$

## Problem 5: Tree Based Methods (12pts)
### A
We first start at the root and we need to pick a variable as the splitting point.
To pick this variable we consider how well the variable splits the groups by using RSS.
So, we evaluate how much each variable reduces the RSS and pick the maximum.
After this initial split, we keep going for each child in a recursive fashion.
$$
\begin{gather}
\text{Let's say that we have a parent node and have } y_{1}, y_{2},\dots y_{n} \text{ observations, }
\text{the average is }\bar{y}.\\
\text{The RSS for teh parent is} RSS_{parent} = \sum_{i=1}^{n}(y_{i}-\bar{y})^{2} \\
\text{If we split } X_{j} < s \text{ into left and right children:} \\
RSS_{l} = \sum_{i\in R_{l}}(y_{i}-\bar{y})^{2} \\
RSS_{r} = \sum_{i\in R_{l}}(y_{i}-\bar{y})^{2} \\
\text{Then our rss when we split is:  } RSS_{split} = RSS_{l} + RSS_{r} \\
\text{and the reduction is the difference between RSS from parent and this split.}
\end{gather}
$$

### B

### C
#### Bagging
Bagging is when we build multiple trees with random, replacement enabled, samples of training data, and average predicitons.
The benefit is that we reduce the variance from errors in individual trees.
#### RF
A RF does bootstrapping, but then every tree is built by selecting a random subset of features as well. This decorrelates the trees further, reducing variance and adds higher aaccuracy
#### Booooost
Boosting is building trees iteratively, where each new tree is trained to correct RSS of previous trees. This reduced bias on difficult to predict cases, but can lead to overfitting.

#### General Cons
For all the examples we talked about, a single tree is very easy to visualize and interpret. A decision can be traced along a path and clearly show how we got to an answer.
The methods discussed above combine many thousands of trees, greatly reducing interpretability and turning the model into a black box. It is possible to create nice visualizations of thousands of trees to show how we get to decisions, but the