import matter from 'gray-matter'
import { useEffect, useState } from 'react'

export function useLoadMenus(folderPath: string) {
  const [menuFile, setMenuFile] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const manifestResponse = await fetch(`/_menus/${folderPath}/.manifest.json`)

        if (!manifestResponse.ok) {
          console.warn(
            `No manifest found for _menus/${folderPath}. Make sure .manifest.json exists.`,
          )
          setMenuFile('')
          setLoading(false)
          return
        }

        const manifest = (await manifestResponse.json()) as { files: string[] }
        const mdFiles = manifest.files || []

        if (mdFiles.length === 0) {
          setMenuFile('')
          setLoading(false)
          return
        }

        // Load the first menu file
        for (const mdFile of mdFiles) {
          try {
            const fileResponse = await fetch(`/_menus/${folderPath}/${mdFile}`)
            if (!fileResponse.ok) continue

            const content = await fileResponse.text()
            const { data } = matter(content)

            if (data.menuFile) {
              setMenuFile(data.menuFile)
              break // Use the first one found
            }
          } catch (err) {
            console.warn(`Error loading file _menus/${folderPath}/${mdFile}:`, err)
          }
        }
      } catch (err) {
        console.error(`Error loading menu from ${folderPath}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [folderPath])

  return { menuFile, loading, error }
}
