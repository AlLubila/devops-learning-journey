#!/bin/bash


# 1. CREATE GROUPS

echo "Creating groups..."

groupadd developers
groupadd devops
groupadd managers
groupadd shared-group

# 2. CREATE USERS

echo "Creating users..."

useradd dev1
useradd dev2
useradd ops1
useradd manager1

# 3. ASSIGN USERS TO GROUPS

echo "Assigning users to groups..."

usermod -aG developers dev1
usermod -aG developers dev2

usermod -aG devops ops1

usermod -aG managers manager1


usermod -aG shared-group dev1
usermod -aG shared-group dev2
usermod -aG shared-group ops1
usermod -aG shared-group manager1


# 4. SUDO CONFIGURATION

echo "Configuring sudo access..."

usermod -aG sudo ops1

# 5. CREATE DIRECTORY STRUCTURE

echo "Creating directories..."

mkdir -p /company/projects
mkdir -p /company/dev-shared
mkdir -p /company/secure
mkdir -p /company/shared
mkdir -p /company/tmp

# 6. SET OWNERSHIP

echo "Setting ownership..."

chown dev1:developers /company/projects
chown dev1:developers /company/dev-shared
chown ops1:devops /company/secure
chown root:root /company/shared
chown root:root /company/tmp


# 7. SET PERMISSIONS
echo "Setting permissions..."

chmod 770 /company/projects

chmod 2770 /company/dev-shared

chmod 770 /company/secure

chmod 1777 /company/shared

chmod 1777 /company/tmp


echo "Setup complete!"
