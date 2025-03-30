import { VSCodeExtensionSettings } from "./VSCodeExtensionSettings";

export class ExtensionTemplateVSCodeExtensionSettings extends VSCodeExtensionSettings {
    public yourName = "Somebody";
    protected configurationSection = "{{name}}";

    private static singletonInstance: ExtensionTemplateVSCodeExtensionSettings;

    private constructor() {
        super();
        ExtensionTemplateVSCodeExtensionSettings.readConfigAndAssignSettings(this);
    }

    public static singleton(refresh = false): ExtensionTemplateVSCodeExtensionSettings {
        if (!this.singletonInstance) ExtensionTemplateVSCodeExtensionSettings.singletonInstance = new ExtensionTemplateVSCodeExtensionSettings();
        else if (refresh) ExtensionTemplateVSCodeExtensionSettings.readConfigAndAssignSettings(ExtensionTemplateVSCodeExtensionSettings.singletonInstance);

        return this.singletonInstance;
    }

    public static transientConfigured(configuration: (settings: ExtensionTemplateVSCodeExtensionSettings) => void): ExtensionTemplateVSCodeExtensionSettings {
        const settings = new ExtensionTemplateVSCodeExtensionSettings();
        configuration(settings);
        return settings;
    }

    private static readConfigAndAssignSettings(settings: ExtensionTemplateVSCodeExtensionSettings): void {
        if (!settings.hasConfiguration()) return;

        // TODO: get (read) settings and assign to 'settings' instance, example:

        settings.yourName = settings.get<string>("yourName") ?? "Somebody";
    }
}