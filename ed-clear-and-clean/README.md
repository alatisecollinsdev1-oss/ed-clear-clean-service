# Ed Clear & Clean Services — Website

Built by Collins Dev | collins-dev.netlify.app

---

## 📁 FILE STRUCTURE

```
ed-clear-clean/
├── index.html                  ← Home page
├── about.html                  ← About Us page
├── cleaning-services.html      ← Cleaning Services page
├── waste-services.html         ← Waste Services page
├── quote.html                  ← Get a Quote / Contact page
├── assets/
│   ├── css/
│   │   ├── style.css           ← Main styles + layout
│   │   └── animations.css      ← All animations
│   ├── js/
│   │   └── main.js             ← All JavaScript
│   └── images/
│       ├── logo.png            ← ⭐ YOUR LOGO (add this first!)
│       ├── hero/
│       │   ├── hero-fallback.jpg
│       │   └── cta-bg.jpg
│       ├── about/
│       │   ├── about-hero.jpg
│       │   ├── our-story.jpg
│       │   ├── why-us.jpg
│       │   ├── mission.jpg
│       │   ├── vision.jpg
│       │   ├── values.jpg
│       │   └── stats-bg.jpg
│       ├── services/
│       │   ├── cleaning-hero.jpg
│       │   ├── cleaning-category.jpg
│       │   ├── waste-hero.jpg
│       │   ├── waste-category.jpg
│       │   └── cleaning/
│       │       ├── end-of-tenancy.jpg
│       │       ├── after-build.jpg
│       │       ├── deep-cleaning.jpg
│       │       ├── commercial-cleaning.jpg
│       │       └── carpet-cleaning.jpg
│       │   └── waste/
│       │       ├── rubbish-removal.jpg
│       │       ├── garage-clearance.jpg
│       │       ├── construction-waste.jpg
│       │       └── garden-waste.jpg
│       ├── locations/
│       │   ├── huddersfield.jpg
│       │   └── leeds.jpg
│       └── contact/
│           └── contact-hero.jpg
```

---

## 🖼️ HOW TO ADD IMAGES

Every image slot has a clear comment above it in the HTML. Just:

1. Find the matching image file name from the list above
2. Save your photo with EXACTLY that file name
3. Drop it into the correct folder inside `assets/images/`
4. Refresh the browser — the image appears automatically

### Recommended image sizes:
| Image | Recommended Size |
|-------|-----------------|
| Logo | Any — PNG with transparent background |
| Hero backgrounds | 1920 × 1080px |
| Page hero banners | 1920 × 600px |
| Split section images | 800 × 600px |
| Service card images | 800 × 600px |
| Category cards | 900 × 600px |
| CTA banner background | 1920 × 600px |
| Location cards | 800 × 500px |

> All images use `object-fit: cover` — they always fill their container and stay fully visible regardless of size.

---

## 🎨 HOW TO CHANGE COLORS

Open `assets/css/style.css` and edit the variables at the top:

```css
:root {
  --green:        #3DAA4E;   /* Main green — change this */
  --green-dark:   #2A7A37;   /* Darker green */
  --orange:       #FF8C00;   /* Main orange accent */
  --orange-dark:  #D97700;   /* Darker orange */
}
```

---

## 📞 HOW TO UPDATE CONTACT INFO

Search and replace across all HTML files:

| Find | Replace with |
|------|-------------|
| `+44 7368 467662
` | New phone number |
| `447368467662` | New WhatsApp number (with country code) |
| `ed.clearandclean@gmail.com` | New email address |
| `66 Paul Street, London` | New address |
| `EdwardAbazuou` | New social media handle |

---

## 🗺️ HOW TO UPDATE THE GOOGLE MAP

1. Go to maps.google.com
2. Search your exact address
3. Click **Share** → **Embed a map**
4. Copy the `src="..."` URL from the iframe code
5. Open `quote.html` and find the `<iframe>` tag
6. Replace the `src` value with your new URL

---

## 🚀 HOW TO DEPLOY (Netlify)

1. Zip the entire `ed-clear-clean` folder
2. Go to netlify.com and log in
3. Drag and drop the ZIP onto the Netlify dashboard
4. Your site is live instantly!

---

## ✅ PAGES CHECKLIST

- [x] Home — `index.html`
- [x] About Us — `about.html`
- [x] Cleaning Services — `cleaning-services.html`
- [x] Waste Services — `waste-services.html`
- [x] Get a Quote / Contact — `quote.html`

---

Built with ❤️ by Collins Dev
