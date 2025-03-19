import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

// TODO: rename 'ExtensionTemplateVSCodeExtension' to reflect the name of your extension and this file
export class ExtensionTemplateVSCodeExtension extends VSCodeExtension {
    constructor(context: vscode.ExtensionContext) {
        super(context); // TODO: pass 'true' (for createOutputChannel) to create an output channel

        this.addCommands(this.createSayHelloWorldCommand());
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
}