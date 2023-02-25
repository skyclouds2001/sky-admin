import packageConfig from '~/package.json'
import avatar from '@/assets/avatar.jpg'

/** 项目名称 */
export const PROJECT_NAME = packageConfig.name

/** 项目描述 */
export const PROJECT_DESCRIPTION = packageConfig.description

/** 项目关键词 */
export const PROJECT_KEYWORDS = packageConfig.keywords

/** 项目版本 */
export const PROJECT_VERSION = packageConfig.version

/** 项目许可证 */
export const PROJECT_LICENSE = packageConfig.license

/** 项目仓库地址 */
export const PROJECT_REPOSITORY = packageConfig.repository.url.replace(/git\+|.git/g, '')

/** 项目作者 */
export const PROJECT_AUTHOR_NAME = packageConfig.author.name

/** 项目作者头像链接 */
export const PROJECT_AUTHOR_AVATAR = avatar

/** 项目贡献者 */
export const PROJECT_CONTRIBUTORS = packageConfig.contributors

/** 服务器 HOST */
export const SERVER_HOST = 'http://localhost:8080'

/** 示例 word 文件地址 */
export const DEMO_WORD_SRC = ''

/** 示例 excel 文件地址 */
export const DEMO_EXCEL_SRC = ''

/** 示例 ppt 文件地址 */
export const DEMO_PPT_SRC = ''

/** 示例 pdf 文件地址 */
export const DEMO_PDF_SRC = ''
