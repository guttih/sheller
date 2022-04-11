# Sheller

Download this extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=guttih.sheller)


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
   - Does file or directory exist** 
   - List files or directories**
 - **Time snippets**
   - Calulate time difference and add time
 - **String snippets** 
   - Match substring within a string
   - Does string start with Type *String starts with* to check if string starts with using wild card
   - Does string end with Type *String ends with* to check if string ends with
 - **Search for an string within an array** type *arrayContains* Searches for an string within an array of strings.
 - ...and many more.  View [all available snippets](https://github.com/guttih/sheller/blob/master/snippetList.md)

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

