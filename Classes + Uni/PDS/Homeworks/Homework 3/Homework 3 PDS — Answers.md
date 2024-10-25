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

We are skipping the constraint that prevents two point values servicing the same grade, but the question did not ask about this.
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
    course.dept_name,
    (sum(course.credits * Gradepoint.points)/sum(course.credits)) as GPA
from takes
join Gradepoint on takes.grade = Gradepoint.grade
join course on course.course_id = takes.course_id
group by
	takes.id,
    course.dept_name;
    
select * from GradePointAvg;
```

sum of (credits \* points)/ sum of credits

**Assumption: We assume that null courses are not counted towards the GPA**
## Problem 3

### Question A

Find the name, ID, and GPA of the Comp. Sci. student who has the highest GPA among all Comp. Sci. students. If several students are tied for the highest, your query should return them all. Do not sort students by GPA.

```sql
drop view if exists GPACompSci;
create view GPACompSci as
select
	student.name,
    student.ID,
    GradePointAvg.GPA
from student
join GradePointAvg on student.ID = GradePointAvg.id
where 
	student.dept_name = 'Comp. Sci.'
;
select * from GPACompSci;
select 
	*
from
	GPACompSci
where 
	GPACompSci.GPA = (select max(GPACompSci.GPA) from GPACompSci)
;
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

```sql
select
	student.ID,
    student.name,
    case
		when takes.semester = 'Fall' and takes.year = '2009' then takes.course_id
        else null
	end as courseID
from
	student
left join takes on student.ID = takes.ID and takes.semester = 'Fall' and takes.year = '2009'
;
```

## Problem 6

### Question A

Find the ID, name, and Fall 2009 GPA for each student. Students who didn’t take any courses in Fall 2009 should be listed with GPA either NULL or zero.

```sql
select
	student.ID,
    student.name,
    case
		when avg(Gradepoint.points) is not null then round(avg(Gradepoint.points),2)
        else null
	end as Fall2009GPA
from
	student
left join takes on student.ID = takes.ID 
	and takes.semester = 'Fall' 
    and takes.year = '2009'
left join Gradepoint on takes.grade = Gradepoint.grade
group by
	student.ID,
    student.name
;
```

## Problem 7

Find the ID and name of each student who has taken every course taught by the instructor whose ID is 10101. 
a. Write an SQL query using checks for empty set differences 
b. Write an SQL query using comparison of sizes of sets 
c. Write a TRC (tuple relational calculus) query. Hint: it should involve universal quantification.

### Problem A

```sql

-- creating the set of courses taught
drop view if exists courses_taught_by_instructor_10101;
create view courses_taught_by_instructor_10101 as
select 
	teaches.ID as InstructorID,
    teaches.course_id as CourseID
from
	teaches
where 
	teaches.ID = '10101'
;
select * from courses_taught_by_instructor_10101;


select -- get every single student
	student.ID as StudentID,
    student.name as StudentName
from 
	student
where not exists ( -- check if any course exists that the student has not taken and return false if true
	select -- select every courseID
		CourseID
	from courses_taught_by_instructor_10101 
    where 
		courses_taught_by_instructor_10101.CourseID -- where that course id
        not in( -- is not found
			select takes.course_id -- in the list of courses that this student has taken
            from takes
            where takes.ID = student.ID
		)
)
```

### Problem B

#### Ignore

![[Screenshot 2024-10-25 at 7.19.23 PM.jpg]]

```sql
SELECT
    s.sid,
    s.sname
FROM
    Student s
WHERE
    s.sid <> 12345
    AND (
        -- Number of clubs Bob is in during Fall 2023
        (SELECT COUNT(*)
         FROM Membership
         WHERE semester = 'Fall'
           AND year = 2023
           AND sid = 12345)
    ) = (
        -- Number of clubs Bob and the current student are both in during Fall 2023
        SELECT COUNT(*)
        FROM Membership AS m1
        JOIN Membership AS m2
        USING (cid, semester, year)
        WHERE semester = 'Fall'
          AND year = 2023
          AND m1.sid = 12345
          AND m2.sid = s.sid
    );

```

### Problem C

Find the ID and name of each student who has taken every course taught by the instructor whose ID is 10101.  Hint universal quantification

$$
\begin{gather}
\{ \\
t | \exists s \in \text{student}  
\\
\}
\end{gather}
$$

## Problem 8
Retailer DB:

Let’s define the “profitability” of a product to be the sum of the difference between priceEach and basePrice for all items ordered (taking quantity into account) divided by the total number of items of that product ordered. 
Write an SQL query to find the product name and product code of the product that has the highest profitability. 
(If there are ties, all such products should be listed. Do not use sorting.) 
Your solution should include WITH, VIEW, or TEMPORARY TABLE creations with comments to make them readable.

## Problem 9

Consider the posted solution to the tennis tournament problem from HW 1. 
Derive schemas and CREATE TABLE definitions for relevant tables and write constraints expressing the following: 

a. A player cannot play a match against themself 
b. No more than one match can be played on a given court during a given time slot 
c. A player cannot play in more than one match during the same time slot 

Try to determine whether your DBMS allows you to write those constraints in SQL and, if so, whether they are enforced by the DBMS. Briefly explain how you investigated this and your findings.

