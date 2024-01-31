class FrontendMonitor {
  public static monitorKey = Symbol('monitor-key')

  public static create(options?: Partial<FrontendMonitorOptions>): FrontendMonitor {
    const instance = new FrontendMonitor(options)
    return instance
  }

  private constructor(options: Partial<FrontendMonitorOptions> = {}) {
    // init the global object
    const { global = globalThis ?? window, contextKey = 'frontend-monitor-id' } = options
    this.global = global

    const contextId = window.localStorage.getItem(contextKey) ?? this.generateId()
    window.localStorage.setItem(contextKey, contextId)
    this.contextId = contextId

    const monitorId = this.generateId()
    this.monitorId = monitorId

    global.addEventListener(
      'error',
      (e) => {
        console.log(e)
        console.log(e.message, e.filename, e.colno, e.lineno, e.error)
      },
      {
        capture: true,
      }
    )

    global.addEventListener(
      'unhandledrejection',
      (e) => {
        e.preventDefault()

        console.log(e)
        console.log(e.promise, e.reason)
      },
      {
        capture: true,
      }
    )
  }

  protected global: typeof globalThis | Window

  protected contextId: string

  protected monitorId: string

  protected generateReport(): FrontendMonitorReport {
    return {
      contextId: this.contextId,
      monitorId: this.monitorId,
      reportId: this.generateId(),
      timestamp: window.performance?.now?.() ?? Date.now(),
    }
  }

  private generateId(): string {
    return (
      window.crypto?.randomUUID?.() ??
      Array(5)
        .fill(0)
        .map(() => (Date.now() % 1000).toString().padStart(3, '0') + (Math.random() * 1000).toString().padStart(3, '0'))
        .join('-')
    )
  }
}

interface FrontendMonitorOptions {
  global: typeof globalThis | Window
  contextKey: string
}

interface FrontendMonitorReport {
  contextId: string
  monitorId: string
  reportId: string
  timestamp: number
}

export default FrontendMonitor
