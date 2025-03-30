import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";
import { Executor, ExecutorExecOutput } from "./Executor";

/**
 * Visual Studio Code Extension Manager (vsce)
 * @see https://github.com/microsoft/vscode-vsce
 */
export class VSCodeExtensionManager {
    private readonly executor = new Executor();

    constructor(private readonly output?: VSCodeExtensionUI) {
    }

    /**
     * Checks if `vsce` is available in the system PATH.
     * @returns {boolean} A promise that resolves to true if `vsce` is available, false otherwise.
     */
    public async exists(): Promise<boolean> {
        const result = await this.executor.exec("which vsce");
        return result.success === true;
    }

    /**
     * Executes `vsce` package command.
     * @param extensionProjectDirectory The directory of the extension project.
     * @param preReleaseVersion If true, the package will be a pre-release version.
     * @param packageOutputPath The output path for the package.
     * @returns {Promise<string | undefined>} A promise that resolves to the `vsce` command output if a `VSCodeExtensionUI` was passed to the constructor, or undefined otherwise.
     * @throws Will throw an error if `vsce` is not installed or the command fails.
     */
    public async package(extensionProjectDirectory: string, preReleaseVersion: boolean, packageOutputPath: string): Promise<string | undefined> {
        if (!await this.exists()) throw new Error("Visual Studio Code Extension Manager (vsce) is not installed or not found in PATH.");

        this.output?.showChannel();

        const vsceResult = await this.executor.exec(`vsce package ${preReleaseVersion ? "--pre-release" : ""} --out "${packageOutputPath}"`, extensionProjectDirectory, this.output ? ExecutorExecOutput.outputChannel : ExecutorExecOutput.string, this.output);
        if (vsceResult.success) return this.output ? vsceResult.output : undefined;

        throw new Error(`Failed to package extension${vsceResult.exitCode !== undefined ? ` (${vsceResult.exitCode})` : ""}: ${vsceResult.error || vsceResult.output || "Unknown error"}`);
    }
}