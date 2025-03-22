// @ts-check

(function () {
    // @ts-ignore
    const vscode = acquireVsCodeApi(); // NOSONAR

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) { // NOSONAR
            default:
                console.log('Unknown message type:', message.type);
                break;
        }
    });
})();