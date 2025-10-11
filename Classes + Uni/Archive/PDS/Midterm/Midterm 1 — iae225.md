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
	Ripe.orchID as OrchardID,
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
		t 
	where
		t.orchID = Orchard.orchID -- for this specific orchard lookup
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
\text{RipeXOrchard} \leftarrow (\text{Ripe})\bowtie_{\text{Ripe.orchID = Orchard.orchID}}(\text{Orchard}) \\ \\
\Pi_{\text{orchID, distance}} 
(\sigma_{\text{aName = ``Mac"} \land \space \text{weekNum = 5}}
(\text{RipeXOrchard})
)
\end{gather}
$$

### Parth 7

Write a tuple relational calculus (TRC) query to find the orchID and distance from NYC of orchards that have ripe 'Mac' apples during week 5.

$$
\begin{gather}
\{ t | \\
\exists r \in \text{Ripe}, \exists o \in \text{Orchard} ( \\
r[\text{orchID}] = t[\text{orchID}] \land \\
o[\text{distance}] = t[\text{distance}] \land \\
r[\text{aName}] = \text{Mac} \land \\
r[\text{weekNum}] = 5
\\
)
\}
\end{gather}
$$

## Question 3

Every year, the NYC marathon inspires people to run competitively, or perhaps, to design databases for runners. A race club has the following ER diagram (shown in both notations we studied) for a database about their races this year. Events are identified by an eID and a division. Runners are identified by an rID. Each runner who enters an event has a bib number (bibNum) and their time to complete the event is recorded as eTime.

![[z/z ScreenShots/runningclub2.drawio.png]]

### Part 1

An event can have more than one winner
False
Because we have cardinality of 1..1 on win to event
### Part 2

A runner can win more than one event
True
Because we have 0 to many from runner to winning

### Part 3

Two runners in the same event can have the same bib number
True
Because my notes saved me:
![[z/z ScreenShots/Screenshot 2024-11-04 at 7.53.51 PM.jpg]]
### Part 4

A runner can have two entries in the same event with different bib numbers
False
The bib number is not what describes the relationship

### Part 5

Using the techniques we studied, derive a relational database schema from the ER diagram. Remember to indicate all primary key and foreign key constraints. You may either write your answer in text or draw a schema diagram and upload the file.

Assume that text that is bolded (I think for you it looks like \*\*text\*\* are primary keys)

Runner(**rID**, fname, lname, email)

RunnerSponsors(**rID, sponsorNames**)
	RunnerSponsors(rID) references Runner(rID)

Event(**eID, division**, distance, price, winner)
	Event(winner) references Runner(rID) <- I think we don't need to add win since we can just do this as an optimization.

Comment: Since entry will be many to many, it can only be identified by all the pks
Entry(**rID, eID, division**, bibNum, eTime)
	Entry(rID) references Runner(rID)
	Entry(eid, division) references Event(eID,division)


## Question 4

### Question

The running club whose ER is shown in Question 3 has realized that they would like to store data about their races in other years, as well. **Each event should now be identified by its eID, division, and year**. Events with the same eID and division have the same distance, but the same event in the same division could have different prizes in different years, and of course, could have different entrants and winners in different years. In addition, each runner can sign-up for a "LifeMembership" in an event, which gives them free entrance to that event every year.

Redraw the ER diagram to incorporate these changes. (If some entity set or relationship set from the previous diagram doesn't change at all, you may show its box or diamond and name, without filling in the list of attributes.)

### Reasoning

We want to identify an event with a year

All events are primarily identified by the eID and division and so they have the same distance
which means that this could be a strong entity set

Depending on this strong entity set, an instantiation of the event in some year will be uniquely identified by the combo above and the year,
this event would now include different prizes, different entrats, and different winners.

Additionally we need to model life membership, which shows that the runner can sign up to all instantiations of that particular event for free. 
So we can draw a relation from runners to the strong entity and that would trickle down to the instantiation later on in the db implementation

### Answer

![[iae225.q4.drawio.svg]]
