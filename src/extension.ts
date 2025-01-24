import * as vscode from "vscode";
import { ExtensionTemplateVSCodeExtension } from "./VSCodeExtension/ExtensionTemplateVSCodeExtension";

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating Extension Template...'); // TODO: rename 'Extension Template' to reflect the name of your extension
    ExtensionTemplateVSCodeExtension.use(context);
}

export function deactivate() { }
