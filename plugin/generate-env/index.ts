import type { Plugin } from 'vite'
import dayjs from 'dayjs'

const GenerateEnv = (): Plugin => {
  return {
    name: 'generate-env',
    config: () => ({
      define: {
        __BUILD_TIME__: `'${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`,
      },
    }),
    enforce: 'pre',
  }
}

export default GenerateEnv
