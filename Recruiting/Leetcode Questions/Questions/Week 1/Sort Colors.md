---
tags:
  - Array
  - TwoPointers
  - Sorting
difficulty: medium
completed: true
number: 75
---
```java
class Solution {

    enum Color {
        RED,
        WHITE,
        BLUE
    }

    public void sortColors(int[] nums) {
        
        int lhs = 0; 
        int rhs = nums.length - 1; 
        int boundry = 0; 

        while(boundry <= rhs) {
            if(getColor(nums[boundry]) == Color.RED) {
                swap(nums, boundry, lhs);
                lhs++;
                boundry++;
            } else if(getColor(nums[boundry]) == Color.WHITE) {
                boundry++;
            } else if(getColor(nums[boundry]) == Color.BLUE) {
                swap(nums, boundry, rhs);
                rhs--;
            } else {
                System.out.println("Something went wrong");
                break;
            }
        }
    }

    private void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    private Color getColor(int numericalRepresentation) {
        if(numericalRepresentation == 0) return Color.RED;
        if(numericalRepresentation == 1) return Color.WHITE;
        if(numericalRepresentation == 2) return Color.BLUE;
        else throw new RuntimeException("Weird Color");
    }

}
```

