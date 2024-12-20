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

## Setup 

### Table Creation

So the datasets we need are:

olist_orders_dataset
olist_order_items_dataset
olist_products_dataset
olist_customers_dataset

From Customers:
![[Screenshot 2024-12-19 at 7.14.33 PM.jpg]]
From Orders:
![[Screenshot 2024-12-19 at 7.15.08 PM.jpg]]

For products:
![[Screenshot 2024-12-19 at 7.31.42 PM.jpg]]

For order_items:
![[Screenshot 2024-12-19 at 7.32.41 PM.jpg]]

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

**Do notice that some fk constraints are not here since we didn't add every table. For example: cutomer_zip_code_prefix, customer_state, and cutomer_city should probably reference the geolocation table.**

```sql
create table olist_customers_dataset (
    customer_id varchar(255), -- key to orders dataset, each order has a unique customer id.
    customer_unique_id varchar (255), -- unique identifier for a customer.
    cutomer_zip_code_prefix int, -- first five digits of customer zip code.
    cutomer_city varchar(100), -- customer city name.
    customer_state varchar(2), -- customer state.
    primary key (customer_id), -- unique id for customer_order which is what this db represents tbh
    unique (customer_unique_identifier) -- uniqueness constraint for db integrity
);
```
```sql
create table olist_orders_dataset (
	order_id varchar(255), -- unique identifier of the order.
    customer_id varchar(255), -- key to the customer dataset. Each order has a unique customer_id.
    order_status varchar(100), -- reference to the order status (delivered, shipped, etc.
    order_purchase_timestamp date, -- shows purchase timestamp in format: 2017-10-02 10:56:33.
    order_approved_at date, -- shows the payment approval timestam in format: 2017-10-02 10:56:33.
    order_delivered_carrier_date date, -- shows the order posting timestamp. When it was handled to the logistic partner.
    order_delivered_custoemr_date date, -- shows the actual order delivery date to the customer.
    order_estimated_delivery_date date, -- shows the estimated delivery date that was informed to customer at the purchase moment.
    primary key (order_id), -- unique identifier
	constraint fk_customer_id foreign key (customer_id) references olist_customers_dataset(customer_id)
);
```
```sql
create table olist_products_dataset (
	product_id varchar(255), -- unique product identifier.
    product_category_name varchar(100), -- root category of product, in Portuguese.
    product_name_length int, -- number of characters extracted from the product name.
    product_description_length int, -- number of characters extracted from the product description.
    product_photos_qty int, -- number of product published photos.
    product_weight_g int, -- product weight measured in grams.
    product_length_cm int, -- product length measured in cetimeters.
    product_height_cm int, -- product height measured in cetimeters.
    product_width_cm int, -- product width measured in cetimeters.
    primary key (product_id) -- uniquely identify product
);
```
```sql
create table olist_order_items_dataset (
	order_id varchar(255), -- order unique identifier
    order_item_id int, -- sequential number identifying number of items included in the same order.
    product_id varchar(255), -- product unique identifier.
    seller_id varchar(255), -- seller unique identifier. HERE WE PROLLY WANT REFERENCE TO SELLER BUT RIP SELLER TABLE.
    shipping_limit_date date, -- seller shipping limit date for handling the order over to the logistic partner in format: 2017-10-02 10:56:33.
    price decimal(10, 2), -- item price in format _.00
    freight_value decimal(10, 2), -- item freight value item in format _.00 (if an order has more than one item the freight value is splitted between items)
    primary key (order_id, order_item_id), -- combo pk
    constraint fk_order_id foreign key (order_id) references olist_orders_dataset(order_id),
    constraint fk_product_id foreign key (product_id) references olist_products_dataset(product_id)
);
```

### Data Insertion

Let's fix some names from the data real quick:
- product_name_lenght -> product_name_length

Queries