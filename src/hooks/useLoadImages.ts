import matter from 'gray-matter'
import { useEffect, useState } from 'react'

interface ImageFrontmatter {
  layout: string
  imageFile: string
}

interface ParsedImage {
  frontmatter: ImageFrontmatter
}

export function useLoadImages(folderPath: string) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Fetch manifest file that lists the markdown files
        const manifestResponse = await fetch(`/_images/${folderPath}/.manifest.json`)
        
        if (!manifestResponse.ok) {
          console.warn(
            `No manifest found for _images/${folderPath}. Make sure .manifest.json exists.`,
          )
          setImages([])
          setLoading(false)
          return
        }

        const manifest = (await manifestResponse.json()) as { files: string[] }
        const mdFiles = manifest.files || []

        if (mdFiles.length === 0) {
          setImages([])
          setLoading(false)
          return
        }

        const imageData: ParsedImage[] = []

        for (const mdFile of mdFiles) {
          try {
            const fileResponse = await fetch(`/_images/${folderPath}/${mdFile}`)
            if (!fileResponse.ok) continue

            const content = await fileResponse.text()
            const { data } = matter(content)

            if (data.imageFile) {
              imageData.push({
                frontmatter: {
                  layout: data.layout || '',
                  imageFile: data.imageFile,
                },
              })
            }
          } catch (err) {
            console.warn(`Error loading file _images/${folderPath}/${mdFile}:`, err)
          }
        }

        const imagePaths = imageData.map(img => img.frontmatter.imageFile)
        setImages(imagePaths)
      } catch (err) {
        console.error(`Error loading images from ${folderPath}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [folderPath])

  return { images, loading, error }
}
