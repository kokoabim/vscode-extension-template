import * as vscode from "vscode";

export class VariableExpander {
    public static environmentVariables(value: string): string {
        return value.replace(/%([^%]+)%/g, (match, name) => {
            let variable = process.env[name];
            if (variable && ["HOME", "USERPROFILE"].includes(name)) variable = VariableExpander.platformSpecific(variable);
            return variable ?? match;
        });
    }

    public static expandObject(values: { [key: string]: any }): { [key: string]: any } {
        for (const key in values) {
            if (typeof values[key] === "string") {
                values[key] = VariableExpander.expandString(values[key]);
            }
            else if (Array.isArray(values[key])) {
                for (let i = 0; i < values[key].length; i++) {
                    if (typeof values[key][i] === "string") values[key][i] = VariableExpander.expandString(values[key][i]);
                    else if (typeof values[key][i] === "object") values[key][i] = VariableExpander.expandObject(values[key][i]);
                }
            }
            else if (typeof values[key] === "object") {
                values[key] = VariableExpander.expandObject(values[key]);
            }
        }
        return values;
    }

    public static expandString(value: string): string {
        value = VariableExpander.environmentVariables(value);
        value = VariableExpander.specialVariables(value);
        value = VariableExpander.vsCodeVariables(value);
        return value;
    }

    public static platformSpecific(value: string): string {
        if (process.platform === "win32") {
            value = value.replace(/\\/g, "/");
        }
        return value;
    }

    public static specialVariables(value: string): string {
        value = value.replace(/~/g, VariableExpander.platformSpecific(process.env.HOME ?? "~"));
        return value;
    }

    public static vsCodeVariables(value: string): string {
        if (vscode.workspace.workspaceFolders?.[0]) value = value.replace(/\$\{workspaceFolder\}/g, VariableExpander.platformSpecific(vscode.workspace.workspaceFolders?.[0].uri.fsPath));
        return value;
    }
}
