// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import * as path from 'path';
// import * as cp from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let outputChannel: vscode.OutputChannel | null = null;
	
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sheller" is now active!');

	let disposable = vscode.commands.registerCommand('sheller.message', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('This is a message from sheller!');
	});

	let disposable2 = vscode.commands.registerCommand('sheller.reverseWord', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const word = document.getText(selection);
			const reversed = word.split('').reverse().join('');
			editor.edit(editBuilder => {
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
	function contentToSnippetBody(content:string):string[] {
		content=content.replace(/\\/g, '\\\\');
		content=content.replace(/\$/g, '\\\$');
		return content.split('\n');
	}

		let disposable3 = vscode.commands.registerCommand('sheller.selTextToSnippetNoAsk', async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor){
			if (editor.selection.isEmpty) {
				vscode.window.showErrorMessage('You need select a text first for convert to a snippet');
			} else {
				let txt = editor;
				let content = txt.document.getText(txt.selection);
				
				let snippetTitle = 'title';//+txt.document.fileName;
				// let doc: vscode.TextDocument = editor.document;
				
				
				let snippetDescription = 'package';
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
				let snippetPrefix = 'prefixName';
				let newSnippet = {
					[snippetTitle]: {
						prefix: snippetPrefix,
						 body: contentToSnippetBody(content),
						
						description: snippetDescription,
					}
				};
				if (outputChannel === null) {
					outputChannel = vscode.window.createOutputChannel('Snippet');
				}
				outputChannel.clear();
				outputChannel.append(JSON.stringify(newSnippet, null, 4));
				outputChannel.show();
			}}
		});
		let disposable4 = vscode.commands.registerCommand('sheller.selTextToSnippet', async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor){
			if (editor.selection.isEmpty) {
				vscode.window.showErrorMessage('You need select a text first for convert to a snippet');
			} else {
				let txt = editor;
				
				let snippetDescription:string|undefined = await vscode.window.showInputBox({
					placeHolder: 'A long description about your code',
					prompt: 'Describe what this snippet will do.',
				});
				if (snippetDescription === undefined) { return;	}

				let snippetPrefix:string|undefined = await vscode.window.showInputBox({
					placeHolder: 'prefix',
					prompt: 'How your snippet will be activated in code completion.',
				});
				if (snippetPrefix === undefined) { return;	}

				let snippetTitle:string|number|symbol|undefined = await vscode.window.showInputBox({
					value:`${snippetPrefix.toUpperCase()}`,
					placeHolder: 'Snippet Title',
					prompt: 'A short title information about your snippet.',
				});
				if (snippetTitle === undefined) { return;	}
				
				let content = txt.document.getText(txt.selection);
				
				let newSnippet = {
					[snippetTitle]: {
						prefix: snippetPrefix,
						body: contentToSnippetBody(content),
						description: snippetDescription,
					}
				};
				if (outputChannel === null) {
					outputChannel = vscode.window.createOutputChannel('Snippet');
				}
				outputChannel.clear();
				outputChannel.append(JSON.stringify(newSnippet, null, 4));
				outputChannel.show();
			}}
		});

	context.subscriptions.push(disposable, disposable2, disposable3, disposable4);
}

// this method is called when your extension is deactivated
export function deactivate() {}
