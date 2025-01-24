import { VSCodeExtensionSettings } from "./VSCodeExtensionSettings";

// TODO: rename 'ExtensionTemplateVSCodeExtensionSettings' to reflect the name of your extension
export class ExtensionTemplateVSCodeExtensionSettings extends VSCodeExtensionSettings {
    yourName!: string;

    protected configurationSection = "extension-template"; // TODO: rename 'extension-template' to reflect the name of your extension

    private static singletonInstance: ExtensionTemplateVSCodeExtensionSettings;

    private constructor() {
        super();
        ExtensionTemplateVSCodeExtensionSettings.readConfigAndAssignSettings(this);
    }

    static singleton(refresh = false): ExtensionTemplateVSCodeExtensionSettings {
        if (!this.singletonInstance) ExtensionTemplateVSCodeExtensionSettings.singletonInstance = new ExtensionTemplateVSCodeExtensionSettings();
        else if (refresh) ExtensionTemplateVSCodeExtensionSettings.readConfigAndAssignSettings(ExtensionTemplateVSCodeExtensionSettings.singletonInstance);

        return this.singletonInstance;
    }

    private static readConfigAndAssignSettings(settings: ExtensionTemplateVSCodeExtensionSettings): void {
        if (!settings.hasConfiguration()) return;

        // TODO: get settings and assign to 'settings' instance

        settings.yourName = settings.get<string>("yourName") || "Somebody";
    }
}