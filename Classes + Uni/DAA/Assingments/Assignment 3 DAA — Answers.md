# iae225 — Assignment 3
## Question 1
### Problem 1
#### Question

Given the input 5, 1, 4, 2, 7, 9, 3, 6 , count the number of comparisons carried out when a BST is built by inserting the keys in their given order. Recall that in class, we showed that the number of comparisons carried out by the BST building process is the same as the number of comparisons carried out by Quicksort. Your job is to show the execution of quicksort (and which pivots) corresponds to the BST that you built. Be sure to illustrate that both procedures use the exact same number of comparisons.

#### Answers

I was unsure whether to do random insertions or not

![[BST.drawio.svg]]
so for comparisons you can see that each insertion does:
1, 2, 3, 1, 2, 4, and 2 comparisons when inserting. The exact same of qs.
```
Quicksort representation:
5, 1, 4, 2, 7, 9, 3, 6

5 -> 0

1, 5 -> 1

1, 4, 5 -> 2

1, 2, 4, 5 -> 3

1, 2, 4, 5, 7 -> 1

1, 2, 4, 5, 7, 9 -> 2

1, 2, 3, 4, 5, 7, 9 -> 4

1, 2, 3, 4, 5, 6, 7, 9 -> 2
```

### Problem 2

#### Question
Suppose we build a BST on n elements, by first permuting the input sequence, and then inserting the elements in random order. After n − 1 elements are inserted, we have one element left to insert. How many possible positions are there for the last element to be positioned in the tree? Explain your answer.

#### Answer
## Question 2
## Question 3
## Question 4
## Question 5
