---
tags:
  - PDS
cssclasses:
  - academic-pdf-export
---
# Ivan Aristy - iae225

## Problem 1

### Section A

#### Question

Welcome to New York, home of Broadway Shows. The Tony awards are an annual award ceremony, like the Oscars, but for broadway shows, rather than movies. There are numerous award categories. Design a simple ER diagram modeling data representing which production won which award when. Your ER diagram does not need to model awards for individual actors. There should be entity sets representing Shows and Awards (each with a reasonable primary key and a couple of other attributes), and one or more relationship set, indicating which shows were nominated and which shows won which award in which year. The model doesn’t have to indicate that the winner of an award was among the nominees, but it should indicate that there is exactly one winner of each award each year.

#### Thinking

Design a simple ER diagram modeling data *representing which production won which award when*. Your ER diagram does not need to model awards for individual actors. There should be entity sets representing **Shows** and **Awards** (each with a reasonable primary key and a couple of other attributes), and one or more relationship set, indicating which shows were nominated and which shows won which award in which year. The model doesn’t have to indicate that the winner of an award was among the nominees, but it should indicate that there is exactly one winner of each award each year.

- which production won which award when?
- Entity Sets of **Shows** and **Awards** 
- Relationships sets indicating **what shows** were nominated for an **Award**
- Relationship set what shows won an **Award**
- *indicate that there is exactly one winner of each award each year*

Reasoning:
- Only one show can win an award.
- A show can win multiple awards.
- A show can be nominated for multiple awards
- An award can have multiple nominees

Assumptions:
- No shows on the same year have the exact same name
- Every award must have a winner
- Every award must have at least 1 nominee

Preliminary answer:
![[P1Sa.svg | 400]]

We realize that in this configuration we are saying that an award can only be won a single time ever.

We need to tweak this to get the correct answer.

S
#### Answer

### Section B

#### Question

Show a little sample data for a few shows, a few award categories and which shows were nominated for and won those categories in the 77th annual Tony Awards. You may use any reasonable notation to indicate elements of the relationship set(s), e.g. (entity1, entity2) or lines connecting entities from the participating entity sets, etc.

#### Reasoning

I see this in the book:
![[Screenshot 2024-09-28 at 4.35.54 PM.jpg]]
Which seems appropriate to show some sample data.

But I am not to sure about how to show multiple relationship instances without making duplicates.

Since this is just an instance though, an example if you will, it doesn't really matter because the data would not be actually duplicated... the important things to show are the lines. So let's do the above for both.

Also, let's assume that for awards like best direction of a play, the play is the one that wins the award... i mean **Show**.
#### Answer

- Dots show other attributes not used for our PK.

![[P1Sb.drawio.svg]]