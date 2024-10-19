---
tags:
  - In-Place-LinkedList
  - TwoPointers
difficulty: easy
completed: true
number: 234
---
```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        
        ListNode slow = head;
        ListNode fast = head;
        ListNode prev = null;

        while(true){
            if(fast == null){ //even
                break;
            }
            if(fast.next == null){ //odd
                slow = slow.next;
                break;
            }
            //continue to end
            fast = fast.next.next;

            //reversal
            ListNode temp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = temp;
        }

        while(slow != null){
            if(prev.val != slow.val) return false;
            slow = slow.next;
            prev = prev.next;
        }

        return true;
    }
}
```