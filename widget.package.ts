import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'Neo Fu',
  description: {
    'zh-CN': '一款手绘风格的虚拟白板工具，方便您绘制流程图、架构图等。',
    'en-US': 'Virtual whiteboard for sketching hand-drawn like diagrams.',
  },
  entry: '/',
  requiredAppVersion: '25.12.5',
  hash: true,
  homepage: '',
  name: 'widgetjs.cn.excalidraw',
  socialLinks: [
    { name: 'github', link: 'https://github.com/rtugeek/excalidraw' },
  ],
  title: {
    'zh-CN': 'Excalidraw 绘图',
    'en-US': 'Excalidraw',
  },
  zipUrl: 'https://widgetjs.cn/excalidraw/widget.zip',
  devOptions: {
    folder: './components',
  },
})
