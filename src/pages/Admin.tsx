import CMS from 'decap-cms-app'
import { useEffect } from 'react'

export default function Admin() {
  useEffect(() => {
    CMS.init()
  }, [])

  return <div id='nc-root' key='admin-body' />
}
