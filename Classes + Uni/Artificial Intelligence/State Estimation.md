Three types of states:

- Atomic, frequent in planning problems, devide a plot to square of some size and you dont have to decompose state it's basically just a number
- Factored states consist of other random variables and we make it into a long vector, everything in the perception module is basically a random state
- Structured (relational) states are when we're interested in creating relationships (im on top of a table)

We're focusing on factored states.

# Recursive State Estimation

notations
1. Action is $\alpha_{t}$ Agent first takes an action and then senses the environment.
2. $\alpha_{t_{2}}:a_{t_{2}}$ all the actions from time 1 to time 2
3. measurment of $Z_{t}$ could be predictions from perception. For example, $\hat{y}$ could be raw sensory information.
4. $z_{t_{1}}:z_{t_{2}}$ same as before

## State Transition Model

Generative Model for the state evolution.

$P(S_{t} | S_{0: t_{-1}}, \alpha_{1:t}, Z_{1:t-1})$

Probability of reaching state St given the history of previous states, history of actions, and history of measurements.

A state S_t is complete if it is a complete summary of the past.
St is a sufficient statistic for all past measurements and actions. (Markovian Assumption)

This simplifies things to:
$P(S_{t} | S_{t_{-1}}, \alpha_{t})$

This says that the action at time t induces the state transition from st-1 to st

## Generative Measurement Model

$P(Z_{t}|S_{t})$

Probabilistic Graphical Models: 
Hidden Merkov Model
![[Screenshot 2025-10-17 at 5.59.52 AM.png]]

1. $\hat{bel}(S_{t})$ = belief of being in state St before receiving measurment Zt
2. $bel(S_{t})$ = belief of being in state St after receiving measurment Zt

bayer-filter(bel(st-1), alphat, zt)

involves 2 steps: 
![[Screenshot 2025-10-17 at 6.07.25 AM.png]]

Why Bayes?
![[Screenshot 2025-10-17 at 6.10.02 AM.png]]

## The Drone Localization Problem

![[Screenshot 2025-10-17 at 6.21.53 AM.png]]

$Z_{t} = x_{t}+ \epsilon_{z}$ 

Where $\epsilon ~ N(0,\sigma_{z}^{2})$  epsilon is normally distributed.

Assumptions:
1. Drone is hovering, no wind
2. Every $\Delta t$ we get a measurment.

![[Screenshot 2025-10-17 at 6.24.25 AM.png]]

We want to quickly make the drone converge to the actual location.

What is the probability distribution of Zt? Well, it's a gaussian with xt mean and sigma z squared.

$Z_{t}~ N(X_{t}, \sigma_{z}^{2})$


![[Kalman]]
