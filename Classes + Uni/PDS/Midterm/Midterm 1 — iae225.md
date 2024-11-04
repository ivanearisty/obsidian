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