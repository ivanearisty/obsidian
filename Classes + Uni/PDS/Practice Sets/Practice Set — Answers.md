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
![[Screenshot 2024-11-03 at 8.17.19 PM.jpg | 512]]

