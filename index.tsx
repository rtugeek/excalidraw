import type * as TExcalidraw from '@excalidraw/excalidraw'
import { TrayApi } from '@widget-js/core'

import React, { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import App from './components/ExampleApp'
import '@excalidraw/excalidraw/index.css'

declare global {
  interface Window {
    ExcalidrawLib: typeof TExcalidraw
  }
}

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)
const { Excalidraw } = window.ExcalidrawLib
async function setupTray() {
  await TrayApi.setTray({
    image: '/favicon.ico',
    tooltip: 'Excalidraw',
  })
  await TrayApi.setContextMenu([{
    label: '退出',
    id: 'exit',
  }])
}
setupTray()
root.render(
  <StrictMode>
    <App
      appTitle="Excalidraw"
      useCustom={() => {}}
      excalidrawLib={window.ExcalidrawLib}
    >
      <Excalidraw />
    </App>
  </StrictMode>,
)
