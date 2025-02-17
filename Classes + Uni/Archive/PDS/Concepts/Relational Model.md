---
tags:
  - PDS
---
# Book

## Structure of Relational Database

### Introduction

A **relational database** consists of a collection of **tables**, each of which is assigned a  *unique name*.

![[Screenshot 2024-10-09 at 5.34.14 PM.jpg | 400]]

Note that each instructor is identified by the value of the *column ID*.

![[Screenshot 2024-10-09 at 5.36.28 PM.jpg | 450]]![[Screenshot 2024-10-09 at 5.37.04 PM.jpg | 200]]

Here, courses are identified by *course_id*, and the prereq table identifies the prereq by listing two variables that refer to course_id.

In general, a row in a table represents a relationship among a set of values.

Since a table is a collection of such relationships, there is a close correspondence between the concept of *table* and the mathematical concept of *relation*, from which the relational data model takes its name.

In mathematical terminology, a **tuple** is simply a sequence (or list) of values. 
A relationship between n values is represented mathematically by an **n-tuple of values**, that is, a tuple with n values, *which corresponds to a row in a table*.

Thus, in the relational model the term *relation* is used to refer to a *table*, while the term *tuple* is used to refer to a *row*. Similarly, the term *attribute* refers to a *column* of a table.

We use the term **relation instance** to refer to a specific *instance* of a *relation*, that  
is, containing a specific set of rows.

For each **attribute** of a relation, there is a set of permitted values, called the **domain**  
of that attribute.

We require that, for all relations r, the domains of all attributes of r be **atomic**. A domain is atomic if elements of the domain are considered to be *indivisible units*.

> For example, suppose the table instructor had an attribute phone number, which can store a set of phone numbers corresponding to the instructor. Then the domain of phone number would not be atomic, since an element of the domain is a set of phone numbers, and it has subparts, namely, the individual phone numbers in the set.

The **null value** is a special value that signifies that the value is unknown or does not exist.
## Database Schema

A **relation schema** consists of a list of attributes and their corresponding domains.

Consider the department relation:
![[Screenshot 2024-10-09 at 5.59.13 PM.jpg|300]]

The relation schema would be:
	*department (dept name, building, budget)*

As another example, each course in a university may be offered multiple times, across different semesters, or even within a semester. We need a relation to describe each individual offering, or section, of the class. The schema is:
	*section (course id, sec id, semester, year, building, room number, time slot id)*

And the relation instance:
![[Screenshot 2024-10-09 at 6.01.25 PM.jpg | 600]]

We then might need a relation to describe the association between instructors and the class sections that they teach. The relation schema to describe this association is:
	*teaches (ID, course id, sec id, semester, year)*

And here's an instance:
![[Screenshot 2024-10-09 at 6.05.22 PM.jpg | 400]]

## Keys

We must have a way to specify how tuples within a given relation are distinguished.
### Superkeys

That is, the values of the attribute values of a tuple must be such that they can *uniquely identify* the tuple. In other words, no two tuples in a relation are allowed to have exactly the same value for all attributes.

A **superkey** is a set of *one or more attributes* that, taken collectively, allow us to identify uniquely a tuple in the relation.

Formally, let $R$ denote the set of attributes in the schema of relation $r$. If we say that subset $K$ of $R$ is a superkey for $r$, we are restricting consideration to instances of relations $r$ in which no two distinct tuples have the same values on all attributes in $K$. That is, it $t_{1}$ and $t_{2}$ are in $r$ and $t_{1} \neq t_{2}$, then $t_{1}K \neq t_{2}K$

### Candidate Keys

A superkey may contain extraneous attributes. For example, the combination of ID and name is a superkey for the relation instructor. *If K is a superkey, then so is any superset of K.* We are often interested in superkeys for *which no proper subset is a superkey*. Such minimal superkeys are called **candidate keys**.

Suppose that a combination of name and dept name is sufficient to distinguish among members of the instructor relation. Then, both {ID} and {name, dept name} are candidate keys. 

> Although the attributes ID and name together can distinguish instructor tuples, their combination, {ID, name}, does not form a candidate key, since the attribute ID alone is a candidate key.
### Primary Keys

We shall use the term **primary key** to denote a *candidate key* that is *chosen* by the *database designer* as the principal means of identifying tuples within a relation.

The designation of a primary key represents a constraint in the real-world enterprise being modeled. Thus, primary keys are also referred to as *primary key constraints*.

Underline and list first primary keys:

classroom (building, room number, capacity)
time slot (time slot id, day, start time, end time) \[Here Id is a letter]

Here, the assumption is that neither attribute by itself can uniquely identify a classroom or timeslot. 

### Choosing Primary Keys

Primary keys must be chosen with care. 

The name of a person is insufficient, because there may be many people with the same name. 

In the United States, the social security number attribute of a person would be a candidate key. 

Since non-U.S. residents usually do not have social security numbers, international enterprises need to use a combination of other things.

Additionally, the primary key should be chosen such that its attribute values **are never, or are very rarely, changed**

> For instance, the address field of a person should not be part of the primary key, since it is likely to change. Social security numbers, on the other hand, are guaranteed never to change.

### Foreign Key & FK Constraints

Consider the attribute dept name of the instructor relation. It would not make sense for a tuple in instructor to have a value for dept name that does not correspond to a department in the department relation. 

Thus, in any database instance, given any tuple, say $t_{a}$, from the instructor relation, there must be some tuple, say $t_{b}$, in the department relation such that the value of the dept name attribute of $t_{a}$ is the same as the value of the primary key, dept name, of $t_{b}$.

A foreign-key constraint from attributes $A$ of relation $r_{1}$ to the primary-key $B$ of relation $r_{2}$ states that *for any database instance*, the value of $A$ for each tuple in $r_{1}$ must also be the value of B for some tuple in $r_{2}$. 

The attribute set **A** is called the **foreign key** from $r_{1}$ that references $r_{2}$.
- $r_{1}$ is the **referencing relation**
- $r_{2}$ is the **referenced relation**

> Note that in a foreign-key constraint, the referenced attribute(s) must be the primary key of the referenced relation.

### Referential Integrity Constraints

A **referential-integrity constraint**, relaxes the requirement that the referenced attributes form the primary key of the referenced relation.

It essentially requires that the values appearing in specified attributes of any tuple in the referencing relation also appear in specified attributes of at least one tuple in the referenced relation.

Database systems today typically support foreign-key constraints, but *they do not support referential integrity constraints* where the referenced attribute is not a primary key.

> As an example, consider the values in the time slot id attribute of the section relation. We require that these values must exist in the time slot id attribute of the time slot relation.
> 	*time slot(time slot id, day, start time, end time)*
> 	*section(course id, sec id, semester, year, building, room number, time slot id)*

## Schema Diagrams

A database schema, along with primary key and foreign-key constraints, can be depicted by **schema diagrams**.

In the schema diagram for our university organization, each relation appears as a box, with the relation name at the top in blue and the attributes listed inside the box.

- Primary-key attributes are shown **underlined**. 
- Foreign-key constraints appear as arrows ***from** the foreign-key attributes of the referencing relation* ***to** the primary key of the referenced relation*.
- A referential integrity constraint that is not a foreign-key constraint appears as a *two-headed arrow*, instead of a single-headed arrow.

![[Screenshot 2024-10-09 at 7.02.20 PM.jpg]]

## Relational Query Languages

A **query language** is a language in which a user requests information from the database.

Query languages can be categorized as imperative, functional, or declarative.

In an **imperative query language**, the user instructs the system to perform a specific sequence of operations on the database to compute the desired result; such languages usually have a notion of state variables, which are updated in the course of the computation.

In a **functional query language**, the computation is expressed as the evaluation of functions that may operate on data in the database or on the results of other functions; functions are side-effect free, and they do not update the program state.

In a **declarative query language**, the user describes the desired information without giving a specific sequence of steps or function calls for obtaining that information; the desired information is typically described using some form of mathematical logic. It is the job of the database system to figure out how to obtain the desired information.

There are a number of “pure” query languages. Like relational algebra and relational calculus.

Query languages used in practice, such as the SQL query language, include elements of the imperative, functional, and declarative approaches. 
# Lectures
- Relation schema — like a type definition
- Relation — like a variable
- Relation instance — like a particular “snapshot” of a variable, it’s value at some point in - time
- Database schema / database /database instance
![[Screenshot 2024-09-16 at 3.45.01 PM.jpg]]
## Attributes
- The set of allowed values for each attribute is called the domain of the attribute
- Attribute values are required to be atomic; that is, indivisible
- The special value null is a member of every domain. Indicated that the value is “unknown”
- The null value causes complications in the definition of many operations...
## Basics

| ID    | Name  | DOB     |
| ----- | ----- | ------- |
| 12345 | Sally | Date... |
| 12345 | Bob   | Date... |
This is a valid relation on the domain, but not legal on the schema
$\text{Domain}_{ID} \times \text{Domain}_{name} \times \text{Domain}_{DOB}$

Person:

| ID  | fName | lName | Dob |
| --- | ----- | ----- | --- |
| ... | ...   | ...   | ... |
Saw:

| ID  | Title | Year | Stars |
| --- | ----- | ---- | ----- |
| ... | ...   | ...  | ...   |
- **Referential integrity constraint**: Value in one relation must appear in another relation.
	- Referencing relation
	- Referenced relation
	- the referenced key is the primary key of the referenced relation. In this case it’s called a Foreign Key Constraint

For example, if we wanted to say that any value of Saw.ID has to be a value of Person.ID
Since Pk of person is ID, then this constraint has a **Foreign Key Constraint**

> Like saying that some non-existent person rated/saw some movie...

Person(ID pk, name, ...)
Saw(ID pk, title pk, year pk, numStars, ...)

Here we would represent as such:
![[PDS Schema Example 1]]
## ER Model -> Relational Model

![[PDS Schema Info]]
- 4:21 review the schema diagram for university DB conversion #Tasks 

Remember Optimization for timeslot table.