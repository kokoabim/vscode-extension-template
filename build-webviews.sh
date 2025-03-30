#!/bin/bash

set -eo pipefail

function confirm_run() {
    [[ ${yes:-false} == true ]] && return

    read -r -p "${1:-Continue}? [y/N] " -n 1
    [[ $REPLY != "" ]] || echo -en "\033[1A" >&2
    echo >&2

    [[ $REPLY =~ ^[Yy]$ ]] || exit 0
}

yes=false
while getopts ":y" opt; do
    case $opt in
    y) yes=true ;;
    *)
        echo "Usage: ${0##*/} [-y]" >&2
        exit 1
        ;;
    esac
done

confirm_run "Compile (tsc) and build (webpack) webviews"

webview_dirs=$(find . -type d -name 'webview-*' -path '*/webviews/*')
for webview_dir in $webview_dirs; do
    pushd "$webview_dir" >/dev/null

    if [[ ! -f "package.json" || ! -f "tsconfig.json" || ! -f "webpack.config.ts" ]]; then
        continue
    fi

    basename "$webview_dir"

    echo "• Compiling..."
    tsc -p ./tsconfig.json

    echo "• Building..."
    webpack --node-env production --mode production --color --config ./webpack.config.ts

    popd >/dev/null
done
