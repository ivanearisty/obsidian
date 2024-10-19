---
tags: []
difficulty: medium
completed: false
number: 151
---
```java
class Solution {
    public String reverseWords(String s) {
        char [] words = s.toCharArray();
        StringBuilder sb = new StringBuilder();

        swap(words,0,words.length - 1);
        reverse(words);
        return clean(words);
    }

    private void swap(char [] words, int s, int f){
        for(int ls = s, rs = f; ls < rs ; ls++, rs--){
            char temp = words[ls];
            words[ls] = words[rs];
            words[rs] = temp;
        }
    }

    private void reverse(char [] arr){
        int rt = 0;
        int lt = 0;
        while(rt < arr.length){
            if(rt < arr.length && arr[rt] == ' '){
                rt++;
                lt = rt;
            }
            while(rt < arr.length && arr[rt] != ' ' ){
                rt++;
            }
            swap(arr,lt,rt-1);
        }
    }

    private String clean(char [] arr) {
        StringBuilder sb = new StringBuilder();
        int l = 0;
        int r = 0;
        while(true){
            if(r >= arr.length){
                break;
            }else if(arr[r] == ' '){
                r++;
                l = r;
                continue;
            }else{
                while(r < arr.length && arr[r] != ' '){
                    r++;
                }
                while(l < r){
                    sb.append(arr[l++]);
                }
                sb.append(' ');
            }
        }
        return sb.substring(0,sb.length() - 1);
    }
}
```