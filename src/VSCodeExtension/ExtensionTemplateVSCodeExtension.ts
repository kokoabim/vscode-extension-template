import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

// TEMPLATE-REMOVE-START
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

        this.addCommands(this.createCreateNewExtensionProjectCommand(), this.createSayHelloWorldCommand());
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
            await this.information(`Hello ${settings.yourName}!`);
        });
    }

    // TEMPLATE-REMOVE-START
    private createCreateNewExtensionProjectCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-creator.create-new-extension-project", async () => {
            const projectSettings = await this.promptForExtensionProjectSettings();
            if (!projectSettings) return;

            const didCreateProject = await this.extensionProjectGenerator.createNewExtensionProject(projectSettings);
            if (!didCreateProject) return;

            if ("Yes" === await this.modalInformation("Install NPM dependencies?", "Would you like to install the project NPM dependencies?", "Yes", "No")) {
                if (!await this.extensionProjectGenerator.installNpmDependenciesUsingNpmx(projectSettings.directory!, this)) {
                    await this.modalError("Failed NPM dependencies", "Failed to install NPM dependencies. You will need to run './npmx.sh install' manually.");
                }
            }

            const openFolderResponse = await this.modalInformation("Open Project Folder?", "Would you like to open the project folder?", "Yes, This Window", "Yes, New Window", "No");
            if (openFolderResponse?.startsWith("Yes")) {
                const openFolderSettings: VSCodeApi.IOpenFolderAPICommandOptions = openFolderResponse.includes("New")
                    ? { forceNewWindow: true }
                    : { forceReuseWindow: true, forceNewWindow: false };

                await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(projectSettings.directory!), openFolderSettings);
            }
        });
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
