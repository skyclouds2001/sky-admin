export class Sandbox {
  constructor({ blackList = Sandbox.defaultBlackList, whiteList = Sandbox.defaultWhiteList, unknownBehavior: unknownPropertyBehavior = true }: { blackList?: string[]; whiteList?: string[]; unknownBehavior: boolean }) {
    const iframe = document.createElement('iframe')
    iframe.src = 'about:blank'
    iframe.hidden = true
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const engine = iframe.contentWindow as Window

    this.engine = new Proxy(engine, {
      has: (target, prop) => {
        if (typeof prop === 'string' && blackList.includes(prop)) {
          throw new Error(`Can't use ${prop}!`)
        }
        if (typeof prop === 'string' && whiteList.includes(prop)) {
          return true
        }
        if (!Object.prototype.hasOwnProperty.call(target, prop)) {
          throw new Error(`Not find ${String(prop)}!`)
        }
        return unknownPropertyBehavior
      },
    })
  }

  private readonly engine: Window

  public static readonly defaultBlackList: string[] = ['window', 'document', 'XMLHttpRequest', 'fetch', 'WebSocket', 'Image', 'Audio']

  public static readonly defaultWhiteList: string[] = []

  public execScript(code: string): unknown {
    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    return new Function('sandbox', `with(sandbox){${code}}`).call(this.engine, this.engine)
  }
}
