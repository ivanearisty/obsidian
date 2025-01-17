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