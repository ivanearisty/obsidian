create schema if not exists miniproject;

drop table if exists olist_order_items_dataset;
drop table if exists olist_products_dataset;
drop table if exists olist_orders_dataset;
drop table if exists olist_customers_dataset;

create table olist_customers_dataset (
    customer_id varchar(255), -- key to orders dataset, each order has a unique customer id.
    customer_unique_identifier varchar (255), -- unique identifier for a customer.
    cutomer_zip_code_prefix int, -- first five digits of customer zip code.
    cutomer_city varchar(100), -- customer city name.
    customer_state varchar(2) -- customer state.
);

create table olist_orders_dataset (
	order_id varchar(255), -- unique identifier of the order.
    customer_id varchar(255), -- key to the customer dataset. Each order has a unique customer_id.
    order_status varchar(100), -- reference to the order status (delivered, shipped, etc.
    order_purchase_timestamp date, -- shows purchase timestamp in format: 2017-10-02 10:56:33.
    order_approved_at date, -- shows the payment approval timestam in format: 2017-10-02 10:56:33.
    order_delivered_carrier_date date, -- shows the order posting timestamp. When it was handled to the logistic partner.
    order_delivered_custoemr_date date, -- shows the actual order delivery date to the customer.
    order_estimated_delivery_date date -- shows the estimated delivery date that was informed to customer at the purchase moment.
);









