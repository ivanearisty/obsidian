# Data Model: General Framework for Describing Organization of Data

- **Relational Model**
  - Collection of tables (plus constraints on values in the tables)
    - More precisely, sets of mathematical relationships on collection of domains
  - Simple, clean model
  - Basis for SQL

- **Entity Relationship (ER) Model**
  - More expressive
  - Good design tool
  - Distinguishes between sets of entities (things) and sets of relationships (pairings or ordered n-tuples of elements of the entity sets)

# Entity Set

- Set of objects of the same type
- Type is comprised of attributes, each with a domain
  - One part of modeling data for a particular purpose is determining which attributes are relevant
- Example of types of objects:
  - Person: {person1, person2, person3, …}
  - Movie: {movie1, movie2, …}
  - Seat
  - Others
