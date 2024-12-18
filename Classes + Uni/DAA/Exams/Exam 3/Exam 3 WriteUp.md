---
tags:
  - DAA
---
# iae225 - Exam Writeup

I acknowledge that my submitted Exam work is entirely my own. I have read and am in accordance with the Student Code of Conduct policy of NYU Tandon and fully accept the consequences of breaching the above instructions. 
Name: Ivan Aristy
Signature: Ivan Ernesto Aristy Eusebio

## Question 1

![[Screenshot 2024-12-18 at 5.58.44 PM.jpg]]

Order:
AB, AD
BC, BD, BE
CE
DC
EB, ED

![[Screenshot 2024-12-18 at 6.03.08 PM.jpg]]
Show:
- distance attribute
- parent attribute
- current edges of SSP
- no changes

Init:
![[Screenshot 2024-12-18 at 6.05.49 PM.jpg]]

V-1 iterations:

Iteration 1:
AB
![[Screenshot 2024-12-18 at 6.08.50 PM.jpg]]
AD
![[Screenshot 2024-12-18 at 6.09.11 PM.jpg]]
BC
![[Screenshot 2024-12-18 at 6.09.48 PM.jpg]]
BD
![[Screenshot 2024-12-18 at 6.10.37 PM.jpg]]
BE
![[Screenshot 2024-12-18 at 6.11.02 PM.jpg]]
CE
No changes made
DC
No changes made
EB
No changes made
ED
**HERE I FORGOT TO CHANGE THE PARENT POINTER BUT WE FIX LATER**
![[Screenshot 2024-12-18 at 6.15.57 PM.jpg]]

Iteration 2:
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
**HERE I FORGOT TO CHANGE THE PARENT POINTER BUT WE FIX LATER**
![[Screenshot 2024-12-18 at 6.18.05 PM.jpg]]
**So we will probably have an issue**
EB
No changes
ED
No changes

Iteration 3:
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
*Oh nevermind maybe we wont have an issue after all*
No changes since -2 + 3 = 1 > 0 
DC
No changes
EB
No changes
ED
No changes

Iteration 4:
**Here is when i realized that I forgot to change parent pointers, graph looks like this right now:**
![[Screenshot 2024-12-18 at 6.22.39 PM.jpg]]
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
No changes
EB
No changes
ED
No changes

Final Iteration:
**Graph looks like this:**
![[Screenshot 2024-12-18 at 6.24.17 PM.jpg]]
AB
No changes
AD
No changes
BC
No changes
BD
No changes
BE
No changes
CE
No changes
DC
No changes
EB
No changes
ED
No changes

No changes made: Graph is valid

## Question 2

### Part A
![[Screenshot 2024-12-18 at 6.26.08 PM.jpg]]
- color is either red or green 
- any path from s to t that is:
	- all one color
	- start with red and switches to green

![[Screenshot 2024-12-18 at 6.27.41 PM.jpg]]
![[Screenshot 2024-12-18 at 6.34.19 PM.jpg]]
DFS with state might work but it produces a solution that uses backtracking and way too much space.

Plain BFS doesn't work because we can go back to visit nodes at previous levels.



