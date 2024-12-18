---
tags:
  - DAA
---
# Option 2: Performance Analysis

## Instructions

### Dataset Overview

The Brazilian E-commerce Public Dataset by Olist provides real-world e-commerce transaction
data from Brazil's largest department store, containing 100,000 orders from 2016 to 2018.

### Dataset Structure

![[Screenshot 2024-12-19 at 3.35.18 AM.jpg]]

### Query

```sql
SELECT 
	o.order_id, 
	o.order_status, 
	o.order_purchase_timestamp, 
	p.product_id, 
	p.product_category_name, 
	oi.price, 
	oi.freight_value 
FROM olist_orders_dataset o 
	JOIN olist_order_items_dataset oi 
		ON o.order_id = oi.order_id
	JOIN olist_products_dataset p 
		ON oi.product_id = p.product_id 
	JOIN olist_customers_dataset c 
		ON o.customer_id = c.customer_id 
WHERE 
	c.customer_unique_id = '8d50f5eadf50201ccdcedfb9e2ac8455' 
ORDER BY 
	o.order_purchase_timestamp DESC;
```

### Setup 

So the datasets we need are:

olist_orders_dataset
olist_order_items_dataset
olist_products_dataset
olist_customers_dataset

From Customers:
![[Screenshot 2024-12-19 at 7.14.33 PM.jpg]]
From Orders:
![[Screenshot 2024-12-19 at 7.15.08 PM.jpg]]

So it seems that the reference goes from orders -> customers.

First we spring up the DB:

```sql
create schema if not exists miniproject;

use miniproject;

drop table if exists olist_order_items_dataset;
drop table if exists olist_products_dataset;
drop table if exists olist_orders_dataset;
drop table if exists olist_customers_dataset;
```

And make a table for each csv:

```
```