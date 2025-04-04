import { VSCodeExtensionSettings } from "./VSCodeExtensionSettings";

export class ExtensionTemplateVSCodeExtensionSettings extends VSCodeExtensionSettings {
    public yourName = "Somebody";
    // TEMPLATE-REMOVE-START
    public installExtension = false;
    public installNPMDependencies = true;
    public openInVSCode = true;
    public overwritePackageDestinationPath = false;
    public overwriteProjectDestinationPath = false;
    public packageOutputDirectory = "${workspaceFolder}/releases";
    public projectParentDirectory = "%HOME%/Projects";
    public publisherID?: string;

    protected configurationSection = "extension-creator";
    // TEMPLATE-REMOVE-END

    /** TEMPLATE-ADD-START
    protected configurationSection = "{{name}}";
    TEMPLATE-ADD-END */

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
        // TEMPLATE-REMOVE-START
        settings.installExtension = settings.get<boolean>("installExtension") ?? false;
        settings.installNPMDependencies = settings.get<boolean>("installNPMDependencies") ?? true;
        settings.openInVSCode = settings.get<boolean>("openInVSCode") ?? true;
        settings.overwritePackageDestinationPath = settings.get<boolean>("overwritePackageDestinationPath") ?? false;
        settings.overwriteProjectDestinationPath = settings.get<boolean>("overwriteProjectDestinationPath") ?? false;
        settings.packageOutputDirectory = settings.get<string>("packageOutputDirectory") ?? "${workspaceFolder}/releases";
        settings.projectParentDirectory = settings.get<string>("projectParentDirectory") ?? "%HOME%/Projects";
        settings.publisherID = settings.get<string>("publisherID");
        // TEMPLATE-REMOVE-END

    }
}