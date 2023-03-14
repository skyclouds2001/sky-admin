<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus'
import CryptoJS from 'crypto-js'

const i18n = useI18n()

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
    cipher.value = CryptoJS.enc[type.value].stringify(CryptoJS.enc.Utf8.parse(raw.value))
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
      <div class="text-left text-base font-bold">{{ i18n.t('feature.encode.title') }}</div>
    </template>
    <el-space size="large">
      <el-input v-model="raw" type="textarea" :rows="10" resize="none" :placeholder="i18n.t('feature.encode.raw_placeholder')" name="raw" label="raw" />
      <el-space direction="vertical" size="large">
        <el-form>
          <el-form-item :label="i18n.t('feature.encode.type')">
            <el-select v-model="type" name="type" :placeholder="i18n.t('feature.encode.type_placeholder')">
              <el-option v-for="item in types" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="encode">{{ i18n.t('feature.encode.encode') }}</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="decode">{{ i18n.t('feature.encode.decode') }}</el-button>
          </el-form-item>
        </el-form>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" :placeholder="i18n.t('feature.encode.cipher_placeholder')" name="cipher" label="cipher" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
