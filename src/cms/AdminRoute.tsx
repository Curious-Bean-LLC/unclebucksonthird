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

  collections: [
    {
      name: 'main_menu',
      label: 'Main Menu',
      folder: 'public/_menus/main',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Effective Date', name: 'date', widget: 'datetime' },
        { label: 'Menu File', name: 'menuFile', widget: 'file' },
      ],
    },
    {
      name: 'beer_menu',
      label: 'Beer Menu',
      folder: 'public/_menus/beer',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Effective Date', name: 'date', widget: 'datetime' },
        { label: 'Menu File', name: 'menuFile', widget: 'file' },
      ],
    },
    {
      name: 'wine_menu',
      label: 'Wine Menu',
      folder: 'public/_menus/wine',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Effective Date', name: 'date', widget: 'datetime' },
      ],
    },
    {
      name: 'main_specials',
      label: 'Main Specials',
      folder: 'public/_menus/specials/main',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Item Name', name: 'itemName', widget: 'string' },
        { label: 'Item Image', name: 'itemImage', widget: 'image' },
        {
          label: 'Item Description',
          name: 'itemDescription',
          widget: 'string',
        },
        { label: 'Item Note', name: 'itemNote', widget: 'string' },
        { label: 'Item Price', name: 'itemPrice', widget: 'string' },
      ],
    },
    {
      name: 'beer_specials',
      label: 'Beer Specials',
      folder: 'public/_menus/specials/beer',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Item Name', name: 'itemName', widget: 'string' },
        { label: 'Item Image', name: 'itemImage', widget: 'image' },
        {
          label: 'Item Description',
          name: 'itemDescription',
          widget: 'string',
        },
        { label: 'Item Note', name: 'itemNote', widget: 'string' },
        { label: 'Item Price', name: 'itemPrice', widget: 'string' },
      ],
    },
    {
      name: 'wine_specials',
      label: 'Wine Specials',
      folder: 'public/_menus/specials/wine',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Item Name', name: 'itemName', widget: 'string' },
        { label: 'Item Image', name: 'itemImage', widget: 'image' },
        {
          label: 'Item Description',
          name: 'itemDescription',
          widget: 'string',
        },
        { label: 'Item Note', name: 'itemNote', widget: 'string' },
        { label: 'Item Price', name: 'itemPrice', widget: 'string' },
      ],
    },
    {
      name: 'catering_menu',
      label: 'Catering Menu',
      folder: 'public/_menus/catering',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'menu' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Effective Date', name: 'date', widget: 'datetime' },
        { label: 'Menu File', name: 'menuFile', widget: 'file' },
      ],
    },
    {
      name: 'event_onetime',
      label: 'One-Time Event',
      folder: 'public/_events/onetime',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'event' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Date', name: 'date', widget: 'datetime' },
        { label: 'Promo Image', name: 'flyer', widget: 'image' },
        { label: 'Body', name: 'body', widget: 'markdown' },
      ],
    },
    {
      name: 'event_recurring',
      label: 'Recurring Event',
      folder: 'public/_events/recurring',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'event' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Initial Date', name: 'date', widget: 'datetime' },
        { label: 'End Date', name: 'endDate', widget: 'datetime' },
        { label: 'Promo Image', name: 'flyer', widget: 'image' },
        { label: 'Body', name: 'body', widget: 'markdown' },
        {
          label: 'Recurring Frequency',
          name: 'recurringFrequency',
          widget: 'select',
          options: ['Daily', 'Weekly', 'Monthly'],
        },
      ],
    },
    {
      name: 'home_images',
      label: 'Home Images',
      folder: 'public/_images/home',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'image' },
        { label: 'Image File', name: 'imageFile', widget: 'file' },
      ],
    },
    {
      name: 'catering_images',
      label: 'Catering Images',
      folder: 'public/_images/catering',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'image' },
        { label: 'Image File', name: 'imageFile', widget: 'file' },
      ],
    },
    {
      name: 'about_images',
      label: 'About Images',
      folder: 'public/_images/about',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'image' },
        { label: 'Image File', name: 'imageFile', widget: 'file' },
      ],
    },
    {
      name: 'reservations_images',
      label: 'Reservations Images',
      folder: 'public/_images/reservations',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'image' },
        { label: 'Image File', name: 'imageFile', widget: 'file' },
      ],
    },
    {
      name: 'events_images',
      label: 'Events Images',
      folder: 'public/_images/events',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Layout', name: 'layout', widget: 'hidden', default: 'image' },
        { label: 'Image File', name: 'imageFile', widget: 'file' },
      ],
    },
  ],
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
