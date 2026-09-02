import { useEffect } from 'react'

export default function Admin() {
  useEffect(() => {
    // Decap CMS is initialized globally in App.tsx
    // This component just provides the mount point
  }, [])

  return <div id="nc-root" />
}
