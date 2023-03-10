<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * Latin1原文
 */
const rawLatin1 = ref('')

/**
 * Latin1密文
 */
const cipherLatin1 = ref('')

/**
 * Latin1编码
 */
const encodeLatin1 = () => {
  try {
    cipherLatin1.value = CryptoJS.enc.Latin1.stringify(CryptoJS.enc.Utf8.parse(rawLatin1.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Latin1解码
 */
const decodeLatin1 = () => {
  try {
    rawLatin1.value = CryptoJS.enc.Latin1.parse(cipherLatin1.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">Latin1</div>
    </template>
    <el-space size="large">
      <el-input v-model="rawLatin1" type="textarea" :rows="5" resize="none" placeholder="请输入待编码的Latin1原文" name="rawLatin1" label="rawLatin1" />
      <el-space direction="vertical" size="large">
        <el-button @click="encodeLatin1">编码</el-button>
        <el-button @click="decodeLatin1">解密</el-button>
      </el-space>
      <el-input v-model="cipherLatin1" type="textarea" :rows="5" resize="none" placeholder="请输入待解码的Latin1密文" name="cipherLatin1" label="cipherLatin1" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
