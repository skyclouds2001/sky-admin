export class Pagination<T = unknown> {
  public readonly data: T[]
  public readonly page: number
  public readonly size: number
  public readonly total: number

  public constructor(data: T[], page: number, size: number, total: number) {
    this.data = data
    this.page = page
    this.size = size
    this.total = total
  }
}
