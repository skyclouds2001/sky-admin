<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * Utf8原文
 */
const rawUtf8 = ref('')

/**
 * Utf8密文
 */
const cipherUtf8 = ref('')

/**
 * Utf8编码
 */
const encodeUtf8 = () => {
  try {
    cipherUtf8.value = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Utf8.parse(rawUtf8.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Utf8解码
 */
const decodeUtf8 = () => {
  try {
    rawUtf8.value = CryptoJS.enc.Utf8.parse(cipherUtf8.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">Utf8</div>
    </template>
    <el-space size="large">
      <el-input v-model="rawUtf8" type="textarea" :rows="5" resize="none" placeholder="请输入待编码的Utf8原文" name="rawUtf8" label="rawUtf8" />
      <el-space direction="vertical" size="large">
        <el-button @click="encodeUtf8">编码</el-button>
        <el-button @click="decodeUtf8">解密</el-button>
      </el-space>
      <el-input v-model="cipherUtf8" type="textarea" :rows="5" resize="none" placeholder="请输入待解码的Utf8密文" name="cipherUtf8" label="cipherUtf8" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
