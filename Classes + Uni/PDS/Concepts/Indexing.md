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

An attribute or set of attributes used to look up records in a file is called a **search key**. 

Using our notion of a search key, we see that *if there are several indices on a file, there are several search keys.*

## Ordered Indices 

To gain fast random access to records in a file, we can use an **index structure**. 

Each **index structure** is *associated with a particular search key*. Just like the index of a book or a library catalog, an ordered index *stores the values of the search keys in sorted order and associates with each search key the records that contain it*.

A file may have several indices, on different search keys. If the file containing the records is sequentially ordered, a **clustering index** (or primary index) is an index whose search key also defines the sequential order of the file.

Indices whose search key specifies an order different from the sequential order of the file are called **nonclustering indices**, or secondary indices.

### Dense and Sparse Indices

An **index entry**, or index record, consists of a search-key value and pointers to one or more records with that value as their search-key value.

![[Screenshot 2024-12-06 at 9.31.00 AM.jpg | 500]]

**Dense Index on PK:** Here we follow the pointer directly to the desired record. Since ID is a primary key, there exists only one such record and the search is complete.
![[Screenshot 2024-12-06 at 9.33.17 AM.jpg | 500]]

**Sparse index on PK**: 