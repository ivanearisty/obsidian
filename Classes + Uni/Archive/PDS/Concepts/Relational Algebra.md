---
tags:
  - PDS
---
# Book

It is a **procedural language** consisting of a **set of operations** that take *one or two relations as input* and *produce a new relation as a result*.

- **Unary operations**: Involve operations on one relation (select, project, rename)
- **Binary operations**: Involve operations on pairs of relation (union, cartesain product, set difference)

We usually prohibit duplicates, but we can extend relational algebra to include them. 

### Select (Unary)

The **select** operation selects tuples that satisfy a given predicate.

Thus, to select those tuples of the instructor relation where the instructor is in the “Physics” department, we write:
$$
\sigma_{\text{dept\_name = "Physics"}}(\text{"instructor"})
$$

We can find all instructors with salary greater than $90,000:
$$
\sigma_{\text{salary > 90,000}}(\text{"instructor"})
$$

And we also allow comparisons using $=, \neq, <, \le, >, \text{ and }\ge$.

Further, we can use logical operators $\land, \lor, \neg$:
$$
\sigma_{\text{salary > 90,000} \land \text{dept\_name = "Physics"}}(\text{"instructor"})
$$

### Project (Unary)

The project operation allows us to **produce a relation from the parent, with certain attributes left out.**

$$
\Pi_{\text{ id, name, salary}}(\text{instructor})
$$

Note that, since a relation is a set, any duplicate rows are eliminated.

### Composition

Since the result of a relational operation is itself a relation, we can concatenate multiple queries together:

Find the names of all instructors in the Physics department:
$$
\Pi_{\text{ name}} (\sigma_{\text{ dept\_name = "Phsyics"}} (instructor))
$$

In general, since the result of a relational-algebra operation is of the same type (relation) as its inputs, relational-algebra operations can be composed together into a **relational-algebra expression**.

### Cartesian-Product Operation

The Cartesian-product operation, denoted by a cross (×), allows us to **combine information from any two relations**. We write the Cartesian product of relations r1 and r2  as r1 × r2. This concatenates tuples, t1 and t2, into a single tuple:

$instructor \times teaches$ :

![[z/z ScreenShots/Screenshot 2024-10-09 at 10.16.54 PM.jpg| 400]]

Here, we add the name of the schema were something came from to the final output:

So the new relation is: (instructor.ID, instructor.name, instructor.dept name, instructor.salary,  
teaches.ID, teaches.course id, teaches.sec id, teaches.semester, teaches.year)

For those attributes that appear in only one of the two schemas, we shall usually drop the relation-name prefix: (instructor.ID, name, dept name, salary, teaches.ID, course id, sec id, semester, year)

![[z/z ScreenShots/Screenshot 2024-10-09 at 10.22.12 PM.jpg| 500]]

### Join (Binary)

Suppose we want to find the information about all instructors together with the course id of all courses they have taught. We need the information in both the instructor relation and the teaches relation to compute the required result. The Cartesian product of instructor and teaches does bring together information from both these relations, but unfortunately the Cartesian product associates every instructor with every course that was taught, regardless of whether that instructor taught that course

Since the Cartesian-product operation associates every tuple of instructor with every tuple of teaches, we know that if an instructor has taught a course (as recorded in the teaches relation), then there is some tuple in instructor × teaches that contains her name and satisfies instructor.ID = teaches.ID. So, if we write:

$$
\sigma_{\text{ instructor.ID = teaches.ID}}(\text{instructor } \times \text{teaches})
$$
then, we get only those tuples of instructor × teaches that pertain to instructors and the  
courses that they taught.

![[z/z ScreenShots/Screenshot 2024-10-09 at 10.32.35 PM.jpg|400]]

If something does not have a relation, it does not appear.

The Join and Cartesian operations combined are usually written with the **bowtie, $\bowtie$ , symbol.**

Thus, the above is equivalent to $(\text{instructor})\bowtie_{\text{ instructor.ID = teaches.ID}}(\text{teaches})$.

- No need for parenthesis.
- No need to have a subscript on bowtie if we have a natural join. Meaning, that both tables have an ID column, and that is the only thing they have in common. You would only need to indicate the subscript if we are doing anything that's not a natural join, like the attribute has different names on the two tables.

### Set Operations (Binary)

Consider a query to find the set of all courses taught in the Fall 2017 semester, the Spring 2018 semester, or both.

We need both:
$$
\begin{gather}
\Pi_{\text{ course.id}}(\sigma_{\text{ semester = "Fall"} \land \text{year=2017}}(\sec tion)) \\
\text{and} \\
\Pi_{\text{ course.id}}(\sigma_{\text{ semester = "Spring"} \land \text{year=2018}}(\sec tion)) \\
\end{gather}
$$

We can use the set operation **Union** to accomplish the above:
$$
\begin{gather}
\Pi_{\text{ course.id}}(\sigma_{\text{ semester = "Fall"} \land \text{year=2017}}(\sec tion)) \cup
\Pi_{\text{ course.id}}(\sigma_{\text{ semester = "Spring"} \land \text{year=2018}}(\sec tion))
\end{gather}
$$

In general, for a union operation to make sense:  

1. Both input relations to the union operation have the same number of attributes; the number of attributes of a relation is referred to as its **arity**.  
2. When the attributes have associated types, the types of the ith attributes of both input relations must be the same, for each i.

Such relations are referred to as **compatible relations**.

For example, it would not make sense to take the union of the instructor and section relations, since they have different numbers of attributes...

The **intersection** operation, denoted by $\cap$, allows us to find tuples that are in both the input relations.

The **set-difference** operation, denoted by $-$, allows us to find tuples that are in one  
relation but are not in another.

![[z/z ScreenShots/Screenshot 2024-10-09 at 10.45.48 PM.jpg| 500]]
![[z/z ScreenShots/Screenshot 2024-10-09 at 10.46.29 PM.jpg|500]]

### Assignment

It is convenient at times to write a relational-algebra expression by assigning parts of it to temporary relation variables. The assignment operation, denoted by $\leftarrow$, works like assignment in a programming language. To illustrate this operation, consider the query to find courses that run in Fall 2017 as well as Spring 2018, which we saw earlier. We could write it as:

![[z/z ScreenShots/Screenshot 2024-10-09 at 10.48.55 PM.jpg| 100]]

We can combine and take use of this as such:
![[z/z ScreenShots/Screenshot 2024-10-09 at 10.49.21 PM.jpg| 500]]

With the assignment operation, a query can be written as a sequential program consisting of a series of assignments followed by an expression whose value is displayed as the result of the query

### Rename

Unlike relations in the database, the results of relational-algebra expressions do not have a name that we can use to refer to them. It is useful in some cases to give them names; the rename operator, denoted by the lowercase Greek letter rho $\rho$, lets us do this. Given a relational-algebra expression E, the expression $\rho_{x}(E)$ returns the result of expression E under the name x.

A second form of the rename operation is as follows: Assume that a relational-algebra expression E has arity n. Then, the expression: $\rho_{x(A_{1},A_{2},\dots A_{n})}(E)$ returns the result of expression E under the name x, and with the attributes renamed to A1, A2, ... , An.