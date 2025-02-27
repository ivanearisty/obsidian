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
Some smart people wanted to prove that gradient descent converges for convex functions. 

We can assume that:

1:
L is convex 

2:
If a function is 10 lipschits is doesnt  change by more than G in a ceratain interval. 
The function is not very steep.
Aka, deosnt change too rapidly

3:
Our starting point is not going to be more than R far away than the optimal point. 

18/44
We want to prove that if the number steps is greater than Rsr G2 / epsilon sr, then the Loss function on beta hat is less than or equal to our optional + epislon.

The loss of some beta hat will be either less than or equal to the optimal + some small number/

19/44
Intermediate definition of alternative convexity definition.
THis one is for the gradient, our previous one was based on points
We can say a function is convex if the los sof alpha - loss of beta is greater than the gradient xx (alpha - b)

20/44 
transitivity from claim1  to claim 1a

21/44
how come we can us ea beta start we dont know?

22/44 23/44 all cancel out 

24/44 final step

29/44 30/44
Armijo rule,

if we set the next iteration as the currrent iteration - gradient, then the next iteration is approx.

If you have a very small learning rate

36/44 randomized variant of gradient descent that reduces n when n is large.

40/44
Gradient descet uses all the points whcih you go to the star more directly

if you use one point you will go ina  roundabout way but each iteration is.

*Stochastic gradient descent:*
from my personal assumption, choosing a random point to get the gradient feels kinda wild,
why not do sqrtn n points? 
is there a way to get log(n)

https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming

Metrics Book: Software development metrics David Nicolette.

Velocity is the most looked at metric for software development.

Onboarding time. Time to tenth pull request.