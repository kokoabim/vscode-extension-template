#!/bin/bash

set -eo pipefail

cwd="${BASH_SOURCE[0]%/*}"

pushd "$cwd" > /dev/null

echo "Compiling..."
tsc -p ./tsconfig.json

echo "Building..."
webpack --node-env production --mode production --color --config ./webpack.config.ts

popd > /dev/null