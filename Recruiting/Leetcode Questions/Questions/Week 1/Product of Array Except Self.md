---
tags:
  - Array
difficulty: medium
completed: true
number: 238
---
```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        
        int [] outputArr = new int [nums.length];
        
        Arrays.fill(outputArr, 1);

        for(int i = 1 ; i < nums.length ; i++){
            outputArr[i] = outputArr[i-1] * nums[i-1];
        }

        int runningProduct = nums[nums.length - 1];

        for(int i = nums.length - 2 ; i >= 0 ; i--){
            //the output array entry is everything to the current's left times the running product
            outputArr[i] = outputArr[i] * runningProduct;
            
            //update running product by multiplying it by self
            runningProduct *= nums[i];
        }
        return outputArr;
    }
}
```