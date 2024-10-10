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
	year
from teaches
inner join (select * from course where course.course_id = "CS-101") as cs101courses
on teaches.course_id = cs101courses.course_id;

# Question 9
# Write an SQL query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

select 
    teaches.ID,
    instructor.name as name,
    course.title as Title,
    teaches.year as year
from teaches
inner join section on teaches.course_id = section.course_id 
    and teaches.sec_id = section.sec_id
inner join course on section.course_id = course.course_id
inner join instructor on teaches.ID = instructor.ID
where course.course_id = 'CS-101';

# Question 10
# Write an SQL query to find the total number of credits the student with ID 12345 has taken in Fall 2009. \
# (Do not worry about whether they have a passing grade for the course.)

select
	sum(credits) as total_credits
from
	course
inner join takes on course.course_id = takes.course_id
where takes.ID = 12345 and 
takes.semester = "Fall" and 
takes.year = "2009";

# Question 11
#  Write an SQL query to find the ID and total number of credits taken by each student in Fall 2009. 
# (Do not worry about whether they have a passing grade for the course.)

select
    takes.ID,
    sum(course.credits) as total_credits
from
    course
inner join takes on course.course_id = takes.course_id
where
    takes.semester = 'Fall' and
    takes.year = 2009
group by
    takes.ID;

# Question 12
# Make up another question about the university data, write it in English, and write an SQL query to answer it. It should involve a join of at least two tables.
# Write a SQL query to find the courses that student 12345 is authorized to take (no repeats, consider prerequisites). Try for 70557 as well.

create temporary table temp_courseWP as
select
	course.course_id,
    course.title,
    prereq.prereq_id
from
	course
left join prereq on course.course_id = prereq.course_id;

select * from temp_courseWP;

select distinct 
	temp_courseWP.course_id, 
	temp_courseWP.title
from 
	temp_courseWP
where 
	temp_courseWP.course_id not in (
    select takes.course_id 
    from takes 
    where takes.ID = '12345'
)
and 
	(temp_courseWP.prereq_id is null or temp_courseWP.prereq_id in (
    select takes.course_id 
    from takes 
    where takes.ID = '12345'
	))
;

select distinct 
	temp_courseWP.course_id, 
	temp_courseWP.title
from 
	temp_courseWP
where 
	temp_courseWP.course_id not in (
    select takes.course_id 
    from takes 
    where takes.ID = '70557'
)
and 
	(temp_courseWP.prereq_id is null or temp_courseWP.prereq_id in (
    select takes.course_id 
    from takes 
    where takes.ID = '70557'
	))
;

# retailer db




