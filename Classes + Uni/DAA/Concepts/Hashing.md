---
tags:
  - DAA
---
# Concept
## Needs

### Intro
Suppose you want to store a list of students in your class by their ID

![[Screenshot 2024-09-30 at 7.16.05 PM.jpg | 100]]

You would need to **insert**, **search**, and **delete**

All of these would require longer than O(n) time complexity

> Goal: Find an efficient way for us to store data and quickly carry out the above operations

### Using an Array

|                 | Insert                     | Delete | Search                       |
| --------------- | -------------------------- | ------ | ---------------------------- |
| Array(unsorted) | O(n) best case can be O(1) | O(n)   | O(n)                         |
| Array(sorted)   | O(n)                       | O(n)   | O(logn) due to binary search |
| LinkedList      | O(1)                       | O(n)   | O(n)                         |

## Direct Addressing Tables

### Concept

Place elements in a specific position in the array.

Suppose the "keys" we wish to store are in the range:

$$0,1,2,3,\dots,m-1$$

The way it works is that we have a **universe** of possibilities, and we just directly store things where they belong.

![[Screenshot 2024-09-30 at 7.23.38 PM.jpg]]

|                   | Insert | Delete | Search |
| ----------------- | ------ | ------ | ------ |
| Direct Addressing | O(1)   | O(1)   | O(1)   |

![[Screenshot 2024-09-30 at 7.35.45 PM.jpg | 400]]

### Problem

![[Screenshot 2024-09-30 at 7.38.07 PM.jpg]]

> Hash function takes in the key and tell you were that key gets placed in the hashtable.

## Hash Table

Usea a table T\[0...m-1]

The hash function h(k) maps the keys to a value in range 0...m-1 h(12) = 5

> Problem: Two keys may has to the same slot!

This is called a **collision**.

### Hashing with Chaining

Resolves collisions using a linked list at each table entry.

The item at each place in the table has a pointer to a linked list.

We insert things at the **front** to guarantee that things take constant time. (we could keep a pointer to the back and this is still fine)

![[Screenshot 2024-09-30 at 7.43.03 PM.jpg | 500]]

> We want to keep chains very short

Worst case scenario, we insert everything to the same chain and search/delete takes O(n)

$$
\begin{gather}
\text{Average chaing length:} \\
m : \text{Table Size}\\
n : \text{\# Items in table}\\
\text{Load Factor = } \frac{n}{m}
\end{gather}
$$
A good hash function distributes keys *well*.

This would be good: ![[Screenshot 2024-09-30 at 7.45.55 PM.jpg | 300]]

$\frac{13}{6} = 2.16 \text{ Load Factor}$

**Simple Uniform Hash Function**: h(k) is equally likely to hash to any of the m slots, in which case each chain is expected to have length $\frac{n}{m}$

|                         | Insert | Delete | Search |
| ----------------------- | ------ | ------ | ------ |
| HashTable with Chaining | O(1)   | O(n)   | O(1)   |

Open Addressing and Probe Sequences