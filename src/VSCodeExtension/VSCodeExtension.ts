import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";

export abstract class VSCodeExtension {
    protected context: vscode.ExtensionContext;
    protected fullName: string;
    protected outputChannel: vscode.OutputChannel | undefined;
    protected shortName: string;
    protected workspaceFolder?: vscode.WorkspaceFolder;

    constructor(context: vscode.ExtensionContext, createOutputChannel = false) {
        this.context = context;
        this.fullName = this.jsonValue("displayName");
        this.shortName = this.jsonValue("shortName");

        if (createOutputChannel) this.outputChannel = vscode.window.createOutputChannel(this.shortName);
    }

    protected addCommands(...commands: VSCodeCommand[]): void {
        commands.forEach(c => this.context.subscriptions.push(vscode.commands.registerCommand(c.name, c.command)));
    }

    protected clearOutput(): void {
        this.outputChannel?.clear();
    }

    protected async error(message: string): Promise<void> {
        await vscode.window.showErrorMessage(`${this.shortName}: ${message}`);
    }

    protected async getTextDocument(trySelectedIfNotActive = true, showWarningMessage = true): Promise<vscode.TextDocument | undefined> {
        let document;
        try {
            document = vscode.window.activeTextEditor?.document;
            if (document) { return document; }

            if (trySelectedIfNotActive) {
                await vscode.commands.executeCommand('copyFilePath');
                const clipboard = await vscode.env.clipboard.readText();
                if (clipboard) {
                    document = await vscode.workspace.openTextDocument(clipboard);
                    if (document) { return document; }
                }
            }
        }
        // eslint-disable-next-line no-unused-vars
        catch (e) { }

        if (showWarningMessage) { this.warning("No document opened or selected."); }

        return undefined;
    }

    protected async information(message: string): Promise<void> {
        await vscode.window.showInformationMessage(`${this.shortName}: ${message}`);
    }

    protected async isWorkspaceOpen(showWarningMessage = true): Promise<boolean> {
        this.workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;

        if (!this.workspaceFolder) {
            if (showWarningMessage) await this.warning("No workspace is open.");
            return false;
        }

        return true;
    }

    protected jsonValue(name: string): any {
        return this.context.extension.packageJSON[name];
    }

    protected output(message: string, show = false, preserveFocus = true): void {
        if (!this.outputChannel) return;

        if (show) this.outputChannel.show(preserveFocus);
        this.outputChannel.append(message);
    }

    protected outputLine(message: string, show = false, preserveFocus = true): void {
        if (!this.outputChannel) return;

        if (show) this.outputChannel.show(preserveFocus);
        this.outputChannel.appendLine(message);
    }

    protected showOutput(preserveFocus = true): void {
        if (!this.outputChannel) return;

        this.outputChannel.show(preserveFocus);
    }

    protected async warning(message: string): Promise<void> {
        await vscode.window.showWarningMessage(`${this.shortName}: ${message}`);
    }
}