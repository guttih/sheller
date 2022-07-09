// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { DiskFunctions } from "./diskFunctions";

// import * as path from 'path';
// import * as cp from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let outputChannel: vscode.OutputChannel | null = null;

    // This line of code will only be executed once when your extension is activated
    console.log("sheller is active! ");

    const showEditorMenuMakeExecutable = (value: boolean, document?: vscode.TextDocument) => {
        if (process.platform === "win32") {
            //No need to do this for windows
            vscode.commands.executeCommand("setContext", "sheller.showMenuMakeScriptExecutable", false);
            false;
        }
        if (value && document) {
            value = document.languageId === "shellscript" && document.uri.scheme === "file";
            if (value) {
                const fullFilename = document.uri.fsPath;
                value = DiskFunctions.fileExists(fullFilename) && !DiskFunctions.isFileAccessExecutable(fullFilename);
            }
        }
        console.log(`onSelected setting sheller.showMenuMakeScriptExecutable=${value}`);
        vscode.commands.executeCommand("setContext", "sheller.showMenuMakeScriptExecutable", value);
    };
    showEditorMenuMakeExecutable(false);

    let disposable = vscode.commands.registerCommand("sheller.message", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("This is a message from sheller!");
    });

    let disposable2 = vscode.commands.registerCommand("sheller.reverseWord", function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the word within the selection
            const word = document.getText(selection);
            const reversed = word.split("").reverse().join("");
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, reversed);
            });
        }
    });

    /**
     * Converts text to a snippet body
     *
     * @param {string} content the text to be converted
     * @returns {string[]} Array of strings which can be used in a snippet body.
     */
    function contentToSnippetBody(content: string): string[] {
        content = content.replace(/\\/g, "\\\\");
        content = content.replace(/\$/g, "\\$");
        return content.split("\n");
    }

    let disposable3 = vscode.commands.registerCommand("sheller.selTextToSnippetNoAsk", async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (editor.selection.isEmpty) {
                vscode.window.showErrorMessage("You need select a text first for convert to a snippet");
            } else {
                let txt = editor;
                let content = txt.document.getText(txt.selection);

                let snippetTitle = "title"; //+txt.document.fileName;
                // let doc: vscode.TextDocument = editor.document;

                let snippetDescription = "package";
                // let fullFilename=doc.uri.fsPath;
                // let dir=path.dirname(fullFilename);
                // let isLinux = (process.platform === "linux");
                // let strCmd = `chmod +x "${fullFilename}\n"`;
                // let showInfo=vscode.window.showInformationMessage;
                // let showErr=vscode.window.showErrorMessage;
                // if (isLinux) {
                // 	cp.execFile(strCmd, (err, stdout, stderr) => {
                // 		console.log("stdoutX: " + stdout);
                // 		console.log("stderr: " + stderr);
                // 		if (err) {
                // 			console.log(`Unable to run command: ${strCmd}`);
                // 			showErr    (`Unable to run command: ${strCmd}`);
                // 			console.log("error: " + err);
                // 		} else {
                // 			showInfo(`Ran: ${strCmd}`);
                // 		}
                // 	});
                // }
                let snippetPrefix = "prefixName";
                let newSnippet = {
                    [snippetTitle]: {
                        prefix: snippetPrefix,
                        body: contentToSnippetBody(content),

                        description: snippetDescription,
                    },
                };
                if (outputChannel === null) {
                    outputChannel = vscode.window.createOutputChannel("Snippet");
                }
                outputChannel.clear();
                outputChannel.append(JSON.stringify(newSnippet, null, 4));
                outputChannel.show();
            }
        }
    });
    let disposable4 = vscode.commands.registerCommand("sheller.selTextToSnippet", async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            if (editor.selection.isEmpty) {
                vscode.window.showErrorMessage("You need select a text first for convert to a snippet");
            } else {
                let txt = editor;

                let snippetDescription: string | undefined = await vscode.window.showInputBox({
                    placeHolder: "A long description about your code",
                    prompt: "Describe what this snippet will do.",
                });
                if (snippetDescription === undefined) {
                    return;
                }

                let snippetPrefix: string | undefined = await vscode.window.showInputBox({
                    placeHolder: "prefix",
                    prompt: "How your snippet will be activated in code completion.",
                });
                if (snippetPrefix === undefined) {
                    return;
                }

                let snippetTitle: string | number | symbol | undefined = await vscode.window.showInputBox({
                    value: `${snippetPrefix.toUpperCase()}`,
                    placeHolder: "Snippet Title",
                    prompt: "A short title information about your snippet.",
                });
                if (snippetTitle === undefined) {
                    return;
                }

                let content = txt.document.getText(txt.selection);

                let newSnippet = {
                    [snippetTitle]: {
                        prefix: snippetPrefix,
                        body: contentToSnippetBody(content),
                        description: snippetDescription,
                    },
                };
                if (outputChannel === null) {
                    outputChannel = vscode.window.createOutputChannel("Snippet");
                }
                outputChannel.clear();
                outputChannel.append(JSON.stringify(newSnippet, null, 4));
                outputChannel.show();
            }
        }
    });
    const makeScriptExecutable = (document: vscode.TextDocument, displayMsgIfAccessChanged: boolean) => {
        const fullFilename = document.uri.fsPath;
        const wasExecutable = DiskFunctions.isFileAccessExecutable(fullFilename);
        if (wasExecutable) {
            return;
        }
        if (!DiskFunctions.addFileAccessExecutable(fullFilename)) {
            vscode.window.showErrorMessage(`Unable make the current file executable\n    "${fullFilename}" `);
        } else if (displayMsgIfAccessChanged && !wasExecutable) {
            vscode.window.showInformationMessage(`${DiskFunctions.getFilenameFromFilePath(document.uri.path.toString())} is now executable`);
            showEditorMenuMakeExecutable(false);
        }
    };

    let disposable5 = vscode.commands.registerCommand("sheller.makeScriptExecutable", (document: vscode.TextDocument) => {
        const editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            return;
        }

        document = editor.document;

        makeScriptExecutable(document, true);
    });

    let onSaveShellScriptFile = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (document.languageId === "shellscript" && document.uri.scheme === "file") {
           
            const check = vscode.workspace.getConfiguration().get<boolean>("shellscript.sheller.onSave.makeExecutable");
            if (check) {
                makeScriptExecutable(document, true);
            }
        }
    });


    // todo: find event when user right-clicks an tree node which is not selected this will not give the right-clicked tree-item, but the already selected item which I'm pretty sure the user did not mean to change
    // let onDidChange=vscode.workspace.onDidChangeConfiguration
    // onDidSelectItem
    // onDidChangeFileDecorations

    // onDidExpandElement
    // onDidChangeVisibility
    //TreeViewSelectionChangeEvent

    //onDidChangeActive
    //onDidChangeSelection
    //onDidChangeValue
    //onDidChangeTextDocument
    //onDidChangeCellStatusBarItems

    // onDidChangeActiveTextEditor
    // onDidChangeVisibleTextEditors

    //vscode.TreeItem
    //https://stackoverflow.com/questions/52797204/vscode-extension-how-to-select-a-tree-view-item-on-right-click

    const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
        // const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            //For Getting File Path
            let filePath = activeEditor.document.uri.path;
            console.log(`Active: ${filePath}`);
            showEditorMenuMakeExecutable(true, activeEditor.document);
        } else {
            showEditorMenuMakeExecutable(false);
        }
    });

    const onDidOpenTextDocument = vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {showEditorMenuMakeExecutable(true, document);});

    context.subscriptions.push(
        disposable,
        disposable2,
        disposable3,
        disposable4,
        disposable5,
        onSaveShellScriptFile,
        onDidOpenTextDocument, 
        onDidChangeActiveTextEditor);
        
};

// this method is called when your extension is deactivated
export function deactivate() {}
