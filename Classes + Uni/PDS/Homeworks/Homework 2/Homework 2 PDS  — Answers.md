---
tags:
  - PDS
---
# Ivan Aristy - iae225
## ER Diagram

![[Screenshot 2024-10-10 at 11.28.20 AM.jpg]]
## Problem 1

1. Write a tuple relational calculus (TRC) query to find the ID and name of each student in the Comp. Sci. department

$$
\begin{gather}
\{

t | \exists s \in \text{student} ( \\
t[\text{ID}] = s[\text{ID}] \land \\
t[\text{name}] = s[\text{name}] \land \\
s[\text{dept\_name}] = \text{``Comp. Sci."}
)

\}
\end{gather}
$$

2. Write a relational algebra (RA) query to find the ID and name of each student in the Comp. Sci. department

$$
\begin{gather}
\Pi_{\text{ ID, name}}(\sigma_{\text{dept\_name="Comp. Sci."}}(\text{student}))
\end{gather}
$$
3. SQL
```sql
select ID, name from student 
where dept_name = "Comp. Sci.";
```
## Problem 2

*Question: since teaches has course id, can we just join it directly with courses?*

4. Write a TRC query to find the ID of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\{ t | 

% \text{Is this corner cutting fine?}
\exists 
e \in \text{teaches} , 
s \in \text{section} , 
c \in \text{course}( \\

t[\text{ID}] = e[\text{ID}] \land \\
t[\text{year}] = e[\text{year}] \land \\

% \text{Queston We need to associate this weak entity set all the way through}
e[\text{course\_id}] = s[\text{course\_id}] \land \\
e[\text{sec\_id}] = s[\text{sec\_id}] \land \\
e[\text{semester}] = s[\text{semester}] \land \\
e[\text{year}] = s[\text{year}] \land \\

s[\text{course\_id}] = c[\text{course\_id}] \land \\
c[\text{title}] = \text{``CS-101"} \land 
\\
)\}
\end{gather}
$$

5. Write an RA query to find the ID of each instructor who has taught CS-101 along with the year in which they taught it.

*No Direct Joining*
$$
\begin{gather} \\
\text{expanded-sections} \space \leftarrow \space \bowtie_{\text{ course.course\_id = section.course\_id}}(\text{section}) 
\\
\text{CS-101-sections} \space \leftarrow \space \Pi_{\text{ course\_id, sec\_id, semester, year, title}}(\sigma_{\text{title = ``CS-101"}} (\text{expanded-sections})) \\
\\
\text{final-relation} \space \leftarrow \space \\ \bowtie_{\text{CS-101-sections.course\_id = teaches.course\_id, CS-101-sections.sec\_id = teaches.sec\_id, }} \\ _{\text{CS-101-sections.semester = teaches.semester, CS-101-sections.year = teaches.year}}
\\ \\
\Pi_{\text{ ID, year}} (
\text{final-relation}
)
\end{gather}
$$

*Direct Joining*
$$
\begin{gather}
\text{cs-101-courses} \space \leftarrow \space \sigma_{\text{title = ``CS-101"}}(course) \\
\Pi_{\text{ID, year}} (\bowtie_{\text{ teaches.course\_id = cs-101-courses.course\_id}}(\text{cs-101-courses}))
\end{gather}
$$
6. SQL:
```sql
select 
	ID,
	cs101courses.title as Title,
	year
from teaches
inner join (select * from course where course.course_id = "CS-101") as cs101courses
on teaches.course_id = cs101courses.course_id;
```
## Problem 3 

7. Write a TRC query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\{ t | 

% \text{Is this corner cutting fine?}
\exists 
e \in \text{teaches} , 
s \in \text{section} , 
c \in \text{course}, 
i \in \text{instructor}( \\

t[\text{ID}] = e[\text{ID}] \land \\
t[\text{name}] = i[\text{name}] \land \\
t[\text{year}] = e[\text{year}] \land \\

% \text{Queston We need to associate this weak entity set all the way through}
e[\text{course\_id}] = s[\text{course\_id}] \land \\
e[\text{sec\_id}] = s[\text{sec\_id}] \land \\
e[\text{semester}] = s[\text{semester}] \land \\
e[\text{year}] = s[\text{year}] \land \\

e[\text{ID}] = i[\text{ID}] \land \\

s[\text{course\_id}] = c[\text{course\_id}] \land \\
c[\text{title}] = \text{``CS-101"} \land 
\\
)\}
\end{gather}
$$

8. Write a RA query to find the ID and name of each instructor who has taught CS-101 along with the year in which they taught it.

$$
\begin{gather}
\text{cs-101-courses} \space \leftarrow \space \sigma_{\text{title = ``CS-101"}}(course) \\
\text{instructor-teaches} \space \leftarrow \space \bowtie_{\text{ instructor.ID = teaches.ID}}(\text{teaches})
\\
\Pi_{\text{ID, year}} (\bowtie_{\text{ instructor-teaches.course\_id = cs-101-courses.course\_id}}(\text{cs-101-courses}))
\end{gather}
$$

9. SQL
```sql
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
```

## Lecture 4 Material

 10. Write an SQL query to find the total number of credits the student with ID 12345 has taken in Fall 2009. (Do not worry about whether they have a passing grade for the course.)
 11. Write an SQL query to find the ID and total number of credits taken by each student in Fall 2009. (Do not worry about whether they have a passing grade for the course.)
 12. Make up another question about the university data, write it in English, and write an SQL query to answer it. It should involve a join of at least two tables.

## Retailer Database

13. Find the productCode, productName and productLine of each product ordered by any customer who lives in the USA that has status “shipped”
14. Find the total payments made by each customer who lives in the USA. The result should include the customer’s customerNumber, customerName, and their total payments
15. For each productCode, list the productCode, productName, and the maximum profit on that product, i.e. the maximum difference between the buyPrice and the priceEach paid for ordered items of that product. You don’t need to list products for which there were no orders.