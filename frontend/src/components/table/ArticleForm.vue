<script setup lang="ts">
import { reactive } from 'vue'
import { ElDatePicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElRate, ElSelect } from 'element-plus'
import type { Article } from '@/model'

const data = reactive<Omit<Article, 'id'>>({
  title: '',
  time: '',
  author: '',
  country: '',
  reviewer: '',
  star: 0,
  read: 0,
  status: 'drafted',
})

defineExpose({
  data,
})
</script>

<template>
  <el-form :model="data">
    <el-form-item label="title">
      <el-input v-model="data.title" name="title" label="title" placeholder="Please input title" clearable />
    </el-form-item>
    <el-form-item label="time">
      <el-date-picker v-model="data.time" name="time" placeholder="Please select time" />
    </el-form-item>
    <el-form-item label="author">
      <el-input v-model="data.author" name="author" label="author" placeholder="Please input author" clearable />
    </el-form-item>
    <el-form-item label="country">
      <el-input v-model="data.country" name="country" label="country" placeholder="Please input country" clearable />
    </el-form-item>
    <el-form-item label="reviewer">
      <el-input v-model="data.reviewer" name="reviewer" label="reviewer" placeholder="Please input reviewer" clearable />
    </el-form-item>
    <el-form-item label="star">
      <el-rate v-model="data.star" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" clearable label="star" />
    </el-form-item>
    <el-form-item label="read">
      <el-input-number v-model="data.read" name="read" label="read" placeholder="Please input read" :min="0" :step="1" step-strictly />
    </el-form-item>
    <el-form-item label="status">
      <el-select v-model="data.status" name="status" placeholder="Please select status">
        <el-option label="drafted" value="drafted" />
        <el-option label="published" value="published" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
