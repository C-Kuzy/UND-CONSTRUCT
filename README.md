<div align="center">

# Custom-LinkCluster

## The Most Over-Engineered "Coming Soon" Page in the History of My Life

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-EULA-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

**🌐 Live Demo:** [View the glitching animation here](https://ckouznetsov.vercel.app/) *(Deploy to Vercel to get your own link!)*

**📸 Preview for GitHub Viewers:**

<div align="center">
  <h3>MAIN PAGE - Coming Soon</h3>
  <img src="https://github.com/user-attachments/assets/9d42ed5c-6287-42e8-918e-7711dcb1aa0d" alt="Glitching Website Coming Soon Animation" width="800">
  <p><i>Cyberpunk-style glitch effect with cyan/magenta distortions</i></p>
</div>

<div align="center">
  <h3>EULA PAGE</h3>
  <img src="https://github.com/user-attachments/assets/13789043-c8e0-477f-9fde-d11653022f13" alt="EULA Page" width="800">
  <p><i>End User License Agreement with full licensing terms</i></p>
</div>

<div align="center">
  <h3>FAQ PAGE</h3>
  <img src="https://github.com/user-attachments/assets/a3658013-f14c-4ad1-a55b-7fc19ddbd79c" alt="FAQ Page" width="800">
  <p><i>Frequently Asked Questions about the software and licensing</i></p>
</div>

**💻 For Vercel Viewers:** You're already experiencing it! Refresh if you want to see it glitch again.

**📂 For GitHub Viewers:** Click the live demo link above or clone the repo/run locally to see animated effect.

---

### Why Does This Exist?...

Great question! You see, once upon a time, I realized that I might take a little more time than others to put an idea together. So I came up with the idea of having a "coming soon" website that would mimic the excitement
a brand such as Yeezy, Lululemon, Nike, and other big retailers who focus on a countdown or "hype" their fans up with a new idea.

### The Deep, Philosophical Purpose

This repository exists to solve humanity's greatest challenge: **How do we elegantly tell people we're too lazy to build a real website right now?**

The answer? A glitching, cyberpunk-aesthetic "Coming Soon" page that screams "I'm technologically competent, I just haven't gotten around to it yet!" while simultaneously deterring anyone from actually expecting content anytime soon.

### Why NOT Use Free Link-Tree Alternatives?

Because where's the fun in that? Why use a perfectly functional service when you can:

1. **Spend 47 hours** configuring deployment pipelines
2. **Write custom CSS animations** that serve absolutely no functional purpose
3. **Debug why your glitch effect looks weird on Safari** (spoiler: it's always Safari)
4. **Feel superior** knowing your coming soon page has MORE CODE than most people's actual websites
5. **Maintain your own infrastructure** for what could literally be a text file

### The Technical Masterpiece

This project features:

- 🎨 **A Black Background** - Revolutionary, we know. We considered other colors, but black is:
  - 100% more cyberpunk
  - Saves approximately 0.0001% of your monitor's energy

- ⚡ **Glitching Text + Countdown Loop** - Because static text is for people who don't appreciate:
  - A 10s escalating glitch phase for "Website Coming Soon"
  - A 10s bold "Release Date" countdown takeover in format `YY : MM : DD : SS`
  - Continuous looped glitch-out transitions between both states

- 🕐 **Real-Time Date & TOD Display** - Live clock showing:
  - Current date in format: `Month : DD : YYYY`
  - Current time in 24-hour format: `HH : MM : SS`
  - Updates every second with smooth formatting

- 📜 **EULA & Legal Compliance** - Multi-page structure featuring:
  - Dedicated EULA page with complete licensing terms
  - 75% usage threshold policy for commercial use
  - Mandatory attribution requirements
  - Open-source compatibility guidelines

- ❓ **FAQ Section** - Comprehensive FAQ with:
  - 7 detailed questions covering common licensing inquiries
  - Attribution and modification policies
  - Contact information and licensing questions
  - Open-source project guidelines

- 🎮 **Built-In T-Rex Dino Game** - Integrated feature:
  - Runs directly inside this codebase (no external redirect)
  - Includes clouds, stars, sun/moon, moving obstacles, and endless play loop
  - Supports tap/click jump and selectable outline color themes

- 📱 **Mobile Responsive** - Works on phones, tablets, and probably your smart fridge

- 🚀 **Vite Build System** - Lightning-fast development with hot module replacement and optimized production builds for multiple pages

- 📦 **Organized Project Structure** - Because even chaos needs structure:
  ```
  UND-CONSTRUCT/
  ├── index.html                  # Main coming soon page
  ├── lib/
  │   ├── assets/                 # Image assets and icons
  │   ├── design/
  │   │   └── style.css          # Main page styling
  │   ├── effects/
  │   │   ├── script.js          # Glitch/countdown/date-time loop
  │   │   └── transitions.js     # Cross-page black fade transitions
  │   └── docs/
  │       ├── EULA/
  │       │   ├── EULA.html      # End User License Agreement
  │       │   └── design/
  │       │       └── style.css  # EULA page styling
  │       └── FAQ/
  │           ├── FAQ.html       # Frequently Asked Questions
  │           └── design/
  │               └── style.css  # FAQ page styling
  │   └── games/
  │       └── dino/
  │           ├── dino.html      # In-repo endless runner page
  │           ├── design/
  │           │   └── style.css  # Dino page styling
  │           └── effects/
  │               └── game.js    # Dino game loop and rendering
  ├── vite.config.js             # Build configuration (multi-page)
  ├── vercel.json                # Vercel deployment config
  ├── package.json               # Dependencies
  └── EULA-LICENSE               # License file
  ```

### 🌐 Pages & Features Overview

#### **Main Page** (`/`)
- Glitching "Website Coming Soon" headline with cyberpunk effects
- Real-time date and time display with AM/PM indicator
- Live social media links (LinkedIn, GitHub, Email)
- Footer navigation to EULA, FAQ, and T-Rex Dino game
- Mobile-optimized responsive design
- Animated background with screen shake effects (desktop only)

#### **EULA Page** (`/lib/docs/EULA/EULA.html`)
- Complete End User License Agreement with 9 comprehensive sections
- Covers:
  - Grant of License for commercial and open-source use
  - Mandatory Attribution Requirements
  - Source File Header Requirements
  - Open-Source Compatibility guidelines
  - 75% Substantial Use Threshold policy
  - Restrictions and limitations
  - Warranty Disclaimer
  - Liability Limitations
  - Termination conditions
- Clean, centered layout matching main site aesthetic
- Back-to-home navigation button

#### **FAQ Page** (`/lib/docs/FAQ/FAQ.html`)
- 7 Frequently Asked Questions covering:
  - Commercial use permissions
  - Attribution requirements
  - 75% codebase usage threshold
  - Modification and derivative works
  - Open-source project guidelines
  - Contact information for licensing inquiries
  - Compliance and enforcement
- Professional Q&A formatting
- Direct email link for licensing questions
- Responsive design with proper styling

#### **T-Rex Dino Game** (Easter Egg)
- Built-in endless runner on a dedicated local page
- Located in main footer as a direct in-app launch
- Includes customizable outline colors and touch/click controls
- Route: `/lib/games/dino/dino.html`

### Quick Start (Get Glitching in 60 Seconds)

```bash
# Clone this monument to procrastination
git clone https://github.com/yourusername/Custom-Coming-Soon.git
cd Custom-Coming-Soon

# Install the magic
npm install

# Start local development server
npm run dev

# Build for production (creates /dist folder)
npm run build

# Preview production build
npm run preview
```

### How to Deploy Your Own Monument to Procrastination

#### Option 1: Vercel (Recommended)

1. Fork this repo
2. Connect it to Vercel (it's free, unlike those link-tree services)
3. Vercel auto-detects Vite and handles everything
4. Watch as Vercel's robots do all the work
5. Bask in the glory of your placeholder page
6. Promise yourself you'll add real content "next week"
7. Repeat step 6 indefinitely

#### Option 2: Manual Deploy

```bash
npm run build
# Upload the /dist folder to any static hosting service
# (Netlify, GitHub Pages, your cousin's Raspberry Pi, etc.)
```

### Tech Stack

Built with determination and spite for subscription services:

- **Vite** - Modern build tool with instant hot module replacement
- **Vanilla JavaScript** - No frameworks, just pure chaos
- **CSS3** - Keyframe animations and cyberpunk aesthetics
- **Terser** - Code minification for production builds
- **Vercel** - Zero-config deployments

### Customization Guide

Want to make it YOUR monument to procrastination?

**Change the main page text:**
```javascript
// Edit lib/effects/script.js
const glitchText = document.querySelector('.glitch');
glitchText.setAttribute('data-text', 'YOUR TEXT HERE');
glitchText.textContent = 'YOUR TEXT HERE';
```

**Customize the date/time display format:**
```javascript
// Edit lib/effects/script.js
// Modify the dateTimeString in the updateDateTime() function
// Currently: "${month} : ${day} : ${year}  |  TOD ⟿ ${hours} : ${minutes} : ${seconds} : ${pm_OR_am}"
// Change the halfs array to modify AM/PM text:
const halfs = ['A.M.', 'P.M.']; // Modify these strings
```

**Update EULA Terms:**
```html
<!-- Edit lib/docs/EULA/EULA.html -->
<!-- Modify the license sections to match your specific requirements -->
<!-- Each section is clearly labeled (1. Grant of License, 2. Attribution, etc.) -->
```

**Add/Edit FAQ Questions:**
```html
<!-- Edit lib/docs/FAQ/FAQ.html -->
<!-- Each question is in a .faq-item div for easy organization -->
<!-- Add new divs following the existing pattern -->
```

**Adjust glitch intensity:**
```css
/* Edit lib/design/style.css */
/* Look for @keyframes glitch-anim-1 and glitch-anim-2 and tweak the transform values */
```

**Modify animation timing:**
```javascript
// Edit lib/effects/script.js
// Change the interval values for random glitch effects
// Line ~19: setInterval for randomGlitch (currently 200ms)
// Line ~36: setInterval for screenShake (currently 300ms)
```

**Customize styling for each page:**
```css
/* Main page: lib/design/style.css */
/* EULA page: lib/docs/EULA/design/style.css */
/* FAQ page: lib/docs/FAQ/design/style.css */
```

### The Roadmap (aka: Future Over-Engineering Plans)

- [x] Set up Vite build system (look at us being professional!)
- [x] Organize files into lib structure (we're basically architects now)
- [x] Production-ready build configuration (with minification and everything!)
- [x] Real-time Date & Time Display with AM/PM (extra timekeeping!)
- [x] EULA Legal Page with comprehensive licensing (we're official now!)
- [x] FAQ Page with common questions (responsible open-source!)
- [x] Multi-page Vite configuration (managing multiple HTML entries!)
- [x] Mobile optimization for smooth scrolling (no more viewport glitches!)
- [ ] Add sound effects (who doesn't want their coming soon page to make noise?)
- [ ] Three.js particle background (because TWO animation systems aren't enough)
- [ ] Custom pixel font loader (Comic Sans is too readable)
- [ ] Matrix-style falling text effect (there's no such thing as too much)
- [x] Dark mode toggle (for the black background? Yes, exactly)

**Code & Features:**
- Add more CSS animations (there's always room for more)
- Implement WebGL effects (because why not?)
- Create alternative color schemes (dark mode for black? We're listening...)
- Add easter eggs (press Konami code for something cool?)
- Optimize the build size (currently ~6KB total, can we get it smaller?)

**Documentation & Content:**
- Improve EULA clauses or add additional legal terms
- Expand FAQ with more common questions
- Create translations of EULA and FAQ pages
- Add browser compatibility notes

**Design & UX:**
- Create design variations for different sections
- Optimize mobile experience further
- Add accessibility features (ARIA labels, keyboard navigation)
- Improve responsive breakpoints

Please follow the existing structure:
- Styles organized in `lib/design/`, `lib/docs/EULA/design/`, `lib/docs/FAQ/design/`
- JavaScript in `lib/effects/`
- HTML pages at root (`index.html`) and in `lib/docs/` subfolders
- Keep it vanilla (no frameworks needed for pure chaos)
- Maintain consistent coding style and comments

### Build Details

**Development:**
```bash
npm run dev
# Starts Vite dev server with HMR
# Opens at http://localhost:5173
```

**Production Build:**
```bash
npm run build
# Outputs to /dist folder
# Minified with Terser
# Assets hashed for cache busting
# Typical build size: ~6KB total
```

**Preview Production:**
```bash
npm run preview
# Tests production build locally
# Ensures everything works before deployment
```

---

<div align="center">

### Final Thoughts

Remember: This project started as a simple "Coming Soon" page and evolved into a fully-featured multi-page application with legal documentation, comprehensive FAQ, real-time clock, and a production-ready deployment pipeline.

Now I proudly look back at what's been developed and what it meanms to me as an Uprising Developer:
- A glitching main page with interactive features
- A complete EULA with professional licensing terms
- A comprehensive FAQ addressing common questions
- Hidden easter eggs (T-Rex Dino game)
- Real-time date/time display with AM/PM
- Full mobile responsiveness
- Multi-page Vite build configuration
- Vercel-ready deployment setup

Was it worth it? Absolutely. The ~6KB bundle size says yes. The hours spent configuring multi-page Vite support say... also yes, actually.

I was able to go from a simple HTML file to a full professional project with proper build tooling, multiple pages, legal documentation, and comprehensive FAQ coverage. We should definitely be friends.

**Live your wildest dreams. Deploy what you believe might be the placeholder. ALSO Over-engineer everything.**
</div>
