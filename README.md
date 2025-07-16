# 🧟‍♂️ Monster Killer

A modular, browser-based game built with **Vanilla JS**, bundled using **Vite**, and deployed as a cross-platform app using **Capacitor JS**.

Play as a player in a turn-based battle against a monster. Heal, attack, or go all-in with a strong attack while keeping track of game history with a dynamic UI and persistent state saved using Capacitor Preferences.

---

## 🚀 Features

* ⚔️ Turn-based attack mechanics (normal & strong)
* ❤️ Healing system with limited uses
* 📊 Dynamic health indicators with color-coded styles
* 📂 Persistent game state saved on app background or exit
* 📜 Game history log with accordion UI
* 🧠 Modular ES6+ architecture
* 📆 Production-ready Vite build with Terser optimizations
* 📱 Fully compatible with Capacitor (Android/iOS)

---

## 🛠️ Tech Stack

* [Vite](https://vitejs.dev/) — super-fast development & bundling
* [Capacitor JS](https://capacitorjs.com/) — native runtime for deploying to Android/iOS
* [@capacitor/preferences](https://capacitorjs.com/docs/apis/preferences) — used to store and restore game state
* Vanilla JavaScript (modular, ES6+)
* No frameworks, just clean structure

---

## 📁 Project Structure

```
monster-killer/
├── android/               # Capacitor Android platform
├── dist/                  # Build output (ignored by Git)
├── node_modules/          # Dependencies (ignored by Git)
├── resources/             # Native resources (icons, splash, etc.)
├── src/                   # Game source code
│   ├── assets/
│   │   ├── fontawesome/   # Imported icon font
│   │   └── icons/         # App icons or other visual assets
│   ├── sass/              # SCSS modular styles
│   │   ├── _accordion.scss
│   │   ├── _base.scss
│   │   ├── _modal.scss
│   │   ├── _operations.scss
│   │   ├── _responsive.scss
│   │   ├── _status.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   ├── scripts/           # Modular JS logic
│   │   ├── events.js
│   │   ├── game.js
│   │   ├── history.js
│   │   ├── lifecycle.js
│   │   ├── main.js
│   │   ├── modals.js
│   │   ├── state.js
│   │   ├── storage.js
│   │   ├── ui.js
│   │   └── utils.js
│   ├── index.html
│   └── manifest.webmanifest
├── .gitignore
├── assets.config.json     # Capacitor assets generation config
├── capacitor.config.json  # Capacitor project config
├── package.json
├── package-lock.json
├── README.md
└── vite.config.ts         # Vite bundler config
```

---

## 📦 Installation

```bash
git clone https://github.com/AmirNikfa/monster-killer.git
cd monster-killer
npm install
```

---

## 🧪 Development

```bash
npm run start
```

* Runs Vite dev server
* Accessible via `http://localhost:5173` (or network IP)

---

## 🔨 Build

```bash
npm run build
```

* Output is placed in `dist/`
* Minified using **Terser**
* `console.log` and `debugger` are stripped from production

---

## 📱 Capacitor Setup

### Initialize Capacitor (once)

```bash
npx cap init
```

> This creates the `android/` folder and links Capacitor config.

### Build and Sync

```bash
npm run build
npx cap sync
```

### Open Android Studio

```bash
npx cap open android
```

Then run the app on your emulator or device.

---

## 🌐 Appflow Support

This project is compatible with [Ionic Appflow](https://ionic.io/appflow):

* `dist/` is used as the web output
* Appflow will run `npm install` and `npm run build`
* Capacitor config is minimal and clean

---

## 📃 .gitignore Highlights

```gitignore
node_modules/
dist/
.vite/
.env
```

---

## ⚙️ Preferences Storage

* Game state is saved on **app pause** or **exit** using Capacitor Preferences.
* Game state includes:

  * Player/Monster health
  * Strong/heal counters
  * Round history and logs

No confirmation dialog is shown — game resumes automatically on restart.

---

## 🌟 Author

Built as a fun experiment by [AmirNikfa](https://github.com/AmirNikfa), inspired by a project from a JavaScript course by **Academind**. 
