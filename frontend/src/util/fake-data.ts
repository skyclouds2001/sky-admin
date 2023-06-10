import type { Data } from '@/model'

/**
 * 产生的名称方式
 */
const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/**
 * 生成虚拟数据方法
 * @param len 待生成数据长度（小于 52）
 * @param range 生成数据范围（为正整数）
 * @returns 生成的虚拟数据
 */
export const generateFakeData = (len: number, range: number): Data[] => {
  return new Array(len).fill(0).map((_, i) => ({
    name: str.at(i) as string,
    value: Math.random() * range,
  }))
}
