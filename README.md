# Athul Simon — Personal Portfolio Website

A production-ready, quiet-luxury personal portfolio website engineered for **Athul Simon** (Flutter Developer & Software Engineer) following an Awwwards "Site of the Day" aesthetic in a calm, monochromatic palette: white, black, and grays with official brand accents.

---

## 1. Quick Start

### Prerequisites
- **Node.js**: v20+ or v22+ (LTS)
- **npm**: v10+
- **Python**: 3.10+ (for hero video processing script, with `ffmpeg` and `numpy`)

### Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the live portfolio.

---

## 2. Sections Table

| Order | Section | Identifier | Interactive Features & Components |
|---|---|---|---|
| 00 | **Hero** | `#hero` | Centered looping video blend with `--paper` (`mix-blend-mode: multiply`), audio autoplay unlock on first gesture, sound control pill with status ping, ghost typography, and PDF résumé download CTA. |
| 01 | **About** | `#about` | 3-column equal-height layout, biographical note verbatim from résumé, interactive hanging lanyard ID card with damped pendulum swing physics & 3D card flip on hover/tap/keyboard, quick facts table, and quote. |
| 02 | **Skills** | `#skills` | "Periodic Table of My Stack" with 16 elements (8 cols desktop / 4 mobile), category filter chips, diagonal wave reveal timing, and sticky inspector panel with 150px logo pop animation & soft glow. |
| 03 | **Work** | `#work` | Expanding accordion gallery (`min(78svh, 600px)`), `flex 8` active focus expansion, folding slim spines with rotating "+", 2-column feature breakdown, tech chips, and illustrative grayscale mini-UIs built in pure CSS/JSX. |
| 04 | **Certifications** | `#certifications` | White band with hairline borders, sticky heading, and numbered rows featuring an ink-flood hover transition (`scaleX(0)` → `scaleX(1)`) with sliding external arrows. |
| 05 | **Experience** | `#experience` | Unified chronological path combining Bachelor of Computer Application (BCA) and professional engineering roles (HiFx, Indbytes Technologies, WebSoulLabs). Dynamic vertical spine draws on scroll, lighting up stops, ending in a dashed "Next — Your team?" card. |
| 06 | **Achievements** | `#achievements` | Pinned horizontal gallery (`100svh`), scroll-driven lateral track travel, 72px glowing logo tiles, viewport-center card elevation (+12px), and `easeOutQuart` 1.4s animated count-up numbers. |
| 07 | **Contact & Footer** | `#contact` | Expressive letter-hop bouncing headline, large underlined direct email with dynamic "Copied ✓" clipboard chip (`aria-live`), telephone, GitHub, LinkedIn, slow-spinning circular text badge, and smooth "Back to top" navigation. |

---

## 3. Hero Video Pipeline & Rebuilding Assets

The looping hero video and portrait still are generated from `intro.mp4` via `scripts/build-hero-assets.py`.

```bash
# Rebuild hero video assets, portraits, and OpenGraph visuals
python scripts/build-hero-assets.py
```

### What the pipeline executes:
1. **Centering & Aspect Ratio Crop**: Crops the subject tightly from head to toe to a 4:5 aspect ratio (`crop=576:720:317:0`) and scales to 768×960.
2. **Background Whitening**: Applies `colorlevels=rimax=0.95:gimax=0.95:bimax=0.95` to ensure background pixels match `#ffffff`, blending into `#f4f2ee` via CSS `mix-blend-mode: multiply`.
3. **Seamless Video & Audio Loop**:
   - **Video**: Splits the 8.0s clip into main and head segments, cross-fading the last 0.5s into the first 0.5s via ffmpeg `xfade`.
   - **Audio**: Executes sample-accurate linear cross-fading in NumPy float32 PCM (48kHz stereo) across the 0.5s seam, eliminating pops and clicks with lip-sync fidelity.
4. **Export Formats**:
   - `public/hero/hero.webm`: VP9 (CRF 36) with Opus audio (80 kbps) for modern browsers.
   - `public/hero/hero.mp4`: H.264 (CRF 24) with AAC audio (96 kbps) and `+faststart`.
5. **Stills & Previews**:
   - `public/portrait-bust.webp`: 480×600 head-to-shirt crop for the hanging ID card.
   - `public/og.jpg`: 1200×630 OpenGraph social share image.
   - `public/favicon.ico`: 64×64 icon.

---

## 4. Typography & Design System

- **Inter Tight (Variable)**: Primary display and body typography.
- **Instrument Serif (Regular & Italic)**: Editorial italic accent word per section heading.
- **JetBrains Mono (Variable)**: Numerical indices, tags, metadata, and timestamps.
- **Palette**:
  - `--paper`: `#f4f2ee` (warm off-white backdrop)
  - `--card`: `#ffffff` (elevated surfaces)
  - `--ink`: `#0d0d0d` (primary text, buttons, active indicators)
  - `--ink-2`: `#3a3a3a` (subtle body text)
  - `--mute`: `#77756f` (secondary indices and italic accents)
  - `--faint`: `#a9a6a0` (hairlines and inactive indicators)
  - `--line`: `rgba(13, 13, 13, 0.1)` (precision borders)
  - `--ease`: `cubic-bezier(0.16, 1, 0.3, 1)` (fluid spring easing)

---

## 5. Credits & Brand Logo Licenses

All brand logos are displayed solely for identification and attribution purposes under their respective open-source licenses or trademark guidelines:

- **Flutter**: Google LLC (BSD 3-Clause / Apache 2.0)
- **Dart**: Google LLC (BSD 3-Clause)
- **Firebase**: Google LLC
- **Android**: Google LLC (Apache 2.0)
- **Apple / iOS**: Apple Inc.
- **Git**: Software Freedom Conservancy (GPLv2 / CC BY 3.0)
- **MySQL**: Oracle Corporation
- **SQLite**: Public Domain
- **Appwrite**: Appwrite OSS (BSD 3-Clause)
- **OpenAI**: OpenAI LLC
- **GitHub**: GitHub, Inc.
- **LinkedIn**: LinkedIn Corporation

License disclosures are documented in [public/logos/LICENSE.md](file:///c:/Users/ATHUL/Desktop/portfolio/public/logos/LICENSE.md). Custom concept icons (Testing, Storage, Publishing, Localisation) are licensed under the MIT License.
