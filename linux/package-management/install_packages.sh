#!/bin/bash

PACKAGES=("curl" "wget" "vim" "git" "tree")

# Check if user is root
if [[ $EUID -ne 0 ]]; then
  echo "Please run this script with sudo or as root."
  exit 1
fi

# Detect package manager
if command -v dnf > /dev/null 2>&1; then
  PKG_MANAGER="dnf"
elif command -v yum > /dev/null 2>&1; then
  PKG_MANAGER="yum"
else
  echo "No supported package manager found."
  exit 1
fi

echo "Using package manager: $PKG_MANAGER"
echo

# Install packages
for package in "${PACKAGES[@]}"
do
  echo "Checking package: $package"

  # Check if package is already installed
  if rpm -q "$package" > /dev/null 2>&1; then
    echo "$package is already installed."
  else
    echo "Installing $package..."

    $PKG_MANAGER install -y "$package"

    if [[ $? -eq 0 ]]; then
      echo "$package installed successfully."
    else
      echo "Failed to install $package."
    fi
  fi

  echo
done

echo "Package installation process completed."
