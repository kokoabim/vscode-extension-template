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
                type: 'build-extension-package',
                settings: settings
            });
        });

        document.querySelectorAll("vscode-textfield").forEach(textfield => {
            textfield.addEventListener("input", event => {
                if (event.target.name !== "package_file_name") updatePackageFileName();
                updateSubmitButtonState();
            });
        });

        document.querySelector("vscode-checkbox[name='pre_release_version']").addEventListener("change", () => {
            updatePackageFileName();
        });

        updateUI(settings);

        document.querySelectorAll(".open-package-json-action").forEach(action => {
            action.addEventListener("click", () => {
                vscode.postMessage({
                    type: "open-text-document",
                    path: "package.json"
                });
            });
        });

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

        const selectOutputLocationAction = document.querySelector("#select-output-location-action");
        selectOutputLocationAction?.addEventListener("click", () => {
            vscode.postMessage({
                type: "select-output-location",
                directory: document.querySelector("vscode-textfield[name='output_directory']")?.value
            });
        });
    });

    window.addEventListener("message", event => {
        const message = event.data;

        switch (message.type) { // NOSONAR
            case "output-location-selected": {
                const textfield = document.querySelector("vscode-textfield[name='output_directory']");
                if (textfield) textfield.value = message.directory;
                break;
            }
            case "package-json-changed": {
                updateUI({ package: message.package });
                break;
            }
            default:
                console.log('Received unknown message type from VS Code:', message.type);
                break;
        }
    });
})();

function updateUI(model) {
    const textfieldPrefix = "extension_";

    setTextfieldValue(model.package, "description", "", textfieldPrefix);
    setTextfieldValue(model.package, "displayName", "", textfieldPrefix);
    setTextfieldValue(model.package, "name", "", textfieldPrefix);
    setTextfieldValue(model.package, "publisher", "", textfieldPrefix);
    setTextfieldValue(model.package, "version", "", textfieldPrefix);

    setTextfieldValue(model.extension, "packageOutputDirectory", "output_directory");

    setCheckboxValue(model.extension, "overwritePackageDestinationPath", "overwrite_destination_path");
    setCheckboxValue(model.extension, "installExtension", "install_extension");

    updatePackageFileName();
    updateSubmitButtonState();
    updateSuggestedSettingsStates(model.package);
}

function setCheckboxValue(model, propertyName, textfieldName) {
    if (!model) return;

    const checkbox = document.querySelector(`vscode-checkbox[name='${textfieldName}']`);
    if (checkbox && model[propertyName] !== undefined) checkbox.checked = model[propertyName] === true ? true : false;
}

function setTextfieldValue(model, propertyName, textfieldName, textfieldPrefix = "") {
    if (!model) return;

    const textfield = document.querySelector(`vscode-textfield[name='${textfieldPrefix || ""}${textfieldName || propertyName}']`);
    if (textfield && model[propertyName] !== undefined) textfield.value = model[propertyName];
}

function updatePackageFileName() {
    const textfield = document.querySelector("vscode-textfield[name='package_file_name']");
    if (!textfield) return;

    const publisher = document.querySelector("vscode-textfield[name='extension_publisher']")?.value || "publisher";
    const name = document.querySelector("vscode-textfield[name='extension_name']")?.value || "name";
    const version = document.querySelector("vscode-textfield[name='extension_version']")?.value || "version";
    const preRelease = document.querySelector("vscode-checkbox[name='pre_release_version']")?.checked ? "-pre" : "";

    textfield.value = `${publisher}_${name}_${version}${preRelease}.vsix`;
}

function updateSubmitButtonState() {
    const submitAction = document.querySelector("#submit-action");
    if (submitAction) {
        submitAction.disabled = !(
            document.querySelector("vscode-textfield[name='extension_publisher']")?.value &&
            document.querySelector("vscode-textfield[name='extension_displayName']")?.value &&
            document.querySelector("vscode-textfield[name='extension_name']")?.value &&
            document.querySelector("vscode-textfield[name='extension_version']")?.value &&
            document.querySelector("vscode-textfield[name='extension_description']")?.value &&
            document.querySelector("vscode-textfield[name='output_directory']")?.value &&
            document.querySelector("vscode-textfield[name='package_file_name']")?.value
        );
    }
}

function updateSuggestedSettingsStates(packageJson) {
    updateElementSuggestionClassName("#suggestion_icon", packageJson.icon && packageJson.icon !== "", "Missing icon file path (256x256 or 512x512 pixels)");
    updateElementSuggestionClassName("#suggestion_categories", packageJson.categories && packageJson.categories.length > 0, "Missing categories (helps people discover the extension)");
    updateElementSuggestionClassName("#suggestion_keywords", packageJson.keywords && packageJson.keywords.length > 0, "Missing keywords (helps people discover the extension)");
    updateElementSuggestionClassName("#suggestion_homepage", packageJson.homepage && packageJson.homepage.match(/^https?:\/\/.+/i), "Missing or invalid URL (suggested to provide more information)", true);
    updateElementSuggestionClassName("#suggestion_issues", packageJson.bugs?.url && packageJson.bugs.url.match(/^https?:\/\/.+/i), "Missing or invalid URL (suggested to get user feedback)", true);
    updateElementSuggestionClassName("#suggestion_repository", packageJson.repository?.url && packageJson.repository.url.match(/^(git\+)?https:\/\/.+/i), "Missing or invalid URL (can be ignored if not open-source)", true);
    updateElementSuggestionClassName("#suggestion_license", packageJson.license && packageJson.license !== "", "Missing package license name or file name (suggested so people know how they are permitted to use the package and any restrictions)", true);
}

function updateElementSuggestionClassName(elementSelector, isOk, errorMessage, errorIsWarning = false) {
    const elem = document.querySelector(elementSelector);
    if (!elem) return;

    elem.classList.remove("suggestion-ok", "suggestion-warn", "suggestion-error");

    if (isOk) {
        elem.classList.add("suggestion-ok");
        errorMessage = "";
    } else if (errorIsWarning) {
        elem.classList.add("suggestion-warn");
    } else {
        elem.classList.add("suggestion-error");
    }

    const spanElem = elem.querySelector("span");
    if (spanElem) spanElem.innerText = errorMessage ? `: ${errorMessage}` : "";
}
