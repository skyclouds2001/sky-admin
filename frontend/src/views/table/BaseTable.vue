<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox, ElPagination, ElSpace } from 'element-plus'
import { updateArticle, removeArticle } from '@/api'
import { ArticleTable, ArticleSearch } from '@/components'
import { useArticles } from '@/hook'
import type { Article } from '@/model'
import { exportExcelFromData } from '@/util'

const appContext = getCurrentInstance()?.appContext

const { articles, page, size, total, search, refresh } = useArticles()

/**
 * 导出表格回调方法
 */
const handleExport = (): void => {
  exportExcelFromData<Article>(articles.value)
}

/**
 * 搜索文章方法
 * @param params 搜索参数
 * @param params.title 文章标题
 */
const handleSearch = ({ title }: Pick<Article, 'title'>): void => {
  search.title = title
}

/**
 * 新增文章信息列表方法
 */
const handleAddArticle = (): void => {
  console.log(-1)
}

/**
 * 编辑文章信息方法
 * @param id 文章ID
 */
const handleEditArticle = (id: number): void => {
  console.log(id)
}

/**
 * 切换文章状态方法
 * @param id 文章ID
 */
const handleToggleArticleStatus = (id: number): void => {
  const article = articles.value.find((v) => v.id === id)
  if (article === undefined) return

  ElMessageBox.confirm(
    article.status === 'Drafted' ? '确认发表文章？' : '确认草稿文章？',
    '警告',
    {
      type: 'info',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      center: true,
      draggable: true,
    },
    appContext
  )
    .then(async () => {
      try {
        const a = Object.assign({}, article)
        a.status = article.status === 'Drafted' ? 'Published' : 'Drafted'
        const res = await updateArticle(a)
        if (res.success) {
          ElMessage.success(
            {
              message: '修改成功',
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        } else {
          ElMessage.error(
            {
              message: `修改失败：${res.message}`,
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        }
      } catch {
        ElMessage.error(
          {
            message: '修改失败',
            showClose: true,
            center: true,
            grouping: true,
          },
          appContext
        )
      } finally {
        refresh()
      }
    })
    .catch(() => {
      ElMessage.error(
        {
          message: '修改失败',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    })
}

/**
 * 移除文章信息方法
 * @param id 文章ID
 */
const handleRemoveArticle = (id: number): void => {
  ElMessageBox.confirm(
    '确认删除？',
    '警告',
    {
      type: 'error',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      center: true,
      draggable: true,
    },
    appContext
  )
    .then(async () => {
      try {
        const res = await removeArticle(id)
        if (res.success) {
          ElMessage.success(
            {
              message: '删除成功',
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        } else {
          ElMessage.error(
            {
              message: `删除失败：${res.message}`,
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        }
      } catch {
        ElMessage.error(
          {
            message: '删除失败',
            showClose: true,
            center: true,
            grouping: true,
          },
          appContext
        )
      } finally {
        refresh()
      }
    })
    .catch(() => {
      ElMessage.info(
        {
          message: '已取消删除',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    })
}
</script>

<template>
  <el-space direction="vertical" fill size="large" class="base-table-space p-5">
    <!-- 搜索框部分 -->
    <article-search @search="handleSearch" @add="handleAddArticle" @export="handleExport" />

    <!-- 表格部分 -->
    <article-table :articles="articles" @edit="handleEditArticle" @toggle="handleToggleArticleStatus" @remove="handleRemoveArticle" />

    <!-- 分页部分 -->
    <el-pagination v-model:current-page="page" v-model:page-size="size" :total="total" :default-current-page="1" :default-page-size="10" layout="prev, pager, next, jumper, ->, total, sizes" background />
  </el-space>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
.base-table-space {
  @apply w-full;

  > div {
    @apply w-full;
  }
}
</style>
