# Development for Sheller
Some useful things for the developer of this project

## Help
Documentation to look at when developing extensions
 - **Development** [Development](https://code.visualstudio.com/api/get-started/your-first-extension)
 - **Snippets** [Snippet Guide](https://code.visualstudio.com/api/language-extensions/snippet-guide)
 - **VS Code API** This [page](https://code.visualstudio.com/api/references/vscode-api) is comiled from this [file](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.d.ts).


## Development

### Converting code to extension
  - [Snippet Guide](https://code.visualstudio.com/api/language-extensions/snippet-guide)
    -   [Variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables)
  - [Language Configuration Guide](https://code.visualstudio.com/api/language-extensions/language-configuration-guide)
  - [Snippet generator](https://snippet-generator.app/) Converting code to snippet 

### Adding a new snippet file to your extension
  1. Create the json file in [snippets](snippets) directory 
  2. Add reference to the file in [package.json](package.json) under contributes.snippets

### Testing your extension
  1. Open the file [index.ts](src/extension.ts) in vscode
  2. Press **F5** to run the extension
  3. Test your extension

## Deployment
### Creating the package
In this example we use 1.0.0 as the example version number, you will need to bump it every time you release.

1. cd into the root dir of sheller
2. Export snippet list to markdown 
  - by running 
    ```
    npm run prepare
    ```
  - or if you want to want to increase the version number by one, run with parameter *-bump* like so
    ```
    npm run bump
    ```
    which will increment three version numbers, one in file [package.json] and two [package-lock.json].
3. Add to Release notes for this version in *CHANGELOG.md*
    - Supply information about what changed in the automatically added version section in the [CHANGELOG.md]
4. Make the package with the command below after changing `1.0.0` to the correct version number.

    **vsce** should be installed, if not give command `npm install -g vsce`
    **install** project should be installed `npm i`
    ```
    vsce package 1.0.0
    ```
    Test the package by installing it
    ```
    code --install-extension sheller-1.0.0.vsix
    ```
    Distribute the file `sheller-1.0.0.vsix`
    ```
    vsce publish
    ```
    If distribution fails you probably have an expired Personal Access Token so 
    get a new one [here]( https://aka.ms/vscodepat) or [maybe here](https://guttih.visualstudio.com/_usersSettings/tokens) and do the following
    1. `vsce login guttih` and press `y`and return and paste then newly created PAT
    
    2. `vsce publish` This should publish an update to your extension.

   


[Release notes]:./README.md#release-notes
[CHANGELOG.md]:./CHANGELOG.md
[package.json]:./package.json
[package-lock.json]:./package-lock.json


