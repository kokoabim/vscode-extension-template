import * as vscode from "vscode";

import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtensionUI } from "./VSCodeExtensionUI";

export abstract class VSCodeExtension implements VSCodeExtensionUI {
    protected context: vscode.ExtensionContext;
    protected fullName: string;
    protected outputChannel: vscode.OutputChannel | undefined;
    protected shortName: string;
    protected workspaceFolder?: vscode.WorkspaceFolder;

    constructor(context: vscode.ExtensionContext, createOutputChannel = false) {
        this.context = context;
        this.fullName = this.jsonValue("displayName");
        this.shortName = this.jsonValue("shortName") || this.fullName;

        if (createOutputChannel) this.outputChannel = vscode.window.createOutputChannel(this.shortName);
    }

    public channelOutput(message: string, show = false, preserveFocus = true): void {
        if (!this.outputChannel) return;

        if (show) this.outputChannel.show(preserveFocus);
        this.outputChannel.append(message);
    }

    public channelOutputLine(message: string, show = false, preserveFocus = true): void {
        if (!this.outputChannel) return;

        if (show) this.outputChannel.show(preserveFocus);
        this.outputChannel.appendLine(message);
    }

    public clearChannel(show = false, preserveFocus = true): void {
        if (!this.outputChannel) return;

        this.outputChannel.clear();

        if (show) this.outputChannel.show(preserveFocus);
    }

    public async error(message: string, noPrefix = false): Promise<void> {
        await vscode.window.showErrorMessage(`${noPrefix ? "" : `${this.shortName}: `}${message}`);
    }

    public async information(message: string, noPrefix = false): Promise<void> {
        await vscode.window.showInformationMessage(`${noPrefix ? "" : `${this.shortName}: `}${message}`);
    }

    public async modalError(title: string, detail: string, ...items: string[]): Promise<string | undefined> {
        return await vscode.window.showErrorMessage(title, { detail: detail, modal: true }, ...items);
    }

    public async modalInformation(title: string, detail: string, ...items: string[]): Promise<string | undefined> {
        return await vscode.window.showInformationMessage(title, { detail: detail, modal: true }, ...items);
    }

    public async modalWarning(title: string, detail: string, ...items: string[]): Promise<string | undefined> {
        return await vscode.window.showWarningMessage(title, { detail: detail, modal: true }, ...items);
    }

    public showChannel(preserveFocus = true): void {
        if (!this.outputChannel) return;

        this.outputChannel.show(preserveFocus);
    }

    public async warning(message: string, noPrefix = false): Promise<void> {
        await vscode.window.showWarningMessage(`${noPrefix ? "" : `${this.shortName}: `}${message}`);
    }

    protected addCommands(...commands: VSCodeCommand[]): void {
        commands.forEach(c => this.context.subscriptions.push(vscode.commands.registerCommand(c.name, c.command)));
    }

    protected async getTextDocument(trySelectedIfNotActive = true, showWarningMessage = true): Promise<vscode.TextDocument | undefined> {
        let document: vscode.TextDocument | undefined;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (e) { }

        if (showWarningMessage) { this.warning("No document opened or selected."); }

        return undefined;
    }

    protected async getTextEditor(showWarningMessage = true): Promise<vscode.TextEditor | undefined> {
        const textEditor = vscode.window.activeTextEditor;
        if (!textEditor && showWarningMessage) await this.warning("No editor is open.");
        return textEditor;
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
}
