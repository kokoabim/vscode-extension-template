#!/bin/bash

# ==============================================================================
# vscx-template — Visual Studio Code Extension Template
# Spencer James, https://swsj.me
# ==============================================================================
# The MIT License (MIT)
# All rights reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
# ==============================================================================

set -eo pipefail

script_name="${0##*/}"
script_ver="1.0.2"
script_title="Visual Studio Code Extension Template"
script_options="f:x:"
script_switches="chioy"

function usage() {
    end "$script_title (v$script_ver)

Use: $script_name [-fo] create
     $script_name [-cfio] [-x:] project $(text_underline publisher) $(text_underline displayName) $(text_underline name) $(text_underline parentDir)

Actions:
 create   Create the VS Code extension template files (latest and versioned) in $templates_directory directory
 project  Create a new VS Code extension project from template file
           • $(text_underline publisher)   Extension publisher ID
           • $(text_underline displayName) Extension display name
           • $(text_underline name)        Extension name
           • $(text_underline parentDir)   Parent directory where new project directory is created

Options:
 -f $(text_underline path)   Template file to create (create action; default: $template_file_path) or use (project action)
            • With create action, a versioned file is not created
            • With project action, the file at $(text_underline path) is used instead of the latest template file
 -x $(text_underline class)  Extension TypeScript class name (default: class-name-safe $(text_underline displayName))

Switches:
 -c  Open project in VS Code after creating
 -h  View this help
 -i  Install NPM package dependencies after creating project (npm install)
 -o  Overwrite template versioned file (create action), template file (create action with -f:) or project directory (project action)
 -y  Confirm yes to run
"
}

function end() {
    local e=$? || :
    set +e
    trap - EXIT SIGHUP SIGINT SIGQUIT SIGTERM

    local end_message="$1"
    local end_code=${2:-$e}

    if [[ "$end_message" != "" ]]; then
        if [ "$end_code" -ne 0 ]; then
            text_red "$script_name" >&2
            echo -n ": " >&2
        fi
        echo "$end_message" >&2
    fi

    exit "$end_code"
}
trap end EXIT SIGHUP SIGINT SIGQUIT SIGTERM

function text_ansi() {
    local code=$1
    shift
    echo -en "\033[${code}m$*\033[0m"
}
function text_red() { text_ansi 31 "$@"; }
function text_underline() { text_ansi 4 "$@"; }

# shellcheck disable=SC2120
function confirm_run() {
    [[ ${yes:-0} -eq 1 ]] && return

    read -r -p "${1:-Continue}? [y/N] " -n 1
    [[ $REPLY == "" ]] && echo -en "\033[1A"
    echo
    [[ $REPLY =~ ^[Yy]$ ]] || end
}

create_versioned_file=1
custom_template_file=0
install_npm_dependencies=0
open_after_create=0
overwrite=0
pkg_json_file="./package.json"

templates_directory="./templates"
template_filename="vscx-template-latest.zip"
template_file_path="$(realpath $templates_directory)/${template_filename}"

yes=0

while getopts "${script_options}${script_switches}" OPTION; do
    case "$OPTION" in
    c) open_after_create=1 ;;
    f)
        template_file_path="$OPTARG"
        create_versioned_file=0
        custom_template_file=1
        ;;
    h) usage ;;
    i) install_npm_dependencies=1 ;;
    o) overwrite=1 ;;
    y) yes=1 ;;
    *) usage ;;
    esac
done
shift $((OPTIND - 1))

[[ "$1" != "" ]] || usage
script_action=$1

[[ "$script_action" =~ ^(create|project)$ ]] || end "Invalid action: $script_action" 1

if [[ "$script_action" == "project" ]]; then
    extension_publisher=$(echo "$2" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    extension_display_name="$3"
    extension_name=$(echo "$4" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    project_parent_directory="$5"

    [[ "$extension_publisher" != "" ]] || end "Extension publisher is required" 1
    [[ "$extension_display_name" != "" ]] || end "Extension display name is required" 1
    [[ "$extension_name" != "" ]] || end "Extension name is required" 1
    [[ "$project_parent_directory" != "" ]] || end "Parent directory is required" 1

    [[ ! "$extension_name" =~ ^[a-z0-9-\._]+$ ]] || end "Invalid extension name: $extension_name" 1
    [[ ! "$extension_publisher" =~ ^[a-z0-9-\._]+$ ]] || end "Invalid extension publisher: $extension_publisher" 1
    [[ -d "$project_parent_directory" ]] || end "Directory does not exists: $project_parent_directory" 1

    [[ -f "$template_file_path" ]] || end "Template file not found: $template_file_path" 1

    project_parent_directory=$(realpath "$project_parent_directory")
    extension_project_directory="$project_parent_directory/vscode-$extension_name"
    [[ -d "$extension_project_directory" && $overwrite -eq 0 ]] && end "Directory already exists (use -o to overwrite): $extension_project_directory" 1

    extension_className="$(echo "$extension_display_name" | sed -E 's/[^a-zA-Z0-9_]+//g')VSCodeExtension"

    echo "Create VS Code extension project:"
    echo "• Publisher: $extension_publisher"
    echo "• Display Name: $extension_display_name"
    echo "• Name: $extension_name"
    echo "• Class Name: $extension_className"
    echo "• Directory: $extension_project_directory"
    [[ $overwrite -ne 1 ]] || echo "• Overwrite existing directory (if exists)"
    [[ $install_npm_dependencies -ne 1 ]] || echo "• Install NPM package dependencies"
    [[ $open_after_create -ne 1 ]] || echo "• Open project in VS Code after creating"
    echo "• Template file: $template_file_path"

else # create
    if [[ $create_versioned_file -eq 1 ]]; then
        [[ -f "$pkg_json_file" ]] || end "File not found: $pkg_json_file" 1
        pkg_version=$(jq -r '.version' package.json)
        ([[ "$pkg_version" == "" || "$pkg_version" == "null" ]] && end "Failed to get version from $pkg_json_file" 1) || true

        template_versioned_file="$(realpath $templates_directory)/vscx-template-v${pkg_version}.zip"
        [[ -f "$template_versioned_file" && $overwrite -eq 0 ]] && end "File already exists (use -o to overwrite): $template_versioned_file" 1
    fi

    if [[ $custom_template_file -eq 1 ]]; then
        if [[ -f "$template_file_path" ]]; then
            if [[ $overwrite -eq 1 ]]; then
                echo "Removing existing file..."
                rm -f "$template_file_path"
            else
                end "File already exists (use -o to overwrite): $template_file_path" 1
            fi
        fi
    fi

    echo "Create VS Code extension template:"
    [[ $create_versioned_file -ne 1 ]] || echo "• Version: $pkg_version"
    echo "• Template file: $template_file_path"
    [[ $create_versioned_file -ne 1 ]] || echo "• Versioned file: $template_versioned_file"
    if [[ $overwrite -eq 1 ]]; then
        if [[ $custom_template_file -ne 1 ]]; then
            echo "• Overwrite existing versioned file (if exists)"
        else
            echo "• Overwrite existing template file (if exists)"
        fi
    fi
fi

confirm_run

if [[ "$script_action" == "project" ]]; then
    if [[ -d "$extension_project_directory" ]]; then
        if [[ $overwrite -eq 1 ]]; then
            echo "Removing existing directory..."
            rm -rf "$extension_project_directory"
        else
            end "Directory already exists (use -o to overwrite): $extension_project_directory" 1
        fi
    fi

    echo "Creating project directory..."
    mkdir -p "$extension_project_directory"

    echo "Unzipping template files to project directory..."
    unzip -d "$extension_project_directory" "$template_file_path" || end "Failed to unzip file" 1

    echo "Updating project files..."
    pushd "$extension_project_directory" >/dev/null

    jq ".displayName = \"$extension_display_name\" | .name = \"$extension_name\" | .publisher = \"$extension_publisher\" | .contributes.configuration.title = \"$extension_display_name\"" package.json >package.json.tmp
    mv package.json.tmp package.json

    for f in "package.json" src/VSCodeExtension/ExtensionTemplateVSCodeExtension*.ts; do
        sed -i '' "s/{{displayName}}/$extension_display_name/g" "$f"
        sed -i '' "s/{{name}}/$extension_name/g" "$f"
        sed -i '' "s/{{publisher}}/$extension_publisher/g" "$f"
    done

    for f in "src/extension.ts" src/VSCodeExtension/ExtensionTemplateVSCodeExtension*.ts; do
        sed -i '' "s/ExtensionTemplateVSCodeExtension/$extension_className/g" "$f"
    done

    for f in src/VSCodeExtension/ExtensionTemplateVSCodeExtension*.ts; do
        mv "$f" "${f/ExtensionTemplateVSCodeExtension/$extension_className}"
    done

    popd >/dev/null

    echo "Finished creating project: $extension_project_directory"

    if [[ $install_npm_dependencies -eq 1 ]]; then
        echo "Installing NPM package dependencies..."
        pushd "$extension_project_directory" >/dev/null
        ./npmx.sh -y install
        popd >/dev/null
    fi

    if [[ $open_after_create -eq 1 ]]; then
        echo "Opening project in VS Code..."
        pushd "$extension_project_directory" >/dev/null
        code "$extension_project_directory" &
        disown
        popd >/dev/null
    fi

elif [[ "$script_action" == "create" ]]; then
    if [[ $create_versioned_file -eq 1 ]] && [[ -f "$template_versioned_file" ]]; then
        if [[ $overwrite -eq 1 ]]; then
            echo "Removing existing versioned file..."
            rm -f "$template_versioned_file"
        else
            end "File already exists (use -o to overwrite): $template_versioned_file" 1
        fi
    fi

    if [[ -f "$template_file_path" && $custom_template_file -ne 1 ]]; then
        echo "Removing existing latest file..."
        rm -f "$template_file_path"
    fi

    echo "Creating template file..."
    zip -rX "$template_file_path" . \
        -x "*/.DS_Store" \
        -x ".DS_Store" \
        -x ".git/*" \
        -x ".vscode-test/*" \
        -x "build-webviews.sh" \
        -x "CHANGELOG.md" \
        -x "README.md" \
        -x "dist/*" \
        -x "icon/*" \
        -x "images/*" \
        -x "node_modules/*" \
        -x "package-lock.json" \
        -x "package.json" \
        -x "releases/*" \
        -x "src/Utilities/*" \
        -x "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts" \
        -x "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts" \
        -x "src/VSCodeExtension/VSCodeApi.ts" \
        -x "templates/*" \
        -x "vscx-template.sh" \
        -x "webviews/*" ||
        end "Failed to create zip file" $?

    template_file_path=$(realpath "$template_file_path")

    echo "Creating temporary template files..."
    sed -n '/^# 📦 Requirements/,$p' README.md >"$templates_directory/files/README.md"

    mkdir -p "$templates_directory/files/src/VSCodeExtension"
    for f in src/VSCodeExtension/ExtensionTemplateVSCodeExtension*.ts; do
        cp -f "$f" "$templates_directory/files/$f"
        if [[ -f "$f" ]]; then
            perl -0777 -i -pe 's/\n?[\t ]*\/\/ TEMPLATE-REMOVE-START.*?\/\/ TEMPLATE-REMOVE-END\n?//gs' "$templates_directory/files/$f"
            perl -0777 -i -pe 's/[\t ]*((\/\*\* TEMPLATE-ADD-START)|(TEMPLATE-ADD-END \*\/))\n//gs' "$templates_directory/files/$f"
        fi
    done

    pushd "${templates_directory}/files" >/dev/null

    echo "Adding temporary template files to latest template file..."
    zip -rX "$template_file_path" * \
        -x ".DS_Store" \
        -x "*/.DS_Store" || end "Failed to add files to zip" $?

    popd >/dev/null

    echo "Removing temporary template files..."
    rm -f "$templates_directory/files/README.md"
    rm -f "$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtension*.ts"

    if [[ $create_versioned_file -eq 1 ]]; then
        echo "Creating versioned template file..."
        cp "$template_file_path" "$template_versioned_file"
    fi

    echo "Template file created: $template_file_path"
    [[ $create_versioned_file -ne 1 ]] || echo "Versioned file created: $template_versioned_file"
fi
