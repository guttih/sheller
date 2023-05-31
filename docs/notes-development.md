# Development Notes

This document is only used by the developer to write notes and stuff 
while developing this extension

## Snippets

### boilerplate 3

  I should store the whole user input not just what comes before the `-` sign
  and when using each var I should just trip what comes before and after the var name
  
  I should store one variable with the - signs prepended
- Throw away from the beginning of a string everything that is not a letter or a digit
  - `tmp="--dir="/path/to/dir""; echo -e "First: $tmp\nAfter: ${tmp#"${tmp%%[[:alpha:][:digit:]]*}"}"`
    - output
    	```shell
        First: --dir=/path/to/dir
        After: dir=/path/to/dir
        ``` 
