<h1 align="center">
    <p><img src="https://github.com/kokoabim/vscode-extension-template/blob/main/icon/extension-512.png?raw=true" alt="logo" width="240"></p>
    <p>Visual Studio Code Extension Project Creator</p>
</h1>
<h3 align="center">Create your own Visual Studio Code extensions</h3>

# Getting Started

There are a few ways to get started.

### Use VSCode Command

This is the preferred way as it is the easiest, most convenient and will always use the latest template.

1. Install this extension: https://marketplace.visualstudio.com/items?itemName=spencerjames.extension-creator
2. Use its `Create New VSCode Extension...` command.
3. Fill in the prompts.
4. Open new extension directory in Visual Studio Code.
5. Modify the `./package.json` file with appropriate values: description, author, etc.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
6. Address all TODOs in source files (Find in Files: `TODO`) as appropriate.

### Use Git Repository

If you're not in VSCode with this extension installed, you can clone this extension's git repository.

1. Clone repository: `git@github.com:kokoabim/vscode-extension-template.git`
2. In its directory, run `./vscx-template.sh project <name> <publisher> <path>` (included in the repository) to create a new extension project using the latest template.
3. Install NPM dependencies by running `./npmx.sh install` (included in this repository) or `npm install`.
4. Open new extension directory in Visual Studio Code.
5. Modify the `./package.json` file with appropriate values: name, publisher, displayName, description, author, etc.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
6. Address all TODOs in source files (Find in Files: `TODO`) as appropriate.

### Download Latest Template

1. Download the latest template: https://github.com/kokoabim/vscode-extension-template/raw/refs/heads/main/templates/vscx-template-latest.zip
2. Unzip the file into a new extension project directory.
3. Modify the `./package.json` file with appropriate values: name, publisher, displayName, description, author, etc.
    - Replace `change-me` instances with your extension's name.
    - Replace `Change Me` with appropriate values.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
4. Modify source files (Find in Files: `change-me`) with your extension's name.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
5. Address all TODOs in source files (Find in Files: `TODO`) as appropriate.

# Debugging and Testing

### Debugging

There is a `Debug Extension` launch configuration in the `./.vscode/launch.json` file. This configuration will launch a new instance of Visual Studio Code with the extension loaded.

### Testing

There is a sample `./src/test/extension.test.ts` file that contains a simple test. You can add tests to this file or create new test files in the `./src/test/` directory with a `.test.ts` extension. You can include addition test file naming conventions by modifying the `files` property in the `./vscode-test.mjs` file.

There is three ways to run the tests:

1. The Testing Side Bar. \*
2. Use the `Run All Tests` command in the Command Palette. \*
3. The `Run Tests` launch configuration in the `./.vscode/launch.json` file.

\*: The first two ways to run tests will download a copy of Visual Studio Code (saved to `./.vscode-test/` directory) and runs the tests in that instance.

This uses `vscode-test` and `test-cli`. See https://github.com/microsoft/vscode-test, https://github.com/microsoft/vscode-test-cli and https://code.visualstudio.com/api/working-with-extensions/testing-extension for more information.

# Before Publishing

_Brand_ your extension.

1. Add an icon in `./icon/` directory and modify the `./package.json` file to match the icon's path. An icon size of 512x512 seems to render well.
2. Modify this `./README.md` file to match your extension. This is what is displayed on the extension's Marketplace page.
3. Modify the `./CHANGELOG.md` file to match your extension. This is what is displayed on the extension's Marketplace page.
4. Install the extension locally and try to break it. See below `./vscx.sh pub-install` command for more information.

# Publishing

### Requirements

Install `vsce` globally by running `npm install -g @vscode/vsce`. See https://github.com/microsoft/vscode-vsce for more information.

### Publishing CLI

Use `./vscx.sh` (not to be confused with `vsce` and is included in this repository) to create a `.vsix` file for release. While this script uses the aforementioned `vsce` NPM tool, this script also performs boilerplate tasks. Unless the `-d:` option is used, it will output a `.vsix` file in a `./releases/` directory that can be uploaded to the Visual Studio Marketplace.

#### Example commands

| Command                 | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `./vscx.sh publish`     | Create `.vsix` file for release.                                                                   |
| `./vscx.sh pub-install` | Create `.vsix` file for release and install it. Use this to test your extension locally installed. |
| `./vscx.sh -h`          | View help information.                                                                             |

A command you'll probably end up using a lot is `./vscx.sh -oxy pi` which will:

1. Confirm yes to run.
2. Create a `.vsix` file for release, overwriting existing `.vsix` file of the same version (if exists).
3. Uninstalling extension (if installed).
4. Install the extension using the new `.vsix` file.

Note: If you install a `.vsix` file locally, you'll want to uninstall it after testing to later install the new version from the Visual Studio Code Extensions Side Bar once published to the Marketplace.

### Publishing to the Visual Studio Marketplace

Log into to the Visual Studio Marketplace and go to https://marketplace.visualstudio.com/manage to upload the `.vsix` file.

See https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions for more information.
