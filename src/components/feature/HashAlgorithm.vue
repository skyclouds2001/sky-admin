<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import CryptoJS from 'crypto-js'

const types = Object.keys(CryptoJS).filter((v) => /^(MD|SHA)/.test(v)) as Array<Extract<keyof typeof CryptoJS, `MD${number}` | `SHA${number}` | `RIPEMD${number}`>>

/**
 * 原文
 */
const raw = ref('')

/**
 * 密文
 */
const cipher = ref('')

/**
 * 当前编码解码类型
 */
const type = ref(types[0])

/**
 * 执行编码方法
 */
const hash = () => {
  try {
    cipher.value = CryptoJS[type.value](raw.value).toString()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">哈希</div>
    </template>
    <el-space size="large">
      <el-input v-model="raw" type="textarea" :rows="10" resize="none" placeholder="请输入计算哈希的原文" name="hash" label="hash" />
      <el-space direction="vertical" size="large">
        <el-select v-model="type" name="type" placeholder="请选择哈希类型">
          <el-option v-for="item in types" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button @click="hash">计算</el-button>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" placeholder="点击计算以显示原文哈希值" name="cipher" label="cipher" readonly />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
