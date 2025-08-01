#!/usr/bin/env bash

# Node.js version check script
# Verify that Node.js versions in .nvmrc and package.json (volta) match

set -e

# Get versions
NVM_VERSION=$(tr -d '\n' < .nvmrc)
VOLTA_VERSION=$(node -p "require('./package.json').volta.node")

echo "Checking Node.js versions..."
echo "NVM: $NVM_VERSION"
echo "Volta: $VOLTA_VERSION"

# Validate
if [ -z "$NVM_VERSION" ]; then
  echo "Error: .nvmrc is empty or missing."
  exit 1
fi

if [ -z "$VOLTA_VERSION" ] || [ "$VOLTA_VERSION" = "undefined" ]; then
  echo "Error: volta.node is not defined in package.json."
  exit 1
fi

if [ "$VOLTA_VERSION" != "$NVM_VERSION" ]; then
  echo "Error: Node.js versions do not match."
  exit 1
fi

echo -e "\033[0;32m✓ Check passed!\033[0m"
