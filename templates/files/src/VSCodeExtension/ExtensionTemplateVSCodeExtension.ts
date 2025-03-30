import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

export class ExtensionTemplateVSCodeExtension extends VSCodeExtension {
    constructor(context: vscode.ExtensionContext) {
        super(context); // NOTE: pass 'true' for 'createOutputChannel' to create an output channel

        this.addCommands(this.createSayHelloWorldCommand());
    }

    /**
     * Main entry point for the extension. Call from 'activate' function in './src/extension.ts'
     */
    public static use(context: vscode.ExtensionContext): ExtensionTemplateVSCodeExtension {
        return new ExtensionTemplateVSCodeExtension(context);
    }

    private createSayHelloWorldCommand(): VSCodeCommand {
        return new VSCodeCommand("{{name}}.hello-world", async () => {
            const settings = ExtensionTemplateVSCodeExtensionSettings.singleton(true);
            await this.information(`Hello, ${settings.yourName}!`);
        });
    }
}
