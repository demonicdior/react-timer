import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import path from 'path'

const aliaReplacer = (orgPath: string) => path.resolve(__dirname, orgPath)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: [
      { find: '@', replacement: aliaReplacer('src') },
      { find: '@assets', replacement: aliaReplacer('src/assets') },
      { find: '@components', replacement: aliaReplacer('src/components') },
      { find: '@timer', replacement: aliaReplacer('src/timer') },
    ],
  },
})
