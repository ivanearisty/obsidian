### Lecture Notes

6/44
Function oracle, evaluate the loss for any gvien beta
Gradient oracle, evaluate the gradient for any given beta

Given these two blackboxes, you should find these set of parameters.

7/44
Algorithm
1. Choose starting point beta(0)
2. for i = 0 -> T
	1. beta i+1 = beta of i + eda xx gradient  xx loss of beta i
3. return beta t

eda is the stepsize parameter or learning rate

8/44
the loss of some point beta + some vector v - the loss of beta can be approximated by the dot product of the gradient and the vector v.
We want the lhs to be negative and the vector v is just equal to - eda time gradient of beta.

Overshooting question, this happens if we have too big of a learning rate because you will be jumping around. For a small enough eda we can make sure it deosnt happen. Getting the right eda is somewhat of a (nathan lamberg deepseek poscast).

9/44
The gradient and the vector beta are perpendicular (when you are perpendicular, the dot product of these two is going to be 0)
The dot product is just norm of a xx norm of b xx norm of cos 0, and the cos of 90 is 0.

11/44 -> 16/44
We want to show that, for a convex function, gradient descent always converges.
If you have two points b, beta 1 and beta 2, as well as a lambda between 0 and 1.
The entire inequality si true, why? 
lhs represents the point on teh line between the points
rhs represents thh point IN the actual line
Point is, we have a lot of convex functions and these is where gradient descent works.

**Exam: prove that this function is convex** finish proof.

17/44
Convergence analysis.
Some smart people wanted to prove that gradient descent converges for convex functions. We can assume that L is convex 
If a 