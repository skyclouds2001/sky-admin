export default {
  confirm: '确认',
  cancel: '取消',
  warning: '警告',
  login: {
    login: '登录',
    username: '用户名',
    password: '密码',
    check_username: '请输入用户名',
    check_password: '请输入密码',
    check_info: '请检查登录信息',
    success: '登录成功',
    fail: '登录失败',
  },
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
      crossOriginIsolated: '跨域隔离状态',
      cookie: 'Cookie 状态',
      pdf: 'PDF 预览功能支持情况',
      ip: 'IP 地址',
      timestamp: '当前时间戳',
    },
    server: {
      title: '服务器信息',
      hostname: '操作系统主机名',
      type: '操作系统名称',
      release: '操作系统版本',
      machine: '机器类型',
      username: '用户名称',
      uptime: '系统运行时间',
      version: '操作系统内核版本',
      totalmem: '系统内存总量',
      freemem: '系统可用内存量',
      nodeUptime: '服务运行时间',
      nodeVersion: '服务运行环境',
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
      title: '标题',
      author: '作者',
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
      description: '描述',
      create_time: '创建时间',
      update_time: '更新时间',
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
    header: {
      'confirm-exit-login': '确认退出登录',
      'cancel-exit-login': '取消退出登录',
      'pointer-lock': '指针锁定',
      print: '打印',
      fullscreen: '全屏',
      share: '分享',
      settings: '设置',
      about: '关于',
      exit_login: '退出',
    },
  },
  router: {
    login: '登录',
    home: '首页',
    table: {
      title: '表格',
      base: '基础表格',
    },
    form: {
      title: '表单',
      base: '基础表单',
    },
    component: {
      title: '组件',
      icon: '图标组件',
      terminal: 'Web 终端',
      draggable: '拖拽组件',
      scalable: '缩放组件',
      rotatable: '旋转组件',
      'rich-text-editor': '富文本编辑器',
      'markdown-editor': 'Markdown 编辑器',
    },
    chart: {
      title: '图表',
      bar: '柱状图',
      line: '折线图',
      pie: '饼图',
      scatter: '散点图',
      candlestick: 'K 线图',
      radar: '雷达图',
    },
    route: (args: Record<'list', (index: number) => number[] | undefined>) => {
      const data = args.list(0)
      return '菜单' + (data !== undefined ? '-' + data.join('-') : '')
    },
    docs: {
      title: '文档',
      'word-preview': 'Word 预览',
      'excel-preview': 'Excel 预览',
      'ppt-preview': 'PPT 预览',
      'pdf-preview': 'PDF 预览',
    },
    feature: {
      title: '功能',
      'bar-code': '条形码',
      qrcode: '二维码',
      'image-editor': '图片编辑器',
      'encode-decode': '编解码',
      'encrypt-decrypt': '加解密',
      'code-highlight': '代码高亮',
      'image-compress': '图片压缩',
      'geo-position': '地理位置',
      'camera-record': '视频录制',
      'screen-record': '屏幕录制',
      'web-rtc': 'WebRTC',
      'animation-effect': '动画',
      'eye-dropper': '吸管工具',
      notification: '通知',
      vibrate: '振动',
      clipboard: '剪切板',
      'broadcast-channel': '广播频道',
    },
    '3d': {
      title: '3D',
      basis: '基础3D',
      geometry: '基础图元',
      material: '基础材质',
      camera: '基础摄像机',
      helper: '基础帮手',
      exporter: '基础导出器',
      'rotation-circle': '旋转圆圈',
      'earth-moon': '地月系',
      'periodic-table': '元素周期表',
      'sprite-ball': '精灵球',
      'video-box': '视频盒子',
      'mirror-text': '文字镜像',
      'colorful-geometry': '彩色物体',
      'toon-geometry': '卡通物体',
      'light-map': '光线纹理',
      'plaster-figure': '石膏人像',
      'rect-area': '矩形光源',
      'angel-statue': '天使雕像',
      'physical-modal': '物理模型',
      'logarithmic-depth-buffer': '对数缓冲',
      'singleton-animation': '单例动画',
      'group-animation': '多例动画',
      'curve-modifier': '曲线修改',
      'edge-split-modifier': '边缘分割',
      'simplify-modifier': '物体简化',
      'sub-divider-modifier': '物体细分',
      'ocean-sky': '天空海洋',
      'refractor-plane': '折射平面',
      'reflector-mirror': '反射镜面',
      'look-at': '物品朝向',
      'selection-box': '物体选择',
      'lod-wireframe': '层次框架',
    },
    monitor: {
      title: '系统监控',
      performance: '系统性能',
    },
    error: {
      title: '异常',
      403: '403',
      404: '404',
    },
    link: {
      title: '链接',
      external: '外链',
      internal: '内链',
      github: 'GitHub',
      blog: '博客',
      juejin: '掘金',
      vite: 'Vite',
      vue: 'Vue',
    },
    about: '关于',
  },
}
