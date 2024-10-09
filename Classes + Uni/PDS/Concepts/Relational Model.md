---
tags:
  - PDS
---
# Book

## Structure of Relational Database

### Introduction

A **relational database** consists of a collection of **tables**, each of which is assigned a  
*unique name*.

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

A relation schema consists of a list of attributes and their corresponding domains
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