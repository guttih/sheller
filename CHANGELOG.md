# Change Log

All notable changes to the "sheller" extension will be documented in this file.

## [1.3.4]

### Fixex

  Exiting correctly from a script if script is being sourced


## [1.3.3]

### Added

  - Snippets
    - Extract text between two tokens: `string substring` - Extract text between two tokens
    - Trim string: `string trim` - Remove leading and/or trailing whitespace characters


## [1.3.2]

### Added

  - Snippets
    - Is command installed: `is command installed` - Check if a command is installed


## [1.3.1]

### Added

  - Snippets
    - *is script sourced* - Check if your script is being sourced or not.  That is, if f.example environment variables created will effect the  calling shell
    - *string remove trailing numbers* - Function to removes all digits from the end of a string

  - In the project build process, when releasing a new version of Sheller.  When a version is bumped, the version string is added to the list of versions in the *bug_report.yml* automatically.


## [1.3.0]

### Removed

  - Snippets
    - *IsSuper*
    * *#Created*
### Added

  - Snippet *created*
  - Snippets which all now point to the same snippet code that was *IsSuper*
    - *is super*
    - *is root*
    - *is sudo*

### Changed 
  - Snippets should not start with a capital letter so I lower cased 
    the following snippets.  (Snowing the old prefix value)
    - *Time diff*
    - *Time now*
    - *Date and Time now*
    - *Time in future*
    - *File exists*
    - *Dir exists*
    - *List files*
    - *List dirs*
    - *List files recursive*
    - *List files recursive reg*
    - *List dirs recursive*
    - *Get script dir*
    - *Get script name*
    - *Get file name*
    - *Get file directory*
    - *Get file extension*
    - *#Created* - now `created`
    - *Source sh*
    - *Print help*
    - *Print help*
    - *Print help*
    - *Boilerplate 1*
    - *Boilerplate 2*
    - *Boilerplate 3*
    - *parse options*
    - *IsSuper* - now `is super`
    - *Extract argument name*
    - *String prefix length*
    - *String starts with*
    - *String ends with*

## [1.2.18]

### Changed
  - Fixed these snippets by escaping the $ sign
    - *IsSuper*
    - *List dirs*

## [1.2.17]

### Added
  - Now you can right-click in a editor window with open shellscript and 
    select *Make a file executable (chmod +x permission)*.  No need to 
    do this for windows, so this option is never shown there.
  - Added a setting for the extension where user can make all shellscripts he saves
    executable.  By default this option **Make executable** is disabled.

## [1.2.15]

### Added
 
 - Snippet *extract filename*

### Changed 
 - Snippets
    - *parse options* - Using values that require arguments on the form argumentName="This is my argument value"
    - *Boilerplate 3* - Same change as above
## [1.2.14]

### Added
 
 - Snippets
    - *Extract argument name from option*
    - *Extract argument value from option*

### Changed 
 - Snippets
    - *parse options* - Using values that require arguments on the form argumentName="This is my argument value"
    - *Boilerplate 3* - Same change as above

extractArgumentName
## [1.2.13]
Updating boilerplate 3, making it accept options that need arguments on 
 - this new format `myScript.sh -variable="value here"`
 - instead of old `myScript.sh -variable "value here"`
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