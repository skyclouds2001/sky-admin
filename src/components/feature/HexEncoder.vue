<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * Hex原文
 */
const rawHex = ref('')

/**
 * Hex密文
 */
const cipherHex = ref('')

/**
 * Hex编码
 */
const encodeHex = () => {
  try {
    cipherHex.value = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(rawHex.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Hex解码
 */
const decodeHex = () => {
  try {
    rawHex.value = CryptoJS.enc.Hex.parse(cipherHex.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">Hex</div>
    </template>
    <el-space size="large">
      <el-input v-model="rawHex" type="textarea" :rows="5" resize="none" placeholder="请输入待编码的Hex原文" name="rawBase64" label="rawBase64" />
      <el-space direction="vertical" size="large">
        <el-button @click="encodeHex">编码</el-button>
        <el-button @click="decodeHex">解密</el-button>
      </el-space>
      <el-input v-model="cipherHex" type="textarea" :rows="5" resize="none" placeholder="请输入待解码的Hex密文" name="cipherBase64" label="cipherBase64" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
