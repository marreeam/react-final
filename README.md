# 🧠 QuizVerse

A responsive, multilingual trivia quiz application built with **React + TypeScript**. Pick a category and difficulty, race a per‑question timer, get instant feedback, and track your scores over time — with light/dark themes and English/Georgian localization.

Questions are fetched live from the free [Open Trivia Database](https://opentdb.com).

## ✨ Features

- **Live API integration** — trivia questions and categories fetched with Axios.
- **Per‑question timer** with an animated countdown ring.
- **Instant answer feedback** (correct / incorrect states) and an end‑of‑quiz review.
- **Persistent history** — every result is saved to Local Storage; view, delete, or clear it.
- **Light & Dark mode** 🌗 — remembers your choice and respects your system preference.
- **Multilingual** 🇬🇧 / 🇬🇪 — full English and Georgian translations.
- **Smooth animations** with Framer Motion and an accessible, animated modal.
- **Fully responsive** — designed mobile‑first for every device size in Chrome DevTools.

## 🧩 Requirements checklist

| Requirement                        | Implementation                                                        |
| ---------------------------------- | --------------------------------------------------------------------- |
| 3+ pages                           | Home, New Quiz, Quiz, Results, History, About, 404                    |
| Functional components              | Entire app is function components                                     |
| React Hooks                        | `useState`, `useEffect`, `useCallback`, `useMemo`, `useContext` + custom hooks |
| React Router                       | `react-router-dom` with a shared layout route                         |
| API integration                    | Axios + Open Trivia DB (`src/api/trivia.ts`)                          |
| Storage interaction                | `useLocalStorage` hook (theme, language, quiz history)                |
| Responsive design                  | SCSS mixins + mobile‑first breakpoints                                |
| Animations / modals                | Framer Motion transitions + reusable `Modal`                          |
| **Bonus:** CSS preprocessor        | SCSS with variables, mixins & CSS Modules                             |
| **Bonus:** extra React features    | Context API, custom hooks, React Portals, `AnimatePresence`           |
| **Bonus:** Dark / Light mode       | `ThemeProvider` + CSS custom properties                               |
| **Bonus:** Multilingual            | `LanguageProvider` + typed translation dictionary                     |

## 🛠️ Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) build tooling
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sass](https://sass-lang.com/) (SCSS Modules)

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run the linter
```

## 📁 Project structure

```
src/
├── api/            # Axios client & trivia endpoints
├── components/
│   ├── layout/     # Navbar, Footer, Layout, ScrollToTop
│   ├── quiz/       # QuestionCard, OptionButton, Timer
│   └── ui/         # Button, Modal, Loader, ProgressBar, toggles
├── context/        # Theme, Language & Quiz providers + contexts
├── hooks/          # useLocalStorage, useTheme, useLanguage, useQuiz, useHistory
├── i18n/           # English & Georgian translations
├── pages/          # Home, Setup, Quiz, Results, History, About, NotFound
├── styles/         # SCSS design system (variables, mixins, themes, globals)
├── types/          # Shared TypeScript types
└── utils/          # Helpers (HTML decode, shuffle, formatting)
```

## 🌐 Data source

All trivia content comes from the community‑maintained [Open Trivia Database](https://opentdb.com) and is decoded/normalized client‑side. No API key is required.
