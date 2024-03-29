import { INDEX_ROUTE } from '@/config'
import { LayoutContainer } from '@/layout'
import { usePagesStore, useTabsStore } from '@/store'
import { openPage } from '@/util'
import { useStorage } from '@sky-fly/sky-hooks'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 登录页
    {
      name: Symbol('/login'),
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
      meta: {
        isView: true,
      },
    },

    {
      name: Symbol('/'),
      path: '/',
      redirect: '/home',
      component: LayoutContainer,
      meta: {
        isView: false,
      },
      children: [
        // 首页
        {
          name: Symbol('/home'),
          path: '/home',
          component: () => import('@/views/HomePage.vue'),
          meta: {
            isView: true,
          },
        },

        // 表格
        {
          name: Symbol('/table'),
          path: '/table',
          meta: {
            isView: false,
          },
          children: [
            {
              name: Symbol('/table/base'),
              path: '/table/base',
              component: () => import('@/views/table/BaseTable.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/form/base'),
              path: '/form/base',
              component: () => import('@/views/form/BaseForm.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/component/icon'),
              path: '/component/icon',
              component: () => import('@/views/component/IconList.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/component/terminal'),
              path: '/component/terminal',
              component: () => import('@/views/component/WebTerminal.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/component/controllable'),
              path: '/component/controllable',
              component: () => import('@/views/component/ControllableComponent.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/component/rich-text-editor'),
              path: '/component/rich-text-editor',
              component: () => import('@/views/component/RichTextEditor.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/component/markdown-editor'),
              path: '/component/markdown-editor',
              component: () => import('@/views/component/MarkdownEditor.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/chart/bar'),
              path: '/chart/bar',
              component: () => import('@/views/chart/BarChart.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/chart/line'),
              path: '/chart/line',
              component: () => import('@/views/chart/LineChart.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/chart/pie'),
              path: '/chart/pie',
              component: () => import('@/views/chart/PieChart.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/chart/scatter'),
              path: '/chart/scatter',
              component: () => import('@/views/chart/ScatterChart.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/chart/candlestick'),
              path: '/chart/candlestick',
              component: () => import('@/views/chart/CandlestickChart.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/chart/radar'),
              path: '/chart/radar',
              component: () => import('@/views/chart/RadarChart.vue'),
              meta: {
                isView: true,
              },
            },
          ],
        },

        // 地图
        {
          name: Symbol('/map'),
          path: '/map',
          meta: {
            isView: false,
          },
          children: [
            {
              name: Symbol('/map/3d-earth'),
              path: '/map/3d-earth',
              component: () => import('@/views/map/3dEarth.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/route/1'),
              path: '/route/1',
              component: () => import('@/views/route/RouteFirst.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/route/2'),
              path: '/route/2',
              component: () => import('@/views/route/RouteSecond.vue'),
              meta: {
                isView: true,
              },
              children: [
                {
                  name: Symbol('/route/2/1'),
                  path: '/route/2/1',
                  component: () => import('@/views/route/RouteSecondFirst.vue'),
                  meta: {
                    isView: true,
                  },
                },
                {
                  name: Symbol('/route/2/2'),
                  path: '/route/2/2',
                  component: () => import('@/views/route/RouteSecondSecond.vue'),
                  meta: {
                    isView: true,
                  },
                  children: [
                    {
                      name: Symbol('/route/2/2/1'),
                      path: '/route/2/2/1',
                      component: () => import('@/views/route/RouteSecondSecondFirst.vue'),
                      meta: {
                        isView: true,
                      },
                    },
                    {
                      name: Symbol('/route/2/2/2'),
                      path: '/route/2/2/2',
                      component: () => import('@/views/route/RouteSecondSecondSecond.vue'),
                      meta: {
                        isView: true,
                      },
                    },
                    {
                      name: Symbol('/route/2/2/3'),
                      path: '/route/2/2/3',
                      component: () => import('@/views/route/RouteSecondSecondThird.vue'),
                      meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/docs/word-preview'),
              path: '/docs/word-preview',
              component: () => import('@/views/docs/WordPreview.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/docs/excel-preview'),
              path: '/docs/excel-preview',
              component: () => import('@/views/docs/ExcelPreview.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/docs/ppt-preview'),
              path: '/docs/ppt-preview',
              component: () => import('@/views/docs/PPTPreview.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/docs/pdf-preview'),
              path: '/docs/pdf-preview',
              component: () => import('@/views/docs/PDFPreview.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/feature/bar-code'),
              path: '/feature/bar-code',
              component: () => import('@/views/feature/BarCode.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/qrcode'),
              path: '/feature/qrcode',
              component: () => import('@/views/feature/QrCode.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/image-editor'),
              path: '/feature/image-editor',
              component: () => import('@/views/feature/ImageEditor.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/encode-decode'),
              path: '/feature/encode-decode',
              component: () => import('@/views/feature/EncodeDecode.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/encrypt-decrypt'),
              path: '/feature/encrypt-decrypt',
              component: () => import('@/views/feature/EncryptDecrypt.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/code-highlight'),
              path: '/feature/code-highlight',
              component: () => import('@/views/feature/CodeHighlight.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/image-compress'),
              path: '/feature/image-compress',
              component: () => import('@/views/feature/ImageCompress.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/camera-record'),
              path: '/feature/camera-record',
              component: () => import('@/views/feature/RecordCamera.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/screen-record'),
              path: '/feature/screen-record',
              component: () => import('@/views/feature/RecordScreen.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/feature/animation-effect'),
              path: '/feature/animation-effect',
              component: () => import('@/views/feature/AnimationEffect.vue'),
              meta: {
                isView: true,
              },
            },
          ],
        },

        // 系统监控
        {
          name: Symbol('/monitor'),
          path: '/monitor',
          meta: {
            isView: false,
          },
          children: [],
        },

        // 系统管理
        {
          name: Symbol('/system'),
          path: '/system',
          meta: {
            isView: false,
          },
          children: [
            {
              name: Symbol('/system/department'),
              path: '/system/department',
              component: () => import('@/views/system/DepartmentManage.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/system/role'),
              path: '/system/role',
              component: () => import('@/views/system/RoleManage.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/system/user'),
              path: '/system/user',
              component: () => import('@/views/system/UserManage.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/error/403'),
              path: '/error/403',
              component: () => import('@/views/error/PermissionDenied.vue'),
              meta: {
                isView: true,
              },
            },
            {
              name: Symbol('/error/404'),
              path: '/error/404',
              component: () => import('@/views/error/NotFound.vue'),
              meta: {
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
            isView: false,
          },
          children: [
            {
              name: Symbol('/link/:to'),
              path: '/link/:to/:mode',
              component: () => import('@/views/link/LinkPage.vue'),
              meta: {
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
            isView: true,
          },
        },
      ],
    },

    // 默认回退页
    {
      name: Symbol('*'),
      path: '/:catchAll(.*)',
      redirect: '/error/404',
      meta: {
        isView: false,
      },
    },
  ],

  scrollBehavior: (_to, _from, savedPosition) => {
    return (
      savedPosition ?? {
        top: 0,
        left: 0,
        behavior: 'smooth',
      }
    )
  },
})

const storage = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

router.beforeEach((to) => {
  // 检测是否为外链（非内链），若是外链则跳转打开新页面
  if (to.path.includes('/link') && to.params.mode === 'external') {
    openPage(decodeURIComponent(to.path.slice(1).split('/')[1]))
    return false
  }

  // 检测是否已登录
  if (to.path !== '/login' && storage.value === null) {
    return {
      path: '/login',
    }
  }

  return true
})

router.afterEach((to) => {
  // 登录页不执行 tab 和 page 操作
  if (to.path === '/login') return

  // 更新 tabsStore 内的 tabs 数据
  useTabsStore().$patch((state) => {
    if (state.tabs.findIndex((v) => v.path === to.path) === -1) {
      state.tabs.push({
        path: to.path,
        isView: to.meta.isView,
      })
    }
    if (state.tabs.findIndex((v) => v.path === INDEX_ROUTE) === -1) {
      state.tabs.unshift({
        path: INDEX_ROUTE,
        isView: true,
      })
    }
    state.currentTab = to.path
  })

  // 更新 pagesStore 内的 pages 数据
  usePagesStore().$patch((state) => {
    state.pages = to.matched
      .map((v) => ({
        path: v.path,
        isView: v.meta.isView,
      }))
      .filter((v) => v.path !== '/')
    if (to.path !== INDEX_ROUTE) {
      state.pages.unshift({
        path: INDEX_ROUTE,
        isView: true,
      })
    }
  })
})

export default router
