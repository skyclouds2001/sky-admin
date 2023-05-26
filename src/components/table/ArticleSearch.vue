<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { Download, EditPen, Search } from '@element-plus/icons-vue'

const i18n = useI18n()

const emits = defineEmits<{
  (e: 'add'): void
  (e: 'search', search: { name: string }): void
  (e: 'export'): void
}>()

const search = reactive({
  name: '',
})

const handleSearch = () => {
  emits('search', search)
}

const handleAdd = () => {
  emits('add')
}

const handleExport = () => {
  emits('export')
}
</script>

<template>
  <el-form :model="search" inline>
    <el-form-item label="">
      <el-input v-model="search.name" name="name" :label="i18n.t('table.search.name_label')" :placeholder="i18n.t('table.search.name_placeholder')" clearable />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" :icon="Search" @click="handleSearch">{{ i18n.t('table.search.search') }}</el-button>
      <el-button type="primary" :icon="EditPen" @click="handleAdd">{{ i18n.t('table.search.add') }}</el-button>
      <el-button type="primary" :icon="Download" @click="handleExport">{{ i18n.t('table.search.export') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
