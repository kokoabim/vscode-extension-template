import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "extension-template" is now active!');

    const disposable = vscode.commands.registerCommand('extension-template.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Extension Template!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }