---
tags:
  - PDS
---
Track:
- donations
- orders
- deliveries
- clients
- donors
- volunteers

Clients are: refugees and asylum seekers who have found housing, but need housewares and furniture.

Donors donate used housewares (dishes, cookware, small appliances, decorative items, etc), used furniture, or money to buy new items.

Clients use a portal similar to an online shopping service to create orders indicating which of the available items they need/want.

After a client has ordered, volunteers collect and label the physical goods and (maybe a few days later) other volunteers and/or staff members deliver the order to the client’s new home.

The WelcomeHome database will store data about People (staff, volunteers, clients, donors), Items in the inventory, storage locations within the warehouse, and Orders that are in progress. Details follow.

Entity: 
**Person**
- username
- name (first name, middle name, last name)
- {phone numbers}
- primary language
- {additional languages}
- password
- role (enum: volunteer, client, donor, staff)

**item**
- itemID
- decription
- photo
- colors
- material
- new or used
- other notes
- requires assembly?

**Categories**
EJ: cookware 

**Sub Categories**
EJ: frying pan

Some items have multiple **pieces**, which may end up stored separately, so we want to also track:
**Pieces**
(For example, if we had a dining room set consisting of a table and four chairs, we would have five pieces of this item.)
Piece
	piecenum unique for its item but different items can have the same piece num
	description
	quantity
	length
	width
	height

Storage facility **Location**

**Stored**

 The storage facility has many rooms, each with many shelves and/or areas of the floor.

 A Location is identified by a unique pair consisting of a room number and a shelf number. 
 There may also be a shelf description.

**Order**
includes items 
orderid
start date
delivery date
note
*each item can be in at most one order*

On a separate page, indicate any assumptions you are making about any ambiguous requirements. Also indicate briefly what each (strong or weak) entity set and each relationship set in your design corresponds to from the textual description, above.

There are also various relations between Persons, Orders, Items, etc. We’d like to track which donor donated which Item, which client made each order, which volunteers or staff delivered each order, and which individual staff member supervised each order. At this point, you are not required to consider the different roles of people and who does what (i.e. staff supervises, donor donates); Later, we may require that the application code enforces such constraints.

Notes:

Location: I think that Locations require a facility realtion in case we have multiple storage locations. That's why I added a storage facility entity set and related it

Stored: I am making the assumption that a storage location can have multiple items without a limit (like the 4 legs of a chair stored on the same location, or maybe 4 legs of one chair and 4 of another)

Specialization/Generalization: Even though it was not required, I applied specialization to the person superclass, and also attempted to look at how the different specializations interact with the areas.

Delivered: I think that multiple people can deliver an order; to illustrate this constraint I created a delivery team that is composed of at least 1 member from volunteer and staff and then this team delivers orders. Teams can be re-used and service multiple orders; however, an order can only be serviced by one team

Supervises: I think that an order must have a supervisor and also at most one supervisor. However, a staff member can supervise many orders