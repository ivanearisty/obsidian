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

A relationship set may denote the association of *more than two* entity sets

The association between entity sets is referred to as participation; i.e., the entity sets $E_{1}, E_{2}, ... , E_{n}$ participate in relationship set $R$

> It is possible to have more than one relationship set involving the same entity sets

The *function that an entity plays* in a relationship is called that entity’s **role**.

In a recursive relationship set, explicit role names are necessary to specify how an entity participates in a relationship instance: 
![[Screenshot 2024-09-28 at 12.08.03 AM.jpg | 300]]

A relationship may also have attributes called **descriptive attributes**. An attribute of a relationship set is represented in an E-R diagram by an **undivided rectangle**.
![[Screenshot 2024-09-28 at 12.10.02 AM.jpg | 400]]

The number of entity sets that participate in a relationship set is the **degree of the** **relationship set**. A **binary relationship set** is of degree 2; a **ternary relationship set** is of degree 3.
#### Complex Attributes

For each attribute, there is a set of *permitted values*, called the **domain**, or value set, of  
that attribute.

![[Screenshot 2024-09-28 at 12.51.43 AM.jpg | 500]]

- **Single vs Composite** attributes. Composites can be divided into subparts (i.e., other attributes). For example, an attribute name could be structured as a composite attribute consisting of first name, middle initial, and last name.
- **Single-valued and multivalued** attributes. There may be instances where an attribute has a set of values for a specific entity, like owning multiple phone numbers, making it multivalued.
- **Derived attributes**. The value for this type of attribute can be derived from the values of other related attributes or entities. Like a count of phone numbers owned.

An attribute takes a **null value** when an entity does not have a value for it.

| Entity Set                                          | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![[Screenshot 2024-09-28 at 1.30.24 AM.jpg \| 200]] | *Composite attribute* **name** with component attributes *first name, middle initial, and last name* replaces the simple attribute name of instructor. <br><br>Address can be defined as the **composite attribute address** with the attributes *street, city, state, and postal code*. The attribute **street** is itself a composite attribute whose component attributes are *street number, street name, and apartment number*. <br><br>The figure also illustrates a *multivalued attribute* phone number, denoted by “**{phone number}**”<br><br>**Derived attribute age** depicted by “ age ( )” from *date of birth* |
#### Mapping Cardinalities

**Mapping cardinalities**, or cardinality ratios, express the *number of entities to which*  
*another entity can be associated via a relationship set*. 

Mapping cardinalities are most useful in describing binary relationship sets, although they can contribute to the description of relationship sets that involve more than two entity sets.

- **One-to-one**: An entity in A is associated with at most one entity in B, and an entity in B is associated with at most one entity in A
- **One-to-many**: An entity in A is associated with any number (zero or more) of entities in B. An entity in B, however, can be associated with at most one entity in A
- **Many-to-one**: An entity in A is associated with at most one entity in B. An entity in B, however, can be associated with any number (zero or more) of entities in A.
- **Many-to-many**: An entity in A is associated with any number (zero or more) of entities in B, and an entity in B is associated with any number (zero or more) of entities in A.

![[Screenshot 2024-09-28 at 2.04.34 AM.jpg | 400]]

The participation of an entity set E in a relationship set R is said to be **total** if *every entity in E must participate in at least one relationship in R*. If it is possible that *some entities in E do not participate in relationships in R*, the participation of entity set E in relationship R is said to be **partial**.

We indicate **total participation** of an entity in a relationship set **using double lines.**

>![[Screenshot 2024-09-28 at 2.11.19 AM.jpg | 500]]
>Example of the advisor relationship set where the double line indicates that a student must have an advisor.

ER diagrams also provide a way to indicate more complex constraints on the number of times each entity participates in relationships in a relationship set. A line may have an associated minimum and maximum cardinality, shown in the form l..h, where l is the minimum and h the maximum cardinality. A minimum value of 1 indicates total participation of the entity set in the relationship set; that is, each entity in the entity set occurs in at least one relationship in that relationship set. A maximum value of 1 indicates that the entity participates in at most one relationship, while a maximum value ∗ indicates no limit. 

![[Screenshot 2024-09-28 at 3.34.41 AM.jpg|500]]
The line between advisor and student has a cardinality constraint of 1..1, meaning the minimum and the maximum cardinality are both 1. That is, each student must have exactly one advisor. The limit 0..∗ on the line between advisor and instructor indicates that an instructor can have zero or more students. Thus, the relationship advisor is one-to-many from instructor to student, and further the participation of student in advisor is total, implying that a student must have an advisor.
#### Primary Key

The choice of the primary key for a binary relationship set depends on the mapping cardinality of the relationship set.

- **many-to-many**: the preceding union of the primary keys is a minimal superkey and is chosen as the primary key.
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

