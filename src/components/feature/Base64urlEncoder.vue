<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * Base64url原文
 */
const rawBase64url = ref('')

/**
 * Base64url密文
 */
const cipherBase64url = ref('')

/**
 * Base64url编码
 */
const encodeBase64url = () => {
  try {
    cipherBase64url.value = CryptoJS.enc.Base64url.stringify(CryptoJS.enc.Utf8.parse(rawBase64url.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Base64url解码
 */
const decodeBase64url = () => {
  try {
    rawBase64url.value = CryptoJS.enc.Base64url.parse(cipherBase64url.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">Base64url</div>
    </template>
    <el-space size="large">
      <el-input v-model="rawBase64url" type="textarea" :rows="5" resize="none" placeholder="请输入待编码的Base64url原文" name="rawBase64url" label="rawBase64url" />
      <el-space direction="vertical" size="large">
        <el-button @click="encodeBase64url">编码</el-button>
        <el-button @click="decodeBase64url">解密</el-button>
      </el-space>
      <el-input v-model="cipherBase64url" type="textarea" :rows="5" resize="none" placeholder="请输入待解码的Base64url密文" name="cipherBase64url" label="cipherBase64url" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
