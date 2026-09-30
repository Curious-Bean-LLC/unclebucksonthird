import CMS from 'decap-cms-app'
import type { CmsConfig } from 'decap-cms-core'
import { useEffect, useLayoutEffect } from 'react'

// import siteCss from '../site.css?inline' //TODO see if this siteCss thing is worth importing

const cmsConfig: CmsConfig = {
  load_config_file: false,

  backend: {
    name: 'git-gateway',
    branch: 'main',
  },

  /**
   * Sends every read and write to the `decap-server` proxy on :8081 instead of
   * to git-gateway, so `pnpm dev` edits the real files in this working copy.
   * Decap only honours this on localhost, so it is safe to leave switched on.
   */
  local_backend: true,

  site_url: '/',
  media_folder: 'public/images/uploads', // Media files will be stored in the repo under public/images/uploads,
  public_folder: '/images/uploads', // The src attribute for uploaded media will begin with /images/uploads

  collections: []
}

let initialized = false

function initializeCMS() {
  if (initialized) return
  initialized = true

  CMS.init({ config: cmsConfig })
}

const styles: Element[] = []

const showCms = () => {
  const cmsRoot = document.getElementById('nc-root')
  cmsRoot?.style.removeProperty('display')
  styles.forEach((style) => {
    document.head.appendChild(style)
  })
}

const hideCms = () => {
  const cmsRoot = document.getElementById('nc-root')
  document.querySelectorAll('style[data-emotion]').forEach((style) => {
    styles.push(style)
    style.remove()
  })
  cmsRoot?.style.setProperty('display', 'none')
}

export default function AdminRoute() {
  useEffect(() => {
    initializeCMS()
  }, [])

  useLayoutEffect(() => {
    showCms()
    return hideCms
  }, [])

  return <div className='cms-root' />
}
