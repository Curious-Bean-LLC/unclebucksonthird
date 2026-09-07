import { useEffect, useState } from 'react'

interface ImageFrontmatter {
  layout: string
  imageFile: string
}

interface ParsedImage {
  frontmatter: ImageFrontmatter
}

// Simple frontmatter parser that doesn't require Buffer
function parseFrontmatter(content: unknown) {
  // Handle if content is an object with a default property (from Vite)
  let contentString = typeof content === 'string' ? content : ''
  
  if (typeof content === 'object' && content !== null && 'default' in content) {
    contentString = (content as any).default
  }

  // Ensure we have a string
  if (typeof contentString !== 'string') {
    console.warn('Content is not a string:', content)
    return { data: {}, body: '' }
  }

  const match = contentString.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: contentString }
  }

  const frontmatterText = match[1]
  const body = match[2]
  const data: Record<string, string> = {}

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim()
    }
  })

  return { data, body }
}

export function useLoadImages(folderPath: string) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Dynamically import all markdown files from the specified folder in src
        const modules = import.meta.glob('../_images/**/*.md', {
          as: 'raw',
        })

        const imageData: ParsedImage[] = []

        for (const [path, importFn] of Object.entries(modules)) {
          // Filter to only include files from the specified folder
          if (path.includes(`_images/${folderPath}/`)) {
            const content = await (importFn as () => Promise<string>)()
            const { data } = parseFrontmatter(content)
            
            if (data.imageFile) {
              imageData.push({
                frontmatter: {
                  layout: data.layout || '',
                  imageFile: data.imageFile,
                },
              })
            }
          }
        }

        // Extract image file paths
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
