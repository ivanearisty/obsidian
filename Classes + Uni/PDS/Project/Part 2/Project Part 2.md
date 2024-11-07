---
tags:
  - PDS
---
# iae225

## Part A
Following the procedure we studied, convert the ER diagram to a relational database schema diagram. Remember to include all PRIMARY KEY and FOREIGN KEY constraints that follow from the conversion rules of ER to schema.

Assume bold means pk
### Reasoning

Realization 1:
After making item and category, do we need to include itemcategory?

Well from the book: "in a many to one relationship set AB, from entity set A to entity set B, if the participation of A is total, then we can combine A and AB to form a signle schema consisting ot he union of the attributes of both schemas"

Here we have total participation from item to category, hence, we can combine itemcategory and item.
### Answer
Category(**mainCategory**, **subCategory**, notes)

Item(**ItemID**,iDescription, photo, color, isNew?, hasPieces?, material, mainCategory, subCategory)
	mainCategory()

### Office hours questions:
All of the following are doubts I would like to confirm:
1. Even though it says "diagram" we can write out the relational model.
2. Verify Assertion: Since the itemCategory relationship is many to one from Item to Category, and Item has total participation in the relationship, we can coalesce the relationship set into Item, and make item:
	```
	Item(**ItemID**,iDescription, photo, color, isNew?, hasPieces?, material, mainCategory, subCategory)
		Item(mainCategory) references Category(mainCategory)
		Item(subCategory) references Category(subCategory)
	```
	This same thing can be done with the relationship sets "for" and "supervised".
	