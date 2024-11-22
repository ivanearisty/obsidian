# iae225 — Ivan Aristy

The schema is: ShoeOrder(brand, styleID, size, color, email, orderDate, basePrice, pricePaid, status, qInStock, qOrdered, bonusPts, phone)

## Question 1

Using your group members as customers (and additional fictional data as needed) show an example of a relation on this schema where:

a. Two customers have ordered the same brand/style/color/size of shoes, and 

| brand  | styldeID | size | color | email                | orderDate | basePrice |
| ------ | -------- | ---- | ----- | -------------------- | --------- | --------- |
| Adidas | Predator | 11   | blue  | iae225@nyu.edu       | 11-22-24  | 100       |
| Adidas | Predator | 11   | blue  | iae225@stern.nyu.edu | 11-21-24  | 100       |
-

| pricePaid | status     | qInStock | qOrdered | bonusPts | phone        |
| --------- | ---------- | -------- | -------- | -------- | ------------ |
| 90        | inProgress | 255      | 1        | 0        | 516-555-5555 |
| 90        | completed  | 270      | 1        | 0        | 516-555-5555 |
|           |            |          |          |          |              |

b. There are multiple colors and/or sizes of at least one brand/style of shoes, and 

| brand  | styldeID | size | color | email                | orderDate | basePrice |
| ------ | -------- | ---- | ----- | -------------------- | --------- | --------- |
| Adidas | Predator | 11   | blue  | iae225@nyu.edu       | 11-22-24  | 100       |
| Adidas | Predator | 10.5 | blue  | iae225@stern.nyu.edu | 11-21-24  | 100       |
-

| pricePaid | status     | qInStock | qOrdered | bonusPts | phone        |
| --------- | ---------- | -------- | -------- | -------- | ------------ |
| 90        | inProgress | 255      | 1        | 120      | 516-555-5555 |
| 90        | completed  | 270      | 1        | 100      | 516-555-5555 |

c. There is a customer who has no orders, and 

| brand | styldeID | size | color | email                 | orderDate | basePrice |
| ----- | -------- | ---- | ----- | --------------------- | --------- | --------- |
| null  | null     | null | null  | iae225@tandon.nyu.edu | null      | null      |

-

| pricePaid | status | qInStock | qOrdered | bonusPts | phone        |
| --------- | ------ | -------- | -------- | -------- | ------------ |
| null      | null   | null     | null     | 200      | 516-444-4444 |

d. There are some black size 9 Adidas Sambas in stock, and no one has ordered any of that shoe type. 


| brand  | styldeID | size | color | email | orderDate | basePrice |
| ------ | -------- | ---- | ----- | ----- | --------- | --------- |
| Adidas | Samba    | 9    | black | null  | null      | 100       |

-

| pricePaid | status | qInStock | qOrdered | bonusPts | phone |
| --------- | ------ | -------- | -------- | -------- | ----- |
| null      | null   | 100      | null     | null     | null  |

Comment briefly on problems with this schema that these data illustrate.

There's plenty:
- We must represent a shoe existing with a null or default order, which does not represent a real entity, and, if that were not done, we'd lose track of shoes available if no orders are associated to them
- Integrity and Confusion: Fields like item quantities are hard to keep track of and instantly become outdated when a new order for an item comes in. 
- Redundant Data Everywhere. We need unrelated attributes to be defined or null to express a meaningful real entity by itself.
- Lots of for loops would be needed to find relevant data.

## Question 2

![[Screenshot 2024-11-22 at 3.33.36 AM.jpg]]

Trivial: styleID, brand -> brand

Superkey: brand, styleID, size, color, email, orderDate -> basePrice, pricePaid, status, qInStock, qOrdered, bonusPoints, phone

## Question 3

![[Screenshot 2024-11-22 at 3.36.33 AM.jpg]]

1. brand, styleID, size, color -> qInStock
2. brand, styleID -> basePrice
3. email -> phone, bonusPts

## Question 4

What is the canonical cover of the set of dependencies implied by the description?

$$\begin{gather}
1. ( { \text{brand, styleID, size, color} } \rightarrow \text{qInStock} ) \\
2.	( { \text{brand, styleID} } \rightarrow \text{basePrice} ) \\
3.	( { \text{email} } \rightarrow \text{phone}, \text{bonusPts} ) \\
\end{gather}
$$
## Question 5

Candidate Key: 
(brand, styleID, size, color, email, orderDate)

## Question 6

A relation is in $\textbf{BCNF}$ if for every functional dependency $\alpha \to \beta$, $\alpha$ is a superkey. Let’s check:

Consider $A: ( \text{brand, styleID, size, color} \rightarrow \text{qInStock} )$

Since the candidate key is as above, we miss $( \text{email} ) and ( \text{orderDate} )$.

Additionally, A is not trivial since $( \text{qInStock} \not\subseteq \text{(brand, styleID, size, color)} )$.

## Question 7

Decompose ShoeOrder into a collection of schemas each of which is in BCNF. Show your work: at each stage show which schema you are decomposing, which functional dependency violating BCNF you are using for the decomposition, and the resulting two schemas. At the end, show the entire decomposed database schema and give meaningful names to each relation schema.

The schema is: ShoeOrder(brand, styleID, size, color, email, orderDate, basePrice, pricePaid, status, qInStock, qOrdered, bonusPts, phone)

brand, styleID, size, color -> qInStock 
- Inventory (brand, styleID, size, color, qInStock)
- R(brand, styleID, size, color, email, orderDate, basePrice, pricePaid, status, qOrdered, bonusPts, phone)

brand, styleID -> basePrice
- ShoePrice (brand, styleID, basePrice)
- R(brand, styleID, size, color, email, orderDate, pricePaid, status, qOrdered, bonusPts, phone)

email -> phone, bonusPts 
- User (email, phone, bonusPts)
- R(brand, styleID, size, color, email, orderDate, pricePaid, status, qOrdered)

- Inventory (brand, styleID, size, color, qInStock)
- ShoePrice (brand, styleID, basePrice)
- User (email, phone, bonusPts)
- R: Order (brand, styleID, size, color, email, orderDate, pricePaid,
status, qOrdered)

## Question 8

Show how the data in (1) is stored using the decomposed database schema from (7). Comment on how the decomposition addresses the anomalies you noted in part (1).

**Inventory**

| brand  | styleID  | size | color | qInStock |
| ------ | -------- | ---- | ----- | -------- |
| Adidas | Predator | 11   | blue  | 255      |
| Adidas | Predator | 10.5 | blue  | 270      |
| Adidas | Samba    | 9    | black | 100      |
- Only one entry for the non-differentiated shoe. Q in stock is now kept as an attribute not dependent on orders, allowing us to edit it without having to do something new to orders
- Samba shoes can be kept in DB without depending on null user values or being ordered

**ShoePrice**

| brand  | styleID  | basePrice |
| ------ | -------- | --------- |
| Adidas | Predator | 100       |
| Adidas | Samba    | 100       |
- basePrice correctly inherits from only brand and styleID, keeping an abstract relationship not dependent on actual shoes in storage

**User**

| email | phone | bonusPts |
| ----- | ----- | -------- |
|       |       |          |

**Order**