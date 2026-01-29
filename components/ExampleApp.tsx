import type * as TExcalidraw from '@excalidraw/excalidraw'

import type {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types'
import type { ResolvablePromise } from '../utils'

import { BrowserWindowApi, Channel, DeployedWidgetApi, TrayApiEvent } from '@widget-js/core'
import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useIpcListener } from '../hook/useIpcListener'

import { useMenuListener } from '../hook/useMenuListener'
import initialData from '../initialData'
import {
  resolvablePromise,
} from '../utils'
import './ExampleApp.scss'

export interface AppProps {
  appTitle: string
  useCustom: (api: ExcalidrawImperativeAPI | null, customArgs?: any[]) => void
  customArgs?: any[]
  children: React.ReactNode
  excalidrawLib: typeof TExcalidraw
}

export default function ExampleApp({
  useCustom,
  customArgs,
  children,
  excalidrawLib,
}: AppProps) {
  const {
    convertToExcalidrawElements,
  } = excalidrawLib
  const appRef = useRef<any>(null)

  const initialStatePromiseRef = useRef<{
    promise: ResolvablePromise<ExcalidrawInitialDataState | null>
  }>({ promise: null! })
  if (!initialStatePromiseRef.current.promise) {
    initialStatePromiseRef.current.promise
      = resolvablePromise<ExcalidrawInitialDataState | null>()
  }

  const [excalidrawAPI, setExcalidrawAPI]
    = useState<ExcalidrawImperativeAPI | null>(null)

  useCustom(excalidrawAPI, customArgs)

  useMenuListener((eventType, menu) => {
    if (eventType == 'event::cn.widgetjs.core.menu.item.click') {
      if (menu.id == 'exit') {
        DeployedWidgetApi.removeDeployedWidget()
      }
    }
  })
  useIpcListener(Channel.TRAY, (event) => {
    if (event == TrayApiEvent.CLICK) {
      BrowserWindowApi.show()
    }
  })
  useIpcListener(Channel.BROWSER_WINDOW, (event) => {
    if (event == 'event::cn.widgetjs.core.browser-window.close') {
      BrowserWindowApi.hide()
    }
  })
  useEffect(() => {
    if (!excalidrawAPI) {
      return
    }
    initialStatePromiseRef.current.promise.resolve({
      ...initialData,
      elements: convertToExcalidrawElements(initialData.elements),
    })
  }, [excalidrawAPI, convertToExcalidrawElements])

  const renderExcalidraw = (children: React.ReactNode) => {
    const Excalidraw: any = Children.toArray(children).find(
      child =>
        React.isValidElement(child)
        && typeof child.type !== 'string'
        && child.type.displayName === 'Excalidraw',
    )
    if (!Excalidraw) {
      return
    }
    const newElement = cloneElement(
      Excalidraw,
      {
        excalidrawAPI: (api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api),
        initialData: initialStatePromiseRef.current.promise,
        gridModeEnabled: true,
        langCode: 'zh-CN',
      },
    )
    return newElement
  }
  return (
    <div className="App" ref={appRef}>
      <div className="excalidraw-wrapper">
        {renderExcalidraw(children)}
      </div>
    </div>
  )
}
