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
script_ver="1.0.1"
script_title="Visual Studio Code Extension Template"
script_options="f:"
script_switches="chioy"

function usage() {
    end "$script_title (v$script_ver)

Use: $script_name [-fo] create
     $script_name [-cfio] project $(text_underline name) $(text_underline publisher) $(text_underline path)

Actions:
 create   Create the VSCode extension template files (latest and versioned) in $templates_directory directory
 project  Create a new VSCode extension project from template file
           • $(text_underline name)      Extension name
           • $(text_underline publisher) Extension publisher ID
           • $(text_underline path)      Directory path to create project directory in

Options:
 -f $(text_underline path)  Template file to create (create; default: $templates_directory/vscx-template-latest.zip) or use (project)
           • With create action, a versioned file is not created
           • With project action, the file at $(text_underline path) is used instead of the latest template file

Switches:
 -c  Open project in VSCode after creating
 -h  View this help
 -i  Install dependencies after creating project (npm install)
 -o  Overwrite template versioned file (create), template file (create with -f:) or project directory (project)
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
install_dependencies=0
open_after_create=0
overwrite=0
pkg_json_file="./package.json"

templates_directory="./templates"
template_file="$(realpath $templates_directory)/vscx-template-latest.zip"

yes=0

while getopts "${script_options}${script_switches}" OPTION; do
    case "$OPTION" in
    c) open_after_create=1 ;;
    f)
        template_file="$OPTARG"
        create_versioned_file=0
        custom_template_file=1
        ;;
    h) usage ;;
    i) install_dependencies=1 ;;
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
    ext_name=$(echo "$2" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    ext_display_name="$2"
    ext_publisher=$(echo "$3" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    ext_path="$4"

    [[ "$ext_name" != "" ]] || end "Extension name is required" 1
    [[ "$ext_publisher" != "" ]] || end "Extension publisher is required" 1
    [[ "$ext_path" != "" ]] || end "Project path is required" 1

    [[ ! "$ext_name" =~ ^[a-z0-9-\._~]+$ ]] || end "Invalid extension name: $ext_name" 1
    [[ ! "$ext_publisher" =~ ^[a-z0-9-\._~]+$ ]] || end "Invalid extension publisher: $ext_publisher" 1
    [[ -d "$ext_path" ]] || end "Directory does not exists: $ext_path" 1

    ext_id="$ext_publisher.$ext_name"

    [[ -f "$template_file" ]] || end "Template file not found: $template_file" 1

    ext_path=$(realpath "$ext_path")
    ext_directory="$ext_path/vscode-$ext_name"
    [[ -d "$ext_directory" && $overwrite -eq 0 ]] && end "Directory already exists (use -o to overwrite): $ext_directory" 1

    echo "Create VSCode extension project:"
    echo "• Display Name: $ext_display_name"
    echo "• Name: $ext_name"
    echo "• Publisher: $ext_publisher"
    echo "• ID: $ext_id"
    echo "• Directory: $ext_directory"
    [[ $overwrite -ne 1 ]] || echo "• Overwrite existing directory (if exists)"
    [[ $install_dependencies -ne 1 ]] || echo "• Install NPM dependencies"
    [[ $open_after_create -ne 1 ]] || echo "• Open project in VSCode after creating"
    echo "• Template file: $template_file"

else # create
    if [[ $create_versioned_file -eq 1 ]]; then
        [[ -f "$pkg_json_file" ]] || end "File not found: $pkg_json_file" 1
        pkg_version=$(jq -r '.version' package.json)
        ([[ "$pkg_version" == "" || "$pkg_version" == "null" ]] && end "Failed to get version from $pkg_json_file" 1) || true

        template_versioned_file="$(realpath $templates_directory)/vscx-template-v$pkg_version.zip"
        [[ -f "$template_versioned_file" && $overwrite -eq 0 ]] && end "File already exists (use -o to overwrite): $template_versioned_file" 1
    fi

    if [[ $custom_template_file -eq 1 ]]; then
        if [[ -f "$template_file" ]]; then
            if [[ $overwrite -eq 1 ]]; then
                echo "Removing existing file..."
                rm -f "$template_file"
            else
                end "File already exists (use -o to overwrite): $template_file" 1
            fi
        fi
    fi

    echo "Create VSCode extension template:"
    [[ $create_versioned_file -ne 1 ]] || echo "• Version: $pkg_version"
    echo "• Template file: $template_file"
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
    if [[ -d "$ext_directory" ]]; then
        if [[ $overwrite -eq 1 ]]; then
            echo "Removing existing directory..."
            rm -rf "$ext_directory"
        else
            end "Directory already exists (use -o to overwrite): $ext_directory" 1
        fi
    fi

    echo "Creating project directory..."
    mkdir -p "$ext_directory"

    echo "Unzipping template files to project directory..."
    unzip -d "$ext_directory" "$template_file" || end "Failed to unzip file" 1

    echo "Updating project files..."
    pushd "$ext_directory" >/dev/null

    jq ".displayName = \"$ext_display_name\" | .name = \"$ext_name\" | .publisher = \"$ext_publisher\" | .contributes.configuration.title = \"$ext_display_name\"" package.json >package.json.tmp
    mv package.json.tmp package.json

    sed -i '' "s/change-me/$ext_id/g" package.json
    sed -i '' "s/change-me/$ext_id/g" src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts
    sed -i '' "s/change-me/$ext_id/g" src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts

    popd >/dev/null

    echo "Finished creating project: $ext_directory"

    if [[ $install_dependencies -eq 1 ]]; then
        echo "Installing NPM dependencies..."
        pushd "$ext_directory" >/dev/null
        ./npmx.sh -y install
        popd >/dev/null
    fi

    if [[ $open_after_create -eq 1 ]]; then
        echo "Opening project in VSCode..."
        pushd "$ext_directory" >/dev/null
        code "$ext_directory" &
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

    if [[ -f "$template_file" && $custom_template_file -ne 1 ]]; then
        echo "Removing existing latest file..."
        rm -f "$template_file"
    fi

    echo "Creating template file..."
    zip -rX "$template_file" . \
        -x ".DS_Store" \
        -x "*/.DS_Store" \
        -x ".git/*" \
        -x ".vscode-test/*" \
        -x "CHANGELOG.md" \
        -x "dist/*" \
        -x "icon/*" \
        -x "images/*" \
        -x "node_modules/*" \
        -x "package-lock.json" \
        -x "package.json" \
        -x "README.md" \
        -x "releases/*" \
        -x "templates/*" \
        -x "vscx-template.sh" \
        -x "webviews/*" \
        -x "src/Utilities/*" \
        -x "src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts" \
        -x "src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts" \
        -x "src/VSCodeExtension/VSCodeApi.ts" ||
        end "Failed to create zip file" $?

    template_file=$(realpath "$template_file")

    echo "Creating temporary template files..."
    sed -n '/^# Requirements/,$p' README.md >"$templates_directory/files/README.md"
    mkdir -p "$templates_directory/files/src/VSCodeExtension"
    sed "s/extension-creator/change-me/g" src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts >"$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"
    sed "s/extension-creator/change-me/g" src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts >"$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts"

    perl -0777 -i -pe 's/\n?[\t ]*\/\/ TEMPLATE-REMOVE-START.*?\/\/ TEMPLATE-REMOVE-END\n?//gs' "$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"
    perl -0777 -i -pe 's/[\t ]*((\/\*\* TEMPLATE-ADD-START)|(TEMPLATE-ADD-END \*\/))\n//gs' "$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"

    pushd "${templates_directory}/files" >/dev/null

    echo "Adding temporary template files to latest template file..."
    zip -rX "$template_file" * \
        -x ".DS_Store" \
        -x "*/.DS_Store" || end "Failed to add files to zip" $?

    popd >/dev/null

    echo "Removing temporary template files..."
    rm -f "$templates_directory/files/README.md"
    rm -f "$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtension.ts"
    rm -f "$templates_directory/files/src/VSCodeExtension/ExtensionTemplateVSCodeExtensionSettings.ts"

    if [[ $create_versioned_file -eq 1 ]]; then
        echo "Creating versioned template file..."
        cp "$template_file" "$template_versioned_file"
    fi

    echo "Template file created: $template_file"
    [[ $create_versioned_file -ne 1 ]] || echo "Versioned file created: $template_versioned_file"
fi
