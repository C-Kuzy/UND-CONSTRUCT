<div align="center">

# Custom-LinkCluster

## The Most Over-Engineered "Coming Soon" Page in the History of My Life

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

**🌐 Live Demo:** [View the glitching animation here](https://ckouznetsov.vercel.app/) *(Deploy to Vercel to get your own link!)*

**📸 Preview for GitHub Viewers:**

<div align="center">
  <img src="https://github.com/user-attachments/assets/0989afa2-226c-459c-bd29-1e87bef48f88" alt="Glitching Website Coming Soon Animation" width="800">
  <p><i>Cyberpunk-style glitch effect with cyan/magenta distortions</i></p>
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
  
- ⚡ **Glitching Text Animation** - Because static text is for people who don't appreciate:
  - CSS keyframe animations that would make a film editor weep
  - JavaScript that randomly shakes your text like it's having an existential crisis
  - The aesthetic of a 1990s hacker movie, but modernized for 2026's discerning taste

- 📱 **Mobile Responsive** - Works on phones, tablets, and probably your smart fridge
  
- 🚀 **Vite Build System** - Lightning-fast development with hot module replacement and optimized production builds
  
- 📦 **Organized Project Structure** - Because even chaos needs structure:
  ```
  Custom-Coming-Soon/
  ├── index.html              # Entry point
  ├── lib/
  │   ├── design/
  │   │   └── style.css       # All the glitchy goodness
  │   └── effects/
  │       └── script.js       # The chaos generator
  ├── vite.config.js          # Build configuration
  ├── package.json            # Dependencies
  └── vercel.json             # Deployment configuration
  ```

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

**Change the text:**
```javascript
// Edit lib/effects/script.js
const glitchText = document.querySelector('.glitch');
glitchText.setAttribute('data-text', 'YOUR TEXT HERE');
glitchText.textContent = 'YOUR TEXT HERE';
```

**Adjust glitch intensity:**
```css
/* Edit lib/design/style.css */
/* Look for @keyframes glitch and tweak the transform values */
```

**Modify animation timing:**
```javascript
// Edit lib/effects/script.js
// Change the interval values (currently randomized between 50-150ms)
```

### The Roadmap (aka: Future Over-Engineering Plans)

- [x] Set up Vite build system (look at us being professional!)
- [x] Organize files into lib structure (we're basically architects now)
- [x] Production-ready build configuration (with minification and everything!)
- [ ] Add sound effects (who doesn't want their coming soon page to make noise?)
- [ ] Three.js particle background (because TWO animation systems aren't enough)
- [ ] Custom pixel font loader (Comic Sans is too readable)
- [ ] Matrix-style falling text effect (there's no such thing as too much)
- [ ] Dark mode toggle (for the black background? Yes, exactly)

### Contributing

Feel free to submit PRs that make this even more unnecessarily complex! Bonus points if you:
- Add more CSS animations (there's always room for more)
- Implement WebGL effects (because why not?)
- Create alternative color schemes (dark mode for black? We're listening...)
- Add easter eggs (press Konami code for something cool?)
- Optimize the build size (currently ~6KB total, can we get it smaller?)

Please follow the existing structure:
- Styles in `lib/design/`
- JavaScript in `lib/effects/`
- Keep it vanilla (no frameworks needed for pure chaos)

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

### License

MIT - Because even our procrastination is open source.

---

<div align="center">

### Final Thoughts

Remember: This project exists because someone, somewhere, decided that paying for a link aggregation service was too mainstream. Now we have a glitching "Coming Soon" page with a proper build system, organized file structure, and production-ready deployment pipeline.

Was it worth it? The ~6KB bundle size says yes. The hours spent configuring Vite say... also yes, actually.

**Live the dream. Deploy the placeholder. Over-engineer everything.**

---

*P.S. - If you're actually reading this, congratulations! You've found the most over-documented and over-engineered "Coming Soon" page on GitHub. We went from a simple HTML file to a full Vite project with proper build tooling. We should definitely be friends.*

[![Star this repo](https://img.shields.io/github/stars/yourusername/Custom-Coming-Soon?style=social)](https://github.com/yourusername/Custom-Coming-Soon)
[![Follow me](https://img.shields.io/github/followers/yourusername?style=social)](https://github.com/yourusername)

**Made with ☕ and existential dread about subscription services**

</div>
