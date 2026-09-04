import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'
import { useEffect, useRef, useState } from 'react'

// Set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

interface PdfMenuPreviewProps {
  menuFile: string
}

export default function PdfMenuPreview({ menuFile }: PdfMenuPreviewProps) {
  const [pdfThumbnail, setPdfThumbnail] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generatePdfThumbnail = async (
    pdfUrl: string,
  ): Promise<string | undefined> => {
    try {
      console.log(`Generating thumbnail for: ${pdfUrl}`)
      const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise
      const page = await pdf.getPage(1)

      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return undefined

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise

      const dataUrl = canvas.toDataURL('image/png')
      console.log(`Thumbnail generated successfully for: ${pdfUrl}`)
      return dataUrl
    } catch (error) {
      console.error(`Failed to generate thumbnail for ${pdfUrl}:`, error)
      return undefined
    }
  }

  useEffect(() => {
    const loadThumbnail = async () => {
      const thumbnail = await generatePdfThumbnail(menuFile)
      if (thumbnail) {
        setPdfThumbnail(thumbnail)
      }
    }

    loadThumbnail()
  }, [menuFile])

  return (
    <div className='bg-white border-2 border-ub-dark overflow-hidden shadow-lg sticky top-8'>
      <div className='p-4 text-center border-b-2 border-ub-dark'>
        <a
          href={menuFile}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full h-full inline-block bg-ub-orange text-ub-white py-2 px-6 rounded hover:bg-ub-dark transition'
        >
          Open Full Menu
        </a>
      </div>
      <div className='flex justify-center bg-gray-100 p-4'>
        {pdfThumbnail ? (
          <img
            src={pdfThumbnail}
            alt='Menu preview'
            className='max-w-full h-auto'
          />
        ) : (
          <p className='text-gray-500'>Loading PDF preview...</p>
        )}
        <canvas ref={canvasRef} className='hidden' />
      </div>
    </div>
  )
}
