---
tags:
  - HashTable
  - SlidingWindow
difficulty: medium
completed: true
number: 438
---
```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int[] candidate = new int[26];
        int[] base = new int[26];
        List<Integer> result = new ArrayList<>();
        
        //init
        if (s.length() < p.length()) return result;
        for (char ch : p.toCharArray()) base[ch - 'a']++;
        for (int i = 0; i < p.length(); i++) candidate[s.charAt(i) - 'a']++;


        for (int rs = p.length(), ls = 0; rs <= s.length(); rs++, ls++) {
            if (isEqual(candidate, base)) result.add(ls);

            if (rs < s.length()) {
                candidate[s.charAt(ls) - 'a']--;
                candidate[s.charAt(rs) - 'a']++;
            }
        }

        return result;
    }

    private boolean isEqual(int[] candidate, int[] base) {
        for (int i = 0; i < 26; i++) {
            if (candidate[i] != base[i]) {
                return false;
            }
        }
        return true;
    }
}
```