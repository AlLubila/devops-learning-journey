#!/bin/bash

WEB_ROOT="usr/share/nginx/html"
HTML_FILE="$WEB_ROOT/index.html"

# check root
if [[$EUID -ne 0]]; then
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

# Install nginx if not installed

if rpm -q nginx > /dev/null 2>&1; then
echo "Nginx is already installed."
else 
echo "Installing Nginx..."
$PKG_MANAGER install nginx -y
fi

# start and enable nginx
echo "Starting Nginx service..."
system start nginx

echo "Enabling Nginx at boot..."
systemctl enable nginx

# Start firewalld if available
if systemctl list-unit-files | grep -q firewalld; then
echo "Starting firewalld..."
systemctl start firewalld

echo "Opening HTTP service in firewall..."
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
else
echo "firewalld not found. Skipping firewall configuration."
fi

# Create custom web page
echo "Creating custom index.html..."

cat > "$HTML_FILE" <<EOF
<!DOCTYPE html>
<html>
<head>
  <title>DevOps Learning Journey</title>
</head>
<body>
  <h1>DevOps Learning Journey</h1>
  <p>Nginx web server successfully configured on Linux.</p>
  <p>This project was created as part of my Linux and DevOps practice.</p>
</body>
</html>
EOF

# Verify nginx status
echo
echo "Checking Nginx service status..."
systemctl is-active nginx

echo
echo "Checking listening ports..."
ss -tulnp | grep nginx

echo
echo "Server IP address:"
hostname -I

echo
echo "Nginx setup completed."
echo "Open this in your browser:"
echo "http://$(hostname -I | awk '{print $1}')"















