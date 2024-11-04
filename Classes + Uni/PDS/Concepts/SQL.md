---
tags:
  - PDS
---
# Lecture
## Domains
![[Screenshot 2024-10-25 at 11.11.54 AM.jpg]]
## Table Creation
![[Screenshot 2024-10-25 at 11.12.42 AM.jpg]]
### Integrity Constraints
![[Screenshot 2024-10-25 at 11.13.40 AM.jpg]]

## Keywords
### Insert, Delete, Drop, Alter 
![[Screenshot 2024-10-25 at 11.14.24 AM.jpg]]
### Select
The select clause lists the attributes desired in the result of a query
#### Arithmetic Selct
![[Screenshot 2024-10-25 at 11.15.38 AM.jpg]]
#### Duplicates and Distinct
![[Screenshot 2024-10-25 at 11.16.12 AM.jpg]]
### From
![[Screenshot 2024-10-25 at 11.17.07 AM.jpg]]
![[Screenshot 2024-10-25 at 11.17.40 AM.jpg]]
### Except

Used to select values that are not in another relation:

(Select distinct cID From Rental Natural Join Car Where carModel = ‘Toyota’) 
**Except** 
	(Select distinct cID From Rental Natural Join Car Where carModel = ‘Audi

## Joins
![[Screenshot 2024-11-04 at 3.43.46 AM.jpg]]
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

### Correlated Subqueries

A correlated subquery is a subquery that refers to a column from the outer query. The subquery is executed repeatedly for each row of the outer query, using the values from the current row to perform the subquery. The result of the subquery is then used in the evaluation of the outer query.

![[Screenshot 2024-11-04 at 1.32.26 AM.jpg]]

```sql
SELECT column1, column2, ….
FROM table1 outer
WHERE column1 operator(
	SELECT column1, column2
	FROM table2
	WHERE expr1 = outer.expr2
	);
```

Useful for looking for pairs of tuples, t1, t2 where there is some relationship between the value of attribute in t1 and in t2:

`Find people who gave a higher rating to movie X than to movie Y`

Nesting in `where, having, and select` clauses things will be applied to each row.

### Set Sizes

![[Screenshot 2024-11-04 at 1.41.41 AM.jpg]]

![[Screenshot 2024-11-04 at 1.42.11 AM.jpg]]

```sql
-- finding if a specific student took all courses
SELECT s.ID, s.name 
FROM student AS s
WHERE (
    SELECT COUNT(*) 
    FROM course 
    WHERE dept_name = 'Biology'
) = (
    SELECT COUNT(DISTINCT course_id)
    FROM takes t 
    NATURAL JOIN course
    WHERE s.ID = t.ID --current student
      AND dept_name = 'Biology'
);
```

## Unique

![[Screenshot 2024-11-04 at 1.52.21 AM.jpg]]

## Aggregate Functions

![[Screenshot 2024-11-04 at 12.25.16 AM.jpg]]

![[Screenshot 2024-11-04 at 12.26.07 AM.jpg]]

Having clause vs where clause
![[Screenshot 2024-11-04 at 12.30.10 AM.jpg]]

Aggregation queries are in the form:

**SELECT ... FROM ... WHERE ... GROUP BY ... HAVING**
### Null Aggregating

![[Screenshot 2024-11-04 at 12.32.21 AM.jpg]]
## Modifications
### Deletion
![[Screenshot 2024-11-04 at 2.09.24 AM.jpg]]
### Insertion
![[Screenshot 2024-11-04 at 2.40.58 AM.jpg]]
### Updates
![[Screenshot 2024-11-04 at 2.41.18 AM.jpg]]
![[Screenshot 2024-11-04 at 2.42.54 AM.jpg]]
## Ephemeral Relations
### With
![[Screenshot 2024-11-04 at 1.54.29 AM.jpg]]
### Temporary Tables
### Views
![[Screenshot 2024-11-04 at 3.45.49 AM.jpg]]
![[Screenshot 2024-11-04 at 3.46.15 AM.jpg]]
![[Screenshot 2024-11-04 at 3.47.30 AM.jpg]]
## Integrity Constraints

- not null
- primary key
- unique 
- check (P), where P is a predicate
- referential integrity (foreign keys)

![[Screenshot 2024-11-04 at 3.52.44 AM.jpg]]
![[Screenshot 2024-11-04 at 3.53.09 AM.jpg]]
![[Screenshot 2024-11-04 at 3.53.59 AM.jpg]]

## Def
Scalar subqueries: Query that is guaranteed to return a single row