# linux/package-management

## Overview

This project is part of my DevOps learning journey.

The goal of this project is to automate package installation on RPM-based Linux distributions using Bash scripting.

The script:
- checks root privileges
- detects the available package manager (`dnf` or `yum`)
- verifies if packages are already installed
- installs missing packages automatically

---

## Technologies Used

- Linux
- Bash
- RPM
- YUM
- DNF
- Git

---

## Project Structure

```bash
package-management/
├── README.md
└── install_packages.sh
