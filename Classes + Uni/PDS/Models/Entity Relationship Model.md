---
tags:
  - PDS
cssclasses:
  - academic-pdf-export
---
## Book

### The ER Model
#### Entities and Entity Sets

An **entity** is a “*thing*” or “*object*” in the real world that is distinguishable from all other  
objects.

An **entity set** is a set of entities of the same type that share the same properties,  
or attributes.

An *entity* is represented by a *set of attributes*. **Attributes** are descriptive properties  
possessed by each member of an entity set.

> Possible attributes of the instructor entity set are ID, name, dept name, and salary.

A database thus includes a *collection of entity sets*, each of which contains any  
number of entities of the same type.

An entity set is represented in an ER diagram by a rectangle, which is divided  
into two parts:
1. Title
2. Attributes (Attributes that are part of the *primary key are underlined*)

![[Screenshot 2024-09-27 at 11.28.23 PM.jpg|350]]

#### Relationship Sets

A **relationship** is an association among several entities.

A **relationship set** is a set of relationships of the same type.

Consider two entity sets instructor and student. We define the relationship set advisor to denote the associations between students and the instructors who act as their advisors.

A **relationship instance** *in an E-R schema* represents an association between the named entities in the real-world enterprise that is being modeled. As an illustration, the individual instructor entity Katz, who has instructor ID 45565, and the student entity Shankar, who has student ID 12345, participate in a relationship instance of advisor. 
![[Screenshot 2024-09-27 at 11.32.22 PM.jpg | 300]]

A **relationship set** is represented in an ER diagram by a *diamond*, which is *linked*  
via lines to a number of different entity sets. 

| This ER diagram shows two entity sets, instructor and student, related through a binary relationship set advisor: | ![[Screenshot 2024-09-27 at 11.36.53 PM.jpg \| 400]] |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |





## Lectures

Review the notation for upper and lower bound notations for ER model diagrams.
Review partial vs total participation
You can use one of the two notations for the exams review both, choose one that is preferred.


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

> For every weak entity set, you need a strong entity set to identify it.

Some situations where this often happens:
- Want to represent an entity set and also partition it into subgroups
- Want to represent multiple copies or instances of entities
- Want to avoid coordination that might be needed to create unique ID
![[PDS Weak Entity Sets]]
Occasionally it is useful to associate a weak entity set with multiple strong entity sets or with another weak entity![[Screenshot 2024-09-16 at 3.15.31 PM.jpg]]
^ Update above with the notes from post class.
Book example:
![[PDS Full Example of ER Model From Book]]

