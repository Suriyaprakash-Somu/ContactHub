# Contact Hub 

A single-page React app for managing your personal address book.  
Add, edit, search, sort, and map your contacts — all stored locally in the browser.

---

## Features

- **Validated form** with Zod (add / edit)  
- **Searchable & sortable** table (tanstack/react-table)  
- **Delete with confirm dialog + Bootstrap toast**  
- **Leaflet map** showing contact pins  
- **Local Storage** persistence (offline-ready)  
- **Responsive** Bootstrap 5 layout  
- **Unit & component tests** (Vitest + Testing Library)

---

## Tech Stack

| Layer | Library / Tool |
|-------|----------------|
| Framework | React 18 + Vite |
| UI & CSS | Bootstrap 5, Lucide icons |
| State | React Context + useReducer |
| Validation | Zod |
| Table | @tanstack/react-table |
| Map | Leaflet & react-leaflet |
| Testing | Vitest, @testing-library/react |

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS or newer |
| npm / pnpm / yarn | latest |

### Installation & Commands

| Step | Command | Purpose |
|------|---------|---------|
| Clone | `git clone https://github.com/<your-org>/contact-keeper.git`<br>`cd contact-keeper` | Download source |
| Install | `npm ci` <br>*(or `pnpm i` / `yarn`)* | Install dependencies |
| Dev server | `npm run dev` | Start Vite at **<http://localhost:5173>** with hot-reload |
| Build | `npm run build` | Create production bundle in `dist/` |
| Preview | `npm run preview` | Serve the production build locally |
| Test (once) | `npm run test` | Run Vitest unit/component suite |
| Test (watch) | `npm run test:watch` | Re-run tests on file change |
| Lint | `npm run lint` | ESLint codebase check |
| Format | `npm run format` | Prettier auto-format |

> **First run:** `npm run dev` also copies Leaflet marker images; no extra setup needed.

---

## Folder Structure

src/
├─ components/ # FormInput, layout bits
├─ context/ # ContactContext (CRUD + LocalStorage)
├─ pages/ # ContactListPage, ContactFormPage, MapViewPage
├─ utils/ # Zod schema, static data, fake geocoder
└─ main.jsx and App.jsx 

---

## Testing

```bash
npm run test         
npm run test:watch  