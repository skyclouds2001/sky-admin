export default {
  home: {
    enabled: 'Enabled',
    disabled: 'Disabled',
    supported: 'Supported',
    unsupported: 'Unsupported',
    yes: 'yes',
    no: 'no',
    system: {
      title: 'System Info',
      system: 'System',
      systemVs: 'System Version',
      platform: 'Platform',
      engine: 'Engine',
      engineVs: 'Engine Version',
      supporter: 'Supporter',
      supporterVs: 'Supporter Version',
      shell: 'Shell',
      shellVs: 'Shell Version',
      processor: 'Logical Processors Number',
      memory: 'Memory Size',
      touchPoint: 'Maximum Number of Touch Points',
      isSecureContext: 'Secure Context',
      cookie: 'Cookie Status',
      pdf: 'PDF Preview Feature Support',
      timestamp: 'Current Timestamp',
    },
    browser: {
      title: 'Browser Info',
      locationbar: 'Locationbar Visibility',
      menubar: 'Menubar Visibility',
      personalbar: 'Personalbar Visibility',
      scrollbars: 'Scrollbars Visibility',
      statusbar: 'Statusbar Visibility',
      toolbar: 'Toolbar Visibility',
    },
    website: {
      title: 'Website Info',
      href: 'URL',
      protocol: 'Protocol',
      hostname: 'Hostname',
      port: 'Port',
      pathname: 'Pathname',
      hash: 'Hash',
    },
    document: {
      title: 'Document Info',
      activeElement: 'Active Element',
      readyState: 'Ready State',
      visibility: 'Visibility',
    },
    screen: {
      title: 'Screen Info',
      height: 'Screen Height',
      width: 'Screen Width',
      availHeight: 'Screen Available Height',
      availWidth: 'Screen Available Width',
      colorDepth: 'Color Depth',
      pixelDepth: 'Pixel Depth',
      type: 'Screen Orientation Type',
      angel: 'Screen Orientation Angel',
    },
    network: {
      title: 'Network Info',
      net: 'Network Status',
      online: 'Online',
      offline: 'Offline',
      type: 'Network Type',
      effectiveType: 'Network Effective Type',
      downlink: 'Network Bandwidth',
      downlinkMax: 'Network Max Bandwidth',
      rtt: 'RTT',
    },
    battery: {
      title: 'Battery Info',
      charge: 'Battery Status',
      charging: 'Charging',
      discharging: 'DisCharging',
      chargingTime: 'Charging Time',
      dischargingTime: 'DisCharging Time',
      level: 'Battery Level',
    },
    author: {
      title: 'Author Info',
      name: 'Name',
      email: 'Email',
      website: 'Website',
    },
  },
  table: {
    search: {
      name_label: 'Title',
      name_placeholder: 'Please Input Article Title ',
      search: 'Search',
      add: 'Add',
      export: 'Export',
    },
    table: {
      title: 'Title',
      author: 'Author',
      read: 'Read Number',
      star: 'Star',
      status: 'Status',
      status_drafted: 'Drafted',
      status_published: 'Published',
      operate: 'Operate',
      operate_edit: 'Edit',
      operate_published: 'Publish',
      operate_drafted: 'Draft',
      operate_delete: 'Delete',
      description: 'Description',
      create_time: 'Create Time',
      update_time: 'Update Time',
    },
  },
  form: {
    basic: {
      name: 'Name',
      name_placeholder: 'Please input name',
      sex: 'Sex',
      sex_male: 'Male',
      sex_female: 'Female',
      age: 'Age',
      age_placeholder: 'Please input age',
      area: 'Area',
      area_placeholder: 'Please select area',
      area_beijing: 'Beijing',
      area_shanghai: 'Shanghai',
      date_time: 'Date & Time',
      date: 'Date',
      date_placeholder: 'Please select date',
      time: 'Time',
      time_placeholder: 'Please select time',
      rate: 'Rate',
      score: 'Score',
      choice: 'Choice',
      choice_service: 'Great Service',
      choice_device: 'Great Device',
      choice_environment: 'Great Environment',
      private: 'Private',
      color: 'Color',
      note: 'Note',
      note_placeholder: 'Please input note',
    },
  },
  feature: {
    barcode: {
      base: 'Basic Barcode',
      size: 'Barcode Size',
      style: 'Barcode Style',
    },
    qrcode: {
      base: 'Basic QR Code',
      image: 'Image QR Code',
      size: 'QR Code Size',
      style: 'QR Code Style',
    },
    crypto: {
      title: 'Crypto',
      raw_placeholder: 'Please input the raw text',
      type: 'Crypto Type',
      type_placeholder: 'Please select the crypto type',
      mode: 'Mode',
      mode_placeholder: 'Please select the mode',
      pad: 'Padding',
      pad_placeholder: 'Please select the padding',
      encrypt: 'Encrypt',
      decrypt: 'Decrypt',
      cipher_placeholder: 'Please input the encrypted text',
    },
    encode: {
      title: 'Encode and Decode',
      raw_placeholder: 'Please input the raw text',
      type: 'Encode Type',
      type_placeholder: 'Please select the encode type',
      encode: 'Encode',
      decode: 'Decode',
      cipher_placeholder: 'Please input the encoded text',
    },
    hash: {
      title: 'Hash',
      raw_placeholder: 'Please input the raw text',
      type: 'Hash Type',
      type_placeholder: 'Please select the hash type',
      encode: 'Encode Type',
      encode_placeholder: 'Please select the encode type',
      operate: 'Calculate',
      cipher_placeholder: 'Click calculate to see the result',
    },
    hmac: {
      title: 'Key Hash',
      raw_placeholder: 'Please input the raw text',
      key_placeholder: 'Please input the key',
      type: 'Hash Type',
      type_placeholder: 'Please select the key hash type',
      encode: 'Encode Type',
      encode_placeholder: 'Please select the encode type',
      operate: 'Calculate',
      cipher_placeholder: 'Click calculate to see the result',
    },
    pbkdf2: {
      title: 'PBKDF2',
      raw_placeholder: 'Please input the raw text',
      salt_placeholder: 'Please generate salt value first',
      type: 'Calculate Type',
      type_placeholder: 'Please select the calculated key type',
      encode: 'Encode Type',
      encode_placeholder: 'Please select the encode type',
      salt: 'Generate Salt',
      operate: 'Calculate',
      cipher_placeholder: 'Click calculate to see the result',
    },
    geo: {
      longitude: 'Longitude',
      latitude: 'Latitude',
      accuracy: 'Longitude & Latitude Accuracy',
      altitude: 'Altitude',
      altitudeAccuracy: 'Altitude Accuracy',
      heading: 'Device Heading',
      speed: 'Device Speed',
    },
    open: 'Open',
    close: 'Close',
    screenshot: 'Capture Screenshot',
    open_record: 'Start Record',
    pause_record: 'Pause Record',
    resume_record: 'Resume Record',
    stop_record: 'Stop Record',
    initialization: 'Initialization',
    create_offer: 'Create Offer',
    create_answer: 'Create Answer',
    add_answer: 'Add Answer',
  },
  error: {
    403: "Sorry, you don't have access to this page",
    404: 'Sorry, the page you visited does not exist',
    redirect: 'Return to the Home Page',
  },
  about: {
    title: 'About',
    project: {
      title: 'Project Information',
      name: 'Name',
      version: 'Version',
      license: 'License',
      author: 'Author',
      'build-time': 'Build Time',
      github: 'GitHub',
    },
    dependencies: 'Dependencies',
    devDependencies: 'DevDependencies',
  },
  layout: {
    setting: {
      title: 'Setting',
      theme: 'Theme',
      i18n: 'Language',
      gray_mode: 'Gray Mode',
      color_weakness: 'Color Weak',
      wake_lock: 'WakeLock',
    },
  },
  router: {
    '/login': 'Login',
    '/home': 'Home',
    '/table': 'Table',
    '/table/base': 'Base Table',
    '/form': 'Form',
    '/form/base': 'Base Form',
    '/component': 'Component',
    '/component/icon': 'Icon Component',
    '/component/terminal': 'Web Terminal',
    '/component/draggable': 'Draggable Component',
    '/component/scalable': 'Scalable Component',
    '/component/rotatable': 'Rotatable Component',
    '/component/rich-text-editor': 'RichText Editor',
    '/component/markdown-editor': 'Markdown Editor',
    '/chart': 'Chart',
    '/chart/bar': 'Bar Chart',
    '/chart/line': 'line Chart',
    '/chart/pie': 'Pie Chart',
    '/chart/scatter': 'Scatter Chart',
    '/route': 'Menu',
    '/route/1': 'Menu-1',
    '/route/2': 'Menu-2',
    '/route/2/1': 'Menu-2-1',
    '/route/2/2': 'Menu-2-2',
    '/route/2/2/1': 'Menu-2-2-1',
    '/route/2/2/2': 'Menu-2-2-2',
    '/route/2/2/3': 'Menu-2-2-3',
    '/route/2/3': 'Menu-2-3',
    '/route/3': 'Menu-3',
    '/docs': 'Docs',
    '/docs/word-preview': 'Word Preview',
    '/docs/excel-preview': 'Excel Preview',
    '/docs/ppt-preview': 'PPT Preview',
    '/docs/pdf-preview': 'PDF Preview',
    '/feature': 'Feature',
    '/feature/bar-code': 'Bar Code',
    '/feature/qrcode': 'QRCode',
    '/feature/image-editor': 'Image Editor',
    '/feature/encode-decode': 'Encode',
    '/feature/encrypt-decrypt': 'Crypto',
    '/feature/code-highlight': 'Code Highlight',
    '/feature/image-compress': 'Image Compress',
    '/feature/geo-position': 'Geographical Position',
    '/feature/camera-record': 'Video Recorder',
    '/feature/screen-record': 'Screen Recorder',
    '/feature/web-rtc': 'Web Real-Time Communications',
    '/feature/eye-dropper': 'EyeDropper Tool',
    '/feature/notification': 'Notification',
    '/feature/vibrate': 'Vibrate',
    '/feature/clipboard': 'Clipboard',
    '/feature/broadcast-channel': 'BroadcastChannel',
    '/error': 'Error',
    '/error/403': '403',
    '/error/404': '404',
    '/link': 'Link',
    '/link/github': 'GitHub (External Link)',
    '/link/blog': 'Blog (External Link)',
    '/link/juejin': 'JueJin (External Link)',
    '/link/vite': 'Vite (Internal Link)',
    '/link/vue': 'Vue (Internal Link)',
    '/link/:to': 'Internal Link',
    '/link/https%3A%2F%2Fcn': {
      vitejs: {
        'dev%2F': 'Vite',
      },
      vuejs: {
        'org%2F': 'Vue',
      },
    },
    '/about': 'About',
  },
}
