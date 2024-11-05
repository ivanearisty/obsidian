---
tags:
  - PDS
---
# Midterm 1 — iae225

## Question 1
etc.
## Question 2

Apple(**aName**​,description,avgWeight)
Orchard(**orchID​**,zip,distance,bagPrice)
Stock(**orchID,aName**​,numTrees)
Ripe(**orchID,aName,weekNum**​,comment)

### Part 1
Foreign Key Constraints

Stock.orchID references Orchard.orchID
Stock.aName references Apple.aName
Ripe.orchID references Orchard.orchID
Ripe.aName references Apple.aName

Comment: given the question, I assume that apples being ripe has nothing to do with whether they have stock or not. We could have a week where 'Adams','gala' is ripe but still have no stock.

### Part 2

Write an SQL query to find the orchID and zip of every orchard that has ripe 'Gala' apples _and_ ripe 'Mac' apples in week 5.

Assuming no distinct is needed since ripe relation should not contain duplicate entries:
```sql
create temporary table t as
select
	*
from
	Ripe
where weekNum = 5 and aName = 'Gala'
	and orchID in (
		select
			orchID
		from
			Ripe
		where weekNum = 5 and aName = 'Mac'
	)
;
select
	t.orchID as OrchardID,
	Orchard.zip as Zip
from
	t
natural join Orchard;
```

### Part 3

Write an SQL query to find the orchID and zip of orchards that **do not** have ripe 'Golden' apples during week 3.

Assuming no distinct is needed since ripe relation should not contain duplicate entries:
```sql
select
	Ripe.orchID as OrcharchID,
	Orchard.zip as Zip
from 
	Ripe
natural join Orchard
where
	weekNum != 3 and aName != 'Golden'
;
```

### Part 4

Write an SQL query to find the orchID and bagPrice for each Orchard that has at least 10 trees of every kind of apple. (Here "every kind of apple" means every kind that's listed in the Apple table.) Hint: You might find it helpful to draw a Venn diagram.

```sql
create temporary table t as 
select -- make a table with
	orchID, -- the specific orch ids
	count(aName) as num -- counting the amount of apples
from
	Stock
where numTrees >= 10 -- but only counting those that 
					 -- are greater than or equal to 10
group by
	orchID -- and group by the orch IDs so we have all of them together
;

-- at the end we should get something like
-- orchard | number of apple varieties with greater than 10 numtrees
-- Orch1 14
-- Orch2 15
-- Orch3 12
-- Orch4 11

select
	Orchard.orchID,
	Orchard.bagPrice
from
	Orchard
where -- We are doing this for every orchID
(
	-- Count how many apple varieties there are
	select 
		count(*) -- say 10
	from
		Apple
) 
=
(
	select
		t.num -- the number of apple varieties with greater than 10 numtrees
	from
		t -- the table we made above
	where
		t.orchID = Orchard.orchID
);
```

### Part 5

Write an SQL query to find the zip of the orchard that has the most kinds of ripe apples in week 5. If there more than one such orchard, the query should report all such zips.

```sql
create temporary table orchardsRipeOnWeek5
select
	orchID, -- orchards in question
	count(aName) as ripeCount -- again, i could add a distinct here, but I am assuming that there is no duplicates in the Ripe table
from
	Ripe
where
	weekNum = 5
group by
	orchID
;

-- we should now have something like:
-- Orch1 14
-- Orch2 15
-- Orch3 12
-- Orch4 11
-- but this time the right column is the amount of apples ripe during this week.

select
	Orchard.zip as Zip
from
	orchardsRipeOnWeek5
join Orchard on orchardsRipeOnWeek5.orchID = Orchard.orchID
where
	orchardsRipeOnWeek5.ripeCount = (select max(orchardsRipeOnWeek5.ripeCount) from orchardsRipeOnWeek5)
```

### Part 6

Write a relational algebra query to find the orchID and distance of orchards that have ripe 'Mac' apples during week 5.

$$
\begin{gather}
\Pi_{\text{orchID, distance}} ( \\

\\ )
\end{gather}
$$