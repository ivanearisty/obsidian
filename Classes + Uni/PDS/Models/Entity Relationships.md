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
	> 
- Attributes of relationship sets:
	- Is it an attribute of one of the participating entity sets or the pairings between entities. 