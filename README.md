# Cloud Drive - Web File Manager

A modern, high-performance, and lightweight web-based file manager built as a Single Page Application (SPA) using **React, TypeScript, Vite, and Tailwind CSS**. 

This application simulates a cloud storage platform (similar to Google Drive or OneDrive) entirely on the client side, utilizing a Virtual File System (VFS) backed by `localStorage`.

---

## 🚀 Features

- **Virtual File System (VFS):** Flat relational structure managing folders and files seamlessly in memory.
- **Dynamic Breadcrumbs:** Real-time path tracking allowing instant navigation back through parent directory levels.
- **Dual View Modes:** Toggle effortlessly between a card-based **Grid View** and a detailed **Table List View**.
- **Drag & Drop Upload:** Drop real computer files directly into the current directory with visual overlay feedback.
- **Real-Time Global Search:** Filter files and folders instantly across the entire VFS from the top header bar.
- **Client-Side Persistence:** Automatically saves all file systems states, uploads, and folders into the browser's `localStorage`.
- **Contextual File Icons:** Dynamic visual representation for folders, images, code files, spreadsheets, and documents.
- **Clean Architecture:** Minimalistic dependency tree with strict separation of concerns, ideal for pedagogical software engineering guides.

---

## 📁 Folder Structure

```text
cloud-drive/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components (e.g., Generic Modal)
│   │   └── layout/          # Layout structure (Header, Sidebar)
│   ├── features/
│   │   ├── file-explorer/   # Explorer UI components (Breadcrumbs, DropZone, Modals, ViewToggle)
│   │   └── vfs/             # Virtual File System core (Hooks, Mock Data, Types, Utils)
│   ├── pages/               # Main application pages (ExplorerPage)
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Tailwind CSS global styles
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite and Tailwind plugin configuration
└── tsconfig.json            # TypeScript configuration