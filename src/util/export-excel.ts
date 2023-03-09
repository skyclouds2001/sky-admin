import { writeFileXLSX, utils } from 'xlsx'

/**
 * 从 data 导出 excel 表格方法
 *
 * @param data 待导出数据
 */
export const exportExcelFromData = <T = unknown>(data: T[]): void => {
  const ws = utils.json_to_sheet<T>(data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'data')
  writeFileXLSX(wb, 'data.xlsx')
}

/**
 * 从 table 元素导出 excel 表格方法
 *
 * @param el 待导出数据表格
 */
export const exportExcelFromTable = (el: HTMLTableElement): void => {
  const wb = utils.table_to_book(el)
  writeFileXLSX(wb, 'data.xlsx')
}
