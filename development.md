# Development for Sheller
Some useful things for the developer of this project

## Creating the package
In this example we use 0.0.2 as the example version number, you will need to bump it every time you release.
1. Increment the version number in files `package.json` and `package-lock.json`
2. Add to [Release notes] for this version in README.md
    - Add an section under **Release Notes** called **# 0.0.2"
    - Add some notes about what was done in this release.
3. Make the package with the command below after changing `0.0.2` to the correct version number
    ```
    vsce package 0.0.2
    ```
4. Distribute the file `sheller-0.0.2.vsix`

[Release notes]:./README.md#release-notes