#!/usr/bin/env bash

# Node.js version check script
# Verify that Node.js versions in .nvmrc, package.json (volta), and .devcontainer/devcontainer.json match

set -e

# Get versions
get_versions() {
  NVM_VERSION=$(tr -d '\n' < .nvmrc)
  VOLTA_VERSION=$(node -p "require('./package.json').volta.node")
  DEVCONTAINER_VERSION=$(node -p "
    const fs = require('fs');
    const content = fs.readFileSync('.devcontainer/devcontainer.json', 'utf8');
    const json = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const parsed = JSON.parse(json);
    parsed.features['ghcr.io/devcontainers/features/node:1'].version;
  ")
}

# Main check
get_versions

echo "Checking Node.js versions..."
echo "NVM: $NVM_VERSION"
echo "Volta: $VOLTA_VERSION"
echo "Devcontainer: $DEVCONTAINER_VERSION"

# Validate presence
[ -z "$NVM_VERSION" ] && { echo "Error: .nvmrc is empty or missing."; exit 1; }
[ -z "$VOLTA_VERSION" ] || [ "$VOLTA_VERSION" = "undefined" ] && { echo "Error: volta.node is not defined in package.json."; exit 1; }
[ -z "$DEVCONTAINER_VERSION" ] && { echo "Error: Node.js version is not defined in .devcontainer/devcontainer.json."; exit 1; }

# Check all versions match
if [ "$VOLTA_VERSION" = "$NVM_VERSION" ] && [ "$DEVCONTAINER_VERSION" = "$NVM_VERSION" ]; then
  echo -e "\033[0;32m✓ Check passed!\033[0m"
else
  echo "Error: Node.js versions do not match."
  exit 1
fi
