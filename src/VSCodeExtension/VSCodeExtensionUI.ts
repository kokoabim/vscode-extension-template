export interface VSCodeExtensionUI {
    channelOutput(message: string, show?: boolean, preserveFocus?: boolean): void;
    channelOutputLine(message: string, show?: boolean, preserveFocus?: boolean): void;
    clearChannel(show?: boolean, preserveFocus?: boolean): void;
    error(message: string, noPrefix?: boolean): Promise<void>;
    information(message: string, noPrefix?: boolean): Promise<void>;
    modalError(title: string, detail?: string, ...items: string[]): Promise<string | undefined>;
    modalInformation(title: string, detail?: string, ...items: string[]): Promise<string | undefined>;
    modalWarning(title: string, detail?: string, ...items: string[]): Promise<string | undefined>;
    showChannel(preserveFocus?: boolean): void;
    warning(message: string, noPrefix?: boolean): Promise<void>;
}
