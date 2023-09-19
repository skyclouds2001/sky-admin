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

declare let queryLocalFonts: (options?: { postscriptNames: string[] }) => Promise<FontData[]>

defineOptions({
  name: 'LocalFontSelect',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

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
  if (fonts.value.length === 0) {
    void queryLocalFonts().then((data) => {
      fonts.value = data
    })
  }
}
</script>

<template>
  <el-select v-model="font" filterable name="local-font-select" placeholder="Please select the font you need" aria-label="Local Font" @visible-change="loadFont">
    <el-option v-for="item in fonts" :key="item.postscriptName" :label="item.fullName" :value="item.family" />
  </el-select>
</template>

<style scoped lang="scss"></style>
