export class Result<T = unknown> {
  public readonly success: boolean
  public readonly code: number
  public readonly message: string
  public readonly data: T

  constructor(data: T, message: string, code: number, success: boolean) {
    this.data = data
    this.message = message
    this.code = code
    this.success = success
  }

  public static success<T = unknown>(data: T = null, message = 'SUCCESS') {
    return new Result<T>(data, message, 0, true)
  }

  public static fail<T = unknown>(data: T = null, message = 'FAIL', code = -1) {
    return new Result<T>(data, message, code, false)
  }
}
