---
tags:
  - DAA
---
# Ivan Aristy — iae225
## Question 1: Hashing
### Problem A
![[Screenshot 2024-10-12 at 12.57.26 PM.jpg]]

```
index
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
h1(k) = k mod 17
h2(k) = k^2 + 1 mod 17

45
h1(45) = 11
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
[ , , , , , , , , , ,  ,45,  ,  ,  ,  ,  ]

99
h1(99) = 14
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
[ , , , , , , , , , ,  ,45,  ,  ,99,  ,  ]

32
h1(32) = 15
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
[ , , , , , , , , , ,  ,45,  ,  ,99,32,  ]

96
h1(96) = 11
h2(96) = 3 = 14
h2(96) = 3 = 17 -> 0
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
[96, , , , , , , , , ,  ,45,  ,  ,99,32,  ]

25
h1(25) = 8
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  ,  ,  ,  ,  ,  ,  , 25,  ,  ,45,  ,  ,99,32,  ]

36
h1(36) = 2
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  , 36,  ,  ,  ,  ,  , 25,  ,  ,45,  ,  ,99,32,  ]

83
h1(83) = 15
h2(83) = 5 
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  ,36,83,  ,  ,  ,  ,25,  ,  ,45,  ,  ,99,32,  ]

27
h1(27) = 10
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  ,36,83,  ,  ,  ,  ,25,  ,27,45,  ,  ,99,32,  ]

21
h1(21) = 
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  ,36,83,21,  ,  ,  ,25,  ,27,45,  ,  ,99,32,  ]

49
h1(49) = 15
h2(49) = 5 x 3
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,  ,36,83,21,  ,  ,  ,25,  ,27,45,  ,49,99,32,  ]

51
h1(51) = 0
h2(51) = 1
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,51,36,83,21,  ,  ,  ,25,  ,27,45,  ,49,99,32,  ]

8
h1(8) = 8
h2(8) = 14
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,51,36,83,21, 8,  ,  ,25,  ,27,45,  ,49,99,32,  ]
```

### Problem B

![[Screenshot 2024-10-12 at 10.47.48 PM.jpg]]

```
h(k,i) = k + 2i + 3i^2 mod 17

Explain why it is that certain keys are not inserted

45
h(45,0) = k + 2i + 3i^2 mod 17 = 11
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,45,  ,  ,  ,  ,  ]

99
h(99,0) = k + 2i + 3i^2 mod 17 = 14
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,45,  ,  ,99,  ,  ]

32
h(32,0) = k + 2i + 3i^2 mod 17 = 15
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,45,  ,  ,99,32,  ]

96
h(96,0) = k + 2i + 3i^2 mod 17 = 11
h(96,1) = k + 2i + 3i^2 mod 17 = 16
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,45,  ,  ,99,32,96]

25
h(25,0) = k + 2i + 3i^2 mod 17 = 8
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,25,  ,  ,45,  ,  ,99,32,96]

25
h(25,0) = k + 2i + 3i^2 mod 17 = 8
h(25,1) = k + 2i + 3i^2 mod 17 = 13
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,  ,  ,  ,  ,  ,  ,25,  ,  ,45,  ,25,99,32,96]

36
h(36,0) = k + 2i + 3i^2 mod 17 = 2
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,36,  ,  ,  ,  ,  ,25,  ,  ,45,  ,25,99,32,96]

83
h(83,0) = k + 2i + 3i^2 mod 17 = 15
h(83,1) = k + 2i + 3i^2 mod 17 = 3
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,36,83,  ,  ,  ,  ,25,  ,  ,45,  ,25,99,32,96]

27
h(27,0) = k + 2i + 3i^2 mod 17 = 10
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,36,83,  ,  ,  ,  ,25,  ,27,45,  ,25,99,32,96]

21
h(21,0) = k + 2i + 3i^2 mod 17 = 10
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,36,83,21,  ,  ,  ,25,  ,27,45,  ,25,99,32,96]

49
h(49,0) = k + 2i + 3i^2 mod 17 = 15
h(49,1) = k + 2i + 3i^2 mod 17 = 3
h(49,2) = k + 2i + 3i^2 mod 17 = 14
h(49,3) = k + 2i + 3i^2 mod 17 = 14
h(49,4) = k + 2i + 3i^2 mod 17 = 3
h(49,5) = k + 2i + 3i^2 mod 17 = 15
h(49,6) = k + 2i + 3i^2 mod 17 = 15
h(49,7) = k + 2i + 3i^2 mod 17 = 6 we reach it here but we could've broken out of the cycle before if i was bound to 6.
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[  ,  ,36,83,21,  ,49,  ,25,  ,27,45,  ,25,99,32,96]

51
h(49,0) = k + 2i + 3i^2 mod 17 = 15
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[51,  ,36,83,21,  ,49,  ,25,  ,27,45,  ,25,99,32,96]

8
h(49,0) = k + 2i + 3i^2 mod 17 = 15
h(49,1) = k + 2i + 3i^2 mod 17 = 13
h(49,2) = k + 2i + 3i^2 mod 17 = 7
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[51,  ,36,83,21,  ,49, 8,25,  ,27,45,  ,25,99,32,96]
```

### Problem C

![[Screenshot 2024-10-12 at 11.17.49 PM.jpg]]

```
[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[51,  ,45,  ,32,  ,  ,  ,  ,99,  ,  ,  ,25,  ,27,21]
[  ,  ,96,  ,36,  ,  ,  ,  ,  ,  ,  ,  , 8,  ,  ,  ]
[  ,  ,  ,  ,83,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
[  ,  ,  ,  ,49,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
```

### Problem D

![[Screenshot 2024-10-12 at 11.25.12 PM.jpg]]

The hash table in 1b requires the most probes. 

```
h(k,i) = k + 2i + 3i^2 mod 17

h1(k) = k mod 17
h2(k) = k^2 + 1 mod 17

[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[51,  ,36,83,21,  ,49, 8,25,  ,27,45,  ,25,99,32,96]
h(15,0) = k + 2i + 3i^2 mod 17 = 15
h(15,1) = k + 2i + 3i^2 mod 17 = 3
h(15,2) = k + 2i + 3i^2 mod 17 = 14
h(15,3) = k + 2i + 3i^2 mod 17 = 14
h(15,4) = k + 2i + 3i^2 mod 17 = 3
h(15,5) = k + 2i + 3i^2 mod 17 = 15
h(15,6) = k + 2i + 3i^2 mod 17 = 16
h(15,7) = k + 2i + 3i^2 mod 17 = 6

[0 , 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]
[96,51,36,83,21, 8,  ,  ,25,  ,27,45,  ,49,99,32,  ]
h1(15) = k mod 17 = 15
h2(15) = k^2 + 1 mod 17 = 5
h2(15) = k^2 + 1 mod 17 = 5
h2(15) = k^2 + 1 mod 17 = 5
h2(15) = k^2 + 1 mod 17 = 5

```

### Problem E

![[Screenshot 2024-10-12 at 11.39.52 PM.jpg]]

We should do 17 attempts because 17 is prime and our table size is also 17, which... is prime. For bad double hashing, we'd need a secondary hash function with a step size that leads to cycling, but, in our case, due to the prime table size, and the mod 17 with a +1 inside the function, we can be fairly certain that we're ok.

## Question 2: Selection

### Problem A

![[Screenshot 2024-10-12 at 11.48.21 PM.jpg]]

```
array pablo = 25, 37, 52, 14, 89, 35, 83, 53, 31, 86, 99, 46, 66, 34, 22, 2, 8, 90, 30, 68, 21, 17, 84, 29, 77, 45, 33, 41, 19, 53, 42, 93, 23, 18, 91

Select(k = 14, Arr = pablo)

Step 1:
25, 37, 52, 14, 89, 
35, 83, 53, 31, 86, 
99, 46, 66, 34, 22, 
 2,  8, 90, 30, 68, 
21, 17, 84, 29, 77, 
45, 33, 41, 19, 53, 
42, 93, 23, 18, 91,

Step 2: Sort
14, 25, 37, 52, 89, 
31, 35, 53, 83, 86, 
22, 34, 46, 66, 99, 
 2,  8, 30, 68, 90, 
17, 21, 29, 77, 84, 
19, 33, 41, 45, 53, 
18, 23, 42, 91, 93,

Step 3: Median
17, 21, 29, 77, 84, 
 2,  8, 30, 68, 90, 
14, 25, 37, 52, 89, 
19, 33, 41, 45, 53, 
18, 23, 42, 91, 93,
22, 34, 46, 66, 99, 
31, 35, 53, 83, 86, 

41

Step 4: Median
17, 21, 29, 77, 84, 
 2,  8, 30, 68, 90, 
14, 25, 37, 52, 89, 
19, 33, 41, 45, 53, 
18, 23, 42, 91, 93,
22, 34, 46, 66, 99, 
31, 35, 53, 83, 86, 

```

## Question 3:  Heaps

### Problem A

![[Screenshot 2024-10-13 at 12.30.56 AM.jpg]]

Method 1:
We call on an array with a heap size of n
Make heap first calls with size of n
Bubbles up the last value
And It then progressively calls itself on a size 1 less than itself
Since calling bubble up on a valid heap doesn't break heap properties,
this method will work.

Method 2:
We call on the last element like before
We bubble down on every element
since the input array is sorted, 
bubble down can perform properly
if it wasn't we'd get issues, 
but by sorting we guarantee that the lowest values are bubbled down to their correct positions at the end of execution

Method 3:
This method will work perfectly, 
since we can just think of this as bubbling up elements
that are continuously inserted into a new array.
they do happen to be sorted here, 
but this is just regular bubble up insertion.

### Problem B

![[Screenshot 2024-10-13 at 2.55.03 AM.jpg]]

```java
MinMaxInsert(A, k):
	A[A.heapsize++] = k

MinInsert():

MaxInsert():

getgrandparent(A, k)
```
## Question 4: Lower Bounds and Linear time Sorting

## Notes for self