import tailwindContainerQueries from '@tailwindcss/container-queries'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.{js,ts,vue}',
    './error.{js,ts,vue}',
  ],
  darkMode: 'class',
  plugins: [tailwindContainerQueries],
  theme: { container: { center: true } },
} satisfies Config
