# Vietnam House - Docker Deployment Guide

**Complete deployment guide for Docker + Traefik setup**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [DNS Configuration](#dns-configuration)
3. [Initial Server Setup](#initial-server-setup)
4. [First Deployment](#first-deployment)
5. [Updating the Application](#updating-the-application)
6. [Managing the Container](#managing-the-container)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)

---

## Prerequisites

### On Your VPS Server

✅ **Required:**
- Docker installed (`docker --version`)
- Docker Compose installed (`docker-compose --version`)
- Traefik running at `~/apps/traefik/` with `traefik-public` network
- Git installed (`git --version`)
- Ports 80 and 443 managed by Traefik

✅ **Verify Traefik Network:**
```bash
docker network ls | grep traefik-public
```

Expected output:
```
xxxxxx   traefik-public   bridge   local
```

If not present, create it:
```bash
docker network create traefik-public
```

---

## DNS Configuration

### Required DNS Records

**Before deploying**, configure these DNS A records for your domain `vietnamhouse.net`:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `YOUR_VPS_IP` | 3600 |
| A | www | `YOUR_VPS_IP` | 3600 |

**Example:**
```
Type: A
Name: @
Value: 123.45.67.89
TTL: 3600 (1 hour)

Type: A
Name: www
Value: 123.45.67.89
TTL: 3600 (1 hour)
```

### Verify DNS Propagation

Wait 5-10 minutes, then verify:

```bash
# Check root domain
dig vietnamhouse.net +short

# Check www subdomain
dig www.vietnamhouse.net +short

# Or use nslookup
nslookup vietnamhouse.net
nslookup www.vietnamhouse.net
```

Both should return your VPS IP address.

---

## Initial Server Setup

### Step 1: Connect to Your VPS

```bash
ssh user@YOUR_VPS_IP
```

### Step 2: Create Application Directory

```bash
# Create directory structure
mkdir -p ~/apps/vietnamhouse
cd ~/apps/vietnamhouse
```

### Step 3: Clone Your Repository

```bash
# Clone from GitHub
git clone https://github.com/rabciak/VietnamAI.git .

# Or if already cloned, navigate to vietnam-house subdirectory
cd vietnam-house
```

**Important:** Your application files should be in the `vietnam-house/` subdirectory of the repo.

### Step 4: Verify Files

Ensure these files exist:

```bash
ls -la
```

Expected files:
```
Dockerfile
docker-compose.yml
nginx.conf
.dockerignore
package.json
src/
public/
```

---

## First Deployment

### Step 1: Build and Start Container

```bash
cd ~/apps/vietnamhouse/vietnam-house

# Build and start in detached mode
sudo docker-compose up -d --build
```

**What happens:**
1. Docker builds your application (npm install + npm run build)
2. Creates nginx container with built files
3. Traefik automatically detects the container
4. Traefik requests SSL certificate from Let's Encrypt
5. Site becomes available at https://vietnamhouse.net

**Build time:** 2-5 minutes (first time)

### Step 2: Monitor Initial Deployment

```bash
# Watch logs in real-time
sudo docker-compose logs -f vietnamhouse
```

Look for:
```
vietnamhouse | [notice] 1#1: nginx/1.25.x
vietnamhouse | [notice] 1#1: start worker processes
```

Press `Ctrl+C` to exit logs.

### Step 3: Verify Traefik Integration

```bash
# Check Traefik dashboard (if enabled)
# Visit: http://YOUR_VPS_IP:8080

# Or check container is in traefik-public network
sudo docker network inspect traefik-public
```

You should see `vietnamhouse` container in the list.

### Step 4: Test Your Site

**Wait 1-2 minutes for SSL certificate**, then visit:

- https://vietnamhouse.net
- https://www.vietnamhouse.net

Both should:
- ✅ Load with valid HTTPS (green lock)
- ✅ Redirect from HTTP to HTTPS automatically
- ✅ Show your Vietnam House website

---

## Updating the Application

### Standard Update Process

```bash
# 1. Navigate to project directory
cd ~/apps/vietnamhouse/vietnam-house

# 2. Pull latest code from GitHub
git pull origin main

# 3. Rebuild and restart container
sudo docker-compose up -d --build

# 4. Monitor deployment
sudo docker-compose logs -f vietnamhouse
```

**Update time:** 2-5 minutes

### Quick Update (No Code Changes)

If you only changed configuration:

```bash
sudo docker-compose restart vietnamhouse
```

### Update Without Downtime

For zero-downtime deployments:

```bash
# Build new image first
sudo docker-compose build

# Then quickly swap containers
sudo docker-compose up -d
```

---

## Managing the Container

### View Status

```bash
# Check if container is running
sudo docker-compose ps

# Expected output:
# NAME           STATUS        PORTS
# vietnamhouse   Up 2 hours    80/tcp
```

### Start/Stop/Restart

```bash
# Stop container
sudo docker-compose down

# Start container
sudo docker-compose up -d

# Restart container
sudo docker-compose restart vietnamhouse

# Rebuild and restart
sudo docker-compose up -d --build
```

### View Resource Usage

```bash
# CPU, Memory, Network usage
sudo docker stats vietnamhouse

# Press Ctrl+C to exit
```

### Execute Commands Inside Container

```bash
# Open shell in running container
sudo docker exec -it vietnamhouse sh

# List files in container
sudo docker exec vietnamhouse ls -la /usr/share/nginx/html

# Check nginx configuration
sudo docker exec vietnamhouse nginx -t
```

---

## Monitoring & Logs

### View Logs

```bash
# Real-time logs (follow mode)
sudo docker-compose logs -f vietnamhouse

# Last 100 lines
sudo docker-compose logs --tail=100 vietnamhouse

# Logs from last 1 hour
sudo docker-compose logs --since 1h vietnamhouse

# All logs
sudo docker-compose logs vietnamhouse
```

### Health Check Status

```bash
# Check container health
sudo docker inspect vietnamhouse --format='{{.State.Health.Status}}'

# Expected: healthy
```

### Nginx Access Logs

```bash
# View nginx access logs
sudo docker exec vietnamhouse tail -f /var/log/nginx/access.log

# View nginx error logs
sudo docker exec vietnamhouse tail -f /var/log/nginx/error.log
```

### Check SSL Certificate

```bash
# View certificate details
echo | openssl s_client -servername vietnamhouse.net -connect vietnamhouse.net:443 2>/dev/null | openssl x509 -noout -dates

# Expected output:
# notBefore=Oct 10 ...
# notAfter=Jan 10 ...
```

---

## Troubleshooting

### Issue: Container Won't Start

**Symptom:** `docker-compose up -d` fails

**Solutions:**

```bash
# Check logs for errors
sudo docker-compose logs vietnamhouse

# Verify docker-compose.yml syntax
sudo docker-compose config

# Check if traefik-public network exists
sudo docker network ls | grep traefik-public

# Recreate network if needed
sudo docker network create traefik-public

# Remove old container and rebuild
sudo docker-compose down
sudo docker-compose up -d --build
```

### Issue: Site Not Accessible (502 Bad Gateway)

**Symptom:** https://vietnamhouse.net returns 502 error

**Solutions:**

```bash
# 1. Check container is running
sudo docker-compose ps

# 2. Check container health
sudo docker inspect vietnamhouse --format='{{.State.Health.Status}}'

# 3. Check nginx is running
sudo docker exec vietnamhouse ps aux | grep nginx

# 4. Check nginx logs
sudo docker exec vietnamhouse cat /var/log/nginx/error.log

# 5. Restart container
sudo docker-compose restart vietnamhouse
```

### Issue: SSL Certificate Not Working

**Symptom:** HTTPS not available or certificate invalid

**Solutions:**

```bash
# 1. Verify DNS is pointing to your server
dig vietnamhouse.net +short

# 2. Check Traefik logs
cd ~/apps/traefik
sudo docker-compose logs traefik | grep vietnamhouse

# 3. Check Let's Encrypt rate limits
# Visit: https://crt.sh/?q=vietnamhouse.net

# 4. Force certificate renewal (if needed)
# Remove certificate and restart Traefik
cd ~/apps/traefik
sudo rm -f letsencrypt/acme.json
sudo docker-compose restart traefik

# Wait 2-3 minutes for new certificate
```

### Issue: Build Fails During `npm install`

**Symptom:** Docker build fails with npm errors

**Solutions:**

```bash
# 1. Clear Docker build cache
sudo docker-compose build --no-cache

# 2. Check package.json exists
ls -la package.json

# 3. Verify package-lock.json is not corrupted
cat package-lock.json | head

# 4. Build with verbose output
sudo docker-compose build --progress=plain
```

### Issue: Changes Not Reflecting

**Symptom:** Git pull done but site shows old content

**Solutions:**

```bash
# 1. Rebuild with no cache
sudo docker-compose build --no-cache
sudo docker-compose up -d

# 2. Clear browser cache
# Press Ctrl+Shift+R in browser

# 3. Check built files in container
sudo docker exec vietnamhouse ls -la /usr/share/nginx/html

# 4. Verify correct git branch
git branch
git log --oneline -5
```

### Issue: 404 on Page Refresh

**Symptom:** React routes work initially but 404 on browser refresh

**Solution:**

This should not happen with the provided `nginx.conf`, but verify:

```bash
# Check nginx config
sudo docker exec vietnamhouse cat /etc/nginx/nginx.conf | grep try_files

# Expected:
# try_files $uri $uri/ /index.html;

# If missing, rebuild container
sudo docker-compose up -d --build
```

### Issue: High Memory Usage

**Symptom:** Container using too much RAM

**Solutions:**

```bash
# Check resource usage
sudo docker stats vietnamhouse

# Add memory limits to docker-compose.yml
# deploy:
#   resources:
#     limits:
#       memory: 256M

# Restart with limits
sudo docker-compose up -d
```

---

## Security Considerations

### 1. Keep Docker Updated

```bash
# Update Docker
sudo apt update
sudo apt upgrade docker-ce docker-ce-cli containerd.io

# Update Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Regular Container Updates

```bash
# Update base images regularly
sudo docker-compose pull
sudo docker-compose up -d --build
```

### 3. Monitor Security Vulnerabilities

```bash
# Scan Docker image for vulnerabilities (if Docker Scan available)
sudo docker scan vietnamhouse:latest
```

### 4. Backup Configuration

```bash
# Backup docker-compose.yml and .env
cp docker-compose.yml docker-compose.yml.backup
cp .env .env.backup

# Or commit to private git repo
git add docker-compose.yml .env.example
git commit -m "backup: Docker configuration"
```

### 5. Enable Firewall

```bash
# UFW should allow only necessary ports
sudo ufw status

# Traefik handles 80/443, so only allow SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Performance Optimization

### Enable HTTP/2

Traefik enables HTTP/2 automatically with TLS. Verify:

```bash
curl -I --http2 https://vietnamhouse.net
```

### Monitor Performance

```bash
# Test page load time
curl -w "@-" -o /dev/null -s https://vietnamhouse.net <<'EOF'
time_namelookup:  %{time_namelookup}s\n
time_connect:  %{time_connect}s\n
time_starttransfer:  %{time_starttransfer}s\n
time_total:  %{time_total}s\n
EOF
```

### Verify Gzip Compression

```bash
curl -H "Accept-Encoding: gzip" -I https://vietnamhouse.net
```

Look for:
```
Content-Encoding: gzip
```

---

## Quick Command Reference

```bash
# Deploy/Update
cd ~/apps/vietnamhouse/vietnam-house
git pull
sudo docker-compose up -d --build

# View logs
sudo docker-compose logs -f vietnamhouse

# Restart
sudo docker-compose restart vietnamhouse

# Stop
sudo docker-compose down

# Check status
sudo docker-compose ps
sudo docker stats vietnamhouse

# Execute command in container
sudo docker exec vietnamhouse <command>

# Clean up old images
sudo docker image prune -a
```

---

## Environment Variables (If Needed)

If your app needs environment variables in the future:

### 1. Create `.env` file

```bash
cd ~/apps/vietnamhouse/vietnam-house
nano .env
```

Add variables:
```env
NODE_ENV=production
VITE_API_URL=https://api.vietnamhouse.net
VITE_ANALYTICS_ID=GA-XXXXXX
```

### 2. Update `docker-compose.yml`

Uncomment these lines:
```yaml
env_file:
  - .env
```

### 3. Rebuild

```bash
sudo docker-compose up -d --build
```

**Security:** Never commit `.env` to Git! Only commit `.env.example`.

---

## Automated Deployment (Optional)

### Using Git Hooks

Create a post-receive hook on your VPS:

```bash
# On VPS
cd ~/apps/vietnamhouse/vietnam-house/.git/hooks
nano post-receive
```

Add:
```bash
#!/bin/bash
cd ~/apps/vietnamhouse/vietnam-house
sudo docker-compose up -d --build
```

Make executable:
```bash
chmod +x post-receive
```

### Using GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml` in your repo to automatically deploy on push to main.

---

## Support & Resources

- **Docker Documentation:** https://docs.docker.com/
- **Traefik Documentation:** https://doc.traefik.io/traefik/
- **Nginx Documentation:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at https://vietnamhouse.net
- [ ] Site loads at https://www.vietnamhouse.net
- [ ] HTTPS certificate is valid (green lock)
- [ ] HTTP redirects to HTTPS
- [ ] All pages load correctly
- [ ] React Router navigation works
- [ ] Images load properly
- [ ] No console errors
- [ ] Container health status is "healthy"
- [ ] Logs show no errors

---

**Deployment Complete!** 🚀

Your Vietnam House restaurant website is now running in Docker with Traefik handling SSL/TLS automatically.

**Site:** https://vietnamhouse.net

For issues or questions, check the [Troubleshooting](#troubleshooting) section above.
