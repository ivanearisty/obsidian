# iae225 - Homework 3

## Kernels for Shifted Images
### A
![[z/z ScreenShots/Screenshot 2025-05-12 at 3.52.03 AM.png]]

```python
images = [I1, I2, I3, I4]
vectors = [img.flatten() for img in images]
n = len(vectors)
d2 = np.zeros((n, n))
for i in range(n):
    for j in range(n):
        diff = vectors[i] - vectors[j]
        d2[i, j] = np.dot(diff, diff)
K = np.exp(-d2 / 2)
```

![[z/z ScreenShots/Screenshot 2025-05-12 at 4.04.16 AM.png| 400]]

### B
Looking at the similarities above we get:
$$
\begin{gather}
K(I_{3}, I_{1}) \approx 0.018\\
K(I_{3}, I_{2}) \approx 0.082\\
\\ \text{and} \\ \\
K(I_{4}, I_{1}) \approx 0.082\\
K(I_{4}, I_{2}) \approx 0.05\\
\end{gather}
$$

So, for I3, which we know is a 1, we would say it's a 0, and for I4, which we know is a 0, we would say it's a 1. 

Both of these are missclassified so the k-NN classifier fails.

### C and D

Just from the get go this seems like it will do better because some of the images are literally just shifted by some degrees. Let's test it out though:

![[z/z ScreenShots/Screenshot 2025-05-12 at 4.27.26 AM.png| 400]]

![[z/z ScreenShots/Screenshot 2025-05-12 at 4.16.38 AM.png| 400]]
Now:
$$
\begin{gather}
K(I_{3}, I_{1}) \approx 1.13\\
K(I_{3}, I_{2}) \approx 0.5\\
\\ \text{and} \\ \\
K(I_{4}, I_{1}) \approx 0.2\\
K(I_{4}, I_{2}) \approx 1.15\\
\end{gather}
$$
And we're correctly classifying!

### E

![[z/z ScreenShots/Screenshot 2025-05-12 at 4.28.45 AM.png]]

From: https://www.reddit.com/r/learnmath/comments/1es3i04/sum_of_positive_semidefinite_matrices/ 

$$
\begin{gather}
\text{We know that } K_{g} \in PSD \\ \\
\text{For any fixed shift operation, the mapping: } \\
I \to I_{r} \land I \to I_{l} \\
\text{yields some vector v} \in \mathbb{R}^{5\times 4} \\ 
\text{this is then fed to } K_{g} \to \text{so each of the components are } \in PSD \\
\\
\text{The question then becomes whether sums of PSD are PSD.} \\
\text{But because you can concatenate their feature maps so that the sum of} \\ \text{kernels is just the inner product in the larger feature space, then} \\
\text{the compositions are PSD kernels and sums of PSD kernels remain PSD}
\end{gather}
$$

## Neural Networks for Curve Fitting

![[z/z ScreenShots/Screenshot 2025-05-12 at 4.54.53 AM.png| 400]]
![[z/z ScreenShots/Screenshot 2025-05-12 at 4.55.09 AM.png| 400]]
### A 
![[z/z ScreenShots/Screenshot 2025-05-12 at 4.56.15 AM.png| 400]]

Dataset 1: f(x) = 2 * abs(x-4)
ReLUs at the slope changes:

Hidden Unit 1:
Wh1 = +1, bh1 = -4, h1(x) = ReLU(x-4)

Hidden Unit 2:
Wh2 = -1, bh2 = +4, h2(x) = ReLU(4-x)

The others can be at 0.

Wo1 = 2
Wo2 = 2
Wo3 = 0
Wo4= 0
b0 = 0

For dataset 2:
$$
f(x)
\begin{cases}
x, & x \le 3 \\
-x + 6, & 3 < x \le 5 \\
0.5x - 1.5, & x > 5
\end{cases}
$$

Hidden Layer:

| Layer | weight | bias | Activations      |
| ----- | ------ | ---- | ---------------- |
| 1     | 1      | -3   | h1​(x)=ReLU(x−3) |
| 2     | 1      | -5   | h2​(x)=ReLU(x−5) |
| 3     | 1      | 0    | h3​(x)=ReLU(x)   |
| 4     | -1     | 0    | h4​(x)=ReLU(−x)  |
Output layer:

b0 = 0
Weights:
1 = -2
2 = 1.5
3 = 1
4 = -1

![[z/z ScreenShots/Screenshot 2025-05-12 at 5.36.58 AM.png| 100]]

### B

![[z/z ScreenShots/Screenshot 2025-05-12 at 5.41.48 AM.png]]

$$
\begin{gather}
L(\theta) = \sum ^{n}_{i=1}(y_{i} - f(x_{i}, \theta))^{2} \\ \\
\text{Outer:} \\
2(y_{i} - f(x_{i}, \theta)) \\ \\
\text{Inner:} \\
\Delta_{\theta}(y_{i} - f(x_{i}, \theta)) \rightarrow - \Delta_{\theta}f(x_{i}, \theta) \\
\\
\Delta_{\theta}L(\theta) = -2 \sum ^{n}_{i=1}(y_{i} - f(x_{i}, \theta)) \times\Delta_{\theta}f(x_{i}, \theta)
\end{gather}
$$

### C

| num    | weight | bias | hidden | ReLU | weight | result |
| ------ | ------ | ---- | ------ | ---- | ------ | ------ |
| 1      | -1     | 1    | -1     | 0    | -1     | 0      |
| 2      | 1      | 1    | 3      | 3    | -1     | -3     |
| 3      | 1      | -1   | 1      | 1    | -1     | -1     |
| 4      | -1     | 1    | -1     | 0    | 1      | 0      |
| + bias |        |      |        |      | 1      | 1      |
so f(2, $\theta_{0}$) = -3

### D

| num        | $h_{i}$ (relu) | $\frac{\delta f}{\delta W_{O,i}}$ | $\frac{\delta f}{\delta h_{i}}$ | relu'($z_{i}$) | $\frac{\delta f}{\delta z_{i}}$ | $\frac{\delta z_{i}}{\delta W_{H,i}=x}$ | **$\frac{\delta f}{\delta W_{H,i}}$** | **$\frac{\delta f}{\delta b_{H,i}}$** |
| ---------- | -------------- | --------------------------------- | ------------------------------- | -------------- | ------------------------------- | --------------------------------------- | --------------------------------- | --------------------------------- |
| 1          | 0              | 0                                 | -1                              | 0              | 0                               | 2                                       | **0**                                 | **0**                                 |
| 2          | 3              | 3                                 | -1                              | 1              | -1                              | 2                                       | **-2**                                | **-1**                                |
| 3          | 1              | 1                                 | -1                              | 1              | -1                              | 2                                       | **-2**                                | **-1**                                |
| 4          | 0              | 0                                 | 1                               | 0              | 0                               | 2                                       | **0**                                 | **0**                                 |
| h_i = bias | 1              | 1                                 | 1                               |                |                                 |                                         |                                   |                                   |
## Triangulating Points via Principal Component Analysis

![[z/z ScreenShots/Screenshot 2025-05-12 at 6.59.13 AM.png]]
### A

We have a table D which contains the squared distances between every pair of unknown points x_i.

For example we might have $D_{2,5} = \lVert x_{2}-x_{5} \rVert^{2}$ 

We want to recover the dot product $x_{i} \cdot x_{j}$

If we set x_1 to 0, then we know every $\lVert x_{i} \rVert^{2}$ from the distance to x1:

$D_{i1} = \lVert x_{i} - x_{1} \rVert^{2} = \lVert x_{i} \rVert^{2}$

then the dot product formula becomes:

$<x_{i},x_{j}> = \frac{1}{2}(d_{i}+d_{j}-D_{ij}) = \frac{1}{2}(D_{i1} + D_{j1}- D_{ij})$

Now, because every ||xi||^2 is known as D_i1, the formula only uses the distance, which we know, and we can reconstruct X * X transpose by filling the matrix 1 by 1
### B

Now that we have $XX^{T}$  we want to recover rank k loading vectors of X.

I used svd compute on d.

From what I understand, `U, S, Vt = svd(XXT)` gives us the columns U, which are the principal directions (the eigenvectors)

Since this is symmetric, V=U, and the right singular vectors are the same as the left singular vectors. 

So, when we want the loading vectors, each is just defined by $U_{k} \sqrt{ S_{k} }$

### C

Intuitively, PCA finds the d most important directions along which our points vary.

Since our data lives on a d-dimensional space, there are exactly d nonzero directions.

If we are setting k exactly to d, we can keep all of these nonzero directions, which means that we re-express points in a new coordinate system, but we don't actually drop any dimensions.

It's like we're rotating or reflecting on the axes, but we can always get back our original points since these rotations and reflections still preserve euclidian distance.

As soon as we set k to equal the true dimension, PCA will always give a distance preserving re-expression.

### D

```python
D = np.array(dist_matrix)
D2 = D ** 2
n = D2.shape[0]
# squared distance from city i to city 1
d = D2[:, 0]
# build the matrix 
XXT = 0.5 * (d[:, None] + d[None, :] - D2)
# Perform SVD
U, S, Vt = svd(XXT)
# top 2
U_k = U[:, :2]
S_k = S[:2]
# Vt_k = Vt[:2, :]
Z_plot = U_k * np.sqrt(S_k)
# fix plot direction
Z_plot[:, 1] *= -1
```

![[z/z ScreenShots/Pasted image 20250512084124.png| 600]]

### E

```python
r = 0.1
for i in range(n):
    for j in range(i+1, n):
        factor = np.random.uniform(1-r, 1+r)
        new_dist = D[i, j] * factor
        D[i, j] = D[j, i] = new_dist
```

That worked pretty much without issue. It seems like I am getting weird answers at anything above .15 though.

![[z/z ScreenShots/Pasted image 20250512084816.png]]

with higher values:

.15
![[z/z ScreenShots/Pasted image 20250512085035.png]]

.2
![[z/z ScreenShots/Pasted image 20250512084844.png]]

.3
![[z/z ScreenShots/Pasted image 20250512084921.png]]

.4
![[z/z ScreenShots/Pasted image 20250512084943.png]]

