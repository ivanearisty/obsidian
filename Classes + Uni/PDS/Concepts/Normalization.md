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

A database models a set of entities and relationships in the real world. There are usually a variety of constraints (rules) on the data in the real world.

Some examples for the university database are:

1. Students and instructors are uniquely identified by their ID.  
2. Each student and instructor has only one name.  
3. Each instructor and student is (primarily) associated with only one department.
4. Each department has only one value for its budget, and only one associated building.

An instance of a relation that satisfies all such real-world constraints is called a **legal instance** of the relation; a **legal instance of a database** is one where all the relation instances are legal instances.

### Notational Conventions

![[Screenshot 2024-11-20 at 6.30.03 PM.jpg]]

### Keys and Functional Dependencies
A superkey is a set of attributes that uniquely identifies an entire tuple, a functional dependency allows us to express constraints that uniquely identify the values of certain attributes.

Consider a relation schema r(R), and let α ⊆ R and β ⊆ R.

- Given an instance of r(R), we say that the instance satisfies the functional dependency α →β if for all pairs of tuples t1 and t2 in the instance such that  t1\[α] = t2\[α], it is also the case that t1\[β] = t2\[β].  
- We say that the functional dependency α →β holds on schema r(R) if, every legal instance of r(R) satisfies the functional dependency.

![[Screenshot 2024-11-20 at 6.51.15 PM.jpg]]

![[Screenshot 2024-11-20 at 6.52.27 PM.jpg]]
#### Sample Instance
![[Screenshot 2024-11-20 at 6.54.46 PM.jpg]]

#### Trivial Functional Dependency

Some functional dependencies are said to be trivial because they are satisfied by all relations. For example, A →A is satisfied by all relations involving attribute A.

Functional dependencies in database theory describe relationships between attributes (or sets of attributes) in a relation. A functional dependency \( \alpha \to \beta \) means that if two tuples (rows) of a relation agree on the values of attributes in \( \alpha \), then they must also agree on the values of attributes in \( \beta \).

A functional dependency is considered **trivial** if it is satisfied by all possible relations, regardless of the actual data in those relations. 

Similarly, AB →A is satisfied by all relations involving attribute A. In general, a functional dependency of the form α →β is trivial if β ⊆ α.

1. **$A \to A$:**
   - This dependency says that an attribute \( A \) functionally determines itself. Since this is always true (the value of \( A \) in a tuple is obviously equal to itself), it is trivial.

2. $AB \to A$:
   - This dependency says that the attributes \( A \) and \( B \) together functionally determine \( A \). Since \( A \) is already part of the left-hand side (\( AB \)), this dependency is trivial.

#### Unrequired and Satisfied Functional Dependencies

![[Screenshot 2024-11-20 at 7.32.55 PM.jpg]]
![[Screenshot 2024-11-20 at 7.34.07 PM.jpg]]

#### Inference

![[Screenshot 2024-11-20 at 7.35.39 PM.jpg]]

### Lossless Decomposition

![[Screenshot 2024-11-20 at 7.37.06 PM.jpg]]

![[Screenshot 2024-11-20 at 7.37.21 PM.jpg]]
#### SQL
![[Screenshot 2024-11-20 at 7.39.01 PM.jpg]]

## Normal Forms

### BCNF 

One of the more desirable normal forms that we can obtain is Boyce–Codd normal form (BCNF). It eliminates all redundancy that can be discovered based on functional dependencies (but there could be other redundancies).

A relation schema R is in BCNF with respect to a set F of functional dependencies if, for all functional dependencies in F + of the form α →β, where α ⊆ R and β ⊆ R, at least one of the following holds:

- α →β is a trivial functional dependency (i.e., β ⊆ α).
- α is a superkey for schema R.

A database design is in BCNF if each member of the set of relation schemas that constitutes the design is in BCNF.

### BCNF DEF

![[Screenshot 2024-11-20 at 7.46.10 PM.jpg]]

### Decomposition to BCNF

![[Screenshot 2024-11-20 at 7.51.17 PM.jpg]]

### Intro to Third Form

Designing databases to efficiently test constraints is essential. While BCNF ensures robust normalization, it can prevent efficient testing of certain functional dependencies, as shown in a university database example. A ternary relationship `dept_advisor` captures the constraints that instructors belong to one department and students can have at most one advisor per department. 

Decomposing this schema into BCNF results in two relations, `(s_ID, i_ID)` and `(i_ID, dept_name)`, but the functional dependency `s_ID, dept_name → i_ID` cannot be enforced without recomputing the join, making the design **not dependency preserving**.

To balance normalization and efficiency, **Third Normal Form (3NF)**, a weaker normal form, allows dependency preservation while maintaining acceptable normalization. This trade-off highlights the importance of considering dependency preservation when designing schemas.

### Third Normal Form

BCNF requires that all nontrivial dependencies be of the form α →β, where α is a superkey.

Third normal form (3NF) relaxes this constraint slightly by allowing certain nontrivial functional dependencies whose left side is not a superkey.

A relation schema R is in third normal form with respect to a set F of functional dependencies if, for all functional dependencies in F + of the form α →β, where α ⊆ R and β ⊆ R, at least one of the following holds:

- α →β is a trivial functional dependency.  
- α is a superkey for R.  
- Each attribute A in β − α is contained in a candidate key for R.

Note that the third condition above does not say that a single candidate key must contain all the attributes in β − α ; each attribute A in β − α may be contained in a different candidate key.

Observe that any schema that satisfies BCNF also satisfies 3NF, since each of its functional dependencies would satisfy one of the first two alternatives.

![[Screenshot 2024-11-21 at 2.50.35 AM.jpg]]
![[Screenshot 2024-11-21 at 2.53.49 AM.jpg]]

### BCNF vs 3NF

Our goals of database design with functional dependencies are:  
1. BCNF.  
2. Losslessness.  
3. Dependency preservation.  
Since it is not always possible to satisfy all three, we may be forced to choose between  
BCNF and dependency preservation with 3NF.

It is worth noting that SQL does not provide a way of specifying functional dependencies, except for the special case of declaring superkeys by using the primary key or unique constraints. It is possible, although a little complicated, to write assertions that enforce a functional dependency.

Thus even if we had a dependency-preserving decomposition, if we use standard SQL we can  test efficiently only those functional dependencies whose left-hand side is a key.

Even if we are not able to get a dependency-preserving BCNF decomposition, it is still preferable to opt for BCNF, since checking functional dependencies other than primary key constraints is difficult in SQL.

### Example

Let's consider a relation:

> R(A,B,C)

with the following functional dependencies:

1. $A \to B$
2. $C \to A$
#### Candidate Keys:

To determine the candidate keys for RR:

- A→B: Knowing A, we can determine B.
- C→A: Knowing C, we can determine A, and since A→B, C determines all attributes (A,B,C).

Thus, the only **candidate key** for R is C.

---

#### Is R in BCNF?

A relation is in **BCNF** if for every functional dependency $\alpha \to \beta, \alpha$ is a superkey. Let’s check:

1. A→B Here, A is not a superkey because A does not determine all attributes (it only determines B). **Violation of BCNF**.
2. C→A: Here, C is a superkey because it determines all attributes. **Satisfies BCNF**.

Since A→BB violates BCNF, R is not in BCNF.

---

#### Is RR in 3NF?

A relation is in **3NF** if for every functional dependency α→β, at least one of the following is true:

1. α→β is trivial (β⊆α).
2. α is a superkey.
3. Every attribute in β−α is **contained in a candidate key**.

Let’s check:

1. A→B:
    - A is not a superkey.

**Now, is B contained in a candidate key?**

- Yes, because B is functionally dependent on C, the only candidate key (since $C\to A$ and $A \to B$).

- Satisfies the third condition of 3NF.

1. C→A:
    - C is a superkey.
    - Satisfies the second condition of 3NF.

Thus, R is in 3NF but not in BCNF.

---

#### Why is the Third Condition Useful?

Without the third condition of 3NF, R would have to be decomposed into BCNF, like this:

1. $R_1(A, B)$ with $A \to B$.
2. $R_2(C, A)$ with $C \to A$.

In this decomposition:

- The dependency A→B is preserved in $R_1$.
- The dependency C→A is preserved in $R_2$.

However, to answer queries about the original schema R, we’d need to join $R_1$ and $R_2$, which adds overhead. By allowing R to remain in 3NF, we avoid this unnecessary decomposition while still avoiding redundancy and anomalies.

### Higher Normal Forms

