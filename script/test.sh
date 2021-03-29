#!/usr/bin/env bash

echo ""
echo "Compiling the project..."
yarn -s build

echo ""
echo "Compiling the project with its own build..."
mv dist .test
./.test/cjs/index.js

echo ""
echo "Diffing the builds..."

echo ""
diff --brief --recursive .test dist && echo "The builds are identical. The project builds itself correctly." || echo "The project does not build itself correctly."
