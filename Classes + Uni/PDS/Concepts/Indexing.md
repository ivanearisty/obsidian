---
tags:
  - PDS
---
# Indexing
## Basic Concepts

Database-system indices play the same role as book indices in libraries. For example, to retrieve a student record given an ID, the database system would look up an index to find on which disk block (persistent storage devices, such as magnetic disks and solid-state drives) the corresponding record resides.

> Without indices, every query would end up reading the entire contents of every relation that it uses

Implementing an index by keeping a sorted list of IDs (primary keys) would not work well on very large databases, since: 
1. The index would itself be very big
2. Even though keeping the index sorted reduces the search time, it will still be time consuming 
3. Updating a sorted list as things are added or removed from the database can be very expensive.

There are *two* basic kinds of indices:
1. **Ordered indices**. Based on a sorted ordering of the values.
2. **Hash indices**. Based on a uniform distribution of values across a range of buckets. The bucket to which a value is assigned is determined by a function, called a hash function.

And to access them we will use techniques and *evaluate* them against:
1. Insertion time
2. Access time
3. Access types
4. Deletion time
5. Space overhead

An attribute or set of attributes used to look up records in a file is called a search key. Note that this definition of key differs from that used in primary key, candidate key, and superkey. This duplicate meaning for key is (unfortunately) well established in practice. Using our notion of a search key, we see that if there are several indices on a file, there are several search keys.