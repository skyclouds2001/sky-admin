import type { Plugin } from 'vite'

const GenerateEnv = (): Plugin => {
  return {
    name: 'vite-plugin-generate-env',
    config: () => ({
      define: {
        __BUILD_TIME__: `'${new Date().toLocaleString()}'`,
      },
    }),
    enforce: 'pre',
  }
}

export default GenerateEnv