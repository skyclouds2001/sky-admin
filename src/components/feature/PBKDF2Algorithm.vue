<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import CryptoJS from 'crypto-js'

const types = Object.keys(CryptoJS).filter((v) => /KDF/.test(v)) as Array<Extract<keyof typeof CryptoJS, `${string}KDF${string}`>>

/**
 * 原文
 */
const raw = ref('')

/**
 * 密钥盐值
 */
const salt = ref('')

/**
 * 密文
 */
const cipher = ref('')

/**
 * 生成盐值
 */
const genSalt = () => {
  salt.value = CryptoJS.lib.WordArray.random(128 / 8).toString()
}

/**
 * 执行编码方法
 */
const hash = () => {
  try {
    cipher.value = CryptoJS.PBKDF2(raw.value, salt.value).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 当前编码解码类型
 */
const type = ref(types[0])
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">PBKDF2</div>
    </template>
    <el-space size="large">
      <el-space direction="vertical" size="large">
        <el-input v-model="raw" type="textarea" :rows="8" resize="none" placeholder="请输入待计算哈希值的原文" name="raw" label="raw" />
        <el-input v-model="salt" placeholder="" name="salt" label="salt" readonly />
      </el-space>
      <el-space direction="vertical" size="large">
        <el-select v-model="type" name="type" placeholder="请选择密钥计算类型">
          <el-option v-for="item in types" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button @click="genSalt">生成盐值</el-button>
        <el-button @click="hash">计算</el-button>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" placeholder="点击计算按钮以显示哈希值" name="cipher" label="cipher" readonly />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
