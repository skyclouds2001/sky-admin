<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus'
import CryptoJS from 'crypto-js'

const types = Object.keys(CryptoJS).filter((v) => /^Hmac/.test(v)) as Array<Extract<keyof typeof CryptoJS, `Hmac${string}`>>

const encodes = Object.keys(CryptoJS.enc) as Array<keyof typeof CryptoJS.enc>

/**
 * 原文
 */
const raw = ref('')

/**
 * 密钥
 */
const key = ref('')

/**
 * 密文
 */
const cipher = ref('')

/**
 * 当前编码解码类型
 */
const type = ref(types[0])

/**
 * 显示密文编码方式
 */
const encode = ref<keyof typeof CryptoJS.enc>('Hex')

/**
 * 执行编码方法
 */
const hash = () => {
  try {
    cipher.value = CryptoJS[type.value](raw.value, key.value).toString(CryptoJS.enc[encode.value])
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">密钥哈希</div>
    </template>
    <el-space size="large">
      <el-space direction="vertical" size="large">
        <el-input v-model="raw" type="textarea" :rows="8" resize="none" placeholder="请输入待计算哈希的原文" name="raw" label="raw" />
        <el-input v-model="key" placeholder="请输入密钥" name="key" label="key" />
      </el-space>
      <el-space direction="vertical" size="large">
        <el-form>
          <el-form-item label="哈希类型">
            <el-select v-model="type" name="type" placeholder="请选择密钥哈希类型">
              <el-option v-for="item in types" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="编码方式">
            <el-select v-model="encode" name="encode" placeholder="请选择编码方式">
              <el-option v-for="item in encodes" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="hash">计算</el-button>
          </el-form-item>
        </el-form>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" placeholder="点击计算按钮以显示哈希值" name="cipher" label="cipher" readonly />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
