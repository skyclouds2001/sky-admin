<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

interface FontData {
  readonly family: string
  readonly fullName: string
  readonly postscriptName: string
  readonly style: string
  blob: () => Promise<Blob>
}

declare const queryLocalFonts: (options?: { postscriptNames: string[] }) => Promise<FontData[]>

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isSupported = 'queryLocalFonts' in window

const font = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

const fonts = ref<FontData[]>([])

const loadFont = (): void => {
  if (!isSupported) {
    console.error('Current Browser does not support for Local Font Select API')
  }

  void queryLocalFonts().then((data) => {
    fonts.value = data
  })
}

defineOptions({
  name: 'LocalFontSelect',
  inheritAttrs: false,
})

defineExpose({
  isSupported,
  font,
  fonts,
  loadFont,
})
</script>

<template>
  <el-select v-model="font" :disabled="!isSupported" filterable name="local-font-select" placeholder="Please select the font you need" aria-label="Local Font" @visible-change="loadFont">
    <el-option v-for="item in fonts" :key="item.postscriptName" :label="item.fullName" :value="item.family" />
  </el-select>
</template>

<style scoped lang="scss"></style>
