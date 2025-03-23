// @ts-ignore

(function () {
    const vscode = acquireVsCodeApi(); // NOSONAR

    window.addEventListener("load", () => {
        const form = document.querySelector("form");
        form?.addEventListener("submit", event => {
            event.preventDefault();
            vscode.postMessage({
                type: 'create-extension-project',
                settings: Object.fromEntries(new FormData(form))
            });
        });

        document.querySelectorAll("vscode-textfield").forEach(textfield => {
            textfield.addEventListener("input", event => {
                const submitAction = document.querySelector("#submit-action");
                if (submitAction) {
                    submitAction.disabled = !(
                        document.querySelector("vscode-textfield[name='ext_publisher']")?.value &&
                        document.querySelector("vscode-textfield[name='ext_displayName']")?.value &&
                        document.querySelector("vscode-textfield[name='proj_directory']")?.value
                    );
                }

                if (event.target.name === "ext_displayName") {
                    const extensionNameTextfield = document.querySelector("vscode-textfield[name='ext_name']");
                    if (extensionNameTextfield) {
                        extensionNameTextfield.value = event.target.value.toLowerCase()
                            .replace(/ +/g, "-")
                            .replace(/[^a-z0-9\-._~]/g, "")
                            .replace(/-{2,}/g, "-")
                            .replace(/^-|-$/g, ""); // NOSONAR
                    }
                }
            });
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
                directory: document.querySelector("vscode-textfield[name='proj_directory']")?.value
            });
        });
    });

    window.addEventListener("message", event => {
        const message = event.data;

        console.log('Received message from VSCode:', message);

        switch (message.type) { // NOSONAR
            case "project-location-selected": {
                const projectLocationInput = document.querySelector("vscode-textfield[name='proj_directory']");
                if (projectLocationInput) projectLocationInput.value = message.directory;
                break;
            }
            default:
                console.log('Unknown message type:', message.type);
                break;
        }
    });
})();