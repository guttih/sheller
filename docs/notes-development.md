# Development Notes

This document is only used by the developer to write notes and stuff 
while developing this extension

- Throw away from the beginning of a string everything that is not a letter or a digit
  - `tmp="--dir="/path/to/dir""; echo -e "First: $tmp\nAfter: ${tmp#"${tmp%%[[:alpha:][:digit:]]*}"}"`
    - output
    	```shell
        First: --dir=/path/to/dir
        After: dir=/path/to/dir
        ``` 