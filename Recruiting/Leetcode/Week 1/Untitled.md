```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int lhs = 0;
        int rhs = numbers.length - 1;
        int sum = target - numbers[lhs] - numbers[rhs];

        while(lhs < rhs){
            if(sum == 0) return new int [] {lhs+1, rhs+1};

            if(sum < 0){
                sum += numbers[rhs--];
                sum -= numbers[rhs];
            }else{
                sum += numbers[lhs++];
                sum -= numbers[lhs];
            }
        }

        return null; 
    }
}
```