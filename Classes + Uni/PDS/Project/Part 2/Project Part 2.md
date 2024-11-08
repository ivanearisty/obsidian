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

Well from the book: "in a many to one relationship set AB, from entity set A to entity set B, if the participation of A is total, then we can combine A and AB to form a signle schema consisting o the union of the attributes of both schemas"

Here we have total participation from item to category, hence, we can combine itemcategory and item.

Error Code: 6125. Failed to add the foreign key constraint. Missing unique key for constraint 'fkp2l' in the referenced table 'Location'

### Answer
Category(**mainCategory**, **subCategory**, notes)

Item(**ItemID**,iDescription, photo, color, isNew?, hasPieces?, material, mainCategory, subCategory)
	Item(mainCategory) references Category(mainCategory)
	Item(subCategory) references Category(subCategory)

Location(**roomNumber**, **shelfNumber**, shelfDescription)

Piece(**pieceNum**, **itemID**, pDescription, length, width, height, roomNumber, shelfNumber, storageNotes)
	Piece(itemID) references Item(itemID)
	Piece(roomNum) references Location(roomNumber)
	Piece(shelfNumber) references Location(shelfNumber)

Person(**userName**, password, fname, lname, email)

PersonPhones(**userName**,**phoneNumber**)
	PersonPhones(username) references Person(username)

DonatedBy(**donator**,**donation**, donationDate)
	DonatedBy(donator) references Person(userName)
	DonatedBy(donation) references Item(itemID)

Role(**roleID**, roleDescription)

Act(**userName**,**roleID**)
	Act(userName) references Person(userName)
	Act(roleID) references Role(roleID)

Order(**orderID**, orderDate, orderNotes, supervisor, recipient)
	Order(supervisor) references Person(userName)
	Order(recipient) references Person(userName)

Delivered(**deliveredBy**, **deliveredOrder**, orderStatus, orderDate)
	Delivered(deliveredBy) references Person(userName)
	Delivered(deliveredOrder) references Order(orderID)

ItemIn(**orderItem**, **orderID**, found)
	ItemIn(orderItem) references Item(itemID)
	ItemIn(orderID) references Order(orderID)
### Office hours questions:
All of the following are doubts I would like to confirm:
1. Even though it says "diagram" we can write out the relational model.
2. Verify Assertion: Since the itemCategory relationship is many to one from Item to Category, and Item has total participation in the relationship, we can coalesce the relationship set into Item, and make item:
	```
	Item(**ItemID**,iDescription, photo, color, isNew?, hasPieces?, material, mainCategory, subCategory)
		Item(mainCategory) references Category(mainCategory)
		Item(subCategory) references Category(subCategory)
	```
	This same thing can be done with the relationship sets "for", and "supervised" 
3. "Notes" from PieceIn be moved into Piece due to total participation.
4. How does the roleID table work if we have role in person? Shouldn't role be implied by the act relationship?
5. Do we need to enforce integrity constraints in this database? We mention fk and pk constraints, but do we need to enforce that every order must have an item in our dbms for example?
6. To my knowledge, there is no way to optimize ItemIn. It has total participation but not the correct way to do so.

Thanks for the help, Kaiwen, I really appreciate it. Some final questions, sorry to bother again:

1:
Regarding combining schemas on point 2. I didn't quite understand what you meant by a "merged one." What I am assuming is from 6.7.6 Combination of Schemas in the book, where, in essence they say something like: 

In a many to one relationship set AB, from entity set A to entity set B, if the participation of A is total, then we can combine A and AB to form a single schema consisting of the union of the attributes of both schemas

So, for example, the relationship sets "For", "Supervised", and "ItemCategory" would be skipped due to redundancy. 

For "For" and "Supervised" they would get implemented as elements of Order:
```
Order(**orderID**, orderDate, orderNotes, supervisor, recipient)
	Order(supervisor) references Person(userName)
	Order(recipient) references Person(userName)
```

And for "ItemCategory" we'd have:

```
Item(**ItemID**,iDescription, photo, color, isNew?, hasPieces?, material, mainCategory, subCategory)
	Item(mainCategory) references Category(mainCategory)
	Item(subCategory) references Category(subCategory)
```

I'm trying to understand whether actually doing this is a valid approach to the problem.

2: I kind of alluded to this previously, but, just to make sure, "on update" or "on delete" are also not necessary, correct?

