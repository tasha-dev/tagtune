# 🎵 TagTune

> A privacy-first MP3 metadata editor that runs entirely in your browser.

[Live Demo](https://tagtune-five.vercel.app) · [Source Code](https://github.com/tasha-dev/tagtune)

TagTune is a modern web application for editing MP3 metadata, updating album artwork, previewing tracks, and managing a personal music library without uploading your music to a server.

The core idea is simple: **edit your music locally, keep your files private, and download the result when you're done.**

---

## ✨ Features

### 🎼 Metadata editing

Edit common ID3 fields directly from the browser:

* Title
* Artist
* Album
* Album Artist
* Genre
* Year
* Track Number
* Disc Number
* Composer / Lyricist
* Publisher
* Copyright
* BPM
* Musical Key
* Language
* ISRC
* Website
* Comments
* Lyrics

### 🖼 Album artwork

* Add or replace embedded cover artwork
* Remove or update existing artwork
* Supports common JPEG and PNG cover images

### 🎧 Built-in audio experience

* Preview uploaded tracks
* Play and pause audio
* Control playback from the built-in player
* Keep track editing and playback inside one workflow

### 📚 Personal music library

* Keep uploaded tracks organized in the application
* Review track information before editing
* Manage multiple files through a focused music-library interface

### 💾 Export edited files

After editing, TagTune generates a new MP3 with the updated ID3 metadata and downloads it directly to your device.

### 🔒 Privacy-first by design

Your music is processed in the browser rather than uploaded to a backend service. TagTune does not require cloud storage for the editing workflow, keeping the user's audio files on their device.

---

## 🧠 How It Works

TagTune follows a deliberately simple client-side workflow:

```text
MP3 File
   ↓
Browser File API
   ↓
Audio / Metadata Editor
   ↓
ID3 Frame Updates
   ↓
New MP3 Blob
   ↓
Browser Download
```

The editing flow reads the selected file into memory, updates the required ID3 frames, creates a new Blob/File, and triggers a local browser download.

No application server is required for the core metadata-editing workflow.

---

## 🏗 Architecture

TagTune is built as a Next.js application with a component-oriented frontend architecture.

```text
app/
├── app/                  # Main application route
├── error.tsx             # Application error boundary
├── not-found.tsx         # 404 handling
├── layout.tsx            # Global layout and metadata
└── page.tsx              # Landing page

component/
├── audioFile.tsx         # Audio file presentation
├── dropzone.tsx          # MP3 upload interaction
├── musicPlayer.tsx       # Audio playback
├── header.tsx            # Application header
├── footer.tsx            # Footer
├── dialog/               # Metadata editing UI
├── section/              # Landing-page sections
└── ui/                   # Reusable interface primitives

lib/
├── formSchema.ts         # Form validation
└── util.ts               # Shared utilities

store/                    # Client-side application state
```

The UI is split into focused components while domain-specific concerns such as validation and metadata manipulation remain isolated from presentation code.

---

## 🔧 Key Technical Decisions

### Browser-native file processing

TagTune uses browser file primitives such as `File`, `Blob`, `ArrayBuffer`, and object URLs to work with local audio files without introducing a server-side upload pipeline.

### ID3 metadata manipulation in the browser

`browser-id3-writer` is used to write ID3 frames directly from the client. This allows metadata and artwork to be embedded into the exported MP3 without sending the original file to an external service.

### Schema-driven forms

Metadata editing is handled with React Hook Form and Zod-based validation. This keeps form state predictable while providing validation feedback before the file is generated.

### Lightweight client-side state

Zustand is used for application state where shared state is needed without introducing a heavier state-management architecture.

### Component-based UI

The interface is composed from reusable application components and UI primitives, with Tailwind CSS providing the styling foundation and shadcn/ui patterns supporting consistent interactions.

---

## 🛠 Tech Stack

| Category      | Technology                  |
| ------------- | --------------------------- |
| Framework     | Next.js 16                  |
| UI            | React 19                    |
| Language      | TypeScript                  |
| Styling       | Tailwind CSS 4              |
| Components    | shadcn/ui / Base UI         |
| State         | Zustand                     |
| Forms         | React Hook Form             |
| Validation    | Zod                         |
| MP3 Metadata  | browser-id3-writer          |
| Audio         | HTML5 Audio API             |
| File Handling | Browser File API / Blob API |
| Icons         | Lucide React                |
| Animation     | Framer Motion               |
| Notifications | Sonner                      |
| Code Quality  | ESLint                      |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/tasha-dev/tagtune.git
cd tagtune
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```text
TagTune/
├── app/                  # Next.js routes, layout and global styles
├── component/            # Feature and reusable UI components
├── lib/                  # Validation schemas and utilities
├── store/                # Client-side state
├── public/               # Static assets
├── components.json       # UI component configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── LICENSE               # MIT License
```

---

## 🎯 Design Goals

TagTune was built around a few practical product principles:

* **Privacy first** — audio files should not need to leave the user's device.
* **Fast workflow** — upload, edit, preview, export.
* **Focused UX** — avoid unnecessary complexity for a task that should be quick.
* **Modern web experience** — bring a cleaner interface to a traditionally desktop-oriented workflow.
* **No unnecessary backend** — the core editor can operate entirely on the client.

---

## 🔐 Privacy

TagTune is designed so that the core editing workflow happens locally in the browser.

The application does not need to upload an MP3 to a remote server in order to modify its metadata. The selected file is read by the browser, processed in memory, and exported as a new file for the user to download.

This architecture also means TagTune can provide useful functionality without maintaining a cloud-based music storage system.

---

## ⚠️ Current Scope

TagTune currently focuses on MP3 files and ID3 metadata editing.

Browser-based file processing also means available memory and browser capabilities can affect the experience when working with unusually large audio files.

---

## 🧪 Development

The project includes ESLint for code-quality checks and uses a typed TypeScript codebase.

Before opening a change, run:

```bash
npm run lint
npm run build
```

---

## 📌 Project Status

TagTune is an actively developed personal project and a practical exploration of browser-based audio processing, metadata manipulation, client-side file handling, and privacy-focused web application design.

---

## 📄 License

TagTune is open source and available under the **MIT License**.

---

## 👤 Author

Built by **Mahdi Tasha**.

* [GitHub](https://github.com/tasha-dev)
* [Portfolio](https://tasha.vercel.app)
* [TagTune Live Demo](https://tagtune-five.vercel.app)

---

<p align="center">
  <strong>TagTune</strong> — edit your music. Keep your files private.
</p>
