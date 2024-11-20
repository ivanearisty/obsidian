---
tags:
  - PDS
---
# Normalization

The goal of relational database design is to generate a set of relation schemas that allows us to store information without unnecessary redundancy, yet also allows us to retrieve information easily.

This is accomplished by designing schemas that are in an **appropriate normal form**.

## Features of Good Relational Designs

In general, a schema that exhibits repetition of information may have to be decomposed into several smaller schemas.

![[Screenshot 2024-11-20 at 6.09.02 PM.jpg]]

### Lossless Decomposition

![[Screenshot 2024-11-20 at 6.11.26 PM.jpg]]

![[Screenshot 2024-11-20 at 6.12.13 PM.jpg]]

For example, if we decompose employee into employee 1 and employee 2 as shown above, we get a lossy decomposition:

![[Screenshot 2024-11-20 at 6.15.13 PM.jpg]]

### Normalization Theory

Normalization is the generate a set of relation schemas that allows us to store information without unnecessary redundancy.

1. Decide if a given relation schema is in “good form.” There are a number of different forms (called normal forms), which we cover in Section 7.3.

2. If a given relation schema is not in “good form,” then we decompose it into a number of smaller relation schemas, each of which is in an appropriate normal form. The decomposition must be a lossless decomposition.

To determine whether a relation schema is in one of the desirable normal forms, we need additional information about the real-world enterprise that we are modeling with the database. These are called **functional dependencies**.

## Decomposition Using Functional Dependencies

