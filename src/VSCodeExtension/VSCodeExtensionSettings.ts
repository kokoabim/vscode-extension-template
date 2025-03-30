import * as vscode from "vscode";

export abstract class VSCodeExtensionSettings {
    protected abstract configurationSection: string;

    /**
     * Gets (reads) setting.
    */
    public get<T>(name: string): T | undefined {
        const configuration = vscode.workspace.getConfiguration(this.configurationSection);
        if (!configuration) { return; }

        try { return configuration.get<T>(name); }
        catch { return; }
    }

    /**
     * Determines whether the extension has a configuration section.
    */
    public hasConfiguration(): boolean {
        return !!vscode.workspace.getConfiguration(this.configurationSection);
    }

    /**
     * Sets (writes) setting, by default to global configuration.
    */
    public async set<T>(name: string, value: T, configurationTarget: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global): Promise<void> {
        await vscode.workspace.getConfiguration(this.configurationSection).update(name, value, configurationTarget);
    }
}
