---
tags:
  - PDS
---
# Diagram

![[Project 1 — ER Diagram.svg]]
# Assumptions

Location: I think that Locations require a specific facility in case we have multiple storage locations in different geographical locations. That's why I added a storage facility entity set and related it.

Stored: I am making the assumption that a storage location can have multiple items without a limit (like the 4 legs of a chair stored on the same location, or maybe 4 legs of one chair and 4 of another)

Specialization/Generalization: Even though it was not required, I applied specialization to the person superclass, and also attempted to look at how the different specializations interact with the areas.

Delivers: I think that multiple people can deliver an order, but that person can be either a staff member, a volunteer, or both. To illustrate this constraint we create a generalized entity and allow multiple workers to be on the same order. (A big couch must be delivered by multiple people)

Supervises: I think that an order must have a supervisor and also at most one supervisor. However, a staff member can supervise many orders

# Entity and Relations

Person and Specializations:
There are various kinds of people with various roles (e.g. staff, volunteer, client, donor). Each Person has a unique username.

Donates, Orders, Delivers, Supervises:
There are also various relations between Persons, Orders, Items, etc. We’d like to track which donor donated which Item, which client made each order, which volunteers or staff delivered each order, and which individual staff member supervised each order.

Item, Category, and Subcategory (attribute):
Each donated or purchased Item has a unique itemID, a description, a photo, colors, material, an indication of whether it is new or used, and other notes about the item. Items are associated with a predetermined set of Categories, along with sub-categories (e.g. category: cookware; subcategory: frying pan). We’d also like to indicate whether or not an item requires assembly

Piece:
Some items have multiple pieces, which may end up stored separately, so we want to also track Pieces. (For example, if we had a dining room set consisting of a table and four chairs, we would have five pieces of this item.) Each Piece has a pieceNum which is unique for its item, but different items could have the same pieceNum. Each piece may have a description, a quantity, a length, a width, and a height.

Location and Storage Facility:
The storage facility has numerous Locations where (pieces of) items are Stored. The storage facility has many rooms, each with many shelves and/or areas of the floor. A Location is identified by a unique pair consisting of a room number and a shelf number. There may also be a shelf description.

Order:
Each Order will have a unique order ID, a start date, a delivery date, and notes. Each Item can be in at most one order.
+Donates, Orders, Delivers, Supervises:
There are also various relations between Persons, Orders, Items, etc. We’d like to track which donor donated which Item, which client made each order, which volunteers or staff delivered each order, and which individual staff member supervised each order.

