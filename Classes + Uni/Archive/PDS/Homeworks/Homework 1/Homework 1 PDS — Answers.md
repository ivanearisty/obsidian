---
tags:
  - PDS
cssclasses:
  - academic-pdf-export2
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

We realize that in this configuration we are saying that an award can only be won a single time ever. We need to tweak this to get the correct answer.

We can just add awardyear as a PK, and this would solve the issue. But I don't like that solution because an award might not change year over year.

Maybe the grant changes, but, if it does, we can move that into some data structure that holds historical award data. I don't think that just that issue is enough to argue that we would not be making a bunch of redundant award copies.

Hence, maybe a weak entity set to uniquely identify an instance of an award is reasonable. Like in the book, we have a specific course, but students don't take courses, they take sections. I think we can employ something similar here.
#### Answer

![[P1Sa v2.svg | 600]]

This looks better because now a show can be nominated for none of multiple of these award instances. The award instances are just the awards, but we use the year discriminant to specify what year what show won something.

This way we allow an award to be won multiple times over, but still only once on a particular year.

Plus, now the people nominated for an award are implicitly associated to the year they were nominated in.

PS: I forgot to use camelCase, my bad.
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

## Problem 2

### Section A

A shoe store has hired you to design a database to keep track of their inventory and orders. The Inventory is a collection of (pairs of) shoes. Each type of shoe the store carries is identified by its brand, styleID, size, and color; in addition, the inventory keeps track of the quantity of each type of shoe that is currently in stock. Each Customer has a unique email, any number of phone numbers, a number of bonus points, and an address composed of their street address, which in turn is composed of the building number, street name, and apartment number, and a city, state, and zip code.
#### Question

Using the notation studied, design an ER diagram with entity sets representing Customer and Inventory and a relationship set representing Current Orders. The model should enable tracking of the date on which an order is made, the status of the order, the number of (pairs of) each type of shoe in an order, the price paid for each type of shoe, and the status of the order. For part (a), assume that customers cannot have separate current orders of the same shoe type (though they can order several identical pairs in a single order). Your ER diagram for part (a) should be as simple as possible. In particular, it should have only one relationship set and that relationship set should be binary.

#### Reasoning

Entity Inventory (Shoes)
- Brand
- StyleID
- Size 
- Color
- QuantityInStock

and we know: 
> Each type of shoe the store carries is identified by its brand, styleID, size, and color

So that will be the PKs.

Entity Customer has:
- PK email 
- multivalued {phone number}
- bonus points
- address (street address \[build number, street name, apartment number], city, state, zip code)

Relationship set Current Orders.

- tracking of date in which order is made
- Order Status
- number of pairs of each type of shoe in an order -> signals one to many, also we could have a function that calculates number of pairs by counting the shoe types
- Price paid per shoe

Assumption:
- customers cannot have separate current orders of the same shoe type (though they can order several identical pairs in a single order).
- Simple as possible. In particular, it should have only one relationship set and that relationship set should be binary.

I mean like... I can smell the imminent redundancy even before starting to think about how to do this.

So, the name "current orders" makes me think that when a status has order completed it exists this current order pool. if that's the case then we can just have everything a descriptive attribute and use complex attributes for any issues, though, this will spell redundancy... However, I think the question is asking me to make things redundant and things will get fixed later on part b and c. 

- tracking of date in which order is made -> Simple attribute
- Order Status -> Simple attribute

We can heed this advice "customers cannot have separate current orders of the same shoe type (though they can order several identical pairs in a single order)."

and express the complexity through a 0..* constraint on customers, and just asume that it's taken care for us that there will not be those "duplicates"

#### Answer
![[P2Sa.drawio.svg]]

### Section B

#### Question

The store manager realizes that they would also like to keep track of the history of all of the orders that have been made. Briefly explain why the ER diagram from part (a) does not allow representation of a customer who makes multiple orders of the same type of shoe on different dates. Then modify the ER diagram, adding any needed entity sets and replacing Current Orders by a relationship set Orders which can represent past and present orders of the same type of shoe by the same customer.

#### Explanation

We assumed that no duplicate current orders of the same shoe type could exist earlier, because a current order that a customer places is identified by the type of shoe and the customer who ordered it. The date attribute of current order does not make this difference for us; hence, if a customer came in and ordered the same shoe on a different date, the previous order would get overridden. Which, with our assumptions from earlier was fine, but now it's not.

#### Fixing Things

If we want to make current orders into orders, then an easy fix would be to make orders identifiable by the date. 

A very fast solution would be to add a ternary entity to the relationship, like datetime, which would fix things because orders would now also be identified by the PK of datetime. We would only have issues if a customer placed an order for a particular shoe on a particular datetime (YYYY-MM_DD:HH-MM-SS), which would be rare.

![[P2Sb v2.drawio .svg | 300]] (ignore the arrow)

But this solution is not the most elegant I think.

Datetime is more naturally represented as an attribute rather than as an entity, and, funnily enough, orders are more naturally represented as an entity rather than just a bunch of descriptive attributes; hence, I will follow that intuition.

We're gonna make this new Order entity that allows for a customer to place an order, and for shoes to feed into it.

**Final Answer:** 
![[P2Sb.drawio.svg]]
Now that's MUCH better!

In this, an order has at least one but maybe many shoes, and the price and everything is contained on "Contains" but, we fixed the issues with not being able to placing multiple orders of the same shoe or on the same date because we just use an orderID.

### Section C

#### Question

Now the manager realizes that in addition to storing the prices customers paid, they would like to store the current price of each type of shoe and a description of each type of shoe. Furthermore, the current price and the description are determined by the brand and styleID. In other words, shoes that have the same brand and styleID always have the same current price and description, even though they may have different size and/or color. In addition, the manager would like to allow each customer to designate one Favorite shoe type (which should not involve the size or the color). Modify the ER diagram accordingly. HINT: Use a weak entity set; think carefully about which weak or strong entity sets participate directly in each relationship set. [For part c) you may start with the assumptions either in part a) or part b)

#### Reasoning

- We want to store price and description for each shoe
- They are determined **solely** by a shoe's **BRAND AND STYLEID**

- One Favorite shoe type

So both of the abstractions we have to concrete require that we ignore the identifying size and color 

The favorite type is tricky. Initially one would think that a simple relationship set that links a customer with shoe is all good. But, we explicitly are mentioned that their favourite should not involve size or color.

Thinking a bit outside of the box, we can downgrade inventory to become a weak entity set, and then relate the two important things (brand and style ID) as the identifiers for it. The strong entity set would be Shoe, and contain the other important details we are asked to include.

You still would order from inventory, that makes a lot of sense, but then the price per shoe would come implicitly from Shoe.

#### Answer

![[P2Sc.drawio.svg]]

Very pretty

### Section D

#### Question

The store is so successful that they’ve opened multiple locations. Modify the ER diagram to keep track of the inventories and orders at different locations. Customers can order from any location. Each Customer has a home location.

#### Reasoning

I think that we can keep things almost the same here we can just add a location entity and make inventory also depend on that to identify itself.

Since customers can order from any location, orders can be directly tied to inventory, no problem there. If we had such a constraint, then we might have to route orders through a home address.

For home address, let's just create a simple relationship that shows customer has the home address. 
#### Answer

![[P2Sd.drawio.svg]]

## Problem 3
### Section A

Design an ER diagram to model this situation: A tennis league has hired you to design a database for their upcoming tournament. In part (a), you will only consider singles events, where one individual player plays against another individual player.There are a large number of players, each with a unique playerID and a few other attributes (your choice.) Each player is enrolled in one or more Events (for example women’s singles, men’s singles, juniors, etc. – you don’t need to know the specific events to design the model.) Each Event has a unique eventID, a description, and some other attributes (again, your choice). Each player is enrolled in at least one event; some of the enrolled players are seeded, i.e. assigned a number indicating that they have a high ranking among all players in a given event. (Seeding is used in tournaments to arrange the schedule so the top players are unlikely to meet one another in early rounds.) The club has multiple Courts, each with a unique courtNumber and some other attributes. There are multiple timeSlots at which matches are played, each of which has a unique date and startTime. A SinglesMatch takes place between two players enrolled in the same event in a particular time slot on a particular court; at the end the score is recorded along with a description of the highlights.

#### Reasoning

Players
- Player ID
- + other attributes

Players are enrolled in one or more Events

Events
- event ID
- description
- + other attributes

Constraints:
- Each player is enrolled in at least one event

Assumption:
- *Event's need to have at least 10 enrolled players*

Courts
- courtNumber
- + other attributes

Timeslots at which matches are played, each timeslot has a unique date and starttime.

Singles match takes place between two players enrolled in the same event in a particular timeslot on a particular court. 

Score recorded with description of highlights

So I think that we can just have some intricate cardinality constraints on the matches and make them a weak entity set.

If you think about it, just like real life, the only thing we care about in a tennis event are the actual matches. 

We want to have minimal duplicate data, and weak entity constraints work great because it allows us to bind the abstract concept of a match to the others.
An event is a thing that exists in a timeless fashion. A court is a physical object. And time is time. However, a match depends on all of these two exist. Hence, making it a weak entity set will simplify our lives greatly I think. This statement really sold me the idea "\[About matches] same event in a particular time slot on a particular court"

##### Different train of thought I didnt go with: 

So, first of all, i think that there is going to be some inheritance here.

We know that we have some abstract thing called an event, but no event actually ever happens without it's children single match, singlematch male, or singlematch female, etc... being preceded.

So I think I want to make players able to participate in events but add inheritance so that we're good. After all, if my notes don't fail me: 
"**Completeness constraint**, specify whether or not an entity in the higher-level entity set must belong to at least one of the lower-level entity sets within the generalization / specialization.

- In **Total specialization** or generalization. Each higher-level entity must belong to a lower-level entity set.  
- In **Partial specialization** or generalization. Some higher-level entities may not belong to any lower-level entity set."
- 
#### Answer
**Assume underlined are discriminants inside WES**
![[P3Sa.svg]]


### Section B

#### Question

Doubles anyone? The tournament also includes doubles events, in which two-player teams play one another (e.g. men’s doubles, women’s doubles, mixed doubles) . Augment your ER diagram to model doubles events and their matches. (You do not have to show all of the details for entity sets and relationship sets from part b) unless they’re relevant here. Highlight the parts that are new.) There are several reasonable ways to approach this. In addition to designing the ER, comment on which aspects of doubles events and matches are or are not represented by your diagram.

#### Reasoning

Would you look at that, I think this works very well with what we did earlier.

The only issue we could've had is that a SinglesMatch is perfectly described by the two players that play it; however, a double's match requires an additional component to say what players play on what teams.

First of all we can increase the minimum cardinality to 4 for any particular doubles match, and then we have to look through the book to see how to set a constraint on the number of players that can enroll for any particular team...

Ok, I didn't find anything in particular.

That would be the most elegant solution 100%, but we can also add a new entity called two-person-team and get creative like that. 

#### Answer

The only problem here is that we have no way to enforce that the same team cannot play against themselves, but I think it's assumed that they wont need that clarification
**Assume underlined are discriminants inside WES**
![[P3Sb.svg]]

## Question 4

The United States Congress consists of two houses, the Senate and the House of Representatives: 
- Each state elects two senators. 
- Each state is divided into Congressional Districts and each Congressional District elects one representative (also called a Member of Congress). 
The number of Districts in a state is based on the state's population (as of the most recent US Census). Each congressional district has a district number and a population. A congressional district is uniquely identified by its number along with its state. For example, New York 2, New York 39, Pennsylvania 2, etc. (See link for more info about Congressional Districts.)
### Section A
#### Question
![[Screenshot 2024-09-28 at 10.04.09 PM.jpg]]
Which of the following aspects of the data are represented in this model? 
1. Each district has exactly one representative. **True.** 
2. Each state has exactly two senators. **False.**
3. Each state has at least one senator. **True**
4. A person cannot be senator of two different states. **True**
5. A person cannot be congressperson of two different districts. **True**
6. A person can be the congressperson of two different districts, as long as they're in different states **False**
7. A person can be the congressperson of two different districts, as long as they have different numbers. **False**

### Section B

Derive a relational database schema from this ER diagram. You may either show it as a schema diagram or in a textual format. Clearly indicate all primary key and foreign key constraints.

> Please treat bolding as underlining for pk purposes:

- Person(**lname, DOB,** fname, gender, url, email)
- Email(**lname, DOB, email**)
- State(**sname**, nickname, flag)
- District(**num**, **sname**, population)
- SenatorOf(**lname**, **DOB**, sname, termEndDate)
- RepOf(**lname**, **DOB**, **num**)
- In(**sname**, **num**)