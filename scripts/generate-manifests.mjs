import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// Directories to scan
const dirsToScan = [
  { path: 'public/_images/home', name: 'Home Images' },
  { path: 'public/_images/catering', name: 'Catering Images' },
  { path: 'public/_images/about', name: 'About Images' },
  { path: 'public/_images/events', name: 'Events Images' },
  { path: 'public/_images/reservations', name: 'Reservations Images' },
  { path: 'public/_events/recurring', name: 'Recurring Events' },
  { path: 'public/_events/onetime', name: 'One-Time Events' },
  { path: 'public/_menus/main', name: 'Main Menu' },
  { path: 'public/_menus/beer', name: 'Beer Menu' },
  { path: 'public/_menus/wine', name: 'Wine Menu' },
  { path: 'public/_menus/catering', name: 'Catering Menu' },
  { path: 'public/_menus/specials/main', name: 'Main Specials' },
  { path: 'public/_menus/specials/beer', name: 'Beer Specials' },
  { path: 'public/_menus/specials/wine', name: 'Wine Specials' },
]

console.log('Generating manifest files...\n')

for (const dir of dirsToScan) {
  const fullPath = path.join(projectRoot, dir.path)

  try {
    const files = fs
      .readdirSync(fullPath)
      .filter(file => file.endsWith('.md'))
      .sort()

    const manifest = { files }
    const manifestPath = path.join(fullPath, '.manifest.json')

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    console.log(`✓ ${dir.name}: ${files.length} files`)
    if (files.length > 0) {
      files.forEach(f => console.log(`  - ${f}`))
    }
  } catch (err) {
    console.error(`✗ Error processing ${dir.name}:`, err.message)
  }
}

console.log('\nDone!')


