---
tags:
  - PDS
---
# Lecture

## SQL DDL

The SQL data-definition language (DDL) allows the specification of
information about relations, including

 The schema for each relation.
 The type of values associated with each attribute.
 The Integrity constraints
 The set of indices to be maintained for each relation.
 Security and authorization information for each relation.
 The physical storage structure of each relation on disk.

## Domains
![[Screenshot 2024-10-25 at 11.11.54 AM.jpg]]

## Table Creation
![[Screenshot 2024-10-25 at 11.12.42 AM.jpg]]

### Integrity Constraints
![[Screenshot 2024-10-25 at 11.13.40 AM.jpg]]

## Insert, Delete, Drop, Alter 

![[Screenshot 2024-10-25 at 11.14.24 AM.jpg]]

## Select

The select clause lists the attributes desired in the result of a query

### Arithmetic Selct
![[Screenshot 2024-10-25 at 11.15.38 AM.jpg]]

### Duplicates and Distinct
![[Screenshot 2024-10-25 at 11.16.12 AM.jpg]]

## From
![[Screenshot 2024-10-25 at 11.17.07 AM.jpg]]

![[Screenshot 2024-10-25 at 11.17.40 AM.jpg]]

## Joins

### Natural

![[Screenshot 2024-10-25 at 11.19.15 AM.jpg]]

![[Screenshot 2024-10-25 at 11.20.03 AM.jpg]]

## String Operations
![[Screenshot 2024-10-25 at 11.22.09 AM.jpg]]

## Order
![[Screenshot 2024-10-25 at 11.24.02 AM.jpg]]
## Set Operations

![[Screenshot 2024-11-04 at 12.24.05 AM.jpg]]
![[Screenshot 2024-11-04 at 12.49.09 AM.jpg]]
### Nested Queries

![[Screenshot 2024-11-04 at 12.35.00 AM.jpg]]

![[Screenshot 2024-11-04 at 12.35.46 AM.jpg]]

![[Screenshot 2024-11-04 at 12.47.33 AM.jpg]]

### Set Difference

Find people who saw little women 2019 and finding dory 2016

```sql
select 
	userID
from
	saw
where title = 'lw' and release = 2019
	and userID IN(
		select
			id
		from
			saw
		where title = 'fd' and release = 2016
	)
```

Find people who saw little women 2019 and **did not see** finding dory 2016 is simple as pie, we just have to change `in` to `not in` 
```sql
select 
	userID
from
	saw
where title = 'lw' and release = 2019
	and userID NOT IN(
		select
			id
		from
			saw
		where title = 'fd' and release = 2016
	)
```


### Sizes of Sets

## Aggregate Functions

![[Screenshot 2024-11-04 at 12.25.16 AM.jpg]]

![[Screenshot 2024-11-04 at 12.26.07 AM.jpg]]

Having clause vs where clause
![[Screenshot 2024-11-04 at 12.30.10 AM.jpg]]

Aggregation queries are in the form:

**SELECT ... FROM ... WHERE ... GROUP BY ... HAVING**
### Null Aggregating

![[Screenshot 2024-11-04 at 12.32.21 AM.jpg]]

## Except

Used to select values that are not in another relation:

(Select distinct cID From Rental Natural Join Car Where carModel = ‘Toyota’) 
**Except** 
	(Select distinct cID From Rental Natural Join Car Where carModel = ‘Audi
