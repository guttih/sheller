# Sheller

Download this extension from the [Visual Studio Code Marketplace][1]


This extension contains snippets and functions to help with writing bash scripts.
It includes, menus, parse options, text coloring, declaring functions and using them.

## Features

Snippets to help with bash development.

Included snippets:
 - **Boiler plate** Type *Bash Boilerplate* to create a new bash from scratch.
 - **Frame** type *frame* to create a function that prints a framed text to the terminal.
 - **Menu** Type *menuOptions* to create a bash script menu, allowing the user to select text options using the up and down arrow keys.
 - **Creating functions** 
    - type *function* to create a new function with comments
    - type *function 1 argument* to create a new function which accepts one parameter
    - type *function 2 arguments* to create a new function which accepts two parameter
    - type *function 3 arguments* to create a new function which accepts three parameter
 - **coloring text** Type *TextColors* to change the color of printed terminal text.
 - **help** Type *printHelp* To  create a help function for your bash script.
 - **Validate bash parameters** Type *parseOptions* to create a function for validating if parameters given to your bash script are correct.
 - **Does user have superuser privileges** Type *IsSuper* to check if user has superuser privileges(root).
 - **Disk snippets**
   - Does file or directory exist
   - List files or directories
 - **Time snippets**
   - Calulate time difference and add time
 - **String snippets** 
   - Match substring within a string
   - Search for string prefix
   - Search for postfix
  - **Many more** A complete snippet list can be found in the [table below](#list-of-all-snippets).

## Usage example

### Boiler plate
This is how the snippet **Boiler plate** can be used to create a bash file, with help and check for invalid parameters, making it runnable and test it.

![Boilerplate](images/boilerplate.gif)

### Frame
How to write text inside a box to the terminal using the function frame.

![frame](images/frame.gif)

## Release Notes

### 1.2.0
Updating parseOptions to handle required options and adding snippets for time
calculations.  Added file information snippets which allow you to extract path
and name from a file path.  Also added snippets for matching substrings in a string.

### 1.1.3
Making parseOption not dependant on the newest bash

### 1.1.2
Fixing disk functions to handle when filenames and paths have spaces.

### 1.1.1
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

### 1.0.0
Snippets included
 - Boiler plate
 - Frame
 - menu
 - functions
 - coloring text
 - help
 - Validate bash parameters
 - Is Super user

 ## List of all snippets

**Prefix** is what you type to select the desired snippet.

| Prefix  | Title | Description |
|:--------|:------|:------------|
| Time diff | Time difference  HH:mm:ss | Calculate time difference |
| Time now | Current time | Print current time on the format HH:mm:ss |
| Time in future | Add to current time | Add to current time |
| File exists | Checks if a file is found | Checks if a file is found |
| Dir exists | Checks if a directory is found | Checks if a Directory is found |
| List files | Iterate files in directory | Iterate files in directory |
| List dirs | Iterate only directories in directory | Iterate directories in directory |
| List files recursive | Iterate files in directory recursive | Iterate files in directory recursive |
| List files recursive reg | Iterate files in directory recursive regex | Iterate files in directory recursive regex |
| List dirs recursive | Iterate directories in directory recursively regex | Iterate directories in directory recursively |
| compare filenames in dir | Compare file names in two directories | Compare file names in two directories and prints out matching or missing file names |
| Get script dir | Script directory | Get path to the the current bash file |
| Get script name | Script Name | Get name of current script |
| Get file name | Extract filename | Extracts filename name from a file path |
| Get file directory | Extract file directory | Extracts directory from a file path. |
| Get file extension | Extract file extension |  Extract file extension from a file path. |
| bash | Start of bash | Start of bash |
| #Created | File creation time | File creation time |
| TextColors | Text Color commands | Text Color commands |
| function | Function | Create a function which takes no argument |
| function 1 argument | Function 1 argument | Create a function which takes 1 argument |
| function 2 arguments | Function 2 arguments | Create a function which takes 2 arguments |
| function 3 arguments | Function 3 arguments | Create a function which takes 3 arguments |
| Print help | Script help function | Script help function |
| Print help, one option | Help function with one option | Help function with one option |
| Print help, one option, one option argument | Help function with one option and one option argument | Help function with one option and one option argument |
| Boilerplate 1, hello world | Boilerplate simple | Boilerplate simple Hello bash world |
| Boilerplate 2, simple one option | Boilerplate, simple one option | Boilerplate bash script with help that accepts one optional parameter |
| Boilerplate 3, one opt and one optArg | Boilerplate, one option, one option argument | Boilerplate with one option and one option which requires a argument |
| parseOptions | Check if all options are valid and saves each in a variable | Check if all options are valid and saves each in a variable |
| IsSuper | Only allow super user to run this script | Only allow super user to run this script |
| frame | Frame your text | Frame your text |
| menuOptions | Select pre defined option | Select pre defined option |
| arrayContains | Searches for an string within an array of strings | Searches for an string within an array of strings |
| String prefix length | Prefix search known length | Check if a string starts with a specific text and is of a specific lengthS |
| String starts with | Prefix search with wildcard | Check if string starts with using wild card |
| String ends with | Postfix search | Check if string ends with |


[Top](#sheller)

[1]: https://marketplace.visualstudio.com/items?itemName=guttih.sheller
