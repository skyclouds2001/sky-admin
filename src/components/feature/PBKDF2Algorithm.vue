<script setup lang="ts">
import { ref } from 'vue'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus'
import CryptoJS from 'crypto-js'

const types = Object.keys(CryptoJS).filter((v) => /KDF/.test(v)) as Array<Extract<keyof typeof CryptoJS, `${string}KDF${string}`>>

const encodes = Object.keys(CryptoJS.enc) as Array<keyof typeof CryptoJS.enc>

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
 * 当前编码解码类型
 */
const type = ref(types[0])

/**
 * 显示密文编码方式
 */
const encode = ref<keyof typeof CryptoJS.enc>('Hex')

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
    cipher.value = CryptoJS[type.value](raw.value, salt.value).toString(CryptoJS.enc[encode.value])
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">PBKDF2</div>
    </template>
    <el-space size="large">
      <el-space direction="vertical" size="large">
        <el-input v-model="raw" type="textarea" :rows="8" resize="none" placeholder="请输入待计算哈希值的原文" name="raw" label="raw" />
        <el-input v-model="salt" placeholder="" name="salt" label="salt" disabled />
      </el-space>
      <el-space direction="vertical" size="large">
        <el-form>
          <el-form-item label="计算类型">
            <el-select v-model="type" name="type" placeholder="请选择密钥计算类型">
              <el-option v-for="item in types" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="编码方式">
            <el-select v-model="encode" name="encode" placeholder="请选择编码方式">
              <el-option v-for="item in encodes" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="genSalt">生成盐值</el-button>
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
