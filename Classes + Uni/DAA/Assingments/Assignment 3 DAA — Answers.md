# iae225 — Assignment 3
## Question 1
### Problem 1
#### Question

Given the input 5, 1, 4, 2, 7, 9, 3, 6 , count the number of comparisons carried out when a BST is built by inserting the keys in their given order. Recall that in class, we showed that the number of comparisons carried out by the BST building process is the same as the number of comparisons carried out by Quicksort. Your job is to show the execution of quicksort (and which pivots) corresponds to the BST that you built. Be sure to illustrate that both procedures use the exact same number of comparisons.

#### Answers

I was unsure whether to do random insertions or not

![[BST.drawio.svg]]
so for comparisons you can see that each insertion does:
Compare 5 with 1: 1
Compare 4 with 5, Compare 4 with 1: 2
Compare 2 with 5, Compare 2 with 1, Compare 2 with 4: 3
Compare 7 with 5: 1 
Compare 9 with 5, Compare 9 with 7: 2 
Compare 3 with 5, Compare 3 with 1, Compare 3 with 4, Compare 3 with 2: 4  
Compare 6 with 5, Compare 6 with 7: 2
15 total
```
Quicksort representation:
5, 1, 4, 2, 7, 9, 3, 6

[5, 1, 4, 2, 7, 9, 3, 6]
Partition: [1, 4, 2, 3, 5, 7, 9, 6]
Comparisons: 7
Left: [1, 4, 2, 3]
Right [7, 9, 6]

[1, 4, 2, 3]
Parition: [1, 2, 3, 4]
Comparisons: 3
Left: [1, 2, 3]

[1,2,3]
Parition: [1, 2, 3]
Comparisons: 2
Left: [1]
Right [3]

[7, 9, 6]
Partition: [6, 7, 9]
Comparisons: 2
Left: [6]
Right: [9]

7 + 3 + 2 + 2 = 14
```

### Problem 2

#### Question
Suppose we build a BST on n elements, by first permuting the input sequence, and then inserting the elements in random order. After n − 1 elements are inserted, we have one element left to insert. How many possible positions are there for the last element to be positioned in the tree? Explain your answer.

#### Answer
## Question 2
## Question 3
## Question 4
## Question 5
