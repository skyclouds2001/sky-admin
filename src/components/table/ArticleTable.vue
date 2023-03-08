<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElTag, ElRate } from 'element-plus'
import type { Article } from '@/model'

const props = defineProps<{
  articles: Article[]
}>()

const editArticle = (id: number) => {
  console.log(id)
}

const toggleArticleStatus = (id: number) => {
  console.log(id)
}

const removeArticle = (id: number) => {
  console.log(id)
}
</script>

<template>
  <el-table :data="props.articles" stripe border flexible>
    <el-table-column type="selection" width="50" align="center" fixed />
    <el-table-column prop="id" label="序号" width="100" align="center" />
    <el-table-column prop="title" label="标题" width="150" align="center" />
    <el-table-column prop="author" label="作者" width="100" align="center" />
    <el-table-column prop="country" label="国家" width="100" align="center" />
    <el-table-column prop="reviewer" label="审核人" width="100" align="center" />
    <el-table-column prop="time" label="发布时间" width="200" align="center" />
    <el-table-column prop="read" label="阅读数" width="100" align="center" />
    <el-table-column prop="star" label="星级" width="100" align="center">
      <template #default="scope">
        <el-rate v-model="scope.row.star" disabled />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 'drafted'" type="info">草稿箱</el-tag>
        <el-tag v-if="scope.row.status === 'published'" type="success">已发布</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250" align="center" fixed="right">
      <template #default="scope">
        <el-button type="primary" @click="editArticle(scope.row.id)">编辑</el-button>
        <el-button v-if="scope.row.status === 'drafted'" type="success" @click="toggleArticleStatus(scope.row.id)">发布</el-button>
        <el-button v-if="scope.row.status === 'published'" @click="toggleArticleStatus(scope.row.id)">草稿</el-button>
        <el-button type="danger" @click="removeArticle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
