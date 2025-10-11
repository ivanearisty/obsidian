---
tags:
  - INFOVI
---
5 basic data types:

- Items
- Attributes
- Links
- Positions
- Grids

## Dataset Types

![[z/z ScreenShots/Screenshot 2024-10-01 at 1.28.31 AM.jpg]]

### Tables

Much of the data we consider in life can be arranged in a table

| Country | Year | Population | Case |
| ------- | ---- | ---------- | ---- |
| A       | 2020 | 10         | 1    |
| A       | 2021 | 11         | 2    |
| B       | 2020 | 50         | 3    |
| B       | 2021 | 55         | 5    |
- Each variable must have its own column
- Each observation must have its own row
- Each value must have its own cell

Rule of thumb:
- Variables often map to aesthetics
- Observations can be compared

![[z/z ScreenShots/Pasted image 20241001013036.png| 200]] ![[z/z ScreenShots/Pasted image 20241001013040.png| 200]] ![[z/z ScreenShots/Pasted image 20241001013045.png| 200]] 

### Networks

![[z/z ScreenShots/Pasted image 20241001013149.png| 300]]

- Good for specifying relationships between items
- A **node** is an item in a network (vertex)
- A **link** is a relation between two items (edge)
- Nodes and links often have attributes
	- Do not have to be related
- Examples:
	- Social network
	- Computer network
	- Gene interaction network

Trees:
- A tree is a special type of network
- Trees have hierarchical structure
![[z/z ScreenShots/Pasted image 20241001013721.png|500]]

### Fields

- Each cell is a measurement/calculation from a continuous domain
	- Infinite number of possible measurements, but fields discretize the domain
- Sampling strategy is important
	- Don’t want to mislead the reader
	- Interpolation can help (can be misleading!)

![[z/z ScreenShots/Pasted image 20241001013904.png]]

- Each cell is a measurement/calculation from a continuous domain
	- Infinite number of possible measurements, but fields discretize the domain
- Sampling strategy is important
	- Don’t want to mislead the reader
	- Interpolation can help (can be misleading!)
- Examples:
	- Medical scans
	- Aerodynamic Data

![[z/z ScreenShots/Pasted image 20241001014211.png| 300]]

![[z/z ScreenShots/Pasted image 20241001014143.png| 300]] ![[z/z ScreenShots/Pasted image 20241001014147.png| 300]]


### Geometry

- Specifies info about the shape of items
	- Explicit spatial positions
- Intrinsically spatial (like fields)
- May or may not have attributes!
	- Examples: Roads, Lidar scans

![[z/z ScreenShots/Pasted image 20241001014342.png| 300]] ![[z/z ScreenShots/Pasted image 20241001014346.png| 300]]

## Attributes

![[z/z ScreenShots/Pasted image 20241001014455.png]]

### Categorical

- Does not have an implicit ordering
- Also called nominal data
- *Can still be a number, but doesn’t make sense to aggregate*
- Examples:
	- Dog breeds (hierarchical!)
	- Song genres
	- City names

### Ordered 

Ordered data has an implicit ordering

- Ordinal
	- *Has an order but differences between categories may not be equal/measurable*
	- Example: 
		- Likert scale (questionnaire responses)

- Quantitative
	- *Supports arithmetic, differences between values are measurable*
	- **Interval data**: We can derive the gap between data values, and it has meaning
	- **Ratio data**: Similar to interval data, but has a true zero that has meaning. Allows math operations
	- Example:
		- 1, 2, 3, 4, 5.4, 345.2221, 17366105.23872, 1000000000000

### Ordering Direction

- Data may have different types of ordering
- **Sequential**: Values have a minimum and a maximum
	- Example: Person’s height
- **Diverging**: Values can be divided into 2 sequences pointing in opposite directions, meeting at a common zero point
	- Example: Terrain elevation (sea level = 0)
- **Cyclic**: Values wrap around back to a starting point
	- Example: Hour of the day

Attributes can often be grouped hierarchically
Interesting patterns may emerge at different hierarchy levels

![[z/z ScreenShots/Pasted image 20241001015005.png]]

Also makes sense to group into **dependent** and **independent**
- **Independent attributes**:
	- Way of describing the data
	- Usually discrete (i.e., categorical)
- **Dependent attributes**:
	- Their value is a function of one or more independent variables
	- Numerical data that can be analyzed, manipulated, and aggregated

