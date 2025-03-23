import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";
import { Executor, ExecutorExecOutput } from "./Executor";
import { FileSystem, FsEntryType } from "./FileSystem";

export class VSCodeExtensionProjectGenerator {
    private readonly executor = new Executor();
    private readonly fileSystem = new FileSystem();
    private readonly latestTemplatePath: string;

    constructor(private readonly output: VSCodeExtensionUI, private readonly templatesDirectory: string) {
        this.latestTemplatePath = this.fileSystem.joinPath(templatesDirectory, "vscx-template-latest.zip");
    }

    public async createNewExtensionProject(settings: ExtensionProjectSettings): Promise<boolean> {
        if (!await this.fileSystem.fileExists(this.latestTemplatePath)) {
            await this.output.modalError("Template not found", `Unable to find template at: ${this.latestTemplatePath}`);
            return false;
        }

        if (!settings.displayName || !settings.publisher || !settings.directory) {
            await this.output.modalError("Missing settings", "Missing 'displayName', 'publisher' or 'directory' in extension project settings.");
            return false;
        }

        if (!settings.name) settings.name = settings.displayName.replaceAll(" ", "-").toLowerCase().replaceAll(/[^a-z0-9\-._~]+/g, "");
        settings.id = `${settings.publisher}.${settings.name}`;
        settings.directory = this.fileSystem.joinPath(settings.directory, "vscode-" + settings.name);

        const fsEntryTypeAtProjectPath = await this.fileSystem.getEntryType(settings.directory);
        if (fsEntryTypeAtProjectPath === FsEntryType.directory || fsEntryTypeAtProjectPath === FsEntryType.file || fsEntryTypeAtProjectPath === FsEntryType.symbolicLink) {
            if ("Yes" !== await this.output.modalWarning(`${fsEntryTypeAtProjectPath} exists`, `Would you like to overwrite '${settings.directory}'?`, "Yes", "No")) {
                return false;
            }

            const deleted = await this.fileSystem.removeDirectory(settings.directory);
            if (!deleted) {
                this.output.error(`Failed to delete directory: ${settings.directory}`);
                return false;
            }
        }
        else if (fsEntryTypeAtProjectPath !== FsEntryType.none) {
            await this.output.modalWarning(`${fsEntryTypeAtProjectPath} exists`, "Unable to continue due to file system entry type.");
            return false;
        }

        const createdDirectory = await this.fileSystem.createDirectory(settings.directory);
        if (!createdDirectory) {
            this.output.error(`Failed to create directory: ${settings.directory}`);
            return false;
        }

        const unzipped = await this.fileSystem.unzip(this.latestTemplatePath, settings.directory);
        if (!unzipped) {
            this.output.modalError("Failed", "Failed to unzip template to directory.");
            return false;
        }

        const packageJsonPath = this.fileSystem.joinPath(settings.directory, "package.json");
        const packageJsonManuallyEditMessage = "You will have to manually edit the package.json file to set the 'description', 'displayName', 'name' and 'publisher' properties.";

        const packageJson = await this.fileSystem.readJsonFile<any>(packageJsonPath);
        if (!packageJson) {
            this.output.modalError("Failed to read package.json", packageJsonManuallyEditMessage);
            // NOTE: continue on error
        }
        else {
            packageJson.description = settings.description ?? "Change Me";
            packageJson.displayName = settings.displayName;
            packageJson.name = settings.name;
            packageJson.publisher = settings.publisher;
            if (settings.version) packageJson.version = settings.version;
            packageJson.contributes.configuration.title = settings.displayName;

            const packageJsonSaved = await this.fileSystem.writeFile(packageJsonPath, packageJson, true);
            if (!packageJsonSaved) {
                this.output.modalError("Failed to write package.json", packageJsonManuallyEditMessage);
                // NOTE: continue on error
            }
        }

        const filesToReplaceIn = [
            packageJsonPath,
            this.fileSystem.joinPath(settings.directory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"),
            this.fileSystem.joinPath(settings.directory, "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts")
        ];

        for (const fileToReplaceIn of filesToReplaceIn) {
            const didReplaceInFile = await this.fileSystem.replaceInFile(fileToReplaceIn, { find: /change-me/g, replace: settings.id });
            if (!didReplaceInFile) {
                this.output.modalError("Failed to replace in file", `Failed to replace 'change-me' with package ID in: ${fileToReplaceIn}`);
                // NOTE: continue on error
            }
        }

        return true;
    }

    public async installNpmDependenciesUsingNpmx(directory: string, output: VSCodeExtensionUI): Promise<boolean> {
        output.channelOutputLine(`Installing NPM dependencies using 'npmx.sh' in '${directory}'...`, true);
        const execResult = await this.executor.exec("./npmx.sh -y install", directory, ExecutorExecOutput.outputChannel, output);
        return execResult.code === 0;
    }
}

export interface ExtensionProjectSettings {
    description?: string;
    directory?: string;
    displayName?: string;
    id?: string;
    installDependencies?: boolean;
    name?: string;
    openInVSCode?: boolean;
    publisher?: string;
    version?: string;
}