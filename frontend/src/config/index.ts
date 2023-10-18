import { startCase } from 'lodash-es'
import packageConfig from '~/package.json'
import { avatar } from '@/assets'

/** 项目名称 */
export const PROJECT_NAME = startCase(packageConfig.name)

/** 项目描述 */
export const PROJECT_DESCRIPTION = packageConfig.description

/** 项目关键词 */
export const PROJECT_KEYWORDS = packageConfig.keywords

/** 项目版本 */
export const PROJECT_VERSION = packageConfig.version

/** 项目许可证 */
export const PROJECT_LICENSE = packageConfig.license

/** 项目仓库地址 */
export const PROJECT_REPOSITORY = packageConfig.repository.url.replace(/git\+|\.git/g, '')

/** 项目作者名称 */
export const PROJECT_AUTHOR_NAME = packageConfig.author.name

/** 项目作者邮箱 */
export const PROJECT_AUTHOR_EMAIL = packageConfig.author.email

/** 项目作者个人网站主页 */
export const PROJECT_AUTHOR_HOME_PAGE = packageConfig.author.url

/** 项目作者头像链接 */
export const PROJECT_AUTHOR_AVATAR = avatar

/** 项目贡献者 */
export const PROJECT_CONTRIBUTORS = packageConfig.contributors

/** 项目构建时间 */
export const BUILD_TIME = __BUILD_TIME__

/** 项目主页路径 */
export const INDEX_ROUTE = '/home'

/** 服务器 HOST */
export const SERVER_HOST = 'https://localhost:5173'

/** 示例 word 文件地址 */
export const DEMO_WORD_SRC = '/word-preview.docx'

/** 示例 excel 文件地址 */
export const DEMO_EXCEL_SRC = '/excel-preview.xlsx'

/** 示例 ppt 文件地址 */
export const DEMO_PPT_SRC = '/ppt-preview.pptx'

/** 示例 pdf 文件地址 */
export const DEMO_PDF_SRC = '/pdf-preview.pdf'
