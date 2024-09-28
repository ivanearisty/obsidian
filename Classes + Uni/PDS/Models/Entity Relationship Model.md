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

$Superkey = primarykey(E_{1}) ∪ primarykey(E_{2}) ∪ ⋯∪ primarykey(E_{n})$

**Minimal superkeys** take a subset of the above.

- **many-to-many**: the union of the primary keys is a minimal superkey and is chosen as the primary key.
- **one-to-many and many-to-one**: the primary key of the “many” side is a minimal superkey and is used as the primary key
- **one-to-one**: the primary key of either one of the participating entity sets forms a minimal superkey, and either one can be chosen as the primary key of the relationship set.
##### Non-Binary Issues

For nonbinary relationships, **if** no cardinality constraints are present, **then** the superkey formed as described earlier in this section is the only candidate key, and it is chosen as the primary key.

This is because an E-R diagram with two or more arrows out of a nonbinary relationship set can be interpreted in the two ways:

Suppose there is a relationship set R between entity sets E1, E2, E3, E4, and the only arrows are on the edges to entity sets E3 and E4. Then, the two possible interpretations are:  
1. A particular combination of entities from *E1, E2* can be associated with at most one combination of entities from *E3, E4*. Thus, the primary key for the relationship R can be constructed by the union of the primary keys of E1 and E2.  
2. A particular combination of entities from *E1, E2, E3* can be associated with at most one combination of entities from E4, and further a particular combination of entities from E1, E2, E4 can be associated with at most one combination of entities from E3, Then the union of the primary keys of *E1, E2, and E3* forms a candidate key, as does the union of the primary keys of *E1, E2, and E4*.

To avoid confusion, **we permit only one arrow out of a nonbinary relationship set**, in which case the two interpretations are equivalent.

In order to represent a situation where one of the multiple-arrow situations holds, the E-R design can be modified by replacing the non-binary relationship set with an entity set.

#### Weak Entity Sets

A **weak entity set** is one whose existence is *dependent* on another *entity set*, called its **identifying entity set**.

Instead of associating a primary key with a weak entity, we use the primary key of the identifying entity, along with extra attributes, called **discriminator attributes** to uniquely identify a weak entity.

Every weak entity **must be associated** with an identifying entity; that is, the weak entity set is said to be **existence dependent** on the identifying entity set.

The identifying relationship set *should not have any descriptive attributes*, since any  
such attributes can instead be associated with the weak entity set.

A weak entity set is depicted via a **double rectangle** with the *discriminator being underlined with a dashed line.*

![[Screenshot 2024-09-28 at 1.26.41 PM.jpg|500]]
The weak entity set section depends on the strong entity set course via the relationship set sec course.

A weak entity set must have a total participation in its identifying relationship set.

It is also possible to have a weak entity set with more than one identifying entity set. A particular weak entity would then be *identified by a combination of entities, one from each identifying entity set*.

#### Removing Redundant Attributes in Entity Sets

##### Example 1

*Identifying Entities*
When we design a database using the E-R model, we usually start by identifying those entity sets that should be included. For example, in the university organization we have discussed thus far, we decided to include such entity sets as *student and instructor*. 

*Identifying Attributes*
Once the entity sets are decided upon, we must choose the appropriate attributes. These attributes are supposed to represent the various values we want to capture in the database. In the university organization, we decided that for the instructor entity set, we will include the attributes *ID, name, dept. name, and salary*. 

*Forming relationship sets*
Once the entities and their corresponding attributes are chosen, the relationship sets among the various entities are formed. These relationship sets may result in a situation where attributes in the various entity sets are redundant and need to be removed from the original entity sets. To illustrate, consider the entity sets instructor and department:  
• The entity set instructor includes the attributes ID, name, dept name, and salary,  
with **ID** forming the primary key.  
• The entity set department includes the attributes dept name, building, and budget,  
with **dept name** forming the primary key.

We model the fact that each instructor has an associated department using a relationship set inst_dept relating instructor and department.  

The attribute **dept name** appears in both entity sets. *Since it is the primary key for the entity set department, it is redundant in the entity set instructor and needs to be removed.*

Treating the connection between instructors and departments uniformly as a relationship, rather than as an attribute of instructor, makes the logical relationship explicit, and it helps avoid a premature assumption that each instructor is associated with only one department.

Similarly, the student entity set is related to the department entity set through the relationship set student dept and thus there is no need for a dept name attribute in student.

##### Example 2 

Consider course offerings (**sections**) along with the time slots of the offerings. Each time slot is identified by a time slot id, and has associated with it a set of weekly meetings, each identified by a day of the week, start time, and end time.

- The entity set **section** includes the attributes course id, sec id, semester, year, building, room number, and time slot id, with ( course id, sec id, year, semester) forming the primary key.  
- The entity set time slot includes the attributes time slot id, which is the primary key, and a multivalued composite attribute {(day, start time, end time)}.

These entities are related through the *relationship set sec_time_slot*. The attribute time slot id appears in both entity sets. Since it is the primary key for the entity set time slot, it is redundant in the entity set section and needs to be removed. 

##### Example 3

Suppose we have an entity set **classroom**, with attributes building, room number, and capacity, with building and room number forming the primary key.  

Suppose also that we have a relationship set **sec_class** that relates section to classroom.  

Then the attributes {building, room number} are redundant in the entity set section.  

##### Synopsis

A good entity-relationship design does not contain redundant attributes. 

You need to verify that none of the entity sets has any attribute that is made redundant by one of the relationship sets.

![[Screenshot 2024-09-28 at 2.03.55 PM.jpg|500]]
![[Pasted image 20240928140552.png | 400]]

#### Reducing E-R to Relationship Schemas

Both the E-R model and the relational database model are abstract, logical representations of real-world enterprises.

##### Strong Entity Sets

Let *E be a strong entity set* with only simple descriptive attributes a1, a2, ... , an. We represent this entity with a schema called E with n distinct attributes. Each tuple in a relation on this schema corresponds to one entity of the entity set E.  

For schemas derived from strong entity sets, the primary key of the entity set serves as the primary key of the resulting schema. This follows directly from the fact that each tuple corresponds to a specific entity in the entity set.  

As an illustration, consider the entity set student of the E-R diagram. 

This entity set has three attributes: ID, name, tot_cred. We represent this entity set by a schema called student with three attributes: **student** *(_ID_, name, tot_cred)*
![[Screenshot 2024-09-28 at 2.12.42 PM.jpg | 300]]

When a strong entity set has *non-simple attributes*, things are a bit more complex. We handle composite attributes by creating a *separate attribute for each of the component* *attributes*; we do not create a separate attribute for the composite attribute itself.

![[Screenshot 2024-09-28 at 2.15.08 PM.jpg| 400]]
- For the composite attribute name, the schema generated for instructor contains the attributes that composed it.
\
For a **multivalued attribute M** , we create a relation schema R with an attribute A that corresponds to M and attributes corresponding to the primary key of the entity set or relationship set of which M is an attribute.

Relation Schema: ![[Screenshot 2024-09-28 at 2.17.26 PM.jpg | 300]]

In the case that an entity set consists of only two attributes—a single primary-key attribute B and a single multivalued attribute M—the relation schema for the entity set would contain only one attribute, namely, the primary-key attribute B. --> We can drop this relation, while retaining the relation schema with the attribute B and attribute A that corresponds to M .

Consider the entity set time slot depicted in the ER. Here, time slot id is the primary key of the time slot entity set, and there is a single multivalued attribute that happens also to be composite. The entity set can be represented by just the following schema created from the multivalued composite attribute:

#### Extended Features

The process of designating subgroupings within an entity set is called **specialization**.

The way we depict specialization in an E-R diagram depends on whether an entity may belong to multiple specialized entity sets or if it must belong to at most one specialized entity set. 

The former case (multiple sets permitted) is called **overlapping specialization**, while the latter case (at most one permitted) is called **disjoint specialization**. 

**Overlapping specialization** (as is the case for student and employee as specializations of person), two separate arrows are used. 

For a **disjoint specialization** (as is the case for instructor and secretary as specializations of employee), a single arrow is used. 

The specialization relationship may also be referred to as a superclass-subclass relationship.

![[Screenshot 2024-09-28 at 2.53.25 PM.jpg]]

The refinement from an initial entity set into successive levels of entity subgroupings represents a top-down design process in which distinctions are made explicit. The design process may also proceed in a bottom-up manner, in which multiple entity sets are synthesized into a higher-level entity set on the basis of common features, this is called **generalization**.

To create a **generalization**, the attributes must be given a common name and represented with the higher-level entity.

A crucial property of the higher and lower level entities created by specialization and  
generalization is attribute **inheritance**. The attributes of the higher-level entity sets are  
said to be inherited by the lower-level entity sets.

**Completeness constraint**, specify whether or not an entity in the higher-level entity set must belong to at least one of the lower-level entity sets within the generalization/specialization.

- In **Total specialization** or generalization. Each higher-level entity must belong to a lower-level entity set.  
- In **Partial specialization** or generalization. Some higher-level entities may not belong to any lower-level entity set.

One limitation of the E-R model is that it cannot express relationships among relation-  
ships.

The best way to model a situation such as the one just described is to use **aggregation**. Aggregation is an abstraction through which relationships are treated as higherlevel entities.
![[Screenshot 2024-09-28 at 3.02.04 PM.jpg | 300]] ---> ![[Screenshot 2024-09-28 at 3.02.21 PM.jpg | 300]]

#### Common Issues

![[Screenshot 2024-09-28 at 3.06.57 PM.jpg | 400]]
![[Screenshot 2024-09-28 at 3.07.27 PM.jpg | 500]]
##### Primary Key as an Attribute of Another Entity
A common mistake when creating E-R models is the use of the primary key of an entity set as an attribute of another entity set, instead of using a relationship.

For example, in our university E-R model, it is incorrect to have dept name as an attribute of student even though it is present as an attribute in the relation schema for student. (a)

The relationship stud dept is the correct way to represent this information in the E-R model, since it makes the relationship between student and department explicit, rather than implicit via an attribute.

##### Primary Key Attributes in Relationship Sets

Another related mistake that people sometimes make is to designate the primary key attributes of the related entity sets as attributes of the relationship set. 

For example, ID (the primary-key attributes of student) and ID (the primary key of instructor) should not appear as attributes of the relationship advisor. This should not be done since the primary-key attributes are already implicit in the relationship set.

##### Forgetting Multivalued Attributes

A third common mistake is to use a relationship with a single-valued attribute in a situation that requires a multivalued attribute. 

For example, suppose we decided to represent the marks that a student gets in different assignments of a course offering (section). 

A wrong way of doing this would be to add two attributes assignment and marks to the relationship takes (B). 

The problem with this design is that we can only represent a single assignment for a given student-section pair, since relationship instances must be uniquely identified by the participating entities, student and section.

##### Making Attributes into Entity Sets

![[Screenshot 2024-09-28 at 3.26.42 PM.jpg | 500]]

Treating a phone as an attribute phone number implies that instructors have precisely one phone number each. Treating a phone as an entity phone permits instructors to have several phone numbers (including zero) associated with them. However, we could instead easily define phone number as a multivalued attribute to allow multiple phones per instructor.  

The main difference then is that treating a phone as an entity *better models a situation where one may want to keep extra information about a phone*, such as its location, or its type (mobile, IP phone, or plain old phone), or all who share the phone. Thus, treating phone as an entity is more general than treating it as an attribute and is appropriate when the generality may be useful.  

In contrast, it would not be appropriate to treat the attribute name (of an instructor) as an entity; it is difficult to argue that name is an entity in its own right (in contrast to the phone). Thus, it is appropriate to have name as an attribute of the instructor entity set.

##### Use of Entity Sets versus Relationship Sets

It is not always clear whether an object is best expressed by an entity set or a relationship  
set.

Re-consider: ![[Screenshot 2024-09-28 at 2.03.55 PM.jpg|500]]

Here we modelled the takes relationship set to model the situation where student takes a (section of a) course.

An alternative is to imagine that there is a course registration record for each course that each student takes.

Then, we have an entity set to represent the course-registration record. Let us call that entity set registration. Each registration entity is related to exactly one student and to exactly one section, so we have *two relationship sets*, one to relate course-registration records to students and one to relate course-registration records to sections.

![[Screenshot 2024-09-28 at 3.30.08 PM.jpg | 500]]
Note that we use double lines to indicate total participation by registration entities.

Both the approach of Figure 6.15 and that of Figure 6.24 accurately represent the university’s information, but the use of takes is more compact and probably preferable. However, if the registrar’s office associates other information with a course-registration record, it might be best to make it an entity in its own right.

> One possible guideline in determining whether to use an entity set or a relationship set is to designate a relationship set to describe an action that occurs between entities. This approach can also be useful in deciding whether certain attributes may be more appropriately expressed as relationships.

Hence, it is advisable to use an entity set vs a relationship set if we might want to keep more information on the registration.

##### Binary vs N-ary Relationship Sets

Relationships in databases are often binary.

It is always possible to replace a nonbinary (n-ary, for n >2) relationship set by a number of distinct binary relationship sets.

Conceptually, we can restrict the E-R model to include only binary relationship sets. However, this restriction is not always desirable:

![[Screenshot 2024-09-28 at 3.35.52 PM.jpg | 500]]

Consider: 
- An identifying attribute may have to be created for the entity set created to represent the relationship set. This attribute, along with the extra relationship sets required, increases the complexity of the design and overall storage requirements.  
- An n-ary relationship set shows more clearly that several entities participate in a single relationship.  
- There may not be a way to translate constraints on the ternary relationship into constraints on the binary relationships. For example, consider a constraint that says that R is many-to-one from A, B to C; that is, each pair of entities from A and B is associated with at most one C entity. This constraint cannot be expressed by using cardinality constraints on the relationship sets RA, RB, and R

#### Notation

![[Screenshot 2024-09-28 at 3.37.50 PM.jpg | 600]]

Alternative Notations:
![[Screenshot 2024-09-28 at 3.38.11 PM.jpg | 500]]

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

