export default {
  home: {
    enabled: '启用',
    disabled: '未启用',
    supported: '支持',
    unsupported: '不支持',
    yes: '是',
    no: '否',
    system: {
      title: '系统信息',
      system: '系统',
      systemVs: '系统版本',
      platform: '平台',
      engine: '内核',
      engineVs: '内核版本',
      supporter: '载体',
      supporterVs: '载体版本',
      shell: '外壳',
      shellVs: '外壳版本',
      processor: '逻辑处理器数',
      memory: '内存大小',
      touchPoint: '最大支持触摸点数',
      isSecureContext: '安全上下文',
      cookie: 'Cookie 状态',
      pdf: 'PDF 预览功能支持情况',
      timestamp: '当前时间戳',
    },
    browser: {
      title: '浏览器信息',
      locationbar: '地址栏可见性',
      menubar: '菜单栏可见性',
      personalbar: '用户界面可见性',
      scrollbars: '滚动条可见性',
      statusbar: '状态栏可见性',
      toolbar: '工具栏可见性',
    },
    website: {
      title: '网站信息',
      href: 'URL',
      protocol: '协议',
      hostname: '域名',
      port: '端口',
      pathname: '路径',
      hash: '哈希值',
    },
    document: {
      title: '文档信息',
      activeElement: '聚焦元素',
      readyState: '加载状态',
      visibility: '可见状态',
    },
    screen: {
      title: '屏幕信息',
      height: '屏幕高度',
      width: '屏幕宽度',
      availHeight: '屏幕可用高度',
      availWidth: '屏幕可用宽度',
      colorDepth: '屏幕颜色深度',
      pixelDepth: '屏幕位深度',
      type: '屏幕方向',
      angel: '屏幕角度',
    },
    network: {
      title: '网络信息',
      net: '网络情况',
      online: '在线',
      offline: '离线',
      type: '网络类型',
      effectiveType: '网络有效类型',
      downlink: '网络带宽',
      downlinkMax: '网络最大带宽',
      rtt: '网络往返时延',
    },
    battery: {
      title: '电池信息',
      charge: '电池充电状态',
      charging: '充电中',
      discharging: '未充电',
      chargingTime: '电池充电时间',
      dischargingTime: '电池续航时间',
      level: '电池电量',
    },
    author: {
      title: '作者信息',
      name: '名称',
      email: '邮箱',
      website: '个人网站',
    },
  },
  table: {
    search: {
      name_label: '名称',
      name_placeholder: '请输入文章名称',
      search: '搜索',
      add: '添加',
      export: '导出',
    },
    table: {
      id: '序号',
      title: '标题',
      author: '作者',
      country: '国家',
      reviewer: '审核人',
      time: '发布时间',
      read: '阅读数',
      star: '星级',
      status: '状态',
      status_drafted: '草稿箱',
      status_published: '已发布',
      operate: '操作',
      operate_edit: '编辑',
      operate_published: '发布',
      operate_drafted: '草稿',
      operate_delete: '删除',
    },
  },
  form: {
    basic: {
      name: '姓名',
      name_placeholder: '请填写姓名',
      sex: '性别',
      sex_male: '男',
      sex_female: '女',
      age: '年龄',
      age_placeholder: '请填写年龄',
      area: '地区',
      area_placeholder: '请选择所在地区',
      area_beijing: '北京',
      area_shanghai: '上海',
      date_time: '日期时间',
      date: '日期',
      date_placeholder: '请选择日期',
      time: '时间',
      time_placeholder: '请选择时间',
      rate: '星级',
      score: '分数',
      choice: '选项',
      choice_service: '服务到位',
      choice_device: '设备良好',
      choice_environment: '环境优异',
      private: '保密',
      color: '颜色',
      note: '备注',
      note_placeholder: '请填写备注',
    },
  },
  feature: {
    barcode: {
      base: '基础条形码',
      size: '条形码大小',
      style: '条形码样式',
    },
    qrcode: {
      base: '基础二维码',
      image: '图片二维码',
      size: '二维码大小',
      style: '二维码样式',
    },
    crypto: {
      title: '密码',
      raw_placeholder: '请输入待加密的原文',
      type: '类型',
      type_placeholder: '请选择密码类型',
      mode: '模式',
      mode_placeholder: '请选择密码模式',
      pad: '填充方案',
      pad_placeholder: '请选择密码填充方案',
      encrypt: '加密',
      decrypt: '解密',
      cipher_placeholder: '请输入待解密的密文',
    },
    encode: {
      title: '编码与解码',
      raw_placeholder: '请输入待编码的原文',
      type: '编码类型',
      type_placeholder: '请选择编码类型',
      encode: '编码',
      decode: '解码',
      cipher_placeholder: '请输入待解码的密文',
    },
    hash: {
      title: '哈希',
      raw_placeholder: '请输入待计算哈希的原文',
      type: '哈希类型',
      type_placeholder: '请选择哈希类型',
      encode: '编码方式',
      encode_placeholder: '请选择编码方式',
      operate: '计算',
      cipher_placeholder: '点击计算以显示原文哈希值',
    },
    hmac: {
      title: '密钥哈希',
      raw_placeholder: '请输入待计算哈希的原文',
      key_placeholder: '请输入密钥',
      type: '哈希类型',
      type_placeholder: '请选择密钥哈希类型',
      encode: '编码方式',
      encode_placeholder: '请选择编码方式',
      operate: '计算',
      cipher_placeholder: '点击计算以显示原文哈希值',
    },
    pbkdf2: {
      title: 'PBKDF2',
      raw_placeholder: '请输入待计算值的原文',
      salt_placeholder: '请先生成盐值',
      type: '计算类型',
      type_placeholder: '请选择密钥计算类型',
      encode: '编码方式',
      encode_placeholder: '请选择编码方式',
      salt: '生成盐值',
      operate: '计算',
      cipher_placeholder: '点击计算按钮以显示计算值',
    },
    geo: {
      longitude: '经度',
      latitude: '纬度',
      accuracy: '经纬度精度',
      altitude: '高度',
      altitudeAccuracy: '高度精度',
      heading: '设备朝向',
      speed: '速度',
    },
    open: '开启',
    close: '关闭',
    screenshot: '截图',
    open_record: '开始录制',
    pause_record: '暂停录制',
    resume_record: '继续录制',
    stop_record: '结束录制',
    initialization: '初始化',
    create_offer: '创建 Offer',
    create_answer: '创建 Answer',
    add_answer: '添加 Answer',
  },
  error: {
    403: '抱歉，你无权访问该页面',
    404: '抱歉，你访问的页面不存在',
    redirect: '返回首页',
  },
  about: {
    title: '关于',
    project: {
      title: '项目信息',
      name: '名称',
      version: '版本',
      license: '许可证',
      author: '作者',
      'build-time': '构建时间',
      github: 'GitHub',
    },
    dependencies: '生产环境依赖',
    devDependencies: '开发环境依赖',
  },
  layout: {
    setting: {
      title: '设置',
      theme: '主题',
      i18n: '语言',
      gray_mode: '灰色模式',
      color_weakness: '色弱模式',
      wake_lock: '电源锁',
    },
  },
  router: {
    '/': '首页',
    '/table': '表格',
    '/table/base': '基础表格',
    '/form': '表单',
    '/form/base': '基础表单',
    '/component': '组件',
    '/component/icon': '图标组件',
    '/component/terminal': 'Web 终端',
    '/component/draggable': '拖拽组件',
    '/component/scalable': '缩放组件',
    '/component/rotatable': '旋转组件',
    '/component/rich-text-editor': '富文本编辑器',
    '/component/markdown-editor': 'Markdown 编辑器',
    '/chart': '图表',
    '/chart/bar': '柱状图',
    '/chart/line': '折线图',
    '/chart/pie': '饼图',
    '/chart/scatter': '散点图',
    '/route': '菜单',
    '/route/1': '菜单-1',
    '/route/2': '菜单-2',
    '/route/2/1': '菜单-2-1',
    '/route/2/2': '菜单-2-2',
    '/route/2/2/1': '菜单-2-2-1',
    '/route/2/2/2': '菜单-2-2-2',
    '/route/2/2/3': '菜单-2-2-3',
    '/route/2/3': '菜单-2-3',
    '/route/3': '菜单-3',
    '/docs': '文档',
    '/docs/word-preview': 'Word 预览',
    '/docs/excel-preview': 'Excel 预览',
    '/docs/ppt-preview': 'PPT 预览',
    '/docs/pdf-preview': 'PDF 预览',
    '/feature': '功能',
    '/feature/bar-code': '条形码',
    '/feature/qrcode': '二维码',
    '/feature/image-editor': '图片编辑器',
    '/feature/encode-decode': '编码',
    '/feature/encrypt-decrypt': '密码',
    '/feature/code-highlight': '代码高亮',
    '/feature/image-compress': '图片压缩',
    '/feature/geo-position': '地理位置',
    '/feature/camera-record': '视频录制',
    '/feature/screen-record': '屏幕录制',
    '/feature/web-rtc': '网络实时通信',
    '/feature/eye-dropper': '吸管工具',
    '/feature/notification': '通知',
    '/feature/vibrate': '振动',
    '/feature/clipboard': '剪切板',
    '/feature/broadcast-channel': '广播频道',
    '/error': '异常',
    '/error/403': '403',
    '/error/404': '404',
    '/link': '链接',
    '/link/github': 'GitHub (外链)',
    '/link/juejin': '掘金 (外链)',
    '/link/vite': 'Vite (内链)',
    '/link/vue': 'Vue (内链)',
    '/link/:to': '内链',
    '/link/https%3A%2F%2Fcn': {
      vitejs: {
        'dev%2F': 'Vite',
      },
      vuejs: {
        'org%2F': 'Vue',
      },
    },
    '/about': '关于',
  },
}
