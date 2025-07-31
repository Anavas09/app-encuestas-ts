# App Encuestas TS

Aplicación de encuestas construida con React, Vite, TypeScript, Material-UI y Zustand.

## Características
- Preguntas de selección simple
- Preguntas de selección múltiple
- Preguntas de rango (estrellas 1 a 5)
- UI moderna con Material-UI
- Estado global con Zustand
- Preguntas cargadas desde un archivo JSON (`src/questions.json`)

## Instalación

```bash
yarn install
```

## Uso

```bash
yarn dev
```

## Estructura de ejemplo de preguntas

```json
[
  {
    "id": 1,
    "type": "single",
    "question": "¿Cuál es tu lenguaje de programación favorito?",
    "options": ["JavaScript", "Python", "Java", "C#"]
  },
  {
    "id": 2,
    "type": "multiple",
    "question": "¿Qué tecnologías has usado?",
    "options": ["React", "Angular", "Vue", "Svelte"]
  },
  {
    "id": 3,
    "type": "rating",
    "question": "¿Qué tan satisfecho estás con tu trabajo actual?",
    "options": ["1", "2", "3", "4", "5"]
  }
]
```

## Próximamente
- Backend con Express
- Configuración con dotenv

---

Desarrollado por Anavas09

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
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
])
```
