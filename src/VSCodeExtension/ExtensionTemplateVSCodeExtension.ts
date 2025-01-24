import * as vscode from "vscode";
import { VSCodeCommand } from "./VSCodeCommand";
import { VSCodeExtension } from "./VSCodeExtension";
import { ExtensionTemplateVSCodeExtensionSettings } from "./ExtensionTemplateVSCodeExtensionSettings";

// TODO: rename 'ExtensionTemplateVSCodeExtension' to reflect the name of your extension
export class ExtensionTemplateVSCodeExtension extends VSCodeExtension {
    constructor(context: vscode.ExtensionContext) {
        super(context); // TODO: pass 'true' (for createOutputChannel) to create an output channel

        this.addCommands(this.sayHelloWorldCommand());
    }

    static use(context: vscode.ExtensionContext): ExtensionTemplateVSCodeExtension {
        return new ExtensionTemplateVSCodeExtension(context);
    }

    private sayHelloWorldCommand(): VSCodeCommand {
        return new VSCodeCommand("extension-template.helloWorld", async () => {
            const settings = ExtensionTemplateVSCodeExtensionSettings.singleton(true);
            await this.information(`Hello ${settings.yourName}!`);
        });
    }
}