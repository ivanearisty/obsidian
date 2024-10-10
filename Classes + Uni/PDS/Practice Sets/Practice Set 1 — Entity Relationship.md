---
tags:
  - PDS
---

**Practice Set 1**

Problem 1

Suppose you are designing a database for an airline. The airline managers want you to design a system to keep track of their flights and airplanes for their civil aviation service for **a certain day**. The **flights** are identified by a unique flight number and store information about the departure airport, destination airport, and departure time. The **airplanes** are identified by a unique registration number and store other information like aircraft type and capacity. The manager wants you to store the **aircraft type** in a separate entity to store other information like the manufacturer. The database will keep track of which flight will be undertaken by which airplane and the status of the flight arrived, in flight, or not departed yet.

a. Draw an ER diagram modeling this information. It should have an entity set representing airplanes, an entity set representing flights, an entity set representing aircraft types, and some relationship sets.

b. While reviewing this ER diagram with you, the manager suddenly realizes that there may be different layouts for the same type of airplane. As a result, the capacity may be different for the same aircraft type depending on different layouts. Draw a new ER diagram to deal with this. You may assume the attribute to determine different layouts called **layout**. Hint: use a weak entity set.

c. Now the airline company wants to upgrade the system to store more detailed information about the departure airport and the destination airport. They want the airport information composed of the IATA code (like JFK), the city where the airport is located, and the terminal. Besides, they want you to store the actual number of passengers in the airplane for a flight. Draw an ER diagram to meet the new requirements.

d. After checking that your system works well for a single day, the manager wants you to modify the system to keep track of the date information for every flight and keep historical data for them to analyze their flight status. Note that adding the date attributes to the relationship set is not sufficient as flights may be carried by different airplanes on different days. Instead, you can take one of the following approaches:

• use a ternary relationship set, involving an additional entity set representing dates;

• or, change the relationship set into an entity set.

  
You may represent it with a strong entity set by adding an identifier or with a weak entity set. Draw an ER diagram for the improved scenario.

Problem 2

In this problem, you are asked to create a management system for a bookstore, as shown in this ER diagram. This model provides data on an online bookstore’s sales.

![](<Classes + Uni/PDS/Practice Sets/Attachments/Attachment.png>)a. Which of the following aspects of the data are represented in this model? i. Each book has exactly one author

ii. Each book can be published by different publishers

iii. Each book has at least one category

iv. A customer can only purchase one copy for each book in one order

v. A customer can have different books in one order

vi. Each Author writes at least one book

vii. A customer can purchase two copies of the same book as long as they are in different orders

b. Derive a relational database schema from this ER diagram. You may either show it as a schema diagram or in a textual format. Indicate all primary key and foreign key constraints.

Problem 3

In this problem, you have a subway management system similar to the MTA, given by the following relational schema:

Passenger (pid, pname);

Card (cid, pid, cexpireday, cbalance);

TimePrice (mday, mprice);

Station (sid, sname, saddress);

AddTime (cid, attime, mday, moneypaid);

AddValue (cid, avtime, money);

Ride (cid, sid, rtime, rprice);

In the schema, we have passengers identified by a pid, and cards identified by a cid. There are two alternatives for passengers to pay for rides. The first one is to add time to their cards, so that they can take the train for unlimited times during the time period. The TimePrice table stores two time periods, 7 days and 30 days, and their prices. The other alternative is to add value to their cards. The value will only become available when any available time period on the card expires. When passengers add time or value, the database stores the number of days or amount of value they add, and the time of the transaction on the card. Also, whenever a passenger enters a station, the system records the time and, if the card that is used has no remaining time but has value, the price is deducted from the current balance in the Card table. As for the MTA system, passengers only swipe when they enter the subway, not when they leave. However, differently from the MTA system, we assume that, when extra time is added, the time period starts immediately, while in the MTA system the time period starts when the card is used the next time.

(a) Draw an ER diagram that is consistent with the above schema. Identify any weak entities.

(b) Identify suitable foreign-key relationships for the above tables.

(c) How would you change the schema if a card can be jointly owned by several passengers?

(d) How would you change the schema if the price is determined by both the departure station and arrival station, instead of one price per ride? Discuss briefly.