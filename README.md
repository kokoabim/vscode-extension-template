<h1 align="center">
    <p><img src="https://github.com/kokoabim/vscode-extension-template/blob/main/icon/extension-512.png?raw=true" alt="logo" width="240"></p>
    <p>Visual Studio Code Extension Project Creator</p>
</h1>
<h3 align="center">Create your own Visual Studio Code extensions</h3>

# Getting Started

There are a few ways to get started. The easiest way is to have this extension installed and use a VSCode command.

### Use VSCode Command

If you're in VSCode with this extension installed, use the `Create New VSCode Extension...` command to create a new extension project from this extension's latest template.

### Use Git Repository

If you're not in VSCode with this extension installed, you can clone this extension's git repository.

1. Clone repository: `git@github.com:kokoabim/vscode-extension-template.git`
2. In its directory, run `./vscx-template.sh project <name> <publisher> <path>` (included in the repository) to create a new extension project using the latest template.
3. Install NPM dependencies by running `./npmx.sh install` (included in this repository) or `npm install`.
4. Open new extension directory in Visual Studio Code.
5. Modify the `./package.json` file for your extension: name, publisher, description, author, etc.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
6. Address all TODOs in the code (Find in Files for `TODO`) for your extension.

### Download Latest Template

1. Download the latest template: https://github.com/kokoabim/vscode-extension-template/raw/refs/heads/main/templates/vscx-template-latest.zip
2. Unzip the file into a new extension project directory.
3. Modify the `./package.json` file appropriate values for: name, publisher, description, author, etc.
    - Replace `change-me` instances with your extension's name.
    - Replace `Change Me` with appropriate values.
4. Modify some source files to replace `change-me` instances with your extension's name.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
5. Address all TODOs in the code (Find in Files for `TODO`) for your extension.

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
2. Modify this `./README.md` file to match your extension. This is what is displayed on the extension's marketplace page.
3. Modify the `./CHANGELOG.md` file to match your extension. This is what is displayed on the extension's marketplace page.
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

### Publishing to the Visual Studio Marketplace

Logged in to the Visual Studio Marketplace, go to https://marketplace.visualstudio.com/manage and upload the `.vsix` file.

See https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions for more information.
