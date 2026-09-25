# Hostinger Deployment Guide for Bin Nasir Real Estate & Builder

Yeh application ek modern **React 19 + TypeScript + Vite + Tailwind CSS + Firebase Firestore** web app hai. Isay Hostinger par deploy karne ka tareeqa nihayat aasan hai:

---

## 🚀 Option 1: Hostinger Shared / Cloud Hosting (hPanel File Manager) [Sab Se Aasan & Recommended]

Hostinger ke kisi bhi Web Hosting ya Cloud Hosting plan par aap static production build deploy kar saktay hain:

### Step 1: Project Build Karna (Generate `dist` folder)
Agar aap apne computer (laptop/PC) par hain:
```bash
npm install
npm run build
```
Build complete hone ke baad project root mein **`dist/`** naam ka folder generate hoga. Is `dist/` folder ke andar ye files hongi:
- `index.html`
- `assets/` (compiled CSS aur JavaScript files)
- `.htaccess` (Hostinger routing & speed optimization ke liye)
- Tamam images aur fonts

*(Tip: Aap poore `dist` folder ke andar ki files ko select karke ek **`dist.zip`** bana lein)*

---

### Step 2: Hostinger hPanel par Upload Karna
1. **Hostinger account login karein:** [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Apne domain ya website ke samnay **"Manage"** par click karein.
3. Left menu se **Files -> File Manager** open karein.
4. **`public_html`** folder ke andar enter hon.
5. Agar `public_html` mein pehle se koi default file jaise `default.php` mojud ho, to usay delete kar dein.
6. **Upload** button par click karein aur `dist.zip` upload karein.
7. File Manager mein `dist.zip` par right-click karke **"Extract"** karein (ensure karein ke files seedhi `public_html` mein extract hon, na ke kisi sub-folder mein).
8. Make sure karein ke `index.html` seedha `public_html/index.html` par ho.

---

### Step 3: Firebase Authorized Domains (Zaroori)
Kyunki aapka database real-time **Firebase Firestore** se connected hai:
1. [Firebase Console](https://console.firebase.google.com) par jayein.
2. Apne project par click karein.
3. Left menu se **Authentication -> Settings -> Authorized Domains** par jayein.
4. **"Add Domain"** par click karein aur apna Hostinger domain (maslan `binnasirbuilders.com` aur `www.binnasirbuilders.com`) add kar dein.
5. Is se aapka contact form, admin panel, reviews, aur megaprojects real-time Firebase database se bina kisi rukawat ke synchronize hongay!

---

### Step 4: Hostinger Free SSL Activate Karein
1. Hostinger hPanel mein **Security -> SSL** par jayein.
2. Apne domain par **"Install Free SSL"** enable karein taaki website secure **HTTPS (`https://`)** par chalay.

---

## ⚡ Option 2: Hostinger Git Deployment (Continuous Deployment)
Agar aapka project GitHub / GitLab repository par upload hai:
1. Hostinger hPanel mein **Advanced -> GIT** par jayein.
2. Apni GitHub repository ka link aur branch (maslan `main`) connect karein.
3. Install command: `npm install && npm run build`
4. Deploy directory: `dist`

---

## 🛠️ Important Notes:
- **Admin Panel Access:** Website par Admin button click karke aap apna secret passcode enter karke mobile ya laptop se kahin bhi beth kar projects, team members, client reviews, aur phone numbers update kar saktay hain.
- **WhatsApp Chat:** Website par set kiya gaya WhatsApp number `03004687544` Hostinger par deploy hone ke baad bhi direct click par customer chat open karega.
- **`.htaccess` File:** Humne pehle se `.htaccess` create kar di hai jo Hostinger Apache server par caching, GZIP compression, aur page refresh error (404) ko automatically handle karti hai.
