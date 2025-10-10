# Vietnam House - Quick Reference Card

**Last Updated:** October 10, 2025

---

## 🚀 Quick Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Deployment
```bash
# Build and deploy
npm run build
scp -r dist/* user@vps:/var/www/vietnam-house/html/

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/vietnam-house-error.log
```

---

## 📁 Project Type

**Framework:** React 19 + Vite 7
**Type:** Single Page Application (SPA)
**Language:** JavaScript ES6+
**Styling:** Tailwind CSS

---

## ✅ Commit to Git

```
✅ src/                    # Source code
✅ public/                 # Static assets
✅ package.json            # Dependencies
✅ package-lock.json       # Lock file
✅ vite.config.js          # Vite config
✅ tailwind.config.js      # Tailwind config
✅ *.md                    # Documentation
✅ .gitignore              # Git exclusions
```

---

## ❌ Never Commit

```
❌ node_modules/           # Dependencies
❌ dist/                   # Build output
❌ .env                    # Secrets
❌ *.log                   # Logs
❌ .DS_Store               # OS files
❌ .idea/                  # IDE files
```

---

## 🔒 Security Status

**✅ SECURE - No Issues**

- No hardcoded secrets
- No sensitive files
- GDPR compliant
- All dependencies secure

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Verify all content is correct
- [ ] Check mobile responsiveness
- [ ] Test all pages load
- [ ] Verify contact information
- [ ] Check SSL certificate
- [ ] Configure security headers
- [ ] Set up backups
- [ ] Add monitoring

---

## 🌐 Restaurant Information

```
Name:     Vietnam House
Phone:    665 559 841
Email:    kontakt@vietnamhouse.pl
Address:  Prymasa Stefana Wyszyńskiego 4
          22-400 Zamość, Poland

Hours:    Mon-Fri: 10:00 - 19:30
          Saturday: 11:00 - 19:30
```

---

## 📊 Performance Targets

- Bundle size: < 500KB
- Load time: < 3 seconds
- Lighthouse: > 90
- Mobile friendly: 100%

---

## 🔧 Nginx Quick Config

```nginx
server {
    listen 80;
    server_name vietnamhouse.pl www.vietnamhouse.pl;
    root /var/www/vietnam-house/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📚 Documentation Files

1. **README.md** - Project overview
2. **PROJECT_ANALYSIS.md** - Complete analysis
3. **SECURITY_AUDIT.md** - Security report
4. **DEPLOYMENT_GUIDE.md** - VPS deployment
5. **DEPLOYMENT_CHECKLIST.md** - Pre-launch tasks
6. **QUICK_REFERENCE.md** - This file

---

## 🆘 Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh
Add to Nginx config:
```nginx
try_files $uri $uri/ /index.html;
```

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

---

## 📞 Key Files Location

```
Entry Point:     src/main.jsx
Routing:         src/App.jsx
Pages:           src/pages/*.jsx
Components:      src/components/*.jsx
Menu Data:       src/data/menuData.js
Build Output:    dist/
Public Assets:   public/
```

---

**🚀 Ready to Deploy!**

See `DEPLOYMENT_GUIDE.md` for full instructions.
