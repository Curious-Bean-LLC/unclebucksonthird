import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    middlewareMode: false,
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Serve Decap CMS admin from /admin route
          if (req.url === '/admin' || req.url.startsWith('/admin/')) {
            const adminFile = path.join(__dirname, 'public/admin/index.html')
            if (fs.existsSync(adminFile)) {
              res.setHeader('Content-Type', 'text/html')
              res.end(fs.readFileSync(adminFile, 'utf-8'))
              return
            }
          }
          next()
        })
      }
    }
  }
})
