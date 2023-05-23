import { createRouter, createWebHistory } from 'vue-router'
import { useTabsStore, usePagesStore } from '@/store'
import { openNewPageInNewTab } from '@/util'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 首页
    {
      name: Symbol('/'),
      path: '/',
      component: () => import('@/views/HomePage.vue'),
      meta: {
        title: '首页',
        isView: true,
      },
    },

    // 表格
    {
      name: Symbol('/table'),
      path: '/table',
      meta: {
        title: '表格',
        isView: false,
      },
      children: [
        {
          name: Symbol('/table/base'),
          path: '/table/base',
          component: () => import('@/views/table/BaseTable.vue'),
          meta: {
            title: '基础表格',
            isView: true,
          },
        },
      ],
    },

    // 表单
    {
      name: Symbol('/form'),
      path: '/form',
      meta: {
        title: '表单',
        isView: false,
      },
      children: [
        {
          name: Symbol('/form/base'),
          path: '/form/base',
          component: () => import('@/views/form/BaseForm.vue'),
          meta: {
            title: '基础表单',
            isView: true,
          },
        },
      ],
    },

    // 组件
    {
      name: Symbol('/component'),
      path: '/component',
      meta: {
        title: '组件',
        isView: false,
      },
      children: [
        {
          name: Symbol('/component/icon'),
          path: '/component/icon',
          component: () => import('@/views/component/IconList.vue'),
          meta: {
            title: '图标组件',
            isView: true,
          },
        },
        {
          name: Symbol('/component/terminal'),
          path: '/component/terminal',
          component: () => import('@/views/component/WebTerminal.vue'),
          meta: {
            title: '图标组件',
            isView: true,
          },
        },
        {
          name: Symbol('/component/draggable'),
          path: '/component/draggable',
          component: () => import('@/views/component/DraggableComponent.vue'),
          meta: {
            title: '拖拽组件',
            isView: true,
          },
        },
        {
          name: Symbol('/component/scalable'),
          path: '/component/scalable',
          component: () => import('@/views/component/ScalableComponent.vue'),
          meta: {
            title: '缩放组件',
            isView: true,
          },
        },
        {
          name: Symbol('/component/rotatable'),
          path: '/component/rotatable',
          component: () => import('@/views/component/RotatableComponent.vue'),
          meta: {
            title: '旋转组件',
            isView: true,
          },
        },
        {
          name: Symbol('/component/rich-text-editor'),
          path: '/component/rich-text-editor',
          component: () => import('@/views/component/RichTextEditor.vue'),
          meta: {
            title: '富文本编辑器',
            isView: true,
          },
        },
      ],
    },

    // 图表
    {
      name: Symbol('/chart'),
      path: '/chart',
      meta: {
        title: '图表',
        isView: false,
      },
      children: [
        {
          name: Symbol('/chart/bar'),
          path: '/chart/bar',
          component: () => import('@/views/chart/BarChart.vue'),
          meta: {
            title: '柱状图',
            isView: true,
          },
        },
        {
          name: Symbol('/chart/line'),
          path: '/chart/line',
          component: () => import('@/views/chart/LineChart.vue'),
          meta: {
            title: '折线图',
            isView: true,
          },
        },
        {
          name: Symbol('/chart/pie'),
          path: '/chart/pie',
          component: () => import('@/views/chart/PieChart.vue'),
          meta: {
            title: '饼图',
            isView: true,
          },
        },
        {
          name: Symbol('/chart/scatter'),
          path: '/chart/scatter',
          component: () => import('@/views/chart/ScatterChart.vue'),
          meta: {
            title: '散点图',
            isView: true,
          },
        },
      ],
    },

    // 嵌套菜单
    {
      name: Symbol('/route'),
      path: '/route',
      meta: {
        title: '嵌套菜单',
        isView: false,
      },
      children: [
        {
          name: Symbol('/route/1'),
          path: '/route/1',
          component: () => import('@/views/route/RouteFirst.vue'),
          meta: {
            title: '嵌套菜单-1',
            isView: true,
          },
        },
        {
          name: Symbol('/route/2'),
          path: '/route/2',
          component: () => import('@/views/route/RouteSecond.vue'),
          meta: {
            title: '嵌套菜单-2',
            isView: true,
          },
          children: [
            {
              name: Symbol('/route/2/1'),
              path: '/route/2/1',
              component: () => import('@/views/route/RouteSecondFirst.vue'),
              meta: {
                title: '嵌套菜单-2-1',
                isView: true,
              },
            },
            {
              name: Symbol('/route/2/2'),
              path: '/route/2/2',
              component: () => import('@/views/route/RouteSecondSecond.vue'),
              meta: {
                title: '嵌套菜单-2-2',
                isView: true,
              },
              children: [
                {
                  name: Symbol('/route/2/2/1'),
                  path: '/route/2/2/1',
                  component: () => import('@/views/route/RouteSecondSecondFirst.vue'),
                  meta: {
                    title: '嵌套菜单-2-2-1',
                    isView: true,
                  },
                },
                {
                  name: Symbol('/route/2/2/2'),
                  path: '/route/2/2/2',
                  component: () => import('@/views/route/RouteSecondSecondSecond.vue'),
                  meta: {
                    title: '嵌套菜单-2-2-2',
                    isView: true,
                  },
                },
                {
                  name: Symbol('/route/2/2/3'),
                  path: '/route/2/2/3',
                  component: () => import('@/views/route/RouteSecondSecondThird.vue'),
                  meta: {
                    title: '嵌套菜单-2-2-3',
                    isView: true,
                  },
                },
              ],
            },
            {
              name: Symbol('/route/2/3'),
              path: '/route/2/3',
              component: () => import('@/views/route/RouteSecondThird.vue'),
              meta: {
                title: '嵌套菜单-2-3',
                isView: true,
              },
            },
          ],
        },
        {
          name: Symbol('/route/3'),
          path: '/route/3',
          component: () => import('@/views/route/RouteThird.vue'),
          meta: {
            title: '嵌套菜单-3',
            isView: true,
          },
        },
      ],
    },

    // 文档
    {
      name: Symbol('/docs'),
      path: '/docs',
      meta: {
        title: '文档',
        isView: false,
      },
      children: [
        {
          name: Symbol('/docs/word-preview'),
          path: '/docs/word-preview',
          component: () => import('@/views/docs/WordPreview.vue'),
          meta: {
            title: 'Word 预览',
            isView: true,
          },
        },
        {
          name: Symbol('/docs/excel-preview'),
          path: '/docs/excel-preview',
          component: () => import('@/views/docs/ExcelPreview.vue'),
          meta: {
            title: 'Excel 预览',
            isView: true,
          },
        },
        {
          name: Symbol('/docs/ppt-preview'),
          path: '/docs/ppt-preview',
          component: () => import('@/views/docs/PPTPreview.vue'),
          meta: {
            title: 'PPT 预览',
            isView: true,
          },
        },
        {
          name: Symbol('/docs/pdf-preview'),
          path: '/docs/pdf-preview',
          component: () => import('@/views/docs/PDFPreview.vue'),
          meta: {
            title: 'PDF 预览',
            isView: true,
          },
        },
      ],
    },

    // 功能
    {
      name: Symbol('/feature'),
      path: '/feature',
      meta: {
        title: '功能',
        isView: false,
      },
      children: [
        {
          name: Symbol('/feature/bar-code'),
          path: '/feature/bar-code',
          component: () => import('@/views/feature/BarCode.vue'),
          meta: {
            title: '条形码',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/qrcode'),
          path: '/feature/qrcode',
          component: () => import('@/views/feature/QrCode.vue'),
          meta: {
            title: '二维码',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/image-editor'),
          path: '/feature/image-editor',
          component: () => import('@/views/feature/ImageEditor.vue'),
          meta: {
            title: '图片编辑器',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/encode-decode'),
          path: '/feature/encode-decode',
          component: () => import('@/views/feature/EncodeDecode.vue'),
          meta: {
            title: '编码',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/encrypt-decrypt'),
          path: '/feature/encrypt-decrypt',
          component: () => import('@/views/feature/EncryptDecrypt.vue'),
          meta: {
            title: '密码',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/code-highlight'),
          path: '/feature/code-highlight',
          component: () => import('@/views/feature/CodeHighlight.vue'),
          meta: {
            title: '代码高亮',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/geo-position'),
          path: '/feature/geo-position',
          component: () => import('@/views/feature/GeographicalPosition.vue'),
          meta: {
            title: '地理位置',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/camera-record'),
          path: '/feature/camera-record',
          component: () => import('@/views/feature/RecordCamera.vue'),
          meta: {
            title: '视频录制',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/screen-record'),
          path: '/feature/screen-record',
          component: () => import('@/views/feature/RecordScreen.vue'),
          meta: {
            title: '屏幕录制',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/web-rtc'),
          path: '/feature/web-rtc',
          component: () => import('@/views/feature/WebRTC.vue'),
          meta: {
            title: '网络实时通信',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/eye-dropper'),
          path: '/feature/eye-dropper',
          component: () => import('@/views/feature/EyeDropper.vue'),
          meta: {
            title: '吸管工具',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/notification'),
          path: '/feature/notification',
          component: () => import('@/views/feature/WebNotification.vue'),
          meta: {
            title: '通知',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/vibrate'),
          path: '/feature/vibrate',
          component: () => import('@/views/feature/WebVibrate.vue'),
          meta: {
            title: '振动',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/clipboard'),
          path: '/feature/clipboard',
          component: () => import('@/views/feature/WebClipboard.vue'),
          meta: {
            title: '剪切板',
            isView: true,
          },
        },
        {
          name: Symbol('/feature/broadcast-channel'),
          path: '/feature/broadcast-channel',
          component: () => import('@/views/feature/BroadcastChannel.vue'),
          meta: {
            title: '广播频道',
            isView: true,
          },
        },
      ],
    },

    // 异常
    {
      name: Symbol('/error'),
      path: '/error',
      meta: {
        title: '异常',
        isView: false,
      },
      children: [
        {
          name: Symbol('/error/403'),
          path: '/error/403',
          component: () => import('@/views/error/PermissionDenied.vue'),
          meta: {
            title: '403',
            isView: true,
          },
        },
        {
          name: Symbol('/error/404'),
          path: '/error/404',
          component: () => import('@/views/error/NotFound.vue'),
          meta: {
            title: '404',
            isView: true,
          },
        },
      ],
    },

    // 链接
    {
      name: Symbol('/link'),
      path: '/link',
      meta: {
        title: '链接',
        isView: false,
      },
      children: [
        {
          name: Symbol('/link/:to'),
          path: '/link/:to',
          component: () => import('@/views/link/LinkPage.vue'),
          meta: {
            title: '链接',
            isView: true,
          },
        },
      ],
    },

    // 关于
    {
      name: Symbol('/about'),
      path: '/about',
      component: () => import('@/views/AboutPage.vue'),
      meta: {
        title: '关于',
        isView: true,
      },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition !== null) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  },
})

router.beforeEach((to) => {
  // 检测是否为外链（非内链）
  if (to.path.includes('https://')) {
    openNewPageInNewTab(to.path.slice(1))
    return false
  }

  // 自动修改 tabsStore 内的 tabs 数据
  useTabsStore().$patch((state) => {
    if (state.tabs.findIndex((v) => v.path === to.path) === -1) {
      state.tabs.push({
        name: to.meta.title,
        path: to.path,
        isView: to.meta.isView,
      })
    }
    state.currentTab = to.path
  })

  // 自动更新 pagesStore 内的 pages 数据
  usePagesStore().$patch((state) => {
    state.pages = to.matched.map((v) => ({
      name: v.meta.title,
      path: v.path,
    }))
    if (to.path !== '/') {
      state.pages.unshift({
        name: '首页',
        path: '/',
      })
    }
  })
})

export default router
