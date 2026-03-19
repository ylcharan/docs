# Docs

A clean, minimal document editor built with Next.js 16, React 19, Tailwind CSS 4, and TipTap.

This project is focused on a distraction-light writing surface that feels closer to a modern docs product than a starter app. The current experience centers on a document page with a styled editor canvas, rich text support, and table content rendering.

## Why This Project

The goal is to explore a modern document-editing workflow with a lightweight UI and a solid frontend stack.

It is a good base for building features like:

- rich text editing
- document management
- collaborative writing flows
- slash commands and formatting tools
- export or print-friendly document layouts

## Current Experience

Right now the app includes:

- a simple landing page that routes into a document
- a dynamic document route at `/documents/[documentId]`
- a TipTap-powered editor component
- support for headings, lists, and tables
- a clean page-like editing canvas with print-aware styling
- a component setup ready for expanding the UI

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TipTap
- shadcn/ui components

## Project Structure

```text
app/
  page.tsx                         Landing page
  documents/page.tsx               Documents index placeholder
  documents/[documentId]/page.tsx  Dynamic document page
  documents/[documentId]/Editor.tsx TipTap editor
  globals.css                      Global styles and editor styling
components/ui/                     Reusable UI components
lib/                               Shared utilities
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- The homepage currently links directly to a sample document route.
- The documents listing page is still a placeholder.
- The editor is already styled for a document-like layout and is a strong starting point for adding toolbars, persistence, and collaboration.

## Next Ideas

If you want to keep building on this project, strong next steps would be:

- connect documents to a database
- add a toolbar and formatting controls
- save editor content per document
- create a real documents dashboard
- add authentication and sharing

## License

This project is private and currently intended for local development and experimentation.
