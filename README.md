# 🚀 Vite + React Scalable Starter Project

A production-ready, scalable React project powered by **Vite** with:

- ⚛️ React 19
- ⚡ Vite for blazing fast builds
- 🛠️ Redux Toolkit + redux-persist
- 🔐 Protected routes (auth-based)
- 🧩 Multi-layout support (Frontend & Backend)
- 🌐 i18n (multi-language support)
- 🎨 Tailwind CSS + Dark Mode toggle
- 🔔 React Toastify for notifications
- 📦 Lazy loading (code splitting)
- 📝 Form validation with react-hook-form + yup
- 🌍 SEO optimization with react-helmet-async
- 🧪 Unit testing setup with Jest + React Testing Library
- 🔑 .env environment variable support

---

## 📁 Project Structure

```
src/
├── api/                # Axios clients
├── assets/             # Images, fonts
├── components/         # UI components
├── hooks/              # Custom hooks (e.g. dark mode)
├── i18n/               # Language JSON files
├── layouts/            # Frontend & Backend layouts
├── pages/              # Route pages (frontend/admin)
├── router/             # React Router setup + ProtectedRoute
├── store/              # Redux Toolkit store & slices
├── App.jsx             # App entry point
├── main.jsx            # Root ReactDOM render
└── index.css           # Tailwind styles
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

---

## 🔧 Environment Setup

### Create `.env` in root:

```
VITE_API_BASE_URL=https://your-api.com
VITE_APP_TITLE=My App
```

Supports:
- `.env`
- `.env.local`
- `.env.production`

---

## 🌐 Multi-language Support (i18n)

- English (EN)
- বাংলা (BN)
- Uses `react-i18next` + `localStorage` for language persistence

---

## 🌙 Dark Mode

Toggle between Light/Dark themes with a simple state + Tailwind `dark:` classes.

---

## 🔐 Auth & Protected Routes

- Redux `authSlice` with persisted login state
- Protected admin routes using `<ProtectedRoute />`

---

## 🔥 Toast Notifications

- Uses `react-toastify` for login/logout, form feedback, errors

---

## ✅ Form Validation

- Built with `react-hook-form` + `yup`
- Realtime form validation + error messages

---

## 📦 Code Splitting (Lazy Loading)

All route-based pages are lazy-loaded using `React.lazy()` and `Suspense`.

---

## 🧪 Unit Testing

Setup with:
- `Jest`
- `React Testing Library`
- DOM testing with `@testing-library/jest-dom`

To run tests:

```bash
npm test
```

---

## 📈 SEO Optimization

- Uses `react-helmet-async`
- Per-page dynamic `<title>` and `<meta>` tags
- Works with social media meta like `og:title`

---

## ✨ Coming Features (Optional Additions)

- [ ] Role-based access control (RBAC)
- [ ] API interceptors for auth
- [ ] Reusable form components
- [ ] Real API integration

---

## 👤 Author

**kh muhib**  
Frontend Engineer | React Specialist  
[GitHub](https://github.com/khmuhib01) | [Portfolio](http://khmuhib.dev)

---

## 📄 License

MIT — free to use for personal or commercial projects.