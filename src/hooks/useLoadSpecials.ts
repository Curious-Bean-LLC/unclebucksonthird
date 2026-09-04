import matter from 'gray-matter'
import { useEffect, useState } from 'react'

export interface MenuItem {
  itemName: string
  itemImage?: string
  itemDescription: string
  itemNote?: string
  itemPrice: string
}

export interface MenuSpecial {
  frontmatter: MenuItem
  body: string
}

export function useLoadSpecials(folderPath: string) {
  const [specials, setSpecials] = useState<MenuSpecial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSpecials = async () => {
      try {
        const manifestResponse = await fetch(`/_menus/specials/${folderPath}/.manifest.json`)

        if (!manifestResponse.ok) {
          console.warn(
            `No manifest found for _menus/specials/${folderPath}. Make sure .manifest.json exists.`,
          )
          setSpecials([])
          setLoading(false)
          return
        }

        const manifest = (await manifestResponse.json()) as { files: string[] }
        const mdFiles = manifest.files || []

        if (mdFiles.length === 0) {
          setSpecials([])
          setLoading(false)
          return
        }

        const specialsData: MenuSpecial[] = []

        for (const mdFile of mdFiles) {
          try {
            const fileResponse = await fetch(
              `/_menus/specials/${folderPath}/${mdFile}`,
            )
            if (!fileResponse.ok) continue

            const content = await fileResponse.text()
            const { data } = matter(content)

            specialsData.push({
              frontmatter: data as MenuItem,
              body: content,
            })
          } catch (err) {
            console.warn(
              `Error loading file _menus/specials/${folderPath}/${mdFile}:`,
              err,
            )
          }
        }

        setSpecials(specialsData)
      } catch (err) {
        console.error(`Error loading specials from ${folderPath}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadSpecials()
  }, [folderPath])

  return { specials, loading, error }
}
