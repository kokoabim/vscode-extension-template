#!/bin/bash

set -eo pipefail

script_title="NPM Tasks"
script_name="${0##*/}"
script_switches=chy

function usage() {
    end "$script_title

Use: $script_name [-c] clean|install
     $script_name data
     $script_name prepublish
     $script_name update

Actions:
 clean|c       Remove some build data$(text_red '†') and clean-install packages (npm-ci)
 data|d        Remove build data$(text_red '*')
 install|i     Perform data action and install packages (npm-install)
 prepublish|p  Perform install action, compile and omit dev dependencies
 update|u      Update packages except for '@types/((node)|(vscode))' and major versions (npm-update)

Switches:
 -c  Compile after install (tsc)
 -h  View this help
 -y  Confirm yes to run

$(text_red '*')Build data:
 ${build_data_paths[*]}

$(text_red '†')Some build data:
 ${some_build_data_paths[*]}
"
}

function end() {
    local e=$? || :
    set +e
    trap - EXIT SIGHUP SIGINT SIGQUIT SIGTERM

    local end_message="$1"
    local end_code=${2:-$e}

    if [[ "$end_message" != "" ]]; then
        if [ $end_code -ne 0 ]; then
            text_red "$script_name" >&2
            echo -n ": " >&2
        fi
        echo "$end_message" >&2
    fi

    exit $end_code
}

trap end EXIT SIGHUP SIGINT SIGQUIT SIGTERM

function text_ansi() {
    local code=$1
    shift
    echo -en "\033[${code}m$@\033[0m"
}
function text_red() { text_ansi 31 "$@"; }

function confirm_run() {
    [[ ${yes:-0} -eq 1 ]] && return

    read -p "${1:-Continue}? [y/N] " -n 1
    [[ $REPLY == "" ]] && echo -en "\033[1A"
    echo
    [[ $REPLY =~ ^[Yy]$ ]] || end
}

function remove_data() { #1: path array
    set -eo pipefail

    local paths=("$@")

    for path in "${paths[@]}"; do
        if [[ -d "$path" ]]; then
            echo "Removing directory $path..."
            rm -rf "$path"
        elif [[ -f "$path" ]]; then
            echo "Removing file $path..."
            rm -f "$path"
        fi
    done
}

build_data_paths=(./.vscode-test
    ./dist
    ./node_modules
    ./out
    ./package-lock.json
)
some_build_data_paths=(./.vscode-test
    ./dist
    ./out
)

compile_after_install=0
npm_clean_install=0
npm_install=0
prepublish=0
remove_data_only=0
update_packages=0
yes=0

while getopts "${script_switches}" OPTION; do
    case "$OPTION" in
    c) compile_after_install=1 ;;
    h) usage ;;
    y) yes=1 ;;
    *) usage ;;
    esac
done
shift $(($OPTIND - 1))

script_action=$1
if [[ "$script_action" == "clean" || "$script_action" == "c" ]]; then
    npm_clean_install=1
    script_action="Clean-Install packages"
elif [[ "$script_action" == "install" || "$script_action" == "i" ]]; then
    npm_install=1
    script_action="Remove build data and install packages"
elif [[ "$script_action" == "data" || "$script_action" == "d" ]]; then
    remove_data_only=1
    script_action="Remove build data"
elif [[ "$script_action" == "prepublish" || "$script_action" == "p" ]]; then
    npm_install=1
    compile_after_install=1
    prepublish=1
    script_action="Prepublish"
elif [[ "$script_action" == "update" || "$script_action" == "u" ]]; then
    update_packages=1
    script_action="Update packages"
else
    usage
fi

if [[ $prepublish != 1 && $remove_data_only != 1 && $update_packages != 1 && $compile_after_install == 1 ]]; then # only for clean and install
    script_action="$script_action and compile"
fi

confirm_run "$script_action"

if [[ $update_packages == 1 ]]; then
    cwd=$(pwd)
    outdated_packages=$(npm outdated --parseable --depth=0 | cut -d: -f1 | egrep -v '@types/((node)|(vscode))' | sed "s/${cwd//\//\\/}\/node_modules\///") || true

    if [[ "$outdated_packages" == "" ]]; then
        end "No packages to update."
    fi

    echo -e "Updating packages:\n${outdated_packages[@]}"
    npm update --save ${outdated_packages[*]}

    major_versions=$(npm outdated --parseable --depth=0 | cut -d: -f4 | egrep -v '@types/((node)|(vscode))' | sed "s/${cwd//\//\\/}\/node_modules\///") || true
    if [[ "$major_versions" != "" ]]; then
        echo
        text_red "Major versions not updated:\n"
        echo "${major_versions[@]}"
    fi

    end
fi

if [[ $remove_data_only == 1 || $npm_install == 1 ]]; then
    remove_data "${build_data_paths[@]}"

    if [[ $remove_data_only == 1 ]]; then
        end
    fi
elif [[ $npm_clean_install == 1 ]]; then
    remove_data "${some_build_data_paths[@]}"
fi

if [[ $npm_clean_install == 1 ]]; then
    echo "Clean-Installing NPM packages..."
    npm ci
elif [[ $npm_install == 1 ]]; then
    echo "Installing NPM packages..."
    npm install
fi

if [[ $compile_after_install == 1 ]]; then
    echo "Compiling..."
    tsc -p ./
fi

if [[ $prepublish == 1 ]]; then
    echo "Omitting dev dependencies..."
    npm prune --omit=dev
fi
