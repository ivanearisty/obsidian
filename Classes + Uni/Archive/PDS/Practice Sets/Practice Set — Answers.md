---
tags:
  - PDS
---
## Set 1
### Problem 2
#### Question A
1. false
2. false
3. true
4. ?
5. true
6. false
7. trueish

#### Question B

Publisher(**publisher_id**, pub_name, headquarter, phone)

Author(**author_id**, firstname, lastname, url)

Customer(**customer_id**, firstname, lastname, city, state, zip)

Category(**category_id**, name, description)

Book(**ISBN**, **publisher_id**, **category_id**, title, publish_date, price)
	publisher_id references Publisher(publisher_id)
	category_id references Category(category_id)

Write(**author_id**, **ISBN**)
	author_id references Author(author_id)
	ISBN references Book(ISBN)

Orders(**order_id**, **customer_id**)
	customer_id references Customer(customer_id)

Order_item(**item_id**, **ISBN**, **order_id**, price_per_item)
	ISBN references Book(ISBN)
	order_id references Order(order_id)

**WRONG**, realize that we don't have to make the when removing redundancy of many to one sets, we don't have to include them in the primary key
![[z/z ScreenShots/Screenshot 2024-11-03 at 8.17.19 PM.jpg| 512]]

### Problem 3

Card(pid) references Passanger(pid)
Addtime(cid) references Card(cid)
Addvalue(cid) references Card(cid)
Ride(sid) referenes Station(sid)
Ride(cid) references Card(cid)
AddTime(mday) references TimePrice(mday)

Passenger (pid, pname); 
Card (cid, cexpireday, cbalance); 
HasCard(cid, pid)
TimePrice (mday, mprice); 
Station (sid, sname, saddress); 
AddTime (cid, attime, mday, moneypaid); 
AddValue (cid, avtime, money); 
Ride (cid, sid, rtime, rprice);

Passenger (pid, pname); 
Card (cid, pid, cexpireday, cbalance); 
TimePrice (mday, mprice); 
Station (sid, sname, saddress); 
AddTime (cid, attime, mday, moneypaid); 
AddValue (cid, avtime, money); 
Prices(departuresid, arrivalsid, price)
Ride (cid, departuresid, arrivalsid, **departuretime**, arrivaltime);

Pricetable.departuresid and Pricetable.arrivalsid are foreign keys referencing Station.sid; 
Ride.(departuresid, arrivalsid) is a foreign key referencing Pricetable. (departuresid, arrivalsid).

## Set 2
### Problem 1
#### Question 1

Car(carMake, carModel, carModelNum) reference Cartype(carMake, carModel, carModelNum)
Rental(cID) references Customer(cID)
Rental(carID) references Car(carID)
Rental(pickupBid) references Branch(bid)
Rental(returnBid) references Branch(bid)

#### SQL

$$
\begin{gather}
\{ 
\\
t| \\
\exists c \in \text{Customer}, \exists a \in \text{Car}, 
\exists r \in \text{Rental} \exists y \in \text{CarType} (  \\
c[cID] = t[cID] \land \\
c[cName] = t[cName] \land \\
c[cID] = r[cID] \land \\
a[carID] = r[carID] \land \\
a[carMake] = y[carMake] \land \\
a[carModel] = y[carModel] \land \\
a[carModelNum] = y[carModelNum] \land \\
y[carSeats] = 7 \land \\
c[carMake] = \text{Toyota} \land \\
c[carColor] = \text{Blue} \land \\
r[pickupTD].year = 2017
\\ ) 
\}
\end{gather}
$$

### Problem 2

For each customer, output their ID, name, and the total amount of money they spend on shipments during 2017.

```sql
select
	cID as customerID,
	cName as customerName,
	sum(cost)
from
	Customer
join Shipment on Customer.cID = Shipment.payerID
where year(Shipment.sDateTime) = 2017
group by
	cID,
	cName
;
```

Output the IDs of any packages that were last scanned with label “Arrival scan, Miami airport” more than 5 days ago, and that were never scanned afterwards. (In other words, look for packages that were last scanned at the Miami airport but then got lost for the next 5+ days.)

![[z/z ScreenShots/Screenshot 2024-11-03 at 11.04.55 PM.jpg| 500]]

