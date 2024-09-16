---
tags:
  - PDS
cssclasses:
  - academic-pdf-export
---
## Housekeeping


## Recap of Week 1

Review the notation for upper and lower bound notations for ER model diagrams.
Review partial vs total participation
You can use one of the two notations for the exams review both, choose one that is preferred.

## Week 2
Design issues:
- Entity set vs attribute:
	- Does it have further attributes
	- Will it be used in some other relationship set?
	> Suppose we have a person entity set and a phone set. 
	> Making it an attribute is fine if we only care about the phone number;
	> however, we will no longer just have phone as an attribute, if we need more info on the phone.
	> For example, if OS version, brand, etc... become relevant, 
	> then having a relationship set between the two would become a better choice.
- Relationship set vs attribute:
	- Does it pair (or n-tuple) elements from several entity sets? If so, we want it to be a relationship set.
	![[PDS Models Redundancy and Incompleteness]]
- Attributes of relationship sets:
	- Is it an attribute of one of the participating entity sets or the pairings between entities. 
## Design Process
![[PDS Design Process Example]]
## Primary Keys
Relationship set has a primary key composed of the union of the primary keys of the composing items.

## Ternary Entity Sets
Allows us to have "duplicates" by adding more nuance to what describes the relationship.
![[Screenshot 2024-09-16 at 2.52.31 PM.jpg]]
## Weak entity sets
Sometimes there isn't a suitable choice for primary key for an entity set without associating it with another entity set:

Some situations where this often happens:
- Want to represent an entity set and also partition it into subgroups
- Want to represent multiple copies or instances of entities
- Want to avoid coordination that might be needed to create unique ID
![[PDS Weak Entity Sets]]
Occasionally it is useful to associate a weak entity set with multiple strong entity sets or with another weak entity![[Screenshot 2024-09-16 at 3.15.31 PM.jpg]]
^ Update above with the notes from post class.
Book example:
![[PDS Full Example of ER Model From Book]]

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
