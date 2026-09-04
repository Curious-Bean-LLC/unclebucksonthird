import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'

// Custom plugin to handle markdown files as raw content
const markdownPlugin: Plugin = {
  name: 'markdown-loader',
  resolveId(id) {
    if (id.includes('?raw') && id.endsWith('.md')) {
      return this.resolve(id)
    }
  },
  load(id) {
    if (id.includes('.md') && (id.includes('_events') || id.includes('_images') || id.includes('_menus'))) {
      // Return markdown file as raw string, not parsed JavaScript
      const filePath = id.split('?')[0]
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        return `export default ${JSON.stringify(content)}`
      } catch (err) {
        console.error(`Failed to load markdown: ${filePath}`, err)
        return 'export default ""'
      }
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownPlugin, react(), tailwindcss()],
})
