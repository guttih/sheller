# Change Log

All notable changes to the "sheller" extension will be documented in this file.

## [1.2.14]

### Added
  
 - Snippets
    - *Extract argument name from option*
    - *Extract argument value from option*

### Changed 
 - snippet *parse options*

extractArgumentName
## [1.2.13]
Updating boilerplate 3, making it accept options that need arguments on 
 - this new format `myscript.sh -variable="value here"`
 - instead of old `myscript.sh -variable "value here"`
## [1.2.12]
Bumping version to make repo match version on marketplace.
## [1.2.11]
Minor, adding more prefixes for read from- and write to a ini file.
## [1.2.10]
Adding snippets *text colors table* which prints out all terminal colors in a table
## [1.2.9]
Adding snippets *Current date & time* and *Create multiline file*
## [1.2.8]
Adding snippets *replace text in file* and *replace text in file that starts with*
## [1.2.7]
Adding snippet with Substring with cut examples

## [1.2.6]
Read from and write to ini files.  That is, read and write section key value pairs.

Here is an example of a content of a ini configuration file
```
[section1]
key1=123
enabled=false
message=This is a message stored in a ini file

[AnotherSection]
anotherKey=blue is a color

```
## [1.2.5]
Adding command to make current file executable
## [1.2.4]
Adding for, case and read text file snippets.
## [1.2.3]
Adding snippets *source sh* and *declare array*
## [1.2.2]
Adding -line and -dLine options to the frame snippet.

## [1.2.1]
Minor changes.

## [1.2.0]
Updating parseOptions to handle required options and adding snippets for time
calculations.  Added file information snippets which allow you to extract path
and name from a file path.  Also added snippets for matching substrings in a string.

## [1.1.3]
removing usage on `declare -n` in parseOption because it is not well supported.

## [1.1.2]
Fixing disk functions to handle when filenames and paths have spaces.

## [1.1.1]
Added snippets
  - File exists
  - Dir exists
  - List files
  - List files recursive
  - List dirs
  - arrayContains

Added more extensive *boilerplate* and *parseOptions* snippets does better
parsing of parameters.  Added warningColor to coloring text functions.
Also added two alternative help functions.

## [1.0.0]

Publishing this extension with snippets for menu, parse options, super-user 
checking, function creation, coloring terminal texts, shell script help and titles. 