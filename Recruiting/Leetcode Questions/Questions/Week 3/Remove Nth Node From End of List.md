---
tags:
  - Recursion
  - In-Place-LinkedList
difficulty: medium
completed: true
number: 19
---
```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0,head);
        rem(dummy, head, n);
        return dummy.next;
    }

    public int rem(ListNode prev, ListNode curr, int n){
        if(curr == null) return 0;
        int pos = rem(curr, curr.next, n) + 1;
        if(pos == n) prev.next = curr.next;
        return pos;
    }
}
```