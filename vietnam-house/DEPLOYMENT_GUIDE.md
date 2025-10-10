# Vietnam House - Complete Deployment Guide

**Last Updated:** October 10, 2025
**Project Type:** React 19 + Vite 7 SPA
**Deployment Target:** VPS (Ubuntu/Debian recommended)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Files to Include in Repository](#files-to-include-in-repository)
4. [Build & Deployment Steps](#build--deployment-steps)
5. [VPS Setup Guide](#vps-setup-guide)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL/HTTPS Setup](#sslhttps-setup)
8. [Performance Optimization](#performance-optimization)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Technology Stack

```
Frontend Framework:  React 19.1.1
Build Tool:          Vite 7.1.7
Styling:             Tailwind CSS 3.4.1
Routing:             React Router DOM 7.9.3
Maps:                Leaflet 1.9.4 + React-Leaflet 5.0.0
Icons:               Lucide React
UI Components:       Radix UI (Dialog, Slot)
```

### Project Structure

```
vietnam-house/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Route pages
│   ├── data/           # Static data (menu)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── dist/               # Build output (generated)
└── [config files]      # Vite, Tailwind, etc.
```

---

## Pre-Deployment Checklist

### ✅ Code Quality

- [x] All features tested locally
- [x] No console errors in production build
- [x] Mobile responsiveness verified
- [x] Cross-browser testing completed
- [x] Accessibility checked (WCAG 2.1 AA)

### ✅ Content Verification

- [x] All restaurant information is correct:
  - Phone: 665 559 841
  - Email: kontakt@vietnamhouse.pl
  - Address: Prymasa Stefana Wyszyńskiego 4, 22-400 Zamość
  - Opening hours accurate
- [x] Menu items populated
- [x] Images optimized
- [x] Privacy policy reviewed
- [x] Cookie consent functional

### ✅ SEO & Meta Tags

- [x] Page titles optimized
- [x] Meta descriptions added
- [x] Open Graph tags for social sharing
- [x] Favicon in place
- [x] Canonical URLs set
- [x] robots.txt configured (if needed)
- [x] sitemap.xml created (optional)

### ✅ Security

- [x] No hardcoded secrets
- [x] HTTPS enforced
- [x] Security headers configured
- [x] GDPR compliance implemented
- [x] Dependencies up to date

---

## Files to Include in Repository

### ✅ MUST COMMIT

#### Source Code
```
src/              - All application code
public/           - Static assets (images, favicon)
index.html        - Main HTML template
```

#### Configuration Files
```
package.json           - Dependencies & scripts
package-lock.json      - Dependency lock file
vite.config.js         - Build configuration
tailwind.config.js     - Styling configuration
postcss.config.js      - CSS processing
eslint.config.js       - Code linting
jsconfig.json          - Path aliases
components.json        - UI components config
.gitignore            - Git exclusions
```

#### Documentation
```
README.md              - Project documentation
DEPLOYMENT_GUIDE.md    - This file
SECURITY_AUDIT.md      - Security audit report
DEPLOYMENT_CHECKLIST.md - Pre-deployment checklist
```

### ❌ NEVER COMMIT

```
node_modules/     - Dependencies (install from package.json)
dist/             - Build output (generated on build)
.env              - Environment variables (create on server)
.DS_Store         - macOS system files
*.log             - Log files
coverage/         - Test coverage reports
```

### 📝 COMMIT EXAMPLE VERSIONS

If you add environment variables in the future:
```
.env.example      - Template with placeholder values
```

---

## Build & Deployment Steps

### 1. Local Build Test

```bash
# Install dependencies
npm install

# Run build
npm run build

# Test production build locally
npm run preview
```

**Expected output:**
- `dist/` folder created
- No build errors
- Preview server runs successfully

### 2. Verify Build Output

```bash
ls -lah dist/
```

Should contain:
```
dist/
├── assets/          # Bundled JS & CSS
├── index.html       # Entry point
└── [static files]   # Images, fonts, etc.
```

### 3. Check Build Size

```bash
du -sh dist/
```

**Target:** Under 5MB for good performance

---

## VPS Setup Guide

### Prerequisites

- Ubuntu 20.04+ or Debian 11+
- Root or sudo access
- Domain name pointed to VPS IP
- At least 1GB RAM, 10GB storage

### Step 1: Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx git curl

# Install Node.js (for building if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
nginx -v
node -v
npm -v
```

### Step 2: Create Deployment User (Recommended)

```bash
# Create dedicated user
sudo adduser vietnam-house

# Add to sudo group (if needed)
sudo usermod -aG sudo vietnam-house

# Switch to new user
su - vietnam-house
```

### Step 3: Setup Project Directory

```bash
# Create web directory
sudo mkdir -p /var/www/vietnam-house
sudo chown -R $USER:$USER /var/www/vietnam-house
cd /var/www/vietnam-house
```

### Step 4: Deploy Application

#### Option A: Git Clone (Recommended)

```bash
# Clone repository
git clone https://github.com/yourusername/vietnam-house.git .

# Install dependencies
npm install

# Build for production
npm run build

# Copy build to web directory
sudo cp -r dist/* /var/www/vietnam-house/html/
```

#### Option B: Direct Upload

```bash
# From local machine, upload dist folder
scp -r dist/* user@your-vps-ip:/var/www/vietnam-house/html/
```

---

## Nginx Configuration

### Step 1: Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/vietnam-house
```

### Basic Configuration (HTTP Only)

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name vietnamhouse.pl www.vietnamhouse.pl;

    root /var/www/vietnam-house/html;
    index index.html;

    # Logging
    access_log /var/log/nginx/vietnam-house-access.log;
    error_log /var/log/nginx/vietnam-house-error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json
               image/svg+xml;

    # React Router - SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### Step 2: Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/vietnam-house /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Firewall Setup

```bash
# Allow HTTP, HTTPS, SSH
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d vietnamhouse.pl -d www.vietnamhouse.pl

# Enter email when prompted
# Accept Terms of Service
# Choose option 2: Redirect HTTP to HTTPS
```

### Auto-Renewal Test

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot auto-renewal is set up via systemd timer
sudo systemctl status certbot.timer
```

### Manual HTTPS Configuration (If needed)

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name vietnamhouse.pl www.vietnamhouse.pl;

    ssl_certificate /etc/letsencrypt/live/vietnamhouse.pl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vietnamhouse.pl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # [Rest of configuration same as HTTP]
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name vietnamhouse.pl www.vietnamhouse.pl;
    return 301 https://$server_name$request_uri;
}
```

---

## Performance Optimization

### 1. Nginx Optimization

```nginx
# Add to http block in /etc/nginx/nginx.conf

# Worker processes
worker_processes auto;
worker_rlimit_nofile 65535;

# Connection settings
events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

# Buffer sizes
client_body_buffer_size 10K;
client_header_buffer_size 1k;
client_max_body_size 8m;
large_client_header_buffers 4 16k;

# Timeouts
client_body_timeout 12;
client_header_timeout 12;
keepalive_timeout 15;
send_timeout 10;
```

### 2. Image Optimization

Already optimized in build, but verify:
```bash
# Check image sizes
find public/ -type f \( -iname "*.jpg" -o -iname "*.png" \) -exec ls -lh {} \;
```

**Recommendation:** Images should be:
- Under 200KB each
- Properly compressed
- Served in modern formats (WebP if supported)

### 3. CDN Setup (Optional)

For better global performance:
- Cloudflare (Free tier available)
- AWS CloudFront
- Fastly

---

## Monitoring & Maintenance

### 1. Server Monitoring

```bash
# Check Nginx status
sudo systemctl status nginx

# Check server resources
htop
df -h
free -h

# View Nginx logs
sudo tail -f /var/log/nginx/vietnam-house-access.log
sudo tail -f /var/log/nginx/vietnam-house-error.log
```

### 2. Automated Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-vietnam-house.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/vietnam-house"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/vietnam-house-$DATE.tar.gz /var/www/vietnam-house

# Keep only last 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-vietnam-house.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-vietnam-house.sh
```

### 3. Update Strategy

```bash
# Weekly security updates
sudo apt update && sudo apt upgrade -y

# Monthly dependency updates
cd /var/www/vietnam-house
npm outdated
npm update
npm audit fix
npm run build
```

---

## Troubleshooting

### Issue: 404 on Page Refresh

**Problem:** React Router routes return 404
**Solution:** Ensure `try_files $uri $uri/ /index.html;` in Nginx config

### Issue: Nginx Won't Start

```bash
# Check configuration
sudo nginx -t

# Check for port conflicts
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# View detailed errors
sudo journalctl -xe
```

### Issue: Build Fails on Server

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Issue: SSL Certificate Not Renewing

```bash
# Manual renewal
sudo certbot renew --force-renewal

# Check renewal timer
sudo systemctl list-timers | grep certbot
```

### Issue: Slow Performance

```bash
# Check server load
uptime
top

# Clear Nginx cache
sudo rm -rf /var/cache/nginx/*
sudo systemctl restart nginx

# Verify gzip compression
curl -H "Accept-Encoding: gzip" -I https://vietnamhouse.pl
```

---

## Quick Command Reference

```bash
# Build locally
npm run build

# Deploy to server
scp -r dist/* user@server:/var/www/vietnam-house/html/

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/vietnam-house-error.log

# Test SSL
sudo certbot renew --dry-run

# Check disk space
df -h

# Check site accessibility
curl -I https://vietnamhouse.pl
```

---

## Post-Deployment Checklist

- [ ] Website loads correctly at domain
- [ ] All pages accessible (Home, Menu, About, Contact, Privacy Policy)
- [ ] HTTPS working with valid certificate
- [ ] All images loading properly
- [ ] Contact information displays correctly
- [ ] Cookie consent banner appears
- [ ] Map widget displays location
- [ ] Mobile responsiveness verified
- [ ] Page load time under 3 seconds
- [ ] No console errors
- [ ] Security headers present
- [ ] Backup system configured
- [ ] Monitoring in place

---

## Support & Resources

- **Nginx Documentation:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html
- **React Router:** https://reactrouter.com/en/main/start/overview

---

**Deployment Complete!** 🚀

Your Vietnam House website is now live and optimized for performance and security.
