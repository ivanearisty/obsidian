---
tags:
  - PDS
---
How do I not get confused with cardinality constraints? I feel like sometimes I don't know how to express the constraint correctly because I do not know what side I am binding. What question can I ask, or enligsh sentence can I say, to not get confused?

How can I better spot redundancy and what are some of the common types of redundancy that students create? Like not using weak entities or something like that?
- Same attribute appear in different places
- If you can know a value, c, of a variable, say b, then you want to remove the relationship into an weak entity set.

How to make cardinality constraints show in sql er diagram?

Key differences between RM and ERM?

Go over HW questions inside the latex

I need help understanding the difference between the assignment and rename RA operators and when should they be used..

notes:
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
