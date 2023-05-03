interface NavigatorWithMemory extends Navigator {
  deviceMemory: number
}

/**
 * 获取浏览器及平台信息方法
 * @returns 浏览器及平台信息
 */
export const generateBrowserInfo = (): {
  /** 系统 */
  system: string
  /** 系统版本 */
  systemVs: string
  /** 平台 */
  platform: string
  /** 内核 */
  engine: string
  /** 内核版本 */
  engineVs: string
  /** 载体 */
  supporter: string
  /** 载体版本 */
  supporterVs: string
  /** 外壳 */
  shell: string
  /** 外壳版本 */
  shellVs: string
  /** Cookie 启用状态 */
  cookie: boolean
  /** PDF 预览支持情况 */
  pdf: boolean
  /** 内存大小 */
  memory: number
  /** 逻辑处理器数 */
  processors: number
  /** 最大支持触摸点数 */
  touchPoints: number
} => {
  const userAgent = navigator.userAgent.toLowerCase()

  // 系统
  const system =
    new Map([
      [/windows|win32|win64|wow32|wow64/g.test(userAgent), 'windows'], // windows系统
      [/macintosh|macintel/g.test(userAgent), 'macos'], // macos系统
      [/x11/g.test(userAgent), 'linux'], // linux系统
      [/android|adr/g.test(userAgent), 'android'], // android系统
      [/ios|iphone|ipad|ipod|iwatch/g.test(userAgent), 'ios'], // ios系统
    ]).get(true) ?? 'unknown'

  // 系统版本
  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [/windows nt 5.0|windows 2000/g.test(userAgent), '2000'],
          [/windows nt 5.1|windows xp/g.test(userAgent), 'xp'],
          [/windows nt 5.2|windows 2003/g.test(userAgent), '2003'],
          [/windows nt 6.0|windows vista/g.test(userAgent), 'vista'],
          [/windows nt 6.1|windows 7/g.test(userAgent), '7'],
          [/windows nt 6.2|windows 8/g.test(userAgent), '8'],
          [/windows nt 6.3|windows 8.1/g.test(userAgent), '8.1'],
          [/windows nt 10.0|windows 10/g.test(userAgent), '10'],
        ]).get(true),
      ],
      [
        'macos',
        userAgent
          .match(/os x [\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'android',
        userAgent
          .match(/android [\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'ios',
        userAgent
          .match(/os [\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ]).get(system) ?? 'unknown'

  // 平台
  const platform = ['windows', 'macos', 'linux'].includes(system) ? 'desktop' : ['android', 'ios'].includes(system) || /mobile/g.test(userAgent) ? 'mobile' : 'unknown'

  // 内核和载体
  const [engine = 'unknown', supporter = 'unknown'] = new Map([
    [
      /applewebkit/g.test(userAgent),
      [
        'webkit',
        new Map([
          // webkit内核
          [/safari/g.test(userAgent), 'safari'], // safari浏览器
          [/chrome/g.test(userAgent), 'chrome'], // chrome浏览器
          [/opr/g.test(userAgent), 'opera'], // opera浏览器
          [/edge/g.test(userAgent), 'edge'], // edge浏览器
        ]).get(true),
      ] ?? 'unknown',
    ], // [webkit内核, xxx浏览器]
    [/gecko/g.test(userAgent) && /firefox/g.test(userAgent), ['gecko', 'firefox']], // [gecko内核,firefox浏览器]
    [/presto/g.test(userAgent), ['presto', 'opera']], // [presto内核,opera浏览器]
    [/trident|compatible|msie/g.test(userAgent), ['trident', 'iexplore']], // [trident内核,iexplore浏览器]
  ]).get(true) ?? ['unknown', 'unknown']

  // 内核版本
  const engineVs =
    new Map([
      [
        'webkit',
        userAgent
          .match(/applewebkit\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'gecko',
        userAgent
          .match(/gecko\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'presto',
        userAgent
          .match(/presto\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'trident',
        userAgent
          .match(/trident\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ]).get(engine) ?? 'unknown'

  // 载体版本
  const supporterVs =
    new Map([
      [
        'firefox',
        userAgent
          .match(/firefox\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'opera',
        userAgent
          .match(/opr\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'iexplore',
        userAgent
          .match(/(msie [\d._]+)|(rv:[\d._]+)/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'edge',
        userAgent
          .match(/edge\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'safari',
        userAgent
          .match(/version\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'chrome',
        userAgent
          .match(/chrome\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ]).get(supporter) ?? 'unknown'

  // 外壳和外壳版本
  const [shell = 'unknown', shellVs = 'unknown'] = new Map([
    [
      /micromessenger/g.test(userAgent),
      [
        'wechat',
        userAgent
          .match(/micromessenger\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [微信浏览器,]
    [
      /qqbrowser/g.test(userAgent),
      [
        'qq',
        userAgent
          .match(/qqbrowser\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [QQ浏览器,]
    [
      /ucbrowser/g.test(userAgent),
      [
        'uc',
        userAgent
          .match(/ucbrowser\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [UC浏览器,]
    [/qihu 360se/g.test(userAgent), ['360', 'unknown']], // [360浏览器(无版本),]
    [
      /2345explorer/g.test(userAgent),
      [
        '2345',
        userAgent
          .match(/2345explorer\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [2345浏览器,]
    [/metasr/g.test(userAgent), ['sougou', 'unknown']], // [搜狗浏览器(无版本),]
    [/lbbrowser/g.test(userAgent), ['liebao', 'unknown']], // [猎豹浏览器(无版本),]
    [
      /maxthon/g.test(userAgent),
      [
        'maxthon',
        userAgent
          .match(/maxthon\/[\d._]+/g)
          ?.toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [遨游浏览器,]
  ]).get(true) ?? ['unknown', 'unknown']

  // Cookie 启用状态
  const cookie = navigator.cookieEnabled

  // PDF 预览支持情况
  const pdf = navigator.pdfViewerEnabled

  // 内存大小
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 0

  // 逻辑处理器数
  const processors = navigator.hardwareConcurrency

  // 最大支持触摸点数
  const touchPoints = navigator.maxTouchPoints

  return {
    system,
    systemVs,
    platform,
    engine,
    engineVs,
    supporter,
    supporterVs,
    shell,
    shellVs,
    cookie,
    pdf,
    memory,
    processors,
    touchPoints,
  }
}
