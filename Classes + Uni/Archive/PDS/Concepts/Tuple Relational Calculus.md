---
tags:
  - PDS
---
### Tuple Relational Calculus

- A nonprocedural query language, where each query is of the form:
  ${t \mid P(t)}$
  
- It is the set of all tuples $t$ such that predicate $P$ is true for $t$.

- $t$ is a **tuple variable**, $t[A]$ denotes the value of tuple $t$ on attribute $A$.

- $t \in r$ denotes that tuple $t$ is in relation $r$.

- $P$ is a **formula** similar to that of the predicate calculus.

---

### Predicate Calculus Formula

1. Set of attributes and constants.
2. Set of comparison operators: $<, \leq, =, \neq, >, \geq$.
3. Set of connectives: and ($\land$), or ($\lor$), not ($\neg$).
4. Implication ($\Rightarrow$): $x \Rightarrow y$, if $x$ is true, then $y$ is true.
   $$x \Rightarrow y \equiv \neg x \lor y$$

5. Set of quantifiers:
   - $\exists t \in r(Q(t)) \equiv$ "there exists" a tuple $t$ in relation $r$ such that predicate $Q(t)$ is true.
   - $\forall t \in r(Q(t)) \equiv Q$ is true "for all" tuples $t$ in relation $r$.

---

### Example Queries

- **Find the $ID$, $name$, $dept\_name$, $salary$ for instructors whose salary is greater than \$80,000**:
  $${t \mid t \in instructor \land t[salary] > 80000}$$

  Notice that a relation on schema $(ID, name, dept\_name, salary)$ is implicitly defined by the query.

![[Screenshot 2024-10-10 at 1.34.27 AM.jpg | 400]]

---

- **As in the previous query, but output only the $ID$ attribute value**:
  $${t \mid \exists s \in instructor (t[ID] = s[ID] \land s[salary] > 80000)}$$

| ID    |
| ----- |
| 12121 |
| 22222 |
| 33456 |
| 76543 |
| 83821 |
| 98345 |
- **Find IDs and names**

$$
{t \mid \exists s \in instructor (t[ID] = s[ID] \land t[name] = s[name]  \land s[salary] > 80000)}
$$
Notice how the attributes we set equal in t and s, we receive them in the output.

| ID    | Name     |
| ----- | -------- |
| 12121 | Wu       |
| 22222 | Einstein |
| 33456 | Gold     |
| 76543 | Singh    |
| 83821 | Bandt    |
| 98345 | Kim      |

---

- **Find the names of all instructors whose department is in the Watson building**:
$$
\begin{gather}
\{t \mid \exists s \in instructor(t[name] = s[name]) \\
\land \exists u \in department (u[dept\_name] = s[dept\_name] \\
\land u[building] = \text{``Watson''}) \}
\end{gather}
$$
English: There is a row in the instructor table such that the name of s and t match. And there is a row in the department table such that department name in s and u match, and lastly we want that building to be in the Watson building.

- **Find the set of all courses taught in the Fall 2009 semester, or in the Spring 2010 semester, or both**:

![[Screenshot 2024-10-10 at 1.55.15 AM.jpg]]

![[Screenshot 2024-10-10 at 1.51.00 AM.jpg | 200]]

---

- **Find the set of all courses taught in the Fall 2009 semester, and in the Spring 2010 semester**:

![[Screenshot 2024-10-10 at 1.57.06 AM.jpg]]

- **Find the set of all courses taught in the Fall 2009 semester, but not in the Spring 2010 semester**:

![[Screenshot 2024-10-10 at 1.57.29 AM.jpg]]

---

### Universal Quantification

- **Find all students who have taken *all courses* offered in the Biology department**:

So far predicates have been looking row by row, but sometimes we have questions that involve looking at a whole bunch of rows together to find a set and then find if that subset of some other set.
  ![[Screenshot 2024-10-10 at 1.59.18 AM.jpg]]

If u is a biology course, then student r took course u.

---

Questions:
- Are Tuple Relational Calculus outputs not 
- Do we have to learn domain relational calculus?