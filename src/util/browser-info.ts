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
  /** 是否安全上下文 */
  isSecureContext: boolean
} => {
  const userAgent = navigator.userAgent.toLowerCase()

  // 系统
  const system =
    new Map([
      [/windows|win32|win64|wow32|wow64/.test(userAgent), 'windows'], // windows系统
      [/macintosh|macintel/.test(userAgent), 'macos'], // macos系统
      [userAgent.includes('x11'), 'linux'], // linux系统
      [/android|adr/.test(userAgent), 'android'], // android系统
      [/ios|iphone|ipad|ipod|iwatch/.test(userAgent), 'ios'], // ios系统
    ]).get(true) ?? 'unknown'

  // 系统版本
  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [/windows nt 5.0|windows 2000/.test(userAgent), '2000'],
          [/windows nt 5.1|windows xp/.test(userAgent), 'xp'],
          [/windows nt 5.2|windows 2003/.test(userAgent), '2003'],
          [/windows nt 6.0|windows vista/.test(userAgent), 'vista'],
          [/windows nt 6.1|windows 7/.test(userAgent), '7'],
          [/windows nt 6.2|windows 8/.test(userAgent), '8'],
          [/windows nt 6.3|windows 8.1/.test(userAgent), '8.1'],
          [/windows nt 10.0|windows 10/.test(userAgent), '10'],
        ]).get(true),
      ],
      [
        'macos',
        userAgent
          .match(/os x [\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'android',
        userAgent
          .match(/android [\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'ios',
        userAgent
          .match(/os [\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ]).get(system) ?? 'unknown'

  // 平台
  const platform = ['windows', 'macos', 'linux'].includes(system) ? 'desktop' : ['android', 'ios'].includes(system) || userAgent.includes('mobile') ? 'mobile' : 'unknown'

  // 内核和载体
  const [engine = 'unknown', supporter = 'unknown'] = new Map([
    [
      userAgent.includes('applewebkit'),
      [
        'webkit',
        new Map([
          // webkit内核
          [userAgent.includes('safari'), 'safari'], // safari浏览器
          [userAgent.includes('chrome'), 'chrome'], // chrome浏览器
          [userAgent.includes('opr'), 'opera'], // opera浏览器
          [userAgent.includes('edge'), 'edge'], // edge浏览器
        ]).get(true),
      ] ?? 'unknown',
    ], // [webkit内核, xxx浏览器]
    [userAgent.includes('gecko') && userAgent.includes('firefox'), ['gecko', 'firefox']], // [gecko内核,firefox浏览器]
    [userAgent.includes('presto'), ['presto', 'opera']], // [presto内核,opera浏览器]
    [/trident|compatible|msie/.test(userAgent), ['trident', 'iexplore']], // [trident内核,iexplore浏览器]
  ]).get(true) ?? ['unknown', 'unknown']

  // 内核版本
  const engineVs =
    new Map([
      [
        'webkit',
        userAgent
          .match(/applewebkit\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'gecko',
        userAgent
          .match(/gecko\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'presto',
        userAgent
          .match(/presto\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'trident',
        userAgent
          .match(/trident\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
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
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'opera',
        userAgent
          .match(/opr\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'iexplore',
        userAgent
          .match(/msie [\d._]+|rv:[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'edge',
        userAgent
          .match(/edge\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'safari',
        userAgent
          .match(/version\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
      [
        'chrome',
        userAgent
          .match(/chrome\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ]).get(supporter) ?? 'unknown'

  // 外壳和外壳版本
  const [shell = 'unknown', shellVs = 'unknown'] = new Map([
    [
      userAgent.includes('micromessenger'),
      [
        'wechat',
        userAgent
          .match(/micromessenger\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [微信浏览器,]
    [
      userAgent.includes('qqbrowser'),
      [
        'qq',
        userAgent
          .match(/qqbrowser\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [QQ浏览器,]
    [
      userAgent.includes('ucbrowser'),
      [
        'uc',
        userAgent
          .match(/ucbrowser\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [UC浏览器,]
    [userAgent.includes('qihu 360se'), ['360', 'unknown']], // [360浏览器(无版本),]
    [
      userAgent.includes('2345explorer'),
      [
        '2345',
        userAgent
          .match(/2345explorer\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
          .replace(/_/g, '.'),
      ],
    ], // [2345浏览器,]
    [userAgent.includes('metasr'), ['sougou', 'unknown']], // [搜狗浏览器(无版本),]
    [userAgent.includes('lbbrowser'), ['liebao', 'unknown']], // [猎豹浏览器(无版本),]
    [
      userAgent.includes('maxthon'),
      [
        'maxthon',
        userAgent
          .match(/maxthon\/[\d._]+/g)
          ?.toString()
          .replace(/[^\d|_.]/g, '')
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

  // 是否安全上下文
  const isSecureContext = window.isSecureContext

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
    isSecureContext,
  }
}
