<script setup lang="ts">
import { ElSpace, ElPagination } from 'element-plus'
import ArticleTable from '@/components/table/ArticleTable.vue'
import ArticleSearch from '@/components/table/ArticleSearch.vue'
import { useArticles } from '@/hook'
import type { Article } from '@/model'
import { exportExcelFromData } from '@/util'

const { articles, page, size, total, handleSearch } = useArticles()

const handleExport = () => {
  exportExcelFromData<Article>(articles.value)
}
</script>

<template>
  <el-space direction="vertical" fill size="large" class="base-table-space p-5">
    <!-- 搜索框部分 -->
    <article-search @search="handleSearch" @export="handleExport" />

    <!-- 表格部分 -->
    <article-table :articles="articles" />

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
