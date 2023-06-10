/**
 * 依赖名称生成 npm 依赖访问网址方法
 * @param name - npm 依赖名称
 * @returns - 依赖对应 npm 访问 URL
 */
export const generateNpmLink = (name: string): string => `https://www.npmjs.com/package/${name}`

/**
 * 生成文档预览链接方法（使用 Microsoft Office 开放 API）
 * @param url 原文档链接
 * @returns 文档预览链接
 */
export const generateDocumentLink = (url: string): string => `https://view.officeapps.live.com/op/view.aspx?src=${url}`
