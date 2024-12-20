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
    -- unique (customer_unique_identifier) uniqueness constraint for db integrity; removed due to constraint failure from data
);
```
```sql
create table olist_orders_dataset (
	order_id varchar(255), -- unique identifier of the order.
    customer_id varchar(255), -- key to the customer dataset. Each order has a unique customer_id.
    order_status varchar(100), -- reference to the order status (delivered, shipped, etc.
    order_purchase_timestamp datetime, -- shows purchase timestamp in format: 2017-10-02 10:56:33.
    order_approved_at datetime, -- shows the payment approval timestam in format: 2017-10-02 10:56:33.
    order_delivered_carrier_date datetime, -- shows the order posting timestamp. When it was handled to the logistic partner.
    order_delivered_custoemr_date datetime, -- shows the actual order delivery date to the customer.
    order_estimated_delivery_date datetime, -- shows the estimated delivery date that was informed to customer at the purchase moment.
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
    shipping_limit_date datetime, -- seller shipping limit date for handling the order over to the logistic partner in format: 2017-10-02 10:56:33.
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

Some issues I fixed:
Error Code: 1062. Duplicate entry 'b6c083700ca8c135ba9f0f132930d4e8' for key 'olist_customers_dataset.customer_unique_id' -> non-unique values.

#### Customers
```sql
load data infile '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_customers_dataset.csv'
into table olist_customers_dataset
fields terminated by ','
enclosed by '"' 
lines terminated by '\n' 
ignore 1 rows 
(customer_id, customer_unique_id, cutomer_zip_code_prefix, cutomer_city, customer_state);
```

99441 row(s) affected Records: 99441  Deleted: 0  Skipped: 0  Warnings: 0

#### Orders
Error Code: 1292. Incorrect date value: 'franca' for column 'order_purchase_timestamp' at row 1

Let's relax the insertion strictness and try again hoping null values or '0000' datetime objects are inserted for invalid entries.

Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`miniproject`.`olist_orders_dataset`, CONSTRAINT `fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `olist_customers_dataset` (`customer_id`))

Let's check customer db:

SELECT count(customer_id) FROM miniproject.olist_customers_dataset;

'99441'

Seems like we have all the valid IDs but, upon further inspection, some ids have leading quotations and some dont.

Let's fix this for both tables, ignoring any quotation marks that happen when inserting ids.

![[Screenshot 2024-12-19 at 8.14.29 PM.jpg]]

We'll do the following for every file:
```python
files = {
    "olist_customers_dataset": "/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_customers_dataset.csv",
    "olist_orders_dataset": "/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_orders_dataset.csv",
    "olist_products_dataset": "/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_products_dataset.csv",
    "olist_order_items_dataset": "/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_order_items_dataset.csv",
}

output_dir = "/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/cleaned/"

for table_name, input_path in files.items():

    df = pd.read_csv(input_path)
    
    output_path = f"{output_dir}{table_name}_cleaned.csv"
    df.to_csv(output_path, index=False, quoting=1) 
```

Cleaned versions look like:
![[Screenshot 2024-12-19 at 8.21.15 PM.jpg]]

Even after doing this we get the same error. So we are going to create a temporary table and only insert relevant values:

```sql
drop table if exists temp_olist_orders_dataset;

create temporary table temp_olist_orders_dataset like olist_orders_dataset;

load data infile '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/cleaned/olist_orders_dataset.csv'
into table temp_olist_orders_dataset
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n'
ignore 1 rows
(order_id, customer_id, order_status, order_purchase_timestamp, order_approved_at, order_delivered_carrier_date, order_delivered_custoemr_date, order_estimated_delivery_date);

insert into olist_orders_dataset
select *
from temp_olist_orders_dataset
where customer_id in (select customer_id from olist_customers_dataset);

select * from olist_orders_dataset;

select count(order_id) from olist_orders_dataset;
```

Somehow, we get all relevant orders: 'count(order_id)' : '99441'

So we can move on

### Products

Error Code: 1366. Incorrect integer value: '' for column 'product_name_length' at row 106

Why did I see this coming?

Well that row looks like:

```csv
"a41e356c76fab66334f36de622ecbd3a","","","","","650.0","17.0","14.0","12.0"
```

Since we are already preprocessing with pandas. Let's fix these values too to become default 0.

```python
file_path = '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_products_dataset.csv'
output_path = '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/cleaned/olist_products_dataset.csv'

df = pd.read_csv(file_path)

numeric_columns = [
    'product_name_length', 
    'product_description_length',
    'product_photos_qty', 
    'product_weight_g', 
    'product_length_cm', 
    'product_height_cm', 
    'product_width_cm'
]

for col in numeric_columns:
    df[col] = pd.to_numeric(df[col], errors='coerce') 

df.fillna({'product_name_length': 0, 
           'product_description_length': 0, 
           'product_photos_qty': 0, 
           'product_weight_g': 0, 
           'product_length_cm': 0, 
           'product_height_cm': 0,
           'product_width_cm': 0}, 
           inplace=True)

df.to_csv(output_path, index=False, quoting=1) 
```

```csv
"a41e356c76fab66334f36de622ecbd3a","","0.0","0.0","0.0","650.0","17.0","14.0","12.0"
```

Nice:



32951 row(s) affected Records: 32951  Deleted: 0  Skipped: 0  Warnings: 0
