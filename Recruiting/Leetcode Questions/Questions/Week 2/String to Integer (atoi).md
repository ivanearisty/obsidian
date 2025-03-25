---
tags:
  - Strings
difficulty: medium
completed: true
number: 8
---
```java
class Solution {
    public int myAtoi(String s) {
        
        boolean parsing = false;
        int sum = 0;
        boolean negative = false;
        
        for(char ch : s.toCharArray()){
            
            if(Character.isLetter(ch) || ch == '.'){
                return negative == false ? sum : -(sum);
            }
            
            if(parsing){
                if(!Character.isDigit(ch)) return negative == false ? sum : -(sum);

                int curr = Character.getNumericValue(ch);

                try{
                    sum = Math.multiplyExact(sum,10);
                    sum = Math.addExact(curr, sum);
                }catch(ArithmeticException e){
                    return negative == false ? Integer.MAX_VALUE : Integer.MIN_VALUE;
                }
            }else{
                if(ch == '-') {
                    negative = true;
                    parsing = true;
                    continue;
                } else if(ch == '+') {
                    parsing = true;
                    continue;
                } else if(Character.isDigit(ch)) {
                    parsing = true;
                    sum = Character.getNumericValue(ch);
                } else {
                    continue;
                }
            }
        }

        return negative == false ? sum : -(sum);
    }
}
```

```java
class Solution {
    public int myAtoi(String s) {
        
        if(s.length() == 0) return 0;

        int i = 0;
        boolean sign = true;
        int result = 0;

        while(s.charAt(i) == ' '){
            i++;
            if(i >= s.length()) return 0;
        }
        
        if(i >= s.length()) return 0;

        if(s.charAt(i) == '-'){
            sign = false;
            i++;
        } else if(s.charAt(i) == '+'){
            i++;
        } else{
        }

        while(i < s.length()){
            int digit = s.charAt(i++) - '0';
            if(digit > 9 || digit < 0) break;

            if (result > (Integer.MAX_VALUE - digit) / 10){
                return sign ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }

            result = result * 10 + digit;

        }

        result /= 10;

        return sign ? result : -result;
    }
}
```