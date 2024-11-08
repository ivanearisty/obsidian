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

ItemCategory(**itemID**, **mainCategory**, **subCategory**)
	ItemCategory(mainCategory) references Category(mainCategory)
	ItemCategory(subCategory) references Category(subCategory)
	ItemCategory(itemID) references Item(itemID)

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

![[Screenshot 2024-11-08 at 4.54.11 PM.jpg]]
![[Screenshot 2024-11-08 at 4.54.48 PM.jpg]]
![[Screenshot 2024-11-08 at 4.56.03 PM.jpg]]
![[Screenshot 2024-11-08 at 5.00.22 PM.jpg]]
![[Screenshot 2024-11-08 at 5.08.32 PM.jpg]]
![[Screenshot 2024-11-08 at 5.10.33 PM.jpg]]
```sql
insert ignore into Category values ('furniture', 'sofa', 'Sofas for Living ROoms');
insert ignore into Item values (1, 'Two-piece yellow sofa', null, 'yellow', true, false, 'fabric');
insert ignore into ItemCategory values ('furniture', 'sofa', 1);
insert ignore into Piece values (1, 1, 'sofa body', 110.0, 35.0, 30.0, 5, NULL, 'Stored in Room 5 without a designated shelf');
insert ignore into Piece values (2, 1, 'cushion', 33.00, 15.0, 5.0, 5, NULL, 'Stored in Room 5 without a designated shelf');
insert ignore into Person values ('iae225', '12345', 'ivan', 'aristy', 'iae225@stern.nyu.edu');
insert ignore into DonatedBy values ('iae225', 1, current_date);
```
### Question B

Produce a list of all of the (pieces) of items in order #12345, along with their locations. This should have information that volunteers will find useful for locating the item when they’re assembling the order, including the item IDs, their categories and subcategories, and the room and shelf where each piece is located. Optionally, you may include the description and other data.

```sql
select 
    Piece.pieceNum as pieceNumber,
    Item.itemID as itemID,
    Item.itemDescription as itemDescription,
    Category.mainCategory as mainCategory,
    Category.subCategory as subCategory,
    Location.roomNumber as roomNumber,
    Location.shelfNumber as shelfNumber,
    Location.shelfDescription as shelfDescription,
    Piece.storageNotes as storageNotes,
    Piece.pDescription as pieceDescription,
    Piece.plength as length,
    Piece.pwidth as width,
    Piece.pheight as height
from 
    Orders
join 
    ItemIn on Orders.orderID = ItemIn.orderID
join 
    Item on ItemIn.orderItem = Item.itemID
join 
    Piece on Item.itemID = Piece.itemID
join 
    ItemCategory on Item.itemID = ItemCategory.itemID
join 
    category on itemcategory.mainCategory = category.mainCategory and itemcategory.subCategory = category.subCategory
left join 
    location on piece.roomNumber = location.roomNumber and piece.shelfNumber = location.shelfNumber
where 
    orders.orderID = 12345
order by 
    item.itemID, piece.pieceNum;

```