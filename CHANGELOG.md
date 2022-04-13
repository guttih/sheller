# Change Log

All notable changes to the "sheller" extension will be documented in this file.

### [1.2.2]
Adding -line and -dLine options to the frame snippet.

### [1.2.1]
Minor changes.

### [1.2.0]
Updating parseOptions to handle required options and adding snippets for time
calculations.  Added file information snippets which allow you to extract path
and name from a file path.  Also added snippets for matching substrings in a string.

### [1.1.3]
removing usage on `declare -n` in parseOption because it is not well supported.

### [1.1.2]
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