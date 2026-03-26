#!/bin/bash

# =========================================
# permissions.sh
# Setup multi-user project with proper permissions
# Based on a real scenario: fixing a broken environment
# =========================================

# ⚠️ Must run as root or with sudo

# 1. Create groups
groupadd developers
groupadd devops

# 2. Create users
useradd dev1
useradd dev2
useradd ops1
useradd manager

# 3. Assign users to groups
usermod -G developers dev1
usermod -G developers dev2
usermod -G devops ops1
# manager stays independent 

# 4. Create project structure
mkdir -p /project/app/shared
mkdir -p /project/config
mkdir -p /project/logs
mkdir -p /project/scripts

# 5. Create files 
touch /project/app/app.js /project/app/config.json /project/app/db.conf /project/app/README.md
touch /project/config/app.conf /project/config/db.conf /project/config/secrets.env
touch /project/logs/access.log /project/logs/app.log /project/logs/error.log
touch /project/scripts/backup.sh /project/scripts/cleanup.sh /project/scripts/deploy.sh

# 6. Set ownership 
chown ops1:developers /project/app
chown ops1:developers /project/app/app.js
chown ops1:developers /project/app/config.json
chown ops1:devops /project/app/db.conf
chown ops1:developers /project/app/README.md
chown ops1:developers /project/app/shared

chown ops1:devops /project/config
chown ops1:devops /project/config/app.conf
chown ops1:devops /project/config/db.conf
chown ops1:devops /project/config/secrets.env

chown ops1:devops /project/logs
chown ops1:devops /project/logs/access.log
chown ops1:devops /project/logs/app.log
chown ops1:devops /project/logs/error.log

chown ops1:devops /project/scripts
chown ops1:devops /project/scripts/backup.sh
chown ops1:devops /project/scripts/cleanup.sh
chown ops1:devops /project/scripts/deploy.sh

# 7. Apply permissions
chmod 770 /project/app/shared                
chmod 660 /project/app/app.js
chmod 660 /project/app/config.json
chmod 640 /project/app/db.conf               
chmod 660 /project/app/README.md

chmod 640 /project/config/app.conf
chmod 640 /project/config/db.conf
chmod 600 /project/config/secrets.env        

chmod 750 /project/logs                        
chmod 640 /project/logs/access.log
chmod 640 /project/logs/app.log
chmod 640 /project/logs/error.log

chmod 750 /project/scripts                    
chmod 750 /project/scripts/backup.sh
chmod 750 /project/scripts/cleanup.sh
chmod 750 /project/scripts/deploy.sh

# 8. Create soft link for dev1 to access logs
ln -s /project/logs/app.log /home/dev1/app_log

# 9. Verification
echo "✅ Permissions applied:"
ls -lR /project
