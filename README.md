# 📝 Kanban Todo App (React + Vite + Redux)

A fully functional **Kanban-style Todo Application** built with **React 19**, **Vite**, and **Redux Toolkit**, including:

- 📋 Kanban board with three columns: **New**, **Ongoing**, and **Done**
- 🧱 Drag and drop (via `@dnd-kit`) between columns
- 🕓 Due time selector for ongoing tasks with **overdue alert**
- 🖱️ Right-click context menu to move tasks
- ✏️ Task **edit** and 🗑️ **delete** support
- 💾 Persisted tasks using **localStorage** (`redux-persist`)
- 🔐 Protected admin dashboard via `ProtectedRoute`
- 🎨 Tailwind CSS responsive UI
- 🌙 Dark Mode toggle
- 🌐 Multi-language support (i18n): English and বাংলা
- 🔔 Notifications via `react-toastify`
- 🧠 Redux Toolkit + middleware setup

---

## 📁 Project Structure

```
src/
├── components/         # UI Components (TodoCard, Modals, etc)
├── layouts/            # Frontend & Backend layouts
├── pages/              # Todo, Dashboard, Users, etc.
├── router/             # Routing setup with ProtectedRoute
├── store/              # Redux slices (auth, todo)
├── assets/             # Static assets (icons, images)
├── i18n/               # Translations
├── App.jsx             # App entry
├── main.jsx            # Root render with Redux, Router
└── index.css           # Tailwind global styles
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

---

## 🔐 Auth & Admin

- Login page for accessing the admin dashboard
- Redux `authSlice` with persisted login
- `/admin` routes protected using `<ProtectedRoute />`

---

## 📦 Features

- ✅ Add/Edit/Delete Tasks (title + description)
- ✅ Right-click to move between columns (excluding current column)
- ✅ Drag-and-drop support (Dnd Kit)
- ✅ Set due time on "Ongoing" tasks (with datetime picker)
- ✅ Show alert if task is overdue
- ✅ Task state persistence using `redux-persist`
- ✅ Responsive design with Tailwind
- ✅ Multilingual UI (EN / বাংলা)
- ✅ Toast notifications

---

## 🌐 i18n Support

- Language switcher built using `react-i18next`
- Stored preference in `localStorage`

---

## 🌙 Dark Mode

Dark mode toggle using Tailwind’s `dark:` utility and `useDarkMode` hook.

---

## 🛠️ Build & Deploy

### Local Build

```bash
npm run build
```

### GitHub Pages Deploy

Make sure `vite.config.js` has:

```js
base: '/todo-app/'
```

Then:

```bash
npm run deploy
```

---

## 👤 Author

**kh muhib**  
Frontend Engineer | React Developer  
🔗 [GitHub](https://github.com/khmuhib01)

---

## 📄 License

MIT — Free to use, modify, and distribute.
