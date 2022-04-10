// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import * as path from 'path';
// import * as cp from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let outputChannel: vscode.OutputChannel | null = null;
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sheller" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
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

		// The command has been defined in the package.json file
		// Now provide the implementation of the command with  registerCommand
		// The commandId parameter must match the command field in package.json
		let disposable3 = vscode.commands.registerCommand('sheller.selTextToSnippet', async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor){
			if (editor.selection.isEmpty) {
				vscode.window.showErrorMessage('You need select a text first for convert to a snippet');
			} else {
				let txt = editor;
				// let content = txt.document.getText(txt.selection);
				
				// let snippetTitle = await vscode.window.showInputBox({
				// 	placeHolder: 'Snippet Title',
				// 	prompt: 'A short title information about your snippet.',
				// });
				// let descricaoSnippet = await vscode.window.showInputBox({
				// 	placeHolder: 'A long description about your code',
				// 	prompt: 'Describe what this snippet will do.',
				// });
				// let atalhoSnippet = await vscode.window.showInputBox({
				// 	placeHolder: 'prefix',
				// 	prompt: 'How your snippet will be activated in code completition.',
				// });;
				let content = txt.document.getText(txt.selection);
				
				let snippetTitle = 'title'+txt.document.fileName;
				let doc: vscode.TextDocument = editor.document;
				
				
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
				content=content.replace(/\\/g, '\\\\');
				content=content.replace(/\$/g, '\\\$');
				let newSnippet = {
					[snippetTitle]: {
						prefix: snippetPrefix,
						 body: content.split('\n'),
						
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

	context.subscriptions.push(disposable, disposable2, disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}
