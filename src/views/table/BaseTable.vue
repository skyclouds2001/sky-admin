<script setup lang="ts">
import { ElMessage, ElMessageBox, ElPagination, ElSpace } from 'element-plus'
import ArticleTable from '@/components/table/ArticleTable.vue'
import ArticleSearch from '@/components/table/ArticleSearch.vue'
import { removeArticle } from '@/api'
import { useArticles } from '@/hook'
import type { Article } from '@/model'
import { exportExcelFromData } from '@/util'

const { articles, page, size, total, refresh, handleSearch } = useArticles()

/**
 * 导出表格回调方法
 */
const handleExport = () => {
  exportExcelFromData<Article>(articles.value)
}

/**
 * 编辑文章信息方法
 *
 * @param id 文章ID
 */
const handleEditArticle = (id: number) => {
  console.log(id)
}

/**
 * 切换文章状态方法
 *
 * @param id 文章ID
 */
const handleToggleArticleStatus = (id: number) => {
  console.log(id)
}

/**
 * 移除文章信息方法
 *
 * @param id 文章ID
 */
const handleRemoveArticle = (id: number) => {
  ElMessageBox.confirm('确认删除？', '警告', {
    type: 'error',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    center: true,
    draggable: true,
  })
    .then(async () => {
      try {
        const res = await removeArticle(id)
        if (res.success) {
          ElMessage.success({
            message: '删除成功',
            showClose: true,
            center: true,
            grouping: true,
          })
        } else {
          ElMessage.error({
            message: `删除失败：${res.message}`,
            showClose: true,
            center: true,
            grouping: true,
          })
        }
      } catch {
        ElMessage.error({
          message: '删除失败',
          showClose: true,
          center: true,
          grouping: true,
        })
      } finally {
        refresh()
      }
    })
    .catch(() => {
      ElMessage.info({
        message: '已取消删除',
        showClose: true,
        center: true,
        grouping: true,
      })
    })
}
</script>

<template>
  <el-space direction="vertical" fill size="large" class="base-table-space p-5">
    <!-- 搜索框部分 -->
    <article-search @search="handleSearch" @export="handleExport" />

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
