import type { Plugin } from 'vite'
import dayjs from 'dayjs'

const GenerateBuildTime = (): Plugin => {
  return {
    name: 'build-time',
    config: () => ({
      define: {
        __BUILD_TIME__: `'${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`,
      },
    }),
    enforce: 'pre',
  }
}

export default GenerateBuildTime
