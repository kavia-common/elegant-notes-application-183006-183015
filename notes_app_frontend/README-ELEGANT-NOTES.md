# Elegant Notes (Frontend Only)

A modern, lightweight React notes app with a two-panel layout. No backend required — notes are stored in localStorage.

Features
- Two-panel layout: notes list (left), editor (right)
- Create, select, edit, and delete notes
- Autosave with debounce and Ctrl/Cmd+S shortcut
- Search and sort (last edited, created, title)
- Accessible: keyboard focus, ARIA labels, readable contrast
- Light theme with #3b82f6 and #06b6d4 accents
- Local persistence across reloads

Development
- Start: npm start (runs at http://localhost:3000)
- Build: npm run build

Notes
- Data is saved under localStorage key elegant-notes.v1
- Initial sample notes are provided on first run
