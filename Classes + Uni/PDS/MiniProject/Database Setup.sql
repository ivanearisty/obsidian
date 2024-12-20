drop schema miniproject;

create schema if not exists miniproject;

use miniproject;

drop table if exists olist_order_items_dataset;
drop table if exists olist_products_dataset;
drop table if exists olist_orders_dataset;
drop table if exists olist_customers_dataset;

create table olist_customers_dataset (
    customer_id varchar(255), -- key to orders dataset, each order has a unique customer id.
    customer_unique_id varchar (255), -- unique identifier for a customer.
    cutomer_zip_code_prefix int, -- first five digits of customer zip code.
    cutomer_city varchar(100), -- customer city name.
    customer_state varchar(2), -- customer state.
    primary key (customer_id) -- unique id for customer_order which is what this db represents tbh
    -- unique (customer_unique_id) -- uniqueness constraint for db integrity
);

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

SET GLOBAL local_infile = 1;

load data infile '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/olist_customers_dataset.csv'
into table olist_customers_dataset
fields terminated by ','
enclosed by '"' 
lines terminated by '\n' 
ignore 1 rows 
(customer_id, customer_unique_id, cutomer_zip_code_prefix, cutomer_city, customer_state);

show variables like 'sql_mode';
set session sql_mode = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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

set session sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

load data infile '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/cleaned/olist_products_dataset.csv'
into table olist_products_dataset
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n'
ignore 1 rows
(product_id, product_category_name, product_name_length, product_description_length, product_photos_qty, product_weight_g, product_length_cm, product_height_cm, product_width_cm);

load data infile '/Users/suape/WorkDir/Main Vault/Classes + Uni/PDS/MiniProject/DataSource/cleaned/olist_order_items_dataset.csv'
into table olist_order_items_dataset
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n'
ignore 1 rows
(order_id, order_item_id, product_id, seller_id, shipping_limit_date, price, freight_value);


