# LUMI — Premium Aesthetics Clinic Website

A luxury, editorial, and responsive institutional website built with **semantic HTML5, modern CSS3, and Vanilla JavaScript**. Designed for high-end beauty, skincare, and facial aesthetics clinics.

Inspired by premium Webflow aesthetic templates, the website features editorial typography, warm neutral color palettes, asymmetrical compositions, interactive lightboxes, and smooth animations.

---

## 📁 Project Structure

```text
├── index.html              # Main website structure (semantic HTML5, 10 sections)
├── css/
│   └── style.css           # Styling system, CSS variables, typography & responsive rules
├── js/
│   └── script.js           # Vanilla JS: config, mobile menu, lightbox, modals, form feedback
├── assets/
│   ├── images/             # Editorial photographs and fallbacks
│   └── beauty-background.mp4  # (Optional) Full-width background video asset
└── README.md               # Customization and deployment guide
```

---

## 🚀 How to Run the Project

### Option A: Local Browser (Zero Setup)
Simply double-click `index.html` or open it with any web browser (Chrome, Safari, Firefox, Edge).

### Option B: Local Live Server
If using VS Code or similar editor:
1. Install the "Live Server" extension.
2. Right click `index.html` and select **"Open with Live Server"**.

### Option C: Node / Vite Dev Server
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🎨 Customization Guide

### 1. Where to Change the Clinic Name & Brand Details
- **Brand Name in HTML**: In `index.html`, search for `LUMI` in the `<header>`, `<title>`, `<meta>`, and `<footer>` sections.
- **Centralized JavaScript Config**: Open `js/script.js` and modify the `LUMI_CONFIG` object at the top:
  ```javascript
  const LUMI_CONFIG = {
    brandName: 'LUMI',
    phone: '+33 1 40 20 53 46',
    whatsappNumber: '33140205346',
    email: 'bonjour@lumi-studio.com',
    instagram: 'https://instagram.com/lumi.studio',
    instagramHandle: '@lumi.studio',
    address: 'Rue de Laborde, 21, 75008 Paris, France'
  };
  ```

### 2. Where to Change Colors & Typography
Open `css/style.css` and customize the CSS custom properties in `:root`:
```css
:root {
  --color-primary: #987A65;       /* Warm mocha primary accent */
  --color-secondary: #D8C2AC;     /* Soft beige secondary accent */
  --color-background: #F7F3EE;    /* Warm alabaster canvas */
  --color-white: #FFFFFF;
  --color-dark: #49382F;          /* Deep espresso dark tone */
  --color-muted: #75665C;         /* Muted editorial body text */
  --color-light: #E9DED3;         /* Sand accent for badges/marquee */
}
```

### 3. Where to Replace Photographs
Replace files in `assets/images/`:
- `hero-glow.jpg` — Main hero background portrait
- `treatment-room.jpg` — About us primary treatment bed photo
- `service-roller.jpg` — Hardware cosmetology card
- `service-cleanser.jpg` — Skincare cleansing card
- `service-lips.jpg` — Lip care & bio-infusion card
- `service-massage.jpg` — Facial massage therapy card
- `service-serum.jpg` — Serum ritual card
- `service-mask.jpg` — Nourishing mask card
- `video-bg.jpg` — Fallback image for video banner section

### 4. Where to Add the Video
Place your high-resolution video file at:
```text
assets/beauty-background.mp4
```
The `<video>` element in `index.html` (Section 05) will automatically play it with `autoplay`, `muted`, `loop`, and `playsinline`. If the file is not present or slow to load, it gracefully falls back to `assets/images/video-bg.jpg`.

### 5. Where to Change WhatsApp and Instagram
- In `js/script.js`, change:
  - `whatsappNumber: '33140205346'` (include country code without `+` or spaces).
  - `instagram: 'https://instagram.com/yourhandle'`
  - `instagramHandle: '@yourhandle'`
All WhatsApp buttons across the website dynamically link to this number.

---

## 🌐 How to Deploy to Netlify

### Method 1: Netlify Drop (Instant Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the project folder into the browser window.
3. Your website is live with an instant SSL URL in 5 seconds!

### Method 2: Git Repository (Continuous Deployment)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Netlify, click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Set:
   - **Build command**: (leave empty or `npm run build` if using Vite)
   - **Publish directory**: `dist` (if built) or `.` (for direct static root)
5. Click **"Deploy site"**.

### Method 3: Netlify Forms Integration
To receive booking requests directly in your Netlify dashboard with zero backend:
1. In `index.html`, add `netlify` and `name="booking-requests"` to the `<form>` tag:
   ```html
   <form name="booking-requests" method="POST" data-netlify="true" class="booking-form">
   ```
2. Netlify will automatically collect submissions in your site dashboard!

---

## 📱 Responsive Testing Viewports
The layout has been meticulously tested across:
- **Desktop**: 1440px+ (wide editorial margins and bento compositions)
- **Tablet Landscape**: 1024px (balanced grid spans and comfortable line lengths)
- **Tablet Portrait**: 768px (2-column grids, accessible touch targets)
- **Mobile**: 390px / 360px (fluid single-column flow, slide-in navigation, 0 horizontal overflow)

---

## ⚖️ License
Personal & Commercial use ready. Crafted with intention for LUMI Aesthetics.
