<h1 align="center">
    <p><img src="https://github.com/kokoabim/vscode-extension-template/blob/main/icon/extension-512.png?raw=true" alt="logo" width="240"></p>
    <p>Visual Studio Code Extension Creator</p>
</h1>
<h3 align="center">Create and publish your own Visual Studio Code extensions</h3>

# Requirements

-   Visual Studio Marketplace account: https://marketplace.visualstudio.com/manage
-   Visual Studio Code: https://code.visualstudio.com/download
-   Node.js: https://nodejs.org/en/download/
-   Visual Studio Code Extensions (`vsce`) command-line tool: Run `npm install -g @vscode/vsce`

# Getting Started

There are a few options to get started.

### Option 1 (Preferred): Use VSCode Command

This is option is the easiest, most convenient and will always use the latest template.

1. Install this extension: https://marketplace.visualstudio.com/items?itemName=spencerjames.extension-creator
2. Use its `Create New VSCode Extension...` command or [Create VS Code Extension] button on Explorer Side Bar (visible when no folder is open).
3. Fill in the prompts.
4. Open new extension directory in Visual Studio Code.
5. Modify the `./package.json` file with appropriate values: description, author, etc.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
6. Address all TODOs in source files (Find in Files: `TODO`) as appropriate.

### Option 2: Use Git Repository

If you're not in VSCode with this extension installed, you can clone this extension's git repository.

1. Clone repository: `git@github.com:kokoabim/vscode-extension-template.git`
2. In its directory, run `./vscx-template.sh project <name> <publisher> <path>` (included in the repository) to create a new extension project using the latest template.
3. Install NPM dependencies by running `./npmx.sh install` (included in this repository) or `npm install`.
4. Open new extension directory in Visual Studio Code.
5. Modify the `./package.json` file with appropriate values: name, publisher, displayName, description, author, etc.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
6. Address all TODOs in source files (Find in Files: `TODO`) as appropriate.

### Option 3: Download Latest Template

1. Download the latest template: https://github.com/kokoabim/vscode-extension-template/raw/refs/heads/main/templates/vscx-template-latest.zip
2. Unzip the file into a new extension project directory.
3. Modify the `./package.json` file with appropriate values: name, publisher, displayName, description, author, etc.
    - Replace `change-me` instances with your extension's name.
    - Replace `Change Me` with appropriate values.
    - See https://code.visualstudio.com/api/references/extension-manifest for more information.
4. Modify source files (Find in Files: `change-me`) with your extension's name.
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

# Included Command-Line Tools

A couple of tools are included in this repository to help with development, testing and publishing.

| Tool        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `./npmx.sh` | Helper for NPM tasks                                     |
| `./vscx.sh` | Helper for creating, testing and releasing `.vsix` files |

Use the `-h` switch to view help information for each tool.

### npmx.sh

-   Cleans, installs and updates dependencies.
-   Compiles package for publishing — omits dev dependencies; uses publish TypeScript configuration.
-   Used by `./package.json` scripts.

### vscx.sh

-   Creates `.vsix` files for local testing and release.
-   Versions `.vsix` files using the `./package.json` version.
-   Installs and uninstalls `.vsix` files for local testing.
-   Uses global `vsce` NPM tool to create `.vsix` files.
-   Note: `vsce` calls `./package.json` `vscode:prepublish` script during its process which in turn calls `./npmx.sh`.

# Before Publishing

_Brand_ your extension.

1. Add an icon in `./icon/` directory and modify the `./package.json` file to match the icon's path. An icon size of 512x512 seems to render well.
2. Modify this `./README.md` file to match your extension. This is what is displayed on the extension's Visual Studio Marketplace page.
3. Modify the `./CHANGELOG.md` file to match your extension. This is what is displayed on the extension's Visual Studio Marketplace page.
4. Install the extension locally and try to break it. See below `./vscx.sh pub-install` command for more information.

# Publishing

### Create `.vsix` file

Use `./vscx.sh` (included in this repository; not to be confused with `vsce`) to create a `.vsix` file for release. Unless the `-d:` option is used, it will output a `.vsix` file in a `./releases/` directory that can be uploaded to the Visual Studio Marketplace.

`./vscx.sh` uses `./npmx.sh` to install dependencies and compile the extension for release. `./npmx.sh` will omit dev dependencies and use a publish TypeScript configuration to compile the extension.

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

Note: If you install a `.vsix` file locally, you'll want to uninstall it after testing to later install the new version from the Visual Studio Code Extensions Side Bar once published to the Visual Studio Marketplace.

### Publishing `.vsix` file to the Visual Studio Marketplace

Log into to the Visual Studio Marketplace and go to https://marketplace.visualstudio.com/manage to upload the `.vsix` file.

See https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions and https://code.visualstudio.com/docs/editor/extension-marketplace for more information.
