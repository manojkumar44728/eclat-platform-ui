# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

npm create vite@latest my-app -- --template react-ts
npm install react-router-dom
npm i @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query
npm install axios
npm install tailwindcss @tailwindcss/vite
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports
npm install lucide-react
npm install react-error-boundary
npm i react-hook-form
npm i zod
npm i @hookform/resolvers
npm i clsx
npm i antd

my-app/
├── .github/
│ └── workflows/
│
├── .husky/
│
├── .vscode/
│ ├── extensions.json
│ └── settings.json
│
├── public/
│
├── src/
│ ├── app/
│ │ ├── providers/
│ │ │ ├── QueryProvider.tsx
│ │ │ ├── RouterProvider.tsx
│ │ │ └── ThemeProvider.tsx
│ │ │
│ │ ├── routes/
│ │ │ ├── index.tsx
│ │ │ ├── ProtectedRoute.tsx
│ │ │ └── routePaths.ts
│ │ │
│ │ └── AppProviders.tsx
│ │
│ ├── assets/
│ │ ├── images/
│ │ ├── icons/
│ │ ├── fonts/
│ │ └── svg/
│ │
│ ├── components/
│ │ ├── common/
│ │ ├── layout/
│ │ ├── ui/
│ │ └── feedback/
│ │
│ ├── config/
│ │ ├── axios.ts
│ │ ├── env.ts
│ │ └── queryClient.ts
│ │
│ ├── constants/
│ │ ├── api.ts
│ │ ├── routes.ts
│ │ ├── queryKeys.ts
│ │ ├── regex.ts
│ │ └── storage.ts
│ │
│ ├── features/
│ │ ├── auth/
│ │ │ ├── api/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── pages/
│ │ │ ├── schemas/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │ │
│ │ ├── dashboard/
│ │ ├── profile/
│ │ └── users/
│ │
│ ├── hooks/
│ │ ├── useDebounce.ts
│ │ ├── useToggle.ts
│ │ ├── useLocalStorage.ts
│ │ └── usePagination.ts
│ │
│ ├── layouts/
│ │ ├── MainLayout.tsx
│ │ ├── AuthLayout.tsx
│ │ └── DashboardLayout.tsx
│ │
│ ├── lib/
│ │ ├── axios.ts
│ │ ├── cn.ts
│ │ └── logger.ts
│ │
│ ├── services/
│ │ ├── auth.service.ts
│ │ ├── user.service.ts
│ │ └── profile.service.ts
│ │
│ ├── store/
│ │ ├── auth.store.ts
│ │ ├── user.store.ts
│ │ └── index.ts
│ │
│ ├── styles/
│ │ ├── globals.css
│ │ ├── variables.css
│ │ └── tailwind.css
│ │
│ ├── types/
│ │ ├── api.ts
│ │ ├── common.ts
│ │ └── global.d.ts
│ │
│ ├── utils/
│ │ ├── date.ts
│ │ ├── currency.ts
│ │ ├── validation.ts
│ │ ├── download.ts
│ │ └── helpers.ts
│ │
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
│
├── tests/
│ ├── mocks/
│ ├── setup.ts
│ └── utils.tsx
│
├── .editorconfig
├── .env
├── .env.example
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
