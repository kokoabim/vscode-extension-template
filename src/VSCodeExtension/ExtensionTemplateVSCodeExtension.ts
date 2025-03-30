import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

// TEMPLATE-REMOVE-START
import { homedir } from "os";
import { ExtensionProjectGenerateSettings, VSCodeExtensionProjectGenerator } from "../Utilities/VSCodeExtensionProjectGenerator";
import { FileSystem } from "../Utilities/FileSystem";
import { VSCodeApi } from "./VSCodeApi";
import { VariableExpander } from "../Utilities/VariableExpander";
import { ExtensionPackageGenerateSettings, VSCodeExtensionPackageGenerator } from "../Utilities/VSCodeExtensionPackageGenerator";
// TEMPLATE-REMOVE-END

export class ExtensionTemplateVSCodeExtension extends VSCodeExtension {
    // TEMPLATE-REMOVE-START
    private readonly extensionPackageGenerator: VSCodeExtensionPackageGenerator;
    private readonly extensionProjectGenerator: VSCodeExtensionProjectGenerator;
    private readonly fileSystem = new FileSystem();
    // TEMPLATE-REMOVE-END

    constructor(context: vscode.ExtensionContext) {
        // TEMPLATE-REMOVE-START
        super(context, true);

        this.extensionPackageGenerator = new VSCodeExtensionPackageGenerator(this);
        this.extensionProjectGenerator = new VSCodeExtensionProjectGenerator(this, this.fileSystem.joinPath(this.context.extensionPath, "templates"));

        this.addCommands(this.createCreateExtensionCommand(), this.createPackageExtensionCommand());
        // TEMPLATE-REMOVE-END

        /** TEMPLATE-ADD-START
        super(context); // NOTE: pass 'true' for 'createOutputChannel' to create an output channel

        this.addCommands(this.createSayHelloWorldCommand());
        TEMPLATE-ADD-END */
    }

    /**
     * Main entry point for the extension. Call from 'activate' function in './src/extension.ts'
     */
    public static use(context: vscode.ExtensionContext): ExtensionTemplateVSCodeExtension {
        return new ExtensionTemplateVSCodeExtension(context);
    }

    /** TEMPLATE-ADD-START
    private createSayHelloWorldCommand(): VSCodeCommand {
        return new VSCodeCommand("{{name}}.hello-world", async () => {
            const settings = ExtensionTemplateVSCodeExtensionSettings.singleton(true);
            await this.information(`Hello, ${settings.yourName}!`);
        });
    }
    TEMPLATE-ADD-END */

    // TEMPLATE-REMOVE-START
    private createCreateExtensionCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.create-extension", async () => {
            await this.openCreateExtensionWebview();
        });
    }

    private createPackageExtensionCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.package-extension", async () => {
            await this.openPackageExtensionWebview();
        });
    }

    private async createExtensionProject(extensionProjectSettings: ExtensionProjectGenerateSettings): Promise<void> {
        const didCreateProject = await this.extensionProjectGenerator.generateExtensionProject(extensionProjectSettings);
        if (didCreateProject === false) return;

        if (extensionProjectSettings.installNpmDependencies === false && extensionProjectSettings.openInVSCode === false) {
            if (didCreateProject === true) await this.information("Extension project created");
            else await this.warning("Extension project created but with issues");
            return;
        }

        if (extensionProjectSettings.installNpmDependencies) {
            if (!await this.extensionProjectGenerator.installNpmDependenciesUsingNpmx(extensionProjectSettings.projectDirectory!, this)) {
                await this.modalError("Failed NPM package dependencies", "You will need to run './npmx.sh install' manually.");
            }
        }

        if (extensionProjectSettings.openInVSCode) {
            const openFolderSettings: VSCodeApi.IOpenFolderAPICommandOptions = {};

            if (await this.isWorkspaceOpen(false)) openFolderSettings.forceNewWindow = true;
            else openFolderSettings.forceReuseWindow = true;

            await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(extensionProjectSettings.projectDirectory!), openFolderSettings);
        }

        if (didCreateProject === true) await this.information("Extension project created");
        else await this.warning("Extension project created but with issues");
    }

    private async openCreateExtensionWebview(): Promise<void> {
        const settings = ExtensionTemplateVSCodeExtensionSettings.transientConfigured(settings => {
            settings.projectParentDirectory = VariableExpander.expandString(settings.projectParentDirectory);
        });

        const webviewsBasePathUri = vscode.Uri.joinPath(this.context.extensionUri, "webviews");
        const webviewsSharedPathUri = vscode.Uri.joinPath(webviewsBasePathUri, "shared");
        const nodeModulesPathUri = vscode.Uri.joinPath(this.context.extensionUri, "node_modules");

        const createExtensionWebviewPathUri = vscode.Uri.joinPath(webviewsBasePathUri, "webview-create-extension");

        const webviewPanel = vscode.window.createWebviewPanel(
            "extension-creator.create-extension",
            "VS Code Extension Creator",
            vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One,
            {
                enableCommandUris: true,
                enableScripts: true,
                localResourceRoots: [
                    webviewsBasePathUri,
                    nodeModulesPathUri,
                ],
                enableForms: true,
            }
        );
        webviewPanel.iconPath = vscode.Uri.joinPath(webviewsSharedPathUri, "images", "extension-64.png");

        const bodyHtml = await this.fileSystem.readFileAsString(createExtensionWebviewPathUri.fsPath, "body.html");
        const nonce = getNonce();

        const bundleJsWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(createExtensionWebviewPathUri, "bundle.js"));
        const codiconsStyleWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(nodeModulesPathUri, "@vscode/codicons", "dist", "codicon.css"));
        const mainScriptWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(createExtensionWebviewPathUri, "main.js"));
        const mainStyleWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(webviewsSharedPathUri, "shared.css"));

        webviewPanel.webview.html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webviewPanel.webview.cspSource}; script-src 'nonce-${nonce}'; font-src ${webviewPanel.webview.cspSource}; img-src ${webviewPanel.webview.cspSource};">
<link href="${codiconsStyleWebviewUri}" rel="stylesheet" />
<link href="${mainStyleWebviewUri}" rel="stylesheet" />
</head>
<body>
${bodyHtml}
<script nonce="${nonce}">
const settings = {
extension: ${JSON.stringify(settings)}
};
</script>
<script src="${bundleJsWebviewUri}" nonce="${nonce}"></script>
<script src="${mainScriptWebviewUri}" nonce="${nonce}"></script>
</body>
</html>`;

        webviewPanel.webview.onDidReceiveMessage(async (message) => {
            console.log("Received message from webview-panel:", message);

            if (message.type === "create-extension-project") {
                if (!message.settings) return;

                const generateSettings: ExtensionProjectGenerateSettings = {
                    className: message.settings.extension_className,
                    description: message.settings.extension_description,
                    displayName: message.settings.extension_displayName,
                    installNpmDependencies: message.settings.install_npm_dependencies ? true : false,
                    name: message.settings.extension_name,
                    openInVSCode: message.settings.open_in_vscode ? true : false,
                    overwriteProjectDestinationPath: message.settings.overwrite_destination_path ? true : false,
                    parentDirectory: message.settings.parent_directory,
                    publisher: message.settings.extension_publisher,
                    version: message.settings.extension_version,
                };

                await this.createExtensionProject(generateSettings);
            }
            else if (message.type === "cancel") {
                webviewPanel.dispose();
            }
            else if (message.type === "open-extension-creator-settings") {
                await vscode.commands.executeCommand("workbench.action.openSettings", "@ext:spencerjames.extension-creator");
            }
            else if (message.type === "select-project-location") {
                const directoryUri = await vscode.window.showOpenDialog({
                    title: "Select project location",
                    canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
                    openLabel: "Select",
                    defaultUri: message.directory ? vscode.Uri.file(message.directory) : vscode.Uri.file(homedir() + "/Projects"),
                });
                if (directoryUri) {
                    await webviewPanel.webview.postMessage({ type: "project-location-selected", directory: directoryUri[0].fsPath });
                }
            }
        });

        webviewPanel.reveal();
    }

    private async openPackageExtensionWebview(): Promise<void> {
        if (!await this.isWorkspaceOpen()) return;

        let packageJson = await this.readPackageJson();
        if (!packageJson) return;

        const settings = ExtensionTemplateVSCodeExtensionSettings.transientConfigured(settings => {
            settings.packageOutputDirectory = VariableExpander.expandString(settings.packageOutputDirectory);
        });

        const webviewsBasePathUri = vscode.Uri.joinPath(this.context.extensionUri, "webviews");
        const webviewsSharedPathUri = vscode.Uri.joinPath(webviewsBasePathUri, "shared");
        const nodeModulesPathUri = vscode.Uri.joinPath(this.context.extensionUri, "node_modules");

        const packageExtensionWebviewPathUri = vscode.Uri.joinPath(webviewsBasePathUri, "webview-package-extension");

        const webviewPanel = vscode.window.createWebviewPanel(
            "extension-creator.package-extension",
            "VS Code Extension Creator",
            vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One,
            {
                enableCommandUris: true,
                enableScripts: true,
                localResourceRoots: [
                    webviewsBasePathUri,
                    nodeModulesPathUri,
                ],
                enableForms: true,
            }
        );
        webviewPanel.iconPath = vscode.Uri.joinPath(webviewsSharedPathUri, "images", "extension-64.png");

        const bodyHtml = await this.fileSystem.readFileAsString(packageExtensionWebviewPathUri.fsPath, "body.html");
        const nonce = getNonce();

        const bundleJsWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(packageExtensionWebviewPathUri, "bundle.js"));
        const codiconsStyleWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(nodeModulesPathUri, "@vscode/codicons", "dist", "codicon.css"));
        const mainScriptWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(packageExtensionWebviewPathUri, "main.js"));
        const mainStyleWebviewUri = webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(webviewsSharedPathUri, "shared.css"));

        webviewPanel.webview.html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webviewPanel.webview.cspSource}; script-src 'nonce-${nonce}'; font-src ${webviewPanel.webview.cspSource}; img-src ${webviewPanel.webview.cspSource};">
<link href="${codiconsStyleWebviewUri}" rel="stylesheet" />
<link href="${mainStyleWebviewUri}" rel="stylesheet" />
</head>
<body>
${bodyHtml}
<script nonce="${nonce}">
const settings = {
    extension: ${JSON.stringify(settings)},
    package: ${JSON.stringify(packageJson)}
};
</script>
<script src="${bundleJsWebviewUri}" nonce="${nonce}"></script>
<script src="${mainScriptWebviewUri}" nonce="${nonce}"></script>
</body>
</html>`;

        const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(`${this.workspaceFolder!.uri.fsPath}/package.json`, true, false, true).onDidChange(async () => {
            packageJson = await this.readPackageJson();
            if (!packageJson) return;
            await webviewPanel.webview.postMessage({ type: "package-json-changed", package: packageJson });
        });

        webviewPanel.onDidDispose(() => {
            packageJsonWatcher.dispose();
        });

        webviewPanel.webview.onDidReceiveMessage(async (message) => {
            if (message.type === "build-extension-package") {
                if (!message.settings) return;

                const generateSettings: ExtensionPackageGenerateSettings = {
                    installExtension: message.settings.install_extension ? true : false,
                    outputDirectory: message.settings.output_directory,
                    overwritePackageDestinationPath: message.settings.overwrite_destination_path ? true : false,
                    packageFileName: message.settings.package_file_name,
                    preReleaseVersion: message.settings.pre_release_version ? true : false,
                    projectDirectory: this.workspaceFolder!.uri.fsPath,
                };

                if (await this.extensionPackageGenerator.generateExtensionPackage(generateSettings)) await this.information("Extension package built");
                else await this.error("Failed to build extension package");
            }
            else if (message.type === "cancel") {
                webviewPanel.dispose();
            }
            else if (message.type === "open-extension-creator-settings") {
                await vscode.commands.executeCommand("workbench.action.openSettings", "@ext:spencerjames.extension-creator");
            }
            else if (message.type === "select-output-location") {
                const directoryUri = await vscode.window.showOpenDialog({
                    title: "Select output location",
                    canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
                    openLabel: "Select",
                    defaultUri: message.directory ? vscode.Uri.file(message.directory) : vscode.Uri.file(homedir() + "/Projects"),
                });
                if (directoryUri) {
                    await webviewPanel.webview.postMessage({ type: "project-location-selected", directory: directoryUri[0].fsPath });
                }
            }
            else if (message.type === "open-text-document") {
                if (!await this.isWorkspaceOpen()) return;

                const textDocument = await vscode.workspace.openTextDocument(vscode.Uri.joinPath(this.workspaceFolder!.uri, message.path));
                await vscode.window.showTextDocument(textDocument, {
                    preview: false,
                    viewColumn: vscode.ViewColumn.Beside,
                });
            }
            else {
                console.log("Received unknown message type from webview-panel:", message.type);
            }
        });

        webviewPanel.reveal();
    }

    private async readPackageJson(): Promise<any> {
        if (!await this.isWorkspaceOpen()) return;

        const packageJsonUri = vscode.Uri.joinPath(this.workspaceFolder!.uri, "package.json");
        if (!await this.fileSystem.fileExists(packageJsonUri.fsPath)) {
            await this.information("No 'package.json' file found in the workspace.");
            return;
        }

        const packageJson = await this.fileSystem.readJsonFile(packageJsonUri.fsPath);
        if (!packageJson) {
            await this.information("Failed to read 'package.json' file.");
            return;
        }

        return packageJson;
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