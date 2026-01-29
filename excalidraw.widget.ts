import { BackgroundWidget, DeployMode, WidgetKeyword } from '@widget-js/core'

const ExcalidrawWidget = new BackgroundWidget({
  name: '.default',
  title: { 'zh-CN': '画板', 'en-US': 'Excalidraw' },
  description: {
    'zh-CN': '一款手绘风格的虚拟画板。',
    'en-US': 'Virtual whiteboard for sketching hand-drawn like diagrams.',
  },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  browserWindowOptions: {
    backgroundThrottling: false,
    skipTaskbar: false,
    titleBarStyle: 'default',
    transparent: false,
    resizable: true,
    frame: true,
    minimizable: true,
    maximizable: true,
    width: 1200,
    center: true,
    height: 800,
    movable: true,
    preventDefaultClose: true,
  },
  supportDeployMode: DeployMode.BACKGROUND,
  previewImage: '/preview.png',
  socialLinks: [
    { name: 'github', link: 'https://github.com/rtugeek/excalidraw' },
  ],
  path: '/',
})

export default ExcalidrawWidget
