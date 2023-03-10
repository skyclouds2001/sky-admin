<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * Base64原文
 */
const rawBase64 = ref('')

/**
 * Base64密文
 */
const cipherBase64 = ref('')

/**
 * Base64编码
 */
const encodeBase64 = () => {
  try {
    cipherBase64.value = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(rawBase64.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Base64解码
 */
const decodeBase64 = () => {
  try {
    rawBase64.value = CryptoJS.enc.Base64.parse(cipherBase64.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">Base64</div>
    </template>
    <el-space size="large">
      <el-input v-model="rawBase64" type="textarea" :rows="5" resize="none" placeholder="请输入待编码的Base64原文" name="rawBase64" label="rawBase64" />
      <el-space direction="vertical" size="large">
        <el-button @click="encodeBase64">编码</el-button>
        <el-button @click="decodeBase64">解密</el-button>
      </el-space>
      <el-input v-model="cipherBase64" type="textarea" :rows="5" resize="none" placeholder="请输入待解码的Base64密文" name="cipherBase64" label="cipherBase64" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
