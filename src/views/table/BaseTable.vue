<script setup lang="ts">
import { computed } from 'vue'
import { ElSpace, ElPagination } from 'element-plus'
import ArticleTable from '@/components/table/ArticleTable.vue'
import { useArticles } from '@/hook'

const { articles, page, size } = useArticles()

const total = computed(() => articles.value.length)
</script>

<template>
  <el-space direction="vertical" fill size="large" class="base-table-space p-5">
    <!-- 搜索框部分 -->
    <div>search</div>

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
