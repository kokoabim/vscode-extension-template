import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

// TEMPLATE-REMOVE-START
import { homedir } from "os";
import { ExtensionProjectSettings, VSCodeExtensionProjectGenerator } from "../Utilities/VSCodeExtensionProjectGenerator";
import { FileSystem } from "../Utilities/FileSystem";
import { VSCodeApi } from "./VSCodeApi";
// TEMPLATE-REMOVE-END

// TODO: rename 'ExtensionTemplateVSCodeExtension' class to reflect the name of your extension and this file
export class ExtensionTemplateVSCodeExtension extends VSCodeExtension {
    // TEMPLATE-REMOVE-START
    private readonly extensionProjectGenerator: VSCodeExtensionProjectGenerator;
    private readonly fileSystem = new FileSystem();
    // TEMPLATE-REMOVE-END

    constructor(context: vscode.ExtensionContext) {
        // TEMPLATE-REMOVE-START
        super(context, true);

        this.extensionProjectGenerator = new VSCodeExtensionProjectGenerator(this, this.fileSystem.joinPath(this.context.extensionPath, "templates"));

        this.addCommands(this.createOpenNewExtensionProjectPanelCommand());
        // TEMPLATE-REMOVE-END

        /** TEMPLATE-ADD-START
        super(context); // NOTE: pass 'true' for 'createOutputChannel' to create an output channel

        this.addCommands(this.createSayHelloWorldCommand());
        TEMPLATE-ADD-END */
    }

    public static use(context: vscode.ExtensionContext): ExtensionTemplateVSCodeExtension {
        return new ExtensionTemplateVSCodeExtension(context);
    }

    private createSayHelloWorldCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.hello-world", async () => {
            const settings = ExtensionTemplateVSCodeExtensionSettings.singleton(true);
            await this.information(`Hello, ${settings.yourName}!`);
        });
    }

    // TEMPLATE-REMOVE-START
    private createCreateNewExtensionProjectCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.create-new-extension-project", async () => {
            const projectSettings = await this.promptForExtensionProjectSettings();
            if (!projectSettings) return;

            await this.createAndOpenNewExtensionProject(projectSettings);
        });
    }

    private createOpenNewExtensionProjectPanelCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.open-new-extension-project-panel", async () => {

            const webviewsPath = vscode.Uri.joinPath(this.context.extensionUri, "webviews");
            const webviewPath = vscode.Uri.joinPath(webviewsPath, "new-vscode-extension-project");

            const panel = vscode.window.createWebviewPanel(
                "extension-creator.new-vscode-extension-project",
                "VSCode Extension Creator",
                vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One,
                {
                    enableCommandUris: true,
                    enableScripts: true,
                    localResourceRoots: [
                        webviewsPath,
                        vscode.Uri.joinPath(this.context.extensionUri, "node_modules"),
                    ],
                    enableForms: true,
                }
            );
            panel.iconPath = vscode.Uri.joinPath(webviewPath, "images", "extension-64.png");
            panel.onDidChangeViewState((e) => {
                if (!e.webviewPanel.visible) {
                    panel.dispose();
                }
            });

            const bodyHtml = (await this.fileSystem.readFileAsString(webviewPath.fsPath, "body.html") ?? "").replace("{{defaultValue}}", `${homedir()}/Projects`);
            const nonce = getNonce();

            const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(webviewPath, "main.js"));
            const styleMainUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(webviewPath, "main.css"));
            const codiconsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));
            const bundleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(webviewPath, "bundle.js"));

            panel.webview.html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${panel.webview.cspSource}; script-src 'nonce-${nonce}'; font-src ${panel.webview.cspSource}; img-src ${panel.webview.cspSource};">
<link href="${styleMainUri}" rel="stylesheet" />
<link href="${codiconsUri}" rel="stylesheet" />
</head>
<body>
${bodyHtml}
<script src="${bundleUri}" nonce="${nonce}"></script>
<script src="${scriptUri}" nonce="${nonce}"></script>
</body>
</html>`;

            panel.webview.onDidReceiveMessage(async (message) => {
                console.log("Received message from webview:", message);

                if (message.type === "create-extension-project") {
                    const projectSettings: ExtensionProjectSettings = {
                        description: message.settings?.ext_description,
                        directory: message.settings?.proj_directory,
                        displayName: message.settings?.ext_displayName,
                        installDependencies: message.settings?.install_dependencies,
                        name: message.settings?.ext_name,
                        openInVSCode: message.settings?.open_in_vscode,
                        publisher: message.settings?.ext_publisher,
                        version: message.settings?.ext_version,
                    };

                    panel.dispose();

                    await this.createAndOpenNewExtensionProject(projectSettings);
                }
                else if (message.type === "cancel") {
                    panel.dispose();
                }
                else if (message.type === "select-project-location") {
                    const directoryUri = await vscode.window.showOpenDialog({
                        title: "Select project location",
                        canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
                        openLabel: "Select",
                        defaultUri: message.directory ? vscode.Uri.file(message.directory) : vscode.Uri.file(homedir() + "/Projects"),
                    });
                    if (directoryUri) {
                        panel.webview.postMessage({ type: "project-location-selected", directory: directoryUri[0].fsPath });
                    }
                }
            });

            panel.reveal();
        });
    }

    private async createAndOpenNewExtensionProject(projectSettings: ExtensionProjectSettings): Promise<void> {
        const didCreateProject = await this.extensionProjectGenerator.createNewExtensionProject(projectSettings);

        if (!didCreateProject || (projectSettings.installDependencies === false && projectSettings.openInVSCode === false)) return;

        if (projectSettings.installDependencies) {
            if (!await this.extensionProjectGenerator.installNpmDependenciesUsingNpmx(projectSettings.directory!, this)) {
                await this.modalError("Failed NPM dependencies", "Failed to install NPM dependencies. You will need to run './npmx.sh install' manually.");
            }
        }

        if (projectSettings.openInVSCode) {
            const openFolderSettings: VSCodeApi.IOpenFolderAPICommandOptions = {};

            if (await this.isWorkspaceOpen(false)) openFolderSettings.forceNewWindow = true;
            else openFolderSettings.forceReuseWindow = true;

            await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(projectSettings.directory!), openFolderSettings);
        }
    }

    private async promptForExtensionProjectSettings(): Promise<ExtensionProjectSettings | undefined> {
        const settings: ExtensionProjectSettings = {};

        const title = "Create new VSCode extension project";

        settings.displayName = await vscode.window.showInputBox({ title: title, prompt: "Display name. Ex: 'The Foo Bar'" });
        if (!settings.displayName) return;

        settings.publisher = await vscode.window.showInputBox({ title: title, prompt: "Publisher name. Ex: 'joe-or-jill-dev'" });
        if (!settings.publisher) return;

        settings.description = await vscode.window.showInputBox({ title: title, prompt: "Description. Ex: 'Do all sorts of foo's and bar's.'" });
        if (settings.description === undefined) return;

        const directoryUri = await vscode.window.showOpenDialog({
            title: title,
            canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
            openLabel: "Select Parent",
        });
        if (!directoryUri) return;
        settings.directory = directoryUri[0].fsPath;

        return settings;
    }
    // TEMPLATE-REMOVE-END
}

// TEMPLATE-REMOVE-START
function getNonce(): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
// TEMPLATE-REMOVE-END