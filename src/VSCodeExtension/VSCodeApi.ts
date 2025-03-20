// https://github.com/microsoft/vscode/blob/main/src/vs/workbench/browser/actions/workspaceCommands.ts

export namespace VSCodeApi {
    export interface IOpenFolderAPICommandOptions {
        forceLocalWindow?: boolean;
        forceNewWindow?: boolean;
        forceProfile?: string;
        forceReuseWindow?: boolean;
        forceTempProfile?: boolean;
        noRecentEntry?: boolean;
    }
}