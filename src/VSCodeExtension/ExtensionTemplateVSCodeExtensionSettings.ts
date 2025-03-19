import { VSCodeExtensionSettings } from "./VSCodeExtensionSettings";

// TODO: rename 'ExtensionTemplateVSCodeExtensionSettings' to reflect the name of your extension and this file
export class ExtensionTemplateVSCodeExtensionSettings extends VSCodeExtensionSettings {
    public yourName!: string;

    protected configurationSection = "extension-creator";

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

        // TODO: get settings and assign to 'settings' instance, example:

        settings.yourName = settings.get<string>("yourName") || "Somebody";
    }
}