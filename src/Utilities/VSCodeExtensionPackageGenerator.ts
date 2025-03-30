import * as vscode from "vscode";
import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";
import { FileSystem, FsEntryType } from "./FileSystem";
import { VSCodeExtensionManager } from "./VSCodeExtensionManager";
import { Executor, ExecutorExecOutput } from "./Executor";

export interface ExtensionPackageGenerateSettings {
    extensionId?: string;
    installExtension?: boolean;
    outputDirectory?: string;
    overwritePackageDestinationPath?: boolean;
    packageFileName?: string;
    packagePath?: string;
    preReleaseVersion?: boolean;
    projectDirectory?: string;
}

export class VSCodeExtensionPackageGenerator {
    private readonly executor = new Executor();
    private readonly fileSystem = new FileSystem();
    private readonly vsce: VSCodeExtensionManager;

    constructor(private readonly output: VSCodeExtensionUI) {
        this.vsce = new VSCodeExtensionManager(this.output);
    }

    /** Builds and packages a VSCode extension project. */
    public async generateExtensionPackage(generateSettings: ExtensionPackageGenerateSettings): Promise<boolean> {
        if (!generateSettings.outputDirectory || !generateSettings.packageFileName || !generateSettings.projectDirectory) {
            await this.output.modalError("Missing settings", "Missing 'outputDirectory', 'packageFileName' or 'projectDirectory' in extension package generate settings.");
            return false;
        }

        // extension ID

        const extensionManifestPath = this.fileSystem.joinPath(generateSettings.projectDirectory, "package.json");
        const extensionManifest = await this.fileSystem.readJsonFile<any>(extensionManifestPath);
        if (!extensionManifest) {
            this.output.modalError("Failed to read extension manifest", "Failed to read 'package.json' in the project directory.");
            return false;
        }

        if (!extensionManifest?.publisher || !extensionManifest?.name) {
            this.output.modalError("Missing extension manifest settings", "Missing 'name' or 'publisher' in 'package.json'.");
            return false;
        }

        generateSettings.extensionId = `${extensionManifest.publisher}.${extensionManifest.name}`;

        // installed? if so, uninstall

        const installedExtension = vscode.extensions.all.find(ex => ex.id === generateSettings.extensionId);
        if (installedExtension) {
            await vscode.commands.executeCommand("workbench.extensions.uninstallExtension", installedExtension.id);
            this.output.channelOutputLine(`Uninstalled extension: ${installedExtension.id} (${installedExtension.packageJSON.version})`, true);
        }

        // outputDirectory

        const fsEntryTypeAtOutputDirectory = await this.fileSystem.getEntryType(generateSettings.outputDirectory);
        if (fsEntryTypeAtOutputDirectory === FsEntryType.none) {
            const createdDirectory = await this.fileSystem.createDirectory(generateSettings.outputDirectory);
            if (!createdDirectory) {
                this.output.modalError("Failed to create output directory", `Failed to create output directory: ${generateSettings.outputDirectory}`);
                return false;
            }
        }
        else if (fsEntryTypeAtOutputDirectory !== FsEntryType.directory) {
            await this.output.modalWarning(`${fsEntryTypeAtOutputDirectory} exists`, `Unable to continue due to file system entry type that exists at output directory: ${generateSettings.outputDirectory}`);
            return false;
        }

        // packagePath

        generateSettings.packagePath = this.fileSystem.joinPath(generateSettings.outputDirectory, generateSettings.packageFileName);

        const fsEntryTypeAtPackagePath = await this.fileSystem.getEntryType(generateSettings.packagePath);
        if (fsEntryTypeAtPackagePath === FsEntryType.directory || fsEntryTypeAtPackagePath === FsEntryType.file || fsEntryTypeAtPackagePath === FsEntryType.symbolicLink) {
            if (generateSettings.overwritePackageDestinationPath !== true && "Yes" !== await this.output.modalWarning(`${fsEntryTypeAtPackagePath} exists`, `Would you like to overwrite '${generateSettings.packagePath}'?`, "Yes", "No")) {
                return false;
            }

            const deleted = await this.fileSystem.removeEntry(generateSettings.packagePath);
            if (!deleted) {
                this.output.error(`Failed to delete: ${generateSettings.packagePath}`);
                return false;
            }
        }
        else if (fsEntryTypeAtPackagePath !== FsEntryType.none) {
            await this.output.modalWarning(`${fsEntryTypeAtPackagePath} exists`, "Unable to continue due to file system entry type.");
            return false;
        }

        try {
            await this.vsce.package(generateSettings.projectDirectory, generateSettings.preReleaseVersion === true, generateSettings.packagePath);
        }
        catch (error) {
            this.output.modalError("Failed to package extension", `${error}`);
            return false;
        }

        this.output.showChannel();
        await this.executor.exec("npm install", generateSettings.projectDirectory, ExecutorExecOutput.outputChannel, this.output);

        if (generateSettings.installExtension === true) {
            await vscode.commands.executeCommand("workbench.extensions.installExtension", vscode.Uri.file(generateSettings.packagePath));
            this.output.channelOutputLine(`Installed extension: ${generateSettings.extensionId} (${extensionManifest.version})`, true);
        }

        return true;
    }
}