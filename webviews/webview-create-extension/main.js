// @ts-ignore

(function () {
    const vscode = acquireVsCodeApi(); // NOSONAR

    window.addEventListener("load", () => {
        const form = document.querySelector("form");
        form?.addEventListener("submit", event => {
            event.preventDefault();

            document.querySelector("#submit-action").disabled = true;

            const formData = new FormData(form);
            const settings = Object.fromEntries(formData);

            // workaround for an issue with checkboxes set to true (programmatically) not being included
            document.querySelectorAll("vscode-checkbox").forEach(checkbox => {
                const name = checkbox.name;
                if (name) settings[name] = checkbox.checked;
            });

            vscode.postMessage({
                type: 'create-extension-project',
                settings: settings
            });
        });

        document.querySelectorAll("vscode-textfield").forEach(textfield => {
            textfield.addEventListener("input", event => {
                if (event.target.name === "extension_displayName") {
                    updateExtensionClassName();
                    updateExtensionName();
                }
                updateSubmitButtonState();
            });
        });

        updateUI(settings);

        const openExtensionCreatorSettingsAction = document.querySelector("#open-extension-creator-settings-action");
        openExtensionCreatorSettingsAction?.addEventListener("click", () => {
            vscode.postMessage({ type: "open-extension-creator-settings" });
        });

        const cancelAction = document.querySelector("#cancel-action");
        cancelAction?.addEventListener("click", () => {
            vscode.postMessage({
                type: "cancel"
            });
        });

        const selectProjectLocationAction = document.querySelector("#select-project-location-action");
        selectProjectLocationAction?.addEventListener("click", () => {
            vscode.postMessage({
                type: "select-project-location",
                directory: document.querySelector("vscode-textfield[name='parent_directory']")?.value
            });
        });
    });

    window.addEventListener("message", event => {
        const message = event.data;

        console.log("Received message from VS Code:", message);

        switch (message.type) { // NOSONAR
            case "project-location-selected": {
                const projectLocationInput = document.querySelector("vscode-textfield[name='parent_directory']");
                if (projectLocationInput) projectLocationInput.value = message.directory;
                break;
            }
            default:
                console.log('Unknown message type:', message.type);
                break;
        }
    });
})();

function updateUI(model) {
    setTextfieldValue(model.extension, "publisherID", "extension_publisher");
    setTextfieldValue(model.extension, "projectParentDirectory", "parent_directory");

    setCheckboxValue(model.extension, "overwriteProjectDestinationPath", "overwrite_destination_path");
    setCheckboxValue(model.extension, "installNPMDependencies", "install_npm_dependencies");
    setCheckboxValue(model.extension, "openInVSCode", "open_in_vscode");

    updateExtensionName();
    updateSubmitButtonState();
}

function setCheckboxValue(model, propertyName, textfieldName) {
    if (!model) return;

    const checkbox = document.querySelector(`vscode-checkbox[name='${textfieldName}']`);
    if (checkbox && model[propertyName] !== undefined) checkbox.checked = model[propertyName];
}

function setTextfieldValue(model, propertyName, textfieldName, textfieldPrefix = "") {
    if (!model) return;

    const textfield = document.querySelector(`vscode-textfield[name='${textfieldPrefix || ""}${textfieldName || propertyName}']`);
    if (textfield && model[propertyName] !== undefined) textfield.value = model[propertyName];
}

function updateExtensionClassName() {
    const displayName = document.querySelector("vscode-textfield[name='extension_displayName']")?.value;
    if (!displayName) return;

    const textfield = document.querySelector("vscode-textfield[name='extension_className']");
    if (textfield) {
        textfield.value = displayName
            .replaceAll(/[^a-zA-Z0-9_]+/g, "")
            .replaceAll(/^_+|_+$/g, "") + "VSCodeExtension";
    }
}

function updateExtensionName() {
    const displayName = document.querySelector("vscode-textfield[name='extension_displayName']")?.value;
    if (!displayName) return;

    const textfield = document.querySelector("vscode-textfield[name='extension_name']");
    if (textfield) {
        textfield.value = displayName
            .toLowerCase()
            .replaceAll(/ +/g, "-")
            .replaceAll(/[^a-z0-9\-._]/g, "")
            .replaceAll(/-{2,}/g, "-")
            .replaceAll(/^[-._]+|[-._]+$/g, "");
    }
}

function updateSubmitButtonState() {
    const submitAction = document.querySelector("#submit-action");
    if (submitAction) {
        submitAction.disabled = !(
            document.querySelector("vscode-textfield[name='extension_publisher']")?.value &&
            document.querySelector("vscode-textfield[name='extension_displayName']")?.value &&
            document.querySelector("vscode-textfield[name='parent_directory']")?.value
        );
    }
}