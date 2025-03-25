---
tags:
  - Matrix
difficulty: medium
completed: true
number: 73
---
```java
class Solution {
    public void setZeroes(int[][] matrix) {
        boolean firstRowContainsZeroes = false;
        boolean firstColContainsZeroes = false;

        // Check first row
        for (int col = 0; col < matrix[0].length; col++) {
            if (matrix[0][col] == 0) {
                firstRowContainsZeroes = true;
                break;
            }
        }

        // Check first column
        for (int row = 0; row < matrix.length; row++) {
            if (matrix[row][0] == 0) {
                firstColContainsZeroes = true;
                break;
            }
        }

        // Flag the zero elements
        for (int row = 1; row < matrix.length; row++) {
            for (int col = 1; col < matrix[0].length; col++) {
                if (matrix[row][col] == 0) {
                    matrix[row][0] = 0;
                    matrix[0][col] = 0;
                }
            }
        }

        // Nullify rows
        for (int row = 1; row < matrix.length; row++) {
            if (matrix[row][0] == 0) {
                nullifyRow(matrix, row);
            }
        }

        // Nullify columns
        for (int col = 1; col < matrix[0].length; col++) {
            if (matrix[0][col] == 0) {
                nullifyCol(matrix, col);
            }
        }

        // Take care of first row
        if (firstRowContainsZeroes) {
            nullifyRow(matrix, 0);
        }

        // Take care of first column
        if (firstColContainsZeroes) {
            nullifyCol(matrix, 0);
        }
    }

    public void nullifyRow(int[][] matrix, int index) {
        for (int col = 0; col < matrix[0].length; col++) {
            matrix[index][col] = 0;
        }
    }
    
    public void nullifyCol(int[][] matrix, int index) {
        for (int row = 0; row < matrix.length; row++) {
            matrix[row][index] = 0;
        }
    } 
}

```