*Use this Restaurant database for Problem 2. The database represents dishes the restaurant offers (Dishes), their sizes and prices (DishSize), customer data (Customer), and data about who placed orders and the status of orders (Order) and data about how many of which items and sizes are in each order (OrderItems):*

![[Screenshot 2024-11-04 at 11.38.15 AM.jpg]]

List foreign key constraints that this database should have. Your answer should indicate the referencing table (the one in whose table definition the constraint should be included), the referenced table, and the attribute(s). You may use a format like the following without writing out the whole table definition or keywords FOREIGN KEY ...

DIshSize.item references Dish.item
Order.phone references Customer.phone
OrderItems.OrderNum references Order.OrderNum
(OrderItems.item, OrderItems.size) references (DishSize.item,DishSize.size)

*Write an SQL query to find the phone numbers of customers who ordered items from the 'dessert' category*

```sql
select distinct
	phone
from
	Order
natural join orderItems
natural join dish
where
	category = 'dessert'
;
```

*Write a Relational Algebra query to find to find the bldgNums and streets of customers who have orders with status = "ready".*

$$
\begin{gather}
\text{CustomerOrders} \leftarrow (\text{Customer})\bowtie_{\text{Customer.phone = Order.phone}} (\text{Order}) \\
\Pi_{\text{bldNums, street}} (\sigma_{\text{status = ``ready"}}(CustomerOrders))
\end{gather}
$$
