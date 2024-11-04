---
tags:
  - PDS
---
# Midterm 1 — iae225

## Question 1
etc.
## Question 2

Apple(**aName**​,description,avgWeight)
Orchard(**orchID​**,zip,distance,bagPrice)
Stock(**orchID,aName**​,numTrees)
Ripe(**orchID,aName,weekNum**​,comment)

### Part 1
Foreign Key Constraints

Stock.orchID references Orchard.orchID
Stock.aName references Apple.aName
Ripe.orchID references Orchard.orchID
Ripe.aName references Apple.aName
