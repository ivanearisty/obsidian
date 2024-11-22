# iae225 — Ivan Aristy

The schema is: ShoeOrder(brand, styleID, size, color, email, orderDate, basePrice, pricePaid, status, qInStock, qOrdered, bonusPts, phone)

## Question 1

Using your group members as customers (and additional fictional data as needed) show an example of a relation on this schema where:

a. Two customers have ordered the same brand/style/color/size of shoes, and 


| brand  | styldeID | size | color | email          | orderDate | basePrice |
| ------ | -------- | ---- | ----- | -------------- | --------- | --------- |
| Adidas | Predator | 11   | blue  | iae225@nyu.edu | 11-22-24  | 100       |
|        |          |      |       |                |           |           |
-

| pricePaid | status    | qInStock | qOrdered | bonusPts | phone        |
| --------- | --------- | -------- | -------- | -------- | ------------ |
| 100       | completed | 270      | 1        | 0        | 516-555-5555 |


b. There are multiple colors and/or sizes of at least one brand/style of shoes, and 
c. There is a customer who has no orders, and 
d. There are some black size 9 Adidas Sambas in stock, and no one has ordered any of that shoe type. Comment briefly on problems with this schema that these data illustrate.