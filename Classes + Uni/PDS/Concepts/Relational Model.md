---
tags:
  - PDS
---
# The Relational Model
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