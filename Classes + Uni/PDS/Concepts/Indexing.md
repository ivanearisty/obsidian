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

### Looking for a Value (example)

**Dense Index on PK:** Here we follow the pointer directly to the desired record. Since ID is a primary key, there exists only one such record and the search is complete.
![[Screenshot 2024-12-06 at 9.33.17 AM.jpg | 500]]

**Sparse index on PK**: Since the last entry (in numerical order) before “22222” is “10101”, we follow that pointer. We then read the file in sequential order to find the 22222 record.
![[Screenshot 2024-12-06 at 9.34.42 AM.jpg | 500]]

**Dense index on non-PK**: in this case the instructor file is sorted on the search key dept name, instead of ID. (Otherwise, this index would be nonclustering). In this case, we follow the pointer directly to the first History record.
![[Screenshot 2024-12-06 at 9.36.12 AM.jpg | 500]]

it is generally faster to locate a record if we have a dense index rather than a sparse index. However, a sparse index imposes less space demands. *A common scenario is to have a sparse index with one entry per block.* This is because *the usual dominant cost in processing a data request is the IO time taken to bring the block from disk to main memory*. Using this sparse index, we locate the block containing the record that we are seeking. Thus, unless the record is on an overflow block, we minimize block accesses while keeping the size of the index (and thus our space overhead) as small as possible.

### Multilevel Indices
#### Motivation

We also consider the case where records for one search-key value occupy several blocks.

Suppose we build a dense index on a relation with 1,000,000 tuples. Index entries are smaller than data records, so let us assume that 100 index entries fit on a 4-kilobyte block. Thus, our index occupies 10,000 blocks. If the relation instead had 100,000,000 tuples, the index would instead occupy 1,000,000 blocks, or 4 gigabytes of space. Such large indices are stored as sequential files on disk.

> If an index is small enough to be kept entirely in main memory, the search time to find an entry is low. However, if the index is so large that not all of it can be kept in memory, index blocks must be fetched from disk when required.

Binary search can be used on the index file to locate an entry, but the search still  has a large cost. If the index would occupy b blocks, binary search requires *as many as  $⌈log_{2}(b)⌉$ blocks to be read.*

Note that the blocks that are read are not adjacent, hence each read requires a random, non sequential, IO operation. *For a 10,000-block index, binary search requires 14 random block reads.*

On a magnetic disk system where a random block read takes on average 10 milliseconds, the index search will take 140 milliseconds. This may not seem much, but we would be able to carry out only seven index searches a second on a single disk.

#### Multilevel Indexing

To deal with this problem, we treat the index just as we would treat any other  sequential file, and we construct a sparse outer index on the original index, which we  now call the inner index:

![[Screenshot 2024-12-06 at 9.48.03 AM.jpg | 500]]

In our example, an inner index with 10,000 blocks would require 10,000 entries in the outer index, which would occupy just 100 blocks. If we assume that the outer index is already in main memory, we would read only one index block for a search using a multilevel index, rather than the 14 blocks we read with binary search. As a result, we can perform 14 times as many index searches per second.

 When dealing with extremely large files, the outer index may become too large to fit in main memory. For example, a 100,000,000-tuple relation requires an inner index occupying 1,000,000 blocks and an outer index of 10,000 blocks (40 megabytes). Given the demands on main memory, it may not be feasible to allocate enough space for the outer index. In such cases, an additional level of indexing can be created, which can be repeated as needed, forming multilevel indices. These multilevel indices substantially reduce the number of I/O operations required for searching compared to binary search methods.

### Index Update

Updating an index is necessary whenever a record is inserted, deleted, or modified in a file. Record modifications that affect the search-key attribute are treated as a deletion of the old record and insertion of the new record, simplifying the process to managing insertions and deletions.

#### Index Update Process:

1. **Insertion:**
    - **Dense Indices:**
        - If the search-key value is new, a corresponding entry is added to the index.
        - If the search-key value already exists:
            - Add a pointer to the new record in the index entry if it stores all pointers.
            - If the index stores a pointer to only the first record, insert the new record after other records with the same key.
    - **Sparse Indices:**
        - If a new block is created, insert the first search-key value from the block into the index.
        - Update the index only if the new record has the smallest search-key value in its block.

2. **Deletion:**
    - **Dense Indices:**
        - Remove the index entry if the deleted record is the only one with its search-key value.
        - If other records share the search-key value:
            - Remove the pointer to the deleted record.
            - If the deleted record was the first, update the index to point to the next record.
    - **Sparse Indices:**
        - No change if the search-key value isn’t present in the index.
        - If the deleted record's search-key value exists in the index:
            - Replace the index entry with the next search-key value, or remove it if the next value already has an entry.
            - Update the index entry to point to the next record if needed.

### Secondary Indices

1. **Secondary Indices vs. Clustering Indices:**
    
    - **Secondary indices** must be **dense**, with an index entry and a pointer for every record, ensuring records with the same search-key value are locatable.
    - **Clustering indices** can be **sparse**, as intermediate records can be accessed sequentially in file order.
2. **Candidate Key and Non-Candidate Key Differences:**

    - For **candidate key** secondary indices, the structure resembles dense clustering indices, though the file records are not sequentially ordered.
    - If the search key is not a candidate key, a secondary index must point to every record since the file order is determined by the clustering index, not the secondary index.
3. **Non-Unique Search Keys:**
    
    - **Nonunique search keys** use a bucket structure:
        - Each index pointer leads to a bucket, which then contains pointers to records.
        - **Drawbacks:** Increases access time and wastes space for keys with few duplicates.
4. **Efficiency Considerations:**
    
    - Sequential scans are efficient with clustering indices due to alignment of physical and index order.
    - Scanning in secondary index order is slow due to mismatched physical and secondary key orders, causing frequent disk I/O.
5. **Updates and Overhead:**
    
    - Modifications to the database require updating all indices, adding significant overhead.
    - Secondary indices are beneficial for improving query performance on non-clustering search keys but must be balanced against update costs.
6. **Composite Search Keys:**
    
    - Composite search keys consist of multiple attributes, represented as tuples (e.g., `(course_id, semester, year)`).
    - Indices on composite keys use **lexicographic ordering**, similar to alphabetic word ordering, and support efficient querying for combinations of attributes.

![[Screenshot 2024-12-06 at 10.14.28 AM.jpg | 500]]

Secondary indices enhance query performance for non-clustering search keys but demand careful consideration due to increased complexity, overhead, and storage requirements. Composite keys expand indexing capabilities by supporting queries involving multiple attributes.

## B+ Tree Index Files

### Structure

![[Screenshot 2024-12-06 at 10.27.53 AM.jpg]]![[Screenshot 2024-12-06 at 10.28.00 AM.jpg]]
![[Screenshot 2024-12-06 at 10.28.40 AM.jpg]]![[Screenshot 2024-12-06 at 10.28.28 AM.jpg]]
![[Screenshot 2024-12-06 at 10.28.09 AM.jpg]]
### Queries

![[Screenshot 2024-12-06 at 12.25.23 PM.jpg]]![[Screenshot 2024-12-06 at 12.25.30 PM.jpg]]![[Screenshot 2024-12-06 at 12.25.44 PM.jpg]]

#### Range Algo Detail
![[Screenshot 2024-12-06 at 1.09.21 PM.jpg]]