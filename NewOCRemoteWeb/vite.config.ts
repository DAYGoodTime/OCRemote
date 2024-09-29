import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  css:{
    postcss:{
      plugins:[tailwind(),autoprefixer()]
    }
  },
  plugins: [vue(),vueJsx()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "src")
    }
  }
})
