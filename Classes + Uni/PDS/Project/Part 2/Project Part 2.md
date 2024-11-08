---
tags:
  - PDS
---
# iae225

## Part A
Following the procedure we studied, convert the ER diagram to a relational database schema diagram. Remember to include all PRIMARY KEY and FOREIGN KEY constraints that follow from the conversion rules of ER to schema.

Assume bold means pk
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

## Part B


## Part C

### Question A

Record a new item that has been donated. It’s a two-piece yellow sofa (category ‘furniture’, subcategory ‘sofa’), donated by someone from your group. Their username should be their name as a single string, optionally with some numbers at the end. You may assign any itemID you’d like (or may look up how to use AutoIncrement). The pieces are the ‘sofa body’ and one ‘cushion’. It will be stored in Room 5, without a shelf designated.

### Question B

Produce a list of all of the (pieces) of items in order # 12345, along with their locations. This should have information that volunteers will find useful for locating the item when they’re assembling the order, including the item IDs, their categories and subcategories, and the room and shelf where each piece is located. Optionally, you may include the description and other data.