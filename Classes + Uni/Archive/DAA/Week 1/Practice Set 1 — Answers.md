---
tags:
  - DAA
---
## Problem 1

Using the pseudo-code of Insertion sort from class, determine the best-case number of swaps and the worst-case number of swaps when Insertion sort runs on an input array of length n. Repeat for the best-case and worst-case number of comparisons.

```
for i = 2 to n
	for j = i down to 2
		if A[j] < A[j-1]
			swap A[j] and A[j-1]
		else
			break
```

Swaps:
	Best case: The list is already sorted so no swaps are performed.
	Worst case: The list would be sorted in reverse order. For a list 4,3,2,1, n=4. We would do: 3,4,2,1 -> 3,2,4,1 -> 2,3,4,1 -> 2,3,1,4 -> 2,1,3,4, -> 1,2,3,4. In total 6 swaps. This is because we do (n-1) + (n-2) + ... 1 swaps, since each number would have to be swapped every time in the j loop. Hence the answer is $\frac{(n-1)(n)}{2}$ swaps.

Comparisons:
	Best case: For every iteration of the i loop, the j loop will do at least 1 check to verify if the current number is sorted. Since we go from 2 to n, the total amount of comparisons is $n-1$ 
	Worst case: This is equivalent to the number of swaps, since in the worst case every comparison leads to a swap and there is no situation where we do not find something to swap; hence it is also $\frac{(n-1)(n)}{2}$ of comparisons.

## Problem 2

Show that the best-case runtime of insertion sort is T (n) = an + b for constants a and b, and use this result to deduce that the best-case runtime is O(n). Do some research to determine the average-case runtime of insertion sort

## Problem 3

Let A be an array of n numbers. Write the pseudo-code for an algorithm that reverses the elements of A between indices i and j. Call the procedure Reverse(A, i, j). Let T (n) be the worst-case runtime of your algorithm when run on A between indices 1 and n. Find an expression for T (n) and show that this is O(n).

```
Reverse(A, i, j)
	while i < j 
		swap A[i] and A[j]
		increment i
		increment j
```

When reverse is called with i = 1 and j = n, we will do half of the array size as swaps, if it is odd, we skip the last element when the loop fails. 
We can express this as T(n) =  c x (n/2) + d , where c and d are some constant amount of work.

> Ask if adding as an (n/2 - 1) makes it wrong, and if so, how wrong.

## Problem 4

A sorting algorithm that is similar to Insertion Sort, is Selection sort . If you have not seen this algorithm before, I suggest the video https://www.youtube.com/watch?v=g-PGLbMth_g 
Let T (n) be the worst-case runtime of Selection sort. Show that T (n) is of the form $an^{2} + bn + c$, and that the runtime is $\mathcal{O}(n^{2})$. Repeat for the best-case runtime. How does the runtime of Selection sort differ from that of Insertion sort?

selection sort:

```
SelectionSort(A, start, end):
	i = start
		for (j = end) down to i
			temporary = MAX_INTEGER
			temporaryIndex = -1 
			for (k = j - 1) down to i
				if A[k] <= A[]
```

