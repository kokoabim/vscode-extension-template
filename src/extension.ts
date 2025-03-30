import * as vscode from "vscode";
import { ExtensionTemplateVSCodeExtension } from "./VSCodeExtension/ExtensionTemplateVSCodeExtension";

export function activate(context: vscode.ExtensionContext): void {
    console.log(`Activating ${context.extension.packageJSON["displayName"] ?? "Unnamed"} extension...`);
    ExtensionTemplateVSCodeExtension.use(context);
}

export function deactivate(): void { }
