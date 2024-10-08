---
tags:
  - Array
  - HashTable
difficulty: easy
completed: true
number: 217
---
```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<Integer>();
        for(int i : nums){
            if(set.contains(i)) return true;
            else set.add(i);
        }
        return false;
    }
}
```

Simple, hash is best solution.
