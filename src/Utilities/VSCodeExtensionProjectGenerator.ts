import { TriBoolean } from "../Types/TriBoolean";
import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";
import { Executor, ExecutorExecOutput } from "./Executor";
import { FileSystem, FsEntryType } from "./FileSystem";

export interface ExtensionProjectGenerateSettings {
    className?: string;
    description?: string;
    displayName?: string;
    installNpmDependencies?: boolean;
    name?: string;
    openInNewWindow?: boolean;
    openInVSCode?: boolean;
    overwriteProjectDestinationPath?: boolean;
    parentDirectory?: string;
    projectDirectory?: string;
    publisher?: string;
    version?: string;
}

export class VSCodeExtensionProjectGenerator {
    private readonly executor = new Executor();
    private readonly fileSystem = new FileSystem();
    private readonly latestTemplatePath: string;

    constructor(private readonly output: VSCodeExtensionUI, templatesDirectory: string) {
        this.latestTemplatePath = this.fileSystem.joinPath(templatesDirectory, "vscx-template-latest.zip");
    }

    /** Generates a new VSCode extension project using the included latest template file. */
    public async generateExtensionProject(generateSettings: ExtensionProjectGenerateSettings): Promise<TriBoolean> {
        this.output.channelOutputLine("🚀 Generating new Visual Studio Code extension project...", true);

        if (!await this.fileSystem.fileExists(this.latestTemplatePath)) {
            this.output.channelOutputLine(`❌ Unable to find template: ${this.latestTemplatePath}`);
            return false;
        }

        if (!generateSettings.displayName || !generateSettings.parentDirectory || !generateSettings.publisher) {
            this.output.channelOutputLine("❌ Missing 'displayName', 'parentDirectory' or 'publisher' in extension project generate settings.");
            return false;
        }

        if (!generateSettings.name) generateSettings.name = generateSettings.displayName.toLowerCase().replaceAll(/ +/g, "-").replaceAll(/[^a-z0-9\-._]/g, "").replaceAll(/-{2,}/g, "-").replaceAll(/^[-._]+|[-._]+$/g, "");
        generateSettings.projectDirectory = this.fileSystem.joinPath(generateSettings.parentDirectory, "vscode-" + generateSettings.name);

        const fsEntryTypeAtProjectPath = await this.fileSystem.getEntryType(generateSettings.projectDirectory);
        if (fsEntryTypeAtProjectPath === FsEntryType.directory || fsEntryTypeAtProjectPath === FsEntryType.file || fsEntryTypeAtProjectPath === FsEntryType.symbolicLink) {
            if (generateSettings.overwriteProjectDestinationPath !== true && "Yes" !== await this.output.modalWarning(`${fsEntryTypeAtProjectPath} exists`, `Would you like to overwrite '${generateSettings.projectDirectory}'?`, "Yes", "No")) {
                this.output.channelOutputLine("👎🏼 Aborted.");
                return false;
            }

            const deleted = await this.fileSystem.removeEntry(generateSettings.projectDirectory);
            if (!deleted) {
                this.output.channelOutputLine(`❌ Failed to delete: ${generateSettings.projectDirectory}`);
                return false;
            }
        }
        else if (fsEntryTypeAtProjectPath !== FsEntryType.none) {
            this.output.channelOutputLine(`❌ Unable to continue due to file system entry type ${fsEntryTypeAtProjectPath} that exists at project directory: ${generateSettings.projectDirectory}`);
            return false;
        }

        const createdDirectory = await this.fileSystem.createDirectory(generateSettings.projectDirectory);
        if (!createdDirectory) {
            this.output.channelOutputLine(`❌ Failed to create directory: ${generateSettings.projectDirectory}`);
            return false;
        }

        const unzipped = await this.fileSystem.unzip(this.latestTemplatePath, generateSettings.projectDirectory);
        if (!unzipped) {
            this.output.channelOutputLine("❌ Failed to unzip template to directory.");
            return false;
        }

        // NOTE: from here on, return will be true or partial.
        let result: TriBoolean = true;

        const extensionManifestPath = this.fileSystem.joinPath(generateSettings.projectDirectory, "package.json");
        const packageJsonManuallyEditMessage = "You will need to edit the 'package.json' file.";

        const extensionManifest = await this.fileSystem.readJsonFile<any>(extensionManifestPath);
        if (!extensionManifest) {
            result = "partial";
            this.output.channelOutputLine(`⚠️ Failed to read extension manifest. ${packageJsonManuallyEditMessage}`);
            // NOTE: continue on error
        }
        else {
            extensionManifest.description = generateSettings.description || "Change Me";
            extensionManifest.displayName = generateSettings.displayName;
            extensionManifest.name = generateSettings.name;
            extensionManifest.publisher = generateSettings.publisher;
            extensionManifest.version = generateSettings.version || "0.0.1";

            extensionManifest.contributes.configuration.title = generateSettings.displayName;

            const packageJsonSaved = await this.fileSystem.writeFile(extensionManifestPath, extensionManifest, true);
            if (!packageJsonSaved) {
                result = "partial";
                this.output.channelOutputLine(`⚠️ Failed to write extension manifest. ${packageJsonManuallyEditMessage}`);
                // NOTE: continue on error
            }
        }

        let filesToReplaceIn = [
            extensionManifestPath,
            this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"),
            this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts")
        ];

        for (const fileToReplaceIn of filesToReplaceIn) {
            const didReplaceInFile = await this.fileSystem.replaceInFile(fileToReplaceIn,
                { find: /\{\{displayName\}\}/g, replace: generateSettings.displayName },
                { find: /\{\{name\}\}/g, replace: generateSettings.name },
                { find: /\{\{publisher\}\}/g, replace: generateSettings.publisher });

            if (!didReplaceInFile) {
                result = "partial";
                this.output.channelOutputLine(`⚠️ Failed to replace placeholders in '${fileToReplaceIn}'. You will need to edit the file manually.`);
                // NOTE: continue on error
            }
        }

        if (generateSettings.className) {
            if (!generateSettings.className.endsWith("VSCodeExtension")) {
                generateSettings.className += "VSCodeExtension";
            }

            filesToReplaceIn = [
                this.fileSystem.joinPath(generateSettings.projectDirectory, "src/extension.ts"),
                this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"),
                this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts")
            ];

            for (const fileToReplaceIn of filesToReplaceIn) {
                const didReplaceInFile = await this.fileSystem.replaceInFile(fileToReplaceIn, { find: /ExtensionTemplateVSCodeExtension/g, replace: generateSettings.className });

                if (!didReplaceInFile) {
                    result = "partial";
                    this.output.channelOutputLine(`⚠️ Failed to set class name in '${fileToReplaceIn}'. You will need to edit the file manually.`);
                    // NOTE: continue on error
                }
            }

            const filesToMove = [
                this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"),
                this.fileSystem.joinPath(generateSettings.projectDirectory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts")
            ];

            for await (const fileToMove of filesToMove) {
                const newFilePath = fileToMove.replace(/ExtensionTemplateVSCodeExtension/, generateSettings.className);
                const didRenameFile = await this.fileSystem.move(fileToMove, newFilePath);

                if (!didRenameFile) {
                    result = "partial";
                    this.output.channelOutputLine(`⚠️ Failed to rename file '${fileToMove}' to '${newFilePath}'. You will need to rename the file manually.`);
                    // NOTE: continue on error
                }
            }
        }

        this.output.channelOutputLine((result === true // will be either True or "partial" at this point
            ? `✅ Extension project generated`
            : `⚠️ Extension project generated with issues you must address manually`)
            + `: ${generateSettings.projectDirectory}`);

        return result;
    }

    /** Installs NPM package dependencies at the specified directory. */
    public async installNpmDependenciesUsingNpmx(directory: string, output: VSCodeExtensionUI): Promise<boolean> {
        output.channelOutputLine("📦 Installing NPM package dependencies...", true);
        const execResult = await this.executor.exec("npm install", directory, ExecutorExecOutput.outputChannel, output);

        output.channelOutputLine(execResult.success
            ? "✅ NPM package dependencies installed."
            : "❌ Error installing NPM package dependencies. You will need to run './npmx.sh install' manually.");

        return execResult.success;
    }
}
