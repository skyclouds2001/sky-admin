<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus'
import CryptoJS from 'crypto-js'

const i18n = useI18n()

const types = ['AES', 'DES', 'TripleDES', 'Rabbit', 'RC4', 'RC4Drop'] as const

const modes = Object.keys(CryptoJS.mode) as Array<keyof typeof CryptoJS.mode>

const pads = Object.keys(CryptoJS.pad) as Array<keyof typeof CryptoJS.pad>

const key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f')

const iv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f')

/**
 * 原文
 */
const raw = ref('')

/**
 * 密文
 */
const cipher = ref('')

/**
 * 当前密码类型
 */
const type = ref<(typeof types)[number]>(types[0])

/**
 * 模式
 */
const mode = ref<(typeof modes)[number]>(modes[0])

/**
 * 填充方案
 */
const pad = ref<(typeof pads)[number]>(pads[0])

/**
 * 加密方法
 */
const encrypt = () => {
  try {
    cipher.value = CryptoJS[type.value].encrypt(raw.value, key, { iv, mode: CryptoJS.mode[mode.value], padding: CryptoJS.pad[pad.value] }).toString()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 解密方法
 */
const decrypt = () => {
  try {
    raw.value = CryptoJS[type.value].decrypt(cipher.value, key, { iv }).toString()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="text-left text-base font-bold">{{ i18n.t('feature.crypto.title') }}</div>
    </template>
    <el-space size="large">
      <el-input v-model="raw" type="textarea" :rows="10" resize="none" :placeholder="i18n.t('feature.crypto.raw_placeholder')" name="raw" label="raw" />
      <el-space direction="vertical" size="large">
        <el-form>
          <el-form-item :label="i18n.t('feature.crypto.type')">
            <el-select v-model="type" name="type" :placeholder="i18n.t('feature.crypto.type_placeholder')">
              <el-option v-for="item in types" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item :label="i18n.t('feature.crypto.mode')">
            <el-select v-model="mode" name="mode" :placeholder="i18n.t('feature.crypto.mode_placeholder')">
              <el-option v-for="item in modes" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item :label="i18n.t('feature.crypto.pad')">
            <el-select v-model="pad" name="pad" :placeholder="i18n.t('feature.crypto.pad_placeholder')">
              <el-option v-for="item in pads" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="encrypt">{{ i18n.t('feature.crypto.encrypt') }}</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="decrypt">{{ i18n.t('feature.crypto.decrypt') }}</el-button>
          </el-form-item>
        </el-form>
      </el-space>
      <el-input v-model="cipher" type="textarea" :rows="10" resize="none" :placeholder="i18n.t('feature.crypto.cipher_placeholder')" name="cipher" label="cipher" />
    </el-space>
  </el-card>
</template>

<style scoped lang="scss"></style>
