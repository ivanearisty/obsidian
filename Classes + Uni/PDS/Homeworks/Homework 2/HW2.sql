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
from teaches
inner join (select * from course where course.course_id = "CS-101") as cs101courses
on teaches.course_id = cs101courses.course_id;

# Question 9
#Write an SQL query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

select 
ID,
cs101courses.title as Title,
instructor.name as name
from teaches
inner join (select * from course where course.course_id = "CS-101") as cs101courses
on teaches.course_id = cs101courses.course_id
inner join instructor 
on teaches.ID = instructor.ID;