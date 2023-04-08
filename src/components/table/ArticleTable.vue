<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElTable, ElTableColumn, ElButton, ElTag, ElRate } from 'element-plus'
import type { Article } from '@/model'

const i18n = useI18n()

const props = defineProps<{
  articles: Article[]
}>()

const emits = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()

const editArticle = (id: number) => {
  emits('edit', id)
}

const toggleArticleStatus = (id: number) => {
  emits('toggle', id)
}

const removeArticle = (id: number) => {
  emits('remove', id)
}
</script>

<template>
  <el-table :data="props.articles" stripe border flexible>
    <el-table-column type="selection" width="50" align="center" fixed />
    <el-table-column prop="id" :label="i18n.t('table.table.id')" width="100" align="center" />
    <el-table-column prop="title" :label="i18n.t('table.table.title')" width="200" align="center" />
    <el-table-column prop="author" :label="i18n.t('table.table.author')" width="100" align="center" />
    <el-table-column prop="country" :label="i18n.t('table.table.country')" width="100" align="center" />
    <el-table-column prop="reviewer" :label="i18n.t('table.table.reviewer')" width="100" align="center" />
    <el-table-column prop="time" :label="i18n.t('table.table.time')" width="200" align="center" />
    <el-table-column prop="read" :label="i18n.t('table.table.read')" width="100" align="center" />
    <el-table-column prop="star" :label="i18n.t('table.table.star')" width="150" align="center">
      <template #default="scope">
        <el-rate v-model="scope.row.star" disabled />
      </template>
    </el-table-column>
    <el-table-column prop="status" :label="i18n.t('table.table.status')" width="100" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 'drafted'" type="info">{{ i18n.t('table.table.status_drafted') }}</el-tag>
        <el-tag v-if="scope.row.status === 'published'" type="success">{{ i18n.t('table.table.status_published') }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column :label="i18n.t('table.table.operate')" width="300" align="center" fixed="right">
      <template #default="scope">
        <el-button type="primary" @click="editArticle(scope.row.id)">{{ i18n.t('table.table.operate_edit') }}</el-button>
        <el-button v-if="scope.row.status === 'drafted'" type="success" @click="toggleArticleStatus(scope.row.id)">{{ i18n.t('table.table.operate_published') }}</el-button>
        <el-button v-if="scope.row.status === 'published'" @click="toggleArticleStatus(scope.row.id)">{{ i18n.t('table.table.operate_drafted') }}</el-button>
        <el-button type="danger" @click="removeArticle(scope.row.id)">{{ i18n.t('table.table.operate_delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
