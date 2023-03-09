<script setup lang="ts">
import { reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { Search, Download } from '@element-plus/icons-vue'

const emits = defineEmits<{
  (e: 'search', search: { name: string }): void
  (e: 'export'): void
}>()

const search = reactive({
  name: '',
})

const handleSearch = () => {
  emits('search', search)
}

const handleExport = () => {
  emits('export')
}
</script>

<template>
  <el-form :model="search" inline>
    <el-form-item label="">
      <el-input v-model="search.name" name="name" label="名称" placeholder="请输入书籍名称" clearable />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
