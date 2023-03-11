<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * 编码解码列表
 */
const types = Object.keys(CryptoJS.enc) as Array<keyof typeof CryptoJS.enc>

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
 * 编码方法
 */
const decode = () => {
  try {
    cipher.value = CryptoJS.enc[type.value].stringify(CryptoJS.enc.Utf8.parse(raw.value)).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 解码方法
 */
const encode = () => {
  try {
    raw.value = CryptoJS.enc[type.value].parse(cipher.value).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">编码与解码</div>
    </template>
    <el-space size="large">
      <el-input v-model="raw" type="textarea" :rows="10" resize="none" placeholder="请输入待编码的原文" name="raw" label="raw" />
      <el-space direction="vertical" size="large">
        <el-select v-model="type" name="type" placeholder="请选择编码类型">
          <el-option v-for="item in types" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button @click="encode">编码</el-button>
        <el-button @click="decode">解密</el-button>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" placeholder="请输入待解码的密文" name="cipher" label="cipher" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
