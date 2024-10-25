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

```sql
alter table takes
add constraint
foreign key (grade) references Gradepoint(grade)
on delete set null
on update cascade;
```

We want to update the takes table to force it to use the grades that we allow.
On deletion of a grade, something fundamental has changed, and we want to set it to null or some other special value.
On update it's ok, we might just be changing the way letter grades are represented, or the position of the minus/plus sign.
### Question C 

Define a VIEW GradePointAvg(ID, GPA) that lists each student’s ID and gradepoint average.

```sql
drop view if exists GradePointAvg;

create view GradePointAvg as 
select
	takes.id,
    round(avg(Gradepoint.points), 2) as GPA
from takes
join Gradepoint on takes.grade = Gradepoint.grade
group by
	takes.id;
    
select * from GradePointAvg;
```

## Problem 3

### Question A

Find the name, ID, and GPA of the Comp. Sci. student who has the highest GPA among all Comp. Sci. students. If several students are tied for the highest, your query should return them all. Do not sort students by GPA.

```sql
drop view if exists GradePointAvgName;
 
create view GradePointAvgName as 
select 
	student.name as StudentName,
    takes.id as StudentID,
    avg(Gradepoint.points) as StudentGPA
from
	takes
join 
	student on takes.ID = student.ID
join 
	Gradepoint on takes.grade = Gradepoint.grade
where
	student.dept_name = 'Comp. Sci.'
group by
	student.name,
    takes.id -- when do we not have to group by student name as well?
;
select * from GradepointAvgName;
select
	*
from
	GradePointAvgName
where 
	StudentGPA = (select max(GradePointAvgName.StudentGPA) from GradePointAvgName);
```

## Problem 4

### Question A

Find the ID and name of each Comp. Sci. student who has not taken any courses offered by the Math department.

```sql
select distinct
	student.ID,
    student.name
from
	student
left join takes on student.ID = takes.ID
left join section on takes.course_id = section.course_id
left join course on section.course_id = course.course_id
where
	course.dept_name != 'Math' or course.dept_name is null -- keep in mind how != still skips null values
;
```
## Problem 5

### Question A

Find ID, name, course_id of each student and each course they took in Fall 2009. 
Students who did not take any courses that semester should be listed with NULL as the course_id.

