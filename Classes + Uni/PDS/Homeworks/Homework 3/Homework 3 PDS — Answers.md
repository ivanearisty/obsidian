---
tags:
  - PDS
---
# Ivan Aristy - iae225

## Assignment

In HW2, you should hand this in via two GradeScope assignments: 
- HW 3A: a plain text file with the SQL queries from which we can copy/paste/execute your queries. Use the SQLcomment delimiter -- to comment out everything other than the queries. Label which query is which with -- Problem X.y 
- HW 3B: a pdf with all problems (marking which is which with GradeScope)

## Problem 1

Find IDs and names of students who got a B in CS-101 and an A in CS-319

```sql
select distinct
    student.ID as "StudentID",
    student.name as "StudentName"
from 
    student
where 
    student.ID in (
        select takes.ID 
        from takes 
        where takes.course_id = "CS-101" and takes.grade = "B"
    )
and 
    student.ID in (
        select takes.ID 
        from takes 
        where takes.course_id = "CS-319" and takes.grade = "A"
    );
```

## Problem 2

### Question A
Create a table Gradepoint(grade,points) to associate letter grades with points and fill it with the appropriate values (’A’, 4.0), (’A-’ ,3.7), etc.


```sql
create table Gradepoint
	(
    grade varchar(2) primary key,
    points numeric(2,1) not null
	);
    
insert into Gradepoint (grade, points) values
('A', 4.0),
('A-', 3.7),
('B+', 3.3),
('B', 3.0),
('B-', 2.7),
('C+', 2.3),
('C', 2.0),
('C-', 1.7),
('D+', 1.3),
('D', 1.0),
('F', 0.0);
```

### Question B
Add a foreign key constraint to another table, referencing the Gradepoint table. 

Note which table, write the constraint, including “on delete” and “on update” clauses and briefly justify your choices for those clauses. 

```
alter table takes
add constraint
foreign key (grade) references Gradepoint(grade)
on delete set null
on update cascade;
```

We want to update the takes table to force it to use the grades that we allow.
On deletion of a grade, something fundamental has changed, and we want to set it to null or some other special value.
On update it's ok, 
### Question C 

Define a VIEW GradePointAvg(ID, GPA) that lists each student’s ID and gradepoint average.
