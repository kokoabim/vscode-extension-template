import * as vscode from "vscode";
import { ExtensionTemplateVSCodeExtension } from "./VSCodeExtension/ExtensionTemplateVSCodeExtension";

export function activate(context: vscode.ExtensionContext) {
    console.log(`Activating ${context.extension.packageJSON["displayName"]} extension...`);
    ExtensionTemplateVSCodeExtension.use(context);
}

export function deactivate() { }
