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

