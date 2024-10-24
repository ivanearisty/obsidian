use homework2;

# Question 3
# Write an SQL query to find the ID and name of each student in the Comp. Sci. department

select ID, name from student 
where dept_name = "Comp. Sci.";

# Question 6
# Write an SQL query to find the ID of each instructor who has taught CS-101 along with the year in which they taught it.
select 
	ID,
	cs101courses.title as Title,
	year
from teaches
inner join (select * from course where course.course_id = "CS-101") as cs101courses
on teaches.course_id = cs101courses.course_id;

# Question 9
# Write an SQL query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

select 
    teaches.ID,
    instructor.name as name,
    course.title as Title,
    teaches.year as year
from teaches
inner join section on teaches.course_id = section.course_id 
    and teaches.sec_id = section.sec_id
inner join course on section.course_id = course.course_id
inner join instructor on teaches.ID = instructor.ID
where course.course_id = 'CS-101';

# Question 10
# Write an SQL query to find the total number of credits the student with ID 12345 has taken in Fall 2009. \
# (Do not worry about whether they have a passing grade for the course.)

select
	sum(credits) as total_credits
from
	course
inner join takes on course.course_id = takes.course_id
where takes.ID = 12345 and 
takes.semester = "Fall" and 
takes.year = "2009";

# Question 11
#  Write an SQL query to find the ID and total number of credits taken by each student in Fall 2009. 
# (Do not worry about whether they have a passing grade for the course.)

select
    takes.ID,
    sum(course.credits) as total_credits
from
    course
inner join takes on course.course_id = takes.course_id
where
    takes.semester = 'Fall' and
    takes.year = 2009
group by
    takes.ID;

# Question 12
# Make up another question about the university data, write it in English, and write an SQL query to answer it. It should involve a join of at least two tables.
# Write a SQL query to find the courses that student 12345 is authorized to take (no repeats, consider prerequisites). Try for 70557 as well.

create temporary table temp_courseWP as
select
	course.course_id,
    course.title,
    prereq.prereq_id
from
	course
left join prereq on course.course_id = prereq.course_id;

select * from temp_courseWP;

select distinct 
	temp_courseWP.course_id, 
	temp_courseWP.title
from 
	temp_courseWP
where 
	temp_courseWP.course_id not in (
    select takes.course_id 
    from takes 
    where takes.ID = '12345'
)
and 
	(temp_courseWP.prereq_id is null or temp_courseWP.prereq_id in (
    select takes.course_id 
    from takes 
    where takes.ID = '12345'
	))
;

select distinct 
	temp_courseWP.course_id, 
	temp_courseWP.title
from 
	temp_courseWP
where 
	temp_courseWP.course_id not in (
    select takes.course_id 
    from takes 
    where takes.ID = '70557'
)
and 
	(temp_courseWP.prereq_id is null or temp_courseWP.prereq_id in (
    select takes.course_id 
    from takes 
    where takes.ID = '70557'
	))
;

# retailer db

use retailerDB;

# Question 13: 
# Find the productCode, productName and productLine of each product 
# ordered by any customer who lives in the USA 
# that has status “shipped”

select 
	#customers.customerName,
    #customers.country,
    products.productCode,
    products.productName,
    products.productLine
from orders
inner join customers on orders.customerNumber = customers.customerNumber
inner join orderdetails on orders.orderNumber = orderdetails.orderNumber
inner join products on orderdetails.productCode = products.productCode
where
	customers.country = "USA"
and
	orders.status = "shipped"
;

# Question 14: Find the total payments made by each customer who lives in the USA. 
# The result should include the customer’s customerNumber, customerName, and their total payments

select
	customers.customerNumber,
    customers.customerName,
    sum(payments.amount) as totalPayments
from
	payments
inner join customers on payments.customerNumber = customers.customerNumber
where
	customers.country = "USA"
group by
	customers.customerNumber,
    customers.customerName
;

# Question 15: For each productCode, list the productCode, productName, and the maximum profit on that product, i.e. 
# The maximum difference between the buyPrice and the priceEach paid for ordered items of that product. 
# You don’t need to list products for which there were no orders.

select
    products.productCode as id,
    products.productName as product,
    max(orderdetails.priceEach - products.buyPrice) as maxProfit
from
    orderdetails
inner join
    products on orderdetails.productCode = products.productCode
group by
    products.productCode,
    products.productName
;

#previous iteration:
create temporary table productsales as
select
	orderdetails.productCode as id,
    products.productName as product,
    orderdetails.priceEach as pricePaid,
    products.buyPrice as basePrice
from 
	orderdetails
inner join
	products on orderdetails.productCode = products.productCode
;

select * from productsales;
	
select
	id,
    product,
    max(pricePaid - basePrice) as maxProfit
from
	productsales
group by
	id,
    product
;

