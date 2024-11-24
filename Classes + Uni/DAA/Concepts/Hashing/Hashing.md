---
tags:
  - DAA/Week2
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

|                         | Insert | Delete                                          | Search                                          |
| ----------------------- | ------ | ----------------------------------------------- | ----------------------------------------------- |
| HashTable with Chaining | O(1)   | O(n) Worst <br>$O\left( \frac{n}{m} + 1\right)$ | O(n) Worst <br>$O\left( \frac{n}{m} + 1\right)$ |

What size table to use? If $\frac{n}{m}$ is a constant we get O(1), so pick a corresponding table size so that your load factor is constant.

### Open Addressing and Probe Sequences

When a collision occurs, we "probe" the table for an empty slot. 

![[Screenshot 2024-09-30 at 7.50.27 PM.jpg | 400]]

Each key has a **probe sequence**

The hash function gives a list of positions in the table to "try".

![[Screenshot 2024-09-30 at 7.52.28 PM.jpg]]

![[Screenshot 2024-09-30 at 7.53.40 PM.jpg | 400]]

#### Deleting in Probe Sequences

#### Linear Probe Sequence

The sequence just tries the next available spot.

Use an initial hash function h(k) and try this spot first.

![[Screenshot 2024-09-30 at 7.55.51 PM.jpg | 400]]

> Problem: Creates clusters

#### Quadratic Probe Sequence

The probe sequence consists of a quadratic function: 
$$
h(k,i) = h(k) + ai + bi^{2}
$$
a and b can be any constants...

They just end up making things jump around much more.

#### Double Hashing

In double hashing, we use two separate hash functions: h1(k) and h2(k). 

The first function is used to find the first position in the table, and the second function is used to provide the offset by which we jump in the table to find the next free spot. 

For example, if h1(25) = 3 and h2(25) = 2, then we first try to insert at position 3 and if it’s full, we jump next to position 3 + 2 = 5, then to position 3 + 2 ∗ 2 = 7 etc until we find a free spot. As above, if we hit the end of the table, we bounce back to the top.

#### Performance

![[Screenshot 2024-09-30 at 9.10.01 PM.jpg]]

Quadratic hashing
- spreads out numbers more
- might be less probes
- doesnt try everything
Double hashing if number is relatively prime:
- might produce a 0 and lead to boing
- checks entire table if not

![[Screenshot 2024-11-24 at 5.18.14 PM.jpg]]