# TibiaEye GUI — Production Dashboard

Professional dark-themed dashboard for the TibiaEye bot, built with React + Tailwind CSS.

![TibiaEye Dashboard](https://img.shields.io/badge/TibiaEye-Dashboard-89b4fa?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square)

## Features

- 🎨 **Dark Catppuccin Mocha theme** — easy on the eyes for long sessions
- 📊 **Real-time Dashboard** — KPIs, HP/Mana bars, FPS charts, battle list
- 🖥️ **Live Preview** — Animated canvas with BBOX overlays (creatures, radar, battle list)
- 🤖 **Cavebot** — Waypoint map, path visualization, loop tracking
- ❤️ **Healing** — Configurable auto-heal rules with cooldown tracking
- 🎯 **Targeting** — Creature priority, ignore/loot toggles, kill counter
- ✨ **Spell AI** — Rotation management, cooldown timeline, mana efficiency
- 🔌 **Hardware** — RP2040 status, capture config, GPU metrics, system resources
- ⚙️ **Settings** — Full config with toggles, import/export
- 📹 **Recorder** — Session recording & playback with speed control
- 📈 **Status/Logs** — Filterable log viewer with export
- 🔧 **Diagnostics** — FPS graph, inference latency histogram, template viewer, memory breakdown
- 🛡️ **Safety** — ESC emergency stop, MONITOR/CONTROL mode toggle

## Quick Start

```bash
# Clone the repo
git clone https://github.com/wojtechit/gui.git
cd gui

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.tsx                    # Main app, routing, bot state, ESC handler
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + custom theme
├── components/
│   ├── Sidebar.tsx            # Navigation + MONITOR/CONTROL toggle
│   ├── LivePreview.tsx        # Canvas with BBOX overlays + FPS
│   ├── HPManaBar.tsx          # Animated HP/Mana bars
│   ├── MetricCard.tsx         # KPI cards
│   └── EventLog.tsx           # Scrollable event log
└── pages/
    ├── Dashboard.tsx          # Main dashboard (KPIs, charts, battle list)
    ├── Cavebot.tsx            # Waypoint map & navigation
    ├── Healing.tsx            # Auto-heal rules & thresholds
    ├── Targeting.tsx          # Creature priority & loot config
    ├── SpellAI.tsx            # Spell rotation & cooldowns
    ├── Hardware.tsx           # RP2040, capture, GPU status
    ├── Settings.tsx           # Full configuration
    ├── Recorder.tsx           # Session recording & playback
    ├── Status.tsx             # Logs with filters & export
    └── Diagnostics.tsx        # Performance metrics & templates
```

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Styling
- **Recharts** — Charts & graphs
- **Vite** — Build tool
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Theme

| Token | Color | Usage |
|-------|-------|-------|
| `base` | `#1e1e2e` | Main background |
| `surface` | `#252537` | Cards, panels |
| `sidebar` | `#181825` | Sidebar |
| `primary` | `#89b4fa` | Accents, links |
| `success` | `#a6e3a1` | OK status, HP |
| `danger` | `#f38ba8` | Errors, stop |
| `warning` | `#f9e2af` | Warnings, mana |
| `text` | `#cdd6f4` | Primary text |
| `text-secondary` | `#6c7086` | Muted text |

## Safety Features

- **ESC** — Emergency stop from any page
- **MONITOR mode** — Default, no actions sent
- **CONTROL mode** — Requires confirmation
- **Auto-pause** — When FPS drops or Pico unresponsive

## License

MIT
